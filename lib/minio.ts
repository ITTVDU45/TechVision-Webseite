import { Client } from "minio";

let minioClient: Client | null = null;
let minioClientKey = "";

export interface MinioConnectionOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  pathStyle: boolean;
}

/**
 * Liest MINIO_* aus der Umgebung.
 * MINIO_ENDPOINT darf auch vollständige URL sein (https://s3.example.com).
 */
export function getMinioConnectionOptions(): MinioConnectionOptions {
  let raw = (process.env.MINIO_ENDPOINT || "localhost").trim();
  let useSSL = process.env.MINIO_USE_SSL === "true";
  let port = parseInt(process.env.MINIO_PORT || "9000", 10);
  const accessKey = process.env.MINIO_ACCESS_KEY?.trim() || "";
  const secretKey = process.env.MINIO_SECRET_KEY?.trim() || "";
  const pathStyle = process.env.MINIO_PATH_STYLE === "true";

  if (/^https?:\/\//i.test(raw)) {
    try {
      const u = new URL(raw);
      raw = u.hostname;
      if (u.port) {
        port = parseInt(u.port, 10);
      } else {
        port = u.protocol === "https:" ? 443 : 80;
      }
      useSSL = u.protocol === "https:";
    } catch {
      // unverändert
    }
  } else {
    raw = raw.split("/")[0];
    if (raw.includes(":")) {
      const [host, p] = raw.split(":");
      raw = host;
      const parsed = parseInt(p, 10);
      if (!Number.isNaN(parsed)) port = parsed;
    }
  }

  return {
    endPoint: raw,
    port,
    useSSL,
    accessKey,
    secretKey,
    pathStyle,
  };
}

export function isLocalMinioEndpoint(endPoint: string): boolean {
  const h = endPoint.toLowerCase();
  return (
    h === "localhost" ||
    h === "127.0.0.1" ||
    h === "0.0.0.0" ||
    h.endsWith(".local")
  );
}

/** Auf Vercel (u. ä.) ist localhost nie Ihr MinIO-Server. */
export function isMinioEndpointBlockedOnVercel(endPoint: string): boolean {
  if (process.env.VERCEL !== "1") return false;
  return isLocalMinioEndpoint(endPoint);
}

export function getMinioClient(): Client {
  const opts = getMinioConnectionOptions();
  const key = JSON.stringify(opts);

  if (!opts.accessKey || !opts.secretKey) {
    throw new Error(
      "MinIO credentials are not configured. Please set MINIO_ACCESS_KEY and MINIO_SECRET_KEY in your environment variables."
    );
  }

  if (minioClient && minioClientKey === key) {
    return minioClient;
  }

  minioClient = new Client({
    endPoint: opts.endPoint,
    port: opts.port,
    useSSL: opts.useSSL,
    accessKey: opts.accessKey,
    secretKey: opts.secretKey,
    pathStyle: opts.pathStyle,
  });
  minioClientKey = key;

  return minioClient;
}

export async function ensureBucketExists(bucketName: string): Promise<void> {
  const client = getMinioClient();
  const exists = await client.bucketExists(bucketName);

  if (exists) {
    return;
  }

  try {
    await client.makeBucket(bucketName, "us-east-1");
  } catch (err: unknown) {
    const e = err as { code?: string; name?: string };
    const ok =
      e?.code === "BucketAlreadyOwnedByYou" ||
      e?.code === "BucketAlreadyExists" ||
      (typeof e?.name === "string" && e.name.includes("BucketAlready"));
    if (!ok) {
      throw err;
    }
  }

  const policy = {
    Version: "2012-10-17",
    Statement: [
      {
        Effect: "Allow",
        Principal: { AWS: ["*"] },
        Action: ["s3:GetObject"],
        Resource: [`arn:aws:s3:::${bucketName}/*`],
      },
    ],
  };

  try {
    await client.setBucketPolicy(bucketName, JSON.stringify(policy));
  } catch (err) {
    console.warn(
      "[minio] setBucketPolicy nicht möglich (Rechte oder Managed Storage) – Upload wird trotzdem versucht:",
      err
    );
  }
}

export function getPublicUrl(bucketName: string, objectName: string): string {
  const publicBase = process.env.MINIO_PUBLIC_URL?.trim();
  if (publicBase) {
    const base = publicBase.replace(/\/$/, "");
    return `${base}/${bucketName}/${objectName}`;
  }

  const opts = getMinioConnectionOptions();
  const protocol = opts.useSSL ? "https" : "http";
  const portPart =
    (opts.useSSL && opts.port === 443) || (!opts.useSSL && opts.port === 80)
      ? ""
      : `:${opts.port}`;

  return `${protocol}://${opts.endPoint}${portPart}/${bucketName}/${objectName}`;
}

/** Kurze, sichere Fehlerinfo für API-Antworten (ohne Secrets). */
export function formatMinioErrorForClient(err: unknown): string {
  const e = err as {
    code?: string;
    message?: string;
    name?: string;
  };
  const code = e?.code || e?.name;
  const msg = (e?.message || String(err)).split("\n")[0].slice(0, 200);
  if (code && msg) return `${code}: ${msg}`;
  return msg || "Unbekannter Fehler";
}

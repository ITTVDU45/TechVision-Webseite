import { Client } from "minio";

let minioClient: Client | null = null;
let minioClientKey = "";

export interface MinioConnectionOptions {
  endPoint: string;
  port: number;
  useSSL: boolean;
  accessKey: string;
  secretKey: string;
  region?: string;
  pathStyle: boolean;
}

/**
 * Liest MINIO_* aus der Umgebung.
 * MINIO_ENDPOINT darf auch vollständige URL sein (https://s3.example.com).
 */
/** Entfernt optionale Anführungszeichen aus .env-Werten. */
function stripEnvQuotes(value: string): string {
  const t = value.trim();
  if (
    (t.startsWith('"') && t.endsWith('"')) ||
    (t.startsWith("'") && t.endsWith("'"))
  ) {
    return t.slice(1, -1).trim();
  }
  return t;
}

function readEnv(name: string): string {
  return stripEnvQuotes(process.env[name]?.trim() || "");
}

function readBooleanEnv(name: string, fallback = false): boolean {
  const raw = readEnv(name).toLowerCase();
  if (!raw) return fallback;
  return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}

export function getMinioBucketName(): string {
  const name = readEnv("MINIO_BUCKET_NAME") || readEnv("MINIO_BUCKET");
  return name || "techvision-uploads";
}

export function getMinioConnectionOptions(): MinioConnectionOptions {
  let raw = readEnv("MINIO_ENDPOINT") || "localhost";
  let useSSL = readBooleanEnv("MINIO_USE_SSL");
  let port = parseInt(process.env.MINIO_PORT || "9000", 10);
  const accessKey = readEnv("MINIO_ACCESS_KEY");
  const secretKey = readEnv("MINIO_SECRET_KEY");
  const region = readEnv("MINIO_REGION") || undefined;
  const pathStyle = readBooleanEnv("MINIO_PATH_STYLE");

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
    region,
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
    region: opts.region,
    pathStyle: opts.pathStyle,
  });
  minioClientKey = key;

  return minioClient;
}

export async function ensureBucketExists(bucketName: string): Promise<void> {
  const client = getMinioClient();
  let exists = false;

  try {
    exists = await client.bucketExists(bucketName);
  } catch (err) {
    console.warn(
      "[minio] bucketExists nicht möglich, Upload wird trotzdem versucht:",
      err
    );
    return;
  }

  if (exists) {
    return;
  }

  try {
    await client.makeBucket(bucketName, getMinioConnectionOptions().region || "us-east-1");
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
  const publicBase = readEnv("MINIO_PUBLIC_URL");
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

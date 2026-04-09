import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import type { StoredImageMeta, UploadContext } from "@/lib/stored-image";
import { normalizeUploadContext } from "@/lib/stored-image";
import {
  ensureBucketExists,
  formatMinioErrorForClient,
  getMinioBucketName,
  getMinioClient,
  getMinioConnectionOptions,
  getPublicUrl,
  isMinioEndpointBlockedOnVercel,
} from "@/lib/minio";

export const runtime = "nodejs";

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
}

function isMinioConfigured(): boolean {
  const conn = getMinioConnectionOptions();
  return Boolean(conn.endPoint && conn.accessKey && conn.secretKey);
}

async function logMediaAsset(params: {
  meta: StoredImageMeta;
  context: UploadContext;
  uploadedBy?: string;
}): Promise<void> {
  if (!getMongoUri()) return;
  try {
    const connectDB = (await import("@/lib/mongodb")).default;
    await connectDB();
    const MediaAsset = (await import("@/lib/models/MediaAsset")).default;
    await MediaAsset.create({
      url: params.meta.url,
      storage: params.meta.storage,
      bucket: params.meta.bucket,
      objectKey: params.meta.objectKey,
      mimeType: params.meta.mimeType || "application/octet-stream",
      sizeBytes: params.meta.sizeBytes ?? 0,
      originalFilename: params.meta.originalFilename || "upload",
      context: params.context,
      uploadedBy: params.uploadedBy,
    });
  } catch (e) {
    console.error("[upload] MediaAsset log failed:", e);
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const contextRaw = formData.get("context");
    const context = normalizeUploadContext(
      typeof contextRaw === "string" ? contextRaw : "general"
    );

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const allowedTypes = [
      "image/jpeg",
      "image/jpg",
      "image/png",
      "image/gif",
      "image/webp",
      "image/svg+xml",
    ];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    const maxSize = 10 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit." },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const fileExtension = extname(file.name) || ".bin";
    const fileName = `${uuidv4()}${fileExtension}`;
    const objectName = `${context}/${fileName}`;
    const uploadedBy =
      session.user?.email ||
      session.user?.name ||
      undefined;

    const useMinIO = isMinioConfigured();

    if (useMinIO) {
      try {
        const conn = getMinioConnectionOptions();
        if (isMinioEndpointBlockedOnVercel(conn.endPoint)) {
          return NextResponse.json(
            {
              error:
                "MinIO-Endpoint ist auf Vercel als localhost/127.0.0.1 gesetzt – das erreicht nicht Ihren Server. Tragen Sie die öffentliche Host-Adresse Ihres MinIO (oder den Proxy) in MINIO_ENDPOINT ein, z. B. storage.example.com oder https://storage.example.com",
            },
            { status: 503 }
          );
        }

        const BUCKET_NAME = getMinioBucketName();

        await ensureBucketExists(BUCKET_NAME);
        const client = getMinioClient();
        await client.putObject(BUCKET_NAME, objectName, buffer, buffer.length, {
          "Content-Type": file.type,
        });

        const url = getPublicUrl(BUCKET_NAME, objectName);
        const meta: StoredImageMeta = {
          url,
          storage: "minio",
          bucket: BUCKET_NAME,
          objectKey: objectName,
          mimeType: file.type,
          sizeBytes: file.size,
          originalFilename: file.name || fileName,
        };

        await logMediaAsset({ meta, context, uploadedBy });

        return NextResponse.json({
          url,
          filename: fileName,
          meta,
        });
      } catch (error) {
        console.error("MinIO upload error:", error);
        const showDetails =
          process.env.NODE_ENV === "development" ||
          process.env.MINIO_UPLOAD_DEBUG === "1" ||
          process.env.MINIO_UPLOAD_DEBUG === "true";
        const detail = formatMinioErrorForClient(error);
        return NextResponse.json(
          {
            error:
              "MinIO-Upload fehlgeschlagen. Prüfen Sie MINIO_ENDPOINT (öffentlich erreichbar von Vercel), Port, MINIO_USE_SSL, Keys und Bucket. Tipp: MINIO_ENDPOINT darf auch als vollständige URL gesetzt werden.",
            ...(showDetails ? { details: detail } : {}),
          },
          { status: 502 }
        );
      }
    }

    const uploadsDir = join(process.cwd(), "public", "uploads", context);
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch {
      // Ordner existiert
    }

    const filepath = join(uploadsDir, fileName);
    await writeFile(filepath, buffer);

    const url = `/uploads/${context}/${fileName}`;
    const meta: StoredImageMeta = {
      url,
      storage: "local",
      objectKey: `${context}/${fileName}`,
      mimeType: file.type,
      sizeBytes: file.size,
      originalFilename: file.name || fileName,
    };

    await logMediaAsset({ meta, context, uploadedBy });

    return NextResponse.json({
      url,
      filename: fileName,
      meta,
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
  }
}

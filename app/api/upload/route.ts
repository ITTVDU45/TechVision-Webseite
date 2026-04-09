import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { extname } from "path";
import type { StoredImageMeta, UploadContext } from "@/lib/stored-image";
import { normalizeUploadContext } from "@/lib/stored-image";

export const runtime = "nodejs";

function getMongoUri(): string | undefined {
  return process.env.MONGODB_URI?.trim() || process.env.MongoDB_URI?.trim();
}

function isMinioConfigured(): boolean {
  return Boolean(
    process.env.MINIO_ENDPOINT?.trim() &&
      process.env.MINIO_ACCESS_KEY?.trim() &&
      process.env.MINIO_SECRET_KEY?.trim()
  );
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
        const { getMinioClient, ensureBucketExists, getPublicUrl } = await import(
          "@/lib/minio"
        );
        const BUCKET_NAME =
          process.env.MINIO_BUCKET_NAME?.trim() || "techvision-uploads";

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
        return NextResponse.json(
          {
            error:
              "MinIO-Upload fehlgeschlagen. Endpoint, Keys und Bucket prüfen (kein stiller Fallback).",
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

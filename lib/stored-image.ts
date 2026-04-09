/**
 * MinIO / lokale Uploads: Metadaten in MongoDB (embedded imageMeta + MediaAsset-Log).
 */

export type ImageStorageKind = "minio" | "local";

export interface StoredImageMeta {
  url: string;
  storage: ImageStorageKind;
  bucket?: string;
  objectKey?: string;
  mimeType?: string;
  sizeBytes?: number;
  originalFilename?: string;
}

export const UPLOAD_CONTEXTS = [
  "blog",
  "case-study",
  "testimonial",
  "page-content",
  "general",
] as const;

export type UploadContext = (typeof UPLOAD_CONTEXTS)[number];

export function normalizeUploadContext(raw: string | null | undefined): UploadContext {
  const t = (raw || "general").trim().toLowerCase().replace(/_/g, "-");
  if ((UPLOAD_CONTEXTS as readonly string[]).includes(t)) return t as UploadContext;
  return "general";
}

import mongoose, { Schema, Document, Model } from "mongoose";
import type { UploadContext } from "@/lib/stored-image";

export interface IMediaAsset extends Document {
  url: string;
  storage: "minio" | "local";
  bucket?: string;
  objectKey?: string;
  mimeType: string;
  sizeBytes: number;
  originalFilename: string;
  context: UploadContext;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MediaAssetSchema = new Schema<IMediaAsset>(
  {
    url: { type: String, required: true, index: true },
    storage: { type: String, enum: ["minio", "local"], required: true },
    bucket: { type: String },
    objectKey: { type: String, index: true },
    mimeType: { type: String, required: true },
    sizeBytes: { type: Number, required: true },
    originalFilename: { type: String, required: true },
    context: { type: String, required: true, index: true },
    uploadedBy: { type: String },
  },
  { timestamps: true }
);

const MediaAsset: Model<IMediaAsset> =
  mongoose.models.MediaAsset || mongoose.model<IMediaAsset>("MediaAsset", MediaAssetSchema);

export default MediaAsset;

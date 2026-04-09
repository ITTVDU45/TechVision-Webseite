import { Schema } from "mongoose";

export const storedImageMetaSchema = new Schema(
  {
    url: { type: String, required: true },
    storage: { type: String, enum: ["minio", "local"], required: true },
    bucket: { type: String },
    objectKey: { type: String },
    mimeType: { type: String },
    sizeBytes: { type: Number },
    originalFilename: { type: String },
  },
  { _id: false }
);

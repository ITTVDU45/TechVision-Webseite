"use client";
import React, { useState, useRef, useEffect } from "react";
import { IconUpload, IconX } from "@tabler/icons-react";
import type { StoredImageMeta, UploadContext } from "@/lib/stored-image";

export interface ImageUploadResult {
  url: string;
  meta?: StoredImageMeta;
}

interface ImageUploadProps {
  value?: string;
  onChange: (result: ImageUploadResult) => void;
  /** MinIO-Pfadpräfix: blog, case-study, testimonial, page-content, general */
  uploadContext?: UploadContext;
  label?: string;
}

export default function ImageUpload({
  value,
  onChange,
  uploadContext = "general",
  label = "Bild hochladen",
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(value || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setPreview(value?.trim() ? value.trim() : null);
  }, [value]);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("context", uploadContext);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        const url = typeof data.url === "string" ? data.url : "";
        const meta = data.meta as StoredImageMeta | undefined;
        onChange({ url, meta });
        setPreview(url || null);
      } else {
        const err = await res.json().catch(() => ({}));
        const base =
          typeof err.error === "string"
            ? err.error
            : "Fehler beim Hochladen des Bildes";
        const details =
          typeof err.details === "string" ? `\n\nTechnisch: ${err.details}` : "";
        alert(base + details);
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("Fehler beim Hochladen des Bildes");
    } finally {
      setUploading(false);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onChange({ url: "", meta: undefined });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-2">
      {label && (
        <label className="block text-sm font-medium text-gray-300">{label}</label>
      )}

      {preview ? (
        <div className="relative">
          {/* Vorschau einer lokal gewaehlten Datei (blob:-URL). next/image
              kann solche URLs nicht verarbeiten. */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={preview}
            alt="Vorschau"
            className="h-48 w-full rounded-lg border border-gray-700 object-cover"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute right-2 top-2 rounded-full bg-red-600 p-2 transition-colors hover:bg-red-700"
          >
            <IconX className="h-4 w-4 text-white" />
          </button>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="cursor-pointer rounded-lg border-2 border-dashed border-gray-700 p-8 text-center transition-colors hover:border-gray-600"
        >
          <IconUpload className="mx-auto mb-4 h-12 w-12 text-gray-500" />
          <p className="mb-2 text-gray-400">Klicken Sie hier, um ein Bild hochzuladen</p>
          <p className="text-sm text-gray-500">oder ziehen Sie eine Datei hierher</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
            disabled={uploading}
          />
        </div>
      )}

      {uploading && (
        <div className="text-sm text-blue-400">Bild wird hochgeladen…</div>
      )}
    </div>
  );
}

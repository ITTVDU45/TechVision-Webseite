"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import ImageUpload from "./ImageUpload";
import type { StoredImageMeta } from "@/lib/stored-image";
import {
  HOME_SERVICES_PLACEMENT,
  HOME_SERVICE_GRADIENT_PRESETS,
  HOME_SERVICE_LINK_PRESETS,
} from "@/lib/home-services-defaults";

interface Service {
  _id?: string;
  name: string;
  icon: string;
  image?: string;
  imageMeta?: StoredImageMeta | null;
  description?: string;
  page: string;
  link?: string;
  gradient?: string;
  category?: string;
  order: number;
  published: boolean;
}

interface ServiceFormProps {
  service?: Service | null;
  onClose: () => void;
}

const defaultGradient = HOME_SERVICE_GRADIENT_PRESETS[0]?.value ?? "from-blue-400 via-blue-500 to-indigo-500";

const emptyForm: Service = {
  name: "",
  icon: "💼",
  image: "",
  imageMeta: undefined,
  description: "",
  page: HOME_SERVICES_PLACEMENT,
  link: "/",
  gradient: defaultGradient,
  category: "",
  order: 0,
  published: true,
};

export default function ServiceForm({ service, onClose }: ServiceFormProps) {
  const [formData, setFormData] = useState<Service>(emptyForm);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (service) {
      setFormData({
        name: service.name || "",
        icon: service.icon || "💼",
        image: service.image || "",
        imageMeta: service.imageMeta ?? undefined,
        description: service.description || "",
        page: HOME_SERVICES_PLACEMENT,
        link: service.link?.trim() || "/",
        gradient: service.gradient?.trim() || defaultGradient,
        category: service.category || "",
        order: service.order || 0,
        published: service.published !== undefined ? service.published : true,
      });
    } else {
      setFormData({ ...emptyForm });
    }
  }, [service]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const method = service ? "PUT" : "POST";
      const resolvedImage =
        formData.image?.trim() || formData.imageMeta?.url?.trim() || "";
      const payload: Record<string, unknown> = {
        name: formData.name,
        icon: formData.icon || "💼",
        description: formData.description,
        page: HOME_SERVICES_PLACEMENT,
        link: formData.link?.trim() || "/",
        gradient: formData.gradient?.trim() || defaultGradient,
        category: formData.category,
        order: formData.order,
        published: formData.published,
        image: resolvedImage,
      };
      if (resolvedImage) {
        if (formData.imageMeta) payload.imageMeta = formData.imageMeta;
      } else {
        payload.imageMeta = null;
      }

      const body = service ? { ...payload, _id: service._id } : payload;

      const res = await fetch("/api/services", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        credentials: "include",
      });

      if (res.ok) {
        onClose();
      } else {
        alert("Fehler beim Speichern");
      }
    } catch (error) {
      console.error("Error saving service:", error);
      alert("Fehler beim Speichern");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:bg-black/50 sm:p-4 sm:backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="max-h-[min(92dvh,100svh)] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-x-0 border-b-0 border-gray-800 bg-gray-900 touch-pan-y pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:max-h-[90vh] sm:rounded-2xl sm:border sm:max-w-2xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {service ? "Service bearbeiten" : "Neuen Service hinzufügen"}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-gray-800 touch-manipulation"
              aria-label="Schließen"
            >
              <IconX className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 p-4 sm:p-6">
            <p className="rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm text-gray-400">
              Dieser Eintrag erscheint im Karussell{" "}
              <strong className="text-gray-200">„Unsere Services“</strong> auf der Startseite (
              <code className="text-gray-300">page = home</code>). Optional ein{" "}
              <strong className="text-gray-200">Kartenbild</strong> (volle Breite oben); ohne Bild
              wird das Icon als Fallback angezeigt.
            </p>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <ImageUpload
              uploadContext="service"
              value={formData.image}
              onChange={({ url, meta }) =>
                setFormData((prev) => ({ ...prev, image: url, imageMeta: meta }))
              }
              label="Kartenbild (optional, empfohlen)"
            />

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Icon (Emoji, Fallback ohne Bild)
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="🤖"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Beschreibung</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={5}
                required
                className="w-full resize-y rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Text für die Karte im Karussell …"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Link (Button „Mehr dazu“)
              </label>
              <select
                aria-label="Vorlage für Ziel-Link"
                value=""
                onChange={(e) => {
                  const v = e.target.value;
                  if (v) setFormData((d) => ({ ...d, link: v }));
                }}
                className="mb-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Vorlage wählen…</option>
                {HOME_SERVICE_LINK_PRESETS.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={formData.link}
                onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="/ki-transformation"
              />
              <p className="mt-1 text-xs text-gray-500">Pfad mit führendem Slash, z. B. /webhosting</p>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">
                Farbverlauf (Tailwind-Klassen)
              </label>
              <select
                value={
                  HOME_SERVICE_GRADIENT_PRESETS.some((p) => p.value === formData.gradient)
                    ? formData.gradient
                    : "__custom__"
                }
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "__custom__") return;
                  setFormData({ ...formData, gradient: v });
                }}
                className="mb-2 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {HOME_SERVICE_GRADIENT_PRESETS.map((p) => (
                  <option key={p.value} value={p.value}>
                    {p.label}
                  </option>
                ))}
                <option value="__custom__">Eigene Klassen (unten bearbeiten)</option>
              </select>
              <input
                type="text"
                value={formData.gradient}
                onChange={(e) => setFormData({ ...formData, gradient: e.target.value })}
                required
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-mono text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="from-blue-400 via-blue-500 to-indigo-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-300">Reihenfolge</label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) =>
                  setFormData({ ...formData, order: parseInt(e.target.value, 10) || 0 })
                }
                className="w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="h-5 w-5 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-300">Veröffentlicht</span>
              </label>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50"
              >
                {loading ? "Wird gespeichert..." : "Speichern"}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

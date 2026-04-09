"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import PageSelector from './PageSelector';
import ImageUpload from './ImageUpload';
import type { StoredImageMeta } from '@/lib/stored-image';

interface PageContent {
  _id?: string;
  page: string;
  section: string;
  title?: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  heroImageMeta?: StoredImageMeta | null;
  content?: Record<string, unknown>;
}

interface PageContentFormProps {
  content?: PageContent | null;
  onClose: () => void;
}

const sections = [
  { value: 'hero', label: 'Hero' },
  { value: 'benefits', label: 'Benefits' },
  { value: 'features', label: 'Features' },
  { value: 'process', label: 'Process' },
];

export default function PageContentForm({ content, onClose }: PageContentFormProps) {
  const [formData, setFormData] = useState<PageContent>({
    page: 'home',
    section: 'hero',
    title: '',
    subtitle: '',
    description: '',
    heroImage: '',
    heroImageMeta: undefined,
    content: {},
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (content) {
      setFormData({
        page: content.page || 'home',
        section: content.section || 'hero',
        title: content.title || '',
        subtitle: content.subtitle || '',
        description: content.description || '',
        heroImage: content.heroImage || '',
        heroImageMeta: content.heroImageMeta,
        content: content.content || {},
      });
    }
  }, [content]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/page-content';
      const method = content ? 'PUT' : 'POST';
      const body: Record<string, unknown> = content
        ? { ...formData, _id: content._id }
        : { ...formData };
      if (formData.heroImage?.trim()) {
        if (formData.heroImageMeta) body.heroImageMeta = formData.heroImageMeta;
      } else {
        body.heroImageMeta = null;
      }

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });

      if (res.ok) {
        onClose();
      } else {
        alert('Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving page content:', error);
      alert('Fehler beim Speichern');
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
              {content ? 'Seiteninhalt bearbeiten' : 'Neuen Seiteninhalt hinzufügen'}
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
            <PageSelector
              value={formData.page}
              onChange={(value) => setFormData({ ...formData, page: value })}
              showAllOption={false}
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Sektion
              </label>
              <select
                value={formData.section}
                onChange={(e) => setFormData({ ...formData, section: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {sections.map((section) => (
                  <option key={section.value} value={section.value}>
                    {section.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Titel (optional)
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Untertitel (optional)
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Beschreibung (optional)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <ImageUpload
              uploadContext="page-content"
              value={formData.heroImage}
              onChange={({ url, meta }) =>
                setFormData({ ...formData, heroImage: url, heroImageMeta: meta })
              }
              label="Sektionsbild / Hero (optional, MinIO)"
            />

            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50"
              >
                {loading ? 'Wird gespeichert...' : 'Speichern'}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

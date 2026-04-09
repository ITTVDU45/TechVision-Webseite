"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import ImageUpload from './ImageUpload';
import type { StoredImageMeta } from '@/lib/stored-image';
import PageSelector from './PageSelector';

interface Testimonial {
  _id?: string;
  name: string;
  company: string;
  quote: string;
  image?: string;
  imageMeta?: StoredImageMeta | null;
  page?: string;
  order: number;
  published: boolean;
}

interface TestimonialFormProps {
  testimonial?: Testimonial | null;
  onClose: () => void;
}

export default function TestimonialForm({ testimonial, onClose }: TestimonialFormProps) {
  const [formData, setFormData] = useState<Testimonial>({
    name: '',
    company: '',
    quote: '',
    image: '',
    page: '',
    order: 0,
    published: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        name: testimonial.name || '',
        company: testimonial.company || '',
        quote: testimonial.quote || '',
        image: testimonial.image || '',
        imageMeta: (testimonial as { imageMeta?: StoredImageMeta }).imageMeta,
        page: testimonial.page || '',
        order: testimonial.order || 0,
        published: testimonial.published !== undefined ? testimonial.published : true,
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = '/api/testimonials';
      const method = testimonial ? 'PUT' : 'POST';
      const body: Record<string, unknown> = testimonial
        ? { ...formData, _id: testimonial._id }
        : { ...formData };
      if (formData.image?.trim()) {
        if (formData.imageMeta) body.imageMeta = formData.imageMeta;
      } else {
        body.imageMeta = null;
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
      console.error('Error saving testimonial:', error);
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
              {testimonial ? 'Testimonial bearbeiten' : 'Neues Testimonial hinzufügen'}
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
              value={formData.page ?? ''}
              onChange={(value) => setFormData({ ...formData, page: value })}
              label="Seite (optional)"
              showAllOption={false}
              includeEmptyOption
              emptyOptionLabel="Keine / global"
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Unternehmen
                </label>
                <input
                  type="text"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Zitat
              </label>
              <textarea
                value={formData.quote}
                onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>

            <ImageUpload
              uploadContext="testimonial"
              value={formData.image}
              onChange={({ url, meta }) =>
                setFormData({ ...formData, image: url, imageMeta: meta })
              }
              label="Bild (optional, MinIO)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Reihenfolge
              </label>
              <input
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.published}
                  onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500"
                />
                <span className="text-gray-300">Veröffentlicht</span>
              </label>
            </div>

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

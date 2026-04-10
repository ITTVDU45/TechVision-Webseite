"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import ImageUpload from './ImageUpload';
import type { StoredImageMeta } from '@/lib/stored-image';
import MultiPageSelector from './MultiPageSelector';
import MultiCategorySelector from './MultiCategorySelector';

interface CaseStudy {
  _id?: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  imageMeta?: StoredImageMeta | null;
  stats: Array<{ value: string; label: string }>;
  category?: string[];
  page?: string[];
  published: boolean;
}

interface CaseStudyFormProps {
  caseStudy?: CaseStudy | null;
  onClose: () => void;
}

export default function CaseStudyForm({ caseStudy, onClose }: CaseStudyFormProps) {
  const [formData, setFormData] = useState<CaseStudy>({
    id: '',
    title: '',
    subtitle: '',
    description: '',
    image: '',
    imageMeta: undefined,
    stats: [],
    category: [],
    page: [],
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [newStat, setNewStat] = useState({ value: '', label: '' });

  // Nur bei gewechseltem Bearbeitungsziel / Neu anlegen — nicht bei formData.title,
  // sonst wird bei jeder Titel-Eingabe das Formular zurückgesetzt (Bild/Änderungen weg).
  useEffect(() => {
    if (caseStudy) {
      setFormData({
        id: caseStudy.id || '',
        title: caseStudy.title || '',
        subtitle: caseStudy.subtitle || '',
        description: caseStudy.description || '',
        image: caseStudy.image || '',
        imageMeta: (caseStudy as { imageMeta?: StoredImageMeta }).imageMeta,
        stats: caseStudy.stats || [],
        category: Array.isArray(caseStudy.category) ? caseStudy.category : (caseStudy.category ? [caseStudy.category] : []),
        page: Array.isArray(caseStudy.page) ? caseStudy.page : (caseStudy.page ? [caseStudy.page] : []),
        published: caseStudy.published !== undefined ? caseStudy.published : true,
      });
      return;
    }
    setFormData({
      id: '',
      title: '',
      subtitle: '',
      description: '',
      image: '',
      imageMeta: undefined,
      stats: [],
      category: [],
      page: [],
      published: true,
    });
  }, [caseStudy]);

  const addStat = () => {
    if (newStat.value && newStat.label) {
      setFormData({
        ...formData,
        stats: [...formData.stats, newStat],
      });
      setNewStat({ value: '', label: '' });
    }
  };

  const removeStat = (index: number) => {
    setFormData({
      ...formData,
      stats: formData.stats.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Frontend-Validierung
    if (!formData.id || formData.id.trim() === '') {
      setError('ID ist erforderlich');
      setLoading(false);
      return;
    }
    if (!formData.title || formData.title.trim() === '') {
      setError('Titel ist erforderlich');
      setLoading(false);
      return;
    }
    if (!formData.subtitle || formData.subtitle.trim() === '') {
      setError('Untertitel ist erforderlich');
      setLoading(false);
      return;
    }
    if (!formData.description || formData.description.trim() === '') {
      setError('Beschreibung ist erforderlich');
      setLoading(false);
      return;
    }

    try {
      const url = '/api/case-studies';
      const method = caseStudy ? 'PUT' : 'POST';
      const resolvedImage =
        formData.image?.trim() || formData.imageMeta?.url?.trim() || '';
      const body: Record<string, unknown> = caseStudy
        ? { ...formData, image: resolvedImage, _id: caseStudy._id }
        : { ...formData, image: resolvedImage };
      if (resolvedImage) {
        if (formData.imageMeta) body.imageMeta = formData.imageMeta;
      } else {
        body.imageMeta = null;
      }

      console.log('Sending case study data:', JSON.stringify(body, null, 2));

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });

      if (res.ok) {
        onClose();
        // Seite neu laden, um die Liste zu aktualisieren
        window.location.reload();
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
        console.error('API Error:', errorData);
        if (res.status === 503) {
          setError('MongoDB ist nicht konfiguriert. Bitte setzen Sie MONGODB_URI in .env.local, um Case Studies zu erstellen.');
        } else if (res.status === 400) {
          const errorMsg = errorData.error || 'Validierungsfehler: Bitte überprüfen Sie alle Felder.';
          setError(errorMsg);
        } else {
          setError(errorData.error || 'Fehler beim Speichern des Case Studies');
        }
      }
    } catch (error) {
      console.error('Error saving case study:', error);
      setError('Fehler beim Speichern. Bitte versuchen Sie es erneut.');
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
          className="max-h-[min(92dvh,100svh)] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-x-0 border-b-0 border-gray-800 bg-gray-900 touch-pan-y pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:max-h-[90vh] sm:rounded-2xl sm:border sm:max-w-4xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              {caseStudy ? 'Case Study bearbeiten' : 'Neue Case Study hinzufügen'}
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

          <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400">
                {error}
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Titel
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const newTitle = e.target.value;
                    const newId = newTitle
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, title: newTitle, id: newId });
                  }}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  ID (automatisch generiert)
                </label>
                <input
                  type="text"
                  value={formData.id}
                  onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Untertitel
              </label>
              <input
                type="text"
                value={formData.subtitle}
                onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Beschreibung
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={12}
                placeholder={"Schreiben Sie die Case Study mit Abschnitten.\n\nBeispiel:\nAusgangslage\nKurze Einleitung...\n\nHerausforderungen\n- Punkt 1\n- Punkt 2\n\nErgebnisse\nZeitersparnis: 40%\nBessere Planung: zentrale Disposition"}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-base"
              />
              <p className="mt-2 text-sm text-gray-400">
                Tipp: Überschriften in eine eigene Zeile schreiben. Zeilen mit
                <code className="mx-1 rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-200">Titel: Inhalt</code>
                oder
                <code className="mx-1 rounded bg-gray-800 px-1.5 py-0.5 text-xs text-gray-200">- Listenpunkt</code>
                werden im Frontend automatisch strukturierter dargestellt.
              </p>
            </div>

            <ImageUpload
              uploadContext="case-study"
              value={formData.image}
              onChange={({ url, meta }) =>
                setFormData((prev) => ({ ...prev, image: url, imageMeta: meta }))
              }
              label="Case Study Bild (optional, MinIO)"
            />

            <MultiCategorySelector
              value={formData.category || []}
              onChange={(value) => setFormData({ ...formData, category: value })}
              label="Kategorien (Mehrfachauswahl möglich)"
            />

            <MultiPageSelector
              value={formData.page || []}
              onChange={(value) => setFormData({ ...formData, page: value })}
              label="Auf welchen Seiten anzeigen? (Mehrfachauswahl möglich)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Statistiken
              </label>
              <div className="space-y-2 mb-2">
                {formData.stats.map((stat, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-800 rounded-lg">
                    <span className="text-blue-400 font-bold">{stat.value}</span>
                    <span className="text-gray-400">-</span>
                    <span className="text-gray-300 flex-1">{stat.label}</span>
                    <button
                      type="button"
                      onClick={() => removeStat(index)}
                      className="p-1 text-red-400 hover:text-red-300"
                    >
                      <IconTrash className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newStat.value}
                  onChange={(e) => setNewStat({ ...newStat, value: e.target.value })}
                  placeholder="Wert (z.B. 40%)"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  value={newStat.label}
                  onChange={(e) => setNewStat({ ...newStat, label: e.target.value })}
                  placeholder="Label (z.B. Effizienzsteigerung)"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={addStat}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white"
                >
                  <IconPlus className="w-5 h-5" />
                </button>
              </div>
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

            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors min-h-[44px]"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all disabled:opacity-50 min-h-[44px]"
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

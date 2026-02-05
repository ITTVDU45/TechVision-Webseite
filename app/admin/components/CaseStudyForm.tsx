"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';
import ImageUpload from './ImageUpload';
import MultiPageSelector from './MultiPageSelector';
import MultiCategorySelector from './MultiCategorySelector';

interface CaseStudy {
  _id?: string;
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
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
    stats: [],
    category: [],
    page: [],
    published: true,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [newStat, setNewStat] = useState({ value: '', label: '' });

  useEffect(() => {
    if (caseStudy) {
      setFormData({
        id: caseStudy.id || '',
        title: caseStudy.title || '',
        subtitle: caseStudy.subtitle || '',
        description: caseStudy.description || '',
        image: caseStudy.image || '',
        stats: caseStudy.stats || [],
        category: Array.isArray(caseStudy.category) ? caseStudy.category : (caseStudy.category ? [caseStudy.category] : []),
        page: Array.isArray(caseStudy.page) ? caseStudy.page : (caseStudy.page ? [caseStudy.page] : []),
        published: caseStudy.published !== undefined ? caseStudy.published : true,
      });
    } else {
      // Generate ID from title for new case study
      if (formData.title && !formData.id) {
        const generateId = (title: string) => {
          return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
        };
        setFormData((prev) => ({ ...prev, id: generateId(prev.title) }));
      }
    }
  }, [caseStudy, formData.title]);

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
      const body = caseStudy ? { ...formData, _id: caseStudy._id } : formData;

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
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="bg-gray-900 rounded-lg md:rounded-2xl border border-gray-800 w-full md:max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 md:p-6 flex items-center justify-between z-10">
            <h2 className="text-lg md:text-2xl font-bold text-white">
              {caseStudy ? 'Case Study bearbeiten' : 'Neue Case Study hinzufügen'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Schließen"
            >
              <IconX className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-4 md:p-6 space-y-4 md:space-y-6">
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
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-base"
              />
            </div>

            <ImageUpload
              value={formData.image}
              onChange={(url) => setFormData({ ...formData, image: url })}
              label="Case Study Bild (optional)"
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

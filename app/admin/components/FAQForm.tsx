"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import PageSelector from './PageSelector';
import CategorySelector from './CategorySelector';

interface FAQ {
  _id?: string;
  question: string;
  answer: string;
  page: string;
  category?: string;
  order: number;
}

interface FAQFormProps {
  faq?: FAQ | null;
  onClose: () => void;
}

export default function FAQForm({ faq, onClose }: FAQFormProps) {
  const [formData, setFormData] = useState<FAQ>({
    question: '',
    answer: '',
    page: 'home',
    category: '',
    order: 0,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (faq) {
      setFormData({
        question: faq.question || '',
        answer: faq.answer || '',
        page: faq.page || 'home',
        category: faq.category || '',
        order: faq.order || 0,
      });
    }
  }, [faq]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const url = faq ? '/api/faqs' : '/api/faqs';
      const method = faq ? 'PUT' : 'POST';
      const body = faq ? { ...formData, _id: faq._id } : formData;

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include', // Wichtig: Cookies (Session) mitsenden
      });

      if (res.ok) {
        onClose();
      } else {
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
        if (res.status === 503) {
          setError('MongoDB ist nicht konfiguriert. Bitte setzen Sie MONGODB_URI in .env.local, um FAQs zu erstellen.');
        } else {
          setError(errorData.error || 'Fehler beim Speichern der FAQ');
        }
      }
    } catch (error) {
      console.error('Error saving FAQ:', error);
      setError('Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.');
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
          className="bg-gray-900 rounded-lg md:rounded-2xl border border-gray-800 w-full md:max-w-2xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 md:p-6 flex items-center justify-between z-10">
            <h2 className="text-lg md:text-2xl font-bold text-white">
              {faq ? 'FAQ bearbeiten' : 'Neue FAQ hinzufügen'}
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
              <div className="p-4 bg-red-500/10 border border-red-500/50 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            <PageSelector
              value={formData.page}
              onChange={(value) => setFormData({ ...formData, page: value })}
            />

            <CategorySelector
              value={formData.category || ''}
              onChange={(value) => setFormData({ ...formData, category: value })}
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Frage
              </label>
              <input
                type="text"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                required
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                placeholder="Wie kann KI mein Unternehmen transformieren?"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Antwort
              </label>
              <textarea
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                required
                rows={6}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-base"
                placeholder="KI hilft, Geschäftsprozesse zu automatisieren..."
              />
            </div>

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

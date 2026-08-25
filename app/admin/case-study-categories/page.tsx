"use client";
import React, { useCallback, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { IconPlus, IconTrash, IconEdit } from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Category {
  _id?: string;
  id: string;
  name: string;
  order: number;
}

export default function CaseStudyCategoriesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [formData, setFormData] = useState({ name: '', order: 0 });
  const [error, setError] = useState<string>('');

  const fetchCategories = useCallback(async () => {
    try {
      const res = await fetch('/api/case-study-categories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        console.log('Fetched categories:', data);
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          console.error('Invalid data format:', data);
          // Fallback auf Standard-Kategorien
          setCategories([
            { id: 'beratung', name: 'Beratung', order: 0 },
            { id: 'webseiten', name: 'Webseiten', order: 1 },
            { id: 'software', name: 'Software', order: 2 },
            { id: 'onlineshop', name: 'Onlineshop', order: 3 },
            { id: 'tools-ki-agenten', name: 'Tools & KI Agenten', order: 4 },
          ]);
        }
      } else {
        console.error('Failed to fetch categories:', res.status);
        // Fallback auf Standard-Kategorien
        setCategories([
          { id: 'beratung', name: 'Beratung', order: 0 },
          { id: 'webseiten', name: 'Webseiten', order: 1 },
          { id: 'software', name: 'Software', order: 2 },
          { id: 'onlineshop', name: 'Onlineshop', order: 3 },
          { id: 'tools-ki-agenten', name: 'Tools & KI Agenten', order: 4 },
        ]);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // Fallback auf Standard-Kategorien
      setCategories([
        { id: 'beratung', name: 'Beratung', order: 0 },
        { id: 'webseiten', name: 'Webseiten', order: 1 },
        { id: 'software', name: 'Software', order: 2 },
        { id: 'onlineshop', name: 'Onlineshop', order: 3 },
        { id: 'tools-ki-agenten', name: 'Tools & KI Agenten', order: 4 },
      ]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) {
      router.push('/admin/login');
      return;
    }
    fetchCategories();
  }, [session, status, router, fetchCategories]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.name || formData.name.trim() === '') {
      setError('Name ist erforderlich');
      return;
    }

    try {
      const method = editingCategory ? 'PUT' : 'POST';
      const body = editingCategory 
        ? { ...formData, id: editingCategory.id, _id: editingCategory._id }
        : formData;

      const res = await fetch('/api/case-study-categories', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        credentials: 'include',
      });

      if (res.ok) {
        setShowForm(false);
        setFormData({ name: '', order: 0 });
        setEditingCategory(null);
        fetchCategories();
      } else {
        const errorData = await res.json();
        setError(errorData.error || 'Fehler beim Speichern');
      }
    } catch (error) {
      console.error('Error saving category:', error);
      setError('Fehler beim Speichern');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Möchten Sie diese Kategorie wirklich löschen?')) return;

    try {
      const res = await fetch(`/api/case-study-categories?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (res.ok) {
        fetchCategories();
      }
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setFormData({ name: category.name, order: category.order || 0 });
    setShowForm(true);
  };

  if (loading) {
    return <div className="p-4 md:p-8 text-white">Lädt...</div>;
  }

  return (
    <div className="p-4 sm:p-5 md:p-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="mb-2 text-2xl font-bold text-white sm:text-3xl">Case Study Kategorien verwalten</h1>
          <p className="text-sm text-gray-400 sm:text-base">Verwalten Sie die Kategorien für Case Studies</p>
        </div>
        <button
          type="button"
          onClick={() => {
            setEditingCategory(null);
            setFormData({ name: '', order: 0 });
            setShowForm(true);
          }}
          className="flex min-h-[44px] w-full touch-manipulation items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 text-sm font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 sm:w-auto sm:px-6"
        >
          <IconPlus className="h-5 w-5 shrink-0" />
          Neue Kategorie hinzufügen
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => (
          <div
            key={category.id}
            className="bg-gray-800 border border-gray-700 rounded-lg p-6 flex items-center justify-between"
          >
            <div>
              <h3 className="text-white font-bold text-lg">{category.name}</h3>
              <p className="text-gray-400 text-sm">ID: {category.id}</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(category)}
                className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
              >
                <IconEdit className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
              >
                <IconTrash className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {showForm && (
        <AnimatePresence>
          <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:bg-black/50 sm:p-4 sm:backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
              className="w-full max-w-md rounded-t-3xl border border-x-0 border-b-0 border-gray-800 bg-gray-900 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:rounded-2xl sm:border"
            >
              <div className="border-b border-gray-800 p-4 sm:p-6">
                <h2 className="text-xl font-bold text-white sm:text-2xl">
                  {editingCategory ? 'Kategorie bearbeiten' : 'Neue Kategorie hinzufügen'}
                </h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4 p-4 sm:p-6">
                {error && (
                  <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 text-red-400 text-sm">
                    {error}
                  </div>
                )}

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
                    placeholder="z.B. Beratung"
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

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowForm(false);
                      setEditingCategory(null);
                      setFormData({ name: '', order: 0 });
                      setError('');
                    }}
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white font-medium hover:bg-gray-700 transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-lg text-white font-medium hover:from-blue-600 hover:to-indigo-700 transition-all"
                  >
                    Speichern
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        </AnimatePresence>
      )}
    </div>
  );
}

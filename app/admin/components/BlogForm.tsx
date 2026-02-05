"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IconX } from '@tabler/icons-react';
import ImageUpload from './ImageUpload';
import MultiPageSelector from './MultiPageSelector';
import MultiBlogCategorySelector from './MultiBlogCategorySelector';

interface BlogPost {
  _id?: string;
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  content?: string;
  image: string;
  date: string;
  readTime: string;
  category: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  tags?: string[];
  page?: string[];
  published: boolean;
}

interface BlogFormProps {
  blog?: BlogPost | null;
  onClose: () => void;
}

export default function BlogForm({ blog, onClose }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogPost>({
    id: '',
    slug: '',
    title: '',
    subtitle: '',
    description: '',
    content: '',
    image: '',
    date: new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' }),
    readTime: '5 min',
    category: [],
    tags: [],
    page: [],
    published: true,
  });
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (blog) {
      setFormData({
        id: blog.id || '',
        slug: (blog as any).slug || blog.id || '',
        title: blog.title || '',
        subtitle: blog.subtitle || '',
        description: blog.description || '',
        content: (blog as any).content || '',
        image: blog.image || '',
        date: blog.date || '',
        readTime: blog.readTime || '5 min',
        category: Array.isArray(blog.category) 
          ? blog.category 
          : (blog.category?.name ? [{ 
              id: blog.category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
              name: blog.category.name, 
              icon: blog.category.icon || '📝' 
            }] : []),
        tags: (blog as any).tags || [],
        page: Array.isArray((blog as any).page) 
          ? (blog as any).page 
          : ((blog as any).page ? [(blog as any).page] : []),
        published: blog.published !== undefined ? blog.published : true,
      });
    } else {
      // Generate ID and slug from title for new blog
      const generateSlug = (title: string) => {
        return title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '');
      };
      if (formData.title && !formData.id) {
        const slug = generateSlug(formData.title);
        setFormData((prev) => ({ ...prev, id: slug, slug: slug }));
      }
    }
  }, [blog, formData.title]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Frontend-Validierung
    if (!formData.title || formData.title.trim() === '') {
      setError('Bitte geben Sie einen Titel ein.');
      setLoading(false);
      return;
    }
    if (!formData.subtitle || formData.subtitle.trim() === '') {
      setError('Bitte geben Sie einen Untertitel ein.');
      setLoading(false);
      return;
    }
    if (!formData.description || formData.description.trim() === '') {
      setError('Bitte geben Sie eine Beschreibung ein.');
      setLoading(false);
      return;
    }
    if (!formData.category || !Array.isArray(formData.category) || formData.category.length === 0) {
      setError('Bitte wählen Sie mindestens eine Kategorie aus.');
      setLoading(false);
      return;
    }

    try {
      const url = '/api/blogs';
      const method = blog ? 'PUT' : 'POST';
      
      // Stelle sicher, dass alle Felder korrekt gesetzt sind
      const body: any = {
        id: formData.id,
        slug: formData.slug || formData.id,
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        content: formData.content || '',
        image: formData.image || 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image',
        date: formData.date,
        readTime: formData.readTime,
        category: formData.category,
        tags: Array.isArray(formData.tags) ? formData.tags : [],
        published: formData.published !== undefined ? formData.published : true,
      };
      
      // Stelle sicher, dass page ein Array ist
      body.page = Array.isArray(formData.page) ? formData.page : [];
      
      // Füge _id nur beim Update hinzu
      if (blog && blog._id) {
        body._id = blog._id;
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
        const errorData = await res.json().catch(() => ({ error: 'Unbekannter Fehler' }));
        console.error('API Error:', errorData);
        if (res.status === 503) {
          setError('MongoDB ist nicht konfiguriert. Bitte setzen Sie MONGODB_URI in .env.local, um Blogs zu erstellen.');
        } else if (res.status === 400) {
          const errorMsg = errorData.error || 'Validierungsfehler: Bitte überprüfen Sie alle Felder.';
          console.error('Validation error:', errorData);
          setError(errorMsg);
        } else {
          setError(errorData.error || 'Fehler beim Speichern des Blogs');
        }
      }
    } catch (error) {
      console.error('Error saving blog:', error);
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
          className="bg-gray-900 rounded-lg md:rounded-2xl border border-gray-800 w-full md:max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <div className="sticky top-0 bg-gray-900 border-b border-gray-800 p-4 md:p-6 flex items-center justify-between z-10">
            <h2 className="text-lg md:text-2xl font-bold text-white">
              {blog ? 'Blog bearbeiten' : 'Neuen Blog hinzufügen'}
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
                    const newSlug = newTitle
                      .toLowerCase()
                      .replace(/[^a-z0-9]+/g, '-')
                      .replace(/(^-|-$)/g, '');
                    setFormData({ ...formData, title: newTitle, id: newSlug, slug: newSlug });
                  }}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Slug (URL, automatisch generiert)
                </label>
                <input
                  type="text"
                  value={formData.slug || formData.id}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value, id: e.target.value })}
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
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Beschreibung (Kurzbeschreibung)
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
                rows={4}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-base"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Vollständiger Artikel-Content (Markdown unterstützt)
              </label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                rows={10}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y font-mono text-sm md:text-base"
                placeholder="Schreiben Sie hier den vollständigen Artikel..."
              />
            </div>

            <div>
              <ImageUpload
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
                label="Blog-Bild (optional)"
              />
              {!formData.image && (
                <p className="text-sm text-gray-400 mt-2">ℹ️ Wenn kein Bild hochgeladen wird, wird ein Platzhalter verwendet.</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Lesezeit
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder="5 min"
                />
              </div>
            </div>

            <MultiBlogCategorySelector
              value={formData.category.map(c => c.id)}
              onChange={(categoryIds) => {
                // Lade Kategorien-Details
                fetch('/api/blog-categories', { cache: 'no-store' })
                  .then(res => res.json())
                  .then(categories => {
                    const selectedCategories = categoryIds.map(id => {
                      const cat = categories.find((c: any) => c.id === id);
                      return cat || { id, name: id, icon: '📝' };
                    });
                    setFormData({ ...formData, category: selectedCategories });
                  })
                  .catch(() => {
                    // Fallback: Erstelle Kategorien-Objekte aus IDs
                    const selectedCategories = categoryIds.map(id => ({
                      id,
                      name: id,
                      icon: '📝',
                    }));
                    setFormData({ ...formData, category: selectedCategories });
                  });
              }}
              label="Kategorien (Mehrfachauswahl möglich)"
            />

            <MultiPageSelector
              value={formData.page || []}
              onChange={(value) => setFormData({ ...formData, page: value })}
              label="Zuordnung zu Seiten (Mehrfachauswahl möglich)"
            />

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Tags (durch Komma getrennt)
              </label>
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onBlur={() => {
                  if (tagInput.trim()) {
                    const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);
                    setFormData({ ...formData, tags: [...(formData.tags || []), ...tags] });
                    setTagInput('');
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    if (tagInput.trim()) {
                      const tags = tagInput.split(',').map(t => t.trim()).filter(t => t);
                      setFormData({ ...formData, tags: [...(formData.tags || []), ...tags] });
                      setTagInput('');
                    }
                  }
                }}
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="KI, Automatisierung, Software..."
              />
              {formData.tags && formData.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm flex items-center gap-2"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => {
                          const newTags = formData.tags?.filter((_, i) => i !== idx) || [];
                          setFormData({ ...formData, tags: newTags });
                        }}
                        className="hover:text-red-400"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Datum
                </label>
                <input
                  type="text"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  required
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
                  placeholder="15. März 2024"
                />
              </div>

              <div className="flex items-center md:pt-8">
                <label className="flex items-center gap-2 cursor-pointer min-h-[44px]">
                  <input
                    type="checkbox"
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-blue-600 focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="text-gray-300">Veröffentlicht</span>
                </label>
              </div>
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

"use client";
import React, { useState, useEffect } from 'react';
import { IconX, IconPlus, IconTrash } from '@tabler/icons-react';

interface Category {
  id: string;
  name: string;
  icon: string;
  order?: number;
  _id?: string;
}

interface MultiBlogCategorySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

export default function MultiBlogCategorySelector({ value = [], onChange, label = 'Kategorien' }: MultiBlogCategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('📝');
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const res = await fetch('/api/blog-categories', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setCategories(data);
        } else {
          setCategories([
            { id: 'ki', name: 'KI', icon: '🤖', order: 0 },
            { id: 'software', name: 'Software', icon: '💻', order: 1 },
            { id: 'webentwicklung', name: 'Webentwicklung', icon: '🌐', order: 2 },
            { id: 'automatisierung', name: 'Automatisierung', icon: '⚙️', order: 3 },
            { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', order: 4 },
          ]);
        }
      } else {
        setCategories([
          { id: 'ki', name: 'KI', icon: '🤖', order: 0 },
          { id: 'software', name: 'Software', icon: '💻', order: 1 },
          { id: 'webentwicklung', name: 'Webentwicklung', icon: '🌐', order: 2 },
          { id: 'automatisierung', name: 'Automatisierung', icon: '⚙️', order: 3 },
          { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', order: 4 },
        ]);
      }
    } catch (error) {
      console.error('Error loading categories:', error);
      setCategories([
        { id: 'ki', name: 'KI', icon: '🤖', order: 0 },
        { id: 'software', name: 'Software', icon: '💻', order: 1 },
        { id: 'webentwicklung', name: 'Webentwicklung', icon: '🌐', order: 2 },
        { id: 'automatisierung', name: 'Automatisierung', icon: '⚙️', order: 3 },
        { id: 'cybersecurity', name: 'Cybersecurity', icon: '🔒', order: 4 },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = (categoryId: string) => {
    if (value.includes(categoryId)) {
      onChange(value.filter((v) => v !== categoryId));
    } else {
      onChange([...value, categoryId]);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;

    try {
      const res = await fetch('/api/blog-categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: newCategoryName.trim(),
          icon: newCategoryIcon,
        }),
      });

      if (res.ok) {
        const newCategory = await res.json();
        setCategories([...categories, newCategory]);
        setNewCategoryName('');
        setNewCategoryIcon('📝');
        setShowAddDialog(false);
        // Automatisch zur Auswahl hinzufügen
        onChange([...value, newCategory.id]);
      } else {
        const error = await res.json();
        alert(error.error || 'Fehler beim Hinzufügen der Kategorie');
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Fehler beim Hinzufügen der Kategorie');
    }
  };

  const handleDeleteCategory = async (categoryId: string) => {
    if (!deleteConfirm) {
      setDeleteConfirm(categoryId);
      return;
    }

    if (deleteConfirm !== categoryId) {
      setDeleteConfirm(null);
      return;
    }

    try {
      const category = categories.find(c => c.id === categoryId);
      const res = await fetch(`/api/blog-categories?_id=${category?._id || categoryId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (res.ok) {
        setCategories(categories.filter(c => c.id !== categoryId));
        onChange(value.filter(v => v !== categoryId));
        setDeleteConfirm(null);
      } else {
        const error = await res.json();
        alert(error.error || 'Fehler beim Löschen der Kategorie');
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Fehler beim Löschen der Kategorie');
    }
  };

  if (loading) {
    return (
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-300">{label}</label>
        <div className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400">
          Lädt Kategorien...
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      
      {/* Dropdown für Kategorien */}
      <div className="relative">
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              handleToggle(e.target.value);
              e.target.value = '';
            }
          }}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
        >
          <option value="">Kategorie auswählen...</option>
          {categories
            .filter(cat => !value.includes(cat.id))
            .map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
        </select>
        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
          <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Ausgewählte Kategorien als Badges */}
      {value.length > 0 && (
        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400 mb-2">Ausgewählte Kategorien:</div>
          <div className="flex flex-wrap gap-2">
            {value.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              const isDeleteConfirm = deleteConfirm === categoryId;
              
              return (
                <span
                  key={categoryId}
                  className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm transition-all ${
                    isDeleteConfirm
                      ? 'bg-red-500/20 text-red-400 border-2 border-red-500'
                      : 'bg-purple-500/20 text-purple-400'
                  }`}
                >
                  {category?.icon || '📝'} {category?.name || categoryId}
                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(categoryId)}
                    className="text-purple-300 hover:text-red-400 transition-colors"
                    title={isDeleteConfirm ? 'Klicken Sie erneut zum Bestätigen' : 'Kategorie löschen'}
                  >
                    {isDeleteConfirm ? (
                      <IconTrash className="w-3 h-3" />
                    ) : (
                      <IconX className="w-3 h-3" />
                    )}
                  </button>
                </span>
              );
            })}
          </div>
          {deleteConfirm && (
            <div className="mt-2 text-xs text-red-400">
              ⚠️ Klicken Sie erneut auf das Mülleimer-Icon zum Bestätigen
            </div>
          )}
        </div>
      )}

      {/* Button zum Hinzufügen neuer Kategorie */}
      <button
        type="button"
        onClick={() => setShowAddDialog(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors text-sm"
      >
        <IconPlus className="w-4 h-4" />
        Neue Kategorie hinzufügen
      </button>

      {/* Dialog zum Hinzufügen neuer Kategorie */}
      {showAddDialog && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-6 w-full max-w-md">
            <h3 className="text-lg font-bold text-white mb-4">Neue Kategorie hinzufügen</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Kategorie Name
                </label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="z.B. KI, Software..."
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Icon (Emoji)
                </label>
                <input
                  type="text"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="📝"
                  maxLength={2}
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowAddDialog(false);
                    setNewCategoryName('');
                    setNewCategoryIcon('📝');
                  }}
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white hover:bg-gray-700 transition-colors"
                >
                  Abbrechen
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  disabled={!newCategoryName.trim()}
                  className="flex-1 px-4 py-2 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Hinzufügen
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

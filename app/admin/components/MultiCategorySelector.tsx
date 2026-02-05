"use client";
import React, { useState, useEffect } from 'react';
import { IconX } from '@tabler/icons-react';

interface Category {
  id: string;
  name: string;
  order?: number;
}

interface MultiCategorySelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

export default function MultiCategorySelector({ value = [], onChange, label = 'Kategorien' }: MultiCategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('/api/case-study-categories', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCategories(data);
          } else {
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
        console.error('Error loading categories:', error);
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
    };

    loadCategories();
  }, []);

  const handleToggle = (categoryId: string) => {
    if (value.includes(categoryId)) {
      onChange(value.filter((v) => v !== categoryId));
    } else {
      onChange([...value, categoryId]);
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
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => {
          const isSelected = value.includes(category.id);
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => handleToggle(category.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-green-600 text-white border-2 border-green-500'
                  : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              {category.name}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400 mb-2">Ausgewählte Kategorien:</div>
          <div className="flex flex-wrap gap-2">
            {value.map((categoryId) => {
              const category = categories.find((c) => c.id === categoryId);
              return (
                <span
                  key={categoryId}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm"
                >
                  {category?.name || categoryId}
                  <button
                    type="button"
                    onClick={() => handleToggle(categoryId)}
                    className="text-green-300 hover:text-white"
                  >
                    <IconX className="w-3 h-3" />
                  </button>
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

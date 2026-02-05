"use client";
import React, { useState, useEffect } from 'react';

interface Category {
  id: string;
  name: string;
  order?: number;
}

interface CaseStudyCategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function CaseStudyCategorySelector({ value, onChange, label = 'Kategorie' }: CaseStudyCategorySelectorProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const res = await fetch('/api/case-study-categories', { cache: 'no-store' });
        if (res.ok) {
          const data = await res.json();
          console.log('Loaded categories:', data);
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
          console.error('Failed to load categories:', res.status);
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

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      {loading ? (
        <div className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-400">
          Lädt Kategorien...
        </div>
      ) : (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Kategorie auswählen</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

"use client";
import React from 'react';

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const categories = [
  { value: '', label: 'Keine Kategorie' },
  { value: 'ki-transformation', label: 'KI Transformation' },
  { value: 'ki-beratung', label: 'KI Beratung' },
  { value: 'softwareentwicklung', label: 'Softwareentwicklung' },
  { value: 'webseitenentwicklung', label: 'Webseitenentwicklung' },
  { value: 'onlineshop-entwicklung', label: 'Onlineshop Entwicklung' },
  { value: 'workflow-automatisierung', label: 'Workflow Automatisierung' },
  { value: 'digitale-transformation', label: 'Digitale Transformation' },
  { value: 'cyber-security-beratung', label: 'Cyber Security Beratung' },
  { value: 'it-infrastruktur', label: 'IT Infrastruktur' },
  { value: 'hosting', label: 'Hosting' },
  { value: 'tools-ki-agenten', label: 'Tools & KI-Agenten' },
];

export default function CategorySelector({ value, onChange, label = 'Kategorie' }: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {categories.map((category) => (
          <option key={category.value} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}

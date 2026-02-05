"use client";
import React from 'react';

interface PageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

const pages = [
  { value: 'all', label: 'Alle Seiten' },
  { value: 'home', label: 'Startseite' },
  { value: 'ki-transformation', label: 'KI Transformation' },
  { value: 'software-development', label: 'Softwareentwicklung' },
  { value: 'workflow-automation', label: 'Workflow Automation' },
  { value: 'cybersecurity', label: 'Cybersecurity' },
  { value: 'tools', label: 'Tools & KI-Agenten' },
  { value: 'webhosting', label: 'Webhosting' },
  { value: 'it-infrastructure', label: 'IT Infrastruktur' },
  { value: 'web-development', label: 'Webentwicklung' },
];

export default function PageSelector({ value, onChange, label = 'Seite' }: PageSelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {pages.map((page) => (
          <option key={page.value} value={page.value}>
            {page.label}
          </option>
        ))}
      </select>
    </div>
  );
}

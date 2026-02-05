"use client";
import React from 'react';
import { IconX } from '@tabler/icons-react';

interface MultiPageSelectorProps {
  value: string[];
  onChange: (value: string[]) => void;
  label?: string;
}

const pages = [
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

export default function MultiPageSelector({ value = [], onChange, label = 'Seiten' }: MultiPageSelectorProps) {
  const handleToggle = (pageValue: string) => {
    if (value.includes(pageValue)) {
      onChange(value.filter((v) => v !== pageValue));
    } else {
      onChange([...value, pageValue]);
    }
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => {
          const isSelected = value.includes(page.value);
          return (
            <button
              key={page.value}
              type="button"
              onClick={() => handleToggle(page.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white border-2 border-blue-500'
                  : 'bg-gray-800 text-gray-300 border-2 border-gray-700 hover:border-gray-600'
              }`}
            >
              {page.label}
            </button>
          );
        })}
      </div>
      {value.length > 0 && (
        <div className="mt-3 p-3 bg-gray-800 rounded-lg">
          <div className="text-xs text-gray-400 mb-2">Ausgewählte Seiten:</div>
          <div className="flex flex-wrap gap-2">
            {value.map((pageValue) => {
              const page = pages.find((p) => p.value === pageValue);
              return (
                <span
                  key={pageValue}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                >
                  {page?.label || pageValue}
                  <button
                    type="button"
                    onClick={() => handleToggle(pageValue)}
                    className="text-blue-300 hover:text-white"
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

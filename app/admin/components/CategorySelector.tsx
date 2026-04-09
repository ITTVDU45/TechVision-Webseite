"use client";

import React from "react";
import { FAQ_CATEGORY_OPTIONS } from "@/lib/cms-faq-taxonomy";

interface CategorySelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
}

export default function CategorySelector({
  value,
  onChange,
  label = "Kategorie",
}: CategorySelectorProps) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        {FAQ_CATEGORY_OPTIONS.map((category) => (
          <option key={category.value || "none"} value={category.value}>
            {category.label}
          </option>
        ))}
      </select>
    </div>
  );
}

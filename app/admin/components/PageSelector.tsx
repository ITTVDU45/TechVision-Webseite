"use client";

import React from "react";
import { FAQ_PAGE_OPTIONS_FILTER, FAQ_PAGE_OPTIONS_FORM } from "@/lib/cms-faq-taxonomy";

interface PageSelectorProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  /** true = inkl. „Alle Seiten“ (Listenfilter). false = nur CMS-Seiten (Formulare). */
  showAllOption?: boolean;
  /** Erste Option: leerer Wert (z. B. Testimonials „keine Seite“). */
  includeEmptyOption?: boolean;
  emptyOptionLabel?: string;
}

export default function PageSelector({
  value,
  onChange,
  label = "Seite",
  showAllOption = true,
  includeEmptyOption = false,
  emptyOptionLabel = "Keine Zuordnung",
}: PageSelectorProps) {
  let pages = showAllOption ? FAQ_PAGE_OPTIONS_FILTER : FAQ_PAGE_OPTIONS_FORM;
  if (includeEmptyOption && !showAllOption) {
    pages = [{ value: "", label: emptyOptionLabel }, ...FAQ_PAGE_OPTIONS_FORM];
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-300">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-h-[44px] w-full touch-manipulation rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

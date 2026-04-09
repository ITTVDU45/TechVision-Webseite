"use client";

import React, { useCallback, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX } from "@tabler/icons-react";
import {
  FAQ_PAGE_OPTIONS_FORM,
  FAQ_CATEGORY_OPTIONS,
  FAQ_PAGE_SLUGS,
  FAQ_CATEGORY_SLUGS,
  faqBulkItemSchema,
} from "@/lib/cms-faq-taxonomy";

const PAGE_SET = new Set<string>(FAQ_PAGE_SLUGS);
const CATEGORY_SET = new Set<string>(FAQ_CATEGORY_SLUGS);

export interface FAQBulkPreviewRow {
  question: string;
  answer: string;
  page: string;
  category: string;
  order: number;
}

interface FAQBulkImportDialogProps {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
}

function normalizeRow(row: FAQBulkPreviewRow): FAQBulkPreviewRow {
  return {
    question: row.question.trim(),
    answer: row.answer.trim(),
    page: row.page,
    category: row.category?.trim() ?? "",
    order: Number.isFinite(row.order) ? row.order : 0,
  };
}

function rowIsValid(row: FAQBulkPreviewRow): boolean {
  const n = normalizeRow(row);
  return faqBulkItemSchema.safeParse({
    question: n.question,
    answer: n.answer,
    page: n.page,
    category: n.category || undefined,
    order: n.order,
  }).success;
}

export default function FAQBulkImportDialog({
  open,
  onClose,
  onSaved,
}: FAQBulkImportDialogProps) {
  const [rawText, setRawText] = useState("");
  const [items, setItems] = useState<FAQBulkPreviewRow[]>([]);
  const [analyzeLoading, setAnalyzeLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setError(null);
  }, [open]);

  const handleClose = useCallback(() => {
    setRawText("");
    setItems([]);
    setError(null);
    onClose();
  }, [onClose]);

  const updateRow = useCallback(
    (index: number, patch: Partial<FAQBulkPreviewRow>) => {
      setItems((prev) =>
        prev.map((row, i) => (i === index ? { ...row, ...patch } : row))
      );
    },
    []
  );

  const handleAnalyze = async () => {
    setError(null);
    const text = rawText.trim();
    if (!text) {
      setError("Bitte Rohtext einfügen.");
      return;
    }
    setAnalyzeLoading(true);
    try {
      const res = await fetch("/api/faqs/process-bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ rawText: text }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Analyse fehlgeschlagen."
        );
        return;
      }
      const list = Array.isArray(data.items) ? data.items : [];
      setItems(
        list.map((it: FAQBulkPreviewRow, i: number) => {
          const p = String(it.page ?? "home");
          const c = String(it.category ?? "");
          return {
            question: String(it.question ?? ""),
            answer: String(it.answer ?? ""),
            page: PAGE_SET.has(p) ? p : "home",
            category: c === "" || CATEGORY_SET.has(c) ? c : "",
            order: typeof it.order === "number" ? it.order : i,
          };
        })
      );
    } catch {
      setError("Netzwerkfehler bei der KI-Analyse.");
    } finally {
      setAnalyzeLoading(false);
    }
  };

  const allValid = items.length > 0 && items.every(rowIsValid);
  const invalidCount = items.filter((r) => !rowIsValid(r)).length;

  const handleSaveAll = async () => {
    if (!allValid) return;
    setError(null);
    setSaveLoading(true);
    try {
      const payload = {
        items: items.map((row) => {
          const n = normalizeRow(row);
          return {
            question: n.question,
            answer: n.answer,
            page: n.page,
            order: n.order,
            ...(n.category ? { category: n.category } : {}),
          };
        }),
      };
      const res = await fetch("/api/faqs/bulk", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(
          typeof data.error === "string"
            ? data.error
            : "Speichern fehlgeschlagen."
        );
        return;
      }
      onSaved();
      handleClose();
    } catch {
      setError("Netzwerkfehler beim Speichern.");
    } finally {
      setSaveLoading(false);
    }
  };

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/60 p-0 sm:items-center sm:bg-black/50 sm:p-4 sm:backdrop-blur-sm">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 16 }}
          transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
          className="max-h-[min(92dvh,100svh)] w-full overflow-y-auto overscroll-contain rounded-t-3xl border border-x-0 border-b-0 border-gray-800 bg-gray-900 touch-pan-y pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:max-h-[90vh] sm:rounded-2xl sm:border sm:max-w-5xl"
        >
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-800 bg-gray-900 p-4 sm:p-6">
            <h2 className="text-xl font-bold text-white sm:text-2xl">
              Massenimport (KI)
            </h2>
            <button
              type="button"
              onClick={handleClose}
              className="flex min-h-[44px] min-w-[44px] items-center justify-center rounded-lg transition-colors hover:bg-gray-800 touch-manipulation"
              aria-label="Schließen"
            >
              <IconX className="h-5 w-5 text-gray-400" />
            </button>
          </div>

          <div className="space-y-4 p-4 sm:space-y-6 sm:p-6">
            {error && (
              <div className="rounded-lg border border-red-500/50 bg-red-500/10 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <p className="text-sm text-gray-400">
              Rohtext einfügen (z.&nbsp;B. nummerierte Liste oder Blöcke mit
              „Frage:“ / „Antwort:“). Max. ca. 50 Einträge pro Durchlauf. Mit
              „Mit KI analysieren“ werden Seite und Kategorie vorgeschlagen;
              bitte in der Tabelle prüfen und korrigieren.
            </p>

            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={8}
              className="w-full resize-y rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 text-base text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="1) Frage …&#10;   Antwort …&#10;&#10;2) …"
            />

            <button
              type="button"
              onClick={handleAnalyze}
              disabled={analyzeLoading}
              className="w-full rounded-lg bg-gradient-to-r from-violet-500 to-indigo-600 px-4 py-3 font-medium text-white transition-all hover:from-violet-600 hover:to-indigo-700 disabled:opacity-50 sm:w-auto min-h-[44px]"
            >
              {analyzeLoading ? "KI analysiert…" : "Mit KI analysieren"}
            </button>

            {items.length > 0 && (
              <>
                {invalidCount > 0 && (
                  <p className="text-sm text-amber-400">
                    {invalidCount} Zeile(n) ungültig (rot markiert) – bitte
                    korrigieren, bevor Sie speichern.
                  </p>
                )}

                {/* Mobile: Karten */}
                <div className="space-y-4 md:hidden">
                  {items.map((row, index) => {
                    const valid = rowIsValid(row);
                    return (
                      <div
                        key={index}
                        className={`space-y-3 rounded-lg border p-4 ${
                          valid
                            ? "border-gray-700 bg-gray-800/50"
                            : "border-red-500/60 bg-red-500/5"
                        }`}
                      >
                        <Field
                          label="Frage"
                          input={
                            <input
                              type="text"
                              value={row.question}
                              onChange={(e) =>
                                updateRow(index, { question: e.target.value })
                              }
                              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                            />
                          }
                        />
                        <Field
                          label="Antwort"
                          input={
                            <textarea
                              value={row.answer}
                              onChange={(e) =>
                                updateRow(index, { answer: e.target.value })
                              }
                              rows={4}
                              className="w-full resize-y rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                            />
                          }
                        />
                        <Field
                          label="Seite"
                          input={
                            <select
                              value={row.page}
                              onChange={(e) =>
                                updateRow(index, { page: e.target.value })
                              }
                              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                            >
                              {FAQ_PAGE_OPTIONS_FORM.map((o) => (
                                <option key={o.value} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          }
                        />
                        <Field
                          label="Kategorie"
                          input={
                            <select
                              value={row.category}
                              onChange={(e) =>
                                updateRow(index, { category: e.target.value })
                              }
                              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                            >
                              {FAQ_CATEGORY_OPTIONS.map((o) => (
                                <option key={o.value || "none"} value={o.value}>
                                  {o.label}
                                </option>
                              ))}
                            </select>
                          }
                        />
                        <Field
                          label="Reihenfolge"
                          input={
                            <input
                              type="number"
                              value={row.order}
                              onChange={(e) =>
                                updateRow(index, {
                                  order: parseInt(e.target.value, 10) || 0,
                                })
                              }
                              className="w-full rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white"
                            />
                          }
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Desktop: Tabelle */}
                <div className="hidden md:block overflow-x-auto rounded-lg border border-gray-800">
                  <table className="min-w-[720px] w-full text-left text-sm">
                    <thead className="bg-gray-800 text-xs uppercase tracking-wider text-gray-400">
                      <tr>
                        <th className="px-3 py-2">Frage</th>
                        <th className="px-3 py-2 min-w-[200px]">Antwort</th>
                        <th className="px-3 py-2 whitespace-nowrap">Seite</th>
                        <th className="px-3 py-2 whitespace-nowrap">
                          Kategorie
                        </th>
                        <th className="px-3 py-2 w-20">#</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                      {items.map((row, index) => {
                        const valid = rowIsValid(row);
                        return (
                          <tr
                            key={index}
                            className={
                              valid ? "bg-gray-900/40" : "bg-red-500/10"
                            }
                          >
                            <td className="px-3 py-2 align-top">
                              <input
                                type="text"
                                value={row.question}
                                onChange={(e) =>
                                  updateRow(index, {
                                    question: e.target.value,
                                  })
                                }
                                className="w-full min-w-[140px] rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-white"
                              />
                            </td>
                            <td className="px-3 py-2 align-top">
                              <textarea
                                value={row.answer}
                                onChange={(e) =>
                                  updateRow(index, { answer: e.target.value })
                                }
                                rows={3}
                                className="w-full min-w-[200px] resize-y rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-white"
                              />
                            </td>
                            <td className="px-3 py-2 align-top whitespace-nowrap">
                              <select
                                value={row.page}
                                onChange={(e) =>
                                  updateRow(index, { page: e.target.value })
                                }
                                className="max-w-[160px] rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-white"
                              >
                                {FAQ_PAGE_OPTIONS_FORM.map((o) => (
                                  <option key={o.value} value={o.value}>
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2 align-top whitespace-nowrap">
                              <select
                                value={row.category}
                                onChange={(e) =>
                                  updateRow(index, {
                                    category: e.target.value,
                                  })
                                }
                                className="max-w-[160px] rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-white"
                              >
                                {FAQ_CATEGORY_OPTIONS.map((o) => (
                                  <option
                                    key={o.value || "none"}
                                    value={o.value}
                                  >
                                    {o.label}
                                  </option>
                                ))}
                              </select>
                            </td>
                            <td className="px-3 py-2 align-top">
                              <input
                                type="number"
                                value={row.order}
                                onChange={(e) =>
                                  updateRow(index, {
                                    order: parseInt(e.target.value, 10) || 0,
                                  })
                                }
                                className="w-16 rounded border border-gray-700 bg-gray-800 px-2 py-1.5 text-white"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-3 font-medium text-white transition-colors hover:bg-gray-700 min-h-[44px]"
                  >
                    Abbrechen
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveAll}
                    disabled={!allValid || saveLoading}
                    className="rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 px-4 py-3 font-medium text-white transition-all hover:from-blue-600 hover:to-indigo-700 disabled:opacity-50 min-h-[44px]"
                  >
                    {saveLoading ? "Speichert…" : "Alle speichern"}
                  </button>
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

function Field({
  label,
  input,
}: {
  label: string;
  input: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium uppercase tracking-wider text-gray-400">
        {label}
      </div>
      {input}
    </div>
  );
}

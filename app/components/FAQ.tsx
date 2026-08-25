"use client";

import { useEffect, useMemo, useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { fetchFAQs } from "@/lib/api";

interface FAQItem {
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

const categoryLabels: Record<string, string> = {
  "ki-transformation": "KI-Transformation",
  ki_transformation: "KI-Transformation",
  "ki-beratung": "KI-Beratung",
  softwareentwicklung: "Softwareentwicklung",
  webseitenentwicklung: "Webentwicklung",
  "onlineshop-entwicklung": "E-Commerce",
  "workflow-automatisierung": "Automatisierung",
  "digitale-transformation": "Digitalisierung",
  "cyber-security-beratung": "Cybersecurity",
  "it-infrastruktur": "IT-Infrastruktur",
  hosting: "Hosting",
  "tools-ki-agenten": "Tools & KI-Agenten",
  home: "Allgemein",
  other: "Allgemein",
};

function categoryLabel(id: string) {
  return categoryLabels[id] || id.replace(/[-_]/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchFAQs()
      .then((data) => {
        if (!active || !Array.isArray(data)) return;
        const unique = new Map<string, FAQItem>();
        data.forEach((faq: FAQItem) => { if (faq.question && !unique.has(faq.question)) unique.set(faq.question, faq); });
        setFaqs(Array.from(unique.values()).sort((a, b) => (a.order || 0) - (b.order || 0)));
      })
      .catch((error) => console.error("FAQs could not be loaded", error))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => Array.from(new Set(faqs.map((faq) => faq.category || "other"))).sort((a, b) => categoryLabel(a).localeCompare(categoryLabel(b), "de")), [faqs]);
  const filtered = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("de");
    return faqs.filter((faq) => {
      const matchesCategory = !selectedCategory || (faq.category || "other") === selectedCategory;
      const matchesQuery = !normalized || `${faq.question} ${faq.answer}`.toLocaleLowerCase("de").includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [faqs, query, selectedCategory]);

  return (
    <div className="min-h-screen bg-[#050912] text-white">
      <Header />
      <main>
        <section className="border-b border-white/[0.07] pb-14 pt-36 sm:pb-16 sm:pt-44">
          <div className="section-container">
            <p className="eyebrow">Wissen & Orientierung</p>
            <h1 className="heading-display mt-6 max-w-4xl text-4xl sm:text-6xl lg:text-7xl">Antworten auf wichtige Projektfragen.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Von KI und Softwareentwicklung bis Hosting und IT-Sicherheit: Finden Sie schnell die passende Einordnung.</p>
          </div>
        </section>

        <section className="section-y bg-[#070b13]" aria-labelledby="faq-results-heading">
          <div className="section-container">
            <div className="mx-auto max-w-4xl">
              <label htmlFor="faq-search" className="text-sm font-semibold text-white">Fragen durchsuchen</label>
              <div className="relative mt-3">
                <input id="faq-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Zum Beispiel: Wie läuft ein Softwareprojekt ab?" className="min-h-14 w-full rounded-xl border border-white/10 bg-white/[0.04] px-5 pr-14 text-base text-white placeholder:text-slate-600 focus:border-sky-400/50 focus:outline-none" />
                {query ? <button type="button" onClick={() => setQuery("")} className="focus-ring absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-lg text-slate-400 hover:text-white" aria-label="Suche löschen">×</button> : null}
              </div>

              {categories.length ? (
                <div className="mt-6 flex gap-2 overflow-x-auto pb-2" aria-label="FAQ-Kategorie">
                  <button type="button" onClick={() => setSelectedCategory(null)} aria-pressed={!selectedCategory} className={`focus-ring min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${!selectedCategory ? "border-sky-400/40 bg-sky-400/[0.12] text-sky-200" : "border-white/10 text-slate-400 hover:text-white"}`}>Alle</button>
                  {categories.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category} className={`focus-ring min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${selectedCategory === category ? "border-sky-400/40 bg-sky-400/[0.12] text-sky-200" : "border-white/10 text-slate-400 hover:text-white"}`}>{categoryLabel(category)}</button>)}
                </div>
              ) : null}

              <div className="mt-10 flex items-end justify-between gap-4">
                <h2 id="faq-results-heading" className="text-xl font-semibold text-white">{selectedCategory ? categoryLabel(selectedCategory) : "Alle Fragen"}</h2>
                {!loading ? <p className="text-sm text-slate-500">{filtered.length} {filtered.length === 1 ? "Ergebnis" : "Ergebnisse"}</p> : null}
              </div>

              <div className="mt-5 space-y-3" aria-live="polite">
                {loading ? [0, 1, 2, 3].map((item) => <div key={item} className="skeleton h-20" />) : filtered.length ? filtered.map((faq, index) => (
                  <details key={`${faq.question}-${index}`} className="group surface-card overflow-hidden open:border-sky-400/25">
                    <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-base font-semibold text-white marker:content-none sm:px-7 sm:text-lg"><span>{faq.question}</span><span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-sky-300 transition-transform group-open:rotate-45" aria-hidden="true">+</span></summary>
                    <div className="border-t border-white/[0.06] px-5 py-5 text-sm leading-7 text-slate-400 sm:px-7 sm:text-base">{faq.answer.split("\n").filter(Boolean).map((line, lineIndex) => <p key={lineIndex} className="mb-3 last:mb-0">{line}</p>)}</div>
                  </details>
                )) : <div className="surface-card px-6 py-12 text-center text-sm text-slate-400">Keine passende Antwort gefunden. Versuchen Sie einen anderen Suchbegriff oder kontaktieren Sie uns direkt.</div>}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

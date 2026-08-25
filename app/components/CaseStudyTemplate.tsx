"use client";
import React from "react";
import Link from "next/link";
import { caseStudies, categorizedCases, categories as caseStudyCategories } from "../data/caseStudies";
import Script from "next/script";
import Header from "./Header";

type CaseStudy = {
  id: string;
  title: string;
  subtitle?: string;
  description?: string;
  heroImage?: string;
  image?: string;
  gallery?: readonly string[];
  summary?: string;
  challenges?: string[];
  results?: string[];
};

type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "facts"; items: Array<{ label: string; text: string }> };

type ContentSection = {
  heading?: string;
  blocks: ContentBlock[];
};

function isHeadingLine(line: string, nextLine?: string): boolean {
  if (!line || !nextLine) return false;
  if (line.includes(":")) return false;
  if (/[.!?]$/.test(line)) return false;
  const words = line.split(/\s+/).filter(Boolean);
  return words.length > 0 && words.length <= 8 && line.length <= 72;
}

function splitCaseStudyContent(text: string | undefined): ContentSection[] {
  const lines = (text || "")
    .replace(/\r\n/g, "\n")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  const sections: ContentSection[] = [];
  let current: ContentSection = { blocks: [] };

  const pushSection = () => {
    if (current.heading || current.blocks.length > 0) {
      sections.push(current);
    }
    current = { blocks: [] };
  };

  const pushParagraph = (value: string) => {
    current.blocks.push({ type: "paragraph", text: value });
  };

  const pushList = (items: string[]) => {
    current.blocks.push({ type: "list", items });
  };

  const pushFacts = (items: Array<{ label: string; text: string }>) => {
    current.blocks.push({ type: "facts", items });
  };

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    const nextLine = lines[index + 1];

    if (isHeadingLine(line, nextLine)) {
      pushSection();
      current.heading = line;
      continue;
    }

    if (/^[-*•]\s+/.test(line)) {
      const items: string[] = [];
      let cursor = index;
      while (cursor < lines.length && /^[-*•]\s+/.test(lines[cursor])) {
        items.push(lines[cursor].replace(/^[-*•]\s+/, "").trim());
        cursor += 1;
      }
      pushList(items);
      index = cursor - 1;
      continue;
    }

    if (/^\d+\.\s+/.test(line)) {
      const items: string[] = [];
      let cursor = index;
      while (cursor < lines.length && /^\d+\.\s+/.test(lines[cursor])) {
        items.push(lines[cursor].replace(/^\d+\.\s+/, "").trim());
        cursor += 1;
      }
      pushList(items);
      index = cursor - 1;
      continue;
    }

    const factMatch = line.match(/^([^:]{2,80}):\s+(.+)$/);
    if (factMatch) {
      const items: Array<{ label: string; text: string }> = [];
      let cursor = index;
      while (cursor < lines.length) {
        const match = lines[cursor].match(/^([^:]{2,80}):\s+(.+)$/);
        if (!match) break;
        items.push({ label: match[1].trim(), text: match[2].trim() });
        cursor += 1;
      }
      pushFacts(items);
      index = cursor - 1;
      continue;
    }

    pushParagraph(line);
  }

  pushSection();
  return sections.length > 0 ? sections : [{ blocks: [{ type: "paragraph", text: text || "" }] }];
}

export default function CaseStudyTemplate({
  data,
  othersOverride,
}: {
  data: CaseStudy;
  /** Wenn gesetzt (z. B. aus MongoDB), statt statischer „Weitere Projekte“-Liste. */
  othersOverride?: CaseStudy[];
}) {
  let others: CaseStudy[] = othersOverride
    ? othersOverride.filter((c) => c.id !== data.id)
    : (Object.values(caseStudies).filter((c) => c.id !== data.id) as CaseStudy[]);

  if (othersOverride && others.length === 0) {
    others = Object.values(caseStudies).filter((c) => c.id !== data.id) as CaseStudy[];
  }
  const currentCategoryId =
    Object.entries(categorizedCases).find(([, items]) => items.some((item) => item.id === data.id))?.[0] ?? null;
  const currentCategoryName =
    caseStudyCategories.find((category) => category.id === currentCategoryId)?.name ?? "Allgemein";

  const tags = Array.from(
    new Set(
      [
        currentCategoryName,
        ...(data.subtitle ? data.subtitle.split(/\s+/) : []),
        ...data.title.split(/\s+/),
      ]
        .map((value) => value.replace(/[^\p{L}\p{N}-]/gu, "").trim())
        .filter((value) => value.length >= 3)
    )
  ).slice(0, 10);
  const contentSections = splitCaseStudyContent(data.description || data.summary || "");

  // helper: render gallery - special layout for cms-webentwicklung (2x2)
  const renderGallery = () => {
    if (!data.gallery || data.gallery.length === 0) return null;
    const imgs = data.gallery.slice(0, 4);
    const gridClass = data.id === "cms-webentwicklung" ? "grid grid-cols-2 gap-4 mt-8" : "grid grid-cols-2 md:grid-cols-3 gap-4 mt-8";
    return (
      <div className={gridClass}>
        {imgs.map((src, i) => (
          <div key={i} className="w-full aspect-[4/3] relative rounded-lg overflow-hidden">
            <img src={src} alt={`${data.title} ${i}`} className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      {/* Skip link for keyboard users */}
      <a
        href="#main-content"
        className="absolute left-[-999px] top-4 z-50 bg-white text-black px-3 py-2 rounded-md focus:left-4 focus:shadow-lg"
      >
        Zum Hauptinhalt springen
      </a>
      {/* JSON-LD Schema for CaseStudy */}
      <Script id={`cs-schema-${data.id}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CaseStudy",
          "name": data.title,
          "description": data.description || data.summary || data.subtitle || '',
          "url": `https://your-domain.com/case-studies/${data.id}`,
          "image": data.heroImage || data.image || null,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://your-domain.com/case-studies/${data.id}`
          }
        })}
      </Script>
      <section className="pt-32 pb-16" aria-labelledby="cs-hero-title">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 id="cs-hero-title" className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
            {data.subtitle && <p className="text-xl text-gray-400 mb-6">{data.subtitle}</p>}
            {(data.heroImage || data.image) && (
              <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8 glass">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-indigo-700/6 to-transparent" />
                <img
                  src={data.heroImage || data.image || ""}
                  alt={data.title}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out hover:scale-105"
                />
              </div>
            )}
          </div>
        </div>
      </section>

      <main id="main-content" tabIndex={-1}>
        <section className="py-16" aria-labelledby="cs-summary-title">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
              <div className="space-y-10">
                <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:p-8">
                  <h2 id="cs-summary-title" className="mb-6 text-2xl font-semibold text-white">
                    Zusammenfassung
                  </h2>
                  <div className="space-y-8">
                    {contentSections.map((section, sectionIndex) => (
                      <section key={`${section.heading || "section"}-${sectionIndex}`} className="space-y-5">
                        {section.heading && (
                          <div className="border-l-2 border-blue-500/70 pl-4">
                            <h3 className="text-xl font-semibold text-white">{section.heading}</h3>
                          </div>
                        )}
                        {section.blocks.map((block, blockIndex) => {
                          if (block.type === "paragraph") {
                            return (
                              <p
                                key={`paragraph-${blockIndex}`}
                                className="max-w-none text-base leading-8 text-gray-300 md:text-lg"
                              >
                                {block.text}
                              </p>
                            );
                          }

                          if (block.type === "list") {
                            return (
                              <ul key={`list-${blockIndex}`} className="grid gap-3">
                                {block.items.map((item, itemIndex) => (
                                  <li
                                    key={`item-${itemIndex}`}
                                    className="rounded-2xl border border-white/8 bg-black/30 px-4 py-3 text-sm leading-7 text-gray-300 md:text-base"
                                  >
                                    {item}
                                  </li>
                                ))}
                              </ul>
                            );
                          }

                          return (
                            <div key={`facts-${blockIndex}`} className="grid gap-3">
                              {block.items.map((item, itemIndex) => (
                                <div
                                  key={`fact-${itemIndex}`}
                                  className="rounded-2xl border border-blue-500/15 bg-blue-500/[0.06] p-4"
                                >
                                  <h4 className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-blue-300">
                                    {item.label}
                                  </h4>
                                  <p className="text-sm leading-7 text-gray-300 md:text-base">
                                    {item.text}
                                  </p>
                                </div>
                              ))}
                            </div>
                          );
                        })}
                      </section>
                    ))}
                  </div>
                </section>

                {data.challenges && (
                  <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
                    <h3 className="mb-4 text-xl font-semibold text-white">Herausforderungen</h3>
                    <ul className="grid gap-3">
                      {data.challenges.map((c, i) => (
                        <li key={i} className="rounded-2xl border border-white/8 bg-black/30 px-4 py-3 text-gray-300">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {data.results && (
                  <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl md:p-8">
                    <h3 className="mb-4 text-xl font-semibold text-white">Ergebnisse</h3>
                    <ul className="grid gap-3">
                      {data.results.map((r, i) => (
                        <li key={i} className="rounded-2xl border border-white/8 bg-black/30 px-4 py-3 text-gray-300">
                          {r}
                        </li>
                      ))}
                    </ul>
                  </section>
                )}

                {renderGallery()}
              </div>

              <aside className="space-y-6 lg:sticky lg:top-28">
                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-semibold text-white">Kategorien</h3>
                  <div className="flex flex-col gap-2">
                    {caseStudyCategories.map((category) => {
                      const firstCase = categorizedCases[category.id]?.[0];
                      const isActive = category.id === currentCategoryId;
                      return (
                        <Link
                          key={category.id}
                          href={firstCase ? `/case-studies/${firstCase.id}` : "/case-studies"}
                          className={`rounded-lg border px-3 py-2 text-sm transition ${
                            isActive
                              ? "border-blue-500 bg-blue-600/30 text-blue-200"
                              : "border-white/10 text-gray-300 hover:border-white/30 hover:text-white"
                          }`}
                        >
                          {category.name}
                        </Link>
                      );
                    })}
                  </div>
                </section>

                <section className="rounded-2xl border border-blue-500/30 bg-gradient-to-br from-blue-600/20 via-indigo-600/20 to-transparent p-6">
                  <h3 className="mb-2 text-lg font-semibold text-white">Nehmen Sie Kontakt auf</h3>
                  <p className="mb-4 text-sm text-gray-200">
                    Wir analysieren Ihren Case und zeigen konkrete Potenziale auf.
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link
                      href="/contact"
                      className="rounded-lg bg-white px-4 py-2.5 text-center text-sm font-semibold text-black transition hover:bg-gray-100"
                    >
                      Kontakt aufnehmen
                    </Link>
                    <Link
                      href="/contact"
                      className="rounded-lg border border-white/30 px-4 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-white/10"
                    >
                      Erstgespräch buchen
                    </Link>
                  </div>
                </section>

                <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
                  <h3 className="mb-4 text-lg font-semibold text-white">Schlagwörter</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/20 bg-black/30 px-3 py-1 text-xs text-gray-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </section>
              </aside>
            </div>
          </div>
        </section>
      </main>

      {/* Weitere Projekte - horizontal slider showing 2 cards approx */}
      {others.length > 0 && (
        <section className="py-20 bg-neutral-900/10" aria-labelledby="cs-more-title" role="region">
          <div className="container mx-auto px-4">
            <h2 id="cs-more-title" className="text-3xl font-bold mb-8">Weitere Projekte</h2>
            <div className="-mx-4 overflow-x-auto">
              <div className="flex gap-6 px-4">
                {others.map((o) => (
                  <Link
                    key={o.id}
                    href={`/case-studies/${o.id}`}
                    className="min-w-[320px] max-w-xs bg-neutral-900 p-6 rounded-2xl border border-white/6 hover:scale-105 transform transition glass animate-float"
                    aria-label={`Öffne Case Study ${o.title}`}
                  >
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                      {(o.heroImage || o.image) && (
                        <img
                          src={o.heroImage || o.image || ""}
                          alt={o.title}
                          className="h-full w-full object-cover"
                        />
                      )}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{o.title}</h3>
                    {o.subtitle && <p className="text-sm text-gray-400 mb-2">{o.subtitle}</p>}
                    <p className="text-sm text-gray-300">{o.description?.slice(0, 120)}{o.description && o.description.length > 120 ? '…' : ''}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}


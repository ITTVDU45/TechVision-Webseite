"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { StoredImageMeta } from "@/lib/stored-image";
import { categorizedCases } from "../data/caseStudies";
import { fetchCaseStudies } from "@/lib/api";

interface CaseStudy {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  imageMeta?: StoredImageMeta | null;
  category?: string | string[];
  stats?: Array<{ value: string; label: string }>;
  id: string;
  published?: boolean;
}

interface CaseStudiesProps {
  apiPage?: string;
}

type Case = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: Array<{ value: string; label: string }>;
};

function CaseCardSkeleton() {
  return (
    <div className="skeleton flex h-full min-h-[340px] flex-col overflow-hidden" aria-hidden>
      <div className="h-48 w-full bg-white/5" />
      <div className="flex flex-1 flex-col gap-3 p-6">
        <div className="h-5 w-3/4 rounded bg-white/10" />
        <div className="h-3 w-1/2 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-5/6 rounded bg-white/10" />
      </div>
    </div>
  );
}

/** Kennung fuer "keine Einschraenkung". */
const ALL = "__alle__";

const CaseStudies = ({ apiPage }: CaseStudiesProps) => {
  const Heading = apiPage === "home" ? motion.h2 : motion.h1;
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);
  const [apiCaseStudies, setApiCaseStudies] = useState<CaseStudy[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const categoriesRes = await fetch("/api/case-study-categories");
        if (!cancelled && categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
        }

        const apiData = await fetchCaseStudies(undefined, apiPage);
        if (cancelled) return;

        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          const published = apiData.filter((cs: CaseStudy) => cs.published !== false);
          setApiCaseStudies(published);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    loadData();
    return () => {
      cancelled = true;
    };
  }, [apiPage]);

  const categorizedCasesMap = useMemo<Record<string, Case[]>>(() => {
    if (apiCaseStudies.length > 0) {
      const grouped: Record<string, Case[]> = {};
      apiCaseStudies.forEach((cs) => {
        const caseId = typeof cs.id === "string" ? cs.id.trim() : "";
        if (!caseId) return;
        const cats = Array.isArray(cs.category) ? cs.category : cs.category ? [cs.category] : [];
        const subtitle = cs.subtitle || "";
        const image = cs.image || cs.imageMeta?.url || "";

        const entry: Case = {
          id: caseId,
          title: cs.title,
          subtitle,
          description: cs.description,
          image,
          stats: cs.stats || [],
        };

        if (cats.length === 0) {
          const defaultCat = "software";
          if (!grouped[defaultCat]) grouped[defaultCat] = [];
          grouped[defaultCat].push(entry);
        } else {
          cats.forEach((cat: string) => {
            if (!grouped[cat]) grouped[cat] = [];
            // dedupe innerhalb einer Kategorie
            if (!grouped[cat].some((e) => e.id === entry.id)) {
              grouped[cat].push(entry);
            }
          });
        }
      });
      return grouped;
    }
    const converted: Record<string, Case[]> = {};
    Object.keys(categorizedCases).forEach((key) => {
      converted[key] = categorizedCases[key].map((cs) => ({
        id: cs.id,
        title: cs.title,
        subtitle: cs.subtitle,
        description: cs.description,
        image: cs.image,
        stats: cs.stats,
      }));
    });
    return converted;
  }, [apiCaseStudies]);

  const availableCategories = useMemo(() => {
    if (categories.length > 0) {
      return categories.filter((cat) => (categorizedCasesMap[cat.id] || []).length > 0);
    }
    return Object.keys(categorizedCasesMap).map((id) => ({ id, name: id }));
  }, [categories, categorizedCasesMap]);

  // Gewaehlte Kategorie zuruecksetzen, falls sie nach dem Laden nicht mehr
  // existiert. Vorbelegt ist bewusst "alle": Wer auf die Referenzenseite
  // kommt, soll die Arbeit sehen und nicht erst eine Kategorie waehlen.
  useEffect(() => {
    if (availableCategories.length === 0 || selectedCategory === ALL) return;
    if (!availableCategories.some((c) => c.id === selectedCategory)) {
      setSelectedCategory(ALL);
    }
  }, [availableCategories, selectedCategory]);

  const currentCases =
    selectedCategory === ALL
      ? availableCategories.flatMap((category) => categorizedCasesMap[category.id] || [])
      : categorizedCasesMap[selectedCategory] || [];

  return (
    <section id="success-stories" className="section-y relative overflow-hidden bg-[#040810]">
      <div className="section-container relative z-10">
        <div className="measure">
          <p className="eyebrow">Referenzen</p>
          <Heading className="heading-display t-h2 mt-5">Ausgewählte Projekte</Heading>
          <p className="t-body mt-5 text-[color:var(--ink-400)]">
            Ein Ausschnitt unserer Arbeit – von Website-Relaunches über Individualsoftware bis zu KI-Integrationen.
          </p>
        </div>

        {availableCategories.length > 0 && (
          <div
            className="mt-10 flex flex-wrap gap-2"
            role="tablist"
            aria-label="Case‑Study Kategorien"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === ALL}
              onClick={() => setSelectedCategory(ALL)}
              className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === ALL
                  ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
                  : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
              }`}
            >
              Alle
            </button>
            {availableCategories.map((category) => {
              const active = selectedCategory === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`focus-ring rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    active
                      ? "border-sky-500/40 bg-sky-500/10 text-sky-200"
                      : "border-white/10 bg-white/[0.02] text-slate-400 hover:border-white/20 hover:text-white"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-10">
          {loading ? (
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
              <CaseCardSkeleton />
              <CaseCardSkeleton />
            </div>
          ) : currentCases.length === 0 ? (
            <div className="mx-auto max-w-2xl rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-14 text-center text-slate-400">
              In dieser Kategorie liegen noch keine veröffentlichten Projekte vor.
            </div>
          ) : (
            <ul className="mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-2">
              {currentCases.map((caseItem) => (
                <li key={caseItem.id}>
                  <Link
                    href={`/case-studies/${caseItem.id}`}
                    className="focus-ring group block h-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220] transition-all hover:-translate-y-0.5 hover:border-white/20"
                  >
                    <div className="relative h-52 overflow-hidden bg-neutral-900">
                      {caseItem.image ? (
                        <Image
                          src={caseItem.image}
                          alt=""
                          fill
                          sizes="(max-width: 768px) 100vw, 45vw"
                          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                        />
                      ) : (
                        <div className="h-full w-full bg-gradient-to-br from-sky-800/30 via-teal-700/20 to-transparent" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0a1220] via-[#0a1220]/25 to-transparent" aria-hidden />
                    </div>
                    <div className="p-6">
                      <h3 className="mb-1 text-lg font-semibold text-white transition-colors group-hover:text-sky-200">
                        {caseItem.title}
                      </h3>
                      {caseItem.subtitle && (
                        <p className="mb-3 text-sm text-sky-300/80">{caseItem.subtitle}</p>
                      )}
                      <p className="line-clamp-3 text-sm leading-relaxed text-slate-400">
                        {caseItem.description}
                      </p>
                      {caseItem.stats.length > 0 && (
                        <dl className="mt-5 flex flex-wrap gap-x-8 gap-y-3 border-t border-[color:var(--line)] pt-4">
                          {caseItem.stats.slice(0, 2).map((stat, statIndex) => (
                            <div key={`${caseItem.id}-stat-${statIndex}`}>
                              <dt className="sr-only">{stat.label}</dt>
                              <dd>
                                <span className="heading-display block text-2xl tabular-nums text-[color:var(--brand-300)]">
                                  {stat.value}
                                </span>
                                <span className="t-small mt-1 block text-[color:var(--ink-500)]">
                                  {stat.label}
                                </span>
                              </dd>
                            </div>
                          ))}
                        </dl>
                      )}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

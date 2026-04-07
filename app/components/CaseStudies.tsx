"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { categorizedCases } from "../data/caseStudies";
import { fetchCaseStudies } from "@/lib/api";
import { usePreferLightEffects } from "@/hooks/usePreferLightEffects";

interface CaseStudy {
  _id?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  category?: string | string[];
  stats?: Array<{ value: string; label: string }>;
  id: string; // Required, nicht optional
  published?: boolean;
}

interface CaseStudiesProps {
  /** z. B. `home` auf der Marketing-Startseite. Ohne Prop: alle veröffentlichten Studies (Übersichtsseite). */
  apiPage?: string;
}

const CaseStudies: React.FC<CaseStudiesProps> = ({ apiPage }) => {
  const preferLightEffects = usePreferLightEffects();
  const [selectedCategory, setSelectedCategory] = useState<string>("software");
  const [apiCaseStudies, setApiCaseStudies] = useState<CaseStudy[]>([]);
  const [categories, setCategories] = useState<Array<{ id: string; name: string }>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        // Lade Kategorien
        const categoriesRes = await fetch('/api/case-study-categories');
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json();
          setCategories(categoriesData);
          // Setze erste Kategorie als Standard, falls vorhanden
          if (categoriesData.length > 0 && !selectedCategory) {
            setSelectedCategory(categoriesData[0].id);
          }
        }

        const apiData = await fetchCaseStudies(undefined, apiPage);
        
        if (apiData && Array.isArray(apiData) && apiData.length > 0) {
          // Filtere nur veröffentlichte (auf der Case Studies Seite werden alle angezeigt, unabhängig von page)
          const published = apiData.filter((cs: CaseStudy) => cs.published !== false);
          setApiCaseStudies(published);
        }
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [apiPage]);

  useEffect(() => {
    if (categories.length === 0) return;
    const hasSelectedCategory = categories.some((category) => category.id === selectedCategory);
    if (hasSelectedCategory) return;
    setSelectedCategory(categories[0].id);
  }, [categories, selectedCategory]);

  // Kombiniere API-Daten mit statischen Daten
  const getCategorizedCases = (): Record<string, Array<{ id: string; title: string; subtitle: string; description: string; image: string; stats: Array<{ value: string; label: string }> }>> => {
    // Wenn API-Daten vorhanden, gruppiere nach Kategorien
    if (apiCaseStudies.length > 0) {
      const grouped: Record<string, Array<{ id: string; title: string; subtitle: string; description: string; image: string; stats: Array<{ value: string; label: string }> }>> = {};
      apiCaseStudies.forEach((cs) => {
        // Stelle sicher, dass id immer ein string ist
        const caseId = cs._id || cs.id || Math.random().toString();
        if (!caseId) return; // Skip wenn keine ID
        
        // Unterstütze sowohl Array als auch String (für Rückwärtskompatibilität)
        const categories = Array.isArray(cs.category) ? cs.category : (cs.category ? [cs.category] : []);
        
        // Stelle sicher, dass subtitle immer ein string ist (required für CaseStudy)
        const subtitle = cs.subtitle || '';
        const image = cs.image || '';
        
        // Wenn keine Kategorien, verwende 'software' als Standard
        if (categories.length === 0) {
          const defaultCat = 'software';
          if (!grouped[defaultCat]) grouped[defaultCat] = [];
          grouped[defaultCat].push({
            id: caseId,
            title: cs.title,
            subtitle: subtitle,
            description: cs.description,
            image: image,
            stats: cs.stats || [],
          });
        } else {
          // Füge Case Study zu allen zugewiesenen Kategorien hinzu
          categories.forEach((cat: string) => {
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({
              id: caseId,
              title: cs.title,
              subtitle: subtitle,
              description: cs.description,
              image: image,
              stats: cs.stats || [],
            });
          });
        }
      });
      return grouped;
    }
    // Fallback auf statische Daten - konvertiere zu kompatiblem Format
    const converted: Record<string, Array<{ id: string; title: string; subtitle: string; description: string; image: string; stats: Array<{ value: string; label: string }> }>> = {};
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
  };

  const categorizedCasesMap = getCategorizedCases();
  const currentCases = categorizedCasesMap[selectedCategory] || [];
  const availableCategories =
    categories.length > 0
      ? categories
      : Object.keys(categorizedCasesMap).map((id) => ({ id, name: id }));

  return (
    <section id="success-stories" className="pb-20 pt-10 bg-black relative overflow-hidden">
      {/* Background Orbs */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-6"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            Portfolio
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">Erfolgsgeschichten</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-400"
          >
            Entdecken Sie, wie wir Unternehmen bei ihrer digitalen Transformation unterstützen.
          </motion.p>
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {availableCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`rounded-lg border px-4 py-2 text-sm transition-all ${
                selectedCategory === category.id
                  ? "border-blue-500 bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.25)]"
                  : "border-neutral-700 bg-neutral-900/70 text-gray-300 hover:border-neutral-500 hover:text-white"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 px-6 py-16 text-center text-gray-400">
            Lädt Case Studies...
          </div>
        ) : currentCases.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-neutral-900/40 px-6 py-16 text-center text-gray-400">
            Keine Case Studies in dieser Kategorie gefunden.
          </div>
        ) : (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2">
            {currentCases.map((caseItem, index) => (
              <motion.article
                key={`${caseItem.id}-${index}`}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: preferLightEffects ? 0.2 : 0.35, delay: preferLightEffects ? 0 : index * 0.04 }}
                className={`overflow-hidden rounded-2xl border border-white/10 shadow-xl ${
                  preferLightEffects ? "bg-neutral-950/95" : "bg-white/[0.03] backdrop-blur-xl"
                }`}
              >
                <Link href={`/case-studies/${caseItem.id}`} className="group block h-full">
                  <div className="relative h-52 overflow-hidden">
                    {caseItem.image ? (
                      <Image
                        src={caseItem.image}
                        alt={caseItem.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-blue-600/30 via-indigo-600/20 to-transparent" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-2 text-xl font-semibold text-white transition-colors group-hover:text-blue-400">
                      {caseItem.title}
                    </h3>
                    <p className="mb-3 text-sm text-blue-300/90">{caseItem.subtitle || "Case Study"}</p>
                    <p className="line-clamp-3 text-sm text-gray-300">{caseItem.description}</p>
                    {caseItem.stats.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {caseItem.stats.slice(0, 2).map((stat, statIndex) => (
                          <span
                            key={`${caseItem.id}-stat-${statIndex}`}
                            className="rounded-full border border-blue-400/30 bg-blue-500/10 px-3 py-1 text-xs text-blue-300"
                          >
                            {stat.value} {stat.label}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CaseStudies;

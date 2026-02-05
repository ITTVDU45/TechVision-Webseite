"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudySlider from "./CaseStudySlider";
import { categorizedCases } from "../data/caseStudies";
import { fetchCaseStudies } from "@/lib/api";

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

const CaseStudies: React.FC = () => {
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

        // Lade alle veröffentlichten Case Studies (für die Case Studies Seite werden alle angezeigt)
        const apiData = await fetchCaseStudies();
        
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
  }, []);

  // Kombiniere API-Daten mit statischen Daten
  const getCategorizedCases = (): Record<string, Array<{ id: string; title: string; subtitle?: string; description: string; image?: string; stats?: Array<{ value: string; label: string }> }>> => {
    // Wenn API-Daten vorhanden, gruppiere nach Kategorien
    if (apiCaseStudies.length > 0) {
      const grouped: Record<string, Array<{ id: string; title: string; subtitle?: string; description: string; image?: string; stats?: Array<{ value: string; label: string }> }>> = {};
      apiCaseStudies.forEach((cs) => {
        // Stelle sicher, dass id immer ein string ist
        const caseId = cs._id || cs.id || Math.random().toString();
        if (!caseId) return; // Skip wenn keine ID
        
        // Unterstütze sowohl Array als auch String (für Rückwärtskompatibilität)
        const categories = Array.isArray(cs.category) ? cs.category : (cs.category ? [cs.category] : []);
        
        // Wenn keine Kategorien, verwende 'software' als Standard
        if (categories.length === 0) {
          const defaultCat = 'software';
          if (!grouped[defaultCat]) grouped[defaultCat] = [];
          grouped[defaultCat].push({
            id: caseId,
            title: cs.title,
            subtitle: cs.subtitle,
            description: cs.description,
            image: cs.image,
            stats: cs.stats || [],
          });
        } else {
          // Füge Case Study zu allen zugewiesenen Kategorien hinzu
          categories.forEach((cat: string) => {
            if (!grouped[cat]) grouped[cat] = [];
            grouped[cat].push({
              id: caseId,
              title: cs.title,
              subtitle: cs.subtitle,
              description: cs.description,
              image: cs.image,
              stats: cs.stats || [],
            });
          });
        }
      });
      return grouped;
    }
    // Fallback auf statische Daten - konvertiere zu kompatiblem Format
    const converted: Record<string, Array<{ id: string; title: string; subtitle?: string; description: string; image?: string; stats?: Array<{ value: string; label: string }> }>> = {};
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

  const currentCases = getCategorizedCases()[selectedCategory] || [];

  return (
    <section id="success-stories" className="py-24 bg-black relative overflow-hidden">
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

        {/* Category Tabs */}
        {categories.length > 0 && (
          <div className="flex flex-wrap justify-center gap-3 mb-16">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`relative px-6 py-2.5 rounded-xl transition-all duration-300 text-sm font-medium border ${selectedCategory === category.id
                  ? 'bg-blue-600 border-blue-500 text-white shadow-[0_0_20px_rgba(37,99,235,0.3)]'
                  : 'bg-neutral-900/50 border-neutral-800 text-gray-400 hover:border-neutral-700 hover:text-white'
                  }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        )}

        {/* Slider Section */}
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <CaseStudySlider cases={currentCases} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

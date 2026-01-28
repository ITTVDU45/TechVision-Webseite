"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CaseStudySlider from "./CaseStudySlider";
import { categories, categorizedCases } from "../data/caseStudies";

const CaseStudies: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("software");

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
              <CaseStudySlider cases={categorizedCases[selectedCategory] || []} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default CaseStudies;

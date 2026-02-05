"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CaseStudy } from "./types";

interface CaseStudiesSectionProps {
  title?: string;
  caseStudies: CaseStudy[];
}

export default function CaseStudiesSection({
  title = "Unsere Fallstudien",
  caseStudies,
}: CaseStudiesSectionProps) {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {title.split("Fallstudien")[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Fallstudien
            </span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Entdecken Sie, wie wir Unternehmen dabei helfen, ihre digitale Sicherheit zu optimieren
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((study, index) => (
            <motion.div
              key={study.company}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -4 }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-opacity-60 transition-all duration-300 group"
            >
              <Link href={study.link || "#"} className="block">
                {study.image && (
                  <div className="aspect-video overflow-hidden">
                    <img
                      src={study.image}
                      alt={study.company}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                      <span className="text-xl">🛡️</span>
                    </div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                      Cyber Security
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                    {study.company}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{study.title}</p>
                  <ul className="space-y-2 mb-4">
                    {study.results.map((result, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-xl text-white text-sm font-medium hover:shadow-lg transition-all duration-300">
                    Fallstudie lesen
                  </button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-xl text-lg font-medium relative overflow-hidden group shadow-xl shadow-blue-500/20"
            >
              <span className="relative z-10">Zu unseren Fallstudien</span>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

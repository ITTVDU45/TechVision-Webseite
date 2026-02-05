"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { CaseStudy } from './types';
import Link from 'next/link';

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesSection({ caseStudies }: CaseStudiesSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Unsere </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-blue-500">
              Erfolgsgeschichten
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entdecken Sie, wie wir Unternehmen bei ihrer digitalen Transformation unterstützen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {caseStudies.map((caseStudy, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-blue-500/10">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                  {caseStudy.title}
                </h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                  {caseStudy.description}
                </p>
                <div className="space-y-3 mb-6">
                  {caseStudy.metrics.map((metric, metricIndex) => (
                    <div key={metricIndex} className="flex items-center justify-between">
                      <span className="text-gray-400 text-sm">{metric.label}</span>
                      <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                        {metric.value}
                      </span>
                    </div>
                  ))}
                </div>
                {caseStudy.link && (
                  <Link href={caseStudy.link}>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-all"
                    >
                      Mehr dazu
                    </motion.button>
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/case-studies">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all"
            >
              Alle unsere Case Studies
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

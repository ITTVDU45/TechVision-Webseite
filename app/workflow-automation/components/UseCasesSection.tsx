"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { UseCase } from './types';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import Link from 'next/link';

interface UseCasesSectionProps {
  useCases: UseCase[];
}

export default function UseCasesSection({ useCases }: UseCasesSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-red-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Praxisbeispiele unserer </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500">
              Workflow Automatisierung
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entdecken Sie, wie unsere Lösungen in verschiedenen Bereichen erfolgreich eingesetzt werden
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {useCases.map((useCase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{useCase.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-orange-400 transition-colors">
                      {useCase.title}
                    </h3>
                    <p className="text-lg text-gray-300 mb-2">{useCase.subtitle}</p>
                    <p className="text-gray-400 text-sm leading-relaxed mb-4">
                      {useCase.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2">
                  {useCase.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-orange-400 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
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
          <p className="text-gray-400 mb-6 text-lg font-medium">Interessiert an einer maßgeschneiderten Automatisierungslösung?</p>
          <GlowingEffect>
            <Link
              href="/offer"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-orange-500/20 transition-all inline-block"
            >
              Prozessanalyse starten
            </Link>
          </GlowingEffect>
        </motion.div>
      </div>
    </section>
  );
}

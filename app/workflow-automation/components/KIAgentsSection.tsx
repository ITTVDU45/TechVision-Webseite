"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { KIAgentFeature } from './types';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import Link from 'next/link';

interface KIAgentsSectionProps {
  features: KIAgentFeature[];
}

export default function KIAgentsSection({ features }: KIAgentsSectionProps) {
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
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="text-5xl">🧠</span>
            <h2 className="text-4xl md:text-5xl font-bold">
              <span className="text-white">KI-Agenten – </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-400 to-orange-500">
                Ihre digitalen Helfer im Workflow
              </span>
            </h2>
          </div>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unsere intelligenten KI-Agenten lernen Ihre Prozesse kennen und optimieren diese kontinuierlich – für mehr Effizienz und weniger manuellen Aufwand.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
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

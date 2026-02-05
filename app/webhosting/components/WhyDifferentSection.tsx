"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { WhyDifferentFeature, OneClickApp, SpecializedHosting } from './types';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import Link from 'next/link';

interface WhyDifferentSectionProps {
  features: WhyDifferentFeature[];
  oneClickApps: OneClickApp[];
  specializedHosting: SpecializedHosting[];
}

export default function WhyDifferentSection({ features, oneClickApps, specializedHosting }: WhyDifferentSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Warum ist unser </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-500">
              Hosting anders?
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Entdecken Sie die Vorteile unserer modernen Cloud-Hosting-Lösungen
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
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
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-green-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Ein-Klick Installation</h3>
            <p className="text-gray-400 text-sm mb-4">Installieren Sie mit nur einem Klick Ihre bevorzugte Anwendung:</p>
            <div className="flex flex-wrap gap-3">
              {oneClickApps.map((app, index) => (
                <span key={index} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white border border-white/10">
                  → {app.name}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6"
          >
            <h3 className="text-xl font-bold text-white mb-4">Spezialisierte Hosting-Lösungen</h3>
            <div className="flex flex-wrap gap-3">
              {specializedHosting.map((hosting, index) => (
                <span key={index} className="px-4 py-2 bg-white/5 rounded-lg text-sm text-white border border-white/10 flex items-center gap-2">
                  <span>{hosting.icon}</span>
                  <span>→ {hosting.name}</span>
                </span>
              ))}
            </div>
          </motion.div>
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
              className="px-8 py-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-green-500/20 transition-all inline-block"
            >
              Webhosting jetzt buchen
            </Link>
          </GlowingEffect>
        </motion.div>
      </div>
    </section>
  );
}

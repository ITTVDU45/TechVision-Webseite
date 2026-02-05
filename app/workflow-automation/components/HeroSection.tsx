"use client";
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from '../../components/ui/animated-gradient-text';
import { GlowingEffect } from '../../components/ui/glowing-effect';
import Link from 'next/link';

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 via-red-600 to-orange-600 animate-gradient bg-[length:200%_200%]" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
      </div>
      <div className="container mx-auto px-4 py-32 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            <span className="text-white">Workflow Automatisierung – </span>
            <AnimatedGradientText>Intelligente Prozesse, maximale Effizienz</AnimatedGradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
          >
            Optimieren Sie Ihre Geschäftsprozesse mit KI-Agenten und modernsten Automatisierungstools.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-lg text-gray-500 mb-12 leading-relaxed max-w-3xl mx-auto"
          >
            Entdecken Sie die Zukunft der Prozessautomatisierung. Mit unseren maßgeschneiderten Lösungen transformieren wir Ihre manuellen Abläufe in effiziente, automatisierte Workflows. Steigern Sie Ihre Produktivität und reduzieren Sie Fehlerquoten – mit intelligenter Automatisierung.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowingEffect>
              <Link
                href="/offer"
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl text-lg font-medium relative overflow-hidden group cursor-pointer block"
              >
                <span className="relative z-10">Prozessanalyse starten</span>
              </Link>
            </GlowingEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

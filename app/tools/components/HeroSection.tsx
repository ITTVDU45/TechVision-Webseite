"use client";
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from '../../components/ui/animated-gradient-text';
import { GlowingEffect } from '../../components/ui/glowing-effect';

export default function HeroSection() {
  return (
    <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 animate-gradient bg-[length:200%_200%]" />
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
            <span className="text-white">Unsere Tools & KI-Agenten – </span>
            <AnimatedGradientText>Effiziente Lösungen für Ihr Business</AnimatedGradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
          >
            Von Open-Source-Software bis hin zu intelligenten KI-Agenten – wir bieten die richtigen Werkzeuge für Automatisierung, Produktivität und digitales Wachstum.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <GlowingEffect>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (typeof window !== 'undefined') {
                    document.getElementById('open-source-tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }
                }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-lg font-medium relative overflow-hidden group cursor-pointer"
              >
                <span className="relative z-10">Alle Tools entdecken</span>
              </motion.button>
            </GlowingEffect>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                if (typeof window !== 'undefined') {
                  document.getElementById('ki-agenten')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
              }}
              className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-lg font-medium relative overflow-hidden group cursor-pointer border border-white/20"
            >
              <span className="relative z-10">KI-Agenten</span>
            </motion.button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

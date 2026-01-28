"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';
import Vortex from './ui/vortex';
import Link from 'next/link';
import LiquidEther from './LiquidEther';

export default function CTA() {
  return (
    <section id="contact" className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <GlowingEffect blur={20} spread={150} proximity={150} className="max-w-6xl mx-auto">
          <div className="rounded-[32px] overflow-hidden bg-white/[0.02] backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] relative group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <div className="relative min-h-[500px] w-full p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden">
              <div className="absolute inset-0 z-0 opacity-40">
                <LiquidEther
                  colors={['#3b82f6', '#4f46e5', '#818cf8']}
                  mouseForce={25}
                  cursorSize={100}
                  isViscous
                  viscous={30}
                  autoDemo
                  autoSpeed={0.8}
                  autoIntensity={3.5}
                />
              </div>

              <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl relative z-10 w-full">
                <div className="flex-1 text-center lg:text-left">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-5xl font-extrabold mb-6"
                  >
                    <span className="text-white">Bereit für die </span>
                    <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                      Zukunft mit KI?
                    </span>
                  </motion.h2>
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="text-xl text-gray-300 mb-10 leading-relaxed font-medium"
                  >
                    Kontaktieren Sie uns für eine unverbindliche Beratung und entdecken Sie die Potenziale der Künstlichen Intelligenz für Ihr Unternehmen.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <Link href="/contact">
                      <motion.button
                        whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="px-10 py-5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full text-xl font-bold text-white shadow-2xl transition-all"
                      >
                        Jetzt einen kostenlosen Ersttermin vereinbaren
                      </motion.button>
                    </Link>
                  </motion.div>
                </div>
                <motion.div
                  className="flex-1 relative hidden lg:block"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
                    <img
                      src="/images/Tolgahan Vardar.jpeg"
                      alt="Tolgahan Vardar - CEO"
                      className="w-full h-full object-cover grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
                      loading="lazy"
                      style={{ objectPosition: 'center 25%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-8 left-8">
                      <p className="text-white font-black text-2xl mb-1">Tolgahan Vardar</p>
                      <div className="flex items-center gap-2">
                        <span className="w-8 h-0.5 bg-blue-500" />
                        <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">CEO TechVision</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </GlowingEffect>
      </div>
    </section>
  );
}

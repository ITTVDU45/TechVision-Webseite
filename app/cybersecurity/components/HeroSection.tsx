"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import AnimatedGradientText from "../../components/ui/animated-gradient-text";
import { GlowingEffect } from "../../components/ui/glowing-effect";

interface HeroSectionProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
}

export default function HeroSection({
  title = "Cyber-Security –",
  subtitle = "Umfassende Sicherheitslösungen für Ihr Unternehmen – von der Analyse bis zur Implementation.",
  ctaText = "Sicherheitsanalyse starten",
  ctaLink = "/offer",
}: HeroSectionProps) {
  const router = useRouter();

  return (
    <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
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
            <span className="text-white">{title} </span>
            <AnimatedGradientText>Schutz für Ihre digitale Zukunft</AnimatedGradientText>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
          >
            {subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <GlowingEffect>
              <button
                onClick={() => router.push(ctaLink)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-300"
              >
                {ctaText}
              </button>
            </GlowingEffect>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

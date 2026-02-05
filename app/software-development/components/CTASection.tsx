"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { GlowingEffect } from "../../components/ui/glowing-effect";
import Vortex from "../../components/ui/vortex";
import ColourfulText from "../../components/ui/colourful-text";

interface CTASectionProps {
  title?: string;
  subtitle?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export default function CTASection({
  title = "Bereit für Ihr",
  subtitle = "Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.",
  primaryButtonText = "Projekt starten",
  primaryButtonLink = "/offer",
  secondaryButtonText = "24/7 Chat",
  secondaryButtonLink = "/contact",
}: CTASectionProps) {
  const router = useRouter();

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        <GlowingEffect blur={20} spread={150} proximity={150} className="max-w-6xl mx-auto">
          <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500">
            <Vortex
              backgroundColor="rgba(0,0,0,0.7)"
              rangeY={800}
              particleCount={300}
              baseHue={220}
              className="flex min-h-[600px] w-full flex-col items-center justify-center"
            >
              <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="text-center text-4xl md:text-6xl mb-8 md:mb-10"
                >
                  <div className="text-white">{title}</div>
                  <div className="font-bold my-4">
                    <ColourfulText text="nächstes Projekt" />
                  </div>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                >
                  {subtitle}
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <button
                    onClick={() => router.push(primaryButtonLink)}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white text-lg font-medium relative overflow-hidden group min-w-[200px]"
                  >
                    <span className="relative z-10">{primaryButtonText}</span>
                  </button>
                  <button
                    onClick={() => router.push(secondaryButtonLink)}
                    className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg font-medium relative overflow-hidden group min-w-[200px]"
                  >
                    <span className="relative z-10">{secondaryButtonText}</span>
                  </button>
                </motion.div>
              </div>
            </Vortex>
          </div>
        </GlowingEffect>
      </div>
    </section>
  );
}

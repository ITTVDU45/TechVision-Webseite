"use client";
import React from "react";
import { motion } from "framer-motion";
import Header from "../../src/components/Header";
import Footer from "../../src/components/Footer";

export default function OfferPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden flex items-center min-h-screen">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 animate-gradient bg-[length:200%_200%]" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <span className="text-8xl mb-6 block">📋</span>
            </motion.div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Projektanfrage</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Coming Soon - Wir arbeiten an unserem Projektanfrage-Formular!
            </p>
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-green-400">Was kommt im Projektanfrage-Formular?</h2>
              <p className="text-gray-300 mb-6">
                Wir entwickeln ein umfassendes Formular, das Ihnen ermöglicht, Ihre Projektanforderungen 
                detailliert zu beschreiben und ein maßgeschneidertes Angebot zu erhalten.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-green-400 font-bold">🎯</div>
                  <div className="text-gray-400">Projektziele</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">💰</div>
                  <div className="text-gray-400">Budget</div>
                </div>
                <div className="text-center">
                  <div className="text-green-400 font-bold">⏰</div>
                  <div className="text-gray-400">Zeitplan</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">
              Kontaktieren Sie uns direkt
            </h2>
            <p className="text-gray-400 mb-8 text-lg">
              Während wir an unserem Formular arbeiten, stehen wir Ihnen gerne für ein persönliches Gespräch zur Verfügung.
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <a
                href="mailto:info@techvision.de"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                E-Mail senden
              </a>
              <a
                href="/case-studies"
                className="bg-transparent border border-green-600 text-green-400 hover:bg-green-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              >
                Unsere Projekte ansehen
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

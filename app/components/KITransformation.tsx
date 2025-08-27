"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedGradientText from "./ui/animated-gradient-text";
import { GlowingEffect } from "./ui/glowing-effect";
import { Disclosure } from "@headlessui/react";
import Vortex from "./ui/vortex";
import ColourfulText from "./ui/colourful-text";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import Header from "./Header";
import Footer from "./Footer";

type UseCase = {
  title: string;
  description: string;
  example?: string;
  icon?: string;
  gradient?: string;
  stats?: { value: string; label: string }[];
};

const useCases: UseCase[] = [
  {
    title: "KI in der Prozessautomatisierung",
    description: "KI übernimmt repetitive Aufgaben und automatisiert Workflows, um Mitarbeitern Freiraum für wertschöpfende Tätigkeiten zu schaffen.",
    example: "Automatisierte Rechnungsverarbeitung oder intelligente Dokumentenverarbeitung (OCR).",
    icon: "⚙️",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    stats: [{ value: "25%", label: "Kosteneinsparung" }, { value: "35%", label: "Effizienzsteigerung" }]
  },
  {
    title: "KI im Kundenservice",
    description: "KI-gestützte Chatbots und intelligente Supportsysteme verbessern die Reaktionszeiten und die Servicequalität.",
    example: "Automatische Ticketbearbeitung in Helpdesks oder Voicebots im Callcenter.",
    icon: "💬",
    gradient: "from-purple-500 to-pink-500",
    stats: [{ value: "40%", label: "Schnellere Entscheidungen" }, { value: "30%", label: "Verbesserte Kundenzufriedenheit" }]
  },
  {
    title: "KI in der Finanzbranche",
    description: "Von Anomalieerkennung in Transaktionen bis zur Kreditrisikoanalyse – KI optimiert Finanzprozesse.",
    example: "Automatisierte Betrugserkennung bei Banktransaktionen.",
    icon: "💳",
    gradient: "from-green-500 to-emerald-500",
    stats: [{ value: "20%", label: "Verbesserte Risikoanalyse" }, { value: "15%", label: "Kosteneinsparung" }]
  }
];

export default function KITransformation(): JSX.Element {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") setIsMobile(window.innerWidth < 768);
  }, []);

  const slides = isMobile ? 1 : 3;

  const visibleUseCases = () => useCases.slice(currentIndex, currentIndex + slides);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= useCases.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prevSlide = () => setCurrentIndex((prev) => (prev - slides + useCases.length) % useCases.length);
  const nextSlide = () => setCurrentIndex((prev) => (prev + slides) % useCases.length);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">KI-Transformation – Effizienzsteigerung durch </span>
              <div>
                <AnimatedGradientText>Künstliche Intelligenz</AnimatedGradientText>
              </div>
            </motion.h1>

            <motion.p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}>
              Nutzen Sie das volle Potenzial von KI, um Geschäftsprozesse zu automatisieren, Entscheidungen zu optimieren und Wettbewerbsvorteile zu erzielen.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <GlowingEffect>
                <button onClick={() => router.push('/offer')} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-300">
                  KI Transformation - Potenzial Check Starten
                </button>
              </GlowingEffect>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="relative max-w-7xl mx-auto">
            <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              {visibleUseCases().map((uc, idx) => (
                <motion.div key={uc.title + idx} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }} className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]">
                  <div className={`bg-gradient-to-br ${idx % 2 === 0 ? 'from-blue-500 via-indigo-500 to-violet-600' : 'from-violet-600 via-indigo-500 to-blue-500'} p-[1px] rounded-2xl h-full`}>
                    <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                      <div className="mb-6 flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">{uc.title}</h3>
                        <p className="text-gray-400 text-sm mb-4">{uc.example}</p>
                        <p className="text-gray-300 text-sm">{uc.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {uc.stats?.map((stat, si) => (
                          <div key={si} className="text-center">
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300">
                        Mehr dazu
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(useCases.length / slides) }).map((_, i) => (
                <button key={i} onClick={() => setCurrentIndex(i * slides)} className={`w-2 h-2 rounded-full transition-all duration-300 ${Math.floor(currentIndex / slides) === i ? 'bg-blue-600 w-4' : 'bg-blue-900'}`} />
              ))}
            </div>

            <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200"><ChevronLeftIcon className="w-6 h-6 text-blue-400" /></button>
            <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200"><ChevronRightIcon className="w-6 h-6 text-blue-400" /></button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



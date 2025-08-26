import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { GlowingEffect } from '@/components/ui/glowing-effect';
import { Disclosure } from '@headlessui/react';
import Vortex from '@/components/ui/vortex';
import ColourfulText from "@/components/ui/colourful-text";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import Header from "@/components/Header";
import Footer from "@/components/Footer";

const useCases = [
  {
    title: "KI in der Prozessautomatisierung",
    description: "KI übernimmt repetitive Aufgaben und automatisiert Workflows, um Mitarbeitern Freiraum für wertschöpfende Tätigkeiten zu schaffen.",
    example: "Automatisierte Rechnungsverarbeitung oder intelligente Dokumentenverarbeitung (OCR).",
    icon: "⚙️",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    stats: [
      { value: "25%", label: "Kosteneinsparung" },
      { value: "35%", label: "Effizienzsteigerung" }
    ]
  },
  {
    title: "KI im Kundenservice",
    description: "KI-gestützte Chatbots und intelligente Supportsysteme verbessern die Reaktionszeiten und die Servicequalität.",
    example: "Automatische Ticketbearbeitung in Helpdesks oder Voicebots im Callcenter.",
    icon: "💬",
    gradient: "from-purple-500 to-pink-500",
    stats: [
      { value: "40%", label: "Schnellere Entscheidungen" },
      { value: "30%", label: "Verbesserte Kundenzufriedenheit" }
    ]
  },
  {
    title: "KI in der Finanzbranche",
    description: "Von Anomalieerkennung in Transaktionen bis zur Kreditrisikoanalyse – KI optimiert Finanzprozesse.",
    example: "Automatisierte Betrugserkennung bei Banktransaktionen.",
    icon: "💳",
    gradient: "from-green-500 to-emerald-500",
    stats: [
      { value: "20%", label: "Verbesserte Risikoanalyse" },
      { value: "15%", label: "Kosteneinsparung" }
    ]
  },
  {
    title: "KI für Produktion & Industrie",
    description: "KI-gesteuerte Maschinenoptimierung, vorausschauende Wartung und Fehlererkennung steigern die Effizienz in der Industrie 4.0.",
    example: "Predictive Maintenance in der Fertigung.",
    icon: "🏭",
    gradient: "from-orange-500 to-red-500",
    stats: [
      { value: "30%", label: "Effizienzsteigerung" },
      { value: "20%", label: "Kosteneinsparung" }
    ]
  },
  {
    title: "KI für den Vertrieb & Marketing",
    description: "Nutzen Sie KI zur Lead-Generierung, Kundensegmentierung und Personalisierung von Marketingkampagnen.",
    example: "KI-gestützte Personalisierung von Produktempfehlungen in Onlineshops.",
    icon: "📈",
    gradient: "from-indigo-500 to-blue-500",
    stats: [
      { value: "45%", label: "Verbesserte Lead-Generierung" },
      { value: "35%", label: "Verbesserte Kundenzufriedenheit" }
    ]
  }
];

const slideCount = 3; // Anzahl der gleichzeitig sichtbaren Karten

export default function KITransformation() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();
  
  // Mobile detection in useEffect to avoid SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  const slideCount = isMobile ? 1 : 3; // Zeige 1 Slide auf mobilen Geräten, sonst 3

  // Funktion zum Ermitteln der aktuell sichtbaren Use Cases
  const visibleUseCases = () => {
    return useCases.slice(currentIndex, currentIndex + slideCount);
  };

  // Optional: Auto-sliding
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === useCases.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const navigateToOfferPage = () => {
    router.push('/offer');
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideCount + useCases.length) % useCases.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideCount) % useCases.length);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Animated Neural Network Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              {[...Array(5)].map((_, i) => (
                <motion.path
                  key={i}
                  d={`M${20 + i * 15},${30 + (i % 3) * 20} Q${50},${50} ${80 - i * 10},${70 + (i % 2) * 10}`}
                  stroke="url(#gradient)"
                  strokeWidth="0.2"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0.3 }}
                  animate={{ 
                    pathLength: [0, 1, 0],
                    opacity: [0.3, 0.8, 0.3]
                  }}
                  transition={{ 
                    duration: 3,
                    delay: i * 0.5,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                />
              ))}
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#818cf8" />
                  <stop offset="100%" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">KI-Transformation – Effizienzsteigerung durch </span>
              <div>
                
                <AnimatedGradientText>
                  Künstliche Intelligenz
                </AnimatedGradientText>
              </div>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Nutzen Sie das volle Potenzial von KI, um Geschäftsprozesse zu automatisieren, 
              Entscheidungen zu optimieren und Wettbewerbsvorteile zu erzielen.
            </motion.p>

            {/* Additional Text */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-400 mb-12"
            >
              Ob Prozessautomatisierung, Datenanalyse oder individuelle KI-Lösungen – 
              wir begleiten Sie von der Strategie bis zur Umsetzung.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <button 
                  onClick={navigateToOfferPage}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 
                           text-white rounded-xl text-lg font-medium 
                           hover:shadow-lg hover:shadow-purple-500/25 
                           transition-all duration-300"
                >
                  KI Transformation - Potenzial Check Starten
                </button>
              </GlowingEffect>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Was ist KI-Transformation Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Text Content */}
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl md:text-4xl font-bold mb-8"
              >
                Was bedeutet KI-Transformation für Unternehmen?
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-gray-400 text-lg mb-8"
              >
                KI-Transformation bezeichnet die Integration von künstlicher Intelligenz in bestehende 
                Geschäftsprozesse, um Effizienz, Skalierbarkeit und Innovation zu fördern.
              </motion.p>

              {/* Process Steps */}
              {[
                {
                  title: "Datenanalyse",
                  description: "Automatische Erkennung von Mustern und Trends in großen Datenmengen",
                  icon: "📊"
                },
                {
                  title: "Prozessautomatisierung",
                  description: "Intelligente Automatisierung repetitiver Aufgaben",
                  icon: "⚙️"
                },
                {
                  title: "Entscheidungsfindung",
                  description: "KI-gestützte Entscheidungen basierend auf Datenanalysen",
                  icon: "🎯"
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-4 mb-6"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 
                                flex items-center justify-center text-2xl">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2 text-white">{step.title}</h3>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Animated Infographic */}
            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="aspect-square relative"
              >
                {/* Zentrale Node */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
                              w-24 h-24 rounded-full bg-purple-600/20 border border-purple-500/30
                              flex items-center justify-center">
                  <span className="text-3xl">🤖</span>
                </div>

                {/* Verbindende Linien und Nodes */}
                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="absolute"
                    style={{
                      top: `${50 + 35 * Math.sin(i * Math.PI / 3)}%`,
                      left: `${50 + 35 * Math.cos(i * Math.PI / 3)}%`,
                    }}
                  >
                    {/* Verbindungslinie */}
                    <motion.div
                      className="absolute w-24 h-0.5 bg-gradient-to-r from-purple-500/50 to-blue-500/50"
                      style={{
                        transform: `rotate(${i * 60}deg)`,
                        transformOrigin: '0 50%'
                      }}
                      animate={{
                        opacity: [0.3, 0.7, 0.3],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                    
                    {/* Äußere Nodes */}
                    <div className="w-12 h-12 rounded-full bg-blue-600/20 border border-blue-500/30
                                  flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2">
                      <motion.div
                        animate={{
                          scale: [1, 1.1, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: i * 0.2
                        }}
                      >
                        {['📊', '⚙️', '🎯', '💡', '📈', '🔄'][i]}
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Vorteile Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-950/20 via-black to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Warum KI in Ihr Unternehmen integrieren?
            </h2>
            <p className="text-gray-400 text-lg">
              Entdecken Sie die transformative Kraft der künstlichen Intelligenz für Ihr Unternehmen
            </p>
          </motion.div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            {/* Left Side - Image */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/images/system-integration-network.jpg"
                  alt="KI Transformation"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-purple-500/20 to-transparent" />
              </div>
            </motion.div>

            {/* Right Side - Benefits Cards */}
            <div className="w-full lg:w-1/2">
              <div className="grid grid-cols-1 gap-6">
                {[
                  {
                    title: "Automatisierte Geschäftsprozesse",
                    description: "Reduzieren Sie manuelle Arbeit und steigern Sie die Produktivität.",
                    icon: "⚡",
                    gradient: "from-blue-500 to-purple-500"
                  },
                  {
                    title: "Datengetriebene Entscheidungen",
                    description: "Analysieren Sie große Datenmengen in Echtzeit für präzisere Geschäftsentscheidungen.",
                    icon: "📊",
                    gradient: "from-purple-500 to-indigo-500"
                  },
                  {
                    title: "Skalierbarkeit & Flexibilität",
                    description: "Nutzen Sie KI, um Ihre Prozesse mit minimalem Aufwand an neue Anforderungen anzupassen.",
                    icon: "📈",
                    gradient: "from-indigo-500 to-blue-500"
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="group"
                  >
                    <div className="rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                                hover:bg-white/10 transition-all duration-300
                                hover:shadow-[0_0_30px_-12px] hover:shadow-purple-500/30">
                      <div className="flex items-center gap-6">
                        {/* Icon */}
                        <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${benefit.gradient}
                                    flex items-center justify-center text-2xl
                                    transform group-hover:scale-110 transition-transform duration-300`}>
                          {benefit.icon}
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold mb-2 text-white">
                            {benefit.title}
                          </h3>
                          <p className="text-gray-400 text-sm">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* New CTA Button */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="mt-8"
              >
                <button 
                  onClick={navigateToOfferPage}
                  className="w-full group relative px-8 py-4 overflow-hidden rounded-xl 
                             bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                             text-white font-semibold text-lg
                             hover:shadow-lg hover:shadow-purple-500/25 
                             transition-all duration-300"
                >
                  <span className="relative flex items-center justify-center gap-2">
                    KI Potenzial Check starten
                    <svg 
                      className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" 
                      />
                    </svg>
                  </span>
                  
                  {/* Animated background glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 
                                rounded-xl blur opacity-25 group-hover:opacity-50 
                                transition duration-300 group-hover:duration-200" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Carousel Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Einsatzbereiche von KI in Unternehmen
            </h2>
            <p className="text-gray-400 text-lg">
              Entdecken Sie die vielfältigen Möglichkeiten der KI-Integration in Ihrem Unternehmen
            </p>
          </motion.div>

          {/* Use Cases Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                {visibleUseCases().map((useCase, index) => (
                  <motion.div
                    key={useCase.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]"
                  >
                    <div className={`bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-blue-500 via-indigo-500 to-violet-600' 
                        : 'from-violet-600 via-indigo-500 to-blue-500'
                    } p-[1px] rounded-2xl h-full`}>
                      <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                        {/* Content */}
                        <div className="mb-6 flex-grow">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {useCase.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {useCase.example}
                          </p>
                          <p className="text-gray-300 text-sm">
                            {useCase.description}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          {useCase.stats?.map((stat, statIndex) => (
                            <div key={statIndex} className="text-center">
                              <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                                {stat.value}
                              </div>
                              <div className="text-xs text-gray-400 mt-1">
                                {stat.label}
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Mehr dazu Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                    rounded-lg text-white text-sm font-medium 
                                    hover:shadow-lg transition-all duration-300
                                    relative overflow-hidden group"
                        >
                          <span className="relative z-10">Mehr dazu</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                        group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(useCases.length / slideCount) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * slideCount)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentIndex / slideCount) === index 
                              ? 'bg-blue-600 w-4' 
                              : 'bg-blue-900'}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                       hover:bg-blue-500/20 transition-colors duration-200"
            >
              <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                       hover:bg-blue-500/20 transition-colors duration-200"
            >
              <ChevronRightIcon className="w-6 h-6 text-blue-400" />
            </button>
          </div>
        </div>
      </section>

      {/* Tools & Technologies Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Tools & Technologien für KI-Transformation
            </h2>
            <p className="text-gray-400 text-lg">
              Modernste Technologien und APIs für Ihre digitale Transformation
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[
              {
                name: "TensorFlow",
                description: "Open-Source Framework für maschinelles Lernen und KI",
                icon: "🧠",
                gradient: "from-orange-500 to-red-500",
                category: "Machine Learning"
              },
              {
                name: "PyTorch",
                description: "Flexibles Deep Learning Framework für KI-Entwicklung",
                icon: "🔥",
                gradient: "from-red-500 to-orange-500",
                category: "Machine Learning"
              },
              {
                name: "n8n",
                description: "Workflow Automatisierung mit fairem Lizenzmodell",
                icon: "⚡",
                gradient: "from-blue-500 to-cyan-500",
                category: "Automation"
              },
              {
                name: "Make (Integromat)",
                description: "Visuelle Automatisierung komplexer Workflows",
                icon: "🔄",
                gradient: "from-green-500 to-teal-500",
                category: "Automation"
              },
              {
                name: "Google AI",
                description: "KI-Services und Machine Learning in der Cloud",
                icon: "☁️",
                gradient: "from-blue-500 to-purple-500",
                category: "Cloud AI"
              },
              {
                name: "Azure AI",
                description: "Microsoft's KI-Plattform für Unternehmen",
                icon: "💠",
                gradient: "from-blue-400 to-blue-600",
                category: "Cloud AI"
              },
              {
                name: "IBM Watson",
                description: "Enterprise KI-Lösungen und Cognitive Computing",
                icon: "🤖",
                gradient: "from-blue-600 to-indigo-600",
                category: "Cloud AI"
              },
              {
                name: "Power BI",
                description: "Business Intelligence und Datenvisualisierung",
                icon: "📊",
                gradient: "from-yellow-500 to-orange-500",
                category: "Analytics"
              },
              {
                name: "Tableau",
                description: "Interaktive Datenanalyse und Visualisierung",
                icon: "📈",
                gradient: "from-blue-500 to-indigo-500",
                category: "Analytics"
              },
              {
                name: "Vapi",
                description: "Voice API für natürliche Sprachverarbeitung",
                icon: "🎙️",
                gradient: "from-purple-500 to-pink-500",
                category: "APIs"
              },
              {
                name: "MongoDB",
                description: "Skalierbare NoSQL Datenbank",
                icon: "🗄️",
                gradient: "from-green-500 to-emerald-500",
                category: "Database"
              },
              {
                name: "Elasticsearch",
                description: "Leistungsstarke Suchengine und Analysen",
                icon: "🔎",
                gradient: "from-cyan-500 to-blue-500",
                category: "Search"
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="group"
              >
                <div className="h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-6
                              hover:bg-white/10 transition-all duration-300">
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/10 text-gray-300">
                      {tool.category}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${tool.gradient}
                                flex items-center justify-center text-2xl mb-4
                                transform group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-gray-400 text-sm">
                    {tool.description}
                  </p>

                  {/* Hover Line */}
                  <div className="mt-4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent
                                scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Button */}
          <Link href="/tools">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg
                        text-white font-medium hover:shadow-lg hover:shadow-purple-500/25
                        transition-all duration-300 mx-auto block"
            >
              <div className="flex items-center justify-center gap-2">
                <span>Mehr Tools entdecken!</span>
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </motion.svg>
              </div>
            </motion.button>
          </Link>
        </div>
      </section>

      {/* System Integration Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Nahtlose Integration in Ihre bestehende IT-Landschaft
            </h2>
            <p className="text-gray-400 text-lg">
              Unsere KI-Lösungen lassen sich einfach in bestehende ERP-, CRM- und BI-Systeme integrieren.
            </p>
          </motion.div>

          {/* Integration Flow Chart */}
          <div className="max-w-6xl mx-auto">
            {/* Systems Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  name: "KI für SAP",
                  description: "Integration von KI-Funktionen in SAP ERP und S/4HANA",
                  icon: "💼",
                  features: ["Automatisierte Dateneingabe", "Intelligente Prozesssteuerung", "Predictive Analytics"],
                  gradient: "from-blue-500 to-purple-500"
                },
                {
                  name: "KI für Microsoft Dynamics",
                  description: "KI-gestützte Erweiterungen für Microsoft Dynamics 365",
                  icon: "🔄",
                  features: ["Automatisches Lead Scoring", "Intelligente Forecasts", "Chatbot Integration"],
                  gradient: "from-purple-500 to-pink-500"
                },
                {
                  name: "KI für HubSpot & Salesforce",
                  description: "KI-Optimierung für führende CRM-Systeme",
                  icon: "🎯",
                  features: ["Personalisierte Kundenansprache", "Automatisierte Workflows", "Predictive Lead Scoring"],
                  gradient: "from-pink-500 to-red-500"
                }
              ].map((system, index) => (
                <motion.div
                  key={system.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative"
                >
                  <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 p-8
                                hover:bg-white/10 transition-all duration-300">
                    <div className={`w-16 h-16 rounded-xl bg-gradient-to-r ${system.gradient}
                                  flex items-center justify-center text-3xl mb-6`}>
                      {system.icon}
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-4">{system.name}</h3>
                    <p className="text-gray-400 mb-6">{system.description}</p>
                    <ul className="space-y-3">
                      {system.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-gray-300">
                          <svg className="w-5 h-5 mr-3 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* New CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-16 text-center"
            >
              <button 
                onClick={navigateToOfferPage}
                className="group relative inline-flex items-center justify-center px-8 py-4 
                         overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500 
                         text-white font-semibold text-lg shadow-2xl
                         hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span className="relative flex items-center gap-2">
                  KI Potenzial Check starten
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
                
                {/* Animated background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 
                              rounded-xl blur opacity-25 group-hover:opacity-50 
                              transition duration-300 group-hover:duration-200" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* KI Transformation Process Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              So führen wir KI in Ihr Unternehmen ein
            </h2>
            <p className="text-gray-400 text-lg">
              Von der Strategie bis zur Implementierung – unser strukturierter Prozess sorgt für eine reibungslose Transformation.
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="max-w-6xl mx-auto">
            {[
              {
                step: "01",
                title: "Analyse & Strategie",
                description: "Identifikation von Optimierungspotenzialen",
                icon: "🎯",
                gradient: "from-blue-500 to-purple-500",
                details: [
                  "Bestandsaufnahme aktueller Prozesse",
                  "Identifikation von KI-Potenzialen",
                  "Entwicklung einer Transformationsstrategie"
                ]
              },
              {
                step: "02",
                title: "Konzeption & Prototyping",
                description: "Entwicklung eines ersten KI-Modells",
                icon: "💡",
                gradient: "from-purple-500 to-pink-500",
                details: [
                  "Auswahl geeigneter KI-Technologien",
                  "Entwicklung von Proof-of-Concepts",
                  "Validierung der Machbarkeit"
                ]
              },
              {
                step: "03",
                title: "Datenaufbereitung & Training",
                description: "Training der KI mit Unternehmensdaten",
                icon: "🧠",
                gradient: "from-pink-500 to-red-500",
                details: [
                  "Datensammlung und -bereinigung",
                  "KI-Modell Training und Validierung",
                  "Optimierung der Modellgenauigkeit"
                ]
              },
              {
                step: "04",
                title: "Implementierung & Integration",
                description: "Einbindung der KI in bestehende Prozesse",
                icon: "⚙️",
                gradient: "from-red-500 to-orange-500",
                details: [
                  "Systemintegration",
                  "Mitarbeiterschulung",
                  "Testphase und Feinjustierung"
                ]
              },
              {
                step: "05",
                title: "Monitoring & Optimierung",
                description: "Kontinuierliche Verbesserung durch KI-Training",
                icon: "📈",
                gradient: "from-orange-500 to-yellow-500",
                details: [
                  "Performance-Monitoring",
                  "Kontinuierliches Modell-Training",
                  "Anpassung an neue Anforderungen"
                ]
              }
            ].map((phase, index) => (
              <motion.div
                key={phase.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative mb-16 last:mb-0"
              >
                <div className="flex items-start gap-8">
                  {/* Step Number & Icon */}
                  <div className="flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ type: "spring", stiffness: 100, delay: index * 0.2 }}
                      className={`w-20 h-20 rounded-2xl bg-gradient-to-r ${phase.gradient}
                                flex flex-col items-center justify-center text-white
                                border border-white/10 backdrop-blur-sm`}
                    >
                      <span className="text-3xl mb-1">{phase.icon}</span>
                      <span className="text-sm font-bold">{phase.step}</span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex-grow">
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8
                                  hover:bg-white/10 transition-all duration-300">
                      <h3 className="text-2xl font-semibold text-white mb-4">{phase.title}</h3>
                      <p className="text-gray-300 mb-6">{phase.description}</p>
                      
                      <ul className="space-y-3">
                        {phase.details.map((detail, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: (index * 0.2) + (i * 0.1) }}
                            className="flex items-center text-gray-400"
                          >
                            <svg className="w-5 h-5 mr-3 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                            {detail}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Connector Line */}
                {index < 4 && (
                  <div className="absolute left-10 top-20 w-px h-16 bg-gradient-to-b from-purple-500 to-transparent" />
                )}
              </motion.div>
            ))}

            {/* CTA Button Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="mt-20 text-center"
            >
              <motion.button
                onClick={navigateToOfferPage}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative inline-flex items-center justify-center px-8 py-4 
                         overflow-hidden rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 
                         text-white font-semibold text-lg shadow-2xl
                         hover:shadow-purple-500/25 transition-all duration-300"
              >
                <span className="relative flex items-center gap-2">
                  Jetzt Angebot einholen
                  <svg 
                    className="w-5 h-5 transition-transform duration-300 transform group-hover:translate-x-1" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </span>
                
                {/* Animated background glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 
                              rounded-lg blur opacity-25 group-hover:opacity-50 
                              transition duration-300 group-hover:duration-200" />
              </motion.button>
            </motion.div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Fragen & Antworten zur KI-Transformation" />
            </h2>
            <p className="text-xl text-gray-400">
              Hier finden Sie Antworten auf die häufigsten Fragen zur KI-Transformation
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Was kostet eine KI-Transformation?",
                answer: "Die Kosten einer KI-Transformation variieren je nach Umfang und Komplexität Ihres Projekts. Wir erstellen Ihnen ein individuelles Angebot basierend auf Ihren spezifischen Anforderungen und Zielen. Dabei berücksichtigen wir Faktoren wie die Anzahl der zu automatisierenden Prozesse, den Integrationsaufwand und den Schulungsbedarf."
              },
              {
                question: "Welche Prozesse lassen sich am besten automatisieren?",
                answer: "Besonders gut eignen sich repetitive, regelbasierte Aufgaben für die Automatisierung. Dazu gehören Dateneingabe und -verarbeitung, Dokumentenmanagement, Kundenservice-Prozesse und Qualitätskontrolle. Wir analysieren Ihre Prozesse und identifizieren die vielversprechendsten Automatisierungspotenziale."
              },
              {
                question: "Wie lange dauert die Implementierung?",
                answer: "Die Implementierungsdauer hängt von der Komplexität Ihres Projekts ab. Typischerweise rechnen wir mit 2-6 Monaten für die Grundimplementierung. Wir arbeiten agil und können erste Erfolge oft schon nach wenigen Wochen vorweisen. Die kontinuierliche Optimierung erfolgt dann schrittweise."
              },
              {
                question: "Wie funktioniert die Integration mit bestehenden Systemen?",
                answer: "Unsere KI-Lösungen sind darauf ausgelegt, sich nahtlos in Ihre bestehende IT-Infrastruktur zu integrieren. Wir nutzen standardisierte Schnittstellen (APIs) und entwickeln bei Bedarf maßgeschneiderte Konnektoren. Die Integration erfolgt schrittweise und ohne Unterbrechung Ihrer laufenden Prozesse."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden">
                      <Disclosure.Button className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-white/5">
                        <span className="text-lg font-medium text-white">{faq.question}</span>
                        <svg
                          className={`w-6 h-6 transform transition-transform duration-300 ${
                            open ? 'rotate-180' : ''
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                        </svg>
                      </Disclosure.Button>
                      <Disclosure.Panel>
                        <p className="text-gray-400 text-sm">{faq.answer}</p>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <GlowingEffect
            blur={20}
            spread={150}
            proximity={150}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10
                          shadow-[0_0_50px_-12px] shadow-purple-500/30 hover:shadow-purple-500/40 
                          transition-all duration-500">
              <Vortex
                backgroundColor="rgba(0,0,0,0.7)"
                rangeY={800}
                particleCount={300}
                baseHue={270}
                className="flex min-h-[600px] w-full flex-col items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl mb-8 md:mb-10"
                  >
                    <div className="text-white">Bereit für Ihre</div>
                    <div className="font-bold my-4">
                      <ColourfulText text="KI-Transformation" />
                    </div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihr Unternehmen mit KI auf das nächste Level bringen. 
                    Starten Sie jetzt Ihre digitale Transformation mit uns.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <button 
                      onClick={navigateToOfferPage}
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                               rounded-xl text-lg font-medium relative overflow-hidden group">
                      <span className="relative z-10">KI Potenzial Check starten</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                    transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  );
}
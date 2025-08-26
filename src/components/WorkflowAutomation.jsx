import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Vortex from '@/components/ui/vortex';
import ColourfulText from "@/components/ui/colourful-text";
import { Disclosure } from '@headlessui/react';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';

export default function WorkflowAutomation() {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Animated Process Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50"
                stroke="url(#gradient)"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
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
              <span className="text-white">Workflow Automatisierung – </span>
              <AnimatedGradientText>
                Intelligente Prozesse, maximale Effizienz
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Optimieren Sie Ihre Geschäftsprozesse mit KI-Agenten und modernsten Automatisierungstools.
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto"
            >
              Entdecken Sie die Zukunft der Prozessautomatisierung. Mit unseren maßgeschneiderten Lösungen 
              transformieren wir Ihre manuellen Abläufe in effiziente, automatisierte Workflows. 
              Steigern Sie Ihre Produktivität und reduzieren Sie Fehlerquoten – mit intelligenter Automatisierung.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex justify-center gap-6"
            >
              <GlowingEffect>
                <button
                  className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                           text-white rounded-xl text-lg font-medium 
                           hover:shadow-lg hover:shadow-purple-500/25 
                           transition-all duration-300"
                  onClick={() => router.push('/offer')}
                >
                  Prozessanalyse starten
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

            {/* Floating Elements */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"
              />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }}
                className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* KI-Agenten Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
            {/* Left Column - Animation/Icon */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square">
                {/* Circular Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-3xl" />
                
                {/* Animated Brain Icon */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    className="w-48 h-48 md:w-64 md:h-64 relative"
                  >
                    {/* Brain Icon Container */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full opacity-20 blur-2xl" />
                    <div className="absolute inset-0 flex items-center justify-center text-8xl">
                      🧠
                    </div>
                    
                    {/* Orbiting Elements */}
                    {[0, 1, 2].map((index) => (
                      <motion.div
                        key={index}
                        animate={{
                          rotate: [0, 360]
                        }}
                        transition={{
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                          delay: index * 0.5
                        }}
                        className="absolute inset-0"
                      >
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 
                                      bg-gradient-to-r from-purple-500 to-blue-500 rounded-full 
                                      blur-[2px]" 
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </div>
              </div>

              {/* Floating Data Points */}
              {[...Array(5)].map((_, index) => (
                <motion.div
                  key={index}
                  animate={{
                    y: [0, -10, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3
                  }}
                  className="absolute"
                  style={{
                    left: `${20 + index * 15}%`,
                    top: `${30 + (index % 3) * 20}%`
                  }}
                >
                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r 
                                 ${index % 2 === 0 ? 'from-purple-500 to-blue-500' : 'from-blue-500 to-purple-500'}`} 
                  />
                </motion.div>
              ))}
            </motion.div>

            {/* Right Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:pl-12"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-8">
                <ColourfulText text="KI-Agenten – Ihre digitalen Helfer im Workflow" />
              </h2>

              <div className="space-y-6 text-lg text-gray-400">
                <p>
                  Unsere intelligenten KI-Agenten lernen Ihre Prozesse kennen und optimieren diese kontinuierlich – 
                  für mehr Effizienz und weniger manuellen Aufwand.
                </p>
                
                <div className="space-y-4">
                  {[
                    {
                      title: "Automatische Aufgabenverarbeitung",
                      description: "KI-Agenten übernehmen repetitive Aufgaben und führen diese rund um die Uhr präzise aus."
                    },
                    {
                      title: "Intelligente Entscheidungsfindung",
                      description: "Datenbasierte Analysen unterstützen bei komplexen Entscheidungsprozessen."
                    },
                    {
                      title: "Kontinuierliche Optimierung",
                      description: "Machine Learning Algorithmen verbessern die Prozesse stetig durch Lernen aus Erfahrungen."
                    }
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-start gap-4 bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors"
                    >
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 
                                    flex items-center justify-center shrink-0">
                        {index === 0 ? '🤖' : index === 1 ? '🧮' : '📈'}
                      </div>
                      <div>
                        <h3 className="text-white font-medium mb-1">{feature.title}</h3>
                        <p className="text-gray-400 text-base">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                           rounded-xl text-white font-medium relative overflow-hidden group"
                  onClick={() => router.push('/offer')}
                >
                  <span className="relative z-10">Prozessanalyse starten</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                transition-opacity duration-300" />
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Process Automation Section */}
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
              <ColourfulText text="Automatisierung von Geschäftsprozessen" />
            </h2>
            <p className="text-xl text-gray-400">
              Durch den gezielten Einsatz von Automatisierungslösungen können Sie repetitive Aufgaben eliminieren 
              und sich auf strategische Entscheidungen konzentrieren.
            </p>
          </motion.div>

          {/* Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {[
              {
                icon: "⚡",
                title: "Schnellere Prozesse",
                description: "Automatisierte Workflows reduzieren die Bearbeitungszeit um bis zu 80% und eliminieren Wartezeiten.",
                gradient: "from-yellow-500 to-orange-500"
              },
              {
                icon: "💰",
                title: "Kostenreduktion",
                description: "Senken Sie Ihre operativen Kosten durch effiziente, automatisierte Abläufe und minimieren Sie manuelle Eingriffe.",
                gradient: "from-green-500 to-emerald-500"
              },
              {
                icon: "🎯",
                title: "Höhere Präzision",
                description: "Eliminieren Sie menschliche Fehler und gewährleisten Sie konsistente Qualität in allen Prozessen.",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                icon: "📊",
                title: "Bessere Skalierbarkeit",
                description: "Wachsen Sie ohne proportionalen Anstieg der Prozesskosten und behalten Sie die volle Kontrolle.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                icon: "🔄",
                title: "Nahtlose Integration",
                description: "Verbinden Sie bestehende Systeme und schaffen Sie einen durchgängigen Informationsfluss.",
                gradient: "from-red-500 to-rose-500"
              },
              {
                icon: "📱",
                title: "Mobile Zugänglichkeit",
                description: "Greifen Sie von überall auf Ihre automatisierten Prozesse zu und behalten Sie den Überblick.",
                gradient: "from-teal-500 to-cyan-500"
              }
            ].map((process, index) => (
              <motion.div
                key={process.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative group"
              >
                <div className="p-6 rounded-2xl bg-white/5 hover:bg-white/10 
                              border border-white/10 transition-all duration-300
                              hover:shadow-lg hover:shadow-purple-500/10">
                  {/* Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${process.gradient}
                                flex items-center justify-center text-3xl mb-6
                                transform group-hover:scale-110 transition-transform duration-300`}>
                    {process.icon}
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {process.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {process.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 
                                opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6 text-lg">
              Bereit, Ihre Prozesse zu automatisieren?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                       rounded-xl text-lg font-medium relative overflow-hidden group"
              onClick={() => router.push('/offer')}
            >
              <span className="relative z-10">Prozessanalyse starten</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                            transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
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
              <ColourfulText text="Praxisbeispiele unserer Workflow Automatisierung" />
            </h2>
            <p className="text-xl text-gray-400">
              Entdecken Sie, wie unsere Lösungen in verschiedenen Bereichen erfolgreich eingesetzt werden
            </p>
          </motion.div>

          {/* Use Cases Slider */}
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {[
                {
                  icon: "👥",
                  title: "HR-Prozesse",
                  subtitle: "Automatisiertes Onboarding",
                  description: "Optimieren Sie den Einstellungsprozess durch automatisierte Dokumentenerstellung, Zugriffsrechte-Verwaltung und Einarbeitungspläne.",
                  features: [
                    "Automatische Erstellung von Arbeitsverträgen",
                    "Koordinierte Zugriffsrechte-Vergabe",
                    "Strukturierte Einarbeitungspläne",
                    "Erinnerungen für wichtige Meilensteine"
                  ],
                  gradient: "from-blue-500 to-purple-500"
                },
                {
                  icon: "📄",
                  title: "Rechnungsbearbeitung",
                  subtitle: "Digitale Rechnungsverarbeitung",
                  description: "Automatisieren Sie den gesamten Rechnungsprozess von der Erfassung bis zur Bezahlung mit KI-gestützter Dokumentenverarbeitung.",
                  features: [
                    "KI-basierte Datenextraktion",
                    "Automatische Kontierung",
                    "Digitaler Freigabeprozess",
                    "Automatisierte Buchungen"
                  ],
                  gradient: "from-green-500 to-teal-500"
                },
                {
                  icon: "🎯",
                  title: "Kundenservice",
                  subtitle: "Intelligentes Ticket-Management",
                  description: "Verbessern Sie Ihre Reaktionszeiten durch automatische Kategorisierung und Weiterleitung von Kundenanfragen.",
                  features: [
                    "KI-gestützte Ticket-Klassifizierung",
                    "Automatische Prioritätensetzung",
                    "Intelligente Agentenzuweisung",
                    "Vorgefertigte Antwortvorlagen"
                  ],
                  gradient: "from-orange-500 to-red-500"
                },
                {
                  icon: "📈",
                  title: "Marketing Automation",
                  subtitle: "Lead-Management & Nurturing",
                  description: "Automatisieren Sie Ihre Marketing-Kampagnen für effiziente Lead-Generierung und personalisierte Kundenansprache.",
                  features: [
                    "Automatisierte E-Mail-Kampagnen",
                    "Lead-Scoring und -Qualifizierung",
                    "Personalisierte Content-Delivery",
                    "Performance-Tracking"
                  ],
                  gradient: "from-pink-500 to-rose-500"
                }
              ].map((useCase, index) => (
                <motion.div
                  key={useCase.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                  className="relative group"
                >
                  <div className="h-full p-8 rounded-2xl bg-white/5 hover:bg-white/10 
                                border border-white/10 transition-all duration-300
                                hover:shadow-lg hover:shadow-purple-500/10">
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${useCase.gradient}
                                    flex items-center justify-center text-3xl
                                    transform group-hover:scale-110 transition-transform duration-300`}>
                        {useCase.icon}
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">{useCase.title}</h3>
                        <p className="text-gray-400">{useCase.subtitle}</p>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6">
                      {useCase.description}
                    </p>

                    {/* Features */}
                    <ul className="space-y-3">
                      {useCase.features.map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: (index * 0.2) + (featureIndex * 0.1) }}
                          className="flex items-center gap-3"
                        >
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${useCase.gradient}`} />
                          <span className="text-gray-400">{feature}</span>
                        </motion.li>
                      ))}
                    </ul>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/5 to-blue-500/0 
                                  opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6 text-lg">
              Interessiert an einer maßgeschneiderten Automatisierungslösung?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                       rounded-xl text-lg font-medium relative overflow-hidden group"
              onClick={() => router.push('/offer')}
            >
              <span className="relative z-10">Prozessanalyse starten</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                            transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* System Integration Section */}
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
              <ColourfulText text="Nahtlose Integration – Systeme vernetzt" />
            </h2>
            <p className="text-xl text-gray-400">
              Unsere Workflow-Automatisierung integriert sich problemlos in Ihre bestehende IT-Landschaft – 
              von internen Systemen bis zu Cloud-Anwendungen.
            </p>
          </motion.div>

          {/* Integration Diagram */}
          <div className="max-w-6xl mx-auto relative">
            {/* Central Hub */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="w-48 h-48 mx-auto mb-12 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full opacity-20 blur-xl" />
              <div className="relative h-full rounded-full border-2 border-white/10 bg-black/50 backdrop-blur-sm
                            flex items-center justify-center p-6 group hover:border-purple-500/50 transition-colors">
                <div className="text-center">
                  <div className="text-3xl mb-2">⚡</div>
                  <div className="text-white font-medium">Workflow Engine</div>
                </div>
              </div>
            </motion.div>

            {/* Integration Systems */}
            <div className="relative">
              {/* Connection Lines */}
              <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <motion.path
                    key={index}
                    d={`M ${400} ${200} Q ${300 + index * 50} ${150} ${200 + index * 100} ${100 + index * 50}`}
                    stroke="url(#lineGradient)"
                    strokeWidth="2"
                    fill="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="opacity-20"
                  />
                ))}
                <defs>
                  <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#8B5CF6" />
                    <stop offset="100%" stopColor="#3B82F6" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Integration Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                  {
                    icon: "💼",
                    title: "ERP Systeme",
                    description: "SAP, Microsoft Dynamics, Oracle",
                    features: ["Datensynchronisation", "Prozessintegration", "Automatische Updates"],
                    gradient: "from-blue-500 to-cyan-500"
                  },
                  {
                    icon: "👥",
                    title: "CRM Systeme",
                    description: "Salesforce, HubSpot, Microsoft Dynamics",
                    features: ["Kundenmanagement", "Vertriebsautomatisierung", "Lead-Tracking"],
                    gradient: "from-purple-500 to-pink-500"
                  },
                  {
                    icon: "📧",
                    title: "E-Mail & Kommunikation",
                    description: "Outlook, Gmail, Teams, Slack",
                    features: ["Automatische Benachrichtigungen", "E-Mail-Workflows", "Chat-Integration"],
                    gradient: "from-orange-500 to-red-500"
                  },
                  {
                    icon: "📊",
                    title: "Analytics Tools",
                    description: "Power BI, Tableau, Google Analytics",
                    features: ["Datenanalyse", "Reporting", "Dashboards"],
                    gradient: "from-green-500 to-emerald-500"
                  },
                  {
                    icon: "☁️",
                    title: "Cloud Services",
                    description: "AWS, Azure, Google Cloud",
                    features: ["Skalierbare Infrastruktur", "Cloud Storage", "Serverless Functions"],
                    gradient: "from-indigo-500 to-purple-500"
                  },
                  {
                    icon: "🔐",
                    title: "Security Tools",
                    description: "Identity Management, SSO, Encryption",
                    features: ["Zugriffssteuerung", "Datenverschlüsselung", "Compliance"],
                    gradient: "from-rose-500 to-pink-500"
                  }
                ].map((system, index) => (
                  <motion.div
                    key={system.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="relative group"
                  >
                    <div className="p-6 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10
                                  transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                      <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${system.gradient}
                                    flex items-center justify-center text-2xl mb-4
                                    transform group-hover:scale-110 transition-transform duration-300`}>
                        {system.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">{system.title}</h3>
                      <p className="text-gray-400 mb-4">{system.description}</p>
                      <ul className="space-y-2">
                        {system.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-gray-400">
                            <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${system.gradient}`} />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Bottom CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
              <p className="text-gray-400 mb-6 text-lg">
                Bereit für eine nahtlose Integration in Ihre Systemlandschaft?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group"
                onClick={() => router.push('/offer')}
              >
                <span className="relative z-10">Prozessanalye starten</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                              transition-opacity duration-300" />
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
              <ColourfulText text="Fragen und Antworten" />
            </h2>
            <p className="text-xl text-gray-400">
              Hier finden Sie Antworten auf die häufigsten Fragen zur Workflow-Automatisierung
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Wie starten wir mit der Workflow Automatisierung?",
                answer: "Der Einstieg beginnt mit einer gründlichen Analyse Ihrer bestehenden Prozesse. In einem kostenlosen Erstgespräch identifizieren wir gemeinsam Potenziale für Automatisierung und entwickeln eine maßgeschneiderte Strategie für Ihr Unternehmen."
              },
              {
                question: "Welche Vorteile bietet die Integration von KI-Agenten?",
                answer: "KI-Agenten automatisieren nicht nur repetitive Aufgaben, sondern lernen kontinuierlich dazu. Sie optimieren Prozesse selbstständig, erkennen Muster und treffen datenbasierte Entscheidungen - das spart Zeit, reduziert Fehler und steigert die Effizienz."
              },
              {
                question: "Welche Tools setzen Sie ein und wie erfolgt die Anbindung?",
                answer: "Wir arbeiten mit führenden Automatisierungsplattformen und entwickeln auch eigene, maßgeschneiderte Lösungen. Die Integration erfolgt nahtlos über standardisierte Schnittstellen (APIs) und kann schrittweise implementiert werden."
              },
              {
                question: "Wie lange dauert der gesamte Prozess?",
                answer: "Die Implementierungsdauer variiert je nach Komplexität und Umfang der Automatisierung. Erste Erfolge sind oft schon nach wenigen Wochen sichtbar. Wir arbeiten agil und können die Automatisierung schrittweise einführen."
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="rounded-xl overflow-hidden">
                      <Disclosure.Button className="w-full p-6 text-left bg-white/5 hover:bg-white/10 
                                                 border border-white/10 transition-all duration-300">
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-medium text-white">{faq.question}</span>
                          <svg
                            className={`w-6 h-6 transform transition-transform duration-300 ${
                              open ? 'rotate-180' : ''
                            }`}
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </div>
                      </Disclosure.Button>
                      <Disclosure.Panel className="p-6 bg-white/5 border-t border-white/10">
                        <p className="text-gray-400">
                          {faq.answer}
                        </p>
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
                          shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 
                          transition-all duration-500">
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
                    <div className="text-white">Bereit für Ihre</div>
                    <div className="font-bold my-4">
                      <ColourfulText text="Workflow Automatisierung" />
                    </div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihre Prozesse optimieren und automatisieren. 
                    Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <button
                      className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 
                               rounded-xl text-lg font-medium relative overflow-hidden group"
                      onClick={() => router.push('/offer')}
                    >
                      <span className="relative z-10">Prozessanalyse starten</span>
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
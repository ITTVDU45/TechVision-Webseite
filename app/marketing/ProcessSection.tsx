"use client";
import { motion } from 'framer-motion';
import {
  ChartBarIcon,
  PuzzlePieceIcon,
  CogIcon,
  ClipboardDocumentCheckIcon,
  ChartBarSquareIcon,
  SparklesIcon,
  BuildingOfficeIcon,
  WrenchScrewdriverIcon,
  PresentationChartBarIcon,
  CloudIcon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import LottieSequence from '../components/LottieSequence';
import { useRouter } from 'next/navigation';

export default function ProcessSection() {
  const processes = [
    {
      step: "1️⃣",
      title: "Analyse & Strategie",
      description: "Wir starten mit einer umfassenden Analyse Ihrer bestehenden Systeme, Prozesse und Ziele. Darauf aufbauend entwickeln wir eine maßgeschneiderte Strategie.",
      icon: ChartBarIcon,
      gradient: "from-blue-500 to-blue-600"
    },
    {
      step: "2️⃣",
      title: "Konzeption & Planung",
      description: "Gemeinsam definieren wir den Fahrplan: Welche Lösungen bringen den größten Mehrwert? Wie lassen sich bestehende Systeme einbinden?",
      icon: PuzzlePieceIcon,
      gradient: "from-indigo-500 to-indigo-600"
    },
    {
      step: "3️⃣",
      title: "Umsetzung & Integration",
      description: "Wir entwickeln die Lösungen und integrieren sie nahtlos in Ihre bestehende IT-Landschaft – mit klarem Fokus auf Benutzerfreundlichkeit, Sicherheit und Skalierbarkeit.",
      icon: CogIcon,
      gradient: "from-violet-500 to-violet-600"
    },
    {
      step: "4️⃣",
      title: "Test & Qualitätssicherung",
      description: "Vor dem Go-Live durchlaufen alle Lösungen umfassende Tests – funktional, sicherheitstechnisch und im Live-Betrieb.",
      icon: ClipboardDocumentCheckIcon,
      gradient: "from-purple-500 to-purple-600"
    },
    {
      step: "5️⃣",
      title: "Monitoring & Support",
      description: "Auch nach Abschluss des Projekts bleiben wir an Ihrer Seite: mit Monitoring, regelmäßigen Sicherheitsupdates und kontinuierlicher Optimierung.",
      icon: ChartBarSquareIcon,
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  const advantages = [
    {
      title: "Experten für KI, Automatisierung & IT-Sicherheit",
      icon: SparklesIcon,
      gradient: "from-blue-500 to-indigo-600"
    },
    {
      title: "Branchenübergreifende Erfahrung",
      icon: BuildingOfficeIcon,
      gradient: "from-indigo-500 to-violet-600"
    },
    {
      title: "Maßgeschneiderte Lösungen statt Standardprodukte",
      icon: WrenchScrewdriverIcon,
      gradient: "from-violet-500 to-purple-600"
    },
    {
      title: "Transparente Projektführung",
      icon: PresentationChartBarIcon,
      gradient: "from-purple-500 to-blue-600"
    },
    {
      title: "360° Betreuung: Von Beratung bis Hosting",
      icon: CloudIcon,
      gradient: "from-blue-500 to-indigo-600"
    }
  ];

  const router = useRouter();

  const navigateToOfferPage = () => {
    router.push('/offer');
  };

  return (
    <>
      {/* Advantages Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="text-white">Warum wir? – </span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  Ihre Vorteile mit uns
                </span>
              </motion.h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
              {/* Animated Lottie Animations - Left Side */}
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1"
              >
                <LottieSequence 
                  animations={[
                    '/images/Animation - 1741036602524.json',
                    '/images/Animation - 1741036687582.json',
                    '/images/Animation - 1741036737893.json',
                    '/images/Animation - 1741036909547.json'
                  ]}
                />
              </motion.div>

              {/* Advantages - Right Side */}
              <div className="flex-1 space-y-6">
                {advantages.map((advantage, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 
                             hover:border-white/20 transition-all duration-300
                             hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${advantage.gradient} 
                                   shadow-lg shadow-blue-500/20`}>
                        <advantage.icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-lg font-semibold text-white">
                        {advantage.title}
                      </h3>
                    </div>
                  </motion.div>
                ))}
                
                {/* Neuer Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="pt-6"
                >
                  <motion.button
                    onClick={navigateToOfferPage}
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 
                              rounded-xl text-lg font-medium relative overflow-hidden group"
                  >
                    <span className="relative z-10">Prozessanalyse Starten</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-blue-500 opacity-0 
                                  group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                  </motion.button>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-4xl md:text-5xl font-bold mb-6"
              >
                <span className="text-white">Unser Prozess – </span>
                <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                  So arbeiten wir mit Ihnen
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-xl text-gray-400 max-w-3xl mx-auto"
              >
                Eine transparente und strukturierte Zusammenarbeit ist der Schlüssel zu erfolgreichen Projekten. 
                So begleiten wir Sie Schritt für Schritt:
              </motion.p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-start">
              {/* Process Steps - Left Side */}
              <div className="flex-1 space-y-6">
                {processes.map((process, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-900/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 
                             hover:border-white/20 transition-all duration-300
                             hover:shadow-lg hover:shadow-blue-500/10"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex items-center gap-4 min-w-[100px]">
                        <div className="text-3xl">{process.step}</div>
                        <div className={`p-2 rounded-xl bg-gradient-to-br ${process.gradient} 
                                     shadow-lg shadow-blue-500/20`}>
                          <process.icon className="w-5 h-5 text-white" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-2">
                          {process.title}
                        </h3>
                        <p className="text-gray-400 text-sm">
                          {process.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Animated Lottie Animations - Right Side */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="flex-1 sticky top-24"
              >
                <LottieSequence 
                  animations={[
                    '/images/Animation - 1741038349679.json',
                    '/images/Animation - 1741038210767.json',
                    '/images/Animation - 1741037944263.json'
                  ]}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// LottieSequence is provided from app/components to keep client-only behaviour

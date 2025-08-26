import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Vortex from '@/components/ui/vortex';
import Header from '@/components/Header';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import CarousellTemplate from '@/components/templates/CarousellTemplate';
import { categorizedCases } from './CaseStudies';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';

const CaseStudyKITelefonie = () => {
  return (
    <div className="min-h-screen relative">
      <Vortex backgroundColor="black" baseHue={220} particleCount={200} rangeY={800}>
        <div className="relative text-white">
          <Header />
          
          {/* Hero Section */}
          <section className="h-[32rem] relative overflow-hidden flex items-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
              <div className="absolute inset-0 bg-[url('/images/aitelefonie.jpg')] opacity-20" />
            </div>
            <div className="container mx-auto px-4 py-16 relative z-10">
              <Link href="/case-studies" className="absolute top-4 left-4">
                <button className="bg-transparent text-white underline px-3 py-1 hover:text-gray-300 transition">
                  Zurück zu Case Studies
                </button>
              </Link>
              <div className="max-w-5xl mx-auto text-center">
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  <span className="text-white">KI-Assistentin automatisiert Telefonreservierungen </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                   in Düsseldorfer Restaurant
                  </span>
                </motion.h1>
              </div>
            </div>
          </section>

          {/* Unternehmensbeschreibung */}
          <section className="min-h-screen relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>
            <div className="container mx-auto px-4 relative z-10 flex flex-col pt-20 pb-40">
              <div className="mb-8 text-center">
                <img src="/images/aitelefonie.jpg" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {[
                  { title: "Kunde", description: "Resteraunt am Medienhafen in Düsseldorf" },
                  { title: "Branche", description: "Lebensmittel / Gastronomie" },
                  { title: "Ziel", description: "Automatisierung der Kundenkommunikation" },
                  { title: "Standort", description: "Düsseldorf, Deutschland" }
                ].map((item, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center border border-neutral-800 hover:border-neutral-700 transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Zitat Sektion */}
          <section className="py-16 relative h-[40vh] flex items-center overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-center"
              >
                <motion.blockquote 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-2xl md:text-4xl font-semibold text-white italic"
                >
                  "Dank der KI-Assistentin können wir endlich alle Reservierungsanfragen entgegennehmen, selbst in den stressigsten Stoßzeiten."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - Resteraunt am Medienhafen in Düsseldorf
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Grid Sektion */}
          <section className="py-16 relative overflow-hidden hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
            </div>
            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col items-center"
              >
                <img src="/images/customer.jpg" alt="Kundenbild" className="w-1/2 h-auto rounded-full mb-4" />
                <p className="text-xl font-bold text-white">Max Mustermann</p>
                <p className="text-gray-400">CEO, A Plus Gerüstbau GmbH</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
              >
                <video controls className="w-full h-auto rounded-lg">
                  <source src="/videos/customer-testimonial.mp4" type="video/mp4" />
                  Ihr Browser unterstützt das Video-Tag nicht.
                </video>
              </motion.div>
            </div>
          </section>

          {/* Weitere Informationen */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Weitere Informationen</h2>
              <p className="text-gray-400 mb-8">Hier sind einige zusätzliche Informationen über das Projekt und die beteiligten Technologien.</p>
              <BentoGrid>
                {[
                  {
                    title: "📌 Tech Stack",
                    description: [
                      { icon: "🤖", text: "KI & Automatisierung: OpenAI, ElevenLabs (Text-to-Speech)" },
                      { icon: "🔄", text: "Workflow-Automatisierung: N8N" },
                      { icon: "📞", text: "Telefon-Integration: Vapi" },
                      { icon: "🔗", text: "API-Schnittstellen: Verbindung mit dem Reservierungssystem" },
                      { icon: "💾", text: "CRM-Tool: Automatische Speicherung & Kundenkommunikation" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "📞", text: "Implementierung einer KI-Assistentin für Telefonreservierungen" },
                      { icon: "🔗", text: "Integration der KI-Agentin mit dem bestehenden Reservierungssystem" },
                      { icon: "✅", text: "Automatische Bestätigung und Verwaltung von Reservierungen" },
                      { icon: "📧", text: "Automatisierter Newsletter-Versand zur Kundenbindung" },
                      { icon: "🔧", text: "API-Entwicklung zur nahtlosen Verbindung mit bestehenden Systemen" },
                      { icon: "🔍", text: "Testing & Optimierung der Spracherkennung und Kundendialoge" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 3 Monate" },
                      { icon: "👥", text: "Teamgröße: 2 Entwickler, 1 KI-Spezialist, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: KI-gestützte Automatisierung & API-Integration" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtstunden: 400 Stunden" },
                      { icon: "🤖", text: "KI-Entwicklung & Training: 150 Stunden" },
                      { icon: "🔗", text: "API-Integration & Automatisierung: 120 Stunden" },
                      { icon: "🔍", text: "Testing & Optimierung: 80 Stunden" },
                      { icon: "📧", text: "Einrichtung des Newsletter-Systems: 50 Stunden" }
                    ]
                  }
                ].map((item, index) => (
                  <BentoCard key={index} name={item.title}>
                    <div className="grid grid-cols-1 gap-4">
                      {item.description.map((desc, i) => (
                        <div key={i} className="flex items-center bg-neutral-800 p-4 rounded-lg shadow-md">
                          <span className="mr-2">{desc.icon}</span>
                          <span className="text-white">{desc.text}</span>
                        </div>
                      ))}
                    </div>
                  </BentoCard>
                ))}
              </BentoGrid>
            </div>
          </section>

          {/* Einblicke in das Projekt */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-white">Einblicke in das Projekt</h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/AI Voice Assistant.jpg" alt="Großes Foto 1" className="w-full h-64 object-cover rounded-lg" />
                <img src="/images/AI Voice Asisstant2.png" alt="Großes Foto 2" className="w-full h-64 object-cover rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/AI Voice Assistant3.jpg" alt="Großes Foto 3" className="w-full h-64 object-cover rounded-lg" />
                <img src="/images/Ai Voice Assistant 4.png" alt="Großes Foto 4" className="w-full h-64 object-cover rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - KI-Assistentin automatisiert Telefonreservierungen</h3>
                  <p className="text-gray-400">Ein Restaurant in Düsseldorf stand vor der Herausforderung, während Stoßzeiten zahlreiche Anrufe nicht entgegennehmen zu können, was zu verpassten Reservierungen und schlechter Kundenerfahrung führte. Durch die Implementierung eines KI-gestützten Telefonsystems wurde die Reservierungsverwaltung vollständig automatisiert. Eine künstliche Intelligenz Assistentin übernimmt nun eingehende Telefonate, verarbeitet Reservierungsanfragen und integriert diese nahtlos in das bestehende Reservierungsverwaltungssystem. Zudem wurde eine automatische Newsletter-Funktion eingeführt, um Gäste regelmäßig über Angebote und Events zu informieren. Die Kombination aus KI-gestützter Spracherkennung, API-Verknüpfungen und CRM-Integration hat den Kundenservice verbessert, Wartezeiten eliminiert und die Verwaltung von Reservierungen effizienter gestaltet.</p>
                </div>
                <img src="/images/Ai Voice Assistant 4.png" alt="Projektbild" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Lebensmittel / Gastronomie</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Düsseldorf, Deutschland</p>
                </div>
              </div>
            </div>
          </section>

          {/* Herausforderungen und Ergebnis */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-white">Herausforderungen und Ergebnis</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
                  <Cross1Icon className="w-8 h-8 text-red-500 mb-4 text-center" />
                  <h3 className="text-xl font-bold text-white text-center mb-4">Herausforderungen</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Ineffiziente Anrufbearbeitung",
                        description: "Lange Wartezeiten und verpasste Anrufe führten zu unzufriedenen Kunden und entgangenen Geschäftsmöglichkeiten.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Manuelle Terminkoordination",
                        description: "Die manuelle Terminverwaltung war zeitaufwendig und fehleranfällig.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Fehlende Priorisierung",
                        description: "Wichtige Kundenanfragen konnten nicht effektiv von weniger dringenden unterschieden werden.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-neutral-800 p-4 rounded-lg shadow-md flex items-start">
                        <div className="mr-3">{item.icon}</div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg">
                  <CheckIcon className="w-8 h-8 text-green-500 mb-4 text-center" />
                  <h3 className="text-xl font-bold text-white text-center mb-4">Ergebnis</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Optimierte Anrufverteilung",
                        description: "90% höhere Annahmequote durch KI-gesteuerte Anrufweiterleitung und intelligentes Routing.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Automatisierte Terminplanung",
                        description: "75% Zeitersparnis durch automatische Terminvereinbarung und -verwaltung.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Intelligente Priorisierung",
                        description: "45% mehr erfolgreiche Buchungen durch effektive Kundenanfragenpriorisierung.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      }
                    ].map((item, index) => (
                      <div key={index} className="bg-neutral-800 p-4 rounded-lg shadow-md flex items-start">
                        <div className="mr-3">{item.icon}</div>
                        <div>
                          <h4 className="text-lg font-bold text-white">{item.title}</h4>
                          <p className="text-gray-400">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Weitere Projekte */}
          <section className="py-40 relative overflow-hidden">
            <div className="container mx-auto px-4">
              {/* Slider */}
              <CarousellTemplate caseStudies={[...(categorizedCases.software || []), ...(categorizedCases['tools-ki-agenten'] || []), ...(categorizedCases.onlineshop || [])]} />
            </div>
          </section>

          <Footer />
        </div>
      </Vortex>
    </div>
  );
};

export default CaseStudyKITelefonie; 
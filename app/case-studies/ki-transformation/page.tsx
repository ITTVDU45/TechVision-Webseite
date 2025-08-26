"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Vortex from '@/components/ui/vortex';
import Header from '@/components/Header';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import CarousellTemplate from '@/components/templates/CarousellTemplate';
import { categorizedCases } from '@/components/CaseStudies';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';

const CaseStudyKITransformation: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <Vortex backgroundColor="black" baseHue={220} particleCount={200} rangeY={800}>
        <div className="relative text-white">
          <Header />
          {/* Hero Section */}
          <section className="h-[32rem] relative overflow-hidden flex items-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
              <div className="absolute inset-0 bg-[url('/path/to/your-image.jpg')] opacity-20" />
            </div>
            <div className="container mx-auto px-4 py-16 relative z-10">
              <Link href="/case-studies" className="absolute top-4 left-4">
                <button className="bg-transparent text-white underline px-3 py-1 hover:text-gray-300 transition">Zurück zu Case Studies</button>
              </Link>
              <div className="max-w-5xl mx-auto text-center">
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-white">KI Transformation – </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">Unternehmensberatung für Vernetzung & Markteintritt (IT & Telekommunikation)</span>
                </motion.h1>
              </div>
            </div>
          </section>

          {/* Unternehmensbeschreibung */}
          <section className="py-32 bg-black relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-black via-indigo-950/10 to-black" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="mb-20 text-center">
                <img src="/images/white-linqint-logo.png" alt="Unternehmenslogo" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: 'Kunde', description: 'Linqint' },
                  { title: 'Branche', description: 'Unternehmensberatung im Bereich IT & Telekommunikation.' },
                  { title: 'Ziel', description: 'Automatisierung des Matching-Prozesses für Unternehmenspartnerschaften (z. B. Markteintritt, Produktionsverlagerung, Kooperation).' },
                  { title: 'Standort', description: 'Düsseldorf, Deutschland' }
                ].map((item, index) => (
                  <div key={index} className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-6 shadow-lg text-center border border-neutral-800 hover:border-neutral-700 transition-all duration-300 transform hover:-translate-y-2">
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                    <p className="text-gray-400">{item.description}</p>
                  </div>
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
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
                <motion.blockquote initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1, delay: 0.2 }} className="text-2xl md:text-4xl font-semibold text-white italic">
                  "Dank der KI-gestützten Automatisierung können wir Unternehmenspartnerschaften nun viel schneller und gezielter vermitteln. Die manuelle Recherche und Analyse entfällt weitgehend, sodass wir uns voll auf die strategische Beratung und den Ausbau unseres Netzwerks konzentrieren können."
                </motion.blockquote>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.4 }} className="mt-4 text-gray-400">- Linqint</motion.p>
              </motion.div>
            </div>
          </section>

          {/* Grid Sektion */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
            </div>
            <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="flex flex-col items-center">
                <img src="/images/Hüseyindirim.jpeg" alt="Hüseyin Dirim" className="w-1/2 h-auto rounded-full mb-4" />
                <p className="text-xl font-bold text-white">Hüseyin Dirim</p>
                <p className="text-gray-400">CEO, Linqint</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg">
                <img src="/images/white-linqint-logo.png" alt="Linqint Logo" className="w-full h-auto rounded-lg" />
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
                    title: '📌 Tech Stack',
                    description: [
                      { icon: '🔧', text: 'Frontend & Backend: React (Frontend) und Node.js (Backend)' },
                      { icon: '🗄️', text: 'Datenbanken & Infrastruktur: MongoDB, MinIO, Docker' },
                      { icon: '🤖', text: 'Automatisierung & Workflow: n8n, Silentium, Flowwise' },
                      { icon: '🔗', text: 'KI & API-Integration: Vapi, Perplexity, Google APIs' }
                    ]
                  },
                  {
                    title: '💼 Services',
                    description: [
                      { icon: '🔄', text: 'Transformation der Geschäftsprozesse' },
                      { icon: '🌐', text: 'Softwareentwicklung für Unternehmensmatching' },
                      { icon: '📊', text: 'Visuelle Berichte & Dashboards' },
                      { icon: '🤖', text: 'Leadgenerierung über KI-Agent' },
                      { icon: '📝', text: 'Automatisierte Content-Erstellung' },
                      { icon: '📚', text: 'Schulungen & Beratung' }
                    ]
                  },
                  {
                    title: '📊 Projekt-Fakten',
                    description: [
                      { icon: '⏱️', text: 'Projektdauer: 6 Monate' },
                      { icon: '👥', text: 'Teamgröße: 8 Personen' },
                      { icon: '🔍', text: 'Technologie-Fokus: KI-gestützte Automatisierung' }
                    ]
                  },
                  {
                    title: '⏳ Zeitaufwand',
                    description: [
                      { icon: '⏲️', text: 'Gesamtaufwand: ca. 900 Stunden' },
                      { icon: '🔗', text: 'Datenbank- & API-Integration: ~300 Stunden' },
                      { icon: '🤖', text: 'KI-Agenten für Matching & Berichte: ~250 Stunden' },
                      { icon: '📈', text: 'Leadgenerierung & Marketing-Automatisierung: ~200 Stunden' },
                      { icon: '🔍', text: 'Testing & Optimierung: ~150 Stunden' }
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
                <img src="/images/Linqint1.png" alt="Linqintwebseite1" className="w-full h-auto rounded-lg" />
                <img src="/images/linqint2.png" alt="Linqintwebseite2" className="w-full h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/linqint3.png" alt="Linqintwebseite3" className="w-full h-auto rounded-lg" />
                <img src="/images/linqint4.png" alt="Linqintwebseite4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - KI-Transformation</h3>
                  <p className="text-gray-400"> Hier geht es um ein Beratungsunternehmen mit dem Namen Linqint, das Firmen bei der Suche nach strategischen Partnern und beim Markteintritt unterstützt. Besonders fokussiert ist das Unternehmen auf den Austausch zwischen Deutschland und der Türkei im Sektor Informationstechnologie (IT) und Telekommunikation. Durch KI-gestützte Automatisierung soll vor allem der aufwändige Prozess des Matchings von potenziellen Geschäftspartnern – beispielsweise für Markteintritte, Produktionsverlagerungen oder Kooperationen – effizienter gestaltet werden. Das Beratungshaus operiert international, mit einem besonderen Schwerpunkt auf den Märkten in Deutschland und der Türkei.</p>
                </div>
                <img src="/images/white-linqint-logo.png" alt="Logo Linqint" className="w-full h-auto rounded-lg" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Unternehmensberatung im Bereich IT & Telekommunikation.</p>
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
              <h3 className="text-xl font-bold text-white text-center mb-4">🚧 Herausforderungen</h3>
              <div className="space-y-4">
                {[
                  { title: 'Komplexe Integration von KI-Diensten', description: 'Die Einbindung verschiedener KI-Agenten und externer APIs in eine zusammenhängende Plattform war anspruchsvoll, da ein nahtloser Informationsfluss ohne Medienbrüche sichergestellt werden musste.', icon: <Cross1Icon className="w-5 h-5 text-red-500" /> },
                  { title: 'Skalierbarkeit der Datenverarbeitung', description: 'Das System musste große Mengen an Unternehmensdaten verarbeiten und entsprechend skalieren können, damit die Matching-Datenbank auch bei wachsendem Datenvolumen performant bleibt.', icon: <Cross1Icon className="w-5 h-5 text-red-500" /> },
                  { title: 'Datenschutz & Compliance', description: 'Bei der automatisierten Analyse von Unternehmensinformationen wurde strikt auf Datenschutz geachtet. Die Lösung ist von Anfang an DSGVO-konform konzipiert worden, um alle Compliance-Vorgaben zu erfüllen.', icon: <Cross1Icon className="w-5 h-5 text-red-500" /> }
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
              <h3 className="text-xl font-bold text-white text-center mb-4">🏆 Ergebnisse</h3>
              <div className="space-y-4">
                {[
                  { title: 'Effizientes Unternehmensmatching', description: 'Durch das automatisierte Matching-System konnte der manuelle Recherche- und Analyseaufwand um rund 80 % reduziert werden. Die Mitarbeiter konzentrieren sich nun auf die Pflege der Kundenbeziehungen, während die KI im Hintergrund passende Partner vorschlägt.', icon: <CheckIcon className="w-5 h-5 text-green-500" /> },
                  { title: 'Echtzeit-Insights', description: 'Marktdaten und potenzielle Geschäftsmöglichkeiten werden jetzt in Echtzeit visualisiert. Aktuelle Dashboards bieten einen ständigen Überblick über Trends und mögliche Partnerschaften, was schnellere und datenbasierte Entscheidungen ermöglicht.', icon: <CheckIcon className="w-5 h-5 text-green-500" /> },
                  { title: 'Mehr Leads & höhere Conversion', description: 'KI-gestützte Interaktionen auf der Website (Chatbot-Agent) und personalisierte Inhalte führten zu einer deutlich höheren Zahl qualifizierter Leads. Die Conversion-Rate von Interessenten zu tatsächlichen Projekten bzw. Partnerschaften stieg spürbar an.', icon: <CheckIcon className="w-5 h-5 text-green-500" /> }
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
}

export default CaseStudyKITransformation;



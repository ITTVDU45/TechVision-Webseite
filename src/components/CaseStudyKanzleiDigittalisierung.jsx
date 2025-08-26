import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { BentoGrid, BentoCard } from '@/components/magicui/bento-grid';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import CarousellTemplate from '@/components/templates/CarousellTemplate';
import { categorizedCases } from './CaseStudies';
import Vortex from '@/components/ui/vortex';

const CaseStudyKanzleiDigitalisierung = () => {
  return (
    <div className="min-h-screen relative">
      <Vortex backgroundColor="black" baseHue={220} particleCount={200} rangeY={800}>
        <div className="relative text-white">
          <Header />
          
          {/* Hero Section */}
          <section className="h-[32rem] relative overflow-hidden flex items-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
              <div className="absolute inset-0 bg-[url('/images/legaltech.jpg')] opacity-20" />
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
                  <span className="text-white">Digitale Transformation einer Anwaltskanzlei – </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                    Legal Tech
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
                <img src="/images/RechtlyLogo.png" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {[
                  { title: "Kunde", description: "Anwaltskanzlei aus Düsseldorf" },
                  { title: "Branche", description: "Legal Tech" },
                  { title: "Ziel", description: "Digitale Transformation" },
                  { title: "Standort", description: "Berlin, Deutschland" }
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
                  "Die digitale Transformation hat unsere Effizienz erheblich gesteigert."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - Anwaltskanzlei SNP
                </motion.p>
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
                      { icon: "🔧", text: "Frontend: React" },
                      { icon: "🔧", text: "Backend: Node.js" },
                      { icon: "🗄️", text: "Datenbank: MongoDB" },
                      { icon: "🤖", text: "KI & Automatisierung: Python (KI-Agenten), n8n (Workflow-Automatisierung)" },
                      { icon: "☁️", text: "Hosting & Infrastruktur: AWS, Docker, Kubernetes" },
                      { icon: "🔗", text: "APIs & Integrationen: REST, GraphQL, OpenAI API" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "🌐", text: "Webentwicklung: Mandantenportal, Anwaltsportal, KFZ-Gutachter-Portal" },
                      { icon: "🤖", text: "KI-Integration: Automatische Mandatszuweisung, Dokumentengenerierung" },
                      { icon: "🔄", text: "Automatisierung: Workflow-Optimierung & Prozessdigitalisierung" },
                      { icon: "💡", text: "Beratung: Digitalisierungskonzept für die Kanzlei" },
                      { icon: "🔧", text: "Support & Wartung: Langfristige Betreuung & Weiterentwicklung" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 6 Monate" },
                      { icon: "👥", text: "Teamgröße: 5 Entwickler, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: KI-gestützte Prozessautomatisierung" },
                      { icon: "🎯", text: "Hauptziel: Effizienzsteigerung & Digitalisierung von Kanzlei-Prozessen" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtstunden: 1200 Stunden" },
                      { icon: "💻", text: "Frontend-Entwicklung: 400 Stunden" },
                      { icon: "🖥️", text: "Backend-Entwicklung: 500 Stunden" },
                      { icon: "🤖", text: "KI-Agenten & Automatisierung: 200 Stunden" },
                      { icon: "🔍", text: "Testing & Optimierung: 100 Stunden" }
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
                <img src="/images/Rechtly.png" alt="Rechtly1" className="w-full h-auto rounded-lg" />
                <img src="/images/Rechtly1.png" alt="Rechtly2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/Rechtly2.png" alt="Rechtly3" className="w-full h-auto rounded-lg" />
                <img src="/images/Rechtly3.png" alt="Rechtly4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - Digitale Transformation einer Anwaltskanzlei mit Legal Tech </h3>
                  <p className="text-gray-400">Eine moderne Anwaltskanzlei benötigte eine digitale Lösung, um Mandatsannahme, Gutachterzuteilung und juristische Dokumentenerstellung effizienter und automatisierter zu gestalten. Mit einem maßgeschneiderten Legal-Tech-System, bestehend aus Mandantenportal, Anwaltsportal und KFZ-Gutachter-Portal, wurden die zentralen Workflows vollständig digitalisiert. KI-Agenten übernehmen die automatische Zuteilung von Mandanten an KFZ-Gutachter, die Kommunikation zwischen den Portalen und die Erstellung juristischer Dokumente wie Einsprüche und Klageschriften. Durch diese Automatisierung konnte die Bearbeitungszeit erheblich reduziert, die Fehlerquote minimiert und die Effizienz der Fallbearbeitung gesteigert werden. Die Integration eines Online-Funnels sorgt zudem für eine nahtlose Erfassung neuer Mandantenanfragen, wodurch die Kanzlei ihre Skalierbarkeit, Servicegeschwindigkeit und digitale Wettbewerbsfähigkeit nachhaltig verbessert hat.</p>
                </div>
                <img src="/images/RechtlyLogo.png" alt="Projektbild" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Anwaltskanzlei</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Deutschland</p>
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
                        title: "1️⃣ Komplexe Mandatsverwaltung & ineffiziente Workflows",
                        description: "Vor der Digitalisierung erfolgte die Mandatsannahme, Zuteilung und Kommunikation manuell, was zu Verzögerungen und hohem Verwaltungsaufwand führte. Das Fehlen einer zentralen digitalen Plattform führte dazu, dass Mandanten, Gutachter und Anwälte ineffizient miteinander kommunizierten.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "2️⃣ Fehlende Automatisierung juristischer Dokumente",
                        description: "Einsprüche, Klageschriften und andere Dokumente wurden manuell erstellt, was zeitaufwendig war und menschliche Fehler begünstigte. Die Prozessautomatisierung war dringend nötig, um die Kanzlei skalierbarer und produktiver zu machen.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "3️⃣ Technische Integration mehrerer Plattformen",
                        description: "Die nahtlose Verbindung von Mandantenportal, Anwaltsportal und KFZ-Gutachter-Portal stellte eine technische Herausforderung dar. Unterschiedliche Nutzerrollen (Mandanten, Anwälte, Gutachter) mussten mit spezifischen Berechtigungen und Zugriffsrechten verwaltet werden.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "4️⃣ Effiziente Verarbeitung von Web-Anfragen & Mandanten-Zuteilung",
                        description: "Die bestehende Webseite der Kanzlei bot keine digitale Mandatsannahme, weshalb viele Anfragen per E-Mail oder Telefon bearbeitet wurden. Eine automatische Zuteilung der Mandanten an die passenden KFZ-Gutachter war erforderlich, um den Verwaltungsaufwand zu minimieren.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "5️⃣ Datensicherheit & Compliance",
                        description: "Da es sich um sensible juristische Daten handelt, musste das System höchste Sicherheits- und Datenschutzstandards (DSGVO) erfüllen. Die Verschlüsselung der Kommunikation und der sichere Austausch von Dokumenten waren essenziell für die Implementierung.",
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
                  <h3 className="text-xl font-bold text-white text-center mb-4">🏆 Ergebnisse & Mehrwert</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "✅ 🚀 Effizienzsteigerung durch KI & Automatisierung",
                        description: "KI-Agenten automatisieren die Mandanten-Zuteilung, wodurch der administrative Aufwand der Kanzlei erheblich reduziert wurde. Die automatisierte Erstellung juristischer Dokumente spart bis zu 70% der Bearbeitungszeit und minimiert Fehlerquellen. Automatische E-Mails & Statusupdates verbessern die Kommunikation zwischen Kanzlei, Gutachtern und Mandanten.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 🔄 Nahtlose Integration aller Plattformen",
                        description: "Das neue System verbindet Mandantenportal, Anwaltsportal und KFZ-Gutachter-Portal in einer einheitlichen digitalen Infrastruktur. Alle Beteiligten haben einen zentralen Zugriff auf relevante Informationen und Dokumente, was zu einem reibungslosen Workflow führt.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 🌐 Digitaler Funnel & automatisierte Mandatsannahme",
                        description: "Über die neue Webseite können Mandanten direkt Anfragen stellen, welche in Echtzeit in das System integriert werden. Ein KI-Agent analysiert die Anfragen und leitet sie automatisch an den passenden KFZ-Gutachter weiter – ohne manuelles Eingreifen.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 🔐 Höchste Datensicherheit & DSGVO-Konformität",
                        description: "Das System erfüllt alle Datenschutzanforderungen, nutzt End-to-End-Verschlüsselung und schützt sensible Daten durch Rollen- & Zugriffskontrollen. Sichere Kommunikation zwischen den Portalen gewährleistet einen datenschutzkonformen Dokumentenaustausch.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 📈 Skalierbarkeit & langfristige Wettbewerbsfähigkeit",
                        description: "Die Kanzlei kann durch die Automatisierung und Digitalisierung mehr Mandate mit weniger Aufwand bearbeiten. Die digitalen Prozesse ermöglichen es der Kanzlei, sich als Legal Tech Vorreiter zu positionieren und neue Mandanten schneller zu gewinnen.",
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

export default CaseStudyKanzleiDigitalisierung; 
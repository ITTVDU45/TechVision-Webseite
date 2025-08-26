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

const CaseStudyCRM = () => {
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
                  <span className="text-white">Implementierung eines KI-gestützten CRM-Systems – </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                    A Plus Gerüstbau
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
                <img src="/images/AplusLogo.jpg" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {[
                  { title: "Kunde", description: "A Plus Gerüstbau GmbH" },
                  { title: "Branche", description: "Bau und Konstruktion" },
                  { title: "Ziel", description: "Effizienzsteigerung durch KI" },
                  { title: "Standort", description: "Duisburg, Deutschland" }
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
                  "Die Implementierung des KI-gestützten CRM-Systems hat unsere Effizienz erheblich gesteigert."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - A Plus Gerüstbau GmbH
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Grid Sektion */}
          <section className="py-16 relative overflow-hidden">
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
                <img src="/images/CanerDemirci.jpg" alt="Kundenbild" className="w-1/2 h-auto rounded-full mb-4" />
                <p className="text-xl font-bold text-white">Caner Demirci</p>
                <p className="text-gray-400">CEO, A Plus Gerüstbau GmbH</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
              >
                <img src="/images/Gerüstbaubild.jpg" alt="Gerüstbaubild" className="w-full h-auto rounded-lg" />
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
                      { icon: "🌐", text: "Webentwicklung: Entwicklung eines maßgeschneiderten CRM-Systems" },
                      { icon: "🤖", text: "KI-Integration: Automatische Angebotserstellung, Rechnungslegung & Zuteilung von Kundenanfragen" },
                      { icon: "🔄", text: "Automatisierung: Prozessoptimierung & digitale Workflows" },
                      { icon: "💡", text: "Beratung: Strategische Digitalisierungskonzepte" },
                      { icon: "🔧", text: "Support & Wartung: Langfristige Betreuung & Updates" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 6 Monate" },
                      { icon: "👥", text: "Teamgröße: 5 Entwickler, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: KI-gestützte Prozessautomatisierung" },
                      { icon: "🎯", text: "Hauptziel: Effizienzsteigerung & Digitalisierung von Geschäftsprozessen" }
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
                  <BentoCard key={index} name={item.title} className={item.className}>
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
                <img src="/images/Aplus1.png" alt="APLUS Webseite" className="w-full h-auto rounded-lg" />
                <img src="/images/aplus2.png" alt="Aplus CTA" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/Aplus3.png" alt="Aplus Vorteile" className="w-full h-auto rounded-lg" />
                <img src="/images/Aplus4.png" alt="Aplus Leistungen" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - KI Gestützte CRM Lösung</h3>
                  <p className="text-gray-400">Ein Unternehmen aus der Baubranche benötigte eine digitale Lösung, um manuelle Prozesse in der Kunden- und Auftragsverwaltung effizienter zu gestalten. Mit einem maßgeschneiderten CRM-System auf Basis von React und KI-Agenten wurden zentrale Abläufe automatisiert – darunter die Erstellung von Rechnungen, Angeboten auf Basis von Berichten und Fotos, sowie die automatische Zuweisung von Kundenanfragen an die richtigen Abteilungen. Zusätzlich ermöglicht ein digitaler Kalkulator auf der Webseite, dass potenzielle Kunden direkt eine erste Kosteneinschätzung in Echtzeit erhalten. Durch die intelligente Prozesssteuerung konnte das Unternehmen die Bearbeitungszeit um bis zu 70 % reduzieren, Fehler minimieren und die Kundenzufriedenheit steigern. Die Einführung dieser Lösung hat Effizienz, Skalierbarkeit und Transparenz erheblich verbessert und das Unternehmen als digitalen Vorreiter in seiner Branche positioniert.</p>
                </div>
                <img src="/images/AplusLogo.jpg" alt="Projektbild" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Bau und Konstruktion</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Duisburg, Deutschland</p>
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
                        title: "1️⃣ Komplexe und ineffiziente Arbeitsprozesse",
                        description: "Manuelle Angebotserstellung führte zu langen Bearbeitungszeiten, da Berichte und Fotos separat geprüft und verarbeitet wurden. Rechnungen wurden ohne zentrale Automatisierung erstellt, was zu Verzögerungen und Fehlern führte. Projektplanung und Ressourcenmanagement waren schwer nachzuvollziehen, da Daten in verschiedenen Systemen gespeichert wurden.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "2️⃣ Mangelnde Automatisierung & Integration",
                        description: "Die bestehenden Systeme waren nicht miteinander verknüpft, was doppelte Dateneingaben und hohe Fehlerquoten zur Folge hatte. Kundenanfragen über die Webseite mussten manuell weiterverarbeitet werden, was zu einer langsamen Reaktionszeit führte.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "3️⃣ Langsame Reaktionszeiten & Skalierbarkeitsprobleme",
                        description: "Die Bearbeitung neuer Anfragen dauerte zu lange, da Prozesse nicht standardisiert waren. Das Unternehmen war bei steigender Auftragslage kaum skalierbar, weil viele Prozesse von Hand erledigt werden mussten.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "4️⃣ Fehlende Datenverfügbarkeit & Transparenz",
                        description: "Wichtige Projektinformationen waren in Papierdokumenten oder verteilten Dateien gespeichert, was die Suche und Analyse erschwerte. Es gab keine Echtzeit-Daten, sodass Geschäftsentscheidungen oft auf veralteten Informationen basierten.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "5️⃣ Fehlende digitale Kundenerfahrung",
                        description: "Kunden hatten keine Möglichkeit, ihre Kosten eigenständig zu kalkulieren oder sofort ein Angebot zu erhalten. Web-Anfragen wurden nur langsam bearbeitet, da keine automatisierten Workflows vorhanden waren.",
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
                        title: "✅ 🚀 Effizienzsteigerung & Zeitersparnis",
                        description: "Angebote werden jetzt bis zu 70 % schneller erstellt, da KI-Agenten automatisch Berichte und Fotos auswerten und Angebotsentwürfe generieren. Rechnungen werden automatisch erstellt, wodurch Fehler minimiert und die Buchhaltung entlastet wird. Projektplanung & Ressourcenmanagement wurden optimiert, da alle relevanten Daten in einem zentralen System verfügbar sind.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 🔄 Automatisierung wichtiger Geschäftsprozesse",
                        description: "Kostenvoranschläge aus Web-Anfragen werden in Echtzeit generiert, sodass Kunden sofort eine Einschätzung ihrer Kosten erhalten. Ein digitaler Kalkulator auf der Webseite ermöglicht es Kunden, sich eigenständig über Kosten zu informieren. Automatische E-Mail-Benachrichtigungen & Follow-ups verbessern die Kommunikation mit Kunden und reduzieren Verwaltungsaufwand.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 📈 Skalierbarkeit & Wachstum",
                        description: "Das Unternehmen kann nun mehr Anfragen mit weniger Aufwand bearbeiten, wodurch eine größere Anzahl an Projekten gleichzeitig abgewickelt werden kann. Prozesse laufen weitgehend automatisiert, sodass Skalierung ohne zusätzliches Personal möglich ist.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 📊 Höhere Datenqualität & Transparenz",
                        description: "Alle Projektdaten, Rechnungen und Berichte sind zentral gespeichert und jederzeit abrufbar. Echtzeit-Analysen liefern wertvolle Einblicke in Auftragslage, Umsatzentwicklung und Ressourcenauslastung.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ 🙌 Verbesserte Kundenerfahrung & Servicequalität",
                        description: "Schnellere Angebotserstellung führt zu höherer Auftragsquote. Der digitale Kalkulator & automatisierte Angebotsprozesse verbessern die Nutzererfahrung auf der Webseite. Automatische Updates & E-Mail-Benachrichtigungen sorgen für eine bessere Kommunikation mit den Kunden.",
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

export default CaseStudyCRM; 
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Vortex from '@/components/ui/vortex';
import Header from '@/components/Header';
import { CheckIcon, Cross1Icon } from '@radix-ui/react-icons';
import CarousellTemplate from '@/components/templates/CarousellTemplate';
import { categorizedCases } from './CaseStudies';
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";

const CaseStudyMehrDazu = () => {
  return (
    <div className="min-h-screen relative">
      <Vortex backgroundColor="black" baseHue={220} particleCount={200} rangeY={800}>
        <div className="relative text-white">
          <Header />
          
          {/* Hero Section */}
          <section className="h-[32rem] relative overflow-hidden flex items-center">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
              <div className="absolute inset-0 bg-[url('/images/onlineshop.jpg')] opacity-20" />
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
                  <span className="text-white">Aufbau eines Fashion E-Commerce mit Shopify –</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                    2S4G.de 
                  </span>
                </motion.h1>
              </div>
            </div>
          </section>

          {/* Unternehmensbeschreibung */}
          <section className="min-h-[10vh] relative overflow-hidden pb-8">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent" />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>
            <div className="container mx-auto px-4 relative z-10 flex flex-col pt-20 pb-20">
              <div className="mb-8 text-center">
                <img src="/images/logo_wei_neu.png.avif" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {[
                  { title: "Plattform", description: "Shopify" },
                  { title: "Branche", description: "E-Commerce" },
                  { title: "Fokus", description: "Skalierbarkeit & Performance" },
                  { title: "Technologie", description: "Headless Commerce" }
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
          <section className="py-16 mt-8 relative h-[40vh] flex items-center overflow-hidden">
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
                  "Von Null zum professionellen Onlineshop – Unser E-Commerce ist jetzt automatisiert und effizient."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - 2S4G.de
                </motion.p>
              </motion.div>
            </div>
          </section>

          {/* Grid Sektion */}
          {/* Grid Sektion entfernt */}

          {/* Weitere Informationen */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Weitere Informationen</h2>
              <p className="text-gray-400 mb-8">Hier sind einige zusätzliche Informationen über das Projekt und die beteiligten Technologien.</p>
              <BentoGrid>
                {[
                  {
                    title: "💻 Tech Stack",
                    description: [
                      { icon: "🛒", text: "E-Commerce-Plattform: Shopify" },
                      { icon: "🎨", text: "Design & Customization: Shopify Liquid, CSS, HTML" },
                      { icon: "🔄", text: "Automatisierung: Shopify Flow, Zapier, API-Integrationen" },
                      { icon: "💳", text: "Zahlungsanbieter: Shopify Payments, PayPal, Klarna" },
                      { icon: "🚚", text: "Versand & Logistik: DHL, Shopify Shipping, EasyPost" },
                      { icon: "🔄", text: "Retourenportal: Individuelle Lösung mit automatisierten Etiketten" },
                      { icon: "📧", text: "Benachrichtigungs- & Rechnungsautomatisierung: Shopify E-Mails, Billbee" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "🖌️", text: "Branding & Logo-Design für eine starke Markenidentität" },
                      { icon: "🛍️", text: "Shopify-Entwicklung & individuelles Design für einen modernen Webshop" },
                      { icon: "📦", text: "Versand- & Retouren-Management: Automatisierte Versandetiketten & Retourenportal" },
                      { icon: "📑", text: "Rechnungsautomatisierung & Buchhaltung: Automatische Generierung & Versand von Rechnungen" },
                      { icon: "🔔", text: "Benachrichtigungssysteme: Automatische Mails für Bestellungen, Versandupdates & Retouren" },
                      { icon: "⚡", text: "Testing & Performance-Optimierung: Sicherstellen eines schnellen & stabilen Shops" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 4 Monate" },
                      { icon: "👥", text: "Teamgröße: 3 Entwickler, 1 Designer, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: Shopify-Optimierung & Prozessautomatisierung" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtstunden: 600 Stunden" },
                      { icon: "🛠️", text: "Shop-Setup & Design: 200 Stunden" },
                      { icon: "🔄", text: "Automatisierung & Prozesse: 150 Stunden" },
                      { icon: "💳", text: "Integration von Zahlung & Versand: 100 Stunden" },
                      { icon: "📦", text: "Retourenportal & Versandetiketten: 100 Stunden" },
                      { icon: "🚀", text: "Testing & Go-Live: 50 Stunden" }
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
                <img src="/images/2s4g.de1.png" alt="Rechtly1" className="w-full h-auto rounded-lg" />
                <img src="/images/2s4g.de2.png" alt="Rechtly2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/2s4g.de3.png" alt="Rechtly3" className="w-full h-auto rounded-lg" />
                <img src="/images/2s4g.de4.png" alt="Rechtly4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - Aufbau eines Fashion E-Commerce mit Shopify</h3>
                  <p className="text-gray-400">2S4G.de ist ein aufstrebender Fashion E-Commerce, der sich auf nachhaltige Mode spezialisiert hat. Das Ziel des Projekts war es, eine skalierbare und performante E-Commerce-Plattform zu schaffen, die den Anforderungen eines wachsenden internationalen Kundenstamms gerecht wird. Durch die Implementierung von Headless Commerce mit Shopify konnten wir eine flexible und anpassbare Lösung entwickeln, die eine nahtlose Integration verschiedener Verkaufskanäle ermöglicht. Die Optimierung der Ladezeiten und die Verbesserung der User Experience standen dabei im Fokus, um die Conversion Rate zu steigern und die Kundenzufriedenheit zu erhöhen.</p>
                </div>
                <img src="/images/logo_wei_neu.png.avif" alt="Projektbild" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">E-Commerce</p>
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
                  <h3 className="text-xl font-bold text-white text-center mb-4">🚧 Herausforderungen</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "1️⃣ Kein bestehender Onlineshop & fehlende digitale Infrastruktur",
                        description: "Kein Logo, keine Webseite, kein Branding – der Shop musste von Grund auf neu erstellt werden. Keine einheitliche Markenidentität oder visuelle Designsprache.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "2️⃣ Fehlende Automatisierung & manuelle Prozesse",
                        description: "Bestellungen, Rechnungen & Versandetiketten mussten manuell erstellt werden. Kein Retourenportal – Rücksendungen wurden per E-Mail abgewickelt, was zu Kundenfrust & hohem Verwaltungsaufwand führte.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "3️⃣ Fehlende Integration von Zahlungs- & Versandprozessen",
                        description: "Kein automatisiertes Zahlungssystem, wodurch Kaufabbrüche riskiert wurden. Kein klar definierter Versandprozess mit automatischer Nachverfolgung.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "4️⃣ Mangelnde Kundenkommunikation & Support",
                        description: "Kunden erhielten keine automatischen Benachrichtigungen über Bestellungen, Versand & Retouren. Keine strukturierten Prozesse für Schnelligkeit & Kundenbindung.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "5️⃣ Fehlende Skalierbarkeit & Optimierung",
                        description: "Ein wachsender Shop erfordert eine optimierte Performance & schnelle Prozesse. Die Shop-Struktur musste so gebaut werden, dass zukünftige Skalierungen & Erweiterungen einfach möglich sind.",
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
                  <h3 className="text-xl font-bold text-white text-center mb-4">🏆 Ergebnisse</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "✅ Vollständig entwickelter, markenstarker Shopify-Shop",
                        description: "Modernes Design & klare Markenidentität mit Logo, Farben & Branding. Benutzerfreundlicher & responsiver Onlineshop für Desktop & Mobile.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Automatisierung aller wichtigen Prozesse",
                        description: "Automatische Rechnungsstellung & Versandetiketten → Kein manueller Aufwand mehr. Retourenportal mit automatischer Abwicklung → Weniger Support-Anfragen & höhere Kundenzufriedenheit.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Effiziente Zahlungs- & Versandprozesse",
                        description: "Integrierte Zahlungsanbieter (PayPal, Klarna, Shopify Payments) für reibungslose Transaktionen. DHL & Shopify Shipping für automatisierte Versandverfolgung.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Bessere Kundenkommunikation & Support",
                        description: "Automatische Benachrichtigungen per E-Mail für Bestellungen, Versand & Retouren. Schnellere Abwicklung & klar strukturierter Kundenservice.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Optimierung für Wachstum & Skalierbarkeit",
                        description: "Schnelle Ladezeiten & SEO-optimierter Shop für bessere Sichtbarkeit. Modulare Struktur für zukünftige Erweiterungen (neue Produkte, Marketing-Integrationen, Multi-Channel-Vertrieb).",
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

          {/* Einblicke in das Projekt */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-8 text-white">Einblicke in das Projekt</h2>
              // ... existing code ...
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - KI Gestützte CRM Lösung</h3>
                  <p className="text-gray-400">A Plus Gerüstbau benötigte eine digitale Lösung, um ineffiziente, manuelle Prozesse in der Angebots- und Rechnungsstellung zu optimieren. Mit einem maßgeschneiderten CRM-System auf Basis von React und KI-Agenten wurden zentrale Geschäftsabläufe automatisiert – darunter die Erstellung von Rechnungen, Angeboten basierend auf Berichten und Fotos sowie Kostenvoranschläge aus Web-Anfragen. Durch die intelligente Prozesssteuerung konnte das Unternehmen die Bearbeitungszeit um bis zu 70 % reduzieren, Fehler minimieren und die Kundenzufriedenheit steigern. Der digitale Baukalkulator auf der Webseite ermöglicht es Kunden, in Echtzeit eine erste Kosteneinschätzung zu erhalten, während alle Daten nahtlos ins CRM einfließen. Die Einführung dieser Lösung hat Effizienz, Skalierbarkeit und Transparenz erheblich verbessert und A Plus Gerüstbau als digitalen Vorreiter in der Baubranche positioniert.</p>
                </div>
                <img src="/path/to/project-image.jpg" alt="Projektbild" className="w-full h-auto rounded-lg" />
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

          <Footer />
        </div>
      </Vortex>
    </div>
  );
}

export default CaseStudyMehrDazu; 
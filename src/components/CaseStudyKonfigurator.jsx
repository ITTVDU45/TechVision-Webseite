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

const CaseStudyKonfigurator = () => {
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
                  <span className="text-white">Maßgeschneiderter Produktkonfigurator -</span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                  für Planenhersteller
                  </span>
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
                <img src="/images/Planenadlerlogoweiß.png" alt="PlanenadlerLogo" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Kunde", description: "Adler Planen" },
                  { title: "Branche", description: "Produktion & E-Commerce" },
                  { title: "Ziel", description: "Entwicklung eines individuellen Produktkonfigurators innerhalb einer WordPress/WooCommerce-Umgebung" },
                  { title: "Standort", description: "Duisburg, Deutschland" }
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
                  "Mit unserem neuen individuellen Produktkonfigurator läuft der gesamte Bestellprozess digital und fehlerfrei.“
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4 }}
                  className="mt-4 text-lg text-gray-400"
                >
                  – Adler Planen
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
                      { icon: "🔧", text: "CMS & E-Commerce: WordPress & WooCommerce" },
                      { icon: "💻", text: "Programmiersprachen: PHP, JavaScript, HTML, CSS" },
                      { icon: "🔌", text: "Plugin-Entwicklung: Individuelles WooCommerce-Plugin für Produktkonfiguration" },
                      { icon: "🗄️", text: "Datenbank: MySQL" },
                      { icon: "☁️", text: "Hosting: Managed WordPress Hosting" },
                      { icon: "🔒", text: "DSGVO & Sicherheit: Cookie Consent Tool, SSL-Zertifikat, DSGVO-Plugins" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "✅", text: "Webshop auf Subdomain mit WooCommerce: Einrichtung & Konfiguration des neuen Onlineshops." },
                      { icon: "✅", text: "Integration mit bestehender Webseite: Verlinkung des Shops per iFrame in die Hauptseite." },
                      { icon: "✅", text: "Entwicklung eines individuellen Produktkonfigurators: Maßgeschneidertes WooCommerce-Plugin zur Konfiguration von Planenprodukten." },
                      { icon: "✅", text: "DSGVO-Konformität & rechtliche Sicherheit: Umsetzung von Datenschutzrichtlinien, Cookie-Banner & rechtssicheren AGBs." },
                      { icon: "✅", text: "Performance- & UX-Optimierung: Verbesserung der Ladegeschwindigkeit & benutzerfreundliches Design." },
                      { icon: "✅", text: "Erstellung & Steuerung von Werbekampagnen: Aufbau von Google Ads & Social Media Ads zur Generierung von Kundenanfragen." }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "📌", text: "Projektdauer: 4 Monate" },
                      { icon: "👨‍💻", text: "Teamgröße: 3 Entwickler, 1 UX-Designer, 1 Marketingexperte" },
                      { icon: "🎯", text: "Technologie-Fokus: WooCommerce-Plugin-Entwicklung & Webshop-Optimierung" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏳", text: "Gesamtaufwand: 600 Stunden" },
                      { icon: "🛍️", text: "WooCommerce-Shop Einrichtung: 150 Stunden" },
                      { icon: "🔌", text: "Entwicklung des individuellen Konfigurator-Plugins: 250 Stunden" },
                      { icon: "🔗", text: "Integration in bestehende Webseite & DSGVO-Anpassungen: 100 Stunden" },
                      { icon: "📢", text: "Erstellung & Optimierung der Werbekampagnen: 100 Stunden" }
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
                <img src="/images/Planen1.png" alt="Planenbild1" className="w-full h-auto rounded-lg" />
                <img src="/images/planen2.png" alt="Planenbild2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/planen3.png" alt="Planenbild3" className="w-full h-auto rounded-lg" />
                <img src="/images/planen 4.png" alt="Planenbild4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>


          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - Maßgeschneiderter Produktkonfigurator</h3>
                  <p className="text-gray-400">Der Planenhersteller wollte seinen Bestellprozess digitalisieren, da bisherige manuelle Anfragen per E-Mail oder Telefon ineffizient waren. Dafür wurde ein WooCommerce-Webshop mit einem maßgeschneiderten Produktkonfigurator entwickelt, der individuelle Maße, Materialien und Zusatzoptionen ermöglicht. Die Echtzeit-Preisberechnung sorgt für Transparenz und reduziert Rückfragen. Der Webshop wurde auf einer Subdomain gehostet und über einen iFrame in die Hauptseite integriert, sodass Kunden ohne Unterbrechung bestellen können. Ein individuelles WooCommerce-Plugin steuert die Konfigurationslogik und automatisiert die Bestellübermittlung an die Produktion. Durch die Integration mit Zahlungsanbietern wurde eine schnelle und flexible Kaufabwicklung ermöglicht. Die Bearbeitungszeit wurde erheblich reduziert, und manuelle Arbeitsschritte entfallen weitgehend. Google Ads und Social Media Kampagnen sorgen für mehr Reichweite und neue Kunden. Die automatisierte Verarbeitung der Bestellungen erhöht die Effizienz und minimiert Fehler. Das Unternehmen ist nun digital optimiert und bereit für weiteres Wachstum.</p>
                </div>
                <img src="/images/Planenadlerlogoweiß.png" alt="Konfigurator Logo" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Produktion & E-Commerce</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Duisburg, Deutschland</p>
                </div>
              </div>
            </div>
          </section>

          {/* Herausforderungen und Lösungen */}
          <section className="py-16 relative overflow-hidden">
            <div className="absolute inset-0">
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-950/10 to-transparent" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">🚧 Herausforderungen</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Komplexe Produktlogik für die Planenkonfiguration",
                        description: "Der Kunde benötigte eine flexible Lösung für variable Größen, Materialien & Extras. Das Standard-WooCommerce-System reichte nicht aus, daher wurde ein individuelles Plugin entwickelt.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Integration des neuen Shops in die bestehende Webseite",
                        description: "Der Shop sollte nicht als separate Plattform auftreten, sondern mit der Hauptwebseite verbunden bleiben. Lösung: Einbindung per iFrame, um das Nutzererlebnis konsistent zu halten.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Optimierung für Performance & SEO",
                        description: "WordPress + WooCommerce kann durch viele Plugins langsam werden. Optimierte Caching-, Ladezeit- & Komprimierungstechniken wurden implementiert.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "DSGVO- & Rechtssicherheit",
                        description: "Sicherstellung, dass alle Datenschutzrichtlinien & Cookie-Richtlinien rechtskonform umgesetzt wurden.",
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
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">🏆 Ergebnisse</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Individueller Produktkonfigurator für eine nahtlose Bestellung",
                        description: "Kunden können ihre Plane nach Maß konfigurieren, Zusatzoptionen wählen & Preise sofort berechnen. Der gesamte Prozess ist benutzerfreundlich & fehlerfrei.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Schnellere Bestellprozesse & weniger Fehler",
                        description: "Die manuelle Angebotsbearbeitung wurde um 80 % reduziert, da automatische Preisberechnungen erfolgen. Kunden sehen in Echtzeit, wie sich ihre Konfiguration auf den Preis auswirkt.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Bessere Kundenbindung & höhere Conversion-Rate",
                        description: "SEO-optimierter Shop mit Performance-Boost für bessere Rankings. Durch Google Ads & Social Media Kampagnen konnten 40 % mehr Anfragen generiert werden.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Einfache Wartung & Erweiterbarkeit",
                        description: "Das individuelle WooCommerce-Plugin kann jederzeit erweitert & angepasst werden.",
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
              <CarousellTemplate 
                caseStudies={[
                  ...(categorizedCases.software || []), 
                  ...(categorizedCases['tools-ki-agenten'] || []), 
                  ...(categorizedCases.onlineshop || [])
                ]} 
              />
            </div>
          </section>

          <Footer />
        </div>
      </Vortex>
    </div>
  );
}

export default CaseStudyKonfigurator; 
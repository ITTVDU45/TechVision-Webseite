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

const MicrosoftDynamicsIntegration = () => {
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
                  <span className="text-white"> Mitarbeiter-App – </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                    CraftGO
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
                <img src="/images/TKGEURSTELOGO.png" alt="UnternehmensbildTKGERUST" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Kunde", description: "TK Gerüste GmbH" },
                  { title: "Branche", description: "Bau und Konstruktion" },
                  { title: "Ziel", description: "Entwicklung der CRAFTGO Mitarbeiter-App, für die Baustellenverwaltung und interne Kommunikation" },
                  { title: "Standort", description: "Leichlingen, Deutschland" }
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
                  "Mit der CRAFTGO App haben unsere Mitarbeiter endlich alle relevanten Infos direkt auf dem Smartphone. Die automatische Zuweisung von Aufgaben, Stundenerfassung und Dokumentenmanagement spart uns täglich enorm viel Zeit."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - TK Gerüste GmbH
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
                      { icon: "🔧", text: "App-Entwicklung: React Native" },
                      { icon: "🔧", text: "Backend & Infrastruktur: Node.js, Firebase, Docker" },
                      { icon: "🗄️", text: "Datenbank: MongoDB" },
                      { icon: "🔄", text: "Workflow-Automatisierung: n8n" },
                      { icon: "🔗", text: "CRM-Integration: HubSpot API" },
                      { icon: "🤖", text: "KI-Funktionen: OpenAI" },
                      { icon: "🔒", text: "Sicherheit: Zwei-Faktor-Authentifizierung (2FA)" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "📱", text: "Mitarbeiter-App für die Baubranche: CRAFTGO" },
                      { icon: "🤖", text: "Automatische Zuweisung von Aufgaben" },
                      { icon: "🏗️", text: "Digitale Baustellenverwaltung" },
                      { icon: "🔗", text: "Integration mit HubSpot CRM" },
                      { icon: "⏱️", text: "Zeiterfassung & Stundenzettel" },
                      { icon: "📂", text: "Dokumentenverwaltung" },
                      { icon: "📝", text: "Automatische Berichterstellung" },
                      { icon: "🧠", text: "KI-gestützte Knowledgebase" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Projektdauer: 6 Monate" },
                      { icon: "👥", text: "Teamgröße: 4 Entwickler, 1 UX-Designer, 1 Projektmanager" },
                      { icon: "🎯", text: "Technologie-Fokus: KI-gestützte Automatisierung, CRM-Integration" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtaufwand: 800 Stunden" },
                      { icon: "📲", text: "App-Entwicklung (React Native): 300 Stunden" },
                      { icon: "🔗", text: "API-Integration mit HubSpot CRM: 200 Stunden" },
                      { icon: "🧠", text: "KI-Funktionen: 150 Stunden" },
                      { icon: "📝", text: "Automatische Berichterstellung: 100 Stunden" },
                      { icon: "🔍", text: "Testing & Optimierung: 50 Stunden" }
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
                <img src="/images/CraftGo1.png" alt="Großes Foto 1" className="w-full h-auto rounded-lg" />
                <img src="/images/CraftGo2.png" alt="Großes Foto 2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/CraftGo3.png" alt="Großes Foto 3" className="w-full h-auto rounded-lg" />
                <img src="/images/CraftGo4.png" alt="Großes Foto 4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - Entwicklung der CRAFTGO Mitarbeiter-App für TK Gerüste</h3>
                  <p className="text-gray-400">TK Gerüste ist ein Bauunternehmen, das für den professionellen Aufbau und die Verwaltung von Gerüstsystemen in verschiedenen Bauprojekten verantwortlich ist. Die bisherige Mitarbeiterverwaltung erfolgte weitgehend manuell, was zu ineffizienten Abläufen, Zeitverlusten und fehlender Transparenz in der Organisation führte. Ziel war es, eine Mitarbeiter-App zu entwickeln, die zentrale Funktionen zur Baustellenorganisation, Arbeitszeiterfassung und automatischen Aufgabenverteilung enthält und in das bestehende HubSpot CRM-System integriert wird.</p>
                </div>
                <img src="/images/TKGEURSTELOGO.png" alt="Projektbildtkgerust" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Bau und Konstruktion</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Leichlingen, Deutschland</p>
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
                        title: "1️⃣ Manuelle Baustellenorganisation & fehlende digitale Prozesse",
                        description: "Vor der Einführung von CRAFTGO erfolgte die Mitarbeiterverwaltung per Telefon oder WhatsApp, was oft zu Missverständnissen & Verzögerungen führte. Stundenzettel & Lohnabrechnungen wurden manuell verwaltet, was zu Fehlern führte.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "2️⃣ Effiziente Integration mit dem bestehenden HubSpot CRM",
                        description: "Eine bidirektionale API-Anbindung war notwendig, um Mitarbeiterdaten, Baustellen & Dokumente in Echtzeit mit HubSpot zu synchronisieren.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "3️⃣ Automatische Zuweisung & digitale Berichte",
                        description: "Die KI-gestützte Aufgabenverteilung erforderte eine intelligente Logik, die basierend auf Mitarbeiterverfügbarkeit, Erfahrung & Standort Zuweisungen trifft. Automatische Dokumentation & Bildarchivierung wurde gefordert, um Berichte für Bauherren & Kunden zu erleichtern.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "4️⃣ Sicherheitsanforderungen & Datenschutz",
                        description: "Einführung einer 2-Faktor-Authentifizierung (2FA) für mehr Sicherheit. DSGVO-konforme Speicherung & Verwaltung sensibler Mitarbeiterdaten & Lohnabrechnungen.",
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
                        title: "✅ Vollständig digitalisierte Baustellenverwaltung",
                        description: "Mitarbeiter können jetzt alle wichtigen Informationen direkt über die CRAFTGO App abrufen.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Bis zu 60 % Zeitersparnis durch Automatisierung",
                        description: "KI-gestützte Aufgabenverteilung reduziert die manuelle Planung um über 50 %. Digitale Zeiterfassung & automatische Lohnabrechnung sparen dem Backoffice viele Stunden wöchentlich.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Optimierte Kommunikation & höhere Mitarbeiterzufriedenheit",
                        description: "Direkte Synchronisation mit HubSpot verbessert die Kommunikation zwischen Management & Baustelle. Weniger Missverständnisse & klar definierte Prozesse steigern die Effizienz.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Automatische Berichterstellung & Bildarchivierung",
                        description: "Alle Baustellenfotos werden automatisch kategorisiert & in PDF-Berichten organisiert. Projektleiter & Kunden haben sofortigen Zugriff auf Dokumentationen.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "✅ Höhere Sicherheit durch 2FA & DSGVO-Compliance",
                        description: "Die 2-Faktor-Authentifizierung (2FA) schützt sensible Mitarbeiter- & Projektdaten.",
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
        </div>
      </Vortex>
      
      {/* Weitere Projekte */}
      <section className="py-40 relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Slider */}
          <CarousellTemplate caseStudies={[...(categorizedCases.software || []), ...(categorizedCases['tools-ki-agenten'] || []), ...(categorizedCases.onlineshop || [])]} />
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default MicrosoftDynamicsIntegration;
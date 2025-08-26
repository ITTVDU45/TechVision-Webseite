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

const CaseStudyPasswordManager = () => {
  const categorizedCasesSoftware = categorizedCases.software || [];
  const categorizedCasesKiTransformation = categorizedCases['tools-ki-agenten'] || [];
  const categorizedCasesOnlineshop = categorizedCases.onlineshop || [];

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
                  <span className="text-white">Implementierung eines sicheren Passwortmanagers – </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                    Sicherheit und Komfort
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
                <img src="/images/Passwordmanageraufmacher.png" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
                {[
                  { title: "Kunde", description: "Kunde aus dem Einzelhandel" },
                  { title: "Branche", description: "Einzelhandel" },
                  { title: "Ziel", description: "Sichere Passwortverwaltung" },
                  { title: "Standort", description: "Oberhausen, Deutschland" }
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
                  "Dank der Bitwarden-Lösung auf unserer eigenen Subdomain haben wir nun endlich eine sichere und DSGVO-konforme Passwortverwaltung."
                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - Kunde aus dem Einzelhandel
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
                      { icon: "🔐", text: "Sicherheit: Verschlüsselung, Zwei-Faktor-Authentifizierung" },
                      { icon: "☁️", text: "Hosting & Infrastruktur: AWS, Docker, Kubernetes" },
                      { icon: "🔗", text: "APIs & Integrationen: REST, GraphQL" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "🔐", text: "Sichere Passwortverwaltung" },
                      { icon: "🔄", text: "Automatisierte Passwortaktualisierung" },
                      { icon: "🔍", text: "Sicherheitsüberprüfungen & Audits" },
                      { icon: "💡", text: "Beratung: Sicherheitskonzepte" },
                      { icon: "🔧", text: "Support & Wartung: Langfristige Betreuung & Updates" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 4 Monate" },
                      { icon: "👥", text: "Teamgröße: 4 Entwickler, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: IT-Sicherheit & Benutzerfreundlichkeit" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtstunden: 800 Stunden" },
                      { icon: "💻", text: "Frontend-Entwicklung: 300 Stunden" },
                      { icon: "🖥️", text: "Backend-Entwicklung: 300 Stunden" },
                      { icon: "🔍", text: "Testing & Optimierung: 200 Stunden" }
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
                <img src="/images/password-generator.webp.png" alt="Passwortmanager Screenshot 1" className="w-full h-auto rounded-lg" />
                <img src="/public/images/bitwarden-business-og.png" alt="Passwortmanager Screenshot 2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/multiple-devices-background.webp.png" alt="Passwortmanager Screenshot 3" className="w-full h-auto rounded-lg" />
                <img src="/images/vault-offline.webp.png" alt="Passwortmanager Screenshot 4" className="w-full h-auto rounded-lg" />
              </div>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl font-bold mb-4 text-white">Projektdetails</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h3 className="text-xl font-bold text-white mb-4">Projektbeschreibung - Sicherer Passwortmanager</h3>
                  <p className="text-gray-400">Ein mittelständisches Einzelhandelsunternehmen stand vor einer großen Sicherheitslücke: Passwörter wurden bisher ungeschützt in Notizbüchern oder Excel-Listen verwaltet, was nicht nur ein hohes Sicherheitsrisiko, sondern auch einen DSGVO-Verstoß darstellte. Zudem kam es häufig zu verlorenen oder vergessenen Passwörtern, was den IT-Support belastete und den Zugriff auf wichtige Systeme verzögerte.

Um dieses Problem zu lösen, wurde eine unternehmenseigene Passwortmanager-Lösung basierend auf Bitwarden eingerichtet. Durch unser Software-Hosting auf einer eigenen Subdomain konnte das Unternehmen eine vollständig DSGVO-konforme, sichere und leicht zugängliche Passwortverwaltung implementieren. Die Lösung läuft in einer Docker-Umgebung, die eine skalierbare, sichere und wartungsarme Infrastruktur ermöglicht.

Jetzt können alle Mitarbeiter über eine zentrale, verschlüsselte Plattform auf ihre Passwörter zugreifen, individuelle Freigaben für Teams verwalten und neue Anmeldedaten sicher generieren. Durch die Implementierung von Zwei-Faktor-Authentifizierung (2FA) wurde die IT-Sicherheit erheblich verbessert.</p>
                </div>
                <img src="/images/Bitwardenprojektdetails.png" alt="ProjektbildPassword" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Einzelhandel</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Oberhausen, Deutschland</p>
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
                        title: "Unsichere Passwortverwaltung & hohe DSGVO-Risiken",
                        description: "Vorherige Verwaltung in Excel-Tabellen oder auf Notizzetteln war unübersichtlich und unsicher. Keine Möglichkeit zur gemeinsamen, aber geschützten Nutzung von Passwörtern in Teams.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Kein zentrales System für Berechtigungen & Passwortfreigaben",
                        description: "Jeder Mitarbeiter hatte eigene Listen mit sensiblen Zugangsdaten, was zu Doppelungen & Chaos führte. Keine kontrollierte Vergabe von Benutzerrechten für verschiedene Abteilungen.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Fehlender Zugriffsschutz & manuelle Passwortvergabe",
                        description: "Viele Passwörter wurden zu einfach oder mehrfach verwendet. Mitarbeiter mussten oft den IT-Support kontaktieren, um vergessene Passwörter zurückzusetzen.",
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
                        title: "DSGVO-konforme Passwortverwaltung auf eigener Subdomain",
                        description: "Hosting von Bitwarden in einer Docker-Umgebung, um Sicherheit & Skalierbarkeit zu gewährleisten. Einhaltung aller Datenschutzvorgaben (z. B. DSGVO & ISO 27001) durch verschlüsselte Speicherung.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Effizientere Passwortorganisation & Zugriffskontrolle",
                        description: "Alle Mitarbeiter nutzen nun eine zentrale, sichere Plattform für ihre Passwörter. Passwort-Freigaben sind auf Team-Ebene regelbar, wodurch Abteilungen kontrollierten Zugriff erhalten.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Reduzierung von IT-Support-Anfragen um 70 %",
                        description: "Vergessene Passwörter können einfach & sicher zurückgesetzt werden. Kein Chaos mehr durch unsichere Passworthinterlegung in E-Mails oder Notizen.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Höhere Sicherheit durch Zwei-Faktor-Authentifizierung (2FA)",
                        description: "Jeder Login wird mit zusätzlicher Sicherheitsprüfung geschützt, wodurch unbefugter Zugriff verhindert wird.",
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
              <CarousellTemplate caseStudies={[...categorizedCasesSoftware, ...categorizedCasesKiTransformation, ...categorizedCasesOnlineshop]} />
            </div>
          </section>

          <Footer />
        </div>
      </Vortex>
    </div>
  );
};

export default CaseStudyPasswordManager; 
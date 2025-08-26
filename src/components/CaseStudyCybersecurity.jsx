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

const CaseStudyCybersecurity = () => {
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
                  <span className="text-white">IT-Sicherheitsberatung für Klein- und Kleinstunternehmen nach DIN SPEC 27076 - </span>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                   Vius GmbH & Co. KG
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
                <img src="/images/ViusLogo.png" alt="Unternehmensbild" className="mx-auto w-1/2 h-auto rounded-lg" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  { title: "Kunde", description: "Vius GmbH & Co. KG" },
                  { title: "Branche", description: "Transport und Logistik" },
                  { title: "Ziel", description: "Cybersecurity Beratung" },
                  { title: "Standort", description: "Oberhausen, Deutschland" }
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
                                    „Dank der Cybersicherheitsberatung haben wir unsere IT-Sicherheitsmaßnahmen auf ein völlig neues Niveau gehoben. Die praxisnahen Empfehlungen und die struktgeholfen, Schwachstellen gezielt zu identifizieren und zu beheben. – eine Investition, die sich langfristig auszahlt.“

                </motion.blockquote>
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}  
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="mt-4 text-gray-400"
                >
                  - Vius GmbH & Co. KG
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
                <img src="/images/Viubild.png" alt="DavidViuBild" className="w-1/2 h-auto rounded-full mb-4" />
                <p className="text-xl font-bold text-white">David Viu</p>
                <p className="text-gray-400">CEO, Vius GmbH & Co. KG</p>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-neutral-900/50 backdrop-blur-sm p-6 rounded-lg shadow-lg"
              >
                <img src="/images/Viusgmbhlogistikbild.jpg" alt="Bildbeschreibung" className="w-full h-auto rounded-lg" />
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
                    title: "💻 Tech Stack",
                    description: [
                      { icon: "🛡️", text: "Sicherheitslösungen: Next-Generation Firewall, Endpoint Protection, SIEM-System" },
                      { icon: "💾", text: "Backup & Recovery: Automatisierte Cloud-Backups, lokale redundante Sicherung" },
                      { icon: "🔒", text: "Netzwerksicherheit: VPN, Zero-Trust-Architektur, Netzwerksegmentierung" },
                      { icon: "🔑", text: "Zugriffsmanagement: Multi-Faktor-Authentifizierung (MFA), Role-Based Access Control (RBAC)" },
                      { icon: "🕵️", text: "Monitoring & Schwachstellen-Scanning: Intrusion Detection System (IDS), regelmäßige Sicherheits-Audits" }
                    ]
                  },
                  {
                    title: "💼 Services",
                    description: [
                      { icon: "🔍", text: "IT-Sicherheitsaudit & Schwachstellenanalyse (gemäß DIN SPEC 27076)" },
                      { icon: "🛠️", text: "Erstellung und Implementierung von Sicherheitsrichtlinien" },
                      { icon: "📚", text: "Schulungen & Awareness-Programme für Mitarbeiter" },
                      { icon: "💾", text: "Einrichtung von Backup- und Notfallmanagement-Systemen" },
                      { icon: "🔧", text: "Netzwerk- & Zugriffssicherheitsoptimierung" },
                      { icon: "✅", text: "Überprüfung und Verbesserung der Compliance & DSGVO-Konformität" }
                    ]
                  },
                  {
                    title: "📊 Projekt Fakten",
                    description: [
                      { icon: "⏱️", text: "Dauer: 3 Monate" },
                      { icon: "👥", text: "Teamgröße: 3 IT-Sicherheitsexperten, 1 Projektmanager" },
                      { icon: "🔍", text: "Technologie-Fokus: IT-Sicherheit, Datenschutz & Compliance" }
                    ]
                  },
                  {
                    title: "⏳ Zeitaufwand",
                    description: [
                      { icon: "⏲️", text: "Gesamtstunden: 480 Stunden" },
                      { icon: "🔍", text: "Sicherheitsanalyse & Audit: 120 Stunden" },
                      { icon: "🛠️", text: "Implementierung technischer Maßnahmen: 200 Stunden" },
                      { icon: "📚", text: "Schulungen & Sensibilisierung: 60 Stunden" },
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
                <img src="/images/DinSpec27076- 1.png" alt="Großes Foto 1" className="w-full h-auto rounded-lg" />
                <img src="/images/DinSpec27076- 2.png" alt="Großes Foto 2" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                <img src="/images/DinSpec27076- 3.png" alt="Großes Foto 3" className="w-full h-auto rounded-lg" />
                <img src="/images/DinSpec27076- 4.png" alt="Großes Foto 4" className="w-full h-auto rounded-lg" />
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
                  <p className="text-gray-400">Die Vius GmbH & Co. KG benötigte eine strukturierte und praxisnahe Lösung, um ihre IT-Sicherheit zu verbessern und den Schutz sensibler Unternehmensdaten zu gewährleisten. Durch die IT-Sicherheitsberatung nach DIN SPEC 27076 wurde das Unternehmen gezielt auf Sicherheitslücken geprüft, und individuelle Maßnahmen zur Optimierung der Netzwerksicherheit, Zugriffskontrollen und Datenverarbeitung wurden umgesetzt. Schwachstellenanalysen, technische Sicherheitsmaßnahmen und Mitarbeiterschulungen führten dazu, dass Bedrohungen frühzeitig erkannt und Risiken minimiert werden konnten. Zusätzlich wurden automatisierte Backup- und Notfallstrategien implementiert, um den Geschäftsbetrieb auch im Ernstfall abzusichern. Die Umsetzung dieser Sicherheitsmaßnahmen hat nicht nur die Resilienz der IT-Infrastruktur erhöht, sondern auch die Compliance mit Datenschutz- und Sicherheitsstandards verbessert, sodass die Vius GmbH & Co. KG langfristig vor Cyberangriffen geschützt ist.</p>
                </div>
                <img src="/images/ViusLogo.png" alt="Projektbild" className="w-full h-auto rounded-lg" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Branche</h3>
                  <p className="text-gray-400">Transport & Logistik</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg shadow-lg text-center">
                  <h3 className="text-xl font-bold text-white">Standort</h3>
                  <p className="text-gray-400">Oberhausen, Deutschland</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Vortex>

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
                        title: "Fehlende IT-Sicherheitsrichtlinien und unklare Verantwortlichkeiten",
                        description: "Es existierten keine formalisierten Sicherheitsrichtlinien. Zuständigkeiten für IT-Sicherheit waren nicht klar definiert, was zu uneinheitlichen Schutzmaßnahmen führte.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Geringe Sensibilisierung der Mitarbeiter für Cybersecurity",
                        description: "Die Belegschaft war nur unzureichend für digitale Bedrohungen sensibilisiert. Phishing-Mails, unsichere Passwörter oder unvorsichtiger Umgang mit Daten stellten dadurch ein erhöhtes Risiko dar.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Fehlende oder veraltete technische Sicherheitsmaßnahmen",
                        description: "Wichtige Schutzmechanismen waren nicht vorhanden oder veraltet – z. B. fehlende Next-Generation-Firewall, unzureichende Zugriffskontrollen und mangelnder Endpunktschutz. Dies führte zu Sicherheitslücken in der IT-Infrastruktur.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Mangelhafte Datensicherung und unzureichendes Notfallmanagement",
                        description: "Es fehlte ein verlässliches Backup-Konzept und getestete Notfallpläne. Dadurch bestand die Gefahr von Datenverlust und langer Betriebsunterbrechung im Ernstfall.",
                        icon: <Cross1Icon className="w-5 h-5 text-red-500" />
                      },
                      {
                        title: "Fehlende Transparenz über IT-Risiken und Schwachstellen",
                        description: "Vitus GmbH & Co. KG hatte keinen vollständigen Überblick über vorhandene IT-Risiken. Schwachstellen wurden nicht systematisch erfasst oder bewertet, wodurch Prioritäten für Sicherheitsmaßnahmen unklar blieben.",
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
                  <h3 className="text-xl font-bold text-white text-center mb-4">Ergebnisse</h3>
                  <div className="space-y-4">
                    {[
                      {
                        title: "Einführung klarer Sicherheitsrichtlinien und Verantwortlichkeiten",
                        description: "Das Unternehmen hat verbindliche IT-Sicherheitsrichtlinien eingeführt. Zudem wurden Rollen und Verantwortlichkeiten festgelegt (z. B. ein IT-Sicherheitsbeauftragter), wodurch Zuständigkeiten klar geregelt sind.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Schulungen zur Sensibilisierung der Mitarbeiter",
                        description: "Alle Mitarbeiter wurden in maßgeschneiderten Trainings für Cybersecurity und Datenschutz sensibilisiert. Regelmäßige Schulungen und Phishing-Simulationen erhöhen das Sicherheitsbewusstsein nachhaltig.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Implementierung und Modernisierung technischer Sicherheitsmaßnahmen",
                        description: "Vitus GmbH & Co. KG hat seine IT-Infrastruktur auf den neuesten Stand gebracht. Moderne Firewalls und Intrusion-Detection-Systeme wurden installiert, Zugriffsrechte nach dem Prinzip \"Least Privilege\" neu organisiert und Endgeräte mit aktueller Antivirus- und Endpoint-Protection-Software ausgestattet.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Etablierung eines zuverlässigen Backup- und Notfallmanagementsystems",
                        description: "Es wurde ein automatisiertes Backup-System mit externen Sicherungen eingeführt, das regelmäßige Datenkopien gewährleistet. Ergänzend wurden Notfall- und Wiederanlaufpläne erstellt und getestet, um im Falle eines IT-Ausfalls rasch handlungsfähig zu sein.",
                        icon: <CheckIcon className="w-5 h-5 text-green-500" />
                      },
                      {
                        title: "Erhöhte Transparenz über IT-Risiken und kontinuierliche Verbesserung",
                        description: "Das Management verfügt nun über einen klaren Überblick der IT-Risikolandschaft. Durch regelmäßige Sicherheits-Audits und Schwachstellen-Analysen werden Risiken fortlaufend überwacht. Die daraus abgeleiteten Maßnahmen werden priorisiert und umgesetzt, was zu einer kontinuierlichen Optimierung der IT-Sicherheitsmaßnahmen führt.",
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
  );
}

export default CaseStudyCybersecurity;
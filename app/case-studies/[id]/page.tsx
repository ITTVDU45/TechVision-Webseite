"use client";
import React from "react";
import { useParams } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { categorizedCases } from "../../components/CaseStudies";

export default function CaseStudyDetailPage() {
  const params = useParams();
  const id = params.id as string;

  // Alle Case Studies aus allen Kategorien sammeln
  const allCases = Object.values(categorizedCases).flat();
  const caseStudy = allCases.find(cs => cs.id === id);

  if (!caseStudy) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
        <Header />
        <div className="container mx-auto px-4 py-32 text-center">
          <div className="max-w-2xl mx-auto">
            <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 mb-8">
              <h1 className="text-4xl font-bold mb-4 text-red-300">Case Study nicht gefunden</h1>
              <p className="text-gray-400 text-lg">Die angeforderte Case Study konnte nicht gefunden werden.</p>
            </div>
            <a 
              href="/case-studies" 
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-medium"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Zurück zu allen Case Studies
            </a>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={caseStudy.image}
            alt={caseStudy.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </div>
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-purple-500/10 rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute bottom-40 left-20 w-20 h-20 bg-green-500/10 rounded-full blur-xl animate-pulse delay-2000"></div>
        </div>

        <div className="relative z-10 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl">
              <div className="mb-8">
                <a 
                  href="/case-studies" 
                  className="inline-flex items-center text-blue-300 hover:text-blue-200 mb-6 transition-all duration-300 group"
                >
                  <div className="bg-black/30 backdrop-blur-sm border border-white/20 rounded-full p-2 mr-3 group-hover:bg-blue-600/30 transition-all duration-300">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </div>
                  <span className="text-lg font-medium">Zurück zu allen Case Studies</span>
                </a>
              </div>
              
              <div className="bg-black/20 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                  {caseStudy.title}
                </h1>
                <p className="text-3xl text-blue-200 mb-8 font-light">
                  {caseStudy.subtitle}
                </p>
                <p className="text-xl text-gray-200 max-w-5xl leading-relaxed">
                  {caseStudy.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {caseStudy.stats && (
        <section className="py-32 -mt-20 relative z-20">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-20">
                <h2 className="text-5xl font-bold text-white mb-6">
                  Projekt-Ergebnisse
                </h2>
                <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                  Konkrete Zahlen und Erfolge, die für sich sprechen
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {caseStudy.stats.map((stat, index) => (
                  <div key={index} className="group">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-white/10 rounded-3xl p-8 transform group-hover:scale-105 group-hover:border-blue-500/30 transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/20">
                      <div className="text-center">
                        <div className="text-7xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text mb-4">
                          {stat.value}
                        </div>
                        <div className="text-xl text-gray-300 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Content Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-5xl font-bold text-white mb-6">
                Über das Projekt
              </h2>
              <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                Detaillierte Einblicke in unsere Lösungsansätze und Technologien
              </p>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 backdrop-blur-sm border border-white/10 p-10 rounded-3xl mb-16">
                <p className="text-2xl text-gray-200 leading-relaxed text-center">
                  {caseStudy.description}
                </p>
              </div>
              
              {/* Zusätzliche Details basierend auf der Case Study ID */}
              {id === "crm-mit-ki-agenten" && (
                <div className="bg-gradient-to-br from-blue-900/20 to-indigo-900/20 backdrop-blur-sm border border-blue-500/30 p-10 rounded-3xl shadow-2xl shadow-blue-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-blue-200 text-center">KI-Agenten Integration</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Die Integration von KI-Agenten in bestehende CRM-Systeme ermöglicht eine automatisierte 
                    Kundenbetreuung rund um die Uhr. Unsere Lösung bietet:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-blue-900/20 rounded-2xl p-4">
                        <span className="text-blue-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Intelligente Lead-Qualifizierung</span>
                      </div>
                      <div className="flex items-start bg-blue-900/20 rounded-2xl p-4">
                        <span className="text-blue-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Automatisierte E-Mail-Kampagnen</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-blue-900/20 rounded-2xl p-4">
                        <span className="text-blue-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Chatbot-Integration für 24/7 Support</span>
                      </div>
                      <div className="flex items-start bg-blue-900/20 rounded-2xl p-4">
                        <span className="text-blue-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Predictive Analytics für bessere Conversion</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {id === "microsoft-dynamics-integration" && (
                <div className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 backdrop-blur-sm border border-green-500/30 p-10 rounded-3xl shadow-2xl shadow-green-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-green-200 text-center">CRAFTGO Mitarbeiter-App</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Die Entwicklung einer maßgeschneiderten Mitarbeiter-App für das Bauunternehmen 
                    CRAFTGO hat zu erheblichen Verbesserungen geführt:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-green-900/20 rounded-2xl p-4">
                        <span className="text-green-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Digitale Zeiterfassung und Projektverwaltung</span>
                      </div>
                      <div className="flex items-start bg-green-900/20 rounded-2xl p-4">
                        <span className="text-green-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Mobile Arbeitsabläufe für Baustellen</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-green-900/20 rounded-2xl p-4">
                        <span className="text-green-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Integration mit bestehenden ERP-Systemen</span>
                      </div>
                      <div className="flex items-start bg-green-900/20 rounded-2xl p-4">
                        <span className="text-green-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Echtzeit-Kommunikation zwischen Teams</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {id === "kanzlei-digitalisierung" && (
                <div className="bg-gradient-to-br from-purple-900/20 to-violet-900/20 backdrop-blur-sm border border-purple-500/30 p-10 rounded-3xl shadow-2xl shadow-purple-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-purple-200 text-center">Legal Tech Transformation</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Die digitale Transformation der Anwaltskanzlei umfasst moderne Technologien 
                    für effizientere Arbeitsabläufe:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-purple-900/20 rounded-2xl p-4">
                        <span className="text-purple-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Dokumentenmanagement mit KI-gestützter Analyse</span>
                      </div>
                      <div className="flex items-start bg-purple-900/20 rounded-2xl p-4">
                        <span className="text-purple-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Automatisierte Vertragserstellung</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-purple-900/20 rounded-2xl p-4">
                        <span className="text-purple-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Client Portal für bessere Kommunikation</span>
                      </div>
                      <div className="flex items-start bg-purple-900/20 rounded-2xl p-4">
                        <span className="text-purple-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Compliance-Tracking und -Reporting</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {id === "ki-telefonie" && (
                <div className="bg-gradient-to-br from-red-900/20 to-orange-900/20 backdrop-blur-sm border border-red-500/30 p-10 rounded-3xl shadow-2xl shadow-red-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-red-200 text-center">KI-gestützte Telefonie</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Unsere KI-Telefonie-Lösung revolutioniert den Kundenservice durch:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-red-900/20 rounded-2xl p-4">
                        <span className="text-red-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Intelligente Anrufbeantwortung</span>
                      </div>
                      <div className="flex items-start bg-red-900/20 rounded-2xl p-4">
                        <span className="text-red-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Automatisierte Terminbuchungen</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-red-900/20 rounded-2xl p-4">
                        <span className="text-red-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Sprachverarbeitung in Echtzeit</span>
                      </div>
                      <div className="flex items-start bg-red-900/20 rounded-2xl p-4">
                        <span className="text-red-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Nahtlose Übergabe an menschliche Mitarbeiter</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {id === "cms-webentwicklung" && (
                <div className="bg-gradient-to-br from-orange-900/20 to-yellow-900/20 backdrop-blur-sm border border-orange-500/30 p-10 rounded-3xl shadow-2xl shadow-orange-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-orange-200 text-center">CMS Webentwicklung</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Moderne Webentwicklung mit headless CMS und Next.js für optimale Performance:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-orange-900/20 rounded-2xl p-4">
                        <span className="text-orange-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Headless CMS für flexible Content-Verwaltung</span>
                      </div>
                      <div className="flex items-start bg-orange-900/20 rounded-2xl p-4">
                        <span className="text-orange-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Next.js für optimale Performance</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-orange-900/20 rounded-2xl p-4">
                        <span className="text-orange-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">SEO-optimierte Struktur</span>
                      </div>
                      <div className="flex items-start bg-orange-900/20 rounded-2xl p-4">
                        <span className="text-orange-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Responsive Design für alle Geräte</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {id === "cybersecurityberatung" && (
                <div className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 backdrop-blur-sm border border-cyan-500/30 p-10 rounded-3xl shadow-2xl shadow-cyan-500/10">
                  <h3 className="text-4xl font-bold mb-8 text-cyan-200 text-center">Cybersecurity Beratung</h3>
                  <p className="text-xl text-gray-200 mb-10 leading-relaxed text-center">
                    Umfassende IT-Sicherheitslösungen für kritische Infrastrukturen:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                      <div className="flex items-start bg-cyan-900/20 rounded-2xl p-4">
                        <span className="text-cyan-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">ISO 27001 Compliance</span>
                      </div>
                      <div className="flex items-start bg-cyan-900/20 rounded-2xl p-4">
                        <span className="text-cyan-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">BSI-Grundschutz Implementierung</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start bg-cyan-900/20 rounded-2xl p-4">
                        <span className="text-cyan-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">24/7 Sicherheitsmonitoring</span>
                      </div>
                      <div className="flex items-start bg-cyan-900/20 rounded-2xl p-4">
                        <span className="text-cyan-300 mr-4 text-2xl">✓</span>
                        <span className="text-gray-200 text-lg">Risikobewertung und -minderung</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gradient-to-br from-blue-900/50 via-indigo-900/50 to-violet-900/50 backdrop-blur-sm relative">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-violet-600/20"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-6xl font-bold mb-10 text-white">
            Interessiert an einer ähnlichen Lösung?
          </h2>
          <p className="text-2xl text-gray-200 mb-16 max-w-4xl mx-auto leading-relaxed">
            Lassen Sie uns gemeinsam Ihr Projekt besprechen und eine maßgeschneiderte Lösung entwickeln, 
            die zu Ihren spezifischen Anforderungen passt.
          </p>
          <div className="flex flex-col sm:flex-row gap-8 justify-center">
            <a
              href="/contact"
              className="px-12 py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-500 text-xl font-medium shadow-2xl hover:shadow-blue-500/30 transform hover:scale-110 border border-blue-400/30"
            >
              Kontakt aufnehmen
            </a>
            <a
              href="/case-studies"
              className="px-12 py-6 bg-transparent border-2 border-white/30 text-white rounded-2xl hover:bg-white/10 hover:border-white/50 transition-all duration-500 text-xl font-medium backdrop-blur-sm"
            >
              Weitere Case Studies
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

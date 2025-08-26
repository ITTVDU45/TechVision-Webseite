"use client";
import React from 'react';
// import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';

interface IndustrySolutionDetailProps {
  id: string;
}

interface Solution {
  title: string;
  description: string;
  features: string[];
  benefits: string[];
  technologies: string[];
  icon: string;
}

interface IndustryData {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  heroDescription: string;
  solutions: Solution[];
  useCases: string[];
  testimonials: string[];
}

const IndustrySolutionDetail: React.FC<IndustrySolutionDetailProps> = ({ id }) => {
  const router = useRouter();

  const industryData: Record<string, IndustryData> = {
    legal: {
      id: 'legal',
      name: 'Rechtswesen',
      description: 'Digitale Transformation für Anwaltskanzleien',
      icon: '⚖️',
      color: 'from-indigo-500 to-blue-500',
      heroDescription: 'Wir revolutionieren die Rechtsbranche mit KI-gestützten Lösungen, die Ihre Arbeitsabläufe automatisieren und die Effizienz steigern.',
      solutions: [
        {
          title: 'KI-gestützte Fallanalyse',
          description: 'Automatisierte Analyse von Rechtstexten und Urteilen mit maschinellem Lernen',
          features: ['Dokumentenanalyse', 'Rechtsprechung-Recherche', 'Risikobewertung', 'Automatisierte Zusammenfassungen'],
          benefits: ['Zeitersparnis von 70%', 'Höhere Genauigkeit', 'Umfassende Recherche', 'Kosteneinsparungen'],
          technologies: ['OpenAI GPT-4', 'LangChain', 'Python', 'React', 'MongoDB'],
          icon: '🤖'
        },
        {
          title: 'Intelligentes Fallmanagement',
          description: 'Zentrale Verwaltung aller Fälle mit automatisierten Workflows und Erinnerungen',
          features: ['Fallverfolgung', 'Fristenmanagement', 'Dokumentenverwaltung', 'Team-Kollaboration'],
          benefits: ['Bessere Übersicht', 'Keine verpassten Fristen', 'Effiziente Zusammenarbeit', 'Datenintegrität'],
          technologies: ['Node.js', 'PostgreSQL', 'Redis', 'WebSocket', 'Docker'],
          icon: '📋'
        },
        {
          title: 'Mandantenportal',
          description: 'Moderne Web- und Mobile-Apps für direkten Kontakt mit Mandanten',
          features: ['Dokumenten-Upload', 'Terminbuchung', 'Zahlungsabwicklung', 'Status-Updates'],
          benefits: ['24/7 Verfügbarkeit', 'Reduzierte Wartezeiten', 'Höhere Kundenzufriedenheit', 'Automatisierte Prozesse'],
          technologies: ['React Native', 'Next.js', 'Stripe API', 'AWS S3', 'Push-Notifications'],
          icon: '📱'
        }
      ],
      useCases: [
        'Automatisierte Vertragsanalyse und -erstellung',
        'KI-gestützte Rechtsrecherche und -zusammenfassung',
        'Intelligentes Fristenmanagement und -überwachung',
        'Digitale Mandantenkommunikation und -verwaltung',
        'Automatisierte Dokumentengenerierung und -verarbeitung'
      ],
      testimonials: [
        'Die KI-Lösungen haben unsere Arbeitsabläufe revolutioniert. Wir sparen täglich mehrere Stunden bei der Recherche.',
        'Das intelligente Fallmanagement gibt uns endlich den Überblick, den wir brauchen. Keine verpassten Fristen mehr!',
        'Unsere Mandanten lieben das neue Portal. Die Kommunikation ist viel effizienter geworden.'
      ]
    },
    retail: {
      id: 'retail',
      name: 'Einzelhandel & E-Commerce',
      description: 'Moderne Lösungen für den digitalen Handel',
      icon: '🛍️',
      color: 'from-purple-500 to-pink-500',
      heroDescription: 'Transformieren Sie Ihren Einzelhandel mit KI-gestützten Lösungen, die den Umsatz steigern und die Kundenerfahrung verbessern.',
      solutions: [
        {
          title: 'Telefon-KI - Customer Service',
          description: 'Intelligente Sprachassistenten für Kundenservice, Kaufberatung und Rückabwicklung',
          features: ['24/7 Kundenservice', 'Kaufberatung & Produktempfehlungen', 'Rückabwicklung & Umtausch', 'Mehrsprachige Unterstützung', 'Emotionale Intelligenz'],
          benefits: ['Reduzierte Wartezeiten', 'Höhere Kundenzufriedenheit', 'Kosteneinsparungen', 'Skalierbare Unterstützung', 'Konsistente Servicequalität'],
          technologies: ['OpenAI Whisper', 'GPT-4', 'React', 'WebRTC', 'AWS Polly', 'Node.js'],
          icon: '📞'
        }
      ],
      useCases: [
        'Personalisierte Produktempfehlungen basierend auf Kaufverhalten',
        'KI-gestützte Kundensegmentierung für gezieltes Marketing',
        'Intelligente Sprachassistenten für 24/7 Kundenservice',
        'Automatisierte Kaufberatung und Produktauswahl',
        'KI-gestützte Rückabwicklung und Umtausch-Prozesse'
      ],
      testimonials: [
        'Die personalisierte Kundenanalyse hat unsere Conversion-Raten um 35% gesteigert. Ein echter Game-Changer!',
        'Die Telefon-KI unterstützt unsere Kunden rund um die Uhr. Die Kundenzufriedenheit ist deutlich gestiegen.',
        'Unsere Kunden lieben die personalisierten Empfehlungen und den 24/7 Kundenservice.'
      ]
    },

    railway: {
      id: 'railway',
      name: 'Bahndienstleistungen',
      description: 'Digitale Lösungen für die Eisenbahnbranche',
      icon: '🚂',
      color: 'from-red-500 to-orange-500',
      heroDescription: 'Modernisieren Sie Ihre Bahndienstleistungen mit der ERP-Software GleisTrix.de für zentrale Verwaltung und optimale Ressourcennutzung.',
      solutions: [
        {
          title: 'GleisTrix.de - ERP für Bahndienstleister',
          description: 'Zentrale ERP-Software zur Verwaltung von Mitarbeitern, Fahrzeugen, Projekten und Zeiten mit umfassenden Reports',
          features: ['Mitarbeiter-Disposition', 'Fahrzeug-Management', 'Projekt-Verwaltung', 'Zeiterfassung', 'Zentrale Ressourcenplanung', 'Umfassende Reports & Analytics'],
          benefits: ['Optimierte Ressourcennutzung', 'Reduzierte Verwaltungskosten', 'Bessere Projektübersicht', 'Effiziente Zeiterfassung', 'Datenbasierte Entscheidungen', 'Zentrale Kontrolle'],
          technologies: ['React', 'Node.js', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'Business Intelligence Tools'],
          icon: '🚂'
        },

      ],
      useCases: [
        'Zentrale Verwaltung von Mitarbeitern, Fahrzeugen und Projekten',
        'Optimierte Ressourcendisposition und -planung',
        'Effiziente Zeiterfassung und Projektabrechnung',
        'Umfassende Reports und Business Intelligence',
        'Integration mit bestehenden Bahnsystemen'
      ],
      testimonials: [
        'GleisTrix.de hat unsere Ressourcenplanung revolutioniert. Wir haben jetzt den perfekten Überblick über alle Mitarbeiter und Fahrzeuge.',
        'Die zentrale ERP-Software spart uns täglich wertvolle Zeit bei der Disposition und Projektverwaltung.',
        'Die umfassenden Reports geben uns endlich die Transparenz, die wir für bessere Entscheidungen brauchen.'
      ]
    }
  };

  const industry = industryData[id];

  if (!industry) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Branche nicht gefunden</h1>
          <button 
            onClick={() => router.push('/industry-solutions')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Zurück zu allen Branchen
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className={`absolute inset-0 bg-gradient-to-r ${industry.color} bg-[length:200%_200%]`} />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="text-8xl mb-6">
              {industry.icon}
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">{industry.name} - </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                KI-Lösungen
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed max-w-4xl mx-auto">
              {industry.heroDescription}
            </p>

            <div>
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                onClick={() => router.push('/contact')}
              >
                Beratung anfragen
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">Unsere </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              KI-Lösungen
            </span>
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {industry.solutions.map((solution, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 hover:border-blue-500/50 transition-all"
              >
                <div className="text-4xl mb-4">{solution.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{solution.title}</h3>
                <p className="text-gray-400 mb-6">{solution.description}</p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Features:</h4>
                    <ul className="space-y-1 text-gray-300">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Vorteile:</h4>
                    <ul className="space-y-1 text-gray-300">
                      {solution.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center">
                          <span className="w-2 h-2 bg-green-500 rounded-full mr-3" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-2">Technologien:</h4>
                    <div className="flex flex-wrap gap-2">
                      {solution.technologies.map((tech, idx) => (
                        <span key={idx} className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-sm">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-32 bg-gray-900/20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">Anwendungsfälle für </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {industry.name}
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {industry.useCases.map((useCase, index) => (
              <div
                key={index}
                className="bg-gray-800/50 border border-white/10 rounded-xl p-6 hover:border-blue-500/50 transition-all"
              >
                <div className="flex items-start">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3 mt-2 flex-shrink-0" />
                  <p className="text-gray-300">{useCase}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">
            <span className="text-white">Das sagen unsere </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              Kunden
            </span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {industry.testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-gray-900/50 border border-white/10 rounded-2xl p-8 text-center"
              >
                <div className="text-4xl mb-4">💬</div>
                <p className="text-gray-300 italic">"{testimonial}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-gray-900/20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-8">
              <span className="text-white">Bereit für Ihre </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
                {industry.name}-Lösung?
              </span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12 leading-relaxed">
              Lassen Sie uns gemeinsam die perfekte KI-Lösung für Ihre Branche entwickeln. 
              Wir beraten Sie gerne und erstellen ein maßgeschneidertes Konzept.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-lg font-medium hover:shadow-lg transition-all"
                onClick={() => router.push('/contact')}
              >
                Beratung anfragen
              </button>
              
              <button
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-lg font-medium hover:bg-white/20 transition-all"
                onClick={() => router.push('/case-studies')}
              >
                Referenzen ansehen
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default IndustrySolutionDetail;

"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from "@/components/ui/glowing-effect";
import Vortex from "@/components/ui/vortex";
import ColourfulText from "@/components/ui/colourful-text";

import { Disclosure } from '@headlessui/react';
import Lottie from 'lottie-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function CyberSecurity() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Cybersecurity Services definieren
  const cybersecurityServices = [
    {
      id: 'penetration-testing',
      name: 'Penetration Testing',
      description: 'Umfassende Sicherheitstests Ihrer IT-Infrastruktur',
      category: 'testing',
      icon: '🔍'
    },
    {
      id: 'vulnerability-assessment',
      name: 'Schwachstellenanalyse',
      description: 'Systematische Identifikation von Sicherheitslücken',
      category: 'assessment',
      icon: '⚠️'
    },
    {
      id: 'incident-response',
      name: 'Incident Response',
      description: 'Professionelle Reaktion auf Sicherheitsvorfälle',
      category: 'response',
      icon: '🚨'
    },
    {
      id: 'compliance',
      name: 'Compliance & Audit',
      description: 'ISO 27001, DSGVO und weitere Standards',
      category: 'compliance',
      icon: '📋'
    },
    {
      id: 'security-training',
      name: 'Sicherheitsschulungen',
      description: 'Schulung Ihrer Mitarbeiter für Cybersicherheit',
      category: 'training',
      icon: '🎓'
    }
  ];
  
  const [filteredServices, setFilteredServices] = useState(cybersecurityServices);
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    selectedService: ''
  });

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  const slideCount = isMobile ? 1 : 3; // Zeige 1 Slide auf mobilen Geräten, sonst 3

  // Cybersecurity Cases definieren
  const cases = [
    {
      title: "Ransomware-Angriff erfolgreich abgewehrt",
      description: "Sofortige Reaktion und Wiederherstellung der Systeme",
      company: "Mittelständisches Unternehmen",
      impact: "Minimale Ausfallzeiten, keine Datenverluste",
      icon: "🛡️",
      results: [
        "Systeme innerhalb von 2 Stunden wiederhergestellt",
        "Keine Datenverluste erlitten",
        "Sicherheitsmaßnahmen verstärkt"
      ]
    },
    {
      title: "DSGVO-Compliance Audit bestanden",
      description: "Vollständige Überprüfung der Datenschutzmaßnahmen",
      company: "E-Commerce Unternehmen",
      impact: "100% Compliance, keine Beanstandungen",
      icon: "📋",
      results: [
        "Alle Datenschutzrichtlinien erfüllt",
        "Prozesse dokumentiert und optimiert",
        "Mitarbeiter geschult"
      ]
    },
    {
      title: "Phishing-Angriff verhindert",
      description: "Früherkennung und Mitarbeiterschulung",
      company: "Finanzdienstleister",
      impact: "Keine erfolgreichen Angriffe, erhöhte Awareness",
      icon: "🎣",
      results: [
        "Angriff frühzeitig erkannt",
        "Mitarbeiter erfolgreich geschult",
        "Sicherheitsprotokolle verbessert"
      ]
    }
  ];

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideCount + cases.length) % cases.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideCount) % cases.length);
  };

  const visibleCases = () => {
    return cases.slice(currentIndex, currentIndex + slideCount);
  };

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const blogPosts = [
    {
      title: "Ransomware 2024: Neue Bedrohungen & Schutzmaßnahmen",
      subtitle: "Aktuelle Entwicklungen und Schutzstrategien",
      description: "Aktuelle Entwicklungen im Bereich Ransomware und wie sich Unternehmen effektiv schützen können.",
      image: "/images/blog/ransomware-protection.jpg",
      category: { name: "Threat Intelligence", icon: "🛡️" },
      readTime: "5 min Lesezeit",
      date: "15. März 2024"
    },
    {
      title: "ISO 27001 Update: Was Unternehmen wissen müssen",
      subtitle: "Wichtige Änderungen im Überblick",
      description: "Die wichtigsten Änderungen der ISO 27001 und deren Auswirkungen auf Ihr ISMS.",
      image: "/images/blog/iso-27001.jpg",
      category: { name: "Standards & Compliance", icon: "📋" },
      readTime: "8 min Lesezeit",
      date: "10. März 2024"
    },
    {
      title: "KI in der Cybersicherheit: Chancen und Risiken",
      subtitle: "Die Zukunft der Sicherheit",
      description: "Wie künstliche Intelligenz die Cybersicherheit revolutioniert und welche neuen Herausforderungen entstehen.",
      image: "/images/blog/ai-cybersecurity.jpg",
      category: { name: "Innovation", icon: "🤖" },
      readTime: "6 min Lesezeit",
      date: "5. März 2024"
    }
  ];

  const visibleBlogPosts = () => {
    return blogPosts.slice(currentBlogIndex, currentBlogIndex + 3);
  };

  const agents = [
    {
      name: 'Personal Assistant',
      icon: '👤',
      description: 'Automatisierte Unterstützung für Terminplanung, E-Mails, Aufgaben und persönliche Organisation.',
      features: ['Intelligente Kalenderverwaltung', 'E-Mail-Priorisierung', 'Task-Management']
    },
    {
      name: 'Juristische KI-Agenten',
      icon: '⚖️',
      description: 'Spezialisierte KI für Anwaltskanzleien & rechtliche Prozesse.',
      features: [
        'Fallanalyse & Dokumentengenerierung',
        'Automatisierte Vertragsprüfung',
        'Rechtsauskunft & Mandantenkommunikation'
      ]
    },
    {
      name: 'Unternehmensberater-KI',
      icon: '📊',
      description: 'Unterstützt Berater bei Datenanalysen, Strategieentwicklung & Prozessoptimierung.',
      subAgents: [
        { name: 'Finanz-KI', description: 'Automatische Kosten-Nutzen-Analysen' },
        { name: 'Business-Intelligence-KI', description: 'Data-Analytics für Unternehmensentscheidungen' },
        { name: 'Optimierungs-KI', description: 'Identifikation von Engpässen in Workflows' }
      ]
    },
    {
      name: 'Finanz- & Buchhaltungs-KI',
      icon: '💰',
      description: 'Automatisierte Rechnungsverarbeitung & Steueranalyse',
      features: ['Automatische Buchungen', 'Kosten- und Liquiditätsprognosen']
    },
    {
      name: 'HR-Agent',
      icon: '👥',
      description: 'KI für modernes Bewerbermanagement',
      features: ['Automatische Kandidatenbewertung', 'KI-gestützte Matching-Systeme']
    },
    {
      name: 'Vertriebs-KI',
      icon: '🎯',
      description: 'Intelligente Vertriebsunterstützung',
      features: ['Lead-Generierung', 'KI-gestützte Kundenbewertung']
    },
    {
      name: 'Gesundheits-KI',
      icon: '🏥',
      description: 'Digitale Gesundheitsassistenz',
      features: ['Patientenbetreuung', 'Medizinische Dokumentation']
    },
    {
      name: 'Produktions-KI',
      icon: '🏭',
      description: 'Intelligente Fertigungssteuerung',
      features: ['Prozesskontrolle', 'Predictive Maintenance']
    }
  ];

  const visibleAgents = () => {
    return agents.slice(currentAgentIndex, currentAgentIndex + 3);
  };

  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [currentAgentDirection, setCurrentAgentDirection] = useState(0);

  const securityBlogPosts = [
    {
      title: "Cybersecurity Best Practices",
      excerpt: "Wie Sie Ihr Unternehmen vor modernen Bedrohungen schützen",
      image: "/images/blog/security.jpg",
      category: "Security",
      date: "18. März 2024",
      gradient: "from-purple-500 to-blue-500",
      link: "/blog/security"
    },
    {
      title: "Zero Trust Security",
      excerpt: "Implementierung des Zero-Trust-Modells in modernen Unternehmen",
      image: "/images/blog/zero-trust.jpg",
      category: "Security Architecture",
      date: "16. März 2024",
      gradient: "from-blue-500 to-indigo-500",
      link: "/blog/zero-trust"
    },
    {
      title: "Cloud Security 2024",
      excerpt: "Neue Herausforderungen in der Cloud-Sicherheit und wie Sie ihnen begegnen",
      image: "/images/blog/cloud-security.jpg",
      category: "Cloud",
      date: "14. März 2024",
      gradient: "from-indigo-500 to-violet-500",
      link: "/blog/cloud-security"
    }
  ];

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (typeof window !== 'undefined') {
        setIsMobile(window.innerWidth < 768);
      }
    };

    handleResize();
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Animated Process Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50"
                stroke="url(#gradient)"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3b82f6" />
                  <stop offset="100%" stopColor="#8b5cf6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Cyber-Security – </span>
              <ColourfulText text="Schutz für Ihre digitale Zukunft" />
            </motion.div>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Umfassende Sicherheitslösungen für Ihr Unternehmen – von der Analyse bis zur Implementation.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  onClick={() => router('/offer')}
                >
                  Sicherheitsanalyse starten
                </button>
              </GlowingEffect>
            </motion.div>

            {/* Decorative Elements */}
            <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            
            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Unsere Cybersecurity Services" />
            </h2>
            <p className="text-xl text-gray-400">
              Wir bieten maßgeschneiderte Beratungen und Lösungen, um Ihr Unternehmen optimal abzusichern. 
              Unsere Schwerpunkte umfassen:
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "ISM Beratung",
                description: "Individuelle Beratung für Ihr Informationssicherheits-Management-System.",
                icon: "🛡️",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                title: "BSI Standards Implementierung",
                description: "Umsetzung der branchenführenden BSI-Standards für höchste Sicherheit.",
                icon: "📋",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                title: "ISO 27001",
                description: "Zertifizierte Beratung zur Erreichung und Aufrechterhaltung der ISO 27001.",
                icon: "✅",
                gradient: "from-purple-500 to-blue-500"
              },
              {
                title: "NIST",
                description: "Beratung zur Implementierung von NIST-Richtlinien für ein robustes Sicherheitskonzept.",
                icon: "🏛️",
                gradient: "from-blue-600 to-indigo-600"
              },
              {
                title: "DIN SPEC 270...",
                description: "Speziallösungen für den Mittelstand zur Umsetzung von DIN SPEC-Anforderungen.",
                icon: "🏢",
                gradient: "from-indigo-600 to-purple-600"
              }
            ].map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-[20px] border border-white/10 
                           p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} 
                                flex items-center justify-center text-3xl mb-6
                                transform hover:scale-110 transition-transform duration-300`}>
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Risk Statistics Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Warum Cybersicherheit unerlässlich ist" />
            </h2>
            <p className="text-xl text-gray-400">
              Cyberbedrohungen nehmen stetig zu – von Ransomware über Datenlecks bis hin zu gezielten Angriffen. 
              Eine robuste Sicherheitsstrategie schützt nicht nur Ihre Daten, sondern bewahrt auch Ihren guten Ruf 
              und gewährleistet Geschäftskontinuität.
            </p>
          </motion.div>

          {/* Statistics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-16">
            {[
              {
                value: "78%",
                label: "der Unternehmen wurden Opfer von Cyberangriffen",
                icon: "🎯",
                gradient: "from-red-500 to-orange-500"
              },
              {
                value: "€205K",
                label: "durchschnittliche Kosten pro Datenleck",
                icon: "💰",
                gradient: "from-orange-500 to-yellow-500"
              },
              {
                value: "48h",
                label: "durchschnittliche Ausfallzeit nach Ransomware",
                icon: "⏰",
                gradient: "from-yellow-500 to-green-500"
              },
              {
                value: "92%",
                label: "der Angriffe beginnen mit einer Phishing-Mail",
                icon: "📧",
                gradient: "from-green-500 to-blue-500"
              }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-[20px] border border-white/10 
                           p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500
                           flex flex-col items-center text-center"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${stat.gradient} 
                                flex items-center justify-center text-3xl mb-4`}>
                  {stat.icon}
                </div>
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className="text-4xl font-bold text-white mb-2"
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Threat Types */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                title: "Ransomware",
                description: "Verschlüsselung von Daten und Erpressung durch Cyberkriminelle",
                icon: "🔒",
                gradient: "from-red-500 to-purple-500",
                percentage: 65
              },
              {
                title: "Phishing",
                description: "Gezielte Täuschungsversuche durch gefälschte Kommunikation",
                icon: "🎣",
                gradient: "from-purple-500 to-blue-500",
                percentage: 92
              },
              {
                title: "DDoS Attacken",
                description: "Gezielte Überlastung von Systemen und Diensten",
                icon: "🌐",
                gradient: "from-blue-500 to-indigo-500",
                percentage: 45
              }
            ].map((threat, index) => (
              <motion.div
                key={threat.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/50 backdrop-blur-xl rounded-[20px] border border-white/10 
                           p-8 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
              >
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${threat.gradient} 
                                flex items-center justify-center text-3xl mb-6`}>
                  {threat.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">{threat.title}</h3>
                <p className="text-gray-400 mb-4">{threat.description}</p>
                
                {/* Progress Bar */}
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${threat.percentage}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className={`h-full bg-gradient-to-r ${threat.gradient}`}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  Bedrohungsgrad: {threat.percentage}%
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex justify-center mt-16"
          >
            <GlowingEffect>
              <button
                className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group
                         min-w-[250px] hover:shadow-lg hover:shadow-blue-500/25 
                         transition-all duration-300"
                onClick={() => router('/offer')}
              >
                <span className="relative z-10">Cybersicherheits-Check starten</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                              transition-opacity duration-300" />
              </button>
            </GlowingEffect>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Unsere Fallstudien" />
            </h2>
            <p className="text-xl text-gray-400">
              Entdecken Sie, wie wir Unternehmen dabei helfen, ihre digitale Sicherheit zu optimieren
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                     hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                     hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-6 h-6 text-blue-400" />
          </button>

          {/* Cases Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                {visibleCases().map((caseStudy, index) => (
                  <motion.div
                    key={caseStudy.title + index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]"
                  >
                    <div className={`bg-gradient-to-br ${
                      index % 2 === 0 
                        ? 'from-blue-500 via-indigo-500 to-violet-600' 
                        : 'from-violet-600 via-indigo-500 to-blue-500'
                    } p-[1px] rounded-2xl h-full`}>
                      <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                        {/* Logo & Category */}
                        <div className="flex items-center justify-between mb-4">
                          <img
                            src={caseStudy.logo}
                            alt="Company Logo"
                            className="w-12 h-12 object-contain bg-white/10 rounded-lg p-2"
                          />
                          <span className="text-sm text-blue-300">Cyber Security</span>
                        </div>

                        {/* Image */}
                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img 
                            src={caseStudy.image} 
                            alt={caseStudy.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Content */}
                        <div className="mb-6 flex-grow">
                          <h3 className="text-xl font-bold text-white mb-2">
                            {caseStudy.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4">
                            {caseStudy.description}
                          </p>

                          {/* Results */}
                          <div className="space-y-2">
                            {caseStudy.results.map((result, idx) => (
                              <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                                <span>{result}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                    rounded-lg text-white text-sm font-medium 
                                    hover:shadow-lg transition-all duration-300
                                    relative overflow-hidden group"
                        >
                          <span className="relative z-10">Fallstudie lesen</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                        group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(cases.length / slideCount) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * slideCount)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentIndex / slideCount) === index 
                              ? 'bg-blue-600 w-4' 
                              : 'bg-blue-900'}`}
                />
              ))}
            </div>

            {/* View All Case Studies Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-16"
            >
                                      <Link href="/case-studies">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Zu unseren Fallstudien</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                               transition-opacity duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Ihre Vorteile mit unserer Cyber Sicherheitsberatung" />
            </h2>
          </motion.div>

          {/* Content Container */}
          <div className="flex flex-col lg:flex-row gap-12 items-center max-w-7xl mx-auto">
            {/* Left Side - Benefits */}
            <div className="w-full lg:w-1/2 space-y-6">
              {[
                {
                  title: "Ganzheitliche Expertise",
                  description: "Wir kombinieren Best Practices und international anerkannte Standards für einen umfassenden Sicherheitsansatz.",
                  icon: "🎯",
                  gradient: "from-blue-500 to-indigo-500",
                  delay: 0.1
                },
                {
                  title: "Maßgeschneiderte Lösungen",
                  description: "Individuelle Beratung und passgenaue Konzepte, die sich an den Bedürfnissen Ihres Unternehmens orientieren.",
                  icon: "🔧",
                  gradient: "from-indigo-500 to-purple-500",
                  delay: 0.2
                },
                {
                  title: "Langfristige Sicherheit",
                  description: "Proaktive Maßnahmen zur Risikominimierung und nachhaltigen Absicherung Ihrer IT-Infrastruktur.",
                  icon: "🛡️",
                  gradient: "from-purple-500 to-blue-500",
                  delay: 0.3
                }
              ].map((benefit) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: benefit.delay }}
                  className="bg-gray-900/50 backdrop-blur-xl rounded-xl border border-white/10 
                             p-6 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500"
                >
                  <div className="flex items-center gap-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${benefit.gradient} 
                                  flex items-center justify-center text-2xl
                                  transform transition-transform duration-300
                                  group-hover:scale-110`}>
                      {benefit.icon}
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white mb-2">
                        {benefit.title}
                      </h3>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {benefit.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Right Side - Image */}
            <motion.div 
              className="w-full lg:w-1/2"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square rounded-2xl overflow-hidden">
                <img
                  src="/images/Laptop-Schloss.jpg"
                  alt="Cyber Security Visualization"
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-indigo-500/20 to-transparent" />
              </div>
            </motion.div>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
                                    <Link href="/offer">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                           rounded-lg text-lg font-medium relative overflow-hidden group
                           shadow-xl shadow-blue-500/20"
              >
                <span className="relative z-10">Sicherheitsanalyse starten</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                              transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Unser Beratungsprozess – Schritt für Schritt zum sicheren Unternehmen" />
            </h2>
            <p className="text-xl text-gray-400">
              Wir begleiten Sie von der ersten Analyse bis zur finalen Umsetzung:
            </p>
          </motion.div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-7xl mx-auto">
            {/* Lottie Animation Column */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex-1"
            >
              <LottieSequence 
                animations={[
                  '/images/Animation - 1741036737893.json', // KI/Tech Animation
                  '/images/Animation - 1741036909547.json'  // Security Animation
                ]}
              />
            </motion.div>

            {/* Steps Column */}
            <div className="space-y-8">
              {[
                {
                  title: "Analyse & Assessment",
                  description: "Erfassung der aktuellen Sicherheitslage und Identifikation von Schwachstellen.",
                  icon: "🔍",
                  gradient: "from-blue-500 to-indigo-500",
                  delay: 0.1
                },
                {
                  title: "Konzept & Planung",
                  description: "Entwicklung eines maßgeschneiderten Sicherheitskonzepts unter Berücksichtigung internationaler Standards.",
                  icon: "📋",
                  gradient: "from-indigo-500 to-purple-500",
                  delay: 0.2
                },
                {
                  title: "Implementierung",
                  description: "Umsetzung der geplanten Maßnahmen – von der Technologie bis zur Schulung Ihrer Mitarbeiter.",
                  icon: "⚙️",
                  gradient: "from-purple-500 to-blue-500",
                  delay: 0.3
                },
                {
                  title: "Monitoring & Support",
                  description: "Kontinuierliche Überwachung und regelmäßige Updates für nachhaltige Sicherheit.",
                  icon: "📊",
                  gradient: "from-blue-600 to-indigo-600",
                  delay: 0.4
                }
              ].map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: step.delay }}
                  className="flex gap-6 group"
                >
                  {/* Step Number & Icon */}
                  <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient}
                                  flex items-center justify-center text-3xl
                                  transform group-hover:scale-110 transition-transform duration-300`}>
                    {step.icon}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                      <span className="text-blue-400">0{index + 1}.</span> {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section Alternative */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <ColourfulText text="Häufig gestellte Fragen zur Cybersicherheit" />
            </h2>
            <p className="text-xl text-gray-400">
              Finden Sie Antworten auf die wichtigsten Fragen zur Sicherheit Ihres Unternehmens
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Wie lange dauert eine typische Sicherheitsimplementierung?",
                answer: "Die Dauer variiert je nach Umfang und Komplexität. Eine grundlegende Implementation dauert etwa 3-6 Monate, während umfassende Sicherheitslösungen 6-12 Monate in Anspruch nehmen können.",
                icon: "⏱️",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                question: "Welche Branchen betreuen Sie hauptsächlich?",
                answer: "Wir haben Erfahrung in verschiedenen Branchen, darunter Finanzdienstleistungen, Gesundheitswesen, E-Commerce und produzierende Industrie. Unsere Lösungen werden individuell an die branchenspezifischen Anforderungen angepasst.",
                icon: "🏢",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                question: "Bieten Sie auch Schulungen für Mitarbeiter an?",
                answer: "Ja, wir bieten umfassende Schulungsprogramme an. Diese umfassen Awareness-Trainings, Phishing-Simulationen und spezifische Sicherheitsschulungen für verschiedene Mitarbeiterebenen.",
                icon: "👥",
                gradient: "from-green-500 to-teal-500"
              },
              {
                question: "Wie wird die Compliance sichergestellt?",
                answer: "Wir implementieren Prozesse und Tools zur kontinuierlichen Compliance-Überwachung. Regelmäßige Audits und automatisierte Compliance-Checks helfen dabei, die Einhaltung aller relevanten Standards sicherzustellen.",
                icon: "✅",
                gradient: "from-orange-500 to-red-500"
              },
              {
                question: "Gibt es eine 24/7 Support-Hotline?",
                answer: "Ja, unsere Security Operations Center (SOC) ist rund um die Uhr besetzt. Im Notfall erreichen Sie immer einen qualifizierten Ansprechpartner.",
                icon: "📞",
                gradient: "from-pink-500 to-purple-500"
              },
              {
                question: "Wie werden Updates und Patches verwaltet?",
                answer: "Wir nutzen ein automatisiertes Patch-Management-System mit definierten Wartungsfenstern. Kritische Sicherheitsupdates werden priorisiert und nach Abstimmung zeitnah eingespielt.",
                icon: "🔄",
                gradient: "from-teal-500 to-blue-500"
              }
            ].map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="bg-gray-900/50 backdrop-blur-xl rounded-[20px] border border-white/10 
                                  overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 
                                  transition-all duration-500">
                      <Disclosure.Button className="w-full">
                        <div className="flex items-center justify-between p-6">
                          <div className="flex items-center gap-4">
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${faq.gradient} 
                                          flex items-center justify-center text-2xl`}>
                              {faq.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white text-left">
                              {faq.question}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: open ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className={`w-8 h-8 rounded-full bg-gradient-to-r ${faq.gradient} 
                                      flex items-center justify-center`}
                          >
                            <svg
                              className="w-4 h-4 text-white"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                              />
                            </svg>
                          </motion.div>
                        </div>
                      </Disclosure.Button>

                      <Disclosure.Panel>
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="px-6 pb-6 text-gray-400 pl-20"
                        >
                          {faq.answer}
                        </motion.div>
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-6">
              Noch Fragen? Wir sind hier, um zu helfen!
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                         rounded-lg text-lg font-medium relative overflow-hidden group"
            >
              <span className="relative z-10">Kontaktieren Sie uns</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                            transition-opacity duration-300" />
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <GlowingEffect
            blur={20}
            spread={150}
            proximity={150}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10
                          shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 
                          transition-all duration-500">
              <Vortex
                backgroundColor="rgba(0,0,0,0.7)"
                rangeY={800}
                particleCount={300}
                baseHue={220}
                className="flex min-h-[600px] w-full flex-col items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl mb-8 md:mb-10"
                  >
                    <div className="text-white">Bereit für Ihre</div>
                    <div className="font-bold my-4">
                      <ColourfulText text="IT-Sicherheit" />
                    </div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihre IT-Sicherheit auf das nächste Level bringen. 
                    Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  >
                    <button
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 
                               rounded-xl text-lg font-medium relative overflow-hidden group"
                      onClick={() => router('/offer')}
                    >
                      <span className="relative z-10">Cybersicherheits-Check starten</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                    transition-opacity duration-300" />
                    </button>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  );
}

// Lottie Sequence Component
const LottieSequence = ({ animations }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    fetch(animations[currentIndex])
      .then(response => response.json())
      .then(data => setAnimationData(data));
  }, [currentIndex, animations]);

  const handleComplete = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % animations.length);
  };

  if (!animationData) return null;

  return (
    <Lottie
      animationData={animationData}
      loop={false}
      onComplete={handleComplete}
      className="w-full"
      style={{ background: 'transparent' }}
    />
  );
}; 
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Vortex from '@/components/ui/vortex';
import ColourfulText from "@/components/ui/colourful-text";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function Tools() {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection in useEffect to avoid SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  const slideCount = isMobile ? 1 : 3;

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
      name: 'Telefonbesprechungs-KI',
      icon: '📞',
      description: 'Automatisierte Kundenservice-KI für Telefonsupport, Terminvereinbarungen & Beschwerden.',
      features: [
        'Sprach- und Textanalyse',
        'CRM-Integration',
        'Automatische Ticketerstellung'
      ]
    },
    {
      name: 'Marketing-KI-Agent',
      icon: '📣',
      description: 'Optimierte Werbekampagnen, Social Media-Automatisierung & datenbasierte Content-Erstellung.',
      features: [
        'SEO-Optimierung',
        'Automatisierte Werbeanzeigen',
        'Content-Generierung'
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
    return agents.slice(currentAgentIndex, currentAgentIndex + slideCount);
  };

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const blogPosts = [
    {
      title: "KI-Tools im Unternehmenseinsatz",
      subtitle: "Effizienzsteigerung durch moderne Technologie",
      description: "Wie moderne Tools die Effizienz in Unternehmen steigern können.",
      image: "/images/blog/ki-tools.jpg",
      category: { name: "Best Practices", icon: "💡" },
      readTime: "5 min Lesezeit",
      date: "20. März 2024",
      link: "/blog/ki-tools"
    },
    {
      title: "Open Source vs. Enterprise",
      subtitle: "Entscheidungshilfe für Unternehmen",
      description: "Ein Vergleich der Vor- und Nachteile verschiedener Tool-Kategorien.",
      image: "/images/blog/comparison.jpg",
      category: { name: "Analyse", icon: "📊" },
      readTime: "8 min Lesezeit",
      date: "15. März 2024",
      link: "/blog/open-source-vs-enterprise"
    },
    {
      title: "Zukunft der KI-Agenten",
      subtitle: "Trends und Innovationen",
      description: "Trends und Entwicklungen in der automatisierten Prozessoptimierung.",
      image: "/images/blog/future.jpg",
      category: { name: "Trends", icon: "🔮" },
      readTime: "6 min Lesezeit",
      date: "10. März 2024",
      link: "/blog/zukunft-ki-agenten"
    }
  ];

  const visibleBlogPosts = () => {
    return blogPosts.slice(currentBlogIndex, currentBlogIndex + 3);
  };

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const postsPerPage = isMobile ? 1 : 3;
  const pageCount = Math.ceil(blogPosts.length / postsPerPage);

  const [currentIndex, setCurrentIndex] = useState(0);

  const visiblePosts = () => {
    const start = currentIndex;
    const end = start + postsPerPage;
    return blogPosts.slice(start, end);
  };

  const nextSlide = () => {
    if (currentIndex + postsPerPage < blogPosts.length) {
      setCurrentIndex(prev => prev + postsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - postsPerPage);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 animate-gradient bg-[length:200%_200%]" />
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
                  <stop offset="0%" stopColor="#2dd4bf" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Unsere Tools & KI-Agenten – </span>
              <AnimatedGradientText>
                Effiziente Lösungen für Ihr Business
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Von Open-Source-Software bis hin zu intelligenten KI-Agenten – 
              wir bieten die richtigen Werkzeuge für Automatisierung, Produktivität 
              und digitales Wachstum.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <GlowingEffect>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    document.getElementById('open-source-tools').scrollIntoView({ 
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }}
                  className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group 
                           cursor-pointer"
                >
                  <span className="relative z-10">Alle Tools entdecken</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                               transition-opacity duration-300" />
                </motion.button>
              </GlowingEffect>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  document.getElementById('ki-agenten').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="px-8 py-4 bg-white/10 backdrop-blur-sm 
                         rounded-xl text-lg font-medium relative overflow-hidden group
                         cursor-pointer"
              >
                <span className="relative z-10">KI-Agenten</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                             transition-opacity duration-300" />
              </motion.button>
            </motion.div>

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

      {/* Open Source Tools Section */}
      <section id="open-source-tools" className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-teal-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Unsere Open-Source-Tools – </span>
              <AnimatedGradientText>Freiheit & Kontrolle</AnimatedGradientText>
            </h2>
            <p className="text-xl text-gray-400">
              Nutzen Sie leistungsstarke, flexible und lizenzfreie Open-Source-Software für Ihr Unternehmen.
            </p>
          </motion.div>

          {/* Tools Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {[
              {
                name: 'Cal.com',
                icon: '📅',
                description: 'Open-Source-Terminplanungstool für flexible Meetings',
                features: ['Automatische Zeitzonenkonvertierung', 'Team-Kalender', 'API-Integration']
              },
              {
                name: 'Zeiterfassung',
                icon: '⏱️',
                description: 'Effiziente Zeiterfassung für Teams & Freelancer',
                features: ['Projektbasierte Erfassung', 'Automatische Berichte', 'Export-Funktionen']
              },
              {
                name: 'Passwort-Tresor',
                icon: '🔐',
                description: 'Sicheres Passwort-Management für Unternehmen',
                features: ['Ende-zu-Ende-Verschlüsselung', 'Team-Sharing', 'Zugriffskontrollen']
              },
              {
                name: 'ERP-System Idurar',
                icon: '🏢',
                description: 'Open-Source-ERP für Unternehmensverwaltung',
                features: ['Finanzverwaltung', 'Lagermanagement', 'Personalwesen']
              },
              {
                name: 'CRM Perfex',
                icon: '🤝',
                description: 'Leistungsstarke CRM-Lösung für Kundenmanagement',
                features: ['Kontaktverwaltung', 'Verkaufspipeline', 'E-Mail-Marketing']
              },
              {
                name: 'File-Transfer',
                icon: '📤',
                description: 'Sicherer Open-Source-Dateiversand',
                features: ['Verschlüsselter Transfer', 'Große Dateien', 'Link-Sharing']
              },
              {
                name: 'Nextcloud',
                icon: '☁️',
                description: 'Private Cloud-Lösung für Datei- und Datenmanagement',
                features: ['Dateisynchronisation', 'Kollaboration', 'Kalenderfunktion']
              }
            ].map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <GlowingEffect>
                  <div className="group relative overflow-hidden rounded-2xl bg-neutral-900/50 border border-white/10 p-6 hover:border-teal-500/50 transition-all duration-300">
                    <div className="relative z-10">
                      {/* Icon & Name */}
                      <div className="flex items-center gap-4 mb-4">
                        <span className="text-3xl p-3 bg-white/5 rounded-xl group-hover:bg-white/10 transition-colors">
                          {tool.icon}
                        </span>
                        <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-400 mb-4">{tool.description}</p>
                      
                      {/* Features */}
                      <ul className="space-y-2">
                        {tool.features.map((feature, i) => (
                          <li key={i} className="flex items-center text-gray-300">
                            <span className="text-teal-500 mr-2">✓</span>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </GlowingEffect>
              </motion.div>
            ))}
          </div>

          {/* Neuer Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/offer">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(45, 212, 191, 0.4)"
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Jetzt Tools Anfragen</span>
                <div className="absolute inset-0 bg-gradient-to-r from-teal-400 to-blue-400 opacity-0 
                             group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
        
      </section>

      {/* KI-Agenten Section */}
      <section id="ki-agenten" className="py-32 bg-black relative overflow-hidden">
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
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Unsere KI-Agenten – </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                Automatisierung auf höchstem Niveau
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Erleben Sie leistungsstarke KI-Agenten, die Ihren Arbeitsalltag erleichtern, 
              Geschäftsprozesse optimieren und datengetriebene Entscheidungen unterstützen.
            </p>
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={() => {
              setDirection(-1);
              setCurrentAgentIndex(Math.max(currentAgentIndex - 1, 0));
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                     hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={() => {
              setDirection(1);
              setCurrentAgentIndex(Math.min(currentAgentIndex + 1, agents.length - slideCount));
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                     hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-6 h-6 text-blue-400" />
          </button>

          {/* Agents Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                {visibleAgents().map((agent, index) => (
                  <motion.div
                    key={agent.name}
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
                        {/* Agent Header */}
                        <div className="flex items-center gap-4 mb-4">
                          <span className="text-3xl bg-white/5 p-3 rounded-xl">{agent.icon}</span>
                          <h3 className="text-xl font-bold text-white">{agent.name}</h3>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 mb-6 flex-grow">{agent.description}</p>

                        {/* Features List */}
                        <div className="space-y-3 mb-6">
                          {agent.features?.map((feature, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-blue-400">●</span>
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {/* Details Button */}
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                    rounded-lg text-white text-sm font-medium 
                                    hover:shadow-lg transition-all duration-300
                                    relative overflow-hidden group"
                        >
                          <span className="relative z-10">Details anzeigen</span>
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
              {Array.from({ length: Math.ceil(agents.length / slideCount) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentAgentIndex / slideCount ? 1 : -1);
                    setCurrentAgentIndex(index * slideCount);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentAgentIndex / slideCount) === index 
                              ? 'bg-blue-600 w-4' 
                              : 'bg-blue-900'}`}
                />
              ))}
            </div>

            {/* "Alle KI-Agenten" Button */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/offer">
                <motion.button
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)"
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">KI-Agenten Anfragen</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 
                               group-hover:opacity-20 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Integration Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Nahtlose Integration mit </span>
              <AnimatedGradientText>Ihren bestehenden IT-Systemen</AnimatedGradientText>
            </h2>
            <p className="text-xl text-gray-400">
              Unsere Tools & KI-Agenten lassen sich mit Ihrer aktuellen Infrastruktur verbinden – 
              von ERP & CRM bis hin zu Cloud- und Sicherheitslösungen.
            </p>
          </motion.div>

          {/* Integration Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Enterprise Systeme",
                icon: "🏢",
                systems: [
                  { name: "SAP", logo: "sap-logo.svg" },
                  { name: "Microsoft Dynamics", logo: "dynamics-logo.svg" },
                  { name: "Oracle", logo: "oracle-logo.svg" },
                  { name: "Salesforce", logo: "salesforce-logo.svg" }
                ]
              },
              {
                title: "Cloud Services",
                icon: "☁️",
                systems: [
                  { name: "AWS", logo: "aws-logo.svg" },
                  { name: "Microsoft Azure", logo: "azure-logo.svg" },
                  { name: "Google Cloud", logo: "gcloud-logo.svg" },
                  { name: "Digital Ocean", logo: "do-logo.svg" }
                ]
              },
              {
                title: "API Integrationen",
                icon: "🔌",
                systems: [
                  { name: "Meta APIs", logo: "meta-logo.svg" },
                  { name: "Google APIs", logo: "google-logo.svg" },
                  { name: "Fireflow", logo: "fireflow-logo.svg" },
                  { name: "Stripe", logo: "stripe-logo.svg" }
                ]
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <GlowingEffect>
                  <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 
                              hover:border-purple-500/50 transition-all duration-300">
                    {/* Category Header */}
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-4xl">{category.icon}</span>
                      <h3 className="text-2xl font-semibold text-white">{category.title}</h3>
                    </div>

                    {/* Integration Grid */}
                    <div className="grid grid-cols-2 gap-4">
                      {category.systems.map((system, i) => (
                        <motion.div
                          key={system.name}
                          whileHover={{ scale: 1.05 }}
                          className="bg-white/5 rounded-xl p-4 flex items-center gap-3 
                                   hover:bg-white/10 transition-colors group cursor-pointer"
                        >
                          <div className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-lg">
                            {/* Placeholder für Logo */}
                            <span className="text-white text-xs">{system.name[0]}</span>
                          </div>
                          <span className="text-gray-400 group-hover:text-white transition-colors">
                            {system.name}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Integration Details Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      className="w-full mt-6 py-3 px-4 rounded-xl bg-white/5 text-gray-400 
                               hover:bg-white/10 hover:text-white transition-all duration-300 
                               border border-white/10 hover:border-purple-500/50"
                    >
                      Mehr Details
                    </motion.button>
                  </div>
                </GlowingEffect>
              </motion.div>
            ))}
          </div>

          {/* Integration Benefits */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {[
              {
                title: "Schnelle Einrichtung",
                icon: "⚡",
                description: "Einfache Integration durch vordefinierte Konnektoren und klare Dokumentation"
              },
              {
                title: "Sicherheit & Compliance",
                icon: "🔒",
                description: "Verschlüsselte Datenübertragung und Einhaltung aller Datenschutzstandards"
              },
              {
                title: "Flexible Anpassung",
                icon: "🔧",
                description: "Individuelle Konfigurationsmöglichkeiten für Ihre spezifischen Anforderungen"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-6"
              >
                <span className="text-4xl mb-4 inline-block">{benefit.icon}</span>
                <h3 className="text-xl font-semibold text-white mb-3">{benefit.title}</h3>
                <p className="text-gray-400">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-20 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              <span className="text-white">Aktuelle </span>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                Tools & News
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Bleiben Sie auf dem Laufenden über die neuesten Entwicklungen in der Welt der Tools.
            </p>
          </div>

          {/* Blog Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                {blogPosts.slice(currentIndex, currentIndex + postsPerPage).map((post, index) => (
                  <motion.div
                    key={post.title}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.5 }}
                    className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(25%-1rem)]"
                  >
                    <Link href={post.link}>
                      <div className={`bg-gradient-to-br ${
                        index % 2 === 0 
                          ? 'from-blue-500 via-indigo-500 to-violet-600' 
                          : 'from-violet-600 via-indigo-500 to-blue-500'
                      } p-[1px] rounded-2xl h-full`}>
                        <div className="bg-gray-900 p-4 rounded-2xl h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10">
                              {post.category.icon}
                            </span>
                            <span className="text-sm text-gray-400">{post.date}</span>
                          </div>

                          <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <img 
                              src={post.image} 
                              alt={post.title}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>

                          <div className="mb-6 flex-grow">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 line-clamp-2">
                              {post.subtitle}
                            </p>
                          </div>

                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                      rounded-lg text-white text-sm font-medium 
                                      hover:shadow-lg transition-all duration-300
                                      relative overflow-hidden group"
                          >
                            <span className="relative z-10">Weiterlesen</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                          group-hover:opacity-20 transition-opacity duration-300" />
                          </motion.button>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentIndex === 0 
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronLeftIcon className={`w-6 h-6 ${
                currentIndex === 0 ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex + postsPerPage >= blogPosts.length}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentIndex + postsPerPage >= blogPosts.length
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronRightIcon className={`w-6 h-6 ${
                currentIndex + postsPerPage >= blogPosts.length ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index * postsPerPage)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentIndex / postsPerPage) === index 
                              ? 'bg-blue-500 w-8' 
                              : 'bg-blue-500/20 hover:bg-blue-500/40'}`}
                  aria-label={`Gehe zu Seite ${index + 1}`}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group
                           shadow-xl shadow-blue-500/20"
                >
                  <span className="relative z-10">Zu unseren News</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                               transition-opacity duration-300" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              <ColourfulText text="Fragen & Antworten zu unseren Tools & KI-Agenten" />
            </h2>
            <p className="text-xl text-gray-400">
              Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Tools und deren Integration
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Welche KI-Agenten sind für mein Unternehmen geeignet?",
                answer: "Die Auswahl der passenden KI-Agenten hängt von Ihren spezifischen Anforderungen und Prozessen ab. In einem kostenlosen Erstgespräch analysieren wir Ihre Bedürfnisse und empfehlen die optimale Kombination aus Tools und Agenten für Ihr Unternehmen."
              },
              {
                question: "Sind Open-Source-Tools wirklich sicher?",
                answer: "Ja, Open-Source-Tools können sehr sicher sein. Wir setzen nur geprüfte und weit verbreitete Open-Source-Lösungen ein, die regelmäßig auf Sicherheitslücken getestet werden. Zusätzlich implementieren wir weitere Sicherheitsmaßnahmen und Monitoring-Systeme."
              },
              {
                question: "Wie funktioniert die Integration in mein bestehendes System?",
                answer: "Die Integration erfolgt schrittweise und ohne Unterbrechung Ihrer laufenden Prozesse. Wir nutzen standardisierte Schnittstellen (APIs) und entwickeln bei Bedarf maßgeschneiderte Konnektoren. Ein dediziertes Entwicklerteam begleitet Sie während der gesamten Implementierungsphase."
              },
              {
                question: "Gibt es eine Testphase für die Tools?",
                answer: "Ja, wir bieten eine Testphase an, in der Sie die Tools in einer kontrollierten Umgebung evaluieren können. So können Sie sich von der Funktionalität und dem Mehrwert für Ihr Unternehmen überzeugen, bevor Sie eine langfristige Entscheidung treffen."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="mb-4"
              >
                <details className="group">
                  <summary className="flex justify-between items-center cursor-pointer bg-white/5 
                                   hover:bg-white/10 p-6 rounded-xl transition-colors duration-300">
                    <span className="text-lg font-medium text-white">{faq.question}</span>
                    <span className="ml-6 flex-shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-300">
                      <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </summary>
                  <div className="mt-3 px-6 pb-6">
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
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
                    <div className="text-white">Bereit für die</div>
                    <div className="font-bold my-4">
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 animate-gradient-x">
                        Zukunft?
                      </span>
                    </div>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns Ihre Prozesse optimieren! Kontaktieren Sie uns für eine individuelle Beratung 
                    und entdecken Sie, wie unsere Tools & KI-Agenten Ihr Unternehmen revolutionieren können.
                  </motion.p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl 
                               text-white text-lg font-medium relative overflow-hidden group"
                      onClick={() => router.push('/offer')}
                    >
                      <span className="relative z-10">Analyse Starten</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                   transition-opacity duration-300" />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl text-white 
                               text-lg font-medium hover:bg-white/10 transition-all duration-300"
                    >
                      24/7 Chat
                    </motion.button>
                  </div>
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
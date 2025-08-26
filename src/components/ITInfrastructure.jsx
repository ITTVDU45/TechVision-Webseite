import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import NetworkAnimation from '@/components/ui/network-animation';
import Vortex from '@/components/ui/vortex';
import AnimatedGradientText from '@/components/ui/animated-gradient-text';
import ColourfulText from "@/components/ui/colourful-text";
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ITInfrastructure() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection in useEffect to avoid SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);

  const blogPosts = [
    {
      title: "Cloud-Infrastruktur Trends 2024",
      subtitle: "Die wichtigsten Entwicklungen im Überblick",
      description: "Erfahren Sie mehr über die neuesten Trends in der Cloud-Technologie und deren Bedeutung für Unternehmen.",
      image: "/images/blog/cloud-trends.jpg",
      category: { name: "Cloud Computing", icon: "☁️" },
      readTime: "5 min Lesezeit",
      date: "15. März 2024",
      link: "/blog/cloud-infrastructure-trends"
    },
    {
      title: "Hybrid Cloud Lösungen",
      subtitle: "On-Premise meets Cloud",
      description: "Wie Sie das Beste aus beiden Welten kombinieren: On-Premise und Cloud-Infrastruktur optimal nutzen.",
      image: "/images/blog/hybrid-cloud.jpg",
      category: { name: "Infrastruktur", icon: "🏗️" },
      readTime: "8 min Lesezeit",
      date: "12. März 2024",
      link: "/blog/hybrid-cloud-solutions"
    },
    {
      title: "Nachhaltige IT-Infrastruktur",
      subtitle: "Green IT im Fokus",
      description: "Nachhaltige Strategien für eine umweltfreundliche IT-Infrastruktur in Ihrem Unternehmen.",
      image: "/images/blog/green-it.jpg",
      category: { name: "Green IT", icon: "🌱" },
      readTime: "6 min Lesezeit",
      date: "10. März 2024",
      link: "/blog/sustainable-it-infrastructure"
    }
  ];

  const visibleBlogPosts = () => {
    return blogPosts.slice(currentBlogIndex, currentBlogIndex + 3);
  };

  // isMobile wird jetzt über useState und useEffect verwaltet
  const postsPerPage = isMobile ? 1 : 3; // Zeige 1 Post auf mobilen Geräten, sonst 3
  const pageCount = Math.ceil(blogPosts.length / postsPerPage);

  const visiblePosts = () => {
    const start = currentBlogIndex;
    const end = start + postsPerPage;
    return blogPosts.slice(start, end);
  };

  const nextSlide = () => {
    if (currentBlogIndex + postsPerPage < blogPosts.length) {
      setCurrentBlogIndex(prev => prev + postsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentBlogIndex > 0) {
      setCurrentBlogIndex(prev => prev - postsPerPage);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
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
              <span className="text-white">Moderne </span>
              <AnimatedGradientText>
                IT-Infrastruktur
              </AnimatedGradientText>
              <span className="text-white"> für Ihr Unternehmen</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Von der strategischen Planung über Beschaffung und Einrichtung bis hin zur Wartung – 
              maßgeschneiderte Lösungen für Ihren Geschäftserfolg.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <GlowingEffect>
                <Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                                 rounded-xl text-lg font-medium relative overflow-hidden group">
                  <span className="relative z-10">Infrastruktur-Analyse starten</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                transition-opacity duration-300" />
                </Link>
              </GlowingEffect>
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

      {/* Services Grid - Ersetzt BentoGrid */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500">
                Unsere Infrastruktur-Lösungen
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Von der strategischen Planung über Beschaffung und Einrichtung bis hin zur Wartung – maßgeschneiderte Lösungen für Ihren Geschäftserfolg.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "NAS Systeme",
                description: "Effiziente Speicherlösungen zur zentralen Verwaltung und schnellen Bereitstellung Ihrer Daten.",
                icon: "💾"
              },
              {
                title: "Microsoft Cloud",
                description: "Skalierbare Cloud-Dienste, die Flexibilität und Sicherheit für Ihre Unternehmensanwendungen bieten.",
                icon: "☁️"
              },
              {
                title: "Windows Server",
                description: "Leistungsstarke Serverlösungen für eine stabile und zuverlässige IT-Infrastruktur.",
                icon: "🖥️"
              },
              {
                title: "File Server",
                description: "Schneller und sicherer Zugriff auf Ihre Unternehmensdateien – ideal für kollaboratives Arbeiten.",
                icon: "📁"
              },
              {
                title: "Backup Server",
                description: "Automatisierte Backups schützen Ihre kritischen Daten und ermöglichen eine schnelle Wiederherstellung im Notfall.",
                icon: "🔄"
              },
              {
                title: "Proxmox Server",
                description: "Virtualisierungslösungen, die eine optimale Nutzung Ihrer IT-Ressourcen ermöglichen.",
                icon: "🔧"
              },
              {
                title: "Overlay Network",
                description: "Flexible und sichere Netzwerkverbindungen, die moderne Kommunikationsprozesse unterstützen.",
                icon: "🌐"
              },
              {
                title: "Firewall",
                description: "Umfassender Schutz Ihrer IT-Infrastruktur vor unbefugtem Zugriff und Cyberbedrohungen.",
                icon: "🛡️"
              },
              {
                title: "Computer",
                description: "Moderne Arbeitsplatzlösungen, individuell an Ihre Anforderungen angepasst.",
                icon: "💻"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 
                         hover:border-blue-500/50 transition-all"
              >
                <div className="text-3xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{service.title}</h3>
                <p className="text-gray-400">{service.description}</p>
              </motion.div>
            ))}
          </div>
          
          {/* Neuer Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <GlowingEffect>
              <Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                               rounded-xl text-lg font-medium relative overflow-hidden group
                               min-w-[200px] z-20">
                <span className="relative z-10">Infrastruktur-Analyse starten</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                              transition-opacity duration-300" />
              </Link>
            </GlowingEffect>
          </motion.div>
        </div>
      </section>

      {/* Strategische Planung & Konzeption */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <img 
                src="/images/Planung.jpg"
                alt="IT Infrastructure Planning"
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400 mb-8">
                Strategische IT-Planung – Ihre Zukunft im Blick
              </h2>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <h3 className="text-xl font-bold text-white mb-2">Strategische Planung & Konzeption</h3>
                <p className="text-gray-400">
                  Wir analysieren Ihre internen Prozesse und entwickeln maßgeschneiderte IT-Konzepte, die auch in Zukunft flexibel erweiterbar sind. Von der IT-Strategie bis zur Sicherheitsplanung stehen wir Ihnen beratend zur Seite.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Leistungen Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500 mb-6">
                Leistungsstarke Server & Skalierbare Storage-Lösungen
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Ob lokal oder in der Cloud – mit modernster Virtualisierungstechnologie optimieren wir Ihre Serverarchitektur und maximieren die Ressourcennutzung. So sichern wir einen reibungslosen Betrieb Ihrer IT-Infrastruktur.
              </p>
              <div className="space-y-6">
                {[
                  {
                    title: "Optimierte Performance",
                    description: "Durch den Einsatz modernster Virtualisierungstechnologien maximieren wir die Ressourcennutzung und garantieren eine hohe Verfügbarkeit sowie schnelle Reaktionszeiten Ihrer IT-Infrastruktur.",
                    icon: "⚡"
                  },
                  {
                    title: "Kosteneffizienz",
                    description: "Flexible Skalierung und automatisierte Prozesse reduzieren Investitions- und Betriebskosten, indem Hardware optimal ausgelastet und zentral verwaltet wird.",
                    icon: "💰"
                  },
                  {
                    title: "Erhöhte Sicherheit",
                    description: "Integrierte Sicherheitsmechanismen sowie regelmäßige, automatisierte Backups schützen Ihre Daten und sorgen für einen störungsfreien und sicheren Betrieb.",
                    icon: "🔒"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all"
                  >
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">{service.title}</h3>
                      <p className="text-gray-400">{service.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img
                src="/images/Server.jpg"
                alt="IT Infrastructure"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vorteile Section */}
      <section className="py-32 bg-gradient-to-b from-black via-blue-900/20 to-black relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500 mb-6">
              Ihre Vorteile
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Mit unseren IT-Infrastrukturlösungen optimieren Sie Ihre Geschäftsprozesse und steigern Ihre Effizienz.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Höchste Sicherheit",
                description: "Modernste Sicherheitsstandards und regelmäßige Updates schützen Ihre IT-Infrastruktur",
                icon: "🔒"
              },
              {
                title: "24/7 Support",
                description: "Unser Expertenteam steht Ihnen rund um die Uhr zur Verfügung",
                icon: "🛟"
              },
              {
                title: "Skalierbarkeit",
                description: "Flexible Lösungen, die mit Ihrem Unternehmen mitwachsen",
                icon: "📈"
              },
              {
                title: "Kosteneffizienz",
                description: "Optimierte Ressourcennutzung und transparente Kostenstruktur",
                icon: "💰"
              },
              {
                title: "Modernste Technologien",
                description: "Einsatz zukunftssicherer und innovativer Technologien",
                icon: "🚀"
              },
              {
                title: "Individuelle Beratung",
                description: "Maßgeschneiderte Lösungen für Ihre spezifischen Anforderungen",
                icon: "🤝"
              }
            ].map((advantage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 
                         transition-all group"
              >
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">
                  {advantage.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {advantage.title}
                </h3>
                <p className="text-gray-400">
                  {advantage.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section id="blog" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Aktuelle </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                IT-Infrastruktur News
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Bleiben Sie auf dem Laufenden über die neuesten Entwicklungen.
            </p>
          </div>

          {/* Blog Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
                {visiblePosts().map((post, index) => (
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
              disabled={currentBlogIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentBlogIndex === 0 
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronLeftIcon className={`w-6 h-6 ${
                currentBlogIndex === 0 ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentBlogIndex + postsPerPage >= blogPosts.length}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentBlogIndex + postsPerPage >= blogPosts.length
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronRightIcon className={`w-6 h-6 ${
                currentBlogIndex + postsPerPage >= blogPosts.length ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBlogIndex(index * postsPerPage)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentBlogIndex / postsPerPage) === index 
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
              <ColourfulText text="Häufig gestellte Fragen zur IT-Infrastruktur" />
            </h2>
            <p className="text-xl text-gray-400">
              Finden Sie Antworten auf die wichtigsten Fragen zu unseren IT-Infrastrukturlösungen
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              {
                question: "Wie lange dauert die Implementierung einer neuen IT-Infrastruktur?",
                answer: "Die Implementierungsdauer variiert je nach Umfang und Komplexität des Projekts. Typischerweise rechnen wir mit 2-6 Monaten für eine vollständige Implementierung. Wir arbeiten dabei in Phasen und stellen sicher, dass Ihr Geschäftsbetrieb während der Umstellung nicht beeinträchtigt wird."
              },
              {
                question: "Welche Wartungsleistungen sind im Service enthalten?",
                answer: "Unser Wartungsservice umfasst regelmäßige Updates, Sicherheitspatches, Performance-Monitoring, Backup-Überprüfungen und proaktive Systemwartung. Zusätzlich bieten wir 24/7 Support und schnelle Reaktionszeiten bei technischen Problemen."
              },
              {
                question: "Wie wird die Datensicherheit gewährleistet?",
                answer: "Wir setzen auf mehrschichtige Sicherheitskonzepte, including Firewalls, Verschlüsselung, regelmäßige Backups und Zugriffskontrollen. Alle Maßnahmen entsprechen den aktuellen Datenschutzrichtlinien und Branchenstandards."
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Disclosure>
                  {({ open }) => (
                    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                      <Disclosure.Button className="flex justify-between items-center w-full px-6 py-4">
                        <span className="text-lg font-medium text-white">{faq.question}</span>
                        <ChevronDownIcon
                          className={`w-5 h-5 text-blue-400 transform transition-transform duration-200 ${
                            open ? 'rotate-180' : ''
                          }`}
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="px-6 py-4 text-gray-400 border-t border-white/10">
                        {faq.answer}
                      </Disclosure.Panel>
                    </div>
                  )}
                </Disclosure>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
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
                    className="text-center text-4xl md:text-6xl mb-8 md:mb-10 flex flex-wrap justify-center items-center gap-x-3"
                  >
                    <span className="font-bold text-white">Bereit für Ihre</span>
                    <AnimatedGradientText>IT-Zukunft</AnimatedGradientText>
                    <span className="font-bold text-white">?</span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihre IT-Infrastruktur optimieren und zukunftssicher gestalten.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                                   rounded-xl text-lg font-medium relative overflow-hidden group
                                   min-w-[200px] z-20">
                      <span className="relative z-10">Infrastruktur-Analyse starten</span>
                      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                  transition-opacity duration-300" />
                    </Link>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>

        {/* Hintergrund-Effekt */}
        <div className="absolute inset-0 opacity-30">
          <NetworkAnimation />
        </div>
      </section>

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  );
} 
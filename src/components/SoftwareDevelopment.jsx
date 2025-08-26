import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import { GlowingEffect } from '@/components/ui/glowing-effect';
import Vortex from '@/components/ui/vortex';
import ColourfulText from "@/components/ui/colourful-text";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useRouter } from 'next/navigation';

export default function SoftwareDevelopment() {
  const blogPosts = [
    {
      title: "Aktuelle Trends in der Softwareentwicklung",
      excerpt: "Entdecken Sie die neuesten Trends und Technologien, die die Softwareentwicklung revolutionieren.",
      image: "/images/blog/trends.jpg",
      category: "Trends",
      date: "20. März 2024",
      link: "/blog/trends"
    },
    {
      title: "Best Practices für erfolgreiche Projekte",
      excerpt: "Erfahren Sie, wie Sie Ihre Softwareprojekte effizient und erfolgreich umsetzen können.",
      image: "/images/blog/best-practices.jpg",
      category: "Best Practices",
      date: "18. März 2024",
      link: "/blog/best-practices"
    },
    {
      title: "Erfolgsgeschichten aus unseren Projekten",
      excerpt: "Lesen Sie, wie wir unseren Kunden geholfen haben, ihre Ziele zu erreichen.",
      image: "/images/blog/success-stories.jpg",
      category: "Case Studies",
      date: "15. März 2024",
      link: "/blog/success-stories"
    }
  ];

  const router = useRouter();

  const navigateToOfferPage = () => {
    router.push('/offer');
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
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
              <span className="text-white">Softwareentwicklung – </span>
              <AnimatedGradientText>
                Von der Idee bis zur Integration
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Wir begleiten Sie durch den gesamten Prozess: von ersten Skizzen 
              und detaillierter Planung bis hin zur Programmierung und nahtlosen Integration.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <button 
                  onClick={navigateToOfferPage}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                >
                  Softwareanfrage starten
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

      {/* Referenzen Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/20 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="mb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
              <div>
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-4xl md:text-5xl font-bold"
                >
                  Erfolgreiche Projekte
                  <span className="text-white block mt-2">aus unserer Softwareentwicklung</span>
                </motion.h2>
              </div>
              <div>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-xl text-gray-400 leading-relaxed"
                >
                  Entdecken Sie unsere Referenzen – von Mitarbeiter-Apps über CRM-Lösungen 
                  bis hin zu speziellen Branchenanwendungen.
                </motion.p>
              </div>
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Mitarbeiter App",
                description: "Moderne App-Lösungen für interne Kommunikation und Organisation.",
                icon: "👥",
                color: "from-blue-500 to-blue-600"
              },
              {
                title: "CRM für IT Unternehmen",
                description: "Effiziente CRM-Systeme für IT-Dienstleister.",
                icon: "💼",
                color: "from-indigo-500 to-indigo-600"
              },
              {
                title: "KI-Agenten CRM",
                description: "Innovative CRM-Lösungen mit integrierten KI-Agenten.",
                icon: "🤖",
                color: "from-purple-500 to-purple-600"
              },
              {
                title: "Matching Business KI",
                description: "Intelligente Matching-Lösungen für Geschäftspartner.",
                icon: "🔄",
                color: "from-cyan-500 to-cyan-600"
              },
              {
                title: "Kanzlei Software",
                description: "Maßgeschneiderte Softwarelösungen für Kanzleien.",
                icon: "⚖️",
                color: "from-teal-500 to-teal-600"
              },
              {
                title: "Gutachtersoftware",
                description: "Digitale Tools für effiziente Gutachtenverwaltung.",
                icon: "📋",
                color: "from-emerald-500 to-emerald-600"
              }
            ].map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="group relative bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300">
                  {/* Project Icon */}
                  <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    {project.icon}
                  </div>

                  {/* Project Title */}
                  <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Project Description */}
                  <p className="text-gray-400 leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
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
                onClick={navigateToOfferPage}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Softwareanfrage starten
              </button>
            </GlowingEffect>
          </motion.div>
        </div>
      </section>

      {/* Vorteile Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <div className="max-w-4xl mx-auto text-center mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              So läuft unser Prozess
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 leading-relaxed"
            >
              Von der Ideenfindung über die detaillierte Planung bis zur Programmierung und Integration – 
              unser strukturierter Ansatz sichert den Erfolg Ihres Projekts.
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative max-w-5xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-gradient-to-b from-blue-500/50 via-indigo-500/50 to-purple-500/50" />

            {[
              {
                title: "Skizze & Konzept",
                description: "Erfassung der Anforderungen, Brainstorming und erste Ideenentwicklung.",
                icon: "✏️",
                gradient: "from-blue-500 to-blue-600"
              },
              {
                title: "Planung & Prototyping",
                description: "Detaillierte Planung, Erstellung von Wireframes und interaktiven Prototypen.",
                icon: "🎯",
                gradient: "from-indigo-500 to-indigo-600"
              },
              {
                title: "Programmierung",
                description: "Implementierung der Lösung mit modernsten Technologien und agilen Methoden.",
                icon: "💻",
                gradient: "from-purple-500 to-purple-600"
              },
              {
                title: "Integration & Testing",
                description: "Nahtlose Integration in Ihre bestehende IT-Landschaft und umfassende Qualitätsprüfungen.",
                icon: "🔄",
                gradient: "from-cyan-500 to-cyan-600"
              },
              {
                title: "Launch & Support",
                description: "Bereitstellung der fertigen Software und kontinuierlicher Support zur Optimierung.",
                icon: "🚀",
                gradient: "from-teal-500 to-teal-600"
              }
            ].map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className={`relative flex items-center gap-8 mb-12 ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                  <div className="bg-gray-900/50 backdrop-blur-sm rounded-2xl p-6 border border-white/10 
                                hover:border-white/20 transition-all duration-300 group">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Icon */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${step.gradient} 
                                flex items-center justify-center text-2xl
                                border-4 border-black transition-transform duration-300
                                hover:scale-110 z-10`}>
                    {step.icon}
                  </div>
                </div>

                {/* Empty space for the other side */}
                <div className="w-1/2" />
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
                onClick={navigateToOfferPage}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
              >
                Softwareanfrage starten
              </button>
            </GlowingEffect>
          </motion.div>
        </div>
      </section>



      {/* CTA Section */}
      <CTASection />

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  );
}

// CTA Section
const CTASection = () => {
  const router = useRouter();

  const navigateToOfferPage = () => {
    router.push('/offer');
  };

  return (
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
                  <div className="text-white">Bereit für Ihr</div>
                  <div className="font-bold my-4">
                    <ColourfulText text="nächstes Projekt" />
                  </div>
                </motion.h2>
                
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                >
                  Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. 
                  Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                >
                  <button 
                    onClick={navigateToOfferPage}
                    className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 
                               rounded-xl text-lg font-medium relative overflow-hidden group
                               min-w-[200px]"
                  >
                    <span className="relative z-10">Projekt starten</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                                transition-opacity duration-300" />
                  </button>
                  
                  <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 
                                 rounded-xl text-lg font-medium relative overflow-hidden group
                                 min-w-[200px]">
                    <span className="relative z-10">24/7 Chat</span>
                    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 
                                transition-opacity duration-300" />
                  </button>
                </motion.div>
              </div>
            </Vortex>
          </div>
        </GlowingEffect>
      </div>
    </section>
  );
}; 
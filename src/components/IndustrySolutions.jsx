"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import ColourfulText from "@/components/ui/colourful-text";
import AnimatedGradientText from "@/components/ui/animated-gradient-text";
import Header from '@/components/Header.jsx';
import Footer from '@/components/Footer.jsx';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function IndustrySolutions() {
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();

  const industries = [
    {
      id: 'legal',
      name: 'Rechtswesen',
      description: 'Digitale Transformation für Anwaltskanzleien',
      icon: '⚖️',
      solutions: [
        'Fallmanagement-Systeme',
        'Dokumentenverwaltung',
        'Mandantenportale',
        'KI-gestützte Rechtsrecherche'
      ],
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'retail',
      name: 'Einzelhandel & E-Commerce',
      description: 'Moderne Lösungen für den digitalen Handel',
      icon: '🛍️',
      solutions: [
        'Omnichannel-Strategien',
        'KI-gestützte Preisoptimierung',
        'Lagerverwaltung',
        'Kundenanalyse'
      ],
      color: 'from-purple-500 to-pink-500'
    },

    {
      id: 'railway',
      name: 'Bahndienstleistungen',
      description: 'Digitale Lösungen für die Eisenbahnbranche',
      icon: '🚂',
      solutions: [
        'Fahrgastinformationssysteme',
        'Betriebsleitsysteme',
        'Wartungsplanung',
        'Sicherheitsmanagement'
      ],
      color: 'from-red-500 to-orange-500'
    }
  ];

  const filteredIndustries = activeTab === 'all' 
    ? industries 
    : industries.filter(industry => industry.id === activeTab);

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 animate-gradient bg-[length:200%_200%]" />
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
              <span className="text-white">Branchenspezifische </span>
              <span className="block">
                <AnimatedGradientText>
                  IT-Lösungen
                </AnimatedGradientText>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Wir entwickeln maßgeschneiderte Lösungen, die perfekt auf die Anforderungen 
              Ihrer Branche abgestimmt sind.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <button
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300"
                  onClick={() => router.push('/contact')}
                >
                  Branchenlösung anfragen
                </button>
              </GlowingEffect>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filter Tabs */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                activeTab === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Alle Branchen
            </button>
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setActiveTab(industry.id)}
                className={`px-6 py-3 rounded-lg font-medium transition-all ${
                  activeTab === industry.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {industry.icon} {industry.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredIndustries.map((industry, index) => (
              <motion.div
                key={industry.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className={`bg-gradient-to-br ${industry.color} p-[1px] rounded-2xl`}>
                  <div className="bg-gray-900 p-8 rounded-2xl h-full hover:bg-gray-800 transition-all duration-300">
                    {/* Icon */}
                    <div className="text-6xl mb-6">{industry.icon}</div>
                    
                    {/* Title */}
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {industry.name}
                    </h3>
                    
                    {/* Description */}
                    <p className="text-gray-400 mb-6 leading-relaxed">
                      {industry.description}
                    </p>
                    
                    {/* Solutions List */}
                    <ul className="space-y-3 mb-8">
                      {industry.solutions.map((solution, idx) => (
                        <li key={idx} className="flex items-center text-gray-300">
                          <span className="w-2 h-2 bg-blue-500 rounded-full mr-3" />
                          {solution}
                        </li>
                      ))}
                    </ul>
                    
                    {/* CTA Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-full py-3 px-6 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg text-white font-medium hover:shadow-lg transition-all"
                      onClick={() => router.push(`/industry-solutions/${industry.id}`)}
                    >
                      Mehr dazu
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold mb-8"
            >
              <span className="text-white">Bereit für Ihre </span>
              <ColourfulText text="Branchenlösung?" />
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-12 leading-relaxed"
            >
              Lassen Sie uns gemeinsam die perfekte IT-Lösung für Ihre Branche entwickeln. 
              Wir beraten Sie gerne und erstellen ein maßgeschneidertes Konzept.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
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
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

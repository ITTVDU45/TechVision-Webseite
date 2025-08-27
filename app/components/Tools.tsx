"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from './ui/animated-gradient-text';
import { GlowingEffect } from './ui/glowing-effect';
import Vortex from './ui/vortex';
import ColourfulText from './ui/colourful-text';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Header from './Header';
import Footer from './Footer';

export default function Tools(): JSX.Element {
  const [currentAgentIndex, setCurrentAgentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    if (typeof window !== 'undefined') setIsMobile(window.innerWidth < 768);
  }, []);
  
  const slideCount = isMobile ? 1 : 3;

  const agents = [
    { name: 'Personal Assistant', icon: '👤', description: 'Automatisierte Unterstützung für Terminplanung, E-Mails, Aufgaben und persönliche Organisation.', features: ['Intelligente Kalenderverwaltung', 'E-Mail-Priorisierung', 'Task-Management'] },
    { name: 'Juristische KI-Agenten', icon: '⚖️', description: 'Spezialisierte KI für Anwaltskanzleien & rechtliche Prozesse.', features: ['Fallanalyse & Dokumentengenerierung', 'Automatisierte Vertragsprüfung', 'Rechtsauskunft & Mandantenkommunikation'] },
    { name: 'Unternehmensberater-KI', icon: '📊', description: 'Unterstützt Berater bei Datenanalysen, Strategieentwicklung & Prozessoptimierung.', subAgents: [{ name: 'Finanz-KI', description: 'Automatische Kosten-Nutzen-Analysen' }] },
    { name: 'Telefonbesprechungs-KI', icon: '📞', description: 'Automatisierte Kundenservice-KI für Telefonsupport, Terminvereinbarungen & Beschwerden.', features: ['Sprach- und Textanalyse', 'CRM-Integration', 'Automatische Ticketerstellung'] },
  ];

  const visibleAgents = () => agents.slice(currentAgentIndex, currentAgentIndex + slideCount);

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);

  const blogPosts = [
    { title: 'KI-Tools im Unternehmenseinsatz', subtitle: 'Effizienzsteigerung durch moderne Technologie', description: 'Wie moderne Tools die Effizienz in Unternehmen steigern können.', image: '/images/blog/ki-tools.jpg', category: { name: 'Best Practices', icon: '💡' }, readTime: '5 min', date: '20. März 2024', link: '/blog/ki-tools' },
  ];

  const visibleBlogPosts = () => blogPosts.slice(currentBlogIndex, currentBlogIndex + 3);

  const router = useRouter();

  useEffect(() => {
    const handleResize = () => { if (typeof window !== 'undefined') setIsMobile(window.innerWidth < 768); };
    if (typeof window !== 'undefined') window.addEventListener('resize', handleResize);
    return () => { if (typeof window !== 'undefined') window.removeEventListener('resize', handleResize); };
  }, []);

  const postsPerPage = isMobile ? 1 : 3;
  const pageCount = Math.ceil(blogPosts.length / postsPerPage);
  const [currentIndex, setCurrentIndex] = useState(0);

  const visiblePosts = () => { const start = currentIndex; const end = start + postsPerPage; return blogPosts.slice(start, end); };

  const nextSlide = () => { if (currentIndex + postsPerPage < blogPosts.length) setCurrentIndex(prev => prev + postsPerPage); };
  const prevSlide = () => { if (currentIndex > 0) setCurrentIndex(prev => prev - postsPerPage); };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-blue-600 to-teal-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Unsere Tools & KI-Agenten – </span>
              <AnimatedGradientText>Effiziente Lösungen für Ihr Business</AnimatedGradientText>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">Von Open-Source-Software bis hin zu intelligenten KI-Agenten – wir bieten die richtigen Werkzeuge für Automatisierung, Produktivität und digitales Wachstum.</motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <GlowingEffect>
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { if (typeof window !== 'undefined') document.getElementById('open-source-tools')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-lg font-medium relative overflow-hidden group cursor-pointer"><span className="relative z-10">Alle Tools entdecken</span></motion.button>
              </GlowingEffect>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => { if (typeof window !== 'undefined') document.getElementById('ki-agenten')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }} className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-xl text-lg font-medium relative overflow-hidden group cursor-pointer"><span className="relative z-10">KI-Agenten</span></motion.button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* rest of content shortened for brevity - uses local UI components */}

      <Footer />
    </div>
  );
}



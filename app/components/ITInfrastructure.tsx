"use client";
import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';
import NetworkAnimation from './ui/network-animation';
import Vortex from './ui/vortex';
import AnimatedGradientText from './ui/animated-gradient-text';
import ColourfulText from './ui/colourful-text';
import Link from 'next/link';
import { Disclosure } from '@headlessui/react';
import { ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import Header from './Header';
import Footer from './Footer';

export default function ITInfrastructure(): JSX.Element {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);

  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => { setIsMobile(typeof window !== 'undefined' && window.innerWidth < 768); }, []);

  const blogPosts = [
    { title: 'Cloud-Infrastruktur Trends 2024', subtitle: 'Die wichtigsten Entwicklungen im Überblick', description: 'Erfahren Sie mehr über die neuesten Trends in der Cloud-Technologie und deren Bedeutung für Unternehmen.', image: '/images/blog/cloud-trends.jpg', category: { name: 'Cloud Computing', icon: '☁️' }, readTime: '5 min Lesezeit', date: '15. März 2024', link: '/blog/cloud-infrastructure-trends' }
  ];

  const postsPerPage = isMobile ? 1 : 3;

  const visiblePosts = () => blogPosts.slice(currentBlogIndex, currentBlogIndex + postsPerPage);
  const nextSlide = () => { if (currentBlogIndex + postsPerPage < blogPosts.length) setCurrentBlogIndex(prev => prev + postsPerPage); };
  const prevSlide = () => { if (currentBlogIndex > 0) setCurrentBlogIndex(prev => prev - postsPerPage); };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20"><div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" /><div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" /></div>
        <div className="container mx-auto px-4 py-32 relative z-10"><div className="max-w-5xl mx-auto text-center"><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6"><span className="text-white">Moderne </span><AnimatedGradientText>IT-Infrastruktur</AnimatedGradientText><span className="text-white"> für Ihr Unternehmen</span></motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">Von der strategischen Planung über Beschaffung und Einrichtung bis hin zur Wartung – maßgeschneiderte Lösungen für Ihren Geschäftserfolg.</motion.p><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center items-center"><GlowingEffect><Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-lg font-medium relative overflow-hidden group"><span className="relative z-10">Infrastruktur-Analyse starten</span></Link></GlowingEffect></motion.div></div></div>
      </section>
      <section className="py-32 relative"><div className="container mx-auto px-4"><div className="text-center mb-16"><h2 className="text-3xl md:text-4xl font-bold mb-6"><span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-blue-500">Unsere Infrastruktur-Lösungen</span></h2><p className="text-xl text-gray-400 max-w-3xl mx-auto">Von der strategischen Planung über Beschaffung und Einrichtung bis hin zur Wartung – maßgeschneiderte Lösungen für Ihren Geschäftserfolg.</p></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">{['NAS Systeme','Microsoft Cloud','Windows Server','File Server','Backup Server','Proxmox Server','Overlay Network','Firewall','Computer'].map((title, index) => (<motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-all"><div className="text-3xl mb-4">🛠️</div><h3 className="text-xl font-bold text-white mb-2">{title}</h3><p className="text-gray-400">Kurze Beschreibung zu {title}</p></motion.div>))}</div><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-16"><GlowingEffect><Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-lg font-medium min-w-[200px]"><span className="relative z-10">Infrastruktur-Analyse starten</span></Link></GlowingEffect></motion.div></div></section>
      <Footer />
    </div>
  );
}



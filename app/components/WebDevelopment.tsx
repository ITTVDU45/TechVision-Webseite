"use client";
import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import AnimatedGradientText from './ui/animated-gradient-text';
import Vortex from './ui/vortex';
import { GlowingEffect } from './ui/glowing-effect';
import Link from 'next/link';

type CaseStudy = { title: string; description: string; image?: string; gradient?: string; stats?: { value: string; label: string }[] };

const webDevBlogPosts = [
  { title: 'Modern Web Development', excerpt: 'Die neuesten Trends in der Webentwicklung mit React und Next.js', image: '/images/blog/web-dev.jpg', category: 'Development', date: '20. März 2024', gradient: 'from-blue-500 to-indigo-500', link: '/blog/web-development' },
  { title: 'Performance Optimierung', excerpt: 'Strategien zur Verbesserung der Website-Performance und Core Web Vitals', image: '/images/blog/performance.jpg', category: 'Optimierung', date: '18. März 2024', gradient: 'from-indigo-500 to-purple-500', link: '/blog/performance-optimization' }
];

const CaseCard: React.FC<{ cs: CaseStudy }> = ({ cs }) => (
  <div className="bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
    <p className="text-neutral-300 text-base md:text-2xl font-sans max-w-3xl mx-auto"><span className="font-bold text-white">{cs.title}</span> {cs.description}</p>
    {cs.image && <img src={cs.image} alt={cs.title} className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8" />}
  </div>
);

export default function WebDevelopment(): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(-1);

  const caseStudies: CaseStudy[] = [
    { title: 'E-Commerce Platform', description: 'Entwicklung eines modernen Online-Shops mit Next.js und Shopify', image: '/images/case-study-1.jpg', gradient: 'from-blue-500 via-indigo-500 to-violet-600' },
    { title: 'Corporate Website', description: 'Responsive Unternehmenswebsite mit React und Tailwind CSS', image: '/images/case-study-2.jpg', gradient: 'from-violet-500 via-indigo-500 to-blue-600' }
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <section className="min-h-screen relative overflow-hidden bg-black flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-white">Webentwicklung der </span>
              <AnimatedGradientText>nächsten Generation</AnimatedGradientText>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">
              Moderne Weblösungen mit Fokus auf Performance, Benutzerfreundlichkeit und Skalierbarkeit.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}>
              <GlowingEffect>
                <Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">Webseitenprojekt anfragen</Link>
              </GlowingEffect>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">Expertise</span></h2>
            </div>
            <div><p className="text-xl text-gray-400 leading-relaxed">Wir kombinieren modernste Technologien mit bewährten Entwicklungspraktiken, um skalierbare und performante Webanwendungen zu erstellen.</p></div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {caseStudies.map((cs, index) => <CaseCard key={index} cs={cs} />)}
        </div>
      </section>

      <section className="py-32 bg-black">
        {/* Carousel / Testimonials could be inserted here */}
      </section>

      <Footer />
    </div>
  );
}



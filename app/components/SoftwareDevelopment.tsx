"use client";
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from './ui/animated-gradient-text';
import { GlowingEffect } from './ui/glowing-effect';
import Vortex from './ui/vortex';
import ColourfulText from './ui/colourful-text';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/navigation';

type SoftwareDevelopmentProps = {};

export default function SoftwareDevelopment(_props: SoftwareDevelopmentProps): JSX.Element {
  const blogPosts = [
    { title: 'Aktuelle Trends in der Softwareentwicklung', excerpt: 'Entdecken Sie die neuesten Trends und Technologien, die die Softwareentwicklung revolutionieren.', image: '/images/blog/trends.jpg', category: 'Trends', date: '20. März 2024', link: '/blog/trends' },
  ];

  const router = useRouter();
  const navigateToOfferPage = () => router.push('/offer');

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6"><span className="text-white">Softwareentwicklung – </span><AnimatedGradientText>Von der Idee bis zur Integration</AnimatedGradientText></motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed">Wir begleiten Sie durch den gesamten Prozess: von ersten Skizzen und detaillierter Planung bis hin zur Programmierung und nahtlosen Integration.</motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }}><GlowingEffect><button onClick={navigateToOfferPage} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl text-lg font-medium hover:shadow-lg transition-all duration-300">Softwareanfrage starten</button></GlowingEffect></motion.div>
          </div>
        </div>
      </section>

      {/* References & CTA */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div><motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-5xl font-bold">Erfolgreiche Projekte<span className="text-white block mt-2">aus unserer Softwareentwicklung</span></motion.h2></div>
            <div><motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-xl text-gray-400 leading-relaxed">Entdecken Sie unsere Referenzen – von Mitarbeiter-Apps über CRM-Lösungen bis hin zu speziellen Branchenanwendungen.</motion.p></div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  );
}

const CTASection: React.FC = () => {
  const router = useRouter();
  const navigateToOfferPage = () => router.push('/offer');
  return (
    <section className="py-32 bg-black relative overflow-hidden"><div className="container mx-auto px-4"><GlowingEffect blur={20} spread={150} proximity={150} className="max-w-6xl mx-auto"><div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500"><Vortex backgroundColor="rgba(0,0,0,0.7)" rangeY={800} particleCount={300} baseHue={220} className="flex min-h-[600px] w-full flex-col items-center justify-center"><div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24"><motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-center text-4xl md:text-6xl mb-8 md:mb-10"><div className="text-white">Bereit für Ihr</div><div className="font-bold my-4"><ColourfulText text="nächstes Projekt" /></div></motion.h2><motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16">Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. Kontaktieren Sie uns noch heute für eine unverbindliche Beratung.</motion.p><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="flex flex-col sm:flex-row gap-6 justify-center items-center"><button onClick={navigateToOfferPage} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl text-white text-lg font-medium relative overflow-hidden group min-w-[200px]"><span className="relative z-10">Projekt starten</span></button><button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white text-lg font-medium relative overflow-hidden group min-w-[200px]"><span className="relative z-10">24/7 Chat</span></button></motion.div></div></Vortex></div></GlowingEffect></div></section>
  );
};



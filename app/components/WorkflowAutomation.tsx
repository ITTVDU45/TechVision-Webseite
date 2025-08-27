"use client";
import React from 'react';
import { motion } from 'framer-motion';
import AnimatedGradientText from './ui/animated-gradient-text';
import { GlowingEffect } from './ui/glowing-effect';
import Vortex from './ui/vortex';
import ColourfulText from './ui/colourful-text';
import { Disclosure } from '@headlessui/react';
import Header from './Header';
import Footer from './Footer';
import { useRouter } from 'next/navigation';

export default function WorkflowAutomation(): JSX.Element {
  const router = useRouter();

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        <div className="absolute inset-0 opacity-20"><div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient bg-[length:200%_200%]" /><div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" /></div>
        <div className="container mx-auto px-4 py-32 relative z-10"><div className="max-w-5xl mx-auto text-center"><motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="text-4xl md:text-6xl font-bold mb-6"><span className="text-white">Workflow Automatisierung – </span><AnimatedGradientText>Intelligente Prozesse, maximale Effizienz</AnimatedGradientText></motion.h1><motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">Optimieren Sie Ihre Geschäftsprozesse mit KI-Agenten und modernsten Automatisierungstools.</motion.p><motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex justify-center gap-6"><GlowingEffect><button className="px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-xl text-lg font-medium hover:shadow-lg" onClick={() => router.push('/offer')}>Prozessanalyse starten</button></GlowingEffect></motion.div></div></div>
      </section>
      {/* ...rest omitted for brevity, uses local UI components*/}
      <Footer />
    </div>
  );
}



"use client";
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform } from 'framer-motion';
import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';

gsap.registerPlugin(ScrollTrigger);

type Props = {
  isLoading?: boolean;
}

export default function HeroSection({ isLoading = false }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll();
  const router = useRouter();

  const rotateX = useTransform(scrollYProgress, [0, 0.5], [0, 50]);
  const rotateY = useTransform(scrollYProgress, [0, 0.5], [0, 20]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const perspective = "1000px";

  useEffect(() => {
    if (!isLoading) {
      const initialAnimation = gsap.timeline({ delay: 0.5 });
      if (textRef.current) {
        initialAnimation.fromTo(textRef.current.children,
          { opacity: 0, y: 100, rotateX: 45, transformPerspective: 1000 },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, stagger: 0.2, ease: "power3.out" }
        );
      }
    }
  }, [isLoading]);

  const scrollToServices = () => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) servicesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const navigateToOfferPage = () => router.push('/offer');

  return (
    <section ref={heroRef} className="h-screen flex items-end justify-start relative overflow-hidden bg-black">
      <div className="absolute inset-0 z-0">
        <Spline scene="https://prod.spline.design/Ijn60NuaQiGIVPWQ/scene.splinecode" style={{ width: '100%', height: '100%', transform: 'scale(1.3)', transformOrigin: 'center center' }} />
      </div>

      <motion.div ref={textRef} className="z-10 relative px-8 md:px-16 pb-20 md:pb-32 max-w-3xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ perspective, rotateX, rotateY, scale }}>
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 text-white [text-shadow:_0_4px_12px_rgba(0,0,0,0.5)] leading-tight" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <span className="whitespace-nowrap">Ihr Vorsprung durch</span>{' '}Automatisierung und KI-Transformation
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-gray-300 mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.5)]" whileHover={{ scale: 1.02 }}>
          Lassen Sie Technologie für Sie arbeiten – intelligenter, schneller, effizienter.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-4">
          <motion.button onClick={scrollToServices} className="px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-lg text-lg font-medium relative overflow-hidden group" whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(59, 130, 246, 0.4)' }} whileTap={{ scale: 0.95 }}>
            <span className="relative z-10">Unsere Lösungen entdecken</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          </motion.button>

          <motion.button onClick={navigateToOfferPage} className="px-8 py-4 border-2 border-white/30 rounded-lg text-lg font-medium relative overflow-hidden group bg-black/30 backdrop-blur-sm" whileHover={{ scale: 1.05, boxShadow: '0 0 10px rgba(255, 255, 255, 0.1)' }} whileTap={{ scale: 0.95 }}>
            <span className="relative z-10">Jetzt Angebot einholen</span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
          </motion.button>
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent pointer-events-none z-[1]" />
    </section>
  );
}

// wrapper removed; local implementation above is the source of truth

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

      <motion.div ref={textRef} className="z-10 relative px-8 md:px-16 pb-28 md:pb-52 max-w-3xl" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} style={{ perspective, rotateX, rotateY, scale }}>
        <motion.h1 className="text-4xl md:text-6xl font-bold mb-4 text-white [text-shadow:_0_4px_12px_rgba(0,0,0,0.5)] leading-tight" whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300 }}>
          <span className="whitespace-nowrap">Ihr Vorsprung durch</span>{' '}Automatisierung und KI-Transformation
        </motion.h1>

        <motion.p className="text-lg md:text-xl text-gray-300 mb-8 [text-shadow:_0_2px_8px_rgba(0,0,0,0.5)]" whileHover={{ scale: 1.02 }}>
          Lassen Sie Technologie für Sie arbeiten – intelligenter, schneller, effizienter.
        </motion.p>

        <div className="flex flex-col md:flex-row gap-5">
          <motion.button
            onClick={navigateToOfferPage}
            className="px-8 py-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white rounded-full text-lg font-bold flex items-center gap-2 transition-all shadow-lg hover:shadow-blue-500/20"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            kostenloses Erstgespräch vereinbaren
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
            </svg>
          </motion.button>

          <motion.button
            onClick={() => {
              const el = document.getElementById('success-stories');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-4 border border-white/40 rounded-full text-lg font-bold text-white hover:bg-white/10 transition-all backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Referenzen
          </motion.button>
        </div>
      </motion.div>

      {/* Floating Logo Bar */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-4 left-0 right-0 z-20 hidden md:flex justify-center px-8"
      >
        <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 flex items-center justify-center gap-12 md:gap-20 group relative overflow-hidden max-w-5xl w-full">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {[
            { src: '/images/white-linqint-logo.png', alt: 'Linqint' },
            { src: '/images/RechtlyLogo.png', alt: 'Rechtly' },
            { src: '/images/PikoshLogo.png', alt: 'Pikosh' },
            { src: '/images/ViusLogo.png', alt: 'Vius' },
            { src: '/images/planenadler-logo-white.png', alt: 'Planenadler' }
          ].map((logo, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1, y: -2 }}
              className="relative flex items-center justify-center"
            >
              <img
                src={logo.src}
                alt={logo.alt}
                className="h-7 md:h-9 w-auto object-contain opacity-40 grayscale group-hover:opacity-100 group-hover:grayscale-0 transition-all duration-500"
              />
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent pointer-events-none z-[1]" />
    </section>
  );
}

// wrapper removed; local implementation above is the source of truth

"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import gsap from 'gsap';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePreferLightEffects } from '@/hooks/usePreferLightEffects';

const narrowHeroQuery = '(max-width: 767px)';
const heroMobileImageSrc = '/images/aitelefonie.jpg';

const HeroSpline = dynamic(() => import('./HeroSpline'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-gradient-to-br from-slate-950 via-black to-slate-900"
      aria-hidden
    />
  ),
});

/** Unternehmens-Logo-Leiste unter dem Hero – vorübergehend aus; auf `true` setzen, wenn Logos/Daten aktualisiert sind. */
const SHOW_HERO_TRUST_LOGOS = false;

type Props = {
  isLoading?: boolean;
}

export default function HeroSection({ isLoading = false }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [isNarrowHero, setIsNarrowHero] = useState(false);
  const preferLightEffects = usePreferLightEffects();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(narrowHeroQuery);
    const sync = () => {
      const narrow = mq.matches;
      setIsNarrowHero(narrow);
      if (narrow) setShouldRenderSpline(false);
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    if (preferLightEffects) return;
    if (typeof window !== "undefined" && window.matchMedia(narrowHeroQuery).matches) return;

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }

    let idleId: number | null = null
    let usedIdleCallback = false
    const startSpline = () => {
      if (typeof win.requestIdleCallback === "function") {
        usedIdleCallback = true
        idleId = win.requestIdleCallback(() => setShouldRenderSpline(true), { timeout: 250 });
        return;
      }
      idleId = window.setTimeout(() => setShouldRenderSpline(true), 16);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        startSpline();
        observer.disconnect();
      },
      { root: null, rootMargin: "350px 0px", threshold: 0.01 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (idleId === null) return;
      if (usedIdleCallback && typeof win.cancelIdleCallback === "function") {
        win.cancelIdleCallback(idleId);
        return;
      }
      window.clearTimeout(idleId);
    };
  }, [preferLightEffects]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const router = useRouter();

  const light = reduceMotion || preferLightEffects || isNarrowHero;
  const rotateX = useTransform(scrollYProgress, [0, 1], [0, light ? 0 : 12]);
  const rotateY = useTransform(scrollYProgress, [0, 1], [0, light ? 0 : 6]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, light ? 1 : 0.94]);
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
    <section
      id="hero"
      ref={heroRef}
      className="min-h-[100dvh] h-[100dvh] flex items-end justify-start relative overflow-hidden bg-black [contain:layout_paint]"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 md:hidden">
          <Image
            src={heroMobileImageSrc}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/90"
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-cyan-950/35 via-transparent to-indigo-950/25"
            aria-hidden
          />
        </div>

        <div className="absolute inset-0 hidden md:block">
          {reduceMotion || preferLightEffects || !shouldRenderSpline ? (
            <div
              className="absolute inset-0 bg-gradient-to-br from-cyan-950/40 via-black to-indigo-950/30"
              aria-hidden
            />
          ) : (
            <HeroSpline
              scene="https://prod.spline.design/Ijn60NuaQiGIVPWQ/scene.splinecode"
              style={{
                width: "100%",
                height: "100%",
                transform: "scale(1.25)",
                transformOrigin: "center center",
              }}
            />
          )}
        </div>
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

      {SHOW_HERO_TRUST_LOGOS && (
        /* Floating Logo Bar */
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
              { src: '/images/planenadler-logo-white.png', alt: 'Planenadler' },
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
      )}

      <div
        className="pointer-events-none z-[1] absolute inset-0 hidden bg-gradient-to-br from-black/40 via-black/30 to-transparent md:block"
        aria-hidden
      />
    </section>
  );
}

// wrapper removed; local implementation above is the source of truth

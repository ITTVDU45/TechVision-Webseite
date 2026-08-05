"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { usePreferLightEffects } from '@/hooks/usePreferLightEffects';

const narrowHeroQuery = '(max-width: 767px)';
const heroMobileImageSrc = '/images/aitelefonie.jpg';

const HeroSpline = dynamic(() => import('./HeroSpline'), {
  ssr: false,
  loading: () => (
    <div
      className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(14,165,233,0.18),transparent_55%),radial-gradient(circle_at_75%_60%,rgba(15,118,110,0.18),transparent_55%),#050a12]"
      aria-hidden
    />
  ),
});

type Props = {
  isLoading?: boolean;
}

const trustPoints = [
  'KI‑Beratung nach BSI IT‑Grundschutz',
  'Individualsoftware & System‑Integration',
  'Prozessautomatisierung & KI‑Agenten',
  'Deutscher Anbieter · DSGVO‑konform',
];

export default function HeroSection({ isLoading = false }: Props) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldRenderSpline, setShouldRenderSpline] = useState(false);
  const [isNarrowHero, setIsNarrowHero] = useState(false);
  const preferLightEffects = usePreferLightEffects();

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(narrowHeroQuery);
    const sync = () => {
      const narrow = mq.matches;
      setIsNarrowHero(narrow);
      if (narrow) setShouldRenderSpline(false);
    };
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const section = heroRef.current;
    if (!section) return;
    if (preferLightEffects) return;
    if (typeof window !== 'undefined' && window.matchMedia(narrowHeroQuery).matches) return;

    const win = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };

    let idleId: number | null = null;
    let usedIdleCallback = false;
    const startSpline = () => {
      if (typeof win.requestIdleCallback === 'function') {
        usedIdleCallback = true;
        idleId = win.requestIdleCallback(() => setShouldRenderSpline(true), { timeout: 400 });
        return;
      }
      idleId = window.setTimeout(() => setShouldRenderSpline(true), 60);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        startSpline();
        observer.disconnect();
      },
      { root: null, rootMargin: '350px 0px', threshold: 0.01 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      if (idleId === null) return;
      if (usedIdleCallback && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleId);
        return;
      }
      window.clearTimeout(idleId);
    };
  }, [preferLightEffects]);

  const router = useRouter();
  const suppressMotion = reduceMotion || preferLightEffects;

  const navigateToOfferPage = () => router.push('/offer');

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[#050a12] [contain:layout_paint]"
    >
      {/* Background layer */}
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
          <div className="absolute inset-0 bg-gradient-to-b from-[#050a12]/70 via-[#050a12]/60 to-[#050a12]" aria-hidden />
        </div>

        <div className="absolute inset-0 hidden md:block">
          {suppressMotion || !shouldRenderSpline ? (
            <div
              className="absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(14,165,233,0.22),transparent_55%),radial-gradient(circle_at_78%_60%,rgba(15,118,110,0.18),transparent_60%),#050a12]"
              aria-hidden
            />
          ) : (
            <HeroSpline
              scene="https://prod.spline.design/Ijn60NuaQiGIVPWQ/scene.splinecode"
              style={{
                width: '100%',
                height: '100%',
                transform: 'scale(1.15)',
                transformOrigin: 'center center',
              }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-[#050a12] via-[#050a12]/70 to-transparent" aria-hidden />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#050a12] to-transparent" aria-hidden />
        </div>
      </div>

      {/* Content */}
      <div className="section-container relative z-10 grid w-full pb-16 pt-28 md:pb-24 md:pt-32">
        <div className="max-w-2xl lg:max-w-3xl">
          <motion.span
            initial={suppressMotion ? false : { opacity: 0, y: 8 }}
            animate={suppressMotion || isLoading ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="eyebrow"
          >
            IT · KI · Automatisierung
          </motion.span>

          <motion.h1
            initial={suppressMotion ? false : { opacity: 0, y: 12 }}
            animate={suppressMotion || isLoading ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: 'easeOut' }}
            className="heading-display mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Software, KI und Automatisierung –<br className="hidden md:block" /> gebaut für messbare Ergebnisse.
          </motion.h1>

          <motion.p
            initial={suppressMotion ? false : { opacity: 0, y: 12 }}
            animate={suppressMotion || isLoading ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: 'easeOut' }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            Wir konzipieren, entwickeln und betreiben individuelle Softwarelösungen, KI‑Agenten und Prozess‑Automatisierung
            für mittelständische Unternehmen – strategisch, integrativ und langfristig verlässlich.
          </motion.p>

          <motion.div
            initial={suppressMotion ? false : { opacity: 0, y: 12 }}
            animate={suppressMotion || isLoading ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: 'easeOut' }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <button
              type="button"
              onClick={navigateToOfferPage}
              className="btn-primary focus-ring"
            >
              Kostenloses Erstgespräch
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.4} stroke="currentColor" className="h-4 w-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => {
                const el = document.getElementById('success-stories');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="btn-secondary focus-ring"
            >
              Referenzen ansehen
            </button>
          </motion.div>

          {/* Trust chips – reale Kompetenz-Beschreibungen, keine erfundenen Kundenlogos */}
          <motion.ul
            initial={suppressMotion ? false : { opacity: 0 }}
            animate={suppressMotion || isLoading ? undefined : { opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.28 }}
            className="mt-10 flex flex-wrap gap-x-3 gap-y-2"
            aria-label="Kompetenzbereiche"
          >
            {trustPoints.map((t) => (
              <li
                key={t}
                className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-slate-300"
              >
                <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                {t}
              </li>
            ))}
          </motion.ul>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 md:flex">
        <span className="h-8 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent" />
        Scroll
      </div>
    </section>
  );
}

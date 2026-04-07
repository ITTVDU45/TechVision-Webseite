"use client";
import React, { useEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlowingEffect } from './ui/glowing-effect';
import Link from 'next/link';
import { usePreferLightEffects } from '@/hooks/usePreferLightEffects';

const LiquidEther = dynamic(() => import('./LiquidEther'), { ssr: false });

const heavyCtaMediaQuery = '(min-width: 1024px) and (pointer: fine)';

export default function CTA() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [shouldRenderLiquid, setShouldRenderLiquid] = useState(false);
  const [allowHeavyCta, setAllowHeavyCta] = useState(false);
  const preferLight = usePreferLightEffects();

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia(heavyCtaMediaQuery);
    const sync = () => setAllowHeavyCta(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const useLiquidBackground =
    allowHeavyCta && !reduceMotion && !preferLight;

  useEffect(() => {
    if (!useLiquidBackground) return;
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldRenderLiquid(true);
        observer.disconnect();
      },
      { root: null, rootMargin: "120px 0px", threshold: 0.08 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [useLiquidBackground]);

  const useGlowWrapper = allowHeavyCta && !reduceMotion;
  const motionEnter = preferLight
    ? { y: 10, duration: 0.25 }
    : { y: 20, duration: 0.45 };
  const motionDelayStep = preferLight ? 0 : 0.08;

  const cardShell = (
    <div
      className={`rounded-3xl md:rounded-[32px] overflow-hidden border border-white/10 shadow-[0_0_50px_-12px_rgba(59,130,246,0.2)] relative group ${
        useGlowWrapper
          ? "bg-white/[0.02] backdrop-blur-2xl"
          : "bg-neutral-950/95"
      }`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
      <div className="relative min-h-[min(72vh,420px)] md:min-h-[460px] lg:min-h-[500px] w-full p-6 sm:p-8 md:p-16 flex flex-col items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40" aria-hidden>
          {reduceMotion || !useLiquidBackground || !shouldRenderLiquid ? (
            <div className="h-full w-full bg-gradient-to-br from-blue-600/25 via-indigo-600/15 to-blue-900/20" />
          ) : (
            <LiquidEther
              colors={['#3b82f6', '#4f46e5', '#818cf8']}
              mouseForce={18}
              cursorSize={80}
              isViscous
              viscous={24}
              resolution={0.35}
              iterationsViscous={18}
              iterationsPoisson={18}
              autoDemo
              autoSpeed={0.5}
              autoIntensity={2.4}
            />
          )}
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12 max-w-5xl relative z-10 w-full">
          <div className="flex-1 text-center lg:text-left">
            <motion.h2
              initial={{ opacity: 0, y: motionEnter.y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: motionEnter.duration, ease: 'easeOut' }}
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 md:mb-6"
            >
              <span className="text-white">Bereit für die </span>
              <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                Zukunft mit KI?
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: motionEnter.y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: motionEnter.duration, delay: motionDelayStep, ease: 'easeOut' }}
              className="text-lg md:text-xl text-gray-300 mb-8 md:mb-10 leading-relaxed font-medium"
            >
              Kontaktieren Sie uns für eine unverbindliche Beratung und entdecken Sie die Potenziale der Künstlichen Intelligenz für Ihr Unternehmen.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: motionEnter.y }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: motionEnter.duration, delay: motionDelayStep * 2, ease: 'easeOut' }}
            >
              <Link
                href="/contact"
                className={`inline-flex w-full max-w-md lg:w-auto lg:max-w-none items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full text-lg md:text-xl font-bold text-white shadow-2xl transition-transform active:scale-[0.98] ${
                  preferLight ? "" : "md:hover:scale-[1.03] md:hover:shadow-[0_20px_40px_rgba(59,130,246,0.2)]"
                }`}
              >
                Jetzt einen kostenlosen Ersttermin vereinbaren
              </Link>
            </motion.div>
          </div>
          <motion.div
            className="flex-1 relative w-full max-w-sm lg:max-w-none hidden lg:block"
            initial={{ opacity: 0, x: preferLight ? 0 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: motionEnter.duration, ease: 'easeOut' }}
          >
            <div className="aspect-square relative rounded-3xl overflow-hidden border border-white/10 shadow-3xl">
              <Image
                src="/images/Tolgahan Vardar.jpeg"
                alt="Tolgahan Vardar - CEO"
                fill
                sizes="(max-width: 1280px) 320px, 400px"
                className="object-cover object-[center_25%] grayscale-[0.2] hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-8 left-8">
                <p className="text-white font-black text-2xl mb-1">Tolgahan Vardar</p>
                <div className="flex items-center gap-2">
                  <span className="w-8 h-0.5 bg-blue-500" />
                  <p className="text-blue-400 font-bold uppercase tracking-widest text-xs">CEO TechVision</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id="contact" className="py-20 md:py-28 lg:py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {useGlowWrapper ? (
          <GlowingEffect blur={16} spread={120} proximity={120} className="max-w-6xl mx-auto">
            {cardShell}
          </GlowingEffect>
        ) : (
          <div className="max-w-6xl mx-auto">{cardShell}</div>
        )}
      </div>
    </section>
  );
}

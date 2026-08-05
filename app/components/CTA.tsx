"use client";
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function CTA() {
  return (
    <section id="contact" className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a1220]">
          {/* Subtle ambient glow, statisch, GPU-cheap */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-70"
            style={{
              background:
                'radial-gradient(circle at 15% 20%, rgba(14,165,233,0.15), transparent 55%), radial-gradient(circle at 85% 80%, rgba(15,118,110,0.15), transparent 55%)',
            }}
          />
          <div className="relative grid gap-10 p-8 md:p-12 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-center lg:gap-14 lg:p-16">
            <div>
              <motion.span
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="eyebrow"
              >
                Nächster Schritt
              </motion.span>

              <motion.h2
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 }}
                className="heading-display mt-4 text-3xl md:text-5xl"
              >
                Sprechen wir über Ihr <span className="text-sky-400">nächstes Projekt</span>.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg"
              >
                Ein 30‑minütiges Erstgespräch, in dem wir Ihr Vorhaben strukturieren –
                unverbindlich, kostenlos, ergebnisorientiert.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <Link href="/contact" className="btn-primary focus-ring">
                  Termin vereinbaren
                </Link>
                <Link href="mailto:info@it-techvision.de" className="btn-secondary focus-ring">
                  info@it‑techvision.de
                </Link>
              </motion.div>

              <ul className="mt-8 grid gap-2 text-sm text-slate-400 sm:grid-cols-2">
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Antwort innerhalb 24 Stunden
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Persönlicher Ansprechpartner
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  Unverbindlich & kostenlos
                </li>
                <li className="flex items-center gap-2">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                  DSGVO‑konforme Kommunikation
                </li>
              </ul>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="relative hidden overflow-hidden rounded-2xl border border-white/10 lg:block"
            >
              <div className="relative aspect-square w-full">
                <Image
                  src="/images/Tolgahan Vardar.jpeg"
                  alt="Tolgahan Vardar, CEO TechVision"
                  fill
                  sizes="(max-width: 1280px) 320px, 400px"
                  className="object-cover object-[center_25%]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden />
                <div className="absolute inset-x-6 bottom-6">
                  <p className="text-lg font-semibold text-white">Tolgahan Vardar</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-px w-6 bg-sky-400" aria-hidden />
                    <p className="text-xs uppercase tracking-widest text-sky-300">CEO · TechVision</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { usePreferLightEffects } from '@/hooks/usePreferLightEffects';

const steps = [
  {
    title: 'Analyse & Strategie',
    description:
      'Wir starten mit einer umfassenden Analyse Ihrer bestehenden Systeme, Prozesse und Ziele. Darauf aufbauend entwickeln wir eine maßgeschneiderte Strategie.',
    image: '/images/Ai Voice Assistant 4.png',
  },
  {
    title: 'Konzeption & Planung',
    description:
      'Gemeinsam definieren wir den Fahrplan: Welche Lösungen bringen den größten Mehrwert? Wie lassen sich bestehende Systeme sinnvoll einbinden?',
    image: '/images/multiple-devices-background.webp.png',
  },
  {
    title: 'Umsetzung & Integration',
    description:
      'Wir entwickeln die Lösungen und integrieren sie nahtlos in Ihre bestehende IT‑Landschaft – mit klarem Fokus auf Benutzerfreundlichkeit, Sicherheit und Skalierbarkeit.',
    image: '/images/Automation-Dashboard.png',
  },
  {
    title: 'Test & Qualitätssicherung',
    description:
      'Vor dem Go‑Live durchlaufen alle Lösungen umfassende Tests – funktional, sicherheitstechnisch und im Live‑Betrieb.',
    image: '/images/bitwarden-business-og.png',
  },
  {
    title: 'Monitoring & Support',
    description:
      'Auch nach Abschluss des Projekts bleiben wir an Ihrer Seite: mit Monitoring, regelmäßigen Sicherheitsupdates und kontinuierlicher Optimierung.',
    image: '/images/system-integration-network.jpg',
  },
];

export default function ProcessSection() {
  const router = useRouter();
  const preferLight = usePreferLightEffects();
  const enterDuration = preferLight ? 0.28 : 0.5;
  const imageSizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 560px';

  return (
    <section id="process" className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Projektprozess
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="heading-display mt-4 text-3xl md:text-5xl"
          >
            Von der Idee zum Launch in fünf Schritten
          </motion.h2>
          <p className="mt-4 text-base leading-relaxed text-slate-400 md:text-lg">
            Ein transparenter, strukturierter Ablauf ist die Grundlage jedes erfolgreichen Projekts.
            So begleiten wir Sie – vom ersten Gespräch bis zum laufenden Betrieb.
          </p>
        </div>

        <ol className="mx-auto mt-16 max-w-6xl space-y-16 md:mt-20 md:space-y-24">
          {steps.map((step, index) => {
            const reverse = index % 2 === 1;
            return (
              <li key={step.title} className="scroll-mt-24">
                <div
                  className={`grid items-center gap-8 md:gap-14 md:grid-cols-2 ${
                    reverse ? 'md:[&>*:first-child]:order-2' : ''
                  }`}
                >
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: enterDuration }}
                    className="text-center md:text-left"
                  >
                    <div className="mb-5 inline-flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-sky-500/30 bg-sky-500/10 text-sm font-semibold text-sky-300">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                        Schritt {index + 1} / {steps.length}
                      </span>
                    </div>
                    <h3 className="mb-4 text-2xl font-semibold leading-tight text-white md:text-3xl">
                      {step.title}
                    </h3>
                    <p className="text-base leading-relaxed text-slate-400 md:text-lg">
                      {step.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: enterDuration }}
                    className="relative w-full"
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220]">
                      <Image
                        src={step.image}
                        alt={step.title}
                        fill
                        sizes={imageSizes}
                        className="object-cover"
                        loading={index < 2 ? 'eager' : 'lazy'}
                        decoding="async"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#050a12]/60 via-transparent to-transparent" aria-hidden />
                    </div>
                  </motion.div>
                </div>
              </li>
            );
          })}
        </ol>

        <div className="mt-16 text-center">
          <button
            type="button"
            onClick={() => router.push('/offer')}
            className="btn-primary focus-ring"
          >
            Kostenloses Erstgespräch vereinbaren
          </button>
        </div>
      </div>
    </section>
  );
}

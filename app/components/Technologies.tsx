"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  IconBrandReact,
  IconServer,
  IconBrain,
  IconCloud,
  IconDatabase,
  IconDeviceMobile,
  IconShieldLock,
  IconBolt,
} from "@tabler/icons-react";

type Layer = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  stack: string;
  purpose: string;
};

const layers: Layer[] = [
  {
    icon: IconBrandReact,
    title: "Frontend",
    stack: "React · Next.js · Tailwind",
    purpose: "Schnelle, barrierearme Nutzeroberflächen mit klaren Interaktionen.",
  },
  {
    icon: IconServer,
    title: "Backend",
    stack: "Node.js · TypeScript · REST / GraphQL",
    purpose: "Robuste APIs, saubere Domänenmodelle und wartbare Services.",
  },
  {
    icon: IconBrain,
    title: "KI & ML",
    stack: "OpenAI · LangChain · PyTorch",
    purpose: "Von Prototypen bis produktiven KI‑Workflows – integriert in Ihre Fachprozesse.",
  },
  {
    icon: IconDatabase,
    title: "Daten & Analytik",
    stack: "PostgreSQL · MongoDB · ETL",
    purpose: "Datenmodelle, die Auswertungen und KI‑Anwendungen tragen.",
  },
  {
    icon: IconCloud,
    title: "Cloud & DevOps",
    stack: "AWS · Docker · Kubernetes · CI/CD",
    purpose: "Zuverlässiger Betrieb mit klaren Deployment‑Pipelines und Monitoring.",
  },
  {
    icon: IconShieldLock,
    title: "Security",
    stack: "IT‑Grundschutz · ISO 27001",
    purpose: "Zugriffs‑, Backup‑ und Härtungs‑Konzepte nach anerkannten Standards.",
  },
  {
    icon: IconBolt,
    title: "Automatisierung",
    stack: "n8n · Zapier · Custom Workflows",
    purpose: "System‑zu‑System‑Prozesse, die Handarbeit ersetzen.",
  },
  {
    icon: IconDeviceMobile,
    title: "Mobile & PWA",
    stack: "React Native · Progressive Web Apps",
    purpose: "Anwendungen, die auf jedem Gerät sinnvoll funktionieren.",
  },
];

export default function Technologies({ asPage = false }: { asPage?: boolean }): React.JSX.Element {
  const Heading = asPage ? motion.h1 : motion.h2;
  return (
    <section className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] md:items-start md:gap-16">
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow"
            >
              Technologie‑Stack
            </motion.span>
            <Heading
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="heading-display mt-4 text-3xl md:text-5xl"
            >
              Ein durchdachter Stack – vom Frontend bis zum Betrieb.
            </Heading>
            <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
              Wir setzen bewusst auf ausgereifte, offene Technologien. Nicht die neueste Trend‑Bibliothek –
              sondern die Werkzeuge, mit denen wir Ihr Projekt in fünf Jahren noch sinnvoll weiterentwickeln können.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/contact" className="btn-primary focus-ring">
                Termin vereinbaren
              </Link>
              <Link href="/case-studies" className="btn-secondary focus-ring">
                Referenzprojekte
              </Link>
            </div>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2">
            {layers.map((layer, index) => (
              <motion.li
                key={layer.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.4, delay: 0.03 * index }}
                className="surface-card surface-card--hover p-5"
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-sky-300">
                    <layer.icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-2">
                      <h3 className="text-sm font-semibold text-white">{layer.title}</h3>
                      <span className="truncate text-[11px] uppercase tracking-widest text-slate-500">
                        {layer.stack}
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-slate-400">
                      {layer.purpose}
                    </p>
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

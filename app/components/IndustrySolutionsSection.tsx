"use client";
import { motion } from "framer-motion";
import {
  IconScale,
  IconShoppingCart,
  IconTrain,
  IconHammer,
  IconUsers,
  IconChartBar,
} from "@tabler/icons-react";
import Link from "next/link";

const industries = [
  {
    icon: IconScale,
    name: "Recht & Kanzleien",
    challenge: "Wachsende Aktenvolumina und Recherchezeit.",
    solution: "KI‑gestützte Dokumentenanalyse, RAG‑Assistenten und sichere Mandantendaten‑Räume.",
  },
  {
    icon: IconShoppingCart,
    name: "E‑Commerce",
    challenge: "Katalogpflege, Retouren‑ und Support‑Aufwand.",
    solution: "Automatisierte Produktdatenpflege, KI‑Support‑Agents und intelligente Retouren‑Steuerung.",
  },
  {
    icon: IconTrain,
    name: "Bahn & Verkehr",
    challenge: "Fragmentierte Systeme, manuelle Meldungen.",
    solution: "Integration der Backend‑Systeme, Prozess‑Automatisierung und Reporting‑Layer.",
  },
  {
    icon: IconHammer,
    name: "Handwerk & Bau",
    challenge: "Zeit für Angebote, Termine und Dokumentation.",
    solution: "Digitale Angebotsprozesse, mobile Erfassung und Aufmaß‑Automatisierung.",
  },
  {
    icon: IconUsers,
    name: "Personalwesen",
    challenge: "Bewerber‑Screening und Onboarding‑Aufwand.",
    solution: "Automatisierte Kandidaten‑Vorauswahl, Onboarding‑Workflows und Recruiting‑Analytics.",
  },
  {
    icon: IconChartBar,
    name: "Vertrieb",
    challenge: "Zerstreute Leads und Reporting‑Aufwand.",
    solution: "Lead‑Scoring, Voice‑Bots und CRM‑Integrationen mit Echtzeit‑Dashboards.",
  },
];

export default function IndustrySolutionsSection() {
  return (
    <section className="section-y relative overflow-hidden bg-[#040810]">
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            Branchenkompetenz
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="heading-display mt-4 text-3xl md:text-5xl"
          >
            Branchenspezifische Lösungen
          </motion.h2>
          <p className="mt-5 text-base leading-relaxed text-slate-400 md:text-lg">
            Wir kennen die operativen Anforderungen aus Recht, Handel, Verkehr, Bau, HR und Vertrieb –
            und entwickeln Anwendungen, die genau dort ansetzen, wo Ihre Prozesse Zeit und Ergebnis kosten.
          </p>
        </div>

        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, index) => (
            <motion.li
              key={industry.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.42, delay: 0.03 * index }}
              className="surface-card surface-card--hover flex flex-col gap-4 p-6"
            >
              <div className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-sky-300">
                  <industry.icon className="h-5 w-5" />
                </span>
                <h3 className="text-base font-semibold text-white">{industry.name}</h3>
              </div>
              <div className="text-sm leading-relaxed">
                <p className="text-slate-400">
                  <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Herausforderung
                  </span>
                  {industry.challenge}
                </p>
                <p className="mt-3 text-slate-300">
                  <span className="mb-0.5 block text-xs font-semibold uppercase tracking-wider text-sky-400/80">
                    Unser Ansatz
                  </span>
                  {industry.solution}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 flex justify-center">
          <Link href="/industry-solutions" className="btn-secondary focus-ring">
            Alle Branchen‑Lösungen ansehen
          </Link>
        </div>
      </div>
    </section>
  );
}

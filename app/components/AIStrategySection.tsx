"use client";
import { motion } from "framer-motion";
import {
  IconBrain,
  IconChartLine,
  IconShieldCheck,
  IconCode,
} from "@tabler/icons-react";
import Image from "next/image";

const capabilities = [
  {
    icon: IconChartLine,
    title: "KI‑Beratung",
    description:
      "Analyse Ihres Status quo, Definition einer belastbaren KI‑Strategie und ableitbare Roadmap für die nächsten 12 Monate.",
  },
  {
    icon: IconCode,
    title: "KI‑Entwicklung",
    description:
      "Requirements‑ und Data‑Engineering, RAG‑Pipelines, LLM‑Integrationen und produktionsreife ML‑Modelle.",
  },
  {
    icon: IconBrain,
    title: "Implementierung im Betrieb",
    description:
      "Vom Proof‑of‑Concept bis zum produktiven Rollout – enge Zusammenarbeit mit Ihren Fach‑ und IT‑Teams.",
  },
  {
    icon: IconShieldCheck,
    title: "Sicherheit & Compliance",
    description:
      "Umsetzung entlang BSI IT‑Grundschutz und ISO‑27001‑Prinzipien. DSGVO‑konforme Verarbeitung in EU‑Infrastruktur.",
  },
];

export default function AIStrategySection() {
  return (
    <section className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="grid items-start gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-20">
          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 0.55 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0a1220]">
              <Image
                src="/images/KITransofmation.jpg"
                alt="KI‑Strategie und Entwicklung im Unternehmen"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050a12] via-[#050a12]/25 to-transparent" aria-hidden />
              <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3 rounded-xl border border-white/10 bg-black/60 px-4 py-3 backdrop-blur-md">
                <IconBrain className="h-5 w-5 text-sky-400" />
                <span className="text-sm font-medium text-slate-100">
                  Individuelle KI‑Lösungen · von der Analyse bis zum Betrieb
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right: content */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow"
            >
              Expertise
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="heading-display mt-4 text-3xl md:text-5xl"
            >
              KI‑Strategie & Entwicklung –
              <span className="block text-sky-400">für Ihr operatives Geschäft.</span>
            </motion.h2>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300 md:text-lg">
              Wir arbeiten an der Schnittstelle von Technologie und Prozess. Ausgehend von Ihren
              Zielen identifizieren wir passende KI‑Anwendungsfälle, entwickeln daraus eine klare
              Umsetzungs‑Roadmap und liefern skalierbare Lösungen – cloud‑basiert, hybrid oder On‑Premise.
            </p>

            <ul className="mt-10 grid gap-3 sm:grid-cols-2">
              {capabilities.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.4, delay: 0.04 * index }}
                  className="surface-card surface-card--hover flex flex-col gap-3 p-5"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-sky-500/25 bg-sky-500/10 text-sky-300">
                    <item.icon className="h-5 w-5" />
                  </span>
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-slate-400">
                    {item.description}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

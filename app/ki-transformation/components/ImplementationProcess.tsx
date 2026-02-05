"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { IconCheck } from "@tabler/icons-react";
import { ProcessStep } from "./types";

interface ImplementationProcessProps {
  title?: string;
  description?: string;
  steps: ProcessStep[];
  ctaText?: string;
  ctaLink?: string;
}

export default function ImplementationProcess({
  title = "So führen wir KI in Ihr Unternehmen ein",
  description = "Von der Strategie bis zur Implementierung – unser strukturierter Prozess sorgt für eine reibungslose Transformation.",
  steps,
  ctaText = "Jetzt Angebot einholen",
  ctaLink = "/offer",
}: ImplementationProcessProps) {
  const router = useRouter();

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {title.includes("Unternehmen ein") ? (
              <>
                {title.split("Unternehmen ein")[0]}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                  Unternehmen ein
                </span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{description}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * index }}
                className={`bg-gradient-to-br ${step.color} backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-opacity-60 transition-all duration-300`}
              >
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div
                      className={`w-16 h-16 rounded-xl bg-gradient-to-br ${step.color} border border-white/20 flex items-center justify-center mb-2`}
                    >
                      <IconComponent className={`w-8 h-8 ${step.iconColor}`} />
                    </div>
                    <div className="text-2xl font-black text-white/50">{step.number}</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-gray-300 mb-4">{step.subtitle}</p>
                    <ul className="space-y-2">
                      {step.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-2 text-gray-300">
                          <IconCheck className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <button
            onClick={() => router.push(ctaLink)}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
          >
            <span>{ctaText}</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </button>
        </motion.div>
      </div>
    </section>
  );
}

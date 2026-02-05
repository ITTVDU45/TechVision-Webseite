"use client";
import React from "react";
import { motion } from "framer-motion";
import { ProcessStep } from "./types";

interface ProcessSectionProps {
  title?: string;
  description?: string;
  steps: ProcessStep[];
}

export default function ProcessSection({
  title = "Unser Beratungsprozess – Schritt für Schritt zum sicheren Unternehmen",
  description = "Wir begleiten Sie von der ersten Analyse bis zur finalen Umsetzung:",
  steps,
}: ProcessSectionProps) {
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
            {title.split("Beratungsprozess")[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Beratungsprozess
            </span>
            {title.split("Beratungsprozess")[1]}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{description}</p>
        </motion.div>

        <div className="max-w-5xl mx-auto space-y-6">
          {steps.map((step, index) => (
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
                    <span className="text-3xl">{step.icon}</span>
                  </div>
                  <div className="text-2xl font-black text-white/50">{step.number}</div>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

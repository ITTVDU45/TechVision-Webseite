"use client";
import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { FeatureCard } from "./types";

interface WhyIntegrateAIProps {
  badge?: string;
  title?: string;
  description?: string;
  features: FeatureCard[];
  ctaText?: string;
  ctaLink?: string;
}

export default function WhyIntegrateAI({
  badge = "KI Transformation",
  title = "Warum KI in Ihr Unternehmen integrieren?",
  description = "Entdecken Sie die transformative Kraft der künstlichen Intelligenz für Ihr Unternehmen",
  features,
  ctaText = "KI Potenzial Check starten",
  ctaLink = "/offer",
}: WhyIntegrateAIProps) {
  const router = useRouter();

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                {badge}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              {title.includes("Unternehmen integrieren?") ? (
                <>
                  {title.split("Unternehmen integrieren?")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                    Unternehmen integrieren?
                  </span>
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">{description}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-opacity-60 transition-all duration-300`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} border border-white/20 flex items-center justify-center`}
                    >
                      <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white mb-1">{feature.title}</h3>
                      <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
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

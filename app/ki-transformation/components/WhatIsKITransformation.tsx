"use client";
import React from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "./types";

interface WhatIsKITransformationProps {
  title?: string;
  description?: string;
  features: FeatureCard[];
}

export default function WhatIsKITransformation({
  title = "Was bedeutet KI-Transformation für Unternehmen?",
  description = "KI-Transformation bezeichnet die Integration von künstlicher Intelligenz in bestehende Geschäftsprozesse, um Effizienz, Skalierbarkeit und Innovation zu fördern.",
  features,
}: WhatIsKITransformationProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              {title.includes("KI-Transformation") ? (
                <>
                  {title.split("KI-Transformation")[0]}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
                    KI-Transformation
                  </span>
                  {title.split("KI-Transformation")[1]}
                </>
              ) : (
                title
              )}
            </h2>
            <p className="text-lg text-gray-300 leading-relaxed">{description}</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index }}
                  className={`bg-gradient-to-br ${feature.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300`}
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} border border-white/20 flex items-center justify-center mb-4`}
                  >
                    <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

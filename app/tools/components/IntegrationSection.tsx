"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { IntegrationCategory, IntegrationFeature } from './types';

interface IntegrationSectionProps {
  categories: IntegrationCategory[];
  features: IntegrationFeature[];
}

export default function IntegrationSection({ categories, features }: IntegrationSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Nahtlose Integration mit </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-teal-400 to-blue-500">
              Ihren bestehenden IT-Systemen
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Unsere Tools & KI-Agenten lassen sich mit Ihrer aktuellen Infrastruktur verbinden – von ERP & CRM bis hin zu Cloud- und Sicherheitslösungen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {categories.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-3xl">{category.icon}</div>
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {category.name}
                  </h3>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {category.items.map((item, itemIndex) => (
                    <div
                      key={itemIndex}
                      className="bg-white/5 rounded-lg p-3 text-center border border-white/10 hover:border-white/20 transition-all"
                    >
                      <div className="text-2xl font-bold text-blue-400 mb-1">{item.logo}</div>
                      <div className="text-xs text-gray-400">{item.name}</div>
                    </div>
                  ))}
                </div>
                {category.detailsLink && (
                  <button className="text-sm text-blue-400 hover:text-blue-300 transition-colors">
                    Mehr Details
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (categories.length * 0.1) + (index * 0.1) }}
              className="text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

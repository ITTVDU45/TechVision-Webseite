"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { KIAgent } from './types';

interface KIAgentsSectionProps {
  agents: KIAgent[];
}

export default function KIAgentsSection({ agents }: KIAgentsSectionProps) {
  return (
    <section id="ki-agenten" className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Unsere KI-Agenten – </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">
              Automatisierung auf höchstem Niveau
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Erleben Sie leistungsstarke KI-Agenten, die Ihren Arbeitsalltag erleichtern, Geschäftsprozesse optimieren und datengetriebene Entscheidungen unterstützen.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {agents.map((agent, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{agent.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-indigo-400 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {agent.description}
                    </p>
                  </div>
                </div>
                {agent.features && agent.features.length > 0 && (
                  <ul className="space-y-2 mt-4 mb-4">
                    {agent.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                        <span className="text-indigo-400">●</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                )}
                {agent.detailsLink && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full mt-4 px-4 py-2 bg-white/5 hover:bg-white/10 rounded-lg text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-all"
                  >
                    Details anzeigen
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-indigo-500/20 transition-all"
          >
            KI-Agenten Anfragen
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}

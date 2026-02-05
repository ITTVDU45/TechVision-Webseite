"use client";
import React from "react";
import { motion } from "framer-motion";
import { Stat, Threat } from "./types";

interface WhyCybersecuritySectionProps {
  title?: string;
  description?: string;
  stats: Stat[];
  threats: Threat[];
  ctaText?: string;
  ctaLink?: string;
}

export default function WhyCybersecuritySection({
  title = "Warum Cybersicherheit unerlässlich ist",
  description = "Cyberbedrohungen nehmen stetig zu – von Ransomware über Datenlecks bis hin zu gezielten Angriffen. Eine robuste Sicherheitsstrategie schützt nicht nur Ihre Daten, sondern bewahrt auch Ihren guten Ruf und gewährleistet Geschäftskontinuität.",
  stats,
  threats,
  ctaText = "Cybersicherheits-Check starten",
  ctaLink = "/offer",
}: WhyCybersecuritySectionProps) {
  return (
    <section className="py-32 bg-gradient-to-b from-black via-gray-900 to-black relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            {title.split("Cybersicherheit")[0]}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">
              Cybersicherheit
            </span>
            {title.split("Cybersicherheit")[1]}
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{description}</p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-white/10 rounded-2xl p-6 text-center"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl font-black text-white mb-2">{stat.value}</div>
              <div className="text-sm text-gray-300 leading-relaxed">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Threats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {threats.map((threat, index) => (
            <motion.div
              key={threat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              className={`bg-gradient-to-br ${threat.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6`}
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="text-3xl">{threat.icon}</div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-2">{threat.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4">{threat.description}</p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Bedrohungsgrad:</span>
                    <div className="flex-1 bg-gray-700 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-red-500 to-orange-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${threat.threatLevel}%` }}
                      />
                    </div>
                    <span className="text-sm font-bold text-white">{threat.threatLevel}%</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={() => (window.location.href = ctaLink)}
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

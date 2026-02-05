"use client";
import React from "react";
import { motion } from "framer-motion";
import { Project } from "./types";

interface SuccessfulProjectsProps {
  title?: string;
  subtitle?: string;
  projects: Project[];
  ctaText?: string;
  ctaLink?: string;
}

export default function SuccessfulProjects({
  title = "Erfolgreiche Projekte",
  subtitle = "Entdecken Sie unsere Referenzen – von Mitarbeiter-Apps über CRM-Lösungen bis hin zu speziellen Branchenanwendungen.",
  projects,
  ctaText = "Softwareanfrage starten",
  ctaLink = "/offer",
}: SuccessfulProjectsProps) {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="mb-20 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold">
              {title}
              <span className="text-white block mt-2">aus unserer Softwareentwicklung</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <p className="text-xl text-gray-400 leading-relaxed">{subtitle}</p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * index }}
              whileHover={{ scale: 1.02, y: -4 }}
              className={`bg-gradient-to-br ${project.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 cursor-pointer group`}
            >
              <div className="text-4xl mb-4">{project.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {project.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{project.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
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

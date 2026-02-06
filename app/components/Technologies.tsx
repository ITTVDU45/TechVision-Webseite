"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconBrandReact, IconServer, IconBrain, IconCloud, IconDatabase, IconDeviceMobile } from '@tabler/icons-react';

export default function Technologies(): React.JSX.Element {
  const technologies = [
    {
      icon: IconBrandReact,
      title: "Frontend",
      description: "React, Next.js, Tailwind CSS, Accessibility-first",
      color: "from-purple-500/20 to-purple-600/20",
      iconColor: "text-purple-400",
      borderColor: "border-purple-500/30",
    },
    {
      icon: IconServer,
      title: "Backend",
      description: "Node.js, TypeScript, REST/GraphQL, scalable APIs",
      color: "from-gray-500/20 to-gray-600/20",
      iconColor: "text-gray-400",
      borderColor: "border-gray-500/30",
    },
    {
      icon: IconBrain,
      title: "KI & ML",
      description: "Model Ops, LangChain, OpenAI, TensorFlow & PyTorch",
      color: "from-pink-500/20 to-rose-500/20",
      iconColor: "text-pink-400",
      borderColor: "border-pink-500/30",
    },
    {
      icon: IconCloud,
      title: "Cloud & DevOps",
      description: "AWS, Docker, Kubernetes, CI/CD, Observability",
      color: "from-blue-500/20 to-cyan-500/20",
      iconColor: "text-blue-400",
      borderColor: "border-blue-500/30",
    },
    {
      icon: IconDatabase,
      title: "Daten & Analytik",
      description: "Postgres, MongoDB, Elasticsearch, BI & Reporting",
      color: "from-indigo-500/20 to-purple-500/20",
      iconColor: "text-indigo-400",
      borderColor: "border-indigo-500/30",
    },
    {
      icon: IconDeviceMobile,
      title: "Mobile & PWA",
      description: "React Native, Progressive Web Apps",
      color: "from-orange-500/20 to-amber-500/20",
      iconColor: "text-orange-400",
      borderColor: "border-orange-500/30",
    },
  ];

  return (
    <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-32 overflow-hidden">
      {/* Smooth Transition Overlays */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

      {/* Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.05),transparent_50%)]" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block mb-4">
              <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                Unsere Expertise
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
              Bereit für die Zukunft?
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-600">Entdecken Sie unsere Technologien</span>
            </h2>

            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              Wir bauen Lösungen mit einem klaren Fokus auf Skalierbarkeit, Sicherheit und Performance. Unsere Toolchain kombiniert bewährte Backend- und Frontend-Technologien mit modernen KI- und Datenplattformen.
            </p>

            {/* Technology Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {technologies.map((tech, index) => {
                const IconComponent = tech.icon;
                return (
                  <motion.article
                    key={tech.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index }}
                    whileHover={{ scale: 1.02, y: -4 }}
                    className={`group relative bg-gradient-to-br ${tech.color} backdrop-blur-xl border ${tech.borderColor} rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 cursor-pointer`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${tech.color} border ${tech.borderColor} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <IconComponent className={`w-6 h-6 ${tech.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white mb-1">{tech.title}</h3>
                        <p className="text-sm text-gray-300 leading-relaxed">{tech.description}</p>
                      </div>
                    </div>
                    {/* Hover Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${tech.color} opacity-0 group-hover:opacity-20 rounded-2xl blur-xl transition-opacity duration-300 -z-10`} />
                  </motion.article>
                );
              })}
            </div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/50"
              >
                <span>Jetzt Termin Buchen</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative order-1 lg:order-2"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10" />
              <img
                src="/images/multiple-devices-background.webp.png"
                alt="Technologies mockup"
                className="w-full h-full object-cover"
              />
              {/* Floating Badge */}
              <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-500/30 z-20">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                  <span className="text-white font-bold">Modern Stack</span>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
            <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

// wrapper removed; local implementation above is the source of truth

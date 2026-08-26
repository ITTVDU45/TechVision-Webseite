import React from 'react';
import { OpenSourceTool } from './types';

interface OpenSourceToolsSectionProps {
  tools: OpenSourceTool[];
}

export default function OpenSourceToolsSection({ tools }: OpenSourceToolsSectionProps) {
  return (
    <section id="open-source-tools" className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Unsere Open-Source-Tools – </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-blue-400 to-teal-500">
              Freiheit & Kontrolle
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Nutzen Sie leistungsstarke, flexible und lizenzfreie Open-Source-Software für Ihr Unternehmen.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="reveal group relative">
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-teal-500/10">
                <div className="flex items-start gap-4 mb-4">
                  <div className="text-4xl">{tool.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors">
                      {tool.name}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
                <ul className="space-y-2 mt-4">
                  {tool.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center gap-2 text-sm text-gray-300">
                      <span className="text-teal-400">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div
          className="reveal text-center">
          <button
            className="reveal px-8 py-4 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all">
            Jetzt Tools Anfragen
          </button>
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { PlanningFeature } from './types';

interface ITInfrastructurePlanningSectionProps {
  features: PlanningFeature[];
}

export default function ITInfrastructurePlanningSection({ features }: ITInfrastructurePlanningSectionProps) {
  return (
    <section id="details" className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">IT Infrastructure Planning – </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-blue-400 to-indigo-500">
              Strategische IT-Planung – Ihre Zukunft im Blick
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div
            className="reveal bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Strategische Planung & Konzeption
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Wir analysieren Ihre internen Prozesse und entwickeln maßgeschneiderte IT-Konzepte, die auch in Zukunft flexibel erweiterbar sind. Von der IT-Strategie bis zur Sicherheitsplanung stehen wir Ihnen beratend zur Seite.
            </p>
          </div>

          <div
            className="reveal bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-8 hover:border-white/20 transition-all duration-300 shadow-xl">
            <h3 className="text-2xl font-bold text-white mb-4">
              Leistungsstarke Server & Skalierbare Storage-Lösungen
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Ob lokal oder in der Cloud – mit modernster Virtualisierungstechnologie optimieren wir Ihre Serverarchitektur und maximieren die Ressourcennutzung. So sichern wir einen reibungslosen Betrieb Ihrer IT-Infrastruktur.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="reveal group relative">
              <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

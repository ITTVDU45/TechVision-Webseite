import React from 'react';
import { PricingPlan } from './types';
import Link from 'next/link';

interface PricingSectionProps {
  plans: PricingPlan[];
}

export default function PricingSection({ plans }: PricingSectionProps) {
  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className="reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Transparente </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-teal-400 to-green-500">
              Preise
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Wählen Sie den passenden Plan für Ihre Bedürfnisse
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`reveal ${`relative group ${plan.isPopular ? 'lg:-mt-4 lg:mb-4' : ''}`}`}>
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <span className="px-4 py-1 bg-gradient-to-r from-green-500 to-teal-500 rounded-full text-sm font-bold text-white">
                    Beliebt
                  </span>
                </div>
              )}
              <div className={`h-full bg-white/[0.03] backdrop-blur-xl border rounded-2xl p-6 hover:border-white/20 transition-all duration-300 shadow-xl ${
                plan.isPopular ? 'border-green-500/50 shadow-green-500/20' : 'border-white/10'
              }`}>
                <h3 className="text-2xl font-bold text-white mb-4">{plan.name}</h3>
                <div className="mb-6">
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-400">
                      {plan.currentPrice}
                    </span>
                    <span className="text-gray-500 text-sm line-through">{plan.originalPrice}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-1">/Monat</p>
                </div>
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-start gap-2 text-sm text-gray-300">
                      <span className="text-green-400 mt-1">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {plan.link && (
                  <Link href={plan.link}>
                    <button
                      className={`reveal ${`w-full px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                        plan.isPopular
                          ? 'bg-gradient-to-r from-green-500 to-teal-600 text-white shadow-lg hover:shadow-xl'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-white/20'
                      }`}`}>
                      Jetzt Anfragen
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

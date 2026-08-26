import React from "react";
import { Service } from "./types";

interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  services: Service[];
}

export default function ServicesSection({
  title = "Unsere Cybersecurity Services",
  subtitle = "Wir bieten maßgeschneiderte Beratungen und Lösungen, um Ihr Unternehmen optimal abzusichern. Unsere Schwerpunkte umfassen:",
  services,
}: ServicesSectionProps) {
  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div
          className="reveal text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">{title}</h2>
          <p className="text-lg text-gray-300 leading-relaxed max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div
              key={service.title}
              className={`reveal ${`bg-gradient-to-br ${service.color} backdrop-blur-xl border border-white/10 rounded-2xl p-6 hover:border-opacity-60 transition-all duration-300 cursor-pointer group`}`}>
              <div className="text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

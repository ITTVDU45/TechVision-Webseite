"use client";
import React from "react";
import Link from "next/link";

export default function IndustrySolutions() {
  const industries = [
    { id: 'legal', name: 'Rechtswesen', icon: '⚖️', description: 'Digitale Transformation für Anwaltskanzleien' },
    { id: 'retail', name: 'Einzelhandel & E-Commerce', icon: '🛍️', description: 'Moderne Lösungen für den digitalen Handel' },
    { id: 'railway', name: 'Bahndienstleistungen', icon: '🚂', description: 'Digitale Lösungen für die Eisenbahnbranche' }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Branchenlösungen</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">Maßgeschneiderte Lösungen für Ihre Branche.</p>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry) => (
              <Link key={industry.id} href={`/industry-solutions/${industry.id}`} className="block">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition">
                  <div className="text-4xl mb-4">{industry.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{industry.name}</h3>
                  <p className="text-gray-400">{industry.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



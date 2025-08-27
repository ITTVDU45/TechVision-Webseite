"use client";
import React from "react";

export default function FAQ() {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <section className="pt-32 pb-16 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Häufig gestellte Fragen</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">Finden Sie schnell Antworten zu unseren Services und Technologien.</p>
          </div>
        </div>
      </section>
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {/* Placeholder FAQs */}
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-white mb-2">Frage {i + 1}</h3>
                <p className="text-gray-400">Antwort auf Frage {i + 1}.</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}



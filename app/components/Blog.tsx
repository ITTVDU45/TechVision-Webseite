"use client";
import React from "react";

export default function Blog() {
  return (
    <div className="min-h-screen relative text-white">
      <section className="pt-32 pb-16 relative overflow-hidden flex items-center min-h-screen">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">Blog</h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">Coming Soon - Wir arbeiten an unserem Blog!</p>
            <div className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-blue-400">Was kommt in unserem Blog?</h2>
              <p className="text-gray-300 mb-6">
                Wir arbeiten an einem umfassenden Blog mit Artikeln zu Technologien, Best Practices und Erfolgsgeschichten.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="text-center">
                  <div className="text-blue-400 font-bold">🤖</div>
                  <div className="text-gray-400">KI & Automatisierung</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">💻</div>
                  <div className="text-gray-400">Softwareentwicklung</div>
                </div>
                <div className="text-center">
                  <div className="text-blue-400 font-bold">🔒</div>
                  <div className="text-gray-400">Cyber Security</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



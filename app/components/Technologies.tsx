"use client";
import React from 'react';

export default function Technologies(): JSX.Element {
  return (
    <section className="min-h-screen bg-black text-white py-24 relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-violet-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="max-w-3xl">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">Technologien</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8">Wir bauen Lösungen mit einem klaren Fokus auf Skalierbarkeit, Sicherheit und Performance. Unsere Toolchain kombiniert bewährte Backend- und Frontend-Technologien mit modernen KI- und Datenplattformen.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">⚛️</div>
                  <div>
                    <h3 className="text-lg font-semibold">Frontend</h3>
                    <p className="text-sm text-gray-300">React, Next.js, Tailwind CSS, Accessibility-first</p>
                  </div>
                </div>
              </article>

              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🔧</div>
                  <div>
                    <h3 className="text-lg font-semibold">Backend</h3>
                    <p className="text-sm text-gray-300">Node.js, TypeScript, REST/GraphQL, scalable APIs</p>
                  </div>
                </div>
              </article>

              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🤖</div>
                  <div>
                    <h3 className="text-lg font-semibold">KI & ML</h3>
                    <p className="text-sm text-gray-300">Model Ops, LangChain, OpenAI, TensorFlow & PyTorch</p>
                  </div>
                </div>
              </article>

              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">☁️</div>
                  <div>
                    <h3 className="text-lg font-semibold">Cloud & DevOps</h3>
                    <p className="text-sm text-gray-300">AWS, Docker, Kubernetes, CI/CD, Observability</p>
                  </div>
                </div>
              </article>

              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">🗄️</div>
                  <div>
                    <h3 className="text-lg font-semibold">Daten & Analytik</h3>
                    <p className="text-sm text-gray-300">Postgres, MongoDB, Elasticsearch, BI & Reporting</p>
                  </div>
                </div>
              </article>

              <article className="bg-gray-900/50 border border-white/10 rounded-2xl p-6 hover:shadow-lg transition-all">
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📱</div>
                  <div>
                    <h3 className="text-lg font-semibold">Mobile & PWA</h3>
                    <p className="text-sm text-gray-300">React Native, Progressive Web Apps</p>
                  </div>
                </div>
              </article>
            </div>
          </div>

          <div className="flex justify-center md:justify-end">
            <img src="/images/multiple-devices-background.webp.png" alt="Technologies mockup" className="w-full max-w-xl rounded-2xl shadow-2xl" />
          </div>
        </div>
      </div>
    </section>
  );
}

// wrapper removed; local implementation above is the source of truth

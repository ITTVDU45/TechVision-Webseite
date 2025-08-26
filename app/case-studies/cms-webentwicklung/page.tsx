"use client";
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Footer from '@/components/Footer';
import Vortex from '@/components/ui/vortex';
import Header from '@/components/Header';
import CarousellTemplate from '@/components/templates/CarousellTemplate';
import { categorizedCases } from '@/components/CaseStudies';

const CaseStudyCMSWebentwicklung: React.FC = () => {
  return (
    <div className="min-h-screen relative">
      <Vortex backgroundColor="black" baseHue={220} particleCount={200} rangeY={800}>
        <div className="relative text-white">
          <Header />

          {/* Hero Section */}
          <section className="pt-32 pb-16 relative overflow-hidden flex items-center min-h-screen">
            <div className="absolute inset-0 opacity-20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
            </div>
            <div className="container mx-auto px-4 relative z-10">
              <Link href="/case-studies" className="absolute top-4 left-4">
                <button className="bg-transparent text-white underline px-3 py-1 hover:text-gray-300 transition">Zurück zu Case Studies</button>
              </Link>
              <div className="max-w-5xl mx-auto text-center">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-8">
                  <span className="text-8xl mb-6 block">🚧</span>
                </motion.div>
                <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-4xl md:text-6xl font-bold mb-6">
                  <span className="text-white">CMS Webentwicklung</span>
                </motion.h1>
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="text-xl md:text-2xl text-gray-400 mb-8">
                  {categorizedCases.webseiten?.find(c => c.id === 'cms-webentwicklung')?.subtitle ?? 'Content Management'}
                </motion.p>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.6 }} className="max-w-3xl mx-auto">
                  <p className="text-gray-300 text-lg text-center">{categorizedCases.webseiten?.find(c => c.id === 'cms-webentwicklung')?.description ?? 'Entwicklung einer modernen Website.'}</p>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Unternehmensbeschreibung */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <p className="text-lg text-gray-300">Ein Unternehmen aus dem Dienstleistungssektor suchte eine moderne, wartungsfreundliche Webseite mit Fokus auf Benutzerführung, responsivem Design und einfacher Inhaltsverwaltung. Ziel war es, eine zentrale Anlaufstelle für potenzielle Kunden zu schaffen und die Online-Präsenz durch gezielte Optimierung nachhaltig zu verbessern.</p>
              </div>
            </div>
          </section>

          {/* Zitat Sektion */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <blockquote className="text-2xl md:text-3xl italic text-white/90 text-center">„Die Zusammenarbeit war durchweg professionell – von der ersten Idee bis zum Livegang. Wir haben nun eine performante, ansprechende Webseite, die wir selbst pflegen können.“</blockquote>
              <p className="text-center text-gray-400 mt-4">— Geschäftsführung</p>
            </div>
          </section>

          {/* Grid Sektion */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-center">
                <div className="bg-neutral-900/50 p-6 rounded-lg"> <h4 className="text-white font-bold">CMS</h4><p className="text-gray-400">WordPress</p></div>
                <div className="bg-neutral-900/50 p-6 rounded-lg"> <h4 className="text-white font-bold">Design</h4><p className="text-gray-400">Divi + Envato Elements</p></div>
                <div className="bg-neutral-900/50 p-6 rounded-lg"> <h4 className="text-white font-bold">Funktion</h4><p className="text-gray-400">Individuelle Inhaltsbereiche, Plugins & API-Verbindungen</p></div>
                <div className="bg-neutral-900/50 p-6 rounded-lg"> <h4 className="text-white font-bold">SEO & DSGVO</h4><p className="text-gray-400">Integration von Google Tools & rechtlicher Konformität</p></div>
              </div>
            </div>
          </section>

          {/* Weitere Informationen */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <p className="text-gray-300">Die Webseite wurde auf Basis von WordPress entwickelt – mit Divi als Page Builder und Envato Elements für Designkomponenten. Um Funktionalität und Skalierbarkeit zu gewährleisten, kamen ausgesuchte Sicherheits-, Performance- und SEO-Plugins zum Einsatz. Die Integration mit Google Analytics und Google Maps wurde datenschutzkonform umgesetzt. Inhalte lassen sich modular bearbeiten, sodass das Team die Webseite eigenständig pflegen kann.</p>
            </div>
          </section>

          {/* Einblicke in das Projekt */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <ul className="list-disc list-inside text-gray-300">
                <li>Einrichtung eines sicheren und skalierbaren WordPress-Setups</li>
                <li>Designentwicklung basierend auf CI-Vorgaben</li>
                <li>Implementierung DSGVO-konformer Tools (Cookie-Banner, Datenschutzerklärung etc.)</li>
                <li>Verbindung zu Google Analytics, Search Console und Unternehmensstandort</li>
                <li>Schulung des Kunden zur eigenen Inhaltsbearbeitung</li>
              </ul>
            </div>
          </section>

          {/* Projektdetails */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold text-white mb-4">Projektdetails</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h4 className="text-white font-bold">Tech Stack</h4>
                  <p className="text-gray-300">WordPress, Divi, Envato Elements, Google Tools, WP-Plugins</p>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h4 className="text-white font-bold">Services</h4>
                  <p className="text-gray-300">CMS-Entwicklung, UI/UX Design, SEO-Basissetup, DSGVO-Implementierung</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 p-6 rounded-lg"><h4 className="text-white font-bold">Projekt Fakten</h4><p className="text-gray-300">1 Webseite, 15 Unterseiten, Launch in 6 Wochen</p></div>
                <div className="bg-neutral-900 p-6 rounded-lg"><h4 className="text-white font-bold">Zeitaufwand</h4><p className="text-gray-300">ca. 80 Stunden</p></div>
              </div>
            </div>
          </section>

          {/* Herausforderungen und Ergebnis */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold text-white mb-4">Herausforderungen und Ergebnis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h4 className="text-white font-bold">Herausforderungen</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Kein technisches Know-how beim Kunden</li>
                    <li>Wunsch nach vollständiger Designfreiheit</li>
                    <li>Integration externer Tools unter Einhaltung der DSGVO</li>
                    <li>Mobile Optimierung und klare Call-to-Actions erforderlich</li>
                  </ul>
                </div>
                <div className="bg-neutral-900 p-6 rounded-lg">
                  <h4 className="text-white font-bold">Ergebnisse</h4>
                  <ul className="list-disc list-inside text-gray-300">
                    <li>Performante, responsive Webseite mit intuitiver Navigation</li>
                    <li>Vollständige Wartbarkeit durch den Kunden über das CMS</li>
                    <li>Messbare SEO-Verbesserung durch optimierte Struktur und Ladezeit</li>
                    <li>Klare Steigerung der Anfragequote über das Kontaktformular</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-8 relative">
            <div className="container mx-auto px-4 text-center">
              <h3 className="text-2xl font-bold text-white mb-4">👉 Du planst ein ähnliches Projekt?</h3>
              <p className="text-gray-300 mb-4">Lass uns gemeinsam dein CMS-Vorhaben umsetzen: Jetzt unverbindlich Kontakt aufnehmen.</p>
              <div className="flex justify-center gap-4">
                <Link href="/contact" className="px-6 py-3 bg-blue-600 text-white rounded-lg">Kontakt aufnehmen</Link>
                <Link href="/case-studies" className="px-6 py-3 border border-white/20 text-white rounded-lg">Weitere Case Studies</Link>
              </div>
            </div>
          </section>

          {/* Weitere Projekte */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <h3 className="text-2xl font-bold text-white mb-6">Projekt-Galerie</h3>
              <div className="grid grid-cols-2 gap-4">
                <img src="/images/Simply1.png" alt="Projekt 1" className="w-full h-40 object-cover rounded-lg" />
                <img src="/images/Simply2.png" alt="Projekt 2" className="w-full h-40 object-cover rounded-lg" />
                <img src="/images/Simply3.png" alt="Projekt 3" className="w-full h-40 object-cover rounded-lg" />
                <img src="/images/Simply4.png" alt="Projekt 4" className="w-full h-40 object-cover rounded-lg" />
              </div>
            </div>
          </section>

          <section className="py-40 relative overflow-hidden">
            <div className="container mx-auto px-4">
              {/* show other case studies (exclude current) */}
              <CarousellTemplate caseStudies={Object.values(categorizedCases).flat().filter(c => c.id !== 'cms-webentwicklung')} />
            </div>
          </section>

          <Footer />
        </div>
      </Vortex>
    </div>
  );
};

export default CaseStudyCMSWebentwicklung;



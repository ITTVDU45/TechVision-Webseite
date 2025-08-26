import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Vortex from '@/components/ui/vortex';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Contact = () => {
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
              <Link href="/" className="absolute top-4 left-4">
                <button className="bg-transparent text-white underline px-3 py-1 hover:text-gray-300 transition">
                  Zurück zur Startseite
                </button>
              </Link>
              <div className="max-w-5xl mx-auto text-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="mb-8"
                >
                  <span className="text-8xl mb-6 block">📞</span>
                </motion.div>
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-4xl md:text-6xl font-bold mb-6"
                >
                  <span className="text-white">Kontakt</span>
                </motion.h1>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-xl md:text-2xl text-gray-400 mb-8"
                >
                  Coming Soon - Wir arbeiten an unserem Kontaktformular!
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto"
                >
                  <h2 className="text-2xl font-bold mb-4 text-blue-400">Was kommt im Kontaktformular?</h2>
                  <p className="text-gray-300 mb-6">
                    Wir entwickeln ein verbessertes Kontaktformular, das Ihnen eine noch bessere und 
                    detailliertere Möglichkeit bietet, mit uns in Kontakt zu treten und Ihre Projekte zu besprechen.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">📧</div>
                      <div className="text-gray-400">E-Mail Kontakt</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">📞</div>
                      <div className="text-gray-400">Telefon Support</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-400 font-bold">💬</div>
                      <div className="text-gray-400">Live Chat</div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="py-16 relative">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto text-center">
                <motion.h2 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="text-3xl font-bold mb-6"
                >
                  Kontaktieren Sie uns direkt
                </motion.h2>
                <motion.p 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="text-gray-400 mb-8 text-lg"
                >
                  Während wir an unserem Kontaktformular arbeiten, stehen wir Ihnen gerne für ein persönliches Gespräch zur Verfügung. 
                  Erzählen Sie uns von Ihren Projekten und wir beraten Sie gerne.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="flex flex-col md:flex-row gap-4 justify-center"
                >
                  <Link
                    href="/offer"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Projektanfrage starten
                  </Link>
                  <Link
                    href="/case-studies"
                    className="bg-transparent border border-blue-600 text-blue-400 hover:bg-blue-600 hover:text-white px-8 py-3 rounded-lg font-semibold transition-colors"
                  >
                    Unsere Projekte ansehen
                  </Link>
                </motion.div>
              </div>
            </div>
          </section>

          <Footer />
        </div>
      </Vortex>
    </div>
  );
};

export default Contact; 
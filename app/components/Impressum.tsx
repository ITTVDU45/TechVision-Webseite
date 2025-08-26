"use client";
import React from 'react';
import AnimatedGradientText from './ui/animated-gradient-text';
import Footer from './Footer';

export default function Impressum(): JSX.Element {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
        </div>

        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6"><span className="text-white">Impressum – </span><AnimatedGradientText>Rechtliche Informationen</AnimatedGradientText></h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed">Hier finden Sie alle wichtigen rechtlichen Informationen zu unserem Unternehmen</p>
          </div>
        </div>
      </section>

      <section className="py-12 relative">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-white/10">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Diensteanbieter</h2>
                <div className="space-y-2 text-gray-300"><p>TechVision Tolgahan Vardar</p><p>Hauffstr. 55</p><p>47166 Duisburg</p></div>
              </div>

              <div>
                <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Kontaktmöglichkeiten</h2>
                <div className="space-y-2 text-gray-300"><p>E-Mail-Adresse: info@it-techvision.de</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}



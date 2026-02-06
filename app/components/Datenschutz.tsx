"use client";
import React from 'react';
import Footer from './Footer';

export default function Datenschutz(): React.JSX.Element {
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <section className="py-24">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Datenschutz</h1>
          <p className="text-gray-400">Diese Seite enthält Informationen zur Datenverarbeitung und Ihren Rechten.</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}



import React from 'react';
import { LogoCarousel } from './logo-carousel'; // Stelle sicher, dass der Pfad korrekt ist

export default function LogoSection() {
  return (
    <section className="py-32 bg-black">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-8">Unsere Partner</h2>
        <LogoCarousel columnCount={3} />
      </div>
    </section>
  );
} 
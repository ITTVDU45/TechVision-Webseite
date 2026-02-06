"use client";
import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  { icon: '🔍', title: 'Analyse', description: 'Wir evaluieren Ihre aktuellen Prozesse und identifizieren Optimierungspotenziale.', gradient: 'from-blue-400 via-blue-500 to-indigo-500', delay: 0.2 },
  { icon: '🎯', title: 'Strategieentwicklung', description: 'Entwicklung einer individuellen KI-Strategie für Ihr Unternehmen.', gradient: 'from-indigo-400 via-purple-500 to-purple-600', delay: 0.4 },
  { icon: '⚡', title: 'Implementierung', description: 'Integration der KI-Lösungen in Ihre bestehenden Systeme.', gradient: 'from-purple-400 via-pink-500 to-red-500', delay: 0.6 },
  { icon: '👥', title: 'Schulung', description: 'Wir schulen Ihr Team im Umgang mit den neuen Technologien.', gradient: 'from-red-400 via-pink-500 to-purple-500', delay: 0.8 },
  { icon: '🛠️', title: 'Support', description: 'Laufende Unterstützung und Optimierung nach der Implementierung.', gradient: 'from-purple-400 via-indigo-500 to-blue-500', delay: 1.0 },
];

type TestimonialsProps = {};

export default function Testimonials(_props: TestimonialsProps): React.JSX.Element {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 5000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const getNextIndex = (current: number) => (current + 1) % processSteps.length;

  const slideVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 1000 : -1000, opacity: 0 }),
    center: { zIndex: 1, x: 0, opacity: 1 },
    exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 1000 : -1000, opacity: 0 }),
  };

  const paginate = (newDirection: number) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => (prevIndex + newDirection + processSteps.length) % processSteps.length);
  };

  return (
    <section id="about" className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-8">Über uns</motion.h2>
          <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg md:text-xl text-gray-300 leading-relaxed">IT-Techvision ist Ihr Partner für digitale Transformation und innovative Technologien.</motion.p>
        </div>

        <div className="relative max-w-6xl mx-auto h-[400px] px-4">
          <div className="flex gap-8 justify-center">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div key={`card-1-${currentIndex}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="w-1/2 max-w-xl">
                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${processSteps[currentIndex].gradient} rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10"><span className="text-4xl mb-6 block">{processSteps[currentIndex].icon}</span><h4 className="text-xl font-bold mb-4">{processSteps[currentIndex].title}</h4><p className="text-gray-400">{processSteps[currentIndex].description}</p></div>
                  <div className="absolute bottom-4 right-4 text-6xl font-bold text-gray-700/20">{currentIndex + 1}</div>
                </div>
              </motion.div>
              <motion.div key={`card-2-${getNextIndex(currentIndex)}`} custom={direction} variants={slideVariants} initial="enter" animate="center" exit="exit" transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.2 } }} className="w-1/2 max-w-xl">
                <div className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl p-8 transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full">
                  <div className={`absolute inset-0 bg-gradient-to-r ${processSteps[getNextIndex(currentIndex)].gradient} rounded-xl opacity-0 hover:opacity-10 transition-opacity duration-300`} />
                  <div className="relative z-10"><span className="text-4xl mb-6 block">{processSteps[getNextIndex(currentIndex)].icon}</span><h4 className="text-xl font-bold mb-4">{processSteps[getNextIndex(currentIndex)].title}</h4><p className="text-gray-400">{processSteps[getNextIndex(currentIndex)].description}</p></div>
                  <div className="absolute bottom-4 right-4 text-6xl font-bold text-gray-700/20">{getNextIndex(currentIndex) + 1}</div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="absolute z-10 w-full flex items-center justify-between top-1/2 -translate-y-1/2 -mx-16">
            <motion.button className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white flex items-center justify-center backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300 group" onClick={() => paginate(-1)} whileHover={{ x: -5 }} whileTap={{ scale: 0.95 }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
            </motion.button>
            <div className="flex gap-3 px-4">{processSteps.map((_, index) => (<button key={index} onClick={() => { setDirection(index > currentIndex ? 1 : -1); setCurrentIndex(index); }} className={`w-4 h-4 rounded-full transition-all duration-300 ${index === currentIndex || index === getNextIndex(currentIndex) ? 'bg-gradient-to-r from-blue-400 to-indigo-500 scale-110' : 'bg-gray-600 hover:bg-gray-500'}`} />))}</div>
            <motion.button className="w-14 h-14 rounded-full bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 text-white flex items-center justify-center backdrop-blur-sm shadow-lg hover:scale-110 transition-all duration-300 group" onClick={() => paginate(1)} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
            </motion.button>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />
    </section>
  );
}

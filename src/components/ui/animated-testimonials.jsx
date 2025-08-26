"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const AnimatedTestimonials = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [testimonials.length]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const previousTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <div className="h-[450px] relative overflow-hidden">
      {/* Hintergrund-Karten */}
      <div className="absolute inset-0 flex items-center justify-center">
        {testimonials.map((_, idx) => (
          <motion.div
            key={idx}
            className="absolute aspect-[4/3] w-[300px] rounded-2xl overflow-hidden bg-neutral-800"
            animate={{
              scale: idx === currentIndex ? 1 : 0.9,
              x: `${(idx - currentIndex) * 40}%`,
              y: idx === currentIndex ? 0 : 20,
              opacity: idx === currentIndex ? 1 : 0.3,
              zIndex: testimonials.length - Math.abs(idx - currentIndex),
            }}
            transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
          >
            <img
              src={testimonials[idx].src}
              alt=""
              className="w-full h-full object-cover opacity-50"
            />
          </motion.div>
        ))}
      </div>

      {/* Hauptinhalt */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 100, scale: 0.8 }}
              animate={{
                opacity: idx === currentIndex ? 1 : 0,
                x: idx === currentIndex ? 0 : -100,
                scale: idx === currentIndex ? 1 : 0.8,
              }}
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
              className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                idx === currentIndex ? "pointer-events-auto" : "pointer-events-none"
              }`}
            >
              {/* Linke Seite - Text */}
              <div className="flex flex-col justify-center space-y-8">
                <p className="text-xl md:text-2xl text-neutral-200 leading-relaxed">
                  "{testimonial.quote}"
                </p>
                <div>
                  <h3 className="text-lg md:text-xl font-medium text-white mb-2">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm md:text-base text-neutral-400">
                    {testimonial.designation}
                  </p>
                </div>
              </div>

              {/* Rechte Seite - Bild */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <img
                  src={testimonial.src}
                  alt={testimonial.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Navigation Container */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-8 z-20">
        {/* Linker Pfeil */}
        <button
          onClick={previousTestimonial}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Navigation Dots */}
        <div className="flex gap-2">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                idx === currentIndex 
                  ? "bg-white w-6" 
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>

        {/* Rechter Pfeil */}
        <button
          onClick={nextTestimonial}
          className="p-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

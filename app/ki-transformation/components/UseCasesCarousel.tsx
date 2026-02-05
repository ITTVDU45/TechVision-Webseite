"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { UseCase } from "./types";

interface UseCasesCarouselProps {
  useCases: UseCase[];
  autoSlideInterval?: number;
}

export default function UseCasesCarousel({
  useCases,
  autoSlideInterval = 5000,
}: UseCasesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth < 768);
      const handleResize = () => setIsMobile(window.innerWidth < 768);
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const slides = isMobile ? 1 : 3;
  const visibleUseCases = () => useCases.slice(currentIndex, currentIndex + slides);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev >= useCases.length - 1 ? 0 : prev + 1));
    }, autoSlideInterval);
    return () => clearInterval(timer);
  }, [useCases.length, autoSlideInterval]);

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - slides + useCases.length) % useCases.length);
  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + slides) % useCases.length);

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="relative max-w-7xl mx-auto">
          <div className={`flex gap-6 ${isMobile ? "flex-col" : "flex-row"}`}>
            {visibleUseCases().map((uc, idx) => (
              <motion.div
                key={uc.title + idx}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]"
              >
                <div
                  className={`bg-gradient-to-br ${
                    idx % 2 === 0
                      ? "from-blue-500 via-indigo-500 to-violet-600"
                      : "from-violet-600 via-indigo-500 to-blue-500"
                  } p-[1px] rounded-2xl h-full`}
                >
                  <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                    <div className="mb-6 flex-grow">
                      <h3 className="text-xl font-bold text-white mb-2">{uc.title}</h3>
                      {uc.example && (
                        <p className="text-gray-400 text-sm mb-4">{uc.example}</p>
                      )}
                      <p className="text-gray-300 text-sm">{uc.description}</p>
                    </div>
                    {uc.stats && (
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        {uc.stats.map((stat, si) => (
                          <div key={si} className="text-center">
                            <div className="text-xl font-bold text-white">{stat.value}</div>
                            <div className="text-xs text-gray-400 mt-1">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    )}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300"
                    >
                      Mehr dazu
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(useCases.length / slides) }).map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i * slides)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  Math.floor(currentIndex / slides) === i ? "bg-blue-600 w-4" : "bg-blue-900"
                }`}
              />
            ))}
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-colors duration-200"
          >
            <ChevronRightIcon className="w-6 h-6 text-blue-400" />
          </button>
        </div>
      </div>
    </section>
  );
}

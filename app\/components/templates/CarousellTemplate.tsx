import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

const CarousellTemplate = ({ caseStudies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  
  // Mobile detection in useEffect to avoid SSR issues
  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
  }, []);
  
  const slideCount = isMobile ? 1 : 2; // Zeige 1 Slide auf mobilen Geräten, sonst 2

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideCount + caseStudies.length) % caseStudies.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideCount) % caseStudies.length);
  };

  const visibleCases = () => {
    if (caseStudies.length <= slideCount) {
      return caseStudies;
    }
    return caseStudies.slice(currentIndex, currentIndex + slideCount);
  };

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-white">Unsere </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
              Erfolgsgeschichten
            </span>
          </h2>
          <p className="text-xl text-gray-400">
            Entdecken Sie, wie wir Unternehmen bei ihrer digitalen Transformation unterstützen.
          </p>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                   hover:bg-blue-500/20 transition-colors duration-200"
        >
          <ChevronLeftIcon className="w-6 h-6 text-blue-400" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-blue-500/10 
                   hover:bg-blue-500/20 transition-colors duration-200"
        >
          <ChevronRightIcon className="w-6 h-6 text-blue-400" />
        </button>

        {/* Cases Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden mx-12">
            <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              {visibleCases().map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.title}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(50%-1rem)]"
                >
                  <div className={`bg-gradient-to-br ${
                    index % 2 === 0 
                      ? 'from-blue-500 via-indigo-500 to-violet-600' 
                      : 'from-violet-600 via-indigo-500 to-blue-500'
                  } p-[1px] rounded-2xl h-full`}>
                    <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
                      {/* Image */}
                      <div className="mb-6 aspect-video rounded-xl overflow-hidden">
                        <img
                          src={caseStudy.image}
                          alt={caseStudy.title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Case Study Content */}
                      <div className="mb-6 flex-grow">
                        <h3 className="text-xl font-bold text-white mb-2">
                          {caseStudy.title}
                        </h3>
                        <p className="text-sm text-gray-400 mb-4">
                          {caseStudy.subtitle}
                        </p>
                        <p className="text-gray-300 text-sm">
                          {caseStudy.description}
                        </p>
                      </div>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {caseStudy.stats.map((stat, statIndex) => (
                          <div key={statIndex} className="text-center">
                            <div className="text-xl font-bold bg-gradient-to-r from-blue-400 via-indigo-500 to-violet-500 bg-clip-text text-transparent">
                              {stat.value}
                            </div>
                            <div className="text-xs text-gray-400 mt-1">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Mehr dazu Button */}
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                  rounded-lg text-white text-sm font-medium 
                                  hover:shadow-lg transition-all duration-300
                                  relative overflow-hidden group"
                      >
                        <span className="relative z-10">Mehr dazu</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                      group-hover:opacity-20 transition-opacity duration-300" />
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(caseStudies.length / slideCount) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index * slideCount)}
                className={`w-2 h-2 rounded-full transition-all duration-300 
                          ${Math.floor(currentIndex / slideCount) === index 
                            ? 'bg-blue-600 w-4' 
                            : 'bg-blue-900'}`}
              />
            ))}
          </div>

          {/* "Alle Casestudies" Button */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link href="/case-studies">
              <motion.button
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 0 20px rgba(79, 70, 229, 0.4)" // Indigo Schatten
                }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 
                         rounded-xl text-lg font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Alle unsere Case Studies</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-400 opacity-0 
                             group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CarousellTemplate; 
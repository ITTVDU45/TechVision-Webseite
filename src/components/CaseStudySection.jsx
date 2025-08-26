import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';

const cases = [
  {
    title: "Cybersecurityberatung",
    subtitle: "IT-Sicherheit",
    description: "Umfassende Sicherheitsanalyse und Implementierung von Schutzmaßnahmen für kritische Infrastrukturen.",
    stats: [
      { value: "100%", label: "Compliance" },
      { value: "90%", label: "Risikominderung" },
      { value: "24/7", label: "Monitoring" }
    ],
    gradient: "from-blue-400 via-indigo-500 to-violet-600",
    image: "/images/cybersecurity.jpg",
    id: "cybersecurityberatung"
  },
  {
    title: "KI Transformation",
    subtitle: "Strategieberatung",
    description: "Entwicklung einer KI-Strategie und Roadmap für die digitale Transformation.",
    stats: [
      { value: "40%", label: "Effizienzsteigerung" },
      { value: "60%", label: "Prozessoptimierung" },
      { value: "25%", label: "Kosteneinsparung" }
    ],
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
    image: "/images/ai-robot.jpg",
    id: "ki-transformation"
  },
  {
    title: "CMS Webentwicklung",
    subtitle: "Content Management",
    description: "Entwicklung einer modernen Website mit headless CMS und Next.js Frontend.",
    stats: [
      { value: "300%", label: "Schneller" },
      { value: "99%", label: "SEO Score" },
      { value: "65%", label: "Mehr Conversions" }
    ],
    gradient: "from-orange-400 via-orange-500 to-red-500",
    image: "/images/cms-development.jpg",
    id: "cms-webentwicklung"
  },
  {
    title: "CRM mit KI-Agenten",
    subtitle: "Kundenmanagement",
    description: "Integration von KI-Agenten in bestehende CRM-Systeme für automatisierte Kundenbetreuung.",
    stats: [
      { value: "45%", label: "Schnellere Reaktion" },
      { value: "30%", label: "Mehr Zufriedenheit" },
      { value: "50%", label: "Effizienzsteigerung" }
    ],
    gradient: "from-purple-400 via-purple-500 to-indigo-500",
    image: "/images/crm-entwicklung.jpg",
    id: "crm-mit-ki-agenten"
  },
  {
    title: "Microsoft Dynamics Integration",
    subtitle: "ERP-System",
    description: "Nahtlose Integration und Anpassung von Microsoft Dynamics 365.",
    stats: [
      { value: "55%", label: "Prozessoptimierung" },
      { value: "40%", label: "Zeitersparnis" },
      { value: "35%", label: "ROI" }
    ],
    gradient: "from-cyan-400 via-blue-500 to-blue-600",
    image: "/images/erp-integration.jpg",
    id: "microsoft-dynamics-integration"
  },
  {
    title: "E-Commerce Lösungen",
    subtitle: "Online-Handel",
    description: "Entwicklung skalierbarer E-Commerce Plattformen mit Shopify und WooCommerce.",
    stats: [
      { value: "200%", label: "Mehr Umsatz" },
      { value: "45%", label: "Conversion Rate" },
      { value: "60%", label: "Mobile Traffic" }
    ],
    gradient: "from-green-400 via-green-500 to-emerald-600",
    image: "/images/onlineshop.jpg",
    id: "e-commerce-solutions"
  },
  {
    title: "KI Telefonie",
    subtitle: "Automatisierung",
    description: "Implementation von KI-gestützten Telefoniesystemen für verbesserten Kundenservice.",
    stats: [
      { value: "90%", label: "Annahmequote" },
      { value: "75%", label: "Zeitersparnis" },
      { value: "45%", label: "Mehr Buchungen" }
    ],
    gradient: "from-red-400 via-red-500 to-orange-500",
    image: "/images/aitelefonie.jpg",
    id: "ki-telefonie"
  },
  {
    title: "Kanzlei Digitalisierung",
    subtitle: "Legal Tech",
    description: "Digitale Transformation einer Anwaltskanzlei mit KI-gestützten Prozessen.",
    stats: [
      { value: "65%", label: "Effizienter" },
      { value: "50%", label: "Schneller" },
      { value: "35%", label: "Kosteneinsparung" }
    ],
    gradient: "from-indigo-400 via-violet-500 to-purple-600",
    image: "/images/legaltech.jpg",
    id: "kanzlei-digitalisierung"
  }
];

export default function CaseStudySection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [slideCount, setSlideCount] = useState(3);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSlideCount(mobile ? 1 : 3);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - slideCount + cases.length) % cases.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + slideCount) % cases.length);
  };

  const visibleCases = () => {
    return cases.slice(currentIndex, currentIndex + slideCount);
  };

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Case Studies Section */}
      <section id="case-studies" className="py-32 bg-black relative overflow-hidden">
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

          <div className="overflow-hidden mx-12">
            <div className={`flex gap-6 ${isMobile ? 'flex-col' : 'flex-row'}`}>
              {visibleCases().map((caseStudy, index) => (
                <motion.div
                  key={caseStudy.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(33.333%-1rem)]"
                >
                  <div className={`bg-gradient-to-br ${
                    index % 2 === 0 
                      ? 'from-blue-500 via-indigo-500 to-violet-600' 
                      : 'from-violet-600 via-indigo-500 to-blue-500'
                  } p-[1px] rounded-2xl h-full`}>
                    <div className="bg-gray-900 p-6 rounded-2xl h-full flex flex-col">
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
                      <Link href={`/case-studies/${caseStudy.id}`}>
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
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: Math.ceil(cases.length / slideCount) }).map((_, index) => (
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
        </div>
      </section>
    </div>
  );
}
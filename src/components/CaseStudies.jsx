import React, { useState } from 'react';
import { motion } from 'framer-motion'
import { GlowingEffect } from './ui/glowing-effect'
import Vortex from './ui/vortex'
import ColourfulText from "./ui/colourful-text"
import AnimatedGradientText from "./ui/animated-gradient-text"
import Link from 'next/link'
import CaseStudyCRM from './CaseStudyCRM';
import MicrosoftDynamicsIntegration from './CaseStudyMicrosoftDynamics';
import Header from './Header';
import CaseStudyKITelefonie from './CaseStudyKITelefonie';
import CaseStudyKanzleiDigitalisierung from './CaseStudyKanzleiDigittalisierung';
import CaseStudyKonfigurator from './CaseStudyKonfigurator';
import CaseStudyPasswordManager from './CaseStudyPasswordManager';
import CaseStudyPersonalAssistant from './CaseStudyPersonalAssistant';


const categories = [
  { id: 'beratung', name: 'Beratung' },
  { id: 'webseiten', name: 'Webseiten' },
  { id: 'software', name: 'Software' },
  { id: 'onlineshop', name: 'Onlineshop' },
  { id: 'tools-ki-agenten', name: 'Tools & KI Agenten' },
]

export const categorizedCases = {
  beratung: [
    {
      title: "Cybersecurityberatung",
      subtitle: "IT-Sicherheit",
      description: "Umfassende Sicherheitsanalyse und Implementierung von Schutzmaßnahmen für kritische Infrastrukturen.",
      image: "/images/cybersecurity.jpg",
      stats: [
        { value: "100%", label: "Compliance" },
        { value: "90%", label: "Risikominderung" },
        { value: "24/7", label: "Monitoring" }
      ],
      id: "cybersecurityberatung"
    },
    {
      title: "KI Transformation",
      subtitle: "Strategieberatung",
      description: "Entwicklung einer KI-Strategie und Roadmap für die digitale Transformation.",
      image: "/images/ai-robot.jpg",
      stats: [
        { value: "40%", label: "Effizienzsteigerung" },
        { value: "60%", label: "Prozessoptimierung" },
        { value: "25%", label: "Kosteneinsparung" }
      ],
      id: "ki-transformation"
    }
  ],
  webseiten: [
    {
      title: "CMS Webentwicklung",
      subtitle: "Content Management",
      description: "Entwicklung einer modernen Website mit headless CMS und Next.js Frontend.",
      image: "/images/cms-development.jpg",
      stats: [
        { value: "300%", label: "Schneller" },
        { value: "99%", label: "SEO Score" },
        { value: "65%", label: "Mehr Conversions" }
      ],
      id: "cms-webentwicklung"
    }
  ],
  software: [
    {
      id: "crm-mit-ki-agenten",
      title: "CRM mit KI-Agenten",
      subtitle: "Kundenmanagement",
      description: "Integration von KI-Agenten in bestehende CRM-Systeme für automatisierte Kundenbetreuung.",
      image: "/images/crm-entwicklung.jpg",
      stats: [
        { value: "45%", label: "Schnellere Reaktion" },
        { value: "30%", label: "Mehr Zufriedenheit" },
        { value: "50%", label: "Effizienzsteigerung" }
      ],
    },
    {
      title: "Entwicklung der CRAFTGO Mitarbeiter-App",
      subtitle: "Mobile App",
      description: "Employee Management System für Bauunternehmen",
      image: "/images/Mockup Laptop2.png",
      stats: [
        { value: "60%", label: "mehr Effizien" },
        { value: "40%", label: "weniger Verwaltung" },
        { value: "45%", label: "schnellere Organisation" }
      ],
      id: "microsoft-dynamics-integration"
    },
    {
      title: "Kanzlei Digitalisierung",
      subtitle: "Legal Tech",
      description: "Digitale Transformation einer Anwaltskanzlei mit KI-gestützten Prozessen.",
      image: "/images/legaltech.jpg",
      stats: [
        { value: "65%", label: "Effizienter" },
        { value: "50%", label: "Schneller" },
        { value: "35%", label: "Kosteneinsparung" }
      ],
      id: "kanzlei-digitalisierung",
      component: <CaseStudyKanzleiDigitalisierung />
    }
  ],
  onlineshop: [
    {
      title: "E-Commerce Lösungen mit Shopify",
      subtitle: "Online-Handel",
      description: "Entwicklung skalierbarer E-Commerce Plattformen mit Shopify und WooCommerce.",
      image: "/images/onlineshop.jpg",
      stats: [
        { value: "200%", label: "Mehr Umsatz" },
        { value: "45%", label: "Conversion Rate" },
        { value: "60%", label: "Mobile Traffic" }
      ],
      id: "e-commerce-solutions"
    },
    {
      title: "Produktkonfigurator - Woocommerce",
      subtitle: "Flexibel, Benutzerfreundlich & Effizient",
      description: "Entwicklung eines benutzerfreundlichen und flexiblen Konfigurators für individuelle Produktanpassungen.",
      image: "/images/planen3.png",
      stats: [
        { value: "80%", label: "Effizienzsteigerung" },
        { value: "70%", label: "Kundenzufriedenheit" },
        { value: "60%", label: "Prozessoptimierung" }
      ],
      id: "konfigurator",
      component: <CaseStudyKonfigurator />
    }
  ],
  'tools-ki-agenten': [
    {
      title: "KI Telefonie",
      subtitle: "Automatisierung",
      description: "Implementation von KI-gestützten Telefoniesystemen für verbesserten Kundenservice.",
      image: "/images/aitelefonie.jpg",
      stats: [
        { value: "90%", label: "Annahmequote" },
        { value: "75%", label: "Zeitersparnis" },
        { value: "45%", label: "Mehr Buchungen" }
      ],
      id: "ki-telefonie"
    },
    {
      title: "Passwortmanager",
      subtitle: "Sicherheit & Komfort",
      description: "Implementierung eines sicheren Passwortmanagers für Unternehmen.",
      image: "/images/Passwordmanageraufmacher.png",
      stats: [
        { value: "99%", label: "Sicherheit" },
        { value: "100%", label: "Benutzerfreundlichkeit" },
        { value: "100%", label: "Integration" }
      ],
      id: "password-manager",
      component: <CaseStudyPasswordManager />
    },
    {
      title: "KI-gestützter Personal Assistant",
      subtitle: "Effizienz und Komfort",
      description: "Implementierung eines KI-gestützten Personal Assistants zur Steigerung der Produktivität.",
      image: "/images/KIAGENTBILD.jpeg",
      stats: [
        { value: "70%", label: "Produktivitätssteigerung" },
        { value: "60%", label: "Effizienz" },
        { value: "50%", label: "Kundenzufriedenheit" }
      ],
      id: "personal-assistant",
      component: <CaseStudyPersonalAssistant />
    }
  ]
}

const CaseStudies = () => {
  const [selectedCategory, setSelectedCategory] = useState('software');

  const categorizedCasesSoftware = categorizedCases.software || [];
  const categorizedCasesKiTransformation = categorizedCases['ki-transformation'] || [];
  const categorizedCasesOnlineshop = categorizedCases.onlineshop || [];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="py-32 relative overflow-hidden bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Unsere </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                Erfolgsgeschichten
              </span>
            </motion.h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Entdecken Sie, wie wir Unternehmen bei ihrer digitalen Transformation unterstützen.
            </p>
          </div>
        </div>
      </section>
      
      {/* Kategorie-Filter */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-2 rounded-full transition-all ${
                  selectedCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {categorizedCases[selectedCategory]?.map((caseStudy, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-neutral-900 rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative h-48">
                  <img
                    src={caseStudy.image}
                    alt={caseStudy.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{caseStudy.title}</h3>
                  <p className="text-gray-400 text-sm mb-4">{caseStudy.subtitle}</p>
                  <p className="text-gray-300 mb-6">{caseStudy.description}</p>
                  {caseStudy.stats && (
                    <div className="flex justify-around mb-4">
                      {caseStudy.stats.map((stat, statIndex) => (
                        <div key={statIndex} className="text-center">
                          <div className="text-blue-500 font-bold text-xl">{stat.value}</div>
                          <div className="text-gray-400 text-sm">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                  )}
                  {caseStudy.id && (
                    <Link
                      href={`/case-studies/${caseStudy.id}`}
                      className="mt-6 inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Mehr erfahren
                    </Link>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default CaseStudies;
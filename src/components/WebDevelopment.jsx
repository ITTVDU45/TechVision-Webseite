import React, { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'framer-motion';
import { MacbookScroll } from './ui/macbook-scroll';
import { BentoGrid, BentoCard } from "@/components/magicui/bento-grid";
import { Spotlight } from './ui/spotlight-new';
import { Marquee } from '@/components/magicui/marquee';
import {
  RocketLaunchIcon,
  ServerStackIcon,
  CircleStackIcon,
  CommandLineIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/outline";

import { AnimatedTestimonials } from '@/components/ui/animated-testimonials';
import Vortex from '@/components/ui/vortex';
import { GlowingEffect } from '@/components/ui/glowing-effect';
import AnimatedGradientText from "@/components/ui/animated-gradient-text";

import Link from 'next/link';
import CarousellTemplate from './templates/CarousellTemplate';

// Badge Komponente für MacbookScroll
const Badge = ({ className }) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 56 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M56 28C56 43.464 43.464 56 28 56C12.536 56 0 43.464 0 28C0 12.536 12.536 0 28 0C43.464 0 56 12.536 56 28Z"
        fill="#00AA45"
      />
      {/* Rest der SVG-Pfade hier */}
    </svg>
  );
};

const ProjectContent = ({ title, description, image }) => {
  return (
    <div className="bg-neutral-900 p-8 md:p-14 rounded-3xl mb-4">
      <p className="text-neutral-300 text-base md:text-2xl font-sans max-w-3xl mx-auto">
        <span className="font-bold text-white">
          {title}
        </span>{" "}
        {description}
      </p>
      <img
        src={image}
        alt={title}
        className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain mt-8"
      />
    </div>
  );
};

const webDevBlogPosts = [
  {
    title: "Modern Web Development",
    excerpt: "Die neuesten Trends in der Webentwicklung mit React und Next.js",
    image: "/images/blog/web-dev.jpg",
    category: "Development",
    date: "20. März 2024",
    gradient: "from-blue-500 to-indigo-500",
    link: "/blog/web-development"
  },
  {
    title: "Performance Optimierung",
    excerpt: "Strategien zur Verbesserung der Website-Performance und Core Web Vitals",
    image: "/images/blog/performance.jpg",
    category: "Optimierung",
    date: "18. März 2024",
    gradient: "from-indigo-500 to-purple-500",
    link: "/blog/performance-optimization"
  },
  {
    title: "Responsive Design 2024",
    excerpt: "Mobile-First Ansätze und moderne CSS-Techniken für responsive Websites",
    image: "/images/blog/responsive.jpg",
    category: "Design",
    date: "15. März 2024",
    gradient: "from-purple-500 to-pink-500",
    link: "/blog/responsive-design"
  },
  {
    title: "TypeScript Best Practices",
    excerpt: "Effektive Nutzung von TypeScript in modernen Web-Anwendungen",
    image: "/images/blog/typescript.jpg",
    category: "Programming",
    date: "12. März 2024",
    gradient: "from-blue-600 to-cyan-500",
    link: "/blog/typescript-practices"
  },
  {
    title: "API Design Patterns",
    excerpt: "REST vs. GraphQL und moderne API-Architekturen im Vergleich",
    image: "/images/blog/api-design.jpg",
    category: "Backend",
    date: "10. März 2024",
    gradient: "from-cyan-500 to-emerald-500",
    link: "/blog/api-design"
  },
  {
    title: "State Management",
    excerpt: "Von Redux bis Zustand: Moderne State Management Lösungen",
    image: "/images/blog/state-management.jpg",
    category: "Frontend",
    date: "8. März 2024",
    gradient: "from-emerald-500 to-blue-500",
    link: "/blog/state-management"
  }
];

export default function WebDevelopment() {
  const [activeIndex, setActiveIndex] = useState(-1);

  const caseStudies = [
    {
      title: "E-Commerce Platform",
      description: "Entwicklung eines modernen Online-Shops mit Next.js und Shopify",
      image: "/images/case-study-1.jpg",
      gradient: "from-blue-500 via-indigo-500 to-violet-600",
      stats: [
        { value: "150%", label: "Umsatzsteigerung" },
        { value: "65%", label: "Schnellere Ladezeit" }
      ]
    },
    {
      title: "Corporate Website",
      description: "Responsive Unternehmenswebsite mit React und Tailwind CSS",
      image: "/images/case-study-2.jpg",
      gradient: "from-violet-500 via-indigo-500 to-blue-600",
      stats: [
        { value: "40%", label: "Mehr Conversions" },
        { value: "85%", label: "Mobile Traffic" }
      ]
    },
    {
      title: "Web Application",
      description: "Progressive Web App für Projektmanagement",
      image: "/images/case-study-3.jpg",
      gradient: "from-blue-500 via-indigo-500 to-violet-600",
      stats: [
        { value: "30%", label: "Effizienzsteigerung" },
        { value: "50%", label: "Schnellere Prozesse" }
      ]
    }
  ];

  const handleNext = () => {
    if (!selectedService) return;

    // Mapping von Service-Namen zu Routen
    const serviceRoutes = {
      'Webseitenentwicklung': '/web-development-form',
      'Softwareentwicklung': '/software-development-form',
      'Workflow Automatisierung': '/workflow-automation-form',
      'KI-Transformation': '/ki-transformation-form',
      'IT-Infrastruktur': '/it-infrastructure-form',
      'Cyber-Sicherheit': '/cyber-security-form',
      'Tools & KI-Agenten': '/tools-form'
    };

    router.push(serviceRoutes[selectedService]);
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 animate-gradient bg-[length:200%_200%]" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20" />
          
          {/* Animated Process Lines */}
          <div className="absolute inset-0">
            <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
              <motion.path
                d="M0,50 Q25,30 50,50 T100,50"
                stroke="url(#gradient)"
                strokeWidth="0.2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#0ea5e9" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 py-32 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            {/* Headline */}
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              <span className="text-white">Webentwicklung der </span>
              <AnimatedGradientText>
                nächsten Generation
              </AnimatedGradientText>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Moderne Weblösungen mit Fokus auf Performance, Benutzerfreundlichkeit und Skalierbarkeit.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <GlowingEffect>
                <Link href="/offer" className="px-8 py-4 bg-gradient-to-r from-blue-500 to-cyan-600 text-white rounded-xl text-lg font-medium hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300">
                  Webseitenprojekt anfragen
                </Link>
              </GlowingEffect>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <div className="w-6 h-10 border-2 border-white/20 rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="w-1 h-1 bg-white rounded-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bento Grid Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold">
                <span className="text-white">Unsere </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                  Expertise
                </span>
                <span className="text-white"> in der modernen Webentwicklung</span>
              </h2>
            </div>
            <div>
              <p className="text-xl text-gray-400 leading-relaxed">
                Wir kombinieren modernste Technologien mit bewährten Entwicklungspraktiken, 
                um skalierbare und performante Webanwendungen zu erstellen.
              </p>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {[
            {
              title: "Frontend Entwicklung",
              description: "",
              items: [
                "HTML",
                "CSS",
                "JavaScript",
                "React, Vue.js, Angular, Bootstrap",
                "Tailwind CSS",
                "Next.js",
                "WordPress",
                "Webflow",
                "PWA",
                "Shopify",
                "JTL-Shop",
                "Woocommerce"
              ],
              gradient: "from-blue-500 to-indigo-500",
              className: "md:col-span-1"
            },
            {
              title: "Backend Systeme",
              description: "",
              items: [
                "Node.JS",
                "Python",
                "PHP",
                "JAVA",
                "RUBY",
                "C#",
                "Laravel",
                "Flask",
                "Django",
                "REST",
                "WebSockets",
                "JSON",
                "OAuth 2.0",
                "Docker, NGINX, Apache",
                "VPS",
                "Grafana"
              ],
              gradient: "from-indigo-500 to-purple-500",
              className: "md:col-span-1"
            },
            {
              title: "Datenbanken",
              description: "",
              items: [
                "MySQL",
                "PostgreSQL",
                "SQLite",
                "MongoDB",
                "Vectordatenbanken",
                "MinIO",
                "Elasticsearch"
              ],
              gradient: "from-purple-500 to-blue-500",
              className: "md:col-span-1"
            },
            {
              title: "Design - UI/UX",
              description: "Professionelle UI/UX-Design-Lösungen mit modernsten Tools und Workflows.",
              items: [
                "Figma",
                "Adobe XD",
                "Sketch",
                "Zeplin",
                "Lottiefiles",
                "React Registery",
                "Wireframing",
                "Prototyping",
                "Design Systems",
                "Component Libraries",
                "Motion Design",
                "Responsive Design"
              ],
              gradient: "from-blue-600 to-indigo-600",
              className: "md:col-span-1 lg:col-span-2"
            },
            {
              title: "Security",
              description: "",
              items: [
                "SSL/TLS-Verschlüsselung",
                "Passwort-Hashing (bcrypt, argon2)",
                "Multi-Faktor-Authentifizierung",
                "SQL Injection Prevention",
                "XSS Protection",
                "Command Injection Prevention",
                "Secure Cookies",
                "Session Management",
                "Role-Based Access Control",
                "CSRF Protection",
                "Secure File Upload",
                "Security Logging",
                "Intrusion Detection",
                "Regular Security Updates",
                "Automated Security Scans"
              ],
              gradient: "from-indigo-600 to-purple-600",
              className: "md:col-span-1"
            }
          ].map((service, index) => (
            <BentoCard
              key={service.title}
              name={service.title}
              description={service.description}
              items={service.items}
              className={service.className}
              background={
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/10 to-violet-600/10" />
              }
            />
          ))}
        </div>
      </section>

      {/* Carousell Section */}
      <section className="py-32 bg-black">
        <CarousellTemplate caseStudies={caseStudies} />
      </section>

      {/* Testimonials/Case Studies Section */}
      {/* Removed as per instructions */}

      {/* Testimonials Section mit Marquee */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
                Was unsere Kunden sagen
              </h2>
            </div>
            <div>
              <p className="text-xl text-gray-400 leading-relaxed">
                Erfahren Sie aus erster Hand, wie unsere Lösungen Unternehmen dabei helfen, 
                ihre digitalen Herausforderungen zu meistern.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-8">
          {/* Erste Marquee - scrollt nach rechts */}
          <Marquee className="[--gap:2rem] [--duration:40s]" pauseOnHover>
            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                alt="Marie Schmidt"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "Die neue Plattform hat unseren Online-Umsatz verdoppelt."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Marie Schmidt, TechRetail GmbH</p>
              </div>
            </div>
            
            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                alt="Thomas Weber"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "Perfekte Integration von KI in unsere Systeme."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Thomas Weber, InnovateTech AG</p>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                alt="Laura Meyer"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "Rekordzeit bei der IoT-Plattform-Entwicklung."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Laura Meyer, SmartSolutions SE</p>
              </div>
            </div>
          </Marquee>

          {/* Zweite Marquee - scrollt nach links */}
          <Marquee className="[--gap:2rem] [--duration:40s]" reverse pauseOnHover>
            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d"
                alt="Michael Bauer"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "80% Effizienzsteigerung durch neue Webanwendung."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Michael Bauer, ProcessPro Solutions</p>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80"
                alt="Sandra Klein"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "Endlich Echtzeitdaten und KI-gestützte Prognosen."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Sandra Klein, DataVision</p>
              </div>
            </div>

            <div className="flex items-center gap-8 bg-neutral-900/50 backdrop-blur-sm rounded-xl p-6 w-[400px]">
              <img
                src="https://images.unsplash.com/photo-1624561172888-ac93c696e10c"
                alt="Lisa Thompson"
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <p className="text-sm text-neutral-300">
                  "Skalierbarkeit und Performance sind beeindruckend."
                </p>
                <p className="text-xs text-neutral-400 mt-2">Lisa Thompson, FutureNet</p>
              </div>
            </div>
          </Marquee>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Der Weg zu Ihrer neuen Website
            </h2>
            <p className="text-xl text-gray-400 mt-6">
              In vier einfachen Schritten zu Ihrem perfekten Web-Auftritt
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                number: "01",
                title: "Bedarfsanalyse",
                description: "Sie haben erkannt: Eine moderne Website ist der Schlüssel zum Erfolg. Wir analysieren gemeinsam Ihre Anforderungen.",
                icon: "🎯",
                gradient: "from-blue-500 via-blue-600 to-indigo-500"
              },
              {
                number: "02",
                title: "Konzeption",
                description: "In einem persönlichen Gespräch entwickeln wir die perfekte Strategie für Ihren Web-Auftritt.",
                icon: "💡",
                gradient: "from-indigo-500 via-purple-500 to-purple-600"
              },
              {
                number: "03",
                title: "Entwicklung",
                description: "Unser Team setzt Ihre Website mit modernsten Technologien pixel-perfekt um.",
                icon: "⚡",
                gradient: "from-purple-500 via-pink-500 to-red-500"
              },
              {
                number: "04",
                title: "Launch & Support",
                description: "Nach dem Go-Live bleiben wir an Ihrer Seite und sorgen für kontinuierliche Optimierung.",
                icon: "🚀",
                gradient: "from-red-500 via-orange-500 to-yellow-500"
              }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative group"
              >
                <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8 h-full 
                              border border-neutral-800 hover:border-neutral-700 transition-all duration-300
                              transform hover:-translate-y-2">
                  <div className={`absolute inset-0 bg-gradient-to-br ${step.gradient} opacity-0 
                                group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{step.icon}</span>
                    <span className={`text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${step.gradient}`}>
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{step.description}</p>

                  <motion.div
                    className="absolute bottom-4 right-4 w-8 h-8"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{ delay: index * 0.2 + 0.5 }}
                    viewport={{ once: true }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      className="w-full h-full text-green-500"
                    >
                      <motion.path
                        d="M20 6L9 17L4 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                        viewport={{ once: true }}
                      />
                    </svg>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <Link href="/offer">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="min-w-[200px] py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                          rounded-lg text-white text-sm font-medium 
                          hover:shadow-lg transition-all duration-300
                          relative overflow-hidden group"
              >
                <span className="relative z-10">Webseite Anfragen</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                              group-hover:opacity-20 transition-opacity duration-300" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Hintergrund-Effekt */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />
      </section>



      {/* FAQ Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neutral-100 to-neutral-400">
              Häufig gestellte Fragen
            </h2>
            <p className="text-xl text-gray-400 mt-6">
              Alles Wichtige zur Webentwicklung auf einen Blick
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "Wie lange dauert die Entwicklung einer Website?",
                answer: "Die Entwicklungszeit variiert je nach Umfang und Komplexität des Projekts. Ein einfacher Business-Auftritt kann in 4-6 Wochen realisiert werden, während komplexere Projekte 2-4 Monate in Anspruch nehmen können.",
                gradient: "from-blue-500 to-indigo-500"
              },
              {
                question: "Welche Technologien verwenden Sie?",
                answer: "Wir setzen auf modernste Technologien wie React, Next.js und TailwindCSS für das Frontend sowie Node.js und Python für Backend-Lösungen. Dabei wählen wir den Stack immer passend zu Ihren spezifischen Anforderungen.",
                gradient: "from-indigo-500 to-purple-500"
              },
              {
                question: "Wie ist der Ablauf eines Webprojekts?",
                answer: "Nach der initialen Bedarfsanalyse erstellen wir ein detailliertes Konzept. Nach Ihrer Freigabe beginnt die Design- und Entwicklungsphase. Vor dem Launch testen wir intensiv alle Funktionen und optimieren die Performance.",
                gradient: "from-purple-500 to-pink-500"
              },
              {
                question: "Ist die Website auch für mobile Geräte optimiert?",
                answer: "Absolut! Wir entwickeln nach dem Mobile-First-Prinzip. Ihre Website wird auf allen Geräten – vom Smartphone bis zum Desktop – optimal dargestellt und ist perfekt bedienbar.",
                gradient: "from-pink-500 to-red-500"
              },
              {
                question: "Welche Wartung und Support erhalte ich nach dem Launch?",
                answer: "Wir bieten verschiedene Support-Pakete an, die regelmäßige Updates, Performance-Optimierungen und technischen Support umfassen. So bleibt Ihre Website stets sicher und auf dem neuesten Stand.",
                gradient: "from-red-500 to-orange-500"
              }
            ].map((faq, index) => {
              const [isOpen, setIsOpen] = useState(false);
              
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="mb-6"
                >
                  <div className="relative group">
                    <button
                      onClick={() => setIsOpen(!isOpen)}
                      className="w-full text-left"
                    >
                      <div className="relative bg-neutral-900/50 backdrop-blur-sm rounded-2xl p-8
                                    border border-neutral-800 hover:border-neutral-700 transition-all duration-300">
                        <div className={`absolute inset-0 bg-gradient-to-r ${faq.gradient} opacity-0 
                                      group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
                        
                        <div className="relative z-10">
                          <div className="flex items-center justify-between">
                            <h3 className="text-xl font-semibold text-white">{faq.question}</h3>
                            <motion.div
                              animate={{ rotate: isOpen ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={`w-10 h-10 rounded-full flex items-center justify-center 
                                        bg-gradient-to-r ${faq.gradient}`}
                            >
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 9l-7 7-7-7"
                                />
                              </svg>
                            </motion.div>
                          </div>
                          <motion.div
                            initial={false}
                            animate={{ 
                              height: isOpen ? "auto" : 0,
                              opacity: isOpen ? 1 : 0
                            }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-4 text-gray-400 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        </div>
                      </div>
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            viewport={{ once: true }}
            className="text-center mt-16"
          >
            <p className="text-gray-400 mb-8">
              Noch Fragen? Wir sind für Sie da!
            </p>
            <button className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl 
                             text-lg font-medium relative overflow-hidden group">
              <span className="relative z-10">Kontakt aufnehmen</span>
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>

        {/* Hintergrund-Effekt */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />
      </section>

      {/* CTA Section */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4">
          {/* Social Media Icons */}
          <div className="flex justify-center gap-8 mb-20">
            {[
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.384 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.38-.899-.421-.419-.69-.824-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                ),
                href: "https://github.com/yourusername",
                gradient: "from-neutral-700 to-neutral-900",
                hoverGradient: "hover:from-neutral-600 hover:to-neutral-800"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                ),
                href: "https://twitter.com/yourusername",
                gradient: "from-blue-500 to-blue-700",
                hoverGradient: "hover:from-blue-400 hover:to-blue-600"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                ),
                href: "https://linkedin.com/in/yourusername",
                gradient: "from-blue-600 to-blue-800",
                hoverGradient: "hover:from-blue-500 hover:to-blue-700"
              },
              {
                icon: (
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.384 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126-2.126-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.38-.899-.421-.419-.69-.824-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678c-3.405 0-6.162 2.76-6.162 6.162 0 3.405 2.76 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 6.162 3.405 0 6.162-2.76 6.162-6.162 0-3.405-2.76-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405c0 .795-.646 1.44-1.44 1.44-.795 0-1.44-.646-1.44-1.44 0-.794.646-1.439 1.44-1.439.793-.001 1.44.645 1.44 1.439z"/>
                  </svg>
                ),
                href: "https://instagram.com/webentwicklung_agentur",
                gradient: "from-purple-500 via-pink-500 to-red-500",
                hoverGradient: "hover:from-purple-400 hover:via-pink-400 hover:to-red-400"
              }
            ].map((social, index) => (
              <motion.a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${social.gradient} ${social.hoverGradient}
                           flex items-center justify-center group relative
                           transition-all duration-300 ease-out
                           hover:scale-110 hover:shadow-lg hover:shadow-white/10`}
              >
                <div className="absolute inset-0 rounded-2xl bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                <div className="text-white/90 group-hover:text-white transition-all duration-300 ease-out">
                  {social.icon}
                </div>
              </motion.a>
            ))}
          </div>

          {/* CTA Card mit GlowingEffect */}
          <GlowingEffect
            blur={20}
            spread={150}
            proximity={150}
            className="max-w-6xl mx-auto"
          >
            <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10
                          shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 
                          transition-all duration-500">
              <Vortex
                backgroundColor="rgba(0,0,0,0.7)"
                rangeY={800}
                particleCount={300}
                baseHue={220}
                className="flex min-h-[600px] w-full flex-col items-center justify-center"
              >
                <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    className="text-center text-4xl md:text-6xl mb-8 md:mb-10 flex flex-wrap justify-center items-center gap-x-3"
                  >
                    <span className="font-bold text-white">Bereit für Ihren</span>
                    <div className="inline-flex">
                      <AnimatedGradientText>
                        neuen Webauftritt
                      </AnimatedGradientText>
                    </div>
                    <span className="font-bold text-white">?</span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-center text-lg md:text-2xl text-gray-300 max-w-2xl mx-auto mb-12 md:mb-16"
                  >
                    Lassen Sie uns gemeinsam Ihre Vision in die Realität umsetzen. 
                    Moderne Technologie, zeitloses Design und optimale Performance.
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                  >
                    <Link href="/offer">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="min-w-[200px] py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                  rounded-lg text-white text-sm font-medium 
                                  hover:shadow-lg transition-all duration-300
                                  relative overflow-hidden group"
                      >
                        <span className="relative z-10">Webseite Anfragen</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                      group-hover:opacity-20 transition-opacity duration-300" />
                      </motion.button>
                    </Link>
                    
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="min-w-[200px] py-2 px-4 bg-white/10 backdrop-blur-sm border border-white/20 
                                rounded-lg text-white text-sm font-medium 
                                hover:shadow-lg transition-all duration-300
                                relative overflow-hidden group"
                    >
                      <span className="relative z-10">24/7 Chat 
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                    group-hover:opacity-10 transition-opacity duration-300" />
                    </motion.button>
                  </motion.div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>

      <Footer />
    </div>
  );
} 
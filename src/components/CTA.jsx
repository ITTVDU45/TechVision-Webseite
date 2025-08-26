import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'
import { useRouter } from 'next/navigation'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import Vortex from '@/components/ui/vortex'
import Link from 'next/link'

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
]

const blogPosts = [
  {
    title: "KI-Transformation in der Praxis",
    subtitle: "KI & Automatisierung",
    description: "Wie Unternehmen KI erfolgreich in ihre Geschäftsprozesse integrieren und messbare Erfolge erzielen.",
    image: "/images/ai-robot.jpg",
    date: "22. März 2024",
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
    readTime: "5 min",
    category: { name: "KI & Innovation", icon: "🤖" }
  },
  {
    title: "Moderne Softwareentwicklung",
    subtitle: "Development",
    description: "Best Practices und neue Technologien für effiziente und skalierbare Softwareentwicklung.",
    image: "/images/cms-development.jpg",
    date: "21. März 2024",
    gradient: "from-purple-400 via-purple-500 to-indigo-500",
    readTime: "4 min",
    category: { name: "Entwicklung", icon: "💻" }
  },
  {
    title: "Cybersecurity 2024",
    subtitle: "Sicherheit",
    description: "Aktuelle Bedrohungen und Schutzmaßnahmen für Unternehmen im digitalen Zeitalter.",
    image: "/images/cybersecurity.jpg",
    date: "20. März 2024",
    gradient: "from-indigo-400 via-blue-500 to-blue-600",
    readTime: "6 min",
    category: { name: "Security", icon: "🔒" }
  },
  {
    title: "Cloud Native Entwicklung",
    subtitle: "Cloud & DevOps",
    description: "Moderne Architekturmuster und Best Practices für Cloud-native Anwendungen.",
    image: "/images/system-integration-network.jpg",
    date: "19. März 2024",
    gradient: "from-cyan-400 via-blue-500 to-blue-600",
    readTime: "7 min",
    category: { name: "Cloud", icon: "☁️" }
  },
  {
    title: "Data Analytics & BI",
    subtitle: "Datenanalyse",
    description: "Wie Unternehmen durch moderne Datenanalyse bessere Entscheidungen treffen.",
    image: "/images/erp-integration.jpg",
    date: "18. März 2024",
    gradient: "from-green-400 via-green-500 to-emerald-600",
    readTime: "5 min",
    category: { name: "Analytics", icon: "📊" }
  },
  {
    title: "IoT & Industrie 4.0",
    subtitle: "IoT",
    description: "Innovative IoT-Lösungen für die moderne Fertigung und Industrie.",
    image: "/images/Server.jpg",
    date: "17. März 2024",
    gradient: "from-orange-400 via-orange-500 to-red-500",
    readTime: "6 min",
    category: { name: "IoT", icon: "🏭" }
  },
  {
    title: "Digital Workplace",
    subtitle: "Arbeitsplatz",
    description: "Gestaltung moderner digitaler Arbeitsplätze für maximale Produktivität.",
    image: "/images/legaltech.jpg",
    date: "16. März 2024",
    gradient: "from-pink-400 via-pink-500 to-rose-500",
    readTime: "4 min",
    category: { name: "Workplace", icon: "💼" }
  },
  {
    title: "IT-Strategie 2024",
    subtitle: "Strategie",
    description: "Strategische IT-Planung und digitale Transformation für Unternehmen.",
    image: "/images/KITransofmation.jpg",
    date: "15. März 2024",
    gradient: "from-violet-400 via-violet-500 to-purple-600",
    readTime: "8 min",
    category: { name: "Strategie", icon: "🎯" }
  },
  {
    title: "Agile Methoden",
    subtitle: "Projektmanagement",
    description: "Moderne agile Methoden für erfolgreiche IT-Projekte und Teams.",
    image: "/images/Workflow.jpg",
    date: "14. März 2024",
    gradient: "from-blue-400 via-indigo-500 to-purple-600",
    readTime: "5 min",
    category: { name: "Agile", icon: "🔄" }
  }
]

const faqs = [
  {
    question: "Wie kann KI mein Unternehmen transformieren?",
    answer: "KI hilft, Geschäftsprozesse zu automatisieren, Daten effizient zu analysieren und bessere Entscheidungen zu treffen. Sie kann Routineaufgaben übernehmen und Muster in großen Datensätzen erkennen, um Wettbewerbsvorteile zu schaffen."
  },
  {
    question: "Welche Bereiche profitieren am meisten von KI-Lösungen?",
    answer: "KI ist besonders effektiv in den Bereichen Kundenservice (Chatbots), Marketing (Personalisierung), Produktion (Predictive Maintenance) und Vertrieb (Lead-Scoring)."
  },
  {
    question: "Wie läuft ein Softwareprojekt mit euch ab?",
    answer: "Phase 1: Analyse und Konzeptentwicklung\nPhase 2: Prototyping und Feedback\nPhase 3: Entwicklung und Testing\nPhase 4: Go-Live und Wartung"
  },
  {
    question: "Wie gestaltet sich der Prozess für Webseitenprojekte?",
    answer: "Kick-Off: Bedarfsanalyse und Zielsetzung\nDesign-Phase: Wireframes und visuelle Konzepte\nEntwicklung: Frontend und Backend Programmierung\nLaunch: Live-Schaltung und SEO-Optimierung"
  },
  {
    question: "Wie läuft eine IT- oder KI-Beratung ab?",
    answer: "Wir starten mit einer Bestandsaufnahme deiner IT-Infrastruktur und identifizieren Potenziale für Automatisierung und Effizienzsteigerung. Anschließend entwickeln wir eine maßgeschneiderte Strategie für die KI-Implementierung."
  },
  {
    question: "Was umfasst die Cybersecurity-Beratung?",
    answer: "Unsere Beratung umfasst die Analyse von Sicherheitslücken, Implementierung von Sicherheitsmaßnahmen und Erstellung eines Notfallmanagements. Wir bieten regelmäßige Penetrationstests und Mitarbeiterschulungen an."
  },
  {
    question: "Wie lange dauert ein durchschnittliches Projekt?",
    answer: "Webseitenprojekte dauern in der Regel 4-8 Wochen, während Softwareentwicklungen und KI-Projekte je nach Umfang zwischen 2-6 Monaten variieren können."
  },
  {
    question: "Bietet ihr auch Wartung und Support nach Projektabschluss?",
    answer: "Ja, wir bieten fortlaufende Wartungspakete an, um sicherzustellen, dass deine Systeme reibungslos laufen und aktuell bleiben."
  },
  {
    question: "Was kostet eine erste Beratung?",
    answer: "Die Erstberatung ist kostenlos und bietet einen Überblick über deine Möglichkeiten zur digitalen Transformation."
  },
  {
    question: "Wie kann ich mit euch zusammenarbeiten?",
    answer: "Nutze unser Kontaktformular oder vereinbare direkt einen Termin für ein Erstgespräch. Gemeinsam entwickeln wir eine maßgeschneiderte Lösung für dein Unternehmen."
  }
]

export default function CTA() {
  const [currentCaseIndex, setCurrentCaseIndex] = useState(0)
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0)
  const [currentFaqIndex, setCurrentFaqIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [filteredCases, setFilteredCases] = useState(cases)
  const [isLoading, setIsLoading] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
    selectedCase: ''
  })

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const prevSlide = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex - slideCount + blogPosts.length) % blogPosts.length);
  };

  const nextSlide = () => {
    setCurrentBlogIndex((prevIndex) => (prevIndex + slideCount) % blogPosts.length);
  };

  const visibleBlogPosts = () => {
    const start = currentBlogIndex;
    const end = start + 1;
    return blogPosts.slice(start, end);
  };

  const [openFaq, setOpenFaq] = useState(null);

  return (
    <>
      {/* Blog Section */}
      <section id="blog" className="py-32 bg-black relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="text-white">Unsere </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">
                Top Themen
              </span>
            </h2>
            <p className="text-xl text-gray-400">
              Aktuelle Einblicke in die digitale Transformation und Innovation.
            </p>
          </motion.div>

          {/* Blog Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className="flex gap-6 flex-col">
                {visibleBlogPosts().map((post, index) => (
                  <motion.div
                    key={post.title + index}
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
                      <div className="bg-gray-900 p-4 rounded-2xl h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4">
                          <span className="text-base">{post.category.icon}</span>
                          <span className="text-sm text-blue-300">{post.category.name}</span>
                        </div>

                        <div className="aspect-video rounded-lg overflow-hidden mb-4">
                          <img 
                            src={post.image} 
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        <div className="mb-4 flex-grow">
                          <h3 className="text-lg font-bold text-white mb-2">
                            {post.title}
                          </h3>
                          <p className="text-sm text-gray-400 mb-4">
                            {post.subtitle}
                          </p>
                          <p className="text-gray-300 text-sm">
                            {post.description}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 mb-6 text-sm text-indigo-300">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            {post.readTime}
                          </span>
                          <span>{post.date}</span>
                        </div>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                                    rounded-lg text-white text-sm font-medium 
                                    hover:shadow-lg transition-all duration-300
                                    relative overflow-hidden group"
                        >
                          <span className="relative z-10">Weiterlesen</span>
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-violet-400 opacity-0 
                                        group-hover:opacity-20 transition-opacity duration-300" />
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={() => setCurrentBlogIndex(Math.max(currentBlogIndex - 1, 0))}
              disabled={currentBlogIndex === 0}
              className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentBlogIndex === 0 
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronLeftIcon className={`w-6 h-6 ${
                currentBlogIndex === 0 ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>
                        <button
              onClick={() => setCurrentBlogIndex(Math.min(currentBlogIndex + 1, blogPosts.length - 1))}
              disabled={currentBlogIndex + 1 >= blogPosts.length}
              className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full 
                        ${currentBlogIndex + 1 >= blogPosts.length 
                          ? 'bg-blue-500/5 cursor-not-allowed' 
                          : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} 
                        transition-colors duration-200`}
            >
              <ChevronRightIcon className={`w-6 h-6 ${
                currentBlogIndex + 1 >= blogPosts.length ? 'text-blue-400/50' : 'text-blue-400'
              }`} />
            </button>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: Math.ceil(blogPosts.length) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentBlogIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 
                            ${Math.floor(currentBlogIndex) === index 
                              ? 'bg-blue-500 w-8' 
                              : 'bg-blue-500/20 hover:bg-blue-500/40'}`}
                  aria-label={`Gehe zu Seite ${index + 1}`}
                />
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-16">
              <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group
                           shadow-xl shadow-blue-500/20"
                >
                  <span className="relative z-10">Zu unseren News</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                               transition-opacity duration-300" />
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-center mb-16"
          >
            FAQ – Häufig gestellte Fragen
          </motion.h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-lg font-medium">{faq.question}</span>
                  <motion.span
                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-blue-400"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === index ? "auto" : 0,
                    opacity: openFaq === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 pt-0 text-gray-400">
                    {faq.answer.split('\n').map((line, i) => (
                      <p key={i} className="mb-2">{line}</p>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Contact CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-gray-400 mb-6">
              Noch Fragen? Wir sind hier, um zu helfen!
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mt-12"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 
                           rounded-xl text-lg font-medium relative overflow-hidden group"
                >
                  <span className="relative z-10">Kontakt aufnehmen</span>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/20 pointer-events-none" />
      </section>

      {/* Call to Action Section */}
      <section id="contact" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
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
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    {/* Text Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-6"
                      >
                        <span className="text-white">Bereit für die </span>
                        <span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">
                          Zukunft mit KI?
                        </span>
                      </motion.h2>

                      <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-gray-300 mb-10 leading-relaxed"
                      >
                        Kontaktieren Sie uns für eine unverbindliche Beratung und entdecken Sie 
                        die Potenziale der Künstlichen Intelligenz für Ihr Unternehmen.
                      </motion.p>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                      >
                        <Link href="/contact">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 
                                     rounded-xl text-lg font-medium relative overflow-hidden group"
                          >
                            <span className="relative z-10">Kontakt aufnehmen</span>
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
                          </motion.button>
                        </Link>
                      </motion.div>
                    </div>

                    {/* Image */}
                    <motion.div 
                      className="flex-1 relative"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                    >
                      <div className="aspect-square relative rounded-2xl overflow-hidden">
                        <img
                          src="/images/Tolgahan Vardar.jpeg"
                          alt="Tolgahan Vardar - CEO"
                          className="w-full h-full object-cover rounded-2xl"
                          loading="lazy"
                          style={{
                            objectPosition: 'center 25%'
                          }}
                        />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>
    </>
  )
}
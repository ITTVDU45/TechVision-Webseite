import { motion } from 'framer-motion'
import { useState, useMemo } from 'react'
import AnimatedGradientText from '@/components/ui/animated-gradient-text'
import { GlowingEffect } from '@/components/ui/glowing-effect'
import { faqs } from '@/data/faqs'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// Erweiterte Kategorien am Anfang der Datei
const categorizedFaqs = {
  ki_transformation: {
    icon: "🤖",
    title: "KI Transformation",
    questions: faqs.filter(faq => faq.category === 'ki_transformation')
  },
  ki_beratung: {
    icon: "🧠",
    title: "KI Beratung",
    questions: faqs.filter(faq => faq.category === 'ki_beratung')
  },
  software: {
    icon: "💻",
    title: "Softwareentwicklung",
    questions: faqs.filter(faq => faq.category === 'software')
  },
  web: {
    icon: "🌐",
    title: "Webseitenentwicklung",
    questions: faqs.filter(faq => faq.category === 'web')
  },
  shop: {
    icon: "🛍️",
    title: "Onlineshop Entwicklung",
    questions: faqs.filter(faq => faq.category === 'shop')
  },
  workflow: {
    icon: "⚡",
    title: "Workflow Automatisierung",
    questions: faqs.filter(faq => faq.category === 'workflow')
  },
  digital: {
    icon: "📱",
    title: "Digitale Transformation",
    questions: faqs.filter(faq => faq.category === 'digitale_transformation')
  },
  security: {
    icon: "🔒",
    title: "Cyber Security Beratung",
    questions: faqs.filter(faq => faq.category === 'cyber_security')
  },
  infrastructure: {
    icon: "🖥️",
    title: "IT Infrastruktur",
    questions: faqs.filter(faq => faq.category === 'it_infrastruktur')
  },
  hosting: {
    icon: "☁️",
    title: "Hosting",
    questions: faqs.filter(faq => faq.category === 'hosting')
  },
  tools: {
    icon: "🛠️",
    title: "Tools & KI-Agenten",
    questions: faqs.filter(faq => faq.category === 'tools')
  }
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('services')
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showResults, setShowResults] = useState(false)

  // Suche in FAQs
  const searchFaqs = (query) => {
    if (!query.trim()) {
      setSearchResults([])
      setShowResults(false)
      return
    }

    const results = faqs.filter(faq => {
      const searchTerm = query.toLowerCase()
      return (
        faq.question.toLowerCase().includes(searchTerm) ||
        faq.answer.toLowerCase().includes(searchTerm)
      )
    }).map(faq => ({
      ...faq,
      categoryId: Object.entries(categorizedFaqs).find(([_, category]) => 
        category.questions.some(q => q.question === faq.question)
      )?.[0]
    }))

    setSearchResults(results)
    setShowResults(true)
  }

  const handleSearch = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    searchFaqs(query)
  }

  const scrollToQuestion = (categoryId, question) => {
    setActiveCategory(categoryId)
    setShowResults(false)
    setSearchQuery('')
    
    setTimeout(() => {
      const element = document.getElementById(`${categoryId}-${question}`)
      element?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="min-h-screen relative overflow-hidden bg-black flex items-center pt-32">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 animate-gradient bg-[length:200%_200%]" />
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
                  <stop offset="0%" stopColor="#22c55e" />
                  <stop offset="100%" stopColor="#059669" />
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
              <span className="text-white">Häufig gestellte Fragen – </span>
              <span className="block">
                <AnimatedGradientText>
                  Ihre Antworten im Überblick
                </AnimatedGradientText>
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-12 leading-relaxed"
            >
              Finden Sie schnell und einfach Antworten auf Ihre Fragen zu unseren Services, 
              Technologien und Vorgehensweisen.
            </motion.p>

            {/* Search Bar mit Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="relative"
            >
              <GlowingEffect>
                <div className="flex items-center max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-xl p-2">
                  <input 
                    type="text"
                    value={searchQuery}
                    onChange={handleSearch}
                    placeholder="Wonach suchen Sie?"
                    className="w-full bg-transparent px-4 py-2 text-white placeholder-gray-400 focus:outline-none"
                  />
                  <button className="px-6 py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg text-lg font-medium hover:shadow-lg hover:shadow-green-500/25 transition-all duration-300">
                    Suchen
                  </button>
                </div>
              </GlowingEffect>

              {/* Suchergebnisse Dropdown */}
              {showResults && searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-black/90 border border-white/10 rounded-xl overflow-hidden backdrop-blur-lg z-50"
                >
                  <div className="max-h-96 overflow-y-auto">
                    {searchResults.map((result, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        onClick={() => scrollToQuestion(result.categoryId, result.question)}
                        className="p-4 hover:bg-white/5 cursor-pointer border-b border-white/5 last:border-none"
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-2xl">
                            {categorizedFaqs[result.categoryId].icon}
                          </span>
                          <div>
                            <h4 className="text-white font-medium mb-1">{result.question}</h4>
                            <p className="text-sm text-gray-400 line-clamp-2">{result.answer}</p>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-16 max-w-6xl mx-auto">
              {Object.entries(categorizedFaqs).map(([id, category], index) => (
                <motion.div
                  key={id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onClick={() => {
                    const element = document.getElementById(id);
                    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  }}
                  className="group cursor-pointer"
                >
                  <div className={`bg-white/5 border border-white/10 rounded-xl p-4 
                                transition-all duration-300 ${activeCategory === id ? 
                                'bg-white/10 border-green-500/50' : 'hover:bg-white/10'}`}>
                    <span className="text-3xl mb-3 block">{category.icon}</span>
                    <h3 className="text-sm font-semibold text-white mb-1">{category.title}</h3>
                    <p className="text-xs text-gray-400">{category.questions.length} Fragen</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Sections */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto space-y-20">
            {Object.entries(categorizedFaqs).map(([id, category]) => (
              <div key={id} id={id} className="scroll-mt-32">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="text-3xl font-bold mb-8 flex items-center gap-4"
                >
                  <span className="text-4xl">{category.icon}</span>
                  {category.title}
                </motion.h2>
                
                <div className="space-y-6">
                  {category.questions.map((faq, index) => (
                    <motion.div
                      key={index}
                      id={`${id}-${faq.question}`}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-white/5 border border-white/10 rounded-xl p-6"
                    >
                      <h3 className="text-xl font-semibold text-white mb-3">{faq.question}</h3>
                      <p className="text-gray-400">{faq.answer}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Noch Fragen?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-12"
            >
              Unser Team steht Ihnen für weitere Fragen gerne zur Verfügung.
            </motion.p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl 
                         text-white text-lg font-medium relative overflow-hidden group"
              >
                <span className="relative z-10">Kontakt aufnehmen</span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 
                             transition-opacity duration-300" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Blog Section */}
      <section className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-bold mb-6"
            >
              Neueste Blogbeiträge
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-12"
            >
              Entdecken Sie unsere neuesten Artikel zu Technologien, Trends und Best Practices.
            </motion.p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Beispiel Blogbeiträge */}
            {Array.from({ length: 3 }).map((_, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/5 border border-white/10 rounded-xl p-6"
              >
                <h3 className="text-xl font-semibold text-white mb-2">Blogbeitrag Titel {index + 1}</h3>
                <p className="text-gray-400 mb-4">Kurze Beschreibung des Blogbeitrags. Hier können Sie einen Überblick über den Inhalt geben.</p>
                <a href="#" className="text-green-500 hover:underline">Weiterlesen</a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer hinzufügen */}
      <Footer />
    </div>
  )
} 
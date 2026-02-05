"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { fetchFAQs } from "@/lib/api";

interface FAQ {
  question: string;
  answer: string;
  page?: string;
  category?: string;
  order?: number;
}

// Kategorien-Definitionen mit Icons
const categories = [
  { id: 'ki-transformation', name: 'KI Transformation', icon: '🤖', color: 'from-pink-500 to-rose-500' },
  { id: 'ki-beratung', name: 'KI Beratung', icon: '🧠', color: 'from-pink-500 to-rose-500' },
  { id: 'softwareentwicklung', name: 'Softwareentwicklung', icon: '💻', color: 'from-blue-400 to-cyan-500' },
  { id: 'webseitenentwicklung', name: 'Webseitenentwicklung', icon: '🌐', color: 'from-blue-400 to-cyan-500' },
  { id: 'onlineshop-entwicklung', name: 'Onlineshop Entwicklung', icon: '🛍️', color: 'from-blue-400 to-cyan-500' },
  { id: 'workflow-automatisierung', name: 'Workflow Automatisierung', icon: '⚡', color: 'from-yellow-400 to-orange-500' },
  { id: 'digitale-transformation', name: 'Digitale Transformation', icon: '📱', color: 'from-purple-500 to-pink-500' },
  { id: 'cyber-security-beratung', name: 'Cyber Security Beratung', icon: '🔒', color: 'from-yellow-400 to-orange-500' },
  { id: 'it-infrastruktur', name: 'IT Infrastruktur', icon: '🖥️', color: 'from-blue-400 to-cyan-500' },
  { id: 'hosting', name: 'Hosting', icon: '☁️', color: 'from-blue-400 to-cyan-500' },
  { id: 'tools-ki-agenten', name: 'Tools & KI-Agenten', icon: '🛠️', color: 'from-gray-400 to-gray-600' },
];

export default function FAQ() {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [openFaqs, setOpenFaqs] = useState<Set<number>>(new Set());
  const [searchSuggestions, setSearchSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [autoScrollQuestion, setAutoScrollQuestion] = useState<string | null>(null);

  useEffect(() => {
    const loadFAQs = async () => {
      try {
        const apiFAQs = await fetchFAQs('faq');
        if (apiFAQs && Array.isArray(apiFAQs) && apiFAQs.length > 0) {
          const sorted = apiFAQs.sort((a: FAQ, b: FAQ) => (a.order || 0) - (b.order || 0));
          setFaqs(sorted);
        }
      } catch (error) {
        console.error('Error loading FAQs:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFAQs();
  }, []);

  // Filter FAQs basierend auf Suche und Kategorie
  const filteredFAQs = useMemo(() => {
    let filtered = faqs;

    if (selectedCategory) {
      filtered = filtered.filter(faq => faq.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        faq =>
          faq.question.toLowerCase().includes(query) ||
          faq.answer.toLowerCase().includes(query)
      );
    }

    return filtered;
  }, [faqs, selectedCategory, searchQuery]);

  // Gruppiere FAQs nach Kategorien und sortiere nach categories-Array-Reihenfolge
  const categorizedFAQs = useMemo(() => {
    const grouped: Record<string, FAQ[]> = {};
    filteredFAQs.forEach(faq => {
      const category = faq.category || 'other';
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(faq);
    });
    
    // Sortiere Kategorien nach der Reihenfolge im categories-Array
    const sorted: Record<string, FAQ[]> = {};
    categories.forEach(cat => {
      if (grouped[cat.id] && grouped[cat.id].length > 0) {
        sorted[cat.id] = grouped[cat.id];
      }
    });
    
    // Füge restliche Kategorien hinzu (falls vorhanden)
    Object.keys(grouped).forEach(catId => {
      if (!sorted[catId] && grouped[catId].length > 0) {
        sorted[catId] = grouped[catId];
      }
    });
    
    return sorted;
  }, [filteredFAQs]);

  // Erstelle Suchvorschläge
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      const suggestions = faqs
        .filter(faq => faq.question.toLowerCase().includes(query))
        .slice(0, 5)
        .map(faq => faq.question);
      setSearchSuggestions(suggestions);
      setShowSuggestions(suggestions.length > 0);
    } else {
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery, faqs]);

  const toggleFaq = (index: number) => {
    const newOpen = new Set(openFaqs);
    if (newOpen.has(index)) {
      newOpen.delete(index);
    } else {
      newOpen.add(index);
    }
    setOpenFaqs(newOpen);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setSelectedCategory(null); // Kategorie-Filter zurücksetzen
    setShowSuggestions(false);
    setAutoScrollQuestion(suggestion); // Markiere Frage für Auto-Scroll
  };

  // Auto-Scroll und Öffnen der FAQ, wenn eine Frage aus den Vorschlägen ausgewählt wurde
  useEffect(() => {
    if (autoScrollQuestion && filteredFAQs.length > 0 && Object.keys(categorizedFAQs).length > 0) {
      const matchingFAQ = faqs.find(faq => faq.question === autoScrollQuestion);
      if (matchingFAQ && matchingFAQ.category) {
        // Warte kurz, damit React die DOM-Updates abgeschlossen hat
        setTimeout(() => {
          // Scrolle zur Kategorie
          const categoryElement = document.getElementById(`category-${matchingFAQ.category}`);
          if (categoryElement) {
            categoryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Öffne die FAQ automatisch nach dem Scrollen
            setTimeout(() => {
              const filteredIndex = filteredFAQs.findIndex(f => f.question === autoScrollQuestion);
              if (filteredIndex !== -1) {
                setOpenFaqs(new Set([filteredIndex]));
                
                // Scrolle zur spezifischen FAQ
                setTimeout(() => {
                  const categoryFAQs = categorizedFAQs[matchingFAQ.category] || [];
                  const faqIndexInCategory = categoryFAQs.findIndex(f => f.question === autoScrollQuestion);
                  if (faqIndexInCategory !== -1) {
                    const faqElements = document.querySelectorAll(`[id^="faq-${matchingFAQ.category}"]`);
                    if (faqElements[faqIndexInCategory]) {
                      faqElements[faqIndexInCategory].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }
                  }
                }, 400);
              }
            }, 600);
          }
        }, 300);
        
        // Reset nach dem Scrollen
        setTimeout(() => setAutoScrollQuestion(null), 3000);
      }
    }
  }, [autoScrollQuestion, filteredFAQs, categorizedFAQs, faqs]);

  const scrollToCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const element = document.getElementById(`category-${categoryId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Zähle FAQs pro Kategorie
  const getCategoryCount = (categoryId: string) => {
    return faqs.filter(faq => faq.category === categoryId).length;
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center mb-12">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Technologien und Vorgehensweisen
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Finden Sie schnell Antworten zu unseren Services und Technologien.
            </p>

            {/* Suchleiste */}
            <div className="relative max-w-2xl mx-auto mb-12">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                  placeholder="Wonach suchen Sie?"
                  className="w-full px-6 py-4 bg-gray-900/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent pr-12"
                />
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {searchQuery && (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Autocomplete Vorschläge */}
              {showSuggestions && searchSuggestions.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl overflow-hidden z-50"
                >
                  {searchSuggestions.map((suggestion, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSuggestionClick(suggestion)}
                      className="w-full px-6 py-3 text-left text-gray-300 hover:bg-gray-800 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Kategorie-Karten */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {/* "Alle Fragen" Karte */}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                onClick={() => {
                  setSelectedCategory(null);
                  setSearchQuery("");
                  setTimeout(() => {
                    window.scrollTo({ top: document.getElementById('faqs-section')?.offsetTop || 0, behavior: 'smooth' });
                  }, 100);
                }}
                className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6 text-left hover:scale-105 transition-transform group"
              >
                <div className="text-4xl mb-3">📋</div>
                <h3 className="text-white font-bold text-lg mb-1">Alle Fragen</h3>
                <p className="text-white/80 text-sm">{faqs.length} Fragen</p>
              </motion.button>

              {categories.map((category, index) => {
                const count = getCategoryCount(category.id);
                if (count === 0) return null;

                return (
                  <motion.button
                    key={category.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: (index + 1) * 0.05 }}
                    onClick={() => scrollToCategory(category.id)}
                    className={`bg-gradient-to-br ${category.color} rounded-xl p-6 text-left hover:scale-105 transition-transform group`}
                  >
                    <div className="text-4xl mb-3">{category.icon}</div>
                    <h3 className="text-white font-bold text-lg mb-1">{category.name}</h3>
                    <p className="text-white/80 text-sm">{count} Fragen</p>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section id="faqs-section" className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            {loading ? (
              <div className="text-center text-gray-400 py-16">Lädt FAQs...</div>
            ) : filteredFAQs.length === 0 ? (
              <div className="text-center text-gray-400 py-16">
                {searchQuery ? "Keine Ergebnisse gefunden." : "Keine FAQs verfügbar"}
              </div>
            ) : (
              <div className="space-y-12">
                {Object.entries(categorizedFAQs).map(([categoryId, categoryFAQs]) => {
                  const category = categories.find(c => c.id === categoryId);
                  if (!category) return null;

                  return (
                    <div key={categoryId} id={`category-${categoryId}`} className="scroll-mt-24">
                      <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold mb-6 flex items-center gap-3"
                      >
                        <span className="text-3xl">{category.icon}</span>
                        <span>{category.name}</span>
                        <span className="text-gray-500 text-lg">({categoryFAQs.length})</span>
                      </motion.h2>

                      <div className="space-y-4">
                        {categoryFAQs.map((faq, index) => {
                          const globalIndex = filteredFAQs.indexOf(faq);
                          const isOpen = openFaqs.has(globalIndex);
                          const faqId = `faq-${categoryId}-${index}`;

                          return (
                            <motion.div
                              key={index}
                              id={faqId}
                              initial={{ opacity: 0, y: 20 }}
                              whileInView={{ opacity: 1, y: 0 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.05 }}
                              className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl group scroll-mt-24"
                            >
                              <button
                                onClick={() => toggleFaq(globalIndex)}
                                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors relative z-10"
                              >
                                <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors pr-4">
                                  {faq.question}
                                </span>
                                <motion.span
                                  animate={{ rotate: isOpen ? 180 : 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="text-blue-500 flex-shrink-0"
                                >
                                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                  </svg>
                                </motion.span>
                              </button>
                              <motion.div
                                initial={false}
                                animate={{ height: isOpen ? 'auto' : 0, opacity: isOpen ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                              >
                                <div className="p-8 pt-0 text-gray-400 leading-relaxed relative z-10">
                                  {faq.answer.split('\n').map((line, i) => (
                                    <p key={i} className="mb-2 last:mb-0">{line}</p>
                                  ))}
                                </div>
                              </motion.div>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

"use client";
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { GlowingEffect } from './ui/glowing-effect';
import Vortex from './ui/vortex';
import Link from 'next/link';

type CaseItem = { title: string; subtitle: string; description: string; stats?: { value: string; label: string }[]; gradient: string; image?: string; id?: string };
type BlogPost = { title: string; subtitle?: string; description?: string; image?: string; date?: string; gradient?: string; readTime?: string; category?: { name: string; icon: string } };

// Keep cases as example data but avoid unused variable lint by exporting
export const cases: CaseItem[] = [
  { title: 'Cybersecurityberatung', subtitle: 'IT-Sicherheit', description: 'Umfassende Sicherheitsanalyse und Implementierung von Schutzmaßnahmen für kritische Infrastrukturen.', stats: [{ value: '100%', label: 'Compliance' }, { value: '90%', label: 'Risikominderung' }, { value: '24/7', label: 'Monitoring' }], gradient: 'from-blue-400 via-indigo-500 to-violet-600', image: '/images/cybersecurity.jpg', id: 'cybersecurityberatung' },
  { title: 'KI Transformation', subtitle: 'Strategieberatung', description: 'Entwicklung einer KI-Strategie und Roadmap für die digitale Transformation.', stats: [{ value: '40%', label: 'Effizienzsteigerung' }, { value: '60%', label: 'Prozessoptimierung' }, { value: '25%', label: 'Kosteneinsparung' }], gradient: 'from-blue-400 via-blue-500 to-indigo-500', image: '/images/ai-robot.jpg', id: 'ki-transformation' },
];

const blogPosts: BlogPost[] = [
  { title: 'KI-Transformation in der Praxis', subtitle: 'KI & Automatisierung', description: 'Wie Unternehmen KI erfolgreich in ihre Geschäftsprozesse integrieren und messbare Erfolge erzielen.', image: '/images/ai-robot.jpg', date: '22. März 2024', gradient: 'from-blue-400 via-blue-500 to-indigo-500', readTime: '5 min', category: { name: 'KI & Innovation', icon: '🤖' } },
  // ... (shortened)
];

const faqs = [
  { question: 'Wie kann KI mein Unternehmen transformieren?', answer: 'KI hilft, Geschäftsprozesse zu automatisieren, Daten effizient zu analysieren und bessere Entscheidungen zu treffen. Sie kann Routineaufgaben übernehmen und Muster in großen Datensätzen erkennen, um Wettbewerbsvorteile zu schaffen.' },
  // ... (shortened)
];

type CTAProps = {};

export default function CTA(_props: CTAProps): JSX.Element {
  const [currentBlogIndex, setCurrentBlogIndex] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(typeof window !== 'undefined' ? window.innerWidth < 768 : false);
    checkMobile();
    if (typeof window !== 'undefined') window.addEventListener('resize', checkMobile);
    return () => { if (typeof window !== 'undefined') window.removeEventListener('resize', checkMobile); };
  }, []);

  const visibleBlogPosts = () => {
    const count = isMobile ? 1 : 1; // keep 1 in CTA carousel but respect isMobile for future
    return blogPosts.slice(currentBlogIndex, currentBlogIndex + count);
  };

  return (
    <>
      {/* Blog Section */}
      <section id="blog" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center max-w-4xl mx-auto mb-20">
            <h2 className="text-4xl md:text-5xl font-bold mb-6"><span className="text-white">Unsere </span><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600">Top Themen</span></h2>
            <p className="text-xl text-gray-400">Aktuelle Einblicke in die digitale Transformation und Innovation.</p>
          </motion.div>

          {/* Blog Carousel */}
          <div className="relative max-w-7xl mx-auto">
            <div className="overflow-hidden mx-12">
              <div className="flex gap-6 flex-col">
                {visibleBlogPosts().map((post, index) => (
                  <motion.div key={post.title + index} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.5 }} className="w-full min-w-[calc(100%-1rem)] md:min-w-[calc(50%-1rem)]">
                    <div className={`bg-gradient-to-br ${index % 2 === 0 ? 'from-blue-500 via-indigo-500 to-violet-600' : 'from-violet-600 via-indigo-500 to-blue-500'} p-[1px] rounded-2xl h-full`}>
                      <div className="bg-gray-900 p-4 rounded-2xl h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4"><span className="text-base">{post.category?.icon}</span><span className="text-sm text-blue-300">{post.category?.name}</span></div>
                        <div className="aspect-video rounded-lg overflow-hidden mb-4"><img src={post.image} alt={post.title} className="w-full h-full object-cover"/></div>
                        <div className="mb-4 flex-grow"><h3 className="text-lg font-bold text-white mb-2">{post.title}</h3><p className="text-sm text-gray-400 mb-4">{post.subtitle}</p><p className="text-gray-300 text-sm">{post.description}</p></div>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden group"><span className="relative z-10">Weiterlesen</span></motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Navigation Buttons */}
            <button onClick={() => setCurrentBlogIndex(Math.max(currentBlogIndex - 1, 0))} disabled={currentBlogIndex === 0} className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${currentBlogIndex === 0 ? 'bg-blue-500/5 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} transition-colors duration-200`}><ChevronLeftIcon className={`w-6 h-6 ${currentBlogIndex === 0 ? 'text-blue-400/50' : 'text-blue-400'}`} /></button>
            <button onClick={() => setCurrentBlogIndex(Math.min(currentBlogIndex + 1, blogPosts.length - 1))} disabled={currentBlogIndex + 1 >= blogPosts.length} className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${currentBlogIndex + 1 >= blogPosts.length ? 'bg-blue-500/5 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'} transition-colors duration-200`}><ChevronRightIcon className={`w-6 h-6 ${currentBlogIndex + 1 >= blogPosts.length ? 'text-blue-400/50' : 'text-blue-400'}`} /></button>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6">
          <motion.h2 className="text-4xl md:text-5xl font-bold text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>FAQ – Häufig gestellte Fragen</motion.h2>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }} className="bg-gray-900/90 backdrop-blur-sm rounded-xl overflow-hidden">
                <button onClick={() => setOpenFaq(openFaq === index ? null : index)} className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"><span className="text-lg font-medium">{faq.question}</span><motion.span animate={{ rotate: openFaq === index ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-blue-400"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></motion.span></button>
                <motion.div initial={false} animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden"><div className="p-6 pt-0 text-gray-400">{faq.answer.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}</div></motion.div>
              </motion.div>
            ))}
          </div>

          {/* FAQ Contact CTA */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12"><p className="text-gray-400 mb-6">Noch Fragen? Wir sind hier, um zu helfen!</p><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mt-12"><Link href="/contact"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-lg font-medium relative overflow-hidden group"><span className="relative z-10">Kontakt aufnehmen</span></motion.button></Link></motion.div></motion.div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section id="contact" className="py-32 bg-black relative overflow-hidden">
        <div className="container mx-auto px-4">
          <GlowingEffect blur={20} spread={150} proximity={150} className="max-w-6xl mx-auto">
            <div className="rounded-[20px] overflow-hidden bg-neutral-900/30 backdrop-blur-sm border border-white/10 shadow-[0_0_50px_-12px] shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-500">
              <Vortex backgroundColor="rgba(0,0,0,0.7)" rangeY={800} particleCount={300} baseHue={220} className="flex min-h-[600px] w-full flex-col items-center justify-center">
                <div className="w-full max-w-4xl mx-auto px-8 md:px-12 py-16 md:py-24">
                  <div className="flex flex-col lg:flex-row items-center gap-12">
                    <div className="flex-1 text-center lg:text-left"><motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-4xl md:text-5xl font-bold mb-6"><span className="text-white">Bereit für die </span><span className="bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Zukunft mit KI?</span></motion.h2><motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="text-xl text-gray-300 mb-10 leading-relaxed">Kontaktieren Sie uns für eine unverbindliche Beratung und entdecken Sie die Potenziale der Künstlichen Intelligenz für Ihr Unternehmen.</motion.p><motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}><Link href="/contact"><motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-lg font-medium relative overflow-hidden group"><span className="relative z-10">Kontakt aufnehmen</span></motion.button></Link></motion.div></div>
                    <motion.div className="flex-1 relative" initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}><div className="aspect-square relative rounded-2xl overflow-hidden"><img src="/images/Tolgahan Vardar.jpeg" alt="Tolgahan Vardar - CEO" className="w-full h-full object-cover rounded-2xl" loading="lazy" style={{ objectPosition: 'center 25%' }} /></div></motion.div>
                  </div>
                </div>
              </Vortex>
            </div>
          </GlowingEffect>
        </div>
      </section>
    </>
  );
}

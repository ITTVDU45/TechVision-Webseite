"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const faqs = [
    {
        question: 'Wie kann KI mein Unternehmen transformieren?',
        answer: 'KI hilft, Geschäftsprozesse zu automatisieren, Daten effizient zu analysieren und bessere Entscheidungen zu treffen. Sie kann Routineaufgaben übernehmen und Muster in großen Datensätzen erkennen, um Wettbewerbsvorteile zu schaffen.'
    },
    {
        question: 'Welche Branchen profitieren am meisten von KI?',
        answer: 'Nahezu jede Branche kann profitieren, besonders aber E-Commerce, Dienstleistungen, Fertigung und das Gesundheitswesen durch Prozessoptimierung und personalisierte Kundenerlebnisse.'
    },
    {
        question: 'Wie sicher sind KI-Lösungen?',
        answer: 'Sicherheit steht bei uns an erster Stelle. Wir implementieren KI-Lösungen nach höchsten Datenschutzstandards (DSGVO) und sorgen für eine sichere Infrastruktur.'
    }
];

export default function FAQSection(): JSX.Element {
    const [openFaq, setOpenFaq] = useState<number | null>(null);

    return (
        <section className="py-24 relative overflow-hidden bg-black">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] translate-y-1/2 translate-x-1/2" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.h2
                    className="text-4xl md:text-5xl font-bold text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <span className="text-white">FAQ</span> – <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">Häufig gestellte Fragen</span>
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl group"
                        >
                            <button
                                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                className="w-full px-8 py-5 flex items-center justify-between text-left hover:bg-white/5 transition-colors relative z-10"
                            >
                                <span className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{faq.question}</span>
                                <motion.span
                                    animate={{ rotate: openFaq === index ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                    className="text-blue-500"
                                >
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </motion.span>
                            </button>
                            <motion.div
                                initial={false}
                                animate={{ height: openFaq === index ? 'auto' : 0, opacity: openFaq === index ? 1 : 0 }}
                                transition={{ duration: 0.3 }}
                                className="overflow-hidden"
                            >
                                <div className="p-8 pt-0 text-gray-400 leading-relaxed relative z-10">
                                    {faq.answer.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mt-20"
                >
                    <p className="text-gray-400 mb-8 font-medium">Noch Fragen? Wir sind hier, um zu helfen!</p>
                    <Link href="/contact">
                        <motion.button
                            whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(59, 130, 246, 0.2)" }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-500 rounded-full text-xl font-bold transition-all text-white shadow-2xl"
                        >
                            Kontakt aufnehmen
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

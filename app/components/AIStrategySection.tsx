"use client";
import { motion } from "framer-motion";
import { IconBrain, IconChartLine, IconShieldCheck, IconCode } from "@tabler/icons-react";
import Image from "next/image";

export default function AIStrategySection() {
    return (
        <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-32 overflow-hidden">
            {/* Smooth Transition Overlays */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.05),transparent_50%)]" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 z-10" />
                            <Image
                                src="/images/KITransofmation.jpg"
                                alt="KI-Strategie und Entwicklung"
                                fill
                                className="object-cover"
                                priority={false}
                            />
                            {/* Floating Badge */}
                            <div className="absolute bottom-6 left-6 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-blue-500/30 z-20">
                                <div className="flex items-center gap-3">
                                    <IconBrain className="w-6 h-6 text-blue-400" />
                                    <span className="text-white font-bold">AI-Powered Solutions</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl" />
                    </motion.div>

                    {/* Right: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="inline-block mb-4">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-blue-400 bg-blue-500/10 px-4 py-2 rounded-full border border-blue-500/20">
                                Unsere Expertise
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            KI‑Strategie & ‑Entwicklung –
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600"> Ihre maßgeschneiderte Zukunft</span>
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Wir stärken Unternehmen an der Schnittstelle von Technologie und Strategie. Unser Team startet mit einer gründlichen Analyse Ihrer aktuellen Prozesse und Ziele, identifiziert passende KI‑Anwendungsfälle und entwickelt daraus eine klare Roadmap. Basierend auf fundiertem Requirements‑Engineering, Data‑Engineering und der Entwicklung von ML‑/AI‑Modellen konzipieren wir skalierbare Lösungen, die cloud‑basiert, hybrid oder On‑Premise bereitgestellt werden können. So automatisieren wir komplexe Prozesse, verbessern das Kundenerlebnis und schaffen neue Geschäftsmöglichkeiten.
                        </p>

                        <h3 className="text-2xl font-bold text-white mb-6">Leistungen im Überblick</h3>

                        <div className="space-y-4">
                            {[
                                {
                                    icon: IconChartLine,
                                    title: "KI‑Beratung",
                                    description: "Analyse des Status quo, Definition einer individuellen KI‑Strategie und Ableitung einer realistischen Umsetzungs‑Roadmap."
                                },
                                {
                                    icon: IconCode,
                                    title: "KI‑Entwicklung",
                                    description: "Maßgeschneiderte Lösungen durch modernes Requirements‑ und Data‑Engineering sowie die Entwicklung performanter ML‑Modelle."
                                },
                                {
                                    icon: IconBrain,
                                    title: "Begleitung bei der Implementierung",
                                    description: "Vom Proof‑of‑Concept bis zum produktiven Einsatz arbeiten wir eng mit Ihren Teams zusammen, um nachhaltige Ergebnisse zu erzielen."
                                },
                                {
                                    icon: IconShieldCheck,
                                    title: "Cybersecurity nach Standards",
                                    description: "Wir richten uns bei der IT‑ und Informationssicherheit nach anerkannten Standards wie dem IT‑Grundschutz des BSI und DIN ISO‑27001, einem in Deutschland weit verbreiteten Standard für den Aufbau von Informationssicherheits‑Managementsystemen."
                                }
                            ].map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    className="flex gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-800/50 to-gray-900/50 border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 group"
                                >
                                    <div className="flex-shrink-0">
                                        <div className="w-12 h-12 rounded-lg bg-blue-600/20 flex items-center justify-center group-hover:bg-blue-600/30 transition-colors">
                                            <item.icon className="w-6 h-6 text-blue-400" />
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

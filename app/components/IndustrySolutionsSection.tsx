"use client";
import { motion } from "framer-motion";
import { IconScale, IconShoppingCart, IconTrain, IconHammer, IconUsers, IconChartBar } from "@tabler/icons-react";
import Image from "next/image";

export default function IndustrySolutionsSection() {
    const industries = [
        { icon: IconScale, name: "Rechtsbereich" },
        { icon: IconShoppingCart, name: "E-Commerce" },
        { icon: IconTrain, name: "Bahndienstleister" },
        { icon: IconHammer, name: "Handwerk & Bau" },
        { icon: IconUsers, name: "Personalwesen" },
        { icon: IconChartBar, name: "Vertrieb" }
    ];

    return (
        <section className="relative bg-gradient-to-b from-black via-gray-900 to-black py-32 overflow-hidden">
            {/* Smooth Transition Overlays */}
            <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent z-10 pointer-events-none" />

            {/* Background Elements */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(59,130,246,0.05),transparent_50%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <div className="inline-block mb-4">
                            <span className="text-xs font-bold uppercase tracking-[0.3em] text-indigo-400 bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20">
                                Branchenkompetenz
                            </span>
                        </div>

                        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-600">Branchenspezifische</span> Lösungen
                        </h2>

                        <p className="text-gray-300 text-lg leading-relaxed mb-8">
                            Ob im Rechtsbereich, E‑Commerce, bei Bahndienstleistern, in der Handwerks‑ und Bauwirtschaft, im Personalwesen oder im Vertrieb: wir verstehen die besonderen Anforderungen Ihrer Branche. Deshalb entwickeln wir KI‑gestützte Anwendungen, die Ihre individuellen Prozesse optimieren und als digitale Begleiter fungieren. Dabei achten wir darauf, dass Ihre Softwarelösungen nicht nur effizient sind, sondern auch die branchenspezifischen gesetzlichen Vorgaben und Sicherheitsnormen erfüllen.
                        </p>

                        <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 mb-8">
                            <p className="text-gray-300 leading-relaxed">
                                Mit diesem ganzheitlichen Ansatz helfen wir Ihnen, die Potenziale von künstlicher Intelligenz in Ihrem Unternehmen zu erschließen und gleichzeitig die für Ihre Branche relevanten Sicherheits‑ und Compliance‑Aspekte zu berücksichtigen.
                            </p>
                        </div>

                        {/* Industry Icons Grid */}
                        <div className="grid grid-cols-3 gap-4">
                            {industries.map((industry, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 * index }}
                                    whileHover={{ scale: 1.05 }}
                                    className="flex flex-col items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-indigo-600/10 to-blue-600/10 border border-indigo-500/20 hover:border-indigo-500/50 transition-all duration-300 group cursor-pointer"
                                >
                                    <div className="w-12 h-12 rounded-lg bg-indigo-600/20 flex items-center justify-center group-hover:bg-indigo-600/30 transition-colors">
                                        <industry.icon className="w-6 h-6 text-indigo-400" />
                                    </div>
                                    <span className="text-xs font-bold text-gray-300 text-center group-hover:text-white transition-colors">
                                        {industry.name}
                                    </span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative order-1 lg:order-2"
                    >
                        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-blue-600/20 z-10" />
                            <Image
                                src="/images/ai-robot.jpg"
                                alt="Branchenspezifische KI-Lösungen"
                                fill
                                className="object-cover"
                                priority={false}
                            />
                            {/* Floating Badge */}
                            <div className="absolute top-6 right-6 bg-black/80 backdrop-blur-sm px-6 py-3 rounded-xl border border-indigo-500/30 z-20">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full bg-indigo-500 animate-pulse" />
                                    <span className="text-white font-bold">6+ Branchen</span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-4 -left-4 w-24 h-24 bg-indigo-600/20 rounded-full blur-2xl" />
                        <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-600/20 rounded-full blur-2xl" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ThreeLaptopReveal from "./ThreeLaptopReveal";

const Leaf = ({ className, delay = 0 }: { className?: string, delay?: number }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
        whileInView={{ opacity: 0.4, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, delay, ease: "easeOut" }}
        className={`absolute pointer-events-none select-none ${className}`}
    >
        <svg width="200" height="200" viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path d="M100 20C100 20 60 70 60 120C60 170 100 180 100 180C100 180 140 170 140 120C140 70 100 20 100 20Z" fill="#064e3b" />
            <path d="M100 20V180" stroke="#065f46" strokeWidth="2" />
            <path d="M100 60L75 80" stroke="#065f46" strokeWidth="2" />
            <path d="M100 90L70 115" stroke="#065f46" strokeWidth="2" />
            <path d="M100 120L75 145" stroke="#065f46" strokeWidth="2" />
            <path d="M100 60L125 80" stroke="#065f46" strokeWidth="2" />
            <path d="M100 90L130 115" stroke="#065f46" strokeWidth="2" />
            <path d="M100 120L125 145" stroke="#065f46" strokeWidth="2" />
        </svg>
    </motion.div>
);

export default function VideoRevealSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [progress, setProgress] = useState(0);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Subscribing to scroll progress to drive Three.js
    useEffect(() => {
        const unsubscribe = scrollYProgress.on("change", (v) => {
            setProgress(v);
        });
        return () => unsubscribe();
    }, [scrollYProgress]);

    // These transforms are no longer used for the text block, as it now uses initial/whileInView
    // const scale = useTransform(scrollYProgress, [0, 0.4], [0.8, 1]);
    // const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

    return (
        <section ref={containerRef} className="bg-black w-full relative h-[250vh]">
            <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Tropical Background Decorations */}
                <Leaf className="top-10 -left-20 w-80 h-80 -rotate-12 blur-sm opacity-20" delay={0.2} />
                <Leaf className="bottom-0 -right-20 w-96 h-96 rotate-12 blur-sm opacity-20" delay={0.4} />
                <div className="absolute inset-0 bg-blue-600/[0.02] pointer-events-none" />

                <div className="max-w-7xl mx-auto px-4 relative z-10 w-full flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-8"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-white mb-4 uppercase tracking-tight">
                            Sehen Sie <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-600">KI in Aktion</span>
                        </h2>
                        <div className="w-24 h-1 bg-blue-600 mx-auto rounded-full" />
                    </motion.div>

                    <div className="relative h-[60vh] w-full flex items-center justify-center">
                        <div className="absolute inset-0 bg-blue-600/5 rounded-full blur-[150px] opacity-50" />

                        {/* True Three.js Reveal */}
                        <div className="w-full h-full max-w-5xl mx-auto">
                            <ThreeLaptopReveal
                                scrollProgress={progress}
                                videoSrc="https://assets.mixkit.co/videos/preview/mixkit-futuristic-technology-digital-interface-31184-large.mp4"
                            />
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col items-center">
                        <motion.div
                            animate={{ opacity: progress > 0.8 ? 0 : 0.6 }}
                            className="flex flex-center justify-center gap-8 mb-6"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Three.js Engine</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-indigo-500" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-white/70">Real-time Render</span>
                            </div>
                        </motion.div>

                        {/* Scroll Indicator */}
                        <motion.div
                            animate={{
                                y: [0, 10, 0],
                                opacity: progress > 0.3 ? 0 : 1
                            }}
                            transition={{ repeat: Infinity, duration: 2 }}
                            className="flex flex-col items-center gap-2"
                        >
                            <span className="text-[10px] text-blue-400 uppercase tracking-[0.3em] font-bold">Scrollen</span>
                            <div className="w-px h-12 bg-gradient-to-b from-blue-600 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
}

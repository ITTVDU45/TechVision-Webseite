"use client";
import React from "react";
import { motion } from "framer-motion";
import TopicSlider from "./TopicSlider";
import { blogPosts } from "../data/blogPosts";

const TopThemes: React.FC = () => {
    return (
        <section id="top-themes" className="py-24 bg-black relative overflow-hidden">
            {/* Dynamic Background Elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block px-4 py-1.5 mb-6 rounded-full bg-neutral-900 border border-neutral-800"
                    >
                        <span className="text-sm font-medium text-blue-400">Magazin & News</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
                    >
                        Unsere <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">Top Themen</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto"
                    >
                        Aktuelle Einblicke in die digitale Transformation, Innovation und die Zukunft der Technologie.
                    </motion.p>
                </div>

                <div className="max-w-7xl mx-auto">
                    <TopicSlider posts={blogPosts} />
                </div>
            </div>
        </section>
    );
};

export default TopThemes;

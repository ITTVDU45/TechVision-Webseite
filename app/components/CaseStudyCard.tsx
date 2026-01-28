"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { CaseStudy } from "../data/caseStudies";

interface CaseStudyCardProps {
    caseStudy: CaseStudy;
    index: number;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="px-4 py-8 h-full"
        >
            <div className="relative group h-full">
                {/* Dynamic Glowing Shadow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 h-full flex flex-col shadow-2xl">
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={caseStudy.image}
                            alt={caseStudy.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

                        {/* Category Tag */}
                        <div className="absolute top-4 left-4">
                            <span className="px-3 py-1 bg-blue-500/10 backdrop-blur-md border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full uppercase tracking-wider">
                                {caseStudy.subtitle}
                            </span>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300">
                            {caseStudy.title}
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-gray-300 transition-colors">
                            {caseStudy.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 mb-8 mt-auto">
                            {caseStudy.stats.map((stat, statIndex) => (
                                <div key={statIndex} className="text-center group/stat">
                                    <div className="text-blue-500 font-black text-xl mb-1 group-hover:scale-110 transition-transform">{stat.value}</div>
                                    <div className="text-neutral-500 text-[10px] uppercase tracking-widest font-bold">
                                        {stat.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <Link
                            href={`/case-studies/${caseStudy.id}`}
                            className="w-full py-4 bg-white/5 hover:bg-gradient-to-r hover:from-blue-600 hover:to-indigo-600 text-white text-center rounded-xl font-bold transition-all duration-300 flex items-center justify-center gap-2 group/btn border border-white/10 hover:border-transparent shadow-xl"
                        >
                            <span>Projekt ansehen</span>
                            <svg
                                className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default CaseStudyCard;

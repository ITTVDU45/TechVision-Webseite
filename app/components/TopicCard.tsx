"use client";
import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "../data/blogPosts";

interface TopicCardProps {
    post: BlogPost;
    index: number;
}

const TopicCard: React.FC<TopicCardProps> = ({ post, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="px-4 py-8 h-full"
        >
            <div className="relative group h-full">
                {/* Dynamic Glowing Shadow */}
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-3xl opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500" />

                <div className="relative bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col h-full shadow-2xl">
                    {/* Category Badge - moved inside relative container for better z-index management */}
                    <div className="absolute top-6 left-6 z-20">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-black/40 backdrop-blur-xl border border-white/10 rounded-full">
                            <span className="text-lg">{post.category.icon}</span>
                            <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{post.category.name}</span>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="relative h-64 overflow-hidden">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    </div>

                    {/* Content Section */}
                    <div className="p-8 flex flex-col flex-grow relative z-10">
                        <div className="flex items-center gap-4 text-xs text-neutral-500 mb-4 font-medium uppercase tracking-wider">
                            <span>{post.date}</span>
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50" />
                            <span>{post.readTime} Lesezeit</span>
                        </div>

                        <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-400 transition-all duration-300 line-clamp-2">
                            {post.title}
                        </h3>

                        <p className="text-neutral-400 text-sm leading-relaxed mb-8 line-clamp-3 group-hover:text-gray-300 transition-colors">
                            {post.description}
                        </p>

                        <div className="mt-auto">
                            <Link
                                href={`/blog/${post.id}`}
                                className="inline-flex items-center gap-2 text-sm font-bold text-blue-500 hover:text-blue-400 group/link transition-colors"
                            >
                                <span className="uppercase tracking-widest">Artikel lesen</span>
                                <svg
                                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>

                    {/* Decorative Gradient Bar at Bottom */}
                    <div className="h-1.5 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 group-hover:w-full" />
                </div>
            </div>
        </motion.div>
    );
};

export default TopicCard;

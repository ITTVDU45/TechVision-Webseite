"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopicSlider from "./TopicSlider";
import { blogPosts as staticBlogPosts } from "../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";
import { resolveBlogImageUrl } from "@/lib/resolveBlogImageUrl";

const TopThemes: React.FC = () => {
    const [posts, setPosts] = useState(staticBlogPosts);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const apiBlogs = await fetchBlogPosts();

                if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
                    const published = apiBlogs.filter((b: { published?: boolean }) => b.published !== false);

                    let homeBlogs = published.filter((b: { page?: unknown }) => {
                        const pages = Array.isArray(b.page) ? b.page : b.page ? [b.page] : [];
                        return pages.includes("home");
                    });

                    if (homeBlogs.length === 0) homeBlogs = published;

                    const formatted = homeBlogs
                        .sort((a: { date?: string; createdAt?: string }, b: { date?: string; createdAt?: string }) => {
                            const dateA = new Date(a.date || a.createdAt || 0).getTime();
                            const dateB = new Date(b.date || b.createdAt || 0).getTime();
                            return dateB - dateA;
                        })
                        .slice(0, 6)
                        .map((b: Record<string, unknown>) => {
                            const rawCategory = b.category;
                            let category: { name: string; icon: string };
                            if (Array.isArray(rawCategory) && rawCategory.length > 0 && typeof rawCategory[0] === "object" && rawCategory[0] !== null) {
                                const c = rawCategory[0] as { name?: string; icon?: string };
                                category = { name: c.name ?? "Allgemein", icon: c.icon ?? "📝" };
                            } else if (rawCategory && typeof rawCategory === "object" && !Array.isArray(rawCategory)) {
                                const c = rawCategory as { name?: string; icon?: string };
                                category = { name: c.name ?? "Allgemein", icon: c.icon ?? "📝" };
                            } else {
                                category = { name: "Allgemein", icon: "📝" };
                            }

                            const id = String(b.id || b._id || b.slug || "");
                            const slug = typeof b.slug === "string" ? b.slug : id;

                            const rawDate = b.date ?? b.createdAt;
                            let dateStr: string;
                            if (rawDate instanceof Date) {
                                dateStr = rawDate.toLocaleDateString("de-DE", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                            } else if (typeof rawDate === "string" || typeof rawDate === "number") {
                                dateStr = new Date(rawDate).toLocaleDateString("de-DE", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                            } else {
                                dateStr = new Date().toLocaleDateString("de-DE", {
                                    day: "numeric",
                                    month: "long",
                                    year: "numeric",
                                });
                            }

                            return {
                                id,
                                slug,
                                title: String(b.title || ""),
                                subtitle: String(b.subtitle || ""),
                                description: String(b.description || (typeof b.content === "string" ? b.content.substring(0, 150) : "")),
                                image: resolveBlogImageUrl(typeof b.image === "string" ? b.image : ""),
                                date: dateStr,
                                readTime: String(b.readTime || "5 min"),
                                category,
                            };
                        });

                    setPosts(formatted);
                }
            } catch (error) {
                console.error("TopThemes: Error loading blog posts:", error);
            }
        };

        loadBlogs();
    }, []);

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
                    <TopicSlider posts={posts} />
                </div>
            </div>
        </section>
    );
};

export default TopThemes;

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TopicSlider from "./TopicSlider";
import { blogPosts as staticBlogPosts } from "../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";

const TopThemes: React.FC = () => {
    const [posts, setPosts] = useState(staticBlogPosts);

    useEffect(() => {
        const loadBlogs = async () => {
            try {
                const apiBlogs = await fetchBlogPosts();
                console.log('TopThemes: Fetched blogs from API:', apiBlogs?.length || 0);
                
                if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
                    // Filtere veröffentlichte Blogs
                    const published = apiBlogs.filter((b: any) => b.published !== false);
                    console.log('TopThemes: Published blogs:', published.length);
                    
                    // Zuerst versuche Blogs mit 'home' im page Array zu finden
                    let homeBlogs = published.filter((b: any) => {
                        const pages = Array.isArray(b.page) ? b.page : (b.page ? [b.page] : []);
                        const hasHome = pages.includes('home');
                        if (hasHome) {
                            console.log('TopThemes: Found blog with home page:', b.title);
                        }
                        return hasHome;
                    });
                    
                    console.log('TopThemes: Blogs with home page:', homeBlogs.length);
                    
                    // Wenn keine Blogs mit 'home' gefunden wurden, nimm alle veröffentlichten Blogs
                    if (homeBlogs.length === 0) {
                        console.log('TopThemes: No blogs with home page, using all published blogs');
                        homeBlogs = published;
                    }
                    
                    const formatted = homeBlogs
                        .sort((a: any, b: any) => {
                            const dateA = new Date(a.date || a.createdAt || 0).getTime();
                            const dateB = new Date(b.date || b.createdAt || 0).getTime();
                            return dateB - dateA;
                        })
                        .slice(0, 6) // Top 6 für Homepage
                        .map((b: any) => ({
                            id: b.id || b._id?.toString() || b.slug || '',
                            title: b.title || '',
                            subtitle: b.subtitle || '',
                            description: b.description || b.content?.substring(0, 150) || '',
                            image: b.image || 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image',
                            date: b.date || new Date(b.createdAt || Date.now()).toLocaleDateString('de-DE', { 
                                day: 'numeric', 
                                month: 'long', 
                                year: 'numeric' 
                            }),
                            readTime: b.readTime || '5 min',
                            category: Array.isArray(b.category) && b.category.length > 0 
                                ? b.category[0] 
                                : (b.category || { name: 'Allgemein', icon: '📝' }),
                            slug: b.slug || b.id || b._id?.toString() || '',
                        }));
                    
                    console.log('TopThemes: Formatted blogs:', formatted.length);
                    console.log('TopThemes: Blog titles:', formatted.map((p: any) => p.title));
                    
                    // Setze die Posts immer, auch wenn es weniger als 6 sind
                    setPosts(formatted);
                } else {
                    console.log('TopThemes: No API blogs found, keeping static posts');
                }
            } catch (error) {
                console.error('TopThemes: Error loading blog posts:', error);
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

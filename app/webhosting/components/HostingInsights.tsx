"use client";
import React from "react";
import { motion } from "framer-motion";
import TopicSlider from "../../components/TopicSlider";
import { BlogPost } from "./types";

interface HostingInsightsProps {
  posts: BlogPost[];
}

export default function HostingInsights({ posts }: HostingInsightsProps) {
  // Convert posts to match BlogPost format from data/blogPosts.ts
  const convertedPosts = posts.map((post, index) => ({
    id: post.id || post.link?.replace('/blog/', '') || `hosting-${index}`,
    title: post.title,
    subtitle: post.subtitle || post.category.name,
    description: post.description,
    image: post.image || '/images/blog/default.jpg',
    date: post.date,
    readTime: post.readTime || '5 min',
    category: post.category,
  }));

  return (
    <section id="hosting-insights" className="py-24 bg-black relative overflow-hidden">
      {/* Dynamic Background Elements */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-neutral-900 border border-neutral-800"
          >
            <span className="text-sm font-medium text-blue-400">Hosting & Insights</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            Aktuelle <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">Blog-Artikel</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-neutral-400 leading-relaxed max-w-2xl mx-auto"
          >
            Insights und Neuigkeiten aus der Hosting-Welt
          </motion.p>
        </div>

        <div className="max-w-7xl mx-auto">
          <TopicSlider posts={convertedPosts} />
        </div>
      </div>
    </section>
  );
}

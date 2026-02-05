"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import { BlogPost } from './types';
import Link from 'next/link';

interface ToolsNewsSectionProps {
  posts: BlogPost[];
}

export default function ToolsNewsSection({ posts }: ToolsNewsSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const postsPerPage = isMobile ? 1 : 3;
  const totalPages = Math.ceil(posts.length / postsPerPage);

  const visiblePosts = useMemo(() => {
    const start = currentIndex;
    const end = start + postsPerPage;
    return posts.slice(start, end);
  }, [currentIndex, postsPerPage, posts]);

  const nextSlide = () => {
    if (currentIndex + postsPerPage < posts.length) {
      setCurrentIndex(prev => prev + postsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => Math.max(0, prev - postsPerPage));
    }
  };

  const goToPage = (page: number) => {
    setCurrentIndex(page * postsPerPage);
  };

  return (
    <section className="py-24 relative overflow-hidden bg-black">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Aktuelle Tools & News</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Bleiben Sie auf dem Laufenden über die neuesten Entwicklungen in der Welt der Tools.
          </p>
        </motion.div>

        <div className="relative">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="w-6 h-6 text-white" />
            </button>
            <div className="flex-1" />
            <button
              onClick={nextSlide}
              disabled={currentIndex + postsPerPage >= posts.length}
              className="p-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="w-6 h-6 text-white" />
            </button>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {visiblePosts.map((post, index) => (
                <motion.div
                  key={`${post.title}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <Link href={post.link || '#'}>
                    <div className="h-full bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl hover:shadow-purple-500/10">
                      <div className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="text-2xl">{post.category.icon}</span>
                          <span className="text-sm text-gray-400">{post.date}</span>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">
                          {post.title}
                        </h3>
                        {post.subtitle && (
                          <p className="text-gray-400 text-sm mb-4">{post.subtitle}</p>
                        )}
                        <div className="overflow-hidden">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-sm font-medium text-white border border-white/10 hover:border-white/20 transition-all"
                          >
                            Weiterlesen
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToPage(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  Math.floor(currentIndex / postsPerPage) === index
                    ? 'bg-purple-500 w-8'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Go to page ${index + 1}`}
              />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/blog">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-xl text-lg font-medium text-white shadow-xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all"
            >
              Zu unseren News
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

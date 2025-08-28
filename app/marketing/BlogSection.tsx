"use client";
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';
import blogPostsData from '../../data/blogPosts';

type BlogPost = {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  link?: string;
  category?: string;
  date?: string;
};

type BlogSectionProps = {
  title?: string;
  subtitle?: string;
  blogPosts?: BlogPost[];
};

export default function BlogSection({
  title = 'KI-Insights & Trends',
  subtitle = 'Erfahren Sie mehr über aktuelle Entwicklungen und entdecken Sie Best Practices für Ihr Unternehmen.',
  blogPosts = blogPostsData
}: BlogSectionProps) {
  const postsPerPage = 3; // always 3
  const pageCount = Math.max(1, Math.ceil(blogPosts.length / postsPerPage));
  const [page, setPage] = useState(0);

  const visiblePosts = useMemo(() => {
    const start = page * postsPerPage;
    return blogPosts.slice(start, start + postsPerPage);
  }, [page, blogPosts]);

  const next = () => setPage(p => Math.min(p + 1, pageCount - 1));
  const prev = () => setPage(p => Math.max(p - 1, 0));

  if (!blogPosts || blogPosts.length === 0) {
    return (
      <section className="py-24 bg-black text-white">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <h3 className="text-2xl font-semibold">Keine Blog-Artikel verfügbar</h3>
            <p className="text-gray-400 mt-2">Momentan gibt es keine Einträge. Wir arbeiten am Inhalt.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-32 bg-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-blue-950/10 to-black" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="relative inline-block bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 text-transparent bg-clip-text animate-gradient-x">
              {title}
            </span>
          </h2>
          <p className="text-xl text-gray-300">{subtitle}</p>
        </div>

        <div className="relative max-w-7xl mx-auto">
          <div className="overflow-hidden mx-12">
            <div className="flex gap-6">
              {visiblePosts.map((post, index) => (
                <motion.div
                  key={`${post.title}-${index}`}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="w-full min-w-[calc(33.333%_-_1rem)] md:min-w-[calc(33.333%_-_1rem)]"
                >
                  <Link href={post.link || '#'} className="group block">
                      <div className={`bg-gradient-to-br p-[1px] rounded-2xl h-full`}>
                        <div className="bg-gray-900 p-4 rounded-2xl h-full flex flex-col">
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-sm font-medium px-3 py-1 rounded-full bg-white/10">
                              {post.category}
                            </span>
                            <span className="text-sm text-gray-400">{post.date}</span>
                          </div>

                          <div className="aspect-video rounded-lg overflow-hidden mb-4">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>

                          <div className="mb-6 flex-grow">
                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                              {post.title}
                            </h3>
                            <p className="text-gray-400 line-clamp-3">{post.excerpt}</p>
                          </div>

                          <button
                            className="w-full py-2 px-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-lg text-white text-sm font-medium hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                          >
                            Weiterlesen
                          </button>
                        </div>
                      </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            disabled={page === 0}
            className={`absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
              page === 0 ? 'bg-blue-500/5 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'
            } transition-colors duration-200`}
            aria-label="Vorherige"
          >
            <ChevronLeftIcon className={`w-6 h-6 ${page === 0 ? 'text-blue-400/50' : 'text-blue-400'}`} />
          </button>

          <button
            onClick={next}
            disabled={page >= pageCount - 1}
            className={`absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full ${
              page >= pageCount - 1 ? 'bg-blue-500/5 cursor-not-allowed' : 'bg-blue-500/10 hover:bg-blue-500/20 cursor-pointer'
            } transition-colors duration-200`}
            aria-label="Nächste"
          >
            <ChevronRightIcon className={`w-6 h-6 ${page >= pageCount - 1 ? 'text-blue-400/50' : 'text-blue-400'}`} />
          </button>

          <div className="flex justify-center gap-2 mt-8">
            {Array.from({ length: pageCount }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${page === idx ? 'bg-blue-500 w-8' : 'bg-blue-500/20 hover:bg-blue-500/40'}`}
                aria-label={`Gehe zu Seite ${idx + 1}`}
              />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/blog">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 rounded-xl text-lg font-medium relative overflow-hidden group shadow-xl shadow-blue-500/20"
                >
                  <span className="relative z-10">Zu unseren News</span>
                </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

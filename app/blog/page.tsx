"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPosts } from "@/lib/api";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface BlogPost {
  _id?: string;
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: Array<{
    id: string;
    name: string;
    icon: string;
  }> | {
    name: string;
    icon: string;
  };
  tags?: string[];
  page?: string | string[];
  published: boolean;
}

export default function BlogPage() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const apiBlogs = await fetchBlogPosts();
        if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
          const published = apiBlogs
            .filter((b: any) => b.published !== false)
            .sort((a: any, b: any) => {
              const dateA = new Date(a.date || a.createdAt || 0).getTime();
              const dateB = new Date(b.date || b.createdAt || 0).getTime();
              return dateB - dateA;
            });
          setBlogPosts(published);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogs();
  }, []);

  // Extrahiere alle eindeutigen Kategorien aus allen Blog-Posts
  const categories = Array.from(new Set(
    blogPosts.flatMap(b => {
      if (Array.isArray(b.category)) {
        return b.category.map(c => c.name);
      } else if (b.category?.name) {
        return [b.category.name];
      }
      return [];
    })
  ));

  const filteredPosts = selectedCategory
    ? blogPosts.filter(b => {
        if (Array.isArray(b.category)) {
          return b.category.some(c => c.name === selectedCategory);
        } else if (b.category?.name) {
          return b.category.name === selectedCategory;
        }
        return false;
      })
    : blogPosts;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Blog
            </motion.h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-8">
              Erfahren Sie mehr über aktuelle Entwicklungen und entdecken Sie Best Practices für Ihr Unternehmen.
            </p>

            {/* Kategorie-Filter */}
            {categories.length > 0 && (
              <div className="flex flex-wrap justify-center gap-3 mb-8">
                <button
                  onClick={() => setSelectedCategory(null)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    selectedCategory === null
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Alle
                </button>
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-gray-400 py-16">Lädt Blog-Artikel...</div>
          ) : filteredPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              {selectedCategory ? "Keine Artikel in dieser Kategorie gefunden." : "Keine Blog-Artikel verfügbar."}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {filteredPosts.map((post, index) => {
                const slug = post.slug || post.id;
                return (
                  <motion.div
                    key={post._id || post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Link href={`/blog/${slug}`}>
                      <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-300 shadow-xl group h-full flex flex-col">
                        <div className="relative h-48 overflow-hidden">
                          <Image
                            src={post.image}
                            alt={post.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {Array.isArray(post.category) ? (
                              post.category.slice(0, 2).map((cat, idx) => {
                                const categorySlug = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                                return (
                                  <Link
                                    key={idx}
                                    href={`/blog/category/${categorySlug}`}
                                    onClick={(e) => e.stopPropagation()}
                                    className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm hover:bg-black/70 transition-colors"
                                  >
                                    {cat.icon} {cat.name}
                                  </Link>
                                );
                              })
                            ) : (
                              <Link
                                href={`/blog/category/${('id' in post.category ? post.category.id : post.category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''))}`}
                                onClick={(e) => e.stopPropagation()}
                                className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm hover:bg-black/70 transition-colors"
                              >
                                {post.category.icon} {post.category.name}
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-400 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                            {post.subtitle}
                          </p>
                          <p className="text-gray-500 text-sm mb-4 line-clamp-3 flex-1">
                            {post.description}
                          </p>
                          <div className="flex items-center justify-between text-sm text-gray-500 mt-auto pt-4 border-t border-white/10">
                            <span>{post.date}</span>
                            <span>{post.readTime}</span>
                          </div>
                          {post.tags && post.tags.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {post.tags.slice(0, 3).map((tag, idx) => (
                                <span
                                  key={idx}
                                  className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPosts } from "@/lib/api";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";

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

export default function BlogCategoryPage() {
  const params = useParams();
  const categorySlug = params.category as string;
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryName, setCategoryName] = useState<string>("");
  const [categoryIcon, setCategoryIcon] = useState<string>("📝");

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const apiBlogs = await fetchBlogPosts();
        if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
          const published = apiBlogs.filter((b: any) => b.published !== false);
          
          // Filtere nach Kategorie
          const filtered = published.filter((b: any) => {
            if (Array.isArray(b.category)) {
              return b.category.some((cat: any) => {
                const catId = cat.id || cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const catName = cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return catId === categorySlug || catName === categorySlug;
              });
            } else if (b.category?.name) {
              const catId = ('id' in b.category ? b.category.id : b.category.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')) || '';
              const catName = b.category.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              return catId === categorySlug || catName === categorySlug;
            }
            return false;
          });

          // Sortiere nach Datum
          filtered.sort((a: any, b: any) => {
            const dateA = new Date(a.date || a.createdAt || 0).getTime();
            const dateB = new Date(b.date || b.createdAt || 0).getTime();
            return dateB - dateA;
          });

          setBlogPosts(filtered);

          // Setze Kategorie-Name und Icon aus dem ersten gefundenen Blog
          if (filtered.length > 0) {
            const firstBlog = filtered[0];
            if (Array.isArray(firstBlog.category)) {
              const matchingCat = firstBlog.category.find((cat: any) => {
                const catId = cat.id || cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                const catName = cat.name?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                return catId === categorySlug || catName === categorySlug;
              });
              if (matchingCat) {
                setCategoryName(matchingCat.name);
                setCategoryIcon(matchingCat.icon || '📝');
              }
            } else if (firstBlog.category?.name) {
              setCategoryName(firstBlog.category.name);
              setCategoryIcon(firstBlog.category.icon || '📝');
            }
          }
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };

    if (categorySlug) {
      loadBlogs();
    }
  }, [categorySlug]);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-green-950/20 to-black" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-block px-4 py-2 mb-6 bg-black/50 backdrop-blur-sm rounded-full text-sm"
            >
              <span className="text-2xl mr-2">{categoryIcon}</span>
              <span className="text-blue-400 font-medium">Kategorie</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              {categoryName || "Kategorie"}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-gray-400 mb-8"
            >
              Alle Artikel in dieser Kategorie
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-colors text-sm"
              >
                ← Zurück zur Blog-Übersicht
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center text-gray-400 py-16">Lädt Blog-Artikel...</div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center text-gray-400 py-16">
              <p className="text-xl mb-4">Keine Artikel in dieser Kategorie gefunden.</p>
              <Link href="/blog" className="text-blue-400 hover:text-blue-300">
                Zurück zur Blog-Übersicht
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {blogPosts.map((post, index) => {
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
                          {post.image ? (
                            post.image.includes('via.placeholder.com') ? (
                              <img
                                src={post.image}
                                alt={post.title}
                                className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            ) : (
                              <Image
                                src={post.image}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            )
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
                              Kein Bild
                            </div>
                          )}
                          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                            {Array.isArray(post.category) ? (
                              post.category.slice(0, 2).map((cat, idx) => (
                                <span key={idx} className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                                  {cat.icon} {cat.name}
                                </span>
                              ))
                            ) : (
                              <span className="px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                                {post.category.icon} {post.category.name}
                              </span>
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

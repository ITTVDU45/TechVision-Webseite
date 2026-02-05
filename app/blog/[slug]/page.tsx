"use client";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { fetchBlogPosts } from "@/lib/api";
import TopicSlider from "../../components/TopicSlider";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

interface BlogPost {
  _id?: string;
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  content?: string;
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

export default function BlogDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlog = async () => {
      try {
        // Versuche zuerst über die API-Route
        const res = await fetch(`/api/blogs/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setBlog(data);
          
          // Lade verwandte Blogs
          const allBlogs = await fetchBlogPosts();
          if (allBlogs && Array.isArray(allBlogs)) {
            const published = allBlogs.filter((b: any) => b.published !== false);
            // Normalisiere category zu Array für Vergleich
            const blogCategories = Array.isArray(data.category) 
              ? data.category.map((c: any) => c.name || c.id)
              : (data.category?.name ? [data.category.name] : []);
            
            // Sortiere nach Relevanz: zuerst nach gemeinsamen Kategorien, dann nach Tags, dann nach Datum
            const related = published
              .filter((b: any) => {
                const blogSlug = b.slug || b.id;
                return blogSlug !== slug;
              })
              .map((b: any) => {
                // Prüfe Kategorien-Überschneidung
                const bCategories = Array.isArray(b.category)
                  ? b.category.map((c: any) => c.name || c.id)
                  : (b.category?.name ? [b.category.name] : []);
                const hasCommonCategory = blogCategories.some((cat: string) => bCategories.includes(cat));
                
                // Prüfe Tags-Überschneidung
                const hasCommonTag = data.tags && b.tags && 
                  Array.isArray(data.tags) && Array.isArray(b.tags) &&
                  data.tags.some((tag: string) => b.tags.includes(tag));
                
                // Berechne Relevanz-Score
                let relevance = 0;
                if (hasCommonCategory) relevance += 2;
                if (hasCommonTag) relevance += 1;
                
                return { ...b, relevance };
              })
              .sort((a: any, b: any) => {
                // Sortiere nach Relevanz (höher = besser), dann nach Datum
                if (b.relevance !== a.relevance) {
                  return b.relevance - a.relevance;
                }
                const dateA = new Date(a.date || a.createdAt || 0).getTime();
                const dateB = new Date(b.date || b.createdAt || 0).getTime();
                return dateB - dateA;
              })
              .slice(0, 6); // Top 6 für Carousel
            setRelatedBlogs(related);
          }
        } else {
          router.push('/blog');
        }
      } catch (error) {
        console.error('Error loading blog:', error);
        router.push('/blog');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      loadBlog();
    }
  }, [slug, router]);

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-gray-400">Lädt Artikel...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen w-full bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Artikel nicht gefunden</h1>
          <Link href="/blog" className="text-blue-400 hover:text-blue-300">
            Zurück zur Blog-Übersicht
          </Link>
        </div>
      </div>
    );
  }

  // Format content (einfaches Markdown-Parsing)
  const formatContent = (content: string) => {
    if (!content) return null;
    
    const lines = content.split('\n');
    return lines.map((line, idx) => {
      if (line.startsWith('# ')) {
        return <h1 key={idx} className="text-3xl font-bold mt-8 mb-4">{line.substring(2)}</h1>;
      }
      if (line.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold mt-6 mb-3">{line.substring(3)}</h2>;
      }
      if (line.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold mt-4 mb-2">{line.substring(4)}</h3>;
      }
      if (line.startsWith('- ') || line.startsWith('* ')) {
        return <li key={idx} className="ml-6 mb-2">{line.substring(2)}</li>;
      }
      if (line.trim() === '') {
        return <br key={idx} />;
      }
      return <p key={idx} className="mb-4 leading-relaxed">{line}</p>;
    });
  };

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      
      {/* Hero Image */}
      <section className="relative h-[60vh] overflow-hidden bg-gradient-to-br from-blue-900/20 to-indigo-900/20">
        {blog.image && (
          blog.image.includes('via.placeholder.com') ? (
            <img
              src={blog.image}
              alt={blog.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          )
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-16">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex flex-wrap gap-2 mb-4">
                {Array.isArray(blog.category) ? (
                  blog.category.map((cat, idx) => (
                    <span key={idx} className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                      {cat.icon} {cat.name}
                    </span>
                  ))
                ) : (
                  <span className="inline-block px-4 py-2 bg-black/50 backdrop-blur-sm rounded-full text-sm">
                    {blog.category.icon} {blog.category.name}
                  </span>
                )}
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{blog.title}</h1>
              <p className="text-xl text-gray-300 mb-4">{blog.subtitle}</p>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span>{blog.date}</span>
                <span>•</span>
                <span>{blog.readTime}</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Article */}
              <div className="lg:col-span-2">
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="prose prose-invert max-w-none"
                >
                  <div className="text-gray-300 leading-relaxed">
                    {blog.content ? formatContent(blog.content) : (
                      <p className="mb-4">{blog.description}</p>
                    )}
                  </div>
                </motion.article>
              </div>

              {/* Sidebar */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {/* Kategorien */}
                  <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                    <h3 className="text-lg font-bold mb-4">Kategorien</h3>
                    {Array.isArray(blog.category) ? (
                      blog.category.length > 0 ? (
                        <div className="space-y-2">
                          {blog.category.map((cat, idx) => {
                            const categorySlug = cat.id || cat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                            return (
                              <Link
                                key={idx}
                                href={`/blog/category/${categorySlug}`}
                                className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
                              >
                                <span className="text-2xl">{cat.icon}</span>
                                <span className="flex-1">{cat.name}</span>
                                <svg
                                  className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-400 text-sm">Keine Kategorien</p>
                      )
                    ) : (
                      <Link
                        href={`/blog/category/${blog.category.id || blog.category.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                        className="flex items-center gap-2 hover:text-blue-400 transition-colors group"
                      >
                        <span className="text-2xl">{blog.category.icon}</span>
                        <span className="flex-1">{blog.category.name}</span>
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transform group-hover:translate-x-1 transition-all"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </Link>
                    )}
                  </div>

                  {/* Tags */}
                  {blog.tags && blog.tags.length > 0 && (
                    <div className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
                      <h3 className="text-lg font-bold mb-4">Tags</h3>
                      <div className="flex flex-wrap gap-2">
                        {blog.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Zurück-Link */}
                  <Link
                    href="/blog"
                    className="block px-4 py-3 bg-blue-500 hover:bg-blue-600 rounded-lg text-center transition-colors"
                  >
                    ← Zurück zur Übersicht
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>
      </section>

      {/* Related Blogs Carousel */}
      {relatedBlogs.length > 0 && (
        <section className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
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
                <span className="text-sm font-medium text-blue-400">Weitere Artikel</span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
              >
                Das könnte Sie auch <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-500 to-indigo-600">interessieren</span>
              </motion.h2>
            </div>

            <div className="max-w-7xl mx-auto">
              <TopicSlider 
                posts={relatedBlogs.map((relatedPost: any) => {
                  const relatedSlug = relatedPost.slug || relatedPost.id;
                  // Normalisiere category zu dem Format, das TopicCard erwartet
                  const category = Array.isArray(relatedPost.category) && relatedPost.category.length > 0
                    ? relatedPost.category[0]
                    : (relatedPost.category || { name: 'Allgemein', icon: '📝' });
                  
                  return {
                    id: relatedPost.id || relatedPost._id?.toString() || relatedSlug,
                    title: relatedPost.title || '',
                    subtitle: relatedPost.subtitle || '',
                    description: relatedPost.description || relatedPost.content?.substring(0, 150) || '',
                    image: relatedPost.image || 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image',
                    date: relatedPost.date || new Date(relatedPost.createdAt || Date.now()).toLocaleDateString('de-DE', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    }),
                    readTime: relatedPost.readTime || '5 min',
                    category: category,
                    slug: relatedSlug,
                  };
                })} 
              />
            </div>
          </div>
        </section>
      )}
      
      <Footer />
    </div>
  );
}

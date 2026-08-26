"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { blogPosts as fallbackPosts } from "../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";

interface Category { id?: string; name: string; icon?: string }
interface BlogPost {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  date?: string;
  readTime?: string;
  category?: Category[] | Category;
  tags?: string[];
  published?: boolean;
  createdAt?: string;
}

function postCategories(post: BlogPost): Category[] {
  if (Array.isArray(post.category)) return post.category;
  return post.category ? [post.category] : [];
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    fetchBlogPosts()
      .then((data) => {
        if (!active) return;
        const source = Array.isArray(data) && data.length ? data : fallbackPosts;
        const unique = new Map<string, BlogPost>();
        source.filter((post: BlogPost) => post.published !== false).forEach((post: BlogPost) => {
          const key = post.slug || post.id || post._id || post.title;
          if (!unique.has(key)) unique.set(key, post);
        });
        setPosts(Array.from(unique.values()).sort((a, b) => new Date(b.date || b.createdAt || 0).getTime() - new Date(a.date || a.createdAt || 0).getTime()));
      })
      .catch(() => setPosts(fallbackPosts))
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const categories = useMemo(() => Array.from(new Set(posts.flatMap((post) => postCategories(post).map((category) => category.name)))).sort(), [posts]);
  const filteredPosts = selectedCategory ? posts.filter((post) => postCategories(post).some((category) => category.name === selectedCategory)) : posts;

  return (
    <div className="min-h-screen bg-[#050912] text-white">
      <Header />
      <main>
        <section className="border-b border-white/[0.07] pb-14 pt-36 sm:pb-16 sm:pt-44">
          <div className="section-container">
            <p className="eyebrow">Fachbeiträge</p>
            <h1 className="heading-display mt-6 max-w-5xl text-4xl sm:text-6xl lg:text-7xl">Technologie verständlich eingeordnet.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">Praxisnahe Einblicke zu KI, Softwareentwicklung, Automatisierung, IT-Betrieb und Sicherheit.</p>
          </div>
        </section>

        <section className="section-y bg-[#070b13]" aria-label="Fachbeiträge">
          <div className="section-container">
            {categories.length ? (
              <div className="mb-10 flex gap-2 overflow-x-auto pb-2" aria-label="Beiträge filtern">
                <button type="button" onClick={() => setSelectedCategory(null)} aria-pressed={!selectedCategory} className={`focus-ring min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${!selectedCategory ? "border-sky-400/40 bg-sky-400/[0.12] text-sky-200" : "border-white/10 text-slate-400 hover:text-white"}`}>Alle Themen</button>
                {categories.map((category) => <button key={category} type="button" onClick={() => setSelectedCategory(category)} aria-pressed={selectedCategory === category} className={`focus-ring min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold ${selectedCategory === category ? "border-sky-400/40 bg-sky-400/[0.12] text-sky-200" : "border-white/10 text-slate-400 hover:text-white"}`}>{category}</button>)}
              </div>
            ) : null}

            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Beiträge werden geladen">{[0, 1, 2, 3, 4, 5].map((item) => <div key={item} className="skeleton aspect-[4/3]" />)}</div>
            ) : filteredPosts.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post, index) => {
                  const slug = post.slug || post.id || post._id;
                  const category = postCategories(post)[0]?.name;
                  return (
                    <article key={slug || `${post.title}-${index}`} className="surface-card surface-card--hover overflow-hidden">
                      {post.image ? (
                        <div className="aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-slate-900">
                          {/* CMS images may originate from the configured object-storage host. */}
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={post.image} alt="" loading={index < 3 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" />
                        </div>
                      ) : null}
                      <div className="p-6">
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">{category ? <span className="font-semibold uppercase tracking-wider text-sky-300">{category}</span> : null}</div>
                        <h2 className="mt-4 text-xl font-semibold leading-snug"><Link href={slug ? `/blog/${slug}` : "/blog"} className="focus-ring rounded-sm hover:text-sky-300">{post.title}</Link></h2>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.description || post.subtitle}</p>
                        <div className="mt-6 flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs text-slate-500"><span>{post.readTime || "Artikel"}</span><span aria-hidden="true">→</span></div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="surface-card px-6 py-14 text-center text-slate-400">{selectedCategory ? "Zu diesem Thema sind derzeit keine Beiträge verfügbar." : "Derzeit sind keine Beiträge verfügbar."}</div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

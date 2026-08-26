"use client";
/* eslint-disable @next/next/no-img-element -- CMS and local fallback URLs share one lightweight card renderer. */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { blogPosts as fallbackPosts } from "../../../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";

interface Category { id?: string; name: string }
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
  published?: boolean;
}

function categoriesOf(post: BlogPost): Category[] {
  if (Array.isArray(post.category)) return post.category;
  return post.category ? [post.category] : [];
}

function toSlug(value: string) {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function uniquePosts(posts: BlogPost[]) {
  const unique = new Map<string, BlogPost>();
  posts.filter((post) => post.published !== false).forEach((post) => {
    const key = post.slug || post.id || post._id || post.title;
    if (!unique.has(key)) unique.set(key, post);
  });
  return Array.from(unique.values());
}

export default function BlogCategoryPage() {
  const categorySlug = useParams<{ category: string }>().category;
  const [posts, setPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;
    fetchBlogPosts()
      .then((data) => {
        if (!active) return;
        const source = Array.isArray(data) && data.length ? data : fallbackPosts;
        setPosts(uniquePosts(source));
      })
      .catch(() => { if (active) setPosts(uniquePosts(fallbackPosts)); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const filtered = useMemo(() => posts.filter((post) => categoriesOf(post).some((category) => category.id === categorySlug || toSlug(category.name) === categorySlug)), [categorySlug, posts]);
  const categoryName = filtered.flatMap(categoriesOf).find((category) => category.id === categorySlug || toSlug(category.name) === categorySlug)?.name || categorySlug.replace(/-/g, " ");

  return (
    <div className="min-h-screen bg-[#050912] text-white">
      <Header />
      <main>
        <section className="border-b border-white/[0.07] pb-14 pt-36 sm:pb-16 sm:pt-44">
          <div className="section-container">
            <p className="eyebrow">Fachbeiträge · Thema</p>
            <h1 className="heading-display mt-6 max-w-4xl break-words text-4xl capitalize sm:text-6xl">{categoryName}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">Alle verfügbaren Beiträge aus diesem Themenbereich.</p>
            <Link href="/blog" className="btn-secondary focus-ring mt-8 min-h-11">← Zu den Fachbeiträgen</Link>
          </div>
        </section>

        <section className="section-y bg-[#070b13]" aria-label="Beiträge dieser Kategorie">
          <div className="section-container">
            {loading ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3" aria-label="Beiträge werden geladen">{[0, 1, 2].map((item) => <div key={item} className="skeleton aspect-[4/3]" />)}</div>
            ) : filtered.length ? (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((post, index) => {
                  const slug = post.slug || post.id || post._id;
                  return (
                    <article key={slug || `${post.title}-${index}`} className="surface-card surface-card--hover overflow-hidden">
                      {post.image ? <div className="aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-slate-900"><img src={post.image} alt="" loading={index < 2 ? "eager" : "lazy"} decoding="async" className="h-full w-full object-cover" /></div> : null}
                      <div className="p-6">
                        <p className="text-xs font-semibold uppercase tracking-wider text-sky-300">{post.readTime || "Artikel"}</p>
                        <h2 className="mt-4 text-xl font-semibold leading-snug"><Link href={slug ? `/blog/${slug}` : "/blog"} className="focus-ring rounded-sm hover:text-sky-300">{post.title}</Link></h2>
                        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.description || post.subtitle}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : <div className="surface-card px-6 py-14 text-center text-slate-400">Für diese Kategorie sind derzeit keine Beiträge verfügbar.</div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

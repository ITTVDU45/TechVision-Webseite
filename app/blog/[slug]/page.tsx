"use client";
/* eslint-disable @next/next/no-img-element -- Article images can come from the CMS or the local fallback catalogue. */

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { blogPosts as fallbackPosts } from "../../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";
import { formatDate, isoDate } from "@/lib/format";

interface Category { id?: string; name: string }
interface BlogPost {
  _id?: string;
  id?: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description?: string;
  content?: string;
  image?: string;
  date?: string;
  readTime?: string;
  category?: Category[] | Category;
  tags?: string[];
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

function ArticleBody({ content }: { content: string }) {
  return <>{content.split("\n").map((line, index) => {
    const text = line.trim();
    if (!text) return null;
    if (text.startsWith("### ")) return <h3 key={index}>{text.slice(4)}</h3>;
    if (text.startsWith("## ")) return <h2 key={index}>{text.slice(3)}</h2>;
    if (text.startsWith("# ")) return <h2 key={index}>{text.slice(2)}</h2>;
    if (text.startsWith("- ") || text.startsWith("* ")) return <p key={index} className="pl-5 before:mr-3 before:text-sky-300 before:content-['•']">{text.slice(2)}</p>;
    return <p key={index}>{text}</p>;
  })}</>;
}

export default function BlogDetailPage() {
  const slug = useParams<{ slug: string }>().slug;
  const localArticle = fallbackPosts.find((post) => (post.slug || post.id) === slug) || null;
  const [blog, setBlog] = useState<BlogPost | null>(localArticle);
  const [allPosts, setAllPosts] = useState<BlogPost[]>(fallbackPosts);
  const [loading, setLoading] = useState(!localArticle);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    const requestTimeout = window.setTimeout(() => controller.abort(), 1800);
    const fallback = fallbackPosts.find((post) => (post.slug || post.id) === slug) || null;
    setBlog(fallback);
    setLoading(!fallback);
    Promise.all([
      fallback ? Promise.resolve(null) : fetch(`/api/blogs/${encodeURIComponent(slug)}`, { signal: controller.signal }).then((response) => response.ok ? response.json() : null).catch(() => null),
      Promise.race<BlogPost[]>([fetchBlogPosts().catch(() => []), new Promise((resolve) => window.setTimeout(() => resolve([]), 1800))]),
    ]).then(([article, posts]) => {
      if (!active) return;
      const source = Array.isArray(posts) && posts.length ? uniquePosts(posts) : uniquePosts(fallbackPosts);
      setAllPosts(source);
      setBlog(article || source.find((post) => (post.slug || post.id || post._id) === slug) || fallback);
    }).finally(() => { window.clearTimeout(requestTimeout); if (active) setLoading(false); });
    return () => { active = false; window.clearTimeout(requestTimeout); controller.abort(); };
  }, [slug]);

  const related = useMemo(() => {
    if (!blog) return [];
    const currentCategories = new Set(categoriesOf(blog).map((category) => category.name));
    return allPosts.filter((post) => (post.slug || post.id || post._id) !== slug).sort((a, b) => {
      const aRelevant = categoriesOf(a).some((category) => currentCategories.has(category.name)) ? 1 : 0;
      const bRelevant = categoriesOf(b).some((category) => currentCategories.has(category.name)) ? 1 : 0;
      return bRelevant - aRelevant;
    }).slice(0, 3);
  }, [allPosts, blog, slug]);

  return (
    <div className="min-h-screen bg-[#050912] text-white">
      <Header />
      <main>
        {loading ? (
          <section className="section-container flex min-h-[70vh] items-center justify-center pb-20 pt-36" aria-live="polite"><div className="w-full max-w-4xl"><h1 className="sr-only">Artikel wird geladen</h1><div className="skeleton h-6 w-32" /><div className="skeleton mt-6 h-20 w-full" /><div className="skeleton mt-8 aspect-[16/7] w-full" /></div></section>
        ) : blog ? (
          <>
            <article>
              <header className="border-b border-white/[0.07] pb-12 pt-36 sm:pb-16 sm:pt-44">
                <div className="section-container">
                  <Link href="/blog" className="focus-ring text-sm font-semibold text-sky-300 hover:text-sky-200">← Magazin</Link>
                  <div className="mt-8 flex flex-wrap gap-2">{categoriesOf(blog).map((category) => <Link key={category.id || category.name} href={`/blog/category/${category.id || toSlug(category.name)}`} className="eyebrow focus-ring">{category.name}</Link>)}</div>
                  <h1 className="heading-display mt-6 max-w-5xl text-4xl sm:text-6xl lg:text-7xl">{blog.title}</h1>
                  {blog.subtitle ? <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{blog.subtitle}</p> : null}
                  <div className="mt-7 flex flex-wrap gap-4 text-sm text-slate-500">{blog.date ? <time dateTime={isoDate(blog.date)}>{formatDate(blog.date)}</time> : null}<span>{blog.readTime || "Artikel"}</span></div>
                </div>
              </header>

              {blog.image ? <div className="section-container pt-10 sm:pt-14"><div className="aspect-[16/7] overflow-hidden rounded-2xl border border-white/[0.08] bg-slate-900"><img src={blog.image} alt="" className="h-full w-full object-cover" decoding="async" /></div></div> : null}

              <div className="section-container grid gap-12 py-14 lg:grid-cols-[minmax(0,1fr)_18rem] lg:py-20">
                <div className="article-copy max-w-3xl text-base leading-8 text-slate-300 sm:text-lg"><ArticleBody content={blog.content || blog.description || "Weitere Informationen folgen."} /></div>
                <aside className="lg:border-l lg:border-white/[0.08] lg:pl-8"><p className="eyebrow">Projektidee?</p><h2 className="mt-5 text-xl font-semibold">Von der Einordnung zur Umsetzung.</h2><p className="mt-4 text-sm leading-6 text-slate-400">Wir prüfen gemeinsam, welcher Ansatz zu Ihren Abläufen, Daten und Zielen passt.</p><Link href="/contact" className="btn-primary focus-ring mt-7 min-h-11">Gespräch vereinbaren</Link></aside>
              </div>
            </article>

            {related.length ? <section className="section-y-tight border-t border-white/[0.07] bg-[#070b13]" aria-labelledby="related-posts"><div className="section-container"><p className="eyebrow">Weiterlesen</p><h2 id="related-posts" className="heading-display mt-5 text-3xl sm:text-4xl">Weitere Einordnungen</h2><div className="mt-8 grid gap-4 md:grid-cols-3">{related.map((post) => { const relatedSlug = post.slug || post.id || post._id; return <article key={relatedSlug || post.title} className="surface-card surface-card--hover p-6"><p className="text-xs font-semibold uppercase tracking-wider text-sky-300">{categoriesOf(post)[0]?.name || "Magazin"}</p><h3 className="mt-4 text-lg font-semibold"><Link href={relatedSlug ? `/blog/${relatedSlug}` : "/blog"} className="focus-ring rounded-sm hover:text-sky-300">{post.title}</Link></h3><p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.description || post.subtitle}</p></article>; })}</div></div></section> : null}
          </>
        ) : (
          <section className="section-container flex min-h-[70vh] flex-col items-start justify-center pb-20 pt-36"><p className="eyebrow">Magazin</p><h1 className="heading-display mt-6 text-4xl sm:text-6xl">Artikel nicht gefunden.</h1><p className="mt-5 text-slate-400">Dieser Beitrag ist nicht verfügbar oder wurde verschoben.</p><Link href="/blog" className="btn-secondary focus-ring mt-8 min-h-11">Zur Magazinübersicht</Link></section>
        )}
      </main>
      <Footer />
    </div>
  );
}

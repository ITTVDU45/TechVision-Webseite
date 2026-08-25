"use client";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { blogPosts as staticBlogPosts, BlogPost } from "../data/blogPosts";
import { fetchBlogPosts } from "@/lib/api";
import { DEFAULT_BLOG_COVER_IMAGE, resolveBlogImageUrl } from "@/lib/resolveBlogImageUrl";
import { formatDate, isoDate } from "@/lib/format";

function BlogCardSkeleton() {
  return (
    <div className="skeleton flex h-full min-h-[360px] flex-col overflow-hidden" aria-hidden>
      <div className="h-44 w-full bg-white/5" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="h-3 w-24 rounded bg-white/10" />
        <div className="h-5 w-5/6 rounded bg-white/10" />
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-4/5 rounded bg-white/10" />
      </div>
    </div>
  );
}

function BlogCard({ post, priority = false }: { post: BlogPost; priority?: boolean }) {
  const href = `/blog/${post.slug ?? post.id}`;
  const src = resolveBlogImageUrl(post.image) || DEFAULT_BLOG_COVER_IMAGE;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220] transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20">
      <Link
        href={href}
        className="focus-ring block h-full"
        aria-label={post.title}
      >
        <div className="relative h-44 w-full overflow-hidden">
          <Image
            src={src}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={priority}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a1220] via-[#0a1220]/25 to-transparent" aria-hidden />
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/55 px-2.5 py-1 text-[11px] font-medium text-sky-300 backdrop-blur">
            <span aria-hidden>{post.category.icon}</span>
            {post.category.name}
          </div>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="mb-2 flex items-center gap-2 text-[11px] uppercase tracking-widest text-slate-500">
            <time dateTime={isoDate(post.date)}>{formatDate(post.date)}</time>
            <span className="h-1 w-1 rounded-full bg-slate-500/60" aria-hidden />
            <span>{post.readTime}</span>
          </div>
          <h3 className="mb-2 line-clamp-2 text-lg font-semibold text-white transition-colors group-hover:text-sky-200">
            {post.title}
          </h3>
          <p className="mb-4 line-clamp-3 flex-1 text-sm leading-relaxed text-slate-400">
            {post.description}
          </p>
          <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-300">
            Artikel lesen
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </span>
        </div>
      </Link>
    </article>
  );
}

const TopThemes = () => {
  const [posts, setPosts] = useState<BlogPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadBlogs = async () => {
      try {
        const apiBlogs = await fetchBlogPosts();
        if (cancelled) return;

        if (apiBlogs && Array.isArray(apiBlogs) && apiBlogs.length > 0) {
          const published = apiBlogs.filter((b: { published?: boolean }) => b.published !== false);

          let homeBlogs = published.filter((b: { page?: unknown }) => {
            const pages = Array.isArray(b.page) ? b.page : b.page ? [b.page] : [];
            return pages.includes("home");
          });

          if (homeBlogs.length === 0) homeBlogs = published;

          const formatted = homeBlogs
            .sort((a: { date?: string; createdAt?: string }, b: { date?: string; createdAt?: string }) => {
              const dateA = new Date(a.date || a.createdAt || 0).getTime();
              const dateB = new Date(b.date || b.createdAt || 0).getTime();
              return dateB - dateA;
            })
            .slice(0, 6)
            .map((b: Record<string, unknown>) => {
              const rawCategory = b.category;
              let category: { name: string; icon: string };
              if (Array.isArray(rawCategory) && rawCategory.length > 0 && typeof rawCategory[0] === "object" && rawCategory[0] !== null) {
                const c = rawCategory[0] as { name?: string; icon?: string };
                category = { name: c.name ?? "Allgemein", icon: c.icon ?? "📝" };
              } else if (rawCategory && typeof rawCategory === "object" && !Array.isArray(rawCategory)) {
                const c = rawCategory as { name?: string; icon?: string };
                category = { name: c.name ?? "Allgemein", icon: c.icon ?? "📝" };
              } else {
                category = { name: "Allgemein", icon: "📝" };
              }

              const id = String(b.id || b._id || b.slug || "");
              const slug = typeof b.slug === "string" ? b.slug : id;

              const rawDate = b.date ?? b.createdAt;
              let dateStr: string;
              if (rawDate instanceof Date) {
                dateStr = rawDate.toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
              } else if (typeof rawDate === "string" || typeof rawDate === "number") {
                dateStr = new Date(rawDate).toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
              } else {
                dateStr = new Date().toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" });
              }

              return {
                id,
                slug,
                title: String(b.title || ""),
                subtitle: String(b.subtitle || ""),
                description: String(b.description || (typeof b.content === "string" ? b.content.substring(0, 150) : "")),
                image: resolveBlogImageUrl(typeof b.image === "string" ? b.image : ""),
                date: dateStr,
                readTime: String(b.readTime || "5 min"),
                category,
              } as BlogPost;
            });

          setPosts(formatted);
        } else {
          setPosts(staticBlogPosts.slice(0, 6));
        }
      } catch (error) {
        console.error("TopThemes: Error loading blog posts:", error);
        setPosts(staticBlogPosts.slice(0, 6));
      }
    };

    loadBlogs();
    return () => {
      cancelled = true;
    };
  }, []);

  // Deduplicate defensively (Datenbank kann versehentlich Doppler enthalten)
  const uniquePosts = useMemo(() => {
    if (!posts) return null;
    const seen = new Set<string>();
    return posts.filter((p) => {
      const k = (p.slug || p.id || p.title || "").trim();
      if (!k || seen.has(k)) return false;
      seen.add(k);
      return true;
    });
  }, [posts]);

  return (
    <section id="top-themes" className="section-y relative overflow-hidden bg-[#040810]">
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col gap-4 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="eyebrow"
            >
              Magazin
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.05 }}
              className="heading-display mt-4 text-3xl md:text-5xl"
            >
              Aktuelle Einblicke
            </motion.h2>
            <p className="mt-4 max-w-xl text-base text-slate-400">
              Kurze, konkrete Beiträge zu KI, Automatisierung und Softwareentwicklung –
              geschrieben aus Projektpraxis, nicht aus Trend‑Presse.
            </p>
          </div>
          <Link href="/blog" className="btn-secondary focus-ring shrink-0">
            Zum Magazin
          </Link>
        </div>

        {!uniquePosts ? (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, i) => (
              <BlogCardSkeleton key={i} />
            ))}
          </div>
        ) : uniquePosts.length === 0 ? (
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center text-slate-400">
            Aktuell sind keine Beiträge veröffentlicht.
          </div>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {uniquePosts.slice(0, 6).map((post, i) => (
              <li key={post.id || post.slug || i}>
                <BlogCard post={post} priority={i < 2} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};

export default TopThemes;

"use client";
import React, { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { BlogPost } from "../data/blogPosts";
import { DEFAULT_BLOG_COVER_IMAGE, resolveBlogImageUrl } from "@/lib/resolveBlogImageUrl";

interface TopicCardProps {
  post: BlogPost;
  index: number;
}

export default function TopicCard({ post, index }: TopicCardProps): React.JSX.Element {
  const [imageSrc, setImageSrc] = useState(() => resolveBlogImageUrl(post.image));

  useEffect(() => {
    setImageSrc(resolveBlogImageUrl(post.image));
  }, [post.image]);

  const onImageError = useCallback(() => {
    setImageSrc(DEFAULT_BLOG_COVER_IMAGE);
  }, []);

  const href = `/blog/${post.slug ?? post.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ delay: index * 0.06, duration: 0.45 }}
      className="h-full px-2 py-4 sm:px-3 sm:py-6 md:px-4"
    >
      <article className="group relative flex h-full min-h-[28rem] flex-col">
        <div className="pointer-events-none absolute -inset-1 rounded-[1.35rem] bg-gradient-to-r from-blue-600/25 to-indigo-600/25 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-neutral-950/80 shadow-2xl shadow-black/40 backdrop-blur-sm transition-colors duration-300 group-hover:border-white/20">
          <div className="absolute left-5 top-5 z-20">
            <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-3 py-1.5 backdrop-blur-md">
              <span className="text-base" aria-hidden>
                {post.category.icon}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-blue-400">{post.category.name}</span>
            </div>
          </div>

          <div className="relative isolate h-56 shrink-0 overflow-hidden bg-gradient-to-br from-neutral-900 to-neutral-950 sm:h-60">
            <img
              src={imageSrc}
              alt={post.title}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading={index < 2 ? "eager" : "lazy"}
              decoding="async"
              onError={onImageError}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-neutral-950 to-transparent" />
          </div>

          <div className="flex flex-1 flex-col p-6 sm:p-8">
            <div className="mb-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium uppercase tracking-wider text-neutral-500">
              <span>{post.date}</span>
              <span className="hidden h-1 w-1 rounded-full bg-blue-500/60 sm:inline" aria-hidden />
              <span>{post.readTime} Lesezeit</span>
            </div>

            <h3 className="mb-3 line-clamp-2 text-xl font-bold leading-snug text-white sm:text-2xl">
              <Link
                href={href}
                className="transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                {post.title}
              </Link>
            </h3>

            <p className="mb-6 line-clamp-3 flex-1 text-sm leading-relaxed text-neutral-400">{post.description}</p>

            <div className="mt-auto">
              <Link
                href={href}
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-blue-400 transition-colors hover:text-blue-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-950"
              >
                Artikel lesen
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>

          <div className="h-1 w-0 bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-700 group-hover:w-full" aria-hidden />
        </div>
      </article>
    </motion.div>
  );
}

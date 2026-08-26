import Link from "next/link";
import type { BlogPost } from "@/lib/types/content";

// Beibehaltener Name fuer die bestehenden Importstellen.
export type ServiceBlogPost = BlogPost;

interface BlogSectionProps {
  title?: string;
  subtitle?: string;
  blogPosts?: BlogPost[];
}

export default function BlogSection({
  title = "Einblicke aus der Praxis",
  subtitle = "Aktuelle Entwicklungen, technische Einordnungen und konkrete Erfahrungen aus digitalen Projekten.",
  blogPosts = [],
}: BlogSectionProps) {
  const uniquePosts = Array.from(new Map(blogPosts.map((post) => [post.link || post.title, post])).values()).slice(0, 3);

  return (
    <section className="section-y hairline-top bg-[#050912]" aria-labelledby="service-insights-heading">
      <div className="section-container">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="eyebrow">Fachbeiträge</p>
            <h2 id="service-insights-heading" className="heading-display mt-5 text-3xl sm:text-5xl">{title}</h2>
            <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">{subtitle}</p>
          </div>
          <Link href="/blog" className="btn-secondary focus-ring min-h-11 shrink-0 text-sm">Alle Fachbeiträge</Link>
        </div>

        {uniquePosts.length ? (
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {uniquePosts.map((post, index) => (
              <article key={post.link || `${post.title}-${index}`} className="surface-card surface-card--hover overflow-hidden">
                {post.image ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-white/[0.06] bg-slate-900">
                    {/* CMS URLs can originate from the configured object storage host. */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={post.image} alt="" loading="lazy" decoding="async" className="h-full w-full object-cover transition-transform duration-500 motion-safe:hover:scale-[1.03]" />
                  </div>
                ) : null}
                <div className="p-6">
                  <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
                    {post.category?.name ? <span className="font-semibold uppercase tracking-wider text-sky-300">{post.category.name}</span> : null}
                    
                  </div>
                  <h3 className="mt-4 text-xl font-semibold leading-snug text-white">
                    <Link href={post.link || "/blog"} className="focus-ring rounded-sm transition-colors hover:text-sky-300">{post.title}</Link>
                  </h3>
                  {post.description ? <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-400">{post.description}</p> : null}
                  <Link href={post.link || "/blog"} className="focus-ring mt-6 inline-flex rounded-sm text-sm font-semibold text-sky-300 hover:text-sky-200">Weiterlesen <span className="ml-2" aria-hidden="true">→</span></Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="surface-card mt-12 px-6 py-10 text-center">
            <p className="text-sm text-slate-400">Weitere Einordnungen finden Sie in den Fachbeiträgen.</p>
            <Link href="/blog" className="focus-ring mt-4 inline-flex rounded-sm text-sm font-semibold text-sky-300">Zu den Fachbeiträgen <span className="ml-2" aria-hidden="true">→</span></Link>
          </div>
        )}
      </div>
    </section>
  );
}

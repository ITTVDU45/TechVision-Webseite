import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function HostingInsights({ posts }: { posts: BlogPost[] }) {
  const mapped = posts.map((post) => ({ ...post, excerpt: post.description, category: post.category.name, link: post.link || `/blog/${post.id || ""}` }));
  return <BlogSection title="Hosting und stabiler Betrieb" subtitle="Einblicke zu Performance, Sicherheit und zuverlässiger Infrastruktur." blogPosts={mapped} />;
}

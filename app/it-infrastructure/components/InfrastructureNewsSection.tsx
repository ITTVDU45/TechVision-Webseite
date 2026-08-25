import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function InfrastructureNewsSection({ posts }: { posts: BlogPost[] }) {
  const mapped = posts.map((post) => ({ ...post, excerpt: post.description, category: post.category.name, link: post.link || `/blog/${post.id || ""}` }));
  return <BlogSection title="IT-Infrastruktur aktuell" subtitle="Orientierung zu Betrieb, Sicherheit und zukunftsfähigen IT-Grundlagen." blogPosts={mapped} />;
}

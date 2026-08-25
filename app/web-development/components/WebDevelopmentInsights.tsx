import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function WebDevelopmentInsights({ posts }: { posts: BlogPost[] }) {
  const mapped = posts.map((post) => ({ ...post, excerpt: post.description, category: post.category.name, link: post.link || `/blog/${post.id || ""}` }));
  return <BlogSection title="Webentwicklung in der Praxis" subtitle="Performance, Accessibility und wartbare Frontend-Architektur." blogPosts={mapped} />;
}

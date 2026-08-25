import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function WorkflowInsights({ posts }: { posts: BlogPost[] }) {
  const mapped = posts.map((post) => ({ ...post, excerpt: post.description, category: post.category.name, link: post.link || `/blog/${post.id || ""}` }));
  return <BlogSection title="Automatisierung in der Praxis" subtitle="Einsatzfelder, Integrationsmuster und Erfahrungen aus automatisierten Geschäftsprozessen." blogPosts={mapped} />;
}

import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function ToolsNewsSection({ posts }: { posts: BlogPost[] }) {
  const mapped = posts.map((post) => ({ ...post, excerpt: post.description, category: post.category.name }));
  return <BlogSection title="Tools, Agenten und Automatisierung" subtitle="Praxisnahe Einordnungen zu Werkzeugauswahl, Integration und Betrieb." blogPosts={mapped} />;
}

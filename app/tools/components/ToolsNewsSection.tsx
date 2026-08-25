import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function ToolsNewsSection({ posts }: { posts: BlogPost[] }) {
  return <BlogSection title="Tools, Agenten und Automatisierung" subtitle="Praxisnahe Einordnungen zu Werkzeugauswahl, Integration und Betrieb." blogPosts={posts} />;
}

import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function WebDevelopmentInsights({ posts }: { posts: BlogPost[] }) {
  return <BlogSection title="Webentwicklung in der Praxis" subtitle="Performance, Accessibility und wartbare Frontend-Architektur." blogPosts={posts} />;
}

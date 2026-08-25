import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function HostingInsights({ posts }: { posts: BlogPost[] }) {
  return <BlogSection title="Hosting und stabiler Betrieb" subtitle="Einblicke zu Performance, Sicherheit und zuverlässiger Infrastruktur." blogPosts={posts} />;
}

import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function InfrastructureNewsSection({ posts }: { posts: BlogPost[] }) {
  return <BlogSection title="IT-Infrastruktur aktuell" subtitle="Orientierung zu Betrieb, Sicherheit und zukunftsfähigen IT-Grundlagen." blogPosts={posts} />;
}

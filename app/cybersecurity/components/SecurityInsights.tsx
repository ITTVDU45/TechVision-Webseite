import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

interface Props { title?: string; description?: string; blogPosts?: BlogPost[] }
export default function SecurityInsights({ title = "Security Insights", description = "Einordnungen zu aktuellen Risiken und wirksamen Schutzmaßnahmen.", blogPosts = [] }: Props) {
  return <BlogSection title={title} subtitle={description} blogPosts={blogPosts} />;
}

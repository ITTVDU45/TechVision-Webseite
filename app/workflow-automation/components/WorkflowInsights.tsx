import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

export default function WorkflowInsights({ posts }: { posts: BlogPost[] }) {
  return <BlogSection title="Automatisierung in der Praxis" subtitle="Einsatzfelder, Integrationsmuster und Erfahrungen aus automatisierten Geschäftsprozessen." blogPosts={posts} />;
}

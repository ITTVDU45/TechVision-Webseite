import BlogSection from "@/app/marketing/BlogSection";
import { BlogPost } from "./types";

interface Props { title?: string; description?: string; blogPosts?: BlogPost[] }
export default function NewsInsights({ title = "Einblicke aus der Softwareentwicklung", description = "Architektur, Produktentwicklung und Erfahrungen aus anspruchsvollen Softwareprojekten.", blogPosts = [] }: Props) {
  return <BlogSection title={title} subtitle={description} blogPosts={blogPosts} />;
}

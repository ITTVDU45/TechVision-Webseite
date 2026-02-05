"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CTA from "./CTA";
import {
  HeroSection,
  SuccessfulProjects,
  ProcessSection,
  NewsInsights,
  FAQSection,
  projectsData,
  processStepsData,
  newsBlogPosts,
  faqsData,
} from "../software-development/components";
import { usePageContent } from "@/lib/hooks/usePageContent";

export default function SoftwareDevelopment(): React.ReactNode {
  const { faqs, blogs } = usePageContent({
    page: 'software-development',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = blogs.length > 0 ? blogs.map((b: any) => {
    // Normalisiere category zu String
    let categoryString = 'Allgemein';
    if (Array.isArray(b.category) && b.category.length > 0) {
      categoryString = b.category[0].name || b.category[0].id || 'Allgemein';
    } else if (b.category?.name) {
      categoryString = b.category.name;
    } else if (typeof b.category === 'string') {
      categoryString = b.category;
    }
    
    return {
      title: b.title,
      subtitle: b.subtitle,
      excerpt: b.excerpt || b.description || b.content?.substring(0, 150),
      image: b.image,
      link: b.slug ? `/blog/${b.slug}` : (b.id ? `/blog/${b.id}` : b.link || '#'),
      category: categoryString,
      date: b.date || new Date(b.createdAt || Date.now()).toLocaleDateString('de-DE'),
    };
  }) : newsBlogPosts;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <HeroSection />

      <SuccessfulProjects projects={projectsData} />

      <ProcessSection steps={processStepsData} />

      <NewsInsights blogPosts={displayBlogs} />

      <FAQSection faqs={displayFAQs} />

      <CTA />

      <Footer />
    </div>
  );
}

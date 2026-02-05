"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CTA from "./CTA";
import BlogSection from "../marketing/BlogSection";
import {
  HeroSection,
  WhatIsKITransformation,
  WhyIntegrateAI,
  ToolsAndTechnologies,
  ImplementationProcess,
  FAQSection,
  whatIsFeatures,
  whyIntegrateFeatures,
  processSteps,
  toolsData,
  faqsData,
} from "../ki-transformation/components";
import { usePageContent } from "@/lib/hooks/usePageContent";

export default function KITransformation(): React.ReactNode {
  const { faqs, blogs, loading } = usePageContent({
    page: 'ki-transformation',
    loadFAQs: true,
    loadBlogs: true,
  });

  // Verwende API-Daten, falls vorhanden, sonst Fallback auf statische Daten
  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  
  // Formatiere Blogs für BlogSection
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
      title: b.title || '',
      subtitle: b.subtitle || '',
      excerpt: b.description || b.content?.substring(0, 200) || '',
      image: b.image || 'https://via.placeholder.com/800x400/1a1a1a/ffffff?text=Blog+Image',
      link: b.slug ? `/blog/${b.slug}` : (b.id ? `/blog/${b.id}` : '#'),
      category: categoryString,
      date: b.date || new Date(b.createdAt || Date.now()).toLocaleDateString('de-DE', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      }),
    };
  }) : [];

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <HeroSection />

      <WhatIsKITransformation features={whatIsFeatures} />

      <WhyIntegrateAI features={whyIntegrateFeatures} />

      <ToolsAndTechnologies tools={toolsData} />

      <ImplementationProcess steps={processSteps} />

      <BlogSection 
        title="KI-Insights & Trends"
        subtitle="Erfahren Sie mehr über aktuelle Entwicklungen in der KI-Transformation und entdecken Sie Best Practices für Ihr Unternehmen."
        blogPosts={displayBlogs}
      />

      <FAQSection faqs={displayFAQs} />

      <CTA />

      <Footer />
    </div>
  );
}

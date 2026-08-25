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
import { toBlogPosts } from "@/lib/content";

export default function KITransformation() {
  const { faqs, blogs } = usePageContent({
    page: 'ki-transformation',
    loadFAQs: true,
    loadBlogs: true,
  });

  // Verwende API-Daten, falls vorhanden, sonst Fallback auf statische Daten
  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  
  // Formatiere Blogs für BlogSection
  const displayBlogs = toBlogPosts(blogs, { name: "KI & Innovation" }, []);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <main>

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

      </main>

      <Footer />
    </div>
  );
}

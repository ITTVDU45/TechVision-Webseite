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
import { toBlogPosts } from "@/lib/content";
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function SoftwareDevelopment() {
  const { faqs, blogs } = usePageContent({
    page: 'software-development',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = toBlogPosts(blogs, { name: "Entwicklung" }, newsBlogPosts);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <main>

      <HeroSection />
      <ServiceProof service={serviceById["software-development"]} reference={{ title: "CRAFTGO Mitarbeiter-App", href: "/case-studies/microsoft-dynamics-integration" }} />

      <SuccessfulProjects projects={projectsData} />

      <ProcessSection steps={processStepsData} />

      <NewsInsights blogPosts={displayBlogs} />

      <FAQSection faqs={displayFAQs} />

      <CTA />

      </main>

      <Footer />
    </div>
  );
}

"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CTA from "./CTA";
import {
  HeroSection,
  ServicesSection,
  WhyCybersecuritySection,
  CaseStudiesSection,
  BenefitsSection,
  ProcessSection,
  SecurityInsights,
  FAQSection,
  servicesData,
  statsData,
  threatsData,
  caseStudiesData,
  benefitsData,
  processStepsData,
  securityInsightsPosts,
  faqsData,
} from "../cybersecurity/components";
import { usePageContent } from "@/lib/hooks/usePageContent";

export default function CyberSecurity(): React.ReactNode {
  const { faqs, services, blogs, caseStudies } = usePageContent({
    page: 'cybersecurity',
    loadFAQs: true,
    loadServices: true,
    loadBlogs: true,
    loadCaseStudies: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayServices = services.length > 0 ? services.map((s: any) => ({
    title: s.name || s.title,
    description: s.description,
    icon: s.icon,
    color: s.color || 'from-gray-800/50 to-gray-900/50',
    iconColor: s.iconColor || 'text-blue-500',
  })) : servicesData;
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
  }) : securityInsightsPosts;

  // Transformiere Case Studies für CyberSecurity-Format (mit company, results)
  const displayCaseStudies = caseStudies.length > 0 ? caseStudies
    .filter((cs: any) => {
      const categories = Array.isArray(cs.category) ? cs.category : [cs.category];
      const pages = Array.isArray(cs.page) ? cs.page : [cs.page];

      const categoryMatch = categories.some((cat: any) =>
        typeof cat === 'string' && (cat.toLowerCase() === 'cybersecurity' || cat.toLowerCase() === 'beratung')
      );

      const pageMatch = pages.some((p: any) =>
        typeof p === 'string' && p.toLowerCase() === 'cybersecurity'
      );

      return categoryMatch || pageMatch;
    })
    .map((cs: any) => ({
      company: cs.company || cs.title || 'Unternehmen',
      title: cs.subtitle || cs.description?.substring(0, 100) || '',
      description: cs.description || '',
      image: cs.image,
      link: cs.slug ? `/case-studies/${cs.slug}` : cs.link || '#',
      results: cs.results || (cs.stats ? cs.stats.map((s: any) => `${s.label || s.name}: ${s.value || s.amount}`) : []),
    })) : caseStudiesData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <HeroSection />

      <ServicesSection services={displayServices} />

      <WhyCybersecuritySection stats={statsData} threats={threatsData} />

      <CaseStudiesSection caseStudies={displayCaseStudies} />

      <BenefitsSection benefits={benefitsData} />

      <ProcessSection steps={processStepsData} />

      <SecurityInsights blogPosts={displayBlogs} />

      <FAQSection faqs={displayFAQs} />

      <CTA />

      <Footer />
    </div>
  );
}

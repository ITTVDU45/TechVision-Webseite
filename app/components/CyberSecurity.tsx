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
  FAQSection,
  servicesData,
  statsData,
  threatsData,
  caseStudiesData,
  benefitsData,
  processStepsData,
  faqsData,
} from "../cybersecurity/components";
import { usePageContent } from "@/lib/hooks/usePageContent";
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function CyberSecurity() {
  const { faqs, services, caseStudies } = usePageContent({
    page: 'cybersecurity',
    loadFAQs: true,
    loadServices: true,
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

      <main>

      <HeroSection />
      <ServiceProof service={serviceById["cybersecurity"]} reference={{ title: "Cybersecurityberatung", href: "/case-studies/cybersecurityberatung" }} />

      <ServicesSection services={displayServices} />

      <WhyCybersecuritySection stats={statsData} threats={threatsData} />

      <CaseStudiesSection caseStudies={displayCaseStudies} />

      <BenefitsSection benefits={benefitsData} />

      <ProcessSection steps={processStepsData} />


      <FAQSection faqs={displayFAQs} />

      <CTA />

      </main>

      <Footer />
    </div>
  );
}

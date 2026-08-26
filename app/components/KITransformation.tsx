"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CTA from "./CTA";
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
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function KITransformation() {
  const { faqs } = usePageContent({
    page: 'ki-transformation',
    loadFAQs: true,
  });

  // Verwende API-Daten, falls vorhanden, sonst Fallback auf statische Daten
  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  
  // Formatiere Blogs für BlogSection

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <main>

      <HeroSection />
      <ServiceProof service={serviceById["ki-transformation"]} reference={{ title: "KI Transformation", href: "/case-studies/ki-transformation" }} />

      <WhatIsKITransformation features={whatIsFeatures} />

      <WhyIntegrateAI features={whyIntegrateFeatures} />

      <ToolsAndTechnologies tools={toolsData} />

      <ImplementationProcess steps={processSteps} />


      <FAQSection faqs={displayFAQs} />

      <CTA />

      </main>

      <Footer />
    </div>
  );
}

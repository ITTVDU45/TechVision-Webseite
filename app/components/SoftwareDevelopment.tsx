"use client";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import CTA from "./CTA";
import {
  HeroSection,
  SuccessfulProjects,
  ProcessSection,
  FAQSection,
  projectsData,
  processStepsData,
  faqsData,
} from "../software-development/components";
import { usePageContent } from "@/lib/hooks/usePageContent";
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function SoftwareDevelopment() {
  const { faqs } = usePageContent({
    page: 'software-development',
    loadFAQs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />

      <main>

      <HeroSection />
      <ServiceProof service={serviceById["software-development"]} reference={{ title: "CRAFTGO Mitarbeiter-App", href: "/case-studies/microsoft-dynamics-integration" }} />

      <SuccessfulProjects projects={projectsData} />

      <ProcessSection steps={processStepsData} />


      <FAQSection faqs={displayFAQs} />

      <CTA />

      </main>

      <Footer />
    </div>
  );
}

"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';
import {
  HeroSection,
  OpenSourceToolsSection,
  KIAgentsSection,
  IntegrationSection,
  FAQSection,
  openSourceToolsData,
  kiAgentsData,
  integrationCategoriesData,
  integrationFeaturesData,
  faqsData,
} from '../tools/components';
import { usePageContent } from '@/lib/hooks/usePageContent';
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function Tools() {
  const { faqs } = usePageContent({
    page: 'tools',
    loadFAQs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <main>
      <HeroSection />
      <ServiceProof service={serviceById["tools"]} reference={{ title: "KI-gestützter Personal Assistant", href: "/case-studies/personal-assistant" }} />
      <OpenSourceToolsSection tools={openSourceToolsData} />
      <KIAgentsSection agents={kiAgentsData} />
      <IntegrationSection
        categories={integrationCategoriesData}
        features={integrationFeaturesData}
      />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}

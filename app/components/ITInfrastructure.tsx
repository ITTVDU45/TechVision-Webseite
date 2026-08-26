"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';
import {
  HeroSection,
  InfrastructureSolutionsSection,
  ITInfrastructurePlanningSection,
  BenefitsSection,
  FAQSection,
  infrastructureSolutionsData,
  planningFeaturesData,
  benefitsData,
  faqsData,
} from '../it-infrastructure/components';
import { usePageContent } from '@/lib/hooks/usePageContent';
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function ITInfrastructure() {
  const { faqs } = usePageContent({
    page: 'it-infrastructure',
    loadFAQs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <main>
      <HeroSection />
      <ServiceProof service={serviceById["it-infrastructure"]} />
      <InfrastructureSolutionsSection solutions={infrastructureSolutionsData} />
      <ITInfrastructurePlanningSection features={planningFeaturesData} />
      <BenefitsSection benefits={benefitsData} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}

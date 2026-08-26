"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';
import {
  HeroSection,
  KIAgentsSection,
  AutomationBenefitsSection,
  UseCasesSection,
  IntegrationSection,
  FAQSection,
  kiAgentFeaturesData,
  automationBenefitsData,
  useCasesData,
  integrationCategoriesData,
  faqsData,
} from '../workflow-automation/components';
import { usePageContent } from '@/lib/hooks/usePageContent';
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function WorkflowAutomation() {
  const { faqs } = usePageContent({
    page: 'workflow-automation',
    loadFAQs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <main>
      <HeroSection />
      <ServiceProof service={serviceById["workflow-automation"]} />
      <KIAgentsSection features={kiAgentFeaturesData} />
      <AutomationBenefitsSection benefits={automationBenefitsData} />
      <UseCasesSection useCases={useCasesData} />
      <IntegrationSection categories={integrationCategoriesData} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}

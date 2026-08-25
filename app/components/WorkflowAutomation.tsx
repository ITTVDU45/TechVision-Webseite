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
  WorkflowInsights,
  FAQSection,
  kiAgentFeaturesData,
  automationBenefitsData,
  useCasesData,
  integrationCategoriesData,
  workflowInsightsData,
  faqsData,
} from '../workflow-automation/components';
import { usePageContent } from '@/lib/hooks/usePageContent';
import { toBlogPosts } from "@/lib/content";
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function WorkflowAutomation() {
  const { faqs, blogs } = usePageContent({
    page: 'workflow-automation',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = toBlogPosts(blogs, { name: "Automatisierung", icon: "\u26A1" }, workflowInsightsData);

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
      <WorkflowInsights posts={displayBlogs} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}

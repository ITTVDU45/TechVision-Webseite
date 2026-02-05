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

export default function WorkflowAutomation(): React.ReactNode {
  const { faqs, blogs } = usePageContent({
    page: 'workflow-automation',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = blogs.length > 0 ? blogs.map((b: any) => ({
    title: b.title,
    subtitle: b.subtitle,
    description: b.excerpt || b.description || b.content?.substring(0, 150) || '',
    image: b.image,
    link: b.slug ? `/blog/${b.slug}` : b.link || '#',
    category: typeof b.category === 'object' && b.category !== null ? b.category : { name: b.category || 'Automatisierung', icon: '⚡' },
    date: b.date || new Date(b.createdAt).toLocaleDateString('de-DE'),
  })) : workflowInsightsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <HeroSection />
      <KIAgentsSection features={kiAgentFeaturesData} />
      <AutomationBenefitsSection benefits={automationBenefitsData} />
      <UseCasesSection useCases={useCasesData} />
      <IntegrationSection categories={integrationCategoriesData} />
      <WorkflowInsights posts={displayBlogs} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      <Footer />
    </div>
  );
}

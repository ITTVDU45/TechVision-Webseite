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
  ToolsNewsSection,
  FAQSection,
  openSourceToolsData,
  kiAgentsData,
  integrationCategoriesData,
  integrationFeaturesData,
  toolsNewsData,
  faqsData,
} from '../tools/components';
import { usePageContent } from '@/lib/hooks/usePageContent';
import { toBlogPosts } from "@/lib/content";

export default function Tools() {
  const { faqs, blogs } = usePageContent({
    page: 'tools',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = toBlogPosts(blogs, { name: "Tools", icon: "\u{1F6E0}\uFE0F" }, toolsNewsData);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <main>
      <HeroSection />
      <OpenSourceToolsSection tools={openSourceToolsData} />
      <KIAgentsSection agents={kiAgentsData} />
      <IntegrationSection
        categories={integrationCategoriesData}
        features={integrationFeaturesData}
      />
      <ToolsNewsSection posts={displayBlogs} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      </main>
      <Footer />
    </div>
  );
}

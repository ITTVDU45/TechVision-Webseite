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

export default function Tools(): React.ReactNode {
  const { faqs, blogs } = usePageContent({
    page: 'tools',
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
    category: typeof b.category === 'object' && b.category !== null ? b.category : { name: b.category || 'Tools', icon: '🛠️' },
    date: b.date || new Date(b.createdAt).toLocaleDateString('de-DE'),
  })) : toolsNewsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
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
      <Footer />
    </div>
  );
}

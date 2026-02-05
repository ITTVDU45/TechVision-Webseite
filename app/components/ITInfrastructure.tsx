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
  InfrastructureNewsSection,
  FAQSection,
  infrastructureSolutionsData,
  planningFeaturesData,
  benefitsData,
  infrastructureNewsData,
  faqsData,
} from '../it-infrastructure/components';
import { usePageContent } from '@/lib/hooks/usePageContent';

export default function ITInfrastructure(): React.ReactNode {
  const { faqs, blogs } = usePageContent({
    page: 'it-infrastructure',
    loadFAQs: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayBlogs = blogs.length > 0 ? blogs.map((b: any) => ({
    id: b._id || b.id,
    title: b.title,
    description: b.excerpt || b.description || b.content?.substring(0, 150) || '',
    image: b.image,
    link: b.slug ? `/blog/${b.slug}` : b.link || '#',
    category: typeof b.category === 'object' && b.category !== null ? b.category : { name: b.category || 'Infrastruktur', icon: '🖥️' },
    date: b.date || new Date(b.createdAt).toLocaleDateString('de-DE'),
  })) : infrastructureNewsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <HeroSection />
      <InfrastructureSolutionsSection solutions={infrastructureSolutionsData} />
      <ITInfrastructurePlanningSection features={planningFeaturesData} />
      <BenefitsSection benefits={benefitsData} />
      <InfrastructureNewsSection posts={displayBlogs} />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      <Footer />
    </div>
  );
}

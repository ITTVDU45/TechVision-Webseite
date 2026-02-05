"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';
import TopThemes from './TopThemes';
import {
  HeroSection,
  PricingSection,
  ExpertiseSection,
  WhyDifferentSection,
  AdditionalServicesSection,
  HostingInsights,
  FAQSection,
  pricingPlansData,
  expertiseFeaturesData,
  whyDifferentFeaturesData,
  oneClickAppsData,
  specializedHostingData,
  additionalServicesData,
  hostingInsightsData,
  faqsData,
} from '../webhosting/components';
import { usePageContent } from '@/lib/hooks/usePageContent';

export default function WebHosting(): React.ReactNode {
  const { faqs, pricing, blogs } = usePageContent({
    page: 'webhosting',
    loadFAQs: true,
    loadPricing: true,
    loadBlogs: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayPricing = pricing.length > 0 ? pricing.map((p: any) => ({
    name: p.name,
    originalPrice: p.originalPrice,
    currentPrice: p.currentPrice,
    features: p.features || [],
    isPopular: p.isPopular,
    link: p.link || '#',
  })) : pricingPlansData;
  const displayBlogs = blogs.length > 0 ? blogs.map((b: any) => ({
    title: b.title,
    subtitle: b.subtitle,
    description: b.excerpt || b.description || b.content?.substring(0, 150) || '',
    image: b.image,
    link: b.slug ? `/blog/${b.slug}` : b.link || '#',
    category: typeof b.category === 'object' && b.category !== null ? b.category : { name: b.category || 'Hosting', icon: '☁️' },
    date: b.date || new Date(b.createdAt).toLocaleDateString('de-DE'),
  })) : hostingInsightsData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <HeroSection />
      <PricingSection plans={displayPricing} />
      <ExpertiseSection features={expertiseFeaturesData} />
      <WhyDifferentSection
        features={whyDifferentFeaturesData}
        oneClickApps={oneClickAppsData}
        specializedHosting={specializedHostingData}
      />
      <AdditionalServicesSection services={additionalServicesData} />
      <HostingInsights posts={displayBlogs} />
      <TopThemes />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      <Footer />
    </div>
  );
}

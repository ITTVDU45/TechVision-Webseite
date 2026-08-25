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
import { toBlogPosts } from "@/lib/content";
import ServiceProof from "@/app/components/service-pages/ServiceProof";
import { serviceById } from "@/app/data/services";

export default function WebHosting() {
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
  const displayBlogs = toBlogPosts(blogs, { name: "Hosting", icon: "\u2601\uFE0F" }, hostingInsightsData);

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <main>
      <HeroSection />
      <ServiceProof service={serviceById["webhosting"]} />
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
      </main>
      <Footer />
    </div>
  );
}

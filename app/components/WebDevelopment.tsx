"use client";
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import CTA from './CTA';
import TopThemes from './TopThemes';
import {
  HeroSection,
  ExpertiseSection,
  CaseStudiesSection,
  TestimonialsSection,
  ProcessSection,
  WebDevelopmentInsights,
  FAQSection,
  expertiseData,
  caseStudiesData,
  testimonialsData,
  processStepsData,
  webDevelopmentInsightsData,
  faqsData,
} from '../web-development/components';
import { usePageContent } from '@/lib/hooks/usePageContent';

export default function WebDevelopment(): React.ReactNode {
  const { faqs, testimonials, blogs, caseStudies } = usePageContent({
    page: 'web-development',
    loadFAQs: true,
    loadTestimonials: true,
    loadBlogs: true,
    loadCaseStudies: true,
  });

  const displayFAQs = faqs.length > 0 ? faqs : faqsData;
  const displayTestimonials = testimonials.length > 0 ? testimonials : testimonialsData;
  const displayBlogs = blogs.length > 0 ? blogs.map((b: any) => ({
    title: b.title,
    subtitle: b.subtitle,
    description: b.excerpt || b.description || b.content?.substring(0, 150) || '',
    image: b.image,
    link: b.slug ? `/blog/${b.slug}` : b.link || '#',
    category: typeof b.category === 'object' && b.category !== null ? b.category : { name: b.category || 'Web', icon: '🌐' },
    date: b.date || new Date(b.createdAt).toLocaleDateString('de-DE'),
  })) : webDevelopmentInsightsData;

  // Transformiere Case Studies für WebDevelopment-Format (mit metrics)
  const displayCaseStudies = caseStudies.length > 0 ? caseStudies
    .filter((cs: any) => {
      const categories = Array.isArray(cs.category) ? cs.category : [cs.category];
      const pages = Array.isArray(cs.page) ? cs.page : [cs.page];

      const categoryMatch = categories.some((cat: any) =>
        typeof cat === 'string' && (cat.toLowerCase() === 'web-development' || cat.toLowerCase() === 'webseiten')
      );

      const pageMatch = pages.some((p: any) =>
        typeof p === 'string' && p.toLowerCase() === 'web-development'
      );

      return categoryMatch || pageMatch;
    })
    .map((cs: any) => ({
      title: cs.title,
      description: cs.description || cs.subtitle || '',
      metrics: cs.stats ? cs.stats.map((s: any) => ({
        label: s.label || s.name || '',
        value: s.value || s.amount || '',
      })) : (cs.metrics || []),
      link: cs.slug ? `/case-studies/${cs.slug}` : cs.link || '#',
      image: cs.image,
    })) : caseStudiesData;

  return (
    <div className="min-h-screen w-full bg-black text-white">
      <Header />
      <HeroSection />
      <ExpertiseSection expertise={expertiseData} />
      <CaseStudiesSection caseStudies={displayCaseStudies} />
      <TestimonialsSection testimonials={displayTestimonials} />
      <ProcessSection steps={processStepsData} />
      <WebDevelopmentInsights posts={displayBlogs} />
      <TopThemes />
      <FAQSection faqs={displayFAQs} />
      <CTA />
      <Footer />
    </div>
  );
}

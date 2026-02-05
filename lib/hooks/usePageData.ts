// Wiederverwendbarer Hook zum Laden von Seiten-Daten aus der API
import { useState, useEffect } from 'react';
import { fetchFAQs, fetchServices, fetchCaseStudies, fetchTestimonials, fetchPricingPlans } from '@/lib/api';

interface UsePageDataOptions {
  page: string;
  loadFAQs?: boolean;
  loadServices?: boolean;
  loadCaseStudies?: boolean;
  loadTestimonials?: boolean;
  loadPricing?: boolean;
}

export function usePageData(options: UsePageDataOptions) {
  const { page, loadFAQs = false, loadServices = false, loadCaseStudies = false, loadTestimonials = false, loadPricing = false } = options;
  
  const [faqs, setFaqs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        if (loadFAQs) {
          const apiFAQs = await fetchFAQs(page);
          if (apiFAQs && Array.isArray(apiFAQs) && apiFAQs.length > 0) {
            const sorted = apiFAQs.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
            setFaqs(sorted);
          }
        }

        if (loadServices) {
          const apiServices = await fetchServices(page);
          if (apiServices && Array.isArray(apiServices) && apiServices.length > 0) {
            const published = apiServices.filter((s: any) => s.published !== false);
            setServices(published);
          }
        }

        if (loadCaseStudies) {
          const apiCaseStudies = await fetchCaseStudies();
          if (apiCaseStudies && Array.isArray(apiCaseStudies) && apiCaseStudies.length > 0) {
            const published = apiCaseStudies.filter((cs: any) => cs.published !== false);
            setCaseStudies(published);
          }
        }

        if (loadTestimonials) {
          const apiTestimonials = await fetchTestimonials(page);
          if (apiTestimonials && Array.isArray(apiTestimonials) && apiTestimonials.length > 0) {
            const published = apiTestimonials.filter((t: any) => t.published !== false);
            setTestimonials(published);
          }
        }

        if (loadPricing) {
          const apiPricing = await fetchPricingPlans(page);
          if (apiPricing && Array.isArray(apiPricing) && apiPricing.length > 0) {
            const published = apiPricing.filter((p: any) => p.published !== false);
            setPricing(published);
          }
        }
      } catch (error) {
        console.error('Error loading page data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, loadFAQs, loadServices, loadCaseStudies, loadTestimonials, loadPricing]);

  return {
    faqs,
    services,
    caseStudies,
    testimonials,
    pricing,
    loading,
  };
}

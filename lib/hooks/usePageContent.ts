// Zentrale Hook-Funktion zum Laden von Seiten-Inhalten aus dem Admin-Center
// Modular, dynamisch und wiederverwendbar

import { useState, useEffect } from 'react';
import {
  fetchFAQs,
  fetchServices,
  fetchCaseStudies,
  fetchTestimonials,
  fetchPricingPlans,
  fetchBlogPosts
} from '@/lib/api';

interface UsePageContentOptions {
  page: string;
  loadFAQs?: boolean;
  loadServices?: boolean;
  loadCaseStudies?: boolean;
  loadTestimonials?: boolean;
  loadPricing?: boolean;
  loadBlogs?: boolean;
  blogCategory?: string;
}

interface UsePageContentReturn {
  faqs: any[];
  services: any[];
  caseStudies: any[];
  testimonials: any[];
  pricing: any[];
  blogs: any[];
  loading: boolean;
  error: string | null;
}

export function usePageContent(options: UsePageContentOptions): UsePageContentReturn {
  const {
    page,
    loadFAQs = false,
    loadServices = false,
    loadCaseStudies = false,
    loadTestimonials = false,
    loadPricing = false,
    loadBlogs = false,
    blogCategory
  } = options;

  const [faqs, setFaqs] = useState<any[]>([]);
  const [services, setServices] = useState<any[]>([]);
  const [caseStudies, setCaseStudies] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [pricing, setPricing] = useState<any[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);

      try {
        const promises: Promise<any>[] = [];

        if (loadFAQs) {
          promises.push(
            fetchFAQs(page).then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                const sorted = data.sort((a: any, b: any) => (a.order || 0) - (b.order || 0));
                setFaqs(sorted);
              }
              return data;
            }).catch(err => {
              console.error('Error loading FAQs:', err);
              return null;
            })
          );
        }

        if (loadServices) {
          promises.push(
            fetchServices(page).then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                const published = data.filter((s: any) => s.published !== false);
                setServices(published);
              }
              return data;
            }).catch(err => {
              console.error('Error loading services:', err);
              return null;
            })
          );
        }

        if (loadCaseStudies) {
          promises.push(
            fetchCaseStudies().then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                let filtered = data.filter((cs: any) => cs.published !== false);
                // Filtere nach Seite, falls angegeben
                if (page) {
                  filtered = filtered.filter((cs: any) => {
                    if (!cs.page || (Array.isArray(cs.page) && cs.page.length === 0)) {
                      return false; // Keine Seite zugewiesen = nicht anzeigen
                    }
                    // Unterstütze sowohl Array als auch String (für Rückwärtskompatibilität)
                    const pages = Array.isArray(cs.page) ? cs.page : [cs.page];
                    return pages.includes(page);
                  });
                }
                setCaseStudies(filtered);
              }
              return data;
            }).catch(err => {
              console.error('Error loading case studies:', err);
              return null;
            })
          );
        }

        if (loadTestimonials) {
          promises.push(
            fetchTestimonials(page).then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                const published = data.filter((t: any) => t.published !== false);
                setTestimonials(published);
              }
              return data;
            }).catch(err => {
              console.error('Error loading testimonials:', err);
              return null;
            })
          );
        }

        if (loadPricing) {
          promises.push(
            fetchPricingPlans(page).then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                const published = data.filter((p: any) => p.published !== false);
                setPricing(published);
              }
              return data;
            }).catch(err => {
              console.error('Error loading pricing:', err);
              return null;
            })
          );
        }

        if (loadBlogs) {
          promises.push(
            fetchBlogPosts().then(data => {
              if (data && Array.isArray(data) && data.length > 0) {
                let filtered = data.filter((b: any) => b.published !== false);
                
                // Filtere nach page Array (wenn page angegeben ist)
                if (page) {
                  filtered = filtered.filter((b: any) => {
                    // Unterstütze sowohl Array als auch String (Rückwärtskompatibilität)
                    const pages = Array.isArray(b.page) ? b.page : (b.page ? [b.page] : []);
                    
                    // Zeige Blog, wenn die aktuelle Seite im page Array ist
                    return pages.length === 0 || pages.includes(page);
                  });
                }
                
                // Zusätzliche Filterung nach Kategorie, falls angegeben (optional)
                if (blogCategory && filtered.length > 0) {
                  filtered = filtered.filter((b: any) => {
                    const categories = Array.isArray(b.category) ? b.category : (b.category ? [b.category] : []);
                    return categories.some((cat: any) => {
                      const catName = typeof cat === 'object' && cat !== null ? cat.name : cat;
                      return typeof catName === 'string' && catName.toLowerCase() === blogCategory.toLowerCase();
                    });
                  });
                }
                
                // Sortiere nach Datum (neueste zuerst)
                filtered.sort((a: any, b: any) => {
                  const dateA = new Date(a.date || a.createdAt || 0).getTime();
                  const dateB = new Date(b.date || b.createdAt || 0).getTime();
                  return dateB - dateA;
                });
                setBlogs(filtered);
              }
              return data;
            }).catch(err => {
              console.error('Error loading blogs:', err);
              return null;
            })
          );
        }

        await Promise.all(promises);
      } catch (err) {
        console.error('Error loading page content:', err);
        setError('Fehler beim Laden der Inhalte');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [page, loadFAQs, loadServices, loadCaseStudies, loadTestimonials, loadPricing, loadBlogs, blogCategory]);

  return {
    faqs,
    services,
    caseStudies,
    testimonials,
    pricing,
    blogs,
    loading,
    error,
  };
}

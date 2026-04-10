// API Helper für Frontend-Komponenten
// Lädt Daten aus API mit Fallback auf statische Daten

/** Ohne `page`: alle FAQs (zentrale /faq-Seite). Mit `page`: nur für diese Seite (z. B. eingebettete Sektionen). */
export async function fetchFAQs(page?: string) {
  try {
    const url = page ? `/api/faqs?page=${encodeURIComponent(page)}` : '/api/faqs';
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching FAQs:', error);
  }
  return null;
}

export async function fetchBlogPosts() {
  try {
    const res = await fetch('/api/blogs', { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching blog posts:', error);
  }
  return null;
}

export async function fetchCaseStudies(category?: string, page?: string) {
  try {
    const params = new URLSearchParams();
    if (category) params.set('category', category);
    if (page) params.set('page', page);
    const q = params.toString();
    const url = q ? `/api/case-studies?${q}` : '/api/case-studies';
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching case studies:', error);
  }
  return null;
}

export async function fetchServices(page: string) {
  try {
    const res = await fetch(`/api/services?page=${page}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching services:', error);
  }
  return null;
}

export async function fetchPricingPlans(page: string) {
  try {
    const res = await fetch(`/api/pricing?page=${page}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching pricing plans:', error);
  }
  return null;
}

export async function fetchTestimonials(page?: string) {
  try {
    const url = page ? `/api/testimonials?page=${page}` : '/api/testimonials';
    const res = await fetch(url, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching testimonials:', error);
  }
  return null;
}

export async function fetchPageContent(page: string, section: string) {
  try {
    const res = await fetch(`/api/page-content?page=${page}&section=${section}`, { cache: 'no-store' });
    if (res.ok) {
      return await res.json();
    }
  } catch (error) {
    console.error('Error fetching page content:', error);
  }
  return null;
}

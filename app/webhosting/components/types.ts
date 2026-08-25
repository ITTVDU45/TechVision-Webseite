// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

export interface PricingPlan {
  name: string;
  originalPrice: string;
  currentPrice: string;
  features: string[];
  isPopular?: boolean;
  link?: string;
}

export interface ExpertiseFeature {
  icon: string;
  title: string;
  description: string;
}

export interface WhyDifferentFeature {
  icon: string;
  title: string;
  description: string;
}

export interface SpecializedHosting {
  name: string;
  icon: string;
  description?: string;
}

export interface OneClickApp {
  name: string;
  icon?: string;
}

export interface AdditionalService {
  icon: string;
  title: string;
  description: string;
}

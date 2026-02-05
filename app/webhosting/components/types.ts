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

export interface BlogPost {
  id?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  category: {
    name: string;
    icon: string;
  };
  date: string;
  readTime?: string;
  link?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

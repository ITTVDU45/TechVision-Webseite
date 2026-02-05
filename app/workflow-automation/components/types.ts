export interface KIAgentFeature {
  icon: string;
  title: string;
  description: string;
}

export interface AutomationBenefit {
  icon: string;
  title: string;
  description: string;
}

export interface UseCase {
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
}

export interface IntegrationCategory {
  icon: string;
  title: string;
  systems: string[];
  features: string[];
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

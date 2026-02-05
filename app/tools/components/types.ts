export interface OpenSourceTool {
  name: string;
  icon: string;
  description: string;
  features: string[];
}

export interface KIAgent {
  name: string;
  icon: string;
  description: string;
  features?: string[];
  detailsLink?: string;
}

export interface IntegrationCategory {
  name: string;
  icon: string;
  items: {
    name: string;
    logo: string;
  }[];
  detailsLink?: string;
}

export interface IntegrationFeature {
  icon: string;
  title: string;
  description: string;
}

export interface BlogPost {
  title: string;
  subtitle?: string;
  description?: string;
  image?: string;
  category: {
    name: string;
    icon: string;
  };
  date: string;
  link?: string;
}

export interface FAQ {
  question: string;
  answer: string;
}

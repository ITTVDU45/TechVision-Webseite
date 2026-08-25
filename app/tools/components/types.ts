// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

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

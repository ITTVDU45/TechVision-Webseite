// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

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

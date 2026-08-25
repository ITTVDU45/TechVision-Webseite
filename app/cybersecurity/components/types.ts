import { Icon } from "@tabler/icons-react";

// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

export interface Service {
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export interface Stat {
  icon: string;
  value: string;
  label: string;
}

export interface Threat {
  icon: string;
  title: string;
  description: string;
  threatLevel: number;
  color: string;
  iconColor: string;
}

export interface CaseStudy {
  company: string;
  title: string;
  description: string;
  results: string[];
  image?: string;
  link?: string;
}

export interface Benefit {
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

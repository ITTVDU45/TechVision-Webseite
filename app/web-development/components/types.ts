// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

export interface Expertise {
  name: string;
  icon: string;
  description?: string;
}

export interface CaseStudy {
  title: string;
  description: string;
  metrics: {
    label: string;
    value: string;
  }[];
  link?: string;
}

export interface Testimonial {
  name: string;
  company: string;
  quote: string;
  image?: string;
}

export interface ProcessStep {
  number: string;
  icon: string;
  title: string;
  description: string;
}

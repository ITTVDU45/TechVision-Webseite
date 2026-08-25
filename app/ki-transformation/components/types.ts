import { Icon } from "@tabler/icons-react";

// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

export interface UseCase {
  title: string;
  description: string;
  example?: string;
  icon?: string;
  gradient?: string;
  stats?: { value: string; label: string }[];
}

export interface FeatureCard {
  icon: Icon;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export interface ProcessStep {
  number: string;
  icon: Icon;
  title: string;
  subtitle: string;
  items: string[];
  color: string;
  iconColor: string;
}

export interface Tool {
  category: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  iconColor: string;
}

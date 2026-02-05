import { Icon } from "@tabler/icons-react";

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

export interface FAQ {
  question: string;
  answer: string;
}

export interface Tool {
  category: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  iconColor: string;
}

export interface BlogPost {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  link?: string;
  category?: string;
  date?: string;
}

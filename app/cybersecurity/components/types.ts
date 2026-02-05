import { Icon } from "@tabler/icons-react";

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

export interface BlogPost {
  title: string;
  subtitle?: string;
  excerpt?: string;
  image?: string;
  link?: string;
  category?: string;
  date?: string;
}

export interface FAQ {
  question: string;
  answer: string;
  icon?: string;
}

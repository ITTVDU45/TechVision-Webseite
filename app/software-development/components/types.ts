import { Icon } from "@tabler/icons-react";

export interface Project {
  icon: string;
  title: string;
  description: string;
  color: string;
  iconColor: string;
}

export interface ProcessStep {
  number?: string;
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
}

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

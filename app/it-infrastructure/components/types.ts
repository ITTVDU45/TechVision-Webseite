export interface InfrastructureSolution {
  name: string;
  icon: string;
  description: string;
}

export interface PlanningFeature {
  icon: string;
  title: string;
  description: string;
}

export interface Benefit {
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

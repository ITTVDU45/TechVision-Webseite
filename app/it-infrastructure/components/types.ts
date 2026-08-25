// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

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

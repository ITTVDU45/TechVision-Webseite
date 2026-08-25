import { Icon } from "@tabler/icons-react";

// BlogPost, BlogCategory und FAQ kommen aus dem gemeinsamen Modell.
// Vorher war jeder dieser Typen hier neu definiert - mit abweichenden Formen.
export type { BlogPost, BlogCategory, FAQ } from "@/lib/types/content";

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

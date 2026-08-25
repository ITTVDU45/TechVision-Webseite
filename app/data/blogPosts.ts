import type { BlogPost } from "@/lib/types/content";

export type { BlogPost };

export const blogPosts: BlogPost[] = [
  {
    id: "ki-transformation-praxis",
    title: "KI-Transformation in der Praxis",
    subtitle: "KI & Automatisierung",
    description: "Wie Unternehmen KI erfolgreich in ihre Geschäftsprozesse integrieren und messbare Erfolge erzielen.",
    image: "",
    date: "2024-03-22",
    readTime: "5 min",
    category: { name: "KI & Innovation", icon: "🤖" }
  },
  {
    id: "cybersecurity-2024",
    title: "Cybersecurity Trends 2024",
    subtitle: "IT-Sicherheit",
    description: "Die wichtigsten Sicherheitsstrategien zum Schutz Ihrer digitalen Assets in einer vernetzten Welt.",
    image: "/images/cybersecurity.jpg",
    date: "2024-03-15",
    readTime: "7 min",
    category: { name: "Sicherheit", icon: "🔒" }
  },
  {
    id: "workflow-automation",
    title: "Effiziente Workflows mit KI-Agenten",
    subtitle: "Automatisierung",
    description: "Wie Sie tägliche Aufgaben durch intelligente Agenten automatisieren und Zeit für das Wesentliche gewinnen.",
    image: "",
    date: "2024-03-10",
    readTime: "6 min",
    category: { name: "Produktivität", icon: "⚡" }
  },
  {
    id: "future-of-web",
    title: "Die Zukunft der Webentwicklung",
    subtitle: "Technologie",
    description: "Von Headless CMS bis Edge Computing – was die nächste Generation des Webs ausmacht.",
    image: "/images/cms-development.jpg",
    date: "2024-03-05",
    readTime: "8 min",
    category: { name: "Tech", icon: "💻" }
  }
];

export default blogPosts;

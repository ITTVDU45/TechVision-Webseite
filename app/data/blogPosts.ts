export type BlogPost = {
  id: string;
  slug?: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date: string;
  readTime: string;
  category: {
    name: string;
    icon: string;
  };
};

export const blogPosts: BlogPost[] = [
  {
    id: "ki-transformation-praxis",
    title: "KI-Transformation in der Praxis",
    subtitle: "KI & Automatisierung",
    description: "Wie Unternehmen KI erfolgreich in ihre Geschäftsprozesse integrieren und messbare Erfolge erzielen.",
    image: "",
    date: "22. März 2024",
    readTime: "5 min",
    category: { name: "KI & Innovation", icon: "🤖" }
  },
  {
    id: "cybersecurity-2024",
    title: "Cybersecurity Trends 2024",
    subtitle: "IT-Sicherheit",
    description: "Die wichtigsten Sicherheitsstrategien zum Schutz Ihrer digitalen Assets in einer vernetzten Welt.",
    image: "/images/cybersecurity.jpg",
    date: "15. März 2024",
    readTime: "7 min",
    category: { name: "Sicherheit", icon: "🔒" }
  },
  {
    id: "workflow-automation",
    title: "Effiziente Workflows mit KI-Agenten",
    subtitle: "Automatisierung",
    description: "Wie Sie tägliche Aufgaben durch intelligente Agenten automatisieren und Zeit für das Wesentliche gewinnen.",
    image: "",
    date: "10. März 2024",
    readTime: "6 min",
    category: { name: "Produktivität", icon: "⚡" }
  },
  {
    id: "future-of-web",
    title: "Die Zukunft der Webentwicklung",
    subtitle: "Technologie",
    description: "Von Headless CMS bis Edge Computing – was die nächste Generation des Webs ausmacht.",
    image: "/images/cms-development.jpg",
    date: "05. März 2024",
    readTime: "8 min",
    category: { name: "Tech", icon: "💻" }
  }
];

export default blogPosts;

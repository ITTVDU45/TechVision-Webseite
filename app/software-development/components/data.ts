import { Project, ProcessStep, BlogPost, FAQ } from "./types";

export const projectsData: Project[] = [
  {
    icon: "👥",
    title: "Mitarbeiter App",
    description: "Moderne App-Lösungen für interne Kommunikation und Organisation.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: "💼",
    title: "CRM für IT Unternehmen",
    description: "Effiziente CRM-Systeme für IT-Dienstleister.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: "🤖",
    title: "KI-Agenten CRM",
    description: "Innovative CRM-Lösungen mit integrierten KI-Agenten.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: "🔄",
    title: "Matching Business KI",
    description: "Intelligente Matching-Lösungen für Geschäftspartner.",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
  },
  {
    icon: "⚖️",
    title: "Kanzlei Software",
    description: "Maßgeschneiderte Softwarelösungen für Kanzleien.",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: "📋",
    title: "Gutachtersoftware",
    description: "Digitale Tools für effiziente Gutachtenverwaltung.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
];

export const processStepsData: ProcessStep[] = [
  {
    icon: "💡",
    title: "Skizze & Konzept",
    description: "Erfassung der Anforderungen, Brainstorming und erste Ideenentwicklung.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: "✏️",
    title: "Planung & Prototyping",
    description: "Detaillierte Planung, Erstellung von Wireframes und interaktiven Prototypen.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: "🎯",
    title: "Programmierung",
    description: "Implementierung der Lösung mit modernsten Technologien und agilen Methoden.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: "💻",
    title: "Integration & Testing",
    description: "Nahtlose Integration in Ihre bestehende IT-Landschaft und umfassende Qualitätsprüfungen.",
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
  },
  {
    icon: "🚀",
    title: "Launch & Support",
    description: "Bereitstellung der fertigen Software und kontinuierlicher Support zur Optimierung.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
];

export const newsBlogPosts: BlogPost[] = [
  {
    title: "Aktuelle Trends in der Softwareentwicklung",
    excerpt: "Entdecken Sie die neuesten Trends und Technologien, die die Softwareentwicklung revolutionieren.",
    category: "Trends",
    date: "20. März 2024",
    image: "/images/cms-development.jpg",
    link: "/blog/trends-softwareentwicklung",
  },
  {
    title: "Best Practices für erfolgreiche Projekte",
    excerpt: "Erfahren Sie, wie Sie Ihre Softwareprojekte effizient und erfolgreich umsetzen können.",
    category: "Best Practices",
    date: "18. März 2024",
    image: "/images/system-integration-network.jpg",
    link: "/blog/best-practices-softwareentwicklung",
  },
  {
    title: "Erfolgsgeschichten aus unseren Projekten",
    excerpt: "Lesen Sie, wie wir unseren Kunden geholfen haben, ihre Ziele zu erreichen.",
    category: "Case Studies",
    date: "15. März 2024",
    image: "/images/ai-robot.jpg",
    link: "/blog/erfolgsgeschichten-softwareentwicklung",
  },
];

export const faqsData: FAQ[] = [
  {
    question: "Wie lange dauert die Entwicklung einer Software?",
    answer:
      "Die Dauer hängt von der Komplexität Ihres Projekts ab. Einfache Anwendungen können in 2-3 Monaten fertiggestellt werden, während komplexe Enterprise-Lösungen 6-12 Monate oder länger in Anspruch nehmen können. Wir erstellen gerne einen individuellen Zeitplan für Ihr Projekt.",
  },
  {
    question: "Welche Technologien verwenden Sie?",
    answer:
      "Wir arbeiten mit modernsten Technologien wie React, Next.js, TypeScript, Node.js, Python und verschiedenen Cloud-Plattformen. Die Technologieauswahl erfolgt immer basierend auf den spezifischen Anforderungen Ihres Projekts.",
  },
  {
    question: "Können Sie bestehende Systeme integrieren?",
    answer:
      "Ja, wir integrieren Ihre neue Software nahtlos in bestehende ERP-, CRM- und BI-Systeme. Wir unterstützen gängige APIs und Protokolle für eine reibungslose Integration.",
  },
  {
    question: "Wie sieht der Support nach dem Launch aus?",
    answer:
      "Wir bieten kontinuierlichen Support nach dem Launch, einschließlich Bug-Fixes, Updates, Wartung und Erweiterungen. Unser Support-Modell kann an Ihre Bedürfnisse angepasst werden.",
  },
  {
    question: "Wie sicher sind die entwickelten Lösungen?",
    answer:
      "Sicherheit hat für uns höchste Priorität. Wir implementieren Best Practices für Datensicherheit, verwenden verschlüsselte Verbindungen und halten uns an DSGVO-Standards. Regelmäßige Sicherheitsaudits sind Teil unseres Entwicklungsprozesses.",
  },
];

import {
  Service,
  Stat,
  Threat,
  CaseStudy,
  Benefit,
  ProcessStep,
  BlogPost,
  FAQ,
} from "./types";

export const servicesData: Service[] = [
  {
    icon: "🛡️",
    title: "ISM Beratung",
    description: "Individuelle Beratung für Ihr Informationssicherheits-Management-System.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: "📋",
    title: "BSI Standards Implementierung",
    description: "Umsetzung der branchenführenden BSI-Standards für höchste Sicherheit.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: "✅",
    title: "ISO 27001",
    description: "Zertifizierte Beratung zur Erreichung und Aufrechterhaltung der ISO 27001.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
  {
    icon: "🏛️",
    title: "NIST",
    description: "Beratung zur Implementierung von NIST-Richtlinien für ein robustes Sicherheitskonzept.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    icon: "🏢",
    title: "DIN SPEC 270...",
    description: "Speziallösungen für den Mittelstand zur Umsetzung von DIN SPEC-Anforderungen.",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
  },
];

export const statsData: Stat[] = [
  {
    icon: "🎯",
    value: "78%",
    label: "der Unternehmen wurden Opfer von Cyberangriffen",
  },
  {
    icon: "💰",
    value: "€205K",
    label: "durchschnittliche Kosten pro Datenleck",
  },
  {
    icon: "⏰",
    value: "48h",
    label: "durchschnittliche Ausfallzeit nach Ransomware",
  },
  {
    icon: "📧",
    value: "92%",
    label: "der Angriffe beginnen mit einer Phishing-Mail",
  },
];

export const threatsData: Threat[] = [
  {
    icon: "🔒",
    title: "Ransomware",
    description: "Verschlüsselung von Daten und Erpressung durch Cyberkriminelle",
    threatLevel: 65,
    color: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-400",
  },
  {
    icon: "🎣",
    title: "Phishing",
    description: "Gezielte Täuschungsversuche durch gefälschte Kommunikation",
    threatLevel: 92,
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
  },
  {
    icon: "🌐",
    title: "DDoS Attacken",
    description: "Gezielte Überlastung von Systemen und Diensten",
    threatLevel: 45,
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
];

export const caseStudiesData: CaseStudy[] = [
  {
    company: "Finanzdienstleister XY",
    title: "Implementierung eines umfassenden ISO 27001-konformen Sicherheitssystems",
    description: "Finanzdienstleister XY",
    results: [
      "60% weniger Sicherheitsvorfälle",
      "ISO 27001 Zertifizierung erreicht",
      "Erfolgreiche BSI-Grundschutz-Implementierung",
    ],
    image: "/images/cybersecurity.jpg",
    link: "/case-studies/cybersecurityberatung",
  },
  {
    company: "Mittelständisches Industrieunternehmen",
    title: "Modernisierung der IT-Sicherheitsarchitektur und Einführung von NIST-Standards",
    description: "Mittelständisches Industrieunternehmen",
    results: [
      "90% Reduzierung von Phishing-Erfolgen",
      "Vollständige NIST-Framework-Integration",
      "Automatisierte Sicherheitsprozesse",
    ],
    image: "/images/system-integration-network.jpg",
    link: "/case-studies/cybersecurityberatung",
  },
  {
    company: "E-Commerce Platform",
    title: "DIN SPEC-konforme Sicherheitslösung für schnell wachsendes Online-Business",
    description: "E-Commerce Platform",
    results: [
      "100% DSGVO-Konformität erreicht",
      "Sichere Skalierung der IT-Infrastruktur",
      "24/7 Sicherheitsmonitoring",
    ],
    image: "/images/cms-development.jpg",
    link: "/case-studies/cybersecurityberatung",
  },
];

export const benefitsData: Benefit[] = [
  {
    icon: "🎯",
    title: "Ganzheitliche Expertise",
    description:
      "Wir kombinieren Best Practices und international anerkannte Standards für einen umfassenden Sicherheitsansatz.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: "🔧",
    title: "Maßgeschneiderte Lösungen",
    description:
      "Individuelle Beratung und passgenaue Konzepte, die sich an den Bedürfnissen Ihres Unternehmens orientieren.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: "🛡️",
    title: "Langfristige Sicherheit",
    description:
      "Proaktive Maßnahmen zur Risikominimierung und nachhaltigen Absicherung Ihrer IT-Infrastruktur.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
];

export const processStepsData: ProcessStep[] = [
  {
    number: "01",
    icon: "🔍",
    title: "Analyse & Assessment",
    description: "Erfassung der aktuellen Sicherheitslage und Identifikation von Schwachstellen.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    number: "02",
    icon: "📋",
    title: "Konzept & Planung",
    description:
      "Entwicklung eines maßgeschneiderten Sicherheitskonzepts unter Berücksichtigung internationaler Standards.",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    number: "03",
    icon: "⚙️",
    title: "Implementierung",
    description: "Umsetzung der geplanten Maßnahmen – von der Technologie bis zur Schulung Ihrer Mitarbeiter.",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    number: "04",
    icon: "📊",
    title: "Monitoring & Support",
    description: "Kontinuierliche Überwachung und regelmäßige Updates für nachhaltige Sicherheit.",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
];

export const securityInsightsPosts: BlogPost[] = [
  {
    title: "Cybersecurity Best Practices",
    excerpt: "Wie Sie Ihr Unternehmen vor modernen Bedrohungen schützen",
    category: "Security",
    date: "18. März 2024",
    image: "/images/cybersecurity.jpg",
    link: "/blog/cybersecurity-best-practices",
  },
  {
    title: "Zero Trust Security",
    excerpt: "Implementierung des Zero-Trust-Modells in modernen Unternehmen",
    category: "Security Architecture",
    date: "16. März 2024",
    image: "/images/system-integration-network.jpg",
    link: "/blog/zero-trust-security",
  },
  {
    title: "Cloud Security 2024",
    excerpt: "Neue Herausforderungen in der Cloud-Sicherheit und wie Sie ihnen begegnen",
    category: "Cloud",
    date: "14. März 2024",
    image: "/images/cms-development.jpg",
    link: "/blog/cloud-security-2024",
  },
];

export const faqsData: FAQ[] = [
  {
    icon: "⏱️",
    question: "Wie lange dauert eine typische Sicherheitsimplementierung?",
    answer:
      "Die Dauer variiert je nach Umfang und Komplexität. Einfache Assessments können in 2-4 Wochen abgeschlossen werden, während umfassende Implementierungen 3-6 Monate oder länger dauern können. Wir erstellen gerne einen individuellen Zeitplan für Ihr Projekt.",
  },
  {
    icon: "🏢",
    question: "Welche Branchen betreuen Sie hauptsächlich?",
    answer:
      "Wir betreuen Unternehmen aus verschiedenen Branchen, darunter Finanzdienstleistungen, E-Commerce, Industrie, Gesundheitswesen und IT-Dienstleistungen. Unsere Lösungen sind branchenübergreifend anwendbar.",
  },
  {
    icon: "👥",
    question: "Bieten Sie auch Schulungen für Mitarbeiter an?",
    answer:
      "Ja, Mitarbeiterschulungen sind ein wichtiger Bestandteil unserer Sicherheitslösungen. Wir bieten maßgeschneiderte Schulungsprogramme zu Themen wie Phishing-Prävention, Passwort-Sicherheit und sicherem Umgang mit Daten.",
  },
  {
    icon: "✅",
    question: "Wie wird die Compliance sichergestellt?",
    answer:
      "Wir unterstützen Sie bei der Einhaltung relevanter Standards wie ISO 27001, BSI-Grundschutz, DSGVO und NIST. Unsere Beratung umfasst Compliance-Assessments, Gap-Analysen und die Entwicklung von Maßnahmenplänen.",
  },
  {
    icon: "📞",
    question: "Gibt es eine 24/7 Support-Hotline?",
    answer:
      "Ja, wir bieten 24/7 Support für kritische Sicherheitsvorfälle. Zusätzlich stehen wir Ihnen während der Geschäftszeiten für alle Fragen zur Verfügung.",
  },
  {
    icon: "🔄",
    question: "Wie werden Updates und Patches verwaltet?",
    answer:
      "Wir unterstützen Sie bei der Implementierung eines strukturierten Patch-Management-Prozesses, der regelmäßige Updates, Priorisierung nach Risiko und automatisierte Patch-Verteilung umfasst.",
  },
];

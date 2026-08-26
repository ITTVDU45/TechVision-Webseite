import {
  IconChartBar,
  IconSettings,
  IconTarget,
  IconBolt,
  IconDatabase,
  IconTrendingUp,
} from "@tabler/icons-react";
import {
  UseCase,
  FeatureCard,
  ProcessStep,
  FAQ,
  Tool,
} from "./types";

export const useCasesData: UseCase[] = [
  {
    title: "KI in der Prozessautomatisierung",
    description:
      "KI übernimmt repetitive Aufgaben und automatisiert Workflows, um Mitarbeitern Freiraum für wertschöpfende Tätigkeiten zu schaffen.",
    example: "Automatisierte Rechnungsverarbeitung oder intelligente Dokumentenverarbeitung (OCR).",
    icon: "⚙️",
    gradient: "from-blue-500 via-indigo-500 to-violet-600",
    stats: [
      { value: "25%", label: "Kosteneinsparung" },
      { value: "35%", label: "Effizienzsteigerung" },
    ],
  },
  {
    title: "KI im Kundenservice",
    description:
      "KI-gestützte Chatbots und intelligente Supportsysteme verbessern die Reaktionszeiten und die Servicequalität.",
    example: "Automatische Ticketbearbeitung in Helpdesks oder Voicebots im Callcenter.",
    icon: "💬",
    gradient: "from-purple-500 to-pink-500",
    stats: [
      { value: "40%", label: "Schnellere Entscheidungen" },
      { value: "30%", label: "Verbesserte Kundenzufriedenheit" },
    ],
  },
  {
    title: "KI in der Finanzbranche",
    description:
      "Von Anomalieerkennung in Transaktionen bis zur Kreditrisikoanalyse – KI optimiert Finanzprozesse.",
    example: "Automatisierte Betrugserkennung bei Banktransaktionen.",
    icon: "💳",
    gradient: "from-green-500 to-emerald-500",
    stats: [
      { value: "20%", label: "Verbesserte Risikoanalyse" },
      { value: "15%", label: "Kosteneinsparung" },
    ],
  },
];

export const whatIsFeatures: FeatureCard[] = [
  {
    icon: IconChartBar,
    title: "Datenanalyse",
    description: "Automatische Erkennung von Mustern und Trends in großen Datenmengen",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: IconSettings,
    title: "Prozessautomatisierung",
    description: "Intelligente Automatisierung repetitiver Aufgaben",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    icon: IconTarget,
    title: "Entscheidungsfindung",
    description: "KI-gestützte Entscheidungen basierend auf Datenanalysen",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
];

export const whyIntegrateFeatures: FeatureCard[] = [
  {
    icon: IconBolt,
    title: "Automatisierte Geschäftsprozesse",
    description: "Reduzieren Sie manuelle Arbeit und steigern Sie die Produktivität.",
    color: "from-yellow-500/20 to-orange-500/20",
    iconColor: "text-yellow-400",
  },
  {
    icon: IconChartBar,
    title: "Datengetriebene Entscheidungen",
    description:
      "Analysieren Sie große Datenmengen in Echtzeit für präzisere Geschäftsentscheidungen.",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    icon: IconTrendingUp,
    title: "Skalierbarkeit & Flexibilität",
    description:
      "Nutzen Sie KI, um Ihre Prozesse mit minimalem Aufwand an neue Anforderungen anzupassen.",
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: "01",
    icon: IconTarget,
    title: "Analyse & Strategie",
    subtitle: "Identifikation von Optimierungspotenzialen",
    items: [
      "Bestandsaufnahme aktueller Prozesse",
      "Identifikation von KI-Potenzialen",
      "Entwicklung einer Transformationsstrategie",
    ],
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    number: "02",
    icon: IconBolt,
    title: "Konzeption & Prototyping",
    subtitle: "Entwicklung eines ersten KI-Modells",
    items: [
      "Auswahl geeigneter KI-Technologien",
      "Entwicklung von Proof-of-Concepts",
      "Validierung der Machbarkeit",
    ],
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    number: "03",
    icon: IconDatabase,
    title: "Datenaufbereitung & Training",
    subtitle: "Training der KI mit Unternehmensdaten",
    items: [
      "Datensammlung und -bereinigung",
      "KI-Modell Training und Validierung",
      "Optimierung der Modellgenauigkeit",
    ],
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    number: "04",
    icon: IconSettings,
    title: "Implementierung & Integration",
    subtitle: "Einbindung der KI in bestehende Prozesse",
    items: ["Systemintegration", "Mitarbeiterschulung", "Testphase und Feinjustierung"],
    color: "from-pink-500/20 to-pink-600/20",
    iconColor: "text-pink-400",
  },
  {
    number: "05",
    icon: IconTrendingUp,
    title: "Monitoring & Optimierung",
    subtitle: "Kontinuierliche Verbesserung durch KI-Training",
    items: [
      "Performance-Monitoring",
      "Kontinuierliches Modell-Training",
      "Anpassung an neue Anforderungen",
    ],
    color: "from-green-500/20 to-emerald-500/20",
    iconColor: "text-green-400",
  },
];

export const toolsData: Tool[] = [
  {
    category: "Machine Learning",
    name: "TensorFlow",
    description: "Open-Source Framework für maschinelles Lernen und KI",
    icon: "🧠",
    color: "from-orange-500/20 to-orange-600/20",
    iconColor: "text-orange-400",
  },
  {
    category: "Machine Learning",
    name: "PyTorch",
    description: "Flexibles Deep Learning Framework für KI-Entwicklung",
    icon: "🔥",
    color: "from-red-500/20 to-red-600/20",
    iconColor: "text-red-400",
  },
  {
    category: "Automation",
    name: "n8n",
    description: "Workflow Automatisierung mit fairem Lizenzmodell",
    icon: "⚡",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
  {
    category: "Automation",
    name: "Make (Integromat)",
    description: "Visuelle Automatisierung komplexer Workflows",
    icon: "🔄",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    category: "Cloud AI",
    name: "Google AI",
    description: "KI-Services und Machine Learning in der Cloud",
    icon: "☁️",
    color: "from-blue-500/20 to-indigo-600/20",
    iconColor: "text-blue-400",
  },
  {
    category: "Cloud AI",
    name: "Azure AI",
    description: "Microsoft's KI-Plattform für Unternehmen",
    icon: "💠",
    color: "from-cyan-500/20 to-cyan-600/20",
    iconColor: "text-cyan-400",
  },
  {
    category: "Cloud AI",
    name: "IBM Watson",
    description: "Enterprise KI-Lösungen und Cognitive Computing",
    icon: "🤖",
    color: "from-indigo-500/20 to-indigo-600/20",
    iconColor: "text-indigo-400",
  },
  {
    category: "Analytics",
    name: "Power BI",
    description: "Business Intelligence und Datenvisualisierung",
    icon: "📊",
    color: "from-yellow-500/20 to-amber-600/20",
    iconColor: "text-yellow-400",
  },
  {
    category: "Analytics",
    name: "Tableau",
    description: "Interaktive Datenanalyse und Visualisierung",
    icon: "📈",
    color: "from-blue-500/20 to-blue-600/20",
    iconColor: "text-blue-400",
  },
  {
    category: "APIs",
    name: "Vapi",
    description: "Voice API für natürliche Sprachverarbeitung",
    icon: "🎙️",
    color: "from-purple-500/20 to-purple-600/20",
    iconColor: "text-purple-400",
  },
  {
    category: "Database",
    name: "MongoDB",
    description: "Skalierbare NoSQL Datenbank",
    icon: "🗄️",
    color: "from-green-500/20 to-green-600/20",
    iconColor: "text-green-400",
  },
  {
    category: "Search",
    name: "Elasticsearch",
    description: "Leistungsstarke Suchengine und Analysen",
    icon: "🔎",
    color: "from-yellow-500/20 to-yellow-600/20",
    iconColor: "text-yellow-400",
  },
];

export const faqsData: FAQ[] = [
  {
    question: "Wie lange dauert eine KI-Transformation?",
    answer:
      "Die Dauer hängt von der Komplexität Ihres Projekts ab. Einfache Automatisierungen können in 2-3 Monaten umgesetzt werden, während umfassende Transformationen 6-12 Monate oder länger dauern können.",
  },
  {
    question: "Welche Kosten entstehen bei einer KI-Transformation?",
    answer:
      "Die Kosten variieren je nach Umfang und Komplexität. Wir bieten maßgeschneiderte Lösungen, die zu Ihrem Budget passen. Kontaktieren Sie uns für eine individuelle Beratung.",
  },
  {
    question: "Benötigen wir spezielle Hardware für KI-Lösungen?",
    answer:
      "In den meisten Fällen nicht. Viele KI-Lösungen laufen cloud-basiert und nutzen moderne Cloud-Infrastrukturen. Wir beraten Sie gerne zu den besten Optionen für Ihr Unternehmen.",
  },
  {
    question: "Wie sicher sind unsere Daten bei KI-Lösungen?",
    answer:
      "Datensicherheit hat für uns höchste Priorität. Wir implementieren alle Lösungen nach DSGVO-Standards und verwenden verschlüsselte Verbindungen und sichere Cloud-Infrastrukturen.",
  },
];

/**
 * Startseite „Unsere Services“ (Karussell): Platzierung in MongoDB immer page === "home".
 * `link` = Ziel für „Mehr dazu“, `gradient` = Tailwind-Klassen für die Karte.
 */

export const HOME_SERVICES_PLACEMENT = "home" as const;

export interface HomeServiceSeed {
  icon: string;
  name: string;
  description: string;
  order: number;
  link: string;
  gradient: string;
}

/** Inhalt wie im Frontend-Statik-Fallback / Karussell-Karten */
export const DEFAULT_HOME_SERVICES: HomeServiceSeed[] = [
  {
    icon: "🤖",
    name: "KI-Transformation",
    description:
      "Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz, um Effizienz und Produktivität zu steigern.",
    order: 1,
    link: "/ki-transformation",
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
  },
  {
    icon: "⚡",
    name: "Workflow Automatisierung",
    description:
      "Von der Planung bis zur Umsetzung integrieren wir maßgeschneiderte KI-Lösungen nahtlos in Ihre bestehenden Systeme.",
    order: 2,
    link: "/workflow-automation",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    icon: "💻",
    name: "Software Entwicklung",
    description:
      "Entwicklung intelligenter Softwarelösungen, die durch KI Ihre Geschäftsabläufe optimieren und automatisieren.",
    order: 3,
    link: "/software-development",
    gradient: "from-purple-400 via-pink-500 to-red-500",
  },
  {
    icon: "🎯",
    name: "KI für Branchen",
    description:
      "Spezialisierte KI-Lösungen für verschiedene Branchen wie IT, Bauwesen und Rechtswesen, um branchenspezifische Herausforderungen zu meistern.",
    order: 4,
    link: "/industry-solutions",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
  },
  {
    icon: "🔒",
    name: "Cybersecurity",
    description:
      "Umfassender Schutz und professionelles Management Ihrer IT-Systeme, von Backup-Lösungen bis hin zu sicherer Cloud-Integration und Netzwerkarchitektur.",
    order: 5,
    link: "/cybersecurity",
    gradient: "from-indigo-400 via-purple-500 to-purple-600",
  },
  {
    icon: "🌐",
    name: "Webseitenentwicklung",
    description:
      "Moderne und responsive Webauftritte für Ihren professionellen Online-Auftritt.",
    order: 6,
    link: "/web-development",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
  },
  {
    icon: "☁️",
    name: "Hosting",
    description:
      "Zuverlässiges Hosting für Ihre Webseiten und Softwarelösungen mit erstklassigem Support.",
    order: 7,
    link: "/webhosting",
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
  },
];

/** Eindeutige Verläufe für das Admin-Dropdown (Reihenfolge wie häufig genutzt) */
export const HOME_SERVICE_GRADIENT_PRESETS: { value: string; label: string }[] = [
  { value: "from-blue-400 via-blue-500 to-indigo-500", label: "Blau → Indigo" },
  { value: "from-blue-500 via-indigo-500 to-purple-500", label: "Blau → Lila" },
  { value: "from-purple-400 via-pink-500 to-red-500", label: "Lila → Pink → Rot" },
  { value: "from-indigo-400 via-purple-500 to-purple-600", label: "Indigo → Lila" },
  { value: "from-indigo-500 via-purple-500 to-pink-500", label: "Indigo → Pink" },
  { value: "from-blue-400 via-indigo-500 to-purple-500", label: "Blau → Indigo → Lila" },
];

export const HOME_SERVICE_LINK_PRESETS = DEFAULT_HOME_SERVICES.map((s) => ({
  value: s.link,
  label: `${s.name} → ${s.link}`,
}));

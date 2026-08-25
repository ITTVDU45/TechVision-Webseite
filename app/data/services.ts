/**
 * Die acht Leistungen – eine Quelle für Startseite, Übersicht und Detailseiten.
 *
 * Vorher stand dieselbe Liste an mehreren Stellen leicht unterschiedlich im
 * Code. Wer eine Leistung umbenennt, soll das genau einmal tun müssen.
 *
 * `tools` nennt nur Technologien, die auf der Technologieseite ohnehin
 * ausgewiesen sind. Nichts hier ist eine Erfolgsbehauptung – Kennzahlen
 * gehören zu Referenzprojekten, nicht zu einer Leistungsbeschreibung.
 */

export interface ServiceProfile {
  id: string;
  title: string;
  href: string;
  /** Was die Leistung tut. Zwei Zeilen, kein Absatz. */
  description: string;
  /** Für wen sie gedacht ist – der Satz, der beim Einordnen hilft. */
  audience: string;
  /** Woran man merkt, dass man sie braucht. */
  trigger: string;
  /** Was am Ende vorliegt. */
  outcome: string;
  tools: string[];
  image: string;
  imageAlt: string;
}

export const services: ServiceProfile[] = [
  {
    id: "ki-transformation",
    title: "KI-Strategie & Entwicklung",
    href: "/ki-transformation",
    description:
      "Wir identifizieren belastbare Einsatzfelder und integrieren KI-Lösungen sicher in bestehende Abläufe und Systeme.",
    audience: "Für Unternehmen, die wissen wollen, wo KI trägt – und wo nicht.",
    trigger: "Es gibt viele Ideen, aber keine Einordnung, welche davon rechnet.",
    outcome: "Eine priorisierte Liste von Einsatzfeldern mit Aufwand, Nutzen und Risiko.",
    tools: ["OpenAI", "LangChain", "PyTorch"],
    image: "/images/KITransofmation.webp",
    imageAlt: "Arbeit an einer KI-gestützten Anwendung",
  },
  {
    id: "workflow-automation",
    title: "Workflow-Automatisierung",
    href: "/workflow-automation",
    description:
      "Wir verbinden Systeme und automatisieren wiederkehrende Prozesse nachvollziehbar, überwacht und wartbar.",
    audience: "Für Teams, die dieselben Daten mehrfach von Hand übertragen.",
    trigger: "Dieselbe Information wird in drei Werkzeugen gepflegt.",
    outcome: "Ein überwachter Ablauf, der die Handarbeit ersetzt und Fehler meldet.",
    tools: ["n8n", "Zapier", "Custom Workflows"],
    image: "/images/automation-dashboard.webp",
    imageAlt: "Übersicht eines automatisierten Ablaufs",
  },
  {
    id: "software-development",
    title: "Individuelle Software",
    href: "/software-development",
    description:
      "Wir entwickeln Web-, Backend- und Fachanwendungen für Abläufe, die mit Standardsoftware nicht sauber abbildbar sind.",
    audience: "Für Betriebe, deren Ablauf nicht in ein Standardprodukt passt.",
    trigger: "Das gekaufte System verbiegt den eigenen Ablauf statt ihn abzubilden.",
    outcome: "Eine Anwendung, die den tatsächlichen Ablauf abbildet – und dokumentiert ist.",
    tools: ["React", "Next.js", "Node.js", "TypeScript"],
    image: "/images/laptop-software-mockup.webp",
    imageAlt: "Individuell entwickelte Anwendung auf einem Notebook",
  },
  {
    id: "tools",
    title: "Tools & KI-Agenten",
    href: "/tools",
    description:
      "Wir wählen passende Werkzeuge aus, binden sie an bestehende Systeme an und betreiben KI-Agenten kontrolliert.",
    audience: "Für Teams, die Werkzeuge einsetzen wollen, ohne die Kontrolle abzugeben.",
    trigger: "Jede Abteilung nutzt ein anderes Werkzeug, und keines spricht mit dem nächsten.",
    outcome: "Eine überschaubare Werkzeuglandschaft mit geklärtem Datenfluss.",
    tools: ["OpenAI", "LangChain", "n8n"],
    image: "/images/KIAGENTBILD.webp",
    imageAlt: "Arbeit mit KI-Agenten im Unternehmenseinsatz",
  },
  {
    id: "cybersecurity",
    title: "Cybersecurity",
    href: "/cybersecurity",
    description:
      "Wir priorisieren Risiken und stärken Zugriffe, Backups, Systeme und Sicherheitsprozesse mit klarem Maßnahmenplan.",
    audience: "Für Unternehmen, deren Sicherheit aus Einzelwerkzeugen besteht.",
    trigger: "Es gibt Werkzeuge, aber keinen Plan, welches Risiko sie eigentlich abdecken.",
    outcome: "Ein Maßnahmenplan nach Priorität, mit benannter Zuständigkeit je Punkt.",
    tools: ["IT-Grundschutz", "ISO 27001"],
    image: "/images/cybersecurity.webp",
    imageAlt: "Abgesicherter Zugriff auf Unternehmenssysteme",
  },
  {
    id: "web-development",
    title: "Webentwicklung",
    href: "/web-development",
    description:
      "Wir bauen performante, barrierearme Websites und Webanwendungen mit tragfähigem SEO- und Tracking-Fundament.",
    audience: "Für alle, deren Website Anfragen bringen soll, nicht nur existieren.",
    trigger: "Die Seite ist da, aber sie bringt nichts – und niemand weiß, warum.",
    outcome: "Eine schnelle, auffindbare Seite, deren Wirkung messbar ist.",
    tools: ["React", "Next.js", "Tailwind"],
    image: "/images/cms-development.webp",
    imageAlt: "Arbeit an einer Website im Content-Management-System",
  },
  {
    id: "it-infrastructure",
    title: "IT-Infrastruktur",
    href: "/it-infrastructure",
    description:
      "Wir planen, betreiben und betreuen Netze, Server und Arbeitsplätze mit klarer Zuständigkeit.",
    audience: "Für Betriebe, deren IT gewachsen ist, ohne dass jemand sie verantwortet.",
    trigger: "Niemand kann sagen, was passiert, wenn ein bestimmter Server ausfällt.",
    outcome: "Eine dokumentierte Landschaft mit benannter Zuständigkeit und Notfallplan.",
    tools: ["AWS", "Docker", "Kubernetes"],
    image: "/images/system-integration-network.webp",
    imageAlt: "Vernetzte Systeme im Unternehmensbetrieb",
  },
  {
    id: "webhosting",
    title: "Hosting & Betrieb",
    href: "/webhosting",
    description:
      "Wir betreiben geschäftskritische Anwendungen zuverlässig – mit Monitoring, Backups und klarer Verantwortung.",
    audience: "Für Anwendungen, deren Ausfall unmittelbar Geld kostet.",
    trigger: "Der Betrieb läuft, aber niemand bemerkt einen Ausfall vor dem Kunden.",
    outcome: "Überwachter Betrieb mit Sicherungen und vereinbarter Reaktionszeit.",
    tools: ["Docker", "Kubernetes", "CI/CD"],
    image: "/images/multiple-devices-background.webp",
    imageAlt: "Betrieb einer Anwendung auf mehreren Geräten",
  },
];

/** Zugriff über die Route, z. B. für die jeweilige Detailseite. */
export const serviceByHref = Object.fromEntries(
  services.map((service) => [service.href, service]),
);

/** Zugriff über die Kennung. */
export const serviceById = Object.fromEntries(
  services.map((service) => [service.id, service]),
);

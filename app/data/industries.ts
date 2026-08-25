export interface IndustryProfile {
  id: string;
  name: string;
  shortLabel: string;
  description: string;
  challenge: string;
  approach: string;
  benefits: string[];
  capabilities: string[];
}

export const industryProfiles: IndustryProfile[] = [
  {
    id: "legal",
    name: "Rechtswesen",
    shortLabel: "Legal Tech",
    description: "Digitale Werkzeuge für Kanzleien und juristische Teams – mit besonderem Blick auf Vertraulichkeit, nachvollziehbare Prozesse und sichere Datenverarbeitung.",
    challenge: "Dokumente, Fristen und wiederkehrende Kommunikation binden viel Zeit, während Vertraulichkeit und Nachvollziehbarkeit jederzeit gewährleistet bleiben müssen.",
    approach: "Wir verbinden strukturierte Workflows, sichere Schnittstellen und bedarfsgerechte KI-Unterstützung mit den vorhandenen Fachprozessen.",
    benefits: ["Weniger manuelle Routinearbeit", "Besser nachvollziehbare Abläufe", "Sicherer Umgang mit sensiblen Informationen"],
    capabilities: ["Dokumenten-Workflows", "Sichere Mandantenportale", "KI-gestützte Recherche", "Systemintegration"],
  },
  {
    id: "retail",
    name: "Einzelhandel & E-Commerce",
    shortLabel: "Digital Commerce",
    description: "Verbundene Commerce-Lösungen für bessere Kundenerlebnisse, saubere Datenflüsse und effizientere operative Prozesse.",
    challenge: "Shop, Warenwirtschaft, CRM und Support arbeiten häufig mit getrennten Daten und erzeugen manuelle Übergaben oder inkonsistente Kundenerlebnisse.",
    approach: "Wir integrieren bestehende Systeme, automatisieren wiederkehrende Abläufe und entwickeln performante Weboberflächen entlang der Customer Journey.",
    benefits: ["Konsistentere Daten", "Schnellere Bearbeitung", "Skalierbare digitale Vertriebskanäle"],
    capabilities: ["Shop- und Portalentwicklung", "API-Integration", "Prozessautomatisierung", "Analytics & Reporting"],
  },
  {
    id: "railway",
    name: "Bahndienstleistungen",
    shortLabel: "Rail Operations",
    description: "Digitale Plattformen und robuste Prozesse für operative Dienstleister in einem anspruchsvollen, sicherheitsorientierten Umfeld.",
    challenge: "Verteilte Teams, dokumentationsintensive Abläufe und unterschiedliche Systeme erschweren einen aktuellen, einheitlichen Informationsstand.",
    approach: "Wir strukturieren operative Prozesse, schaffen belastbare Schnittstellen und entwickeln verständliche Werkzeuge für Planung, Dokumentation und Zusammenarbeit.",
    benefits: ["Mehr Transparenz im Betrieb", "Weniger Medienbrüche", "Verlässlichere Dokumentation"],
    capabilities: ["Operative Plattformen", "Mobile Datenerfassung", "Rollenbasierte Portale", "Systemintegration"],
  },
];

export function getIndustryProfile(id: string): IndustryProfile | undefined {
  return industryProfiles.find((industry) => industry.id === id);
}

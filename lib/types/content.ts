/**
 * Kanonische Inhaltstypen der Website.
 *
 * Einzige Quelle für die Begriffe, die auf mehreren Seiten vorkommen. Vorher war
 * jeder dieser Typen pro Leistungsseite neu definiert – mit auseinandergelaufenen
 * Formen (BlogPost existierte in drei unvereinbaren Varianten).
 *
 * Regel für Datumsangaben: im Datensatz immer ISO 8601 (YYYY-MM-DD), niemals
 * bereits formatierter Anzeigetext. Angezeigt werden Daten derzeit nirgends -
 * die Fachbeiträge tragen bewusst kein Datum. Das Feld bleibt, weil es
 * Sortierung ermöglicht; eine Formatierung gehört an die Ausgabestelle.
 */

/** Frage-Antwort-Paar. `icon` nutzt nur die Cybersecurity-Seite. */
export interface FAQ {
  question: string;
  answer: string;
  icon?: string;
}

/** Rubrik eines Artikels. */
export interface BlogCategory {
  name: string;
  /** Emoji oder Icon-Kennung. Optional, weil nicht jede Rubrik eines trägt. */
  icon?: string;
}

/** Artikel im Magazin – auch für die Teaser auf den Leistungsseiten. */
export interface BlogPost {
  id: string;
  slug?: string;
  title: string;
  subtitle?: string;
  description: string;
  image?: string;
  /** ISO 8601: YYYY-MM-DD. Dient der Sortierung, wird nicht angezeigt. */
  date: string;
  readTime?: string;
  category: BlogCategory;
  link?: string;
}

/** Kennzahl einer Referenz, z. B. { value: "90%", label: "Risikominderung" }. */
export interface CaseStat {
  value: string;
  label: string;
}

/** Referenzprojekt. */
export interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  stats: CaseStat[];
}

/**
 * Schritt in einem dargestellten Ablauf.
 *
 * Bewusst nicht vereinheitlicht mit dem Ablauf der KI-Transformationsseite:
 * der trägt Aufzählungspunkte statt Fließtext und ist damit ein anderer Typ.
 */
export interface ProcessStep {
  number?: string;
  icon?: string;
  title: string;
  description: string;
  color?: string;
  iconColor?: string;
}

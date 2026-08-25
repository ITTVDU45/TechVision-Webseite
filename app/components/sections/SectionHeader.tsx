import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Aufmacher einer Sektion.
 *
 * Ersetzt die pro Seite neu gebaute Kombination aus Eyebrow, Überschrift,
 * Fließtext und Button. Server-Komponente: hier gibt es nichts zu bedienen.
 */

interface SectionHeaderProps {
  /** Kurze Einordnung, z. B. "Leistungen". Erscheint über der Überschrift. */
  eyebrow?: string;
  title: ReactNode;
  /** Ein Satz, der die Überschrift erklärt – kein zweiter Absatz. */
  lead?: string;
  /** Optionaler Verweis rechts neben dem Aufmacher. */
  action?: { label: string; href: string };
  /**
   * "stack" setzt alles untereinander (schmale Sektionen),
   * "split" stellt den Fließtext rechts neben die Überschrift.
   */
  layout?: "stack" | "split";
  /** Ordnungsebene. Nur eine h1 pro Seite – die gehört in den Hero. */
  as?: "h1" | "h2" | "h3";
  id?: string;
}

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  action,
  layout = "stack",
  as: Heading = "h2",
  id,
}: SectionHeaderProps) {
  const headingSize = Heading === "h1" ? "t-h1" : "t-h2";

  if (layout === "split") {
    return (
      <div className="grid gap-x-12 gap-y-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
        <div>
          {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
          <Heading id={id} className={`heading-display mt-5 ${headingSize}`}>
            {title}
          </Heading>
        </div>
        <div className="flex flex-col items-start gap-6">
          {lead ? <p className="t-body measure text-[color:var(--ink-400)]">{lead}</p> : null}
          {action ? (
            <Link href={action.href} className="btn-secondary focus-ring shrink-0">
              {action.label}
            </Link>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
      <div className="measure">
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <Heading id={id} className={`heading-display mt-5 ${headingSize}`}>
          {title}
        </Heading>
        {lead ? (
          <p className="t-body mt-5 text-[color:var(--ink-400)]">{lead}</p>
        ) : null}
      </div>
      {action ? (
        <Link href={action.href} className="btn-secondary focus-ring shrink-0">
          {action.label}
        </Link>
      ) : null}
    </div>
  );
}

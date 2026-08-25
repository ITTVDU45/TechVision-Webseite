"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Ablauf mit Scroll-Fortschritt.
 *
 * Die Nummerierung ist hier berechtigt: Schritt 4 setzt Schritt 3 voraus.
 * Der senkrechte Balken zeigt, wie weit man im Ablauf ist - eine Information,
 * die es vorher nicht gab, weil alle fünf Schritte als gleichrangige Kacheln
 * nebeneinanderstanden.
 *
 * Client-Komponente allein wegen der Beobachtung des Sichtbereichs. Der
 * Inhalt kommt als Prop aus einer Server-Komponente und steht im HTML.
 */

export interface FlowStep {
  title: string;
  description: string;
}

export default function ProcessFlow({ steps }: { steps: FlowStep[] }) {
  const [reached, setReached] = useState(0);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const index = Number((entry.target as HTMLElement).dataset.index);
          // Nur vorwärts: Beim Zurückscrollen soll der Balken nicht zappeln.
          setReached((prev) => (index > prev ? index : prev));
        }
      },
      { rootMargin: "-45% 0px -45% 0px" },
    );

    for (const node of itemRefs.current) {
      if (node) observer.observe(node);
    }
    return () => observer.disconnect();
  }, []);

  const progress = steps.length > 1 ? (reached / (steps.length - 1)) * 100 : 0;

  return (
    <div className="relative">
      {/* Schiene und Fortschritt. Nur Deko - die Reihenfolge steht als
          <ol> ohnehin in der Struktur. */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-[7px] top-2 hidden w-px bg-[color:var(--line-strong)] sm:block"
      >
        <div
          className="w-px bg-[color:var(--brand-400)] transition-[height] duration-700 ease-out motion-reduce:transition-none"
          style={{ height: `${progress}%` }}
        />
      </div>

      <ol className="flex flex-col">
        {steps.map((step, index) => {
          const done = index <= reached;
          return (
            <li
              key={step.title}
              data-index={index}
              ref={(node) => {
                itemRefs.current[index] = node;
              }}
              className="relative grid gap-x-8 gap-y-3 py-8 sm:grid-cols-[auto_minmax(0,1fr)] sm:pl-0"
            >
              <div className="flex items-center gap-4 sm:block">
                <span
                  aria-hidden="true"
                  className={`block h-[15px] w-[15px] shrink-0 rounded-full border-2 transition-colors duration-500 ${
                    done
                      ? "border-[color:var(--brand-400)] bg-[color:var(--brand-400)]"
                      : "border-[color:var(--ink-600)] bg-[color:var(--ink-950)]"
                  }`}
                />
              </div>

              <div className="measure sm:-mt-1">
                <p className="t-small font-mono tabular-nums text-[color:var(--ink-500)]">
                  Schritt {index + 1} von {steps.length}
                </p>
                <h3 className="heading-display t-h4 mt-2">{step.title}</h3>
                <p className="t-body mt-3 text-[color:var(--ink-400)]">{step.description}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

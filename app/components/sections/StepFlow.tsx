/**
 * Ablauf in Schritten.
 *
 * Hier ist Nummerierung berechtigt, weil die Reihenfolge Information trägt:
 * Schritt 3 setzt Schritt 2 voraus. Auf Kachelrastern, die nur Leistungen
 * nebeneinanderstellen, ist sie es nicht – dort suggeriert "01, 02, 03" eine
 * Abfolge, die es nicht gibt.
 */

export interface Step {
  title: string;
  description: string;
  /** Was am Ende dieses Schritts vorliegt. Optional, aber wertvoll. */
  outcome?: string;
}

interface StepFlowProps {
  steps: Step[];
  /** "vertical" für lange Beschreibungen, "horizontal" für knappe. */
  orientation?: "vertical" | "horizontal";
}

export default function StepFlow({ steps, orientation = "vertical" }: StepFlowProps) {
  if (orientation === "horizontal") {
    return (
      <ol className="grid gap-px overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--line-strong)] sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <li key={step.title} className="flex flex-col bg-[color:var(--ink-950)] p-7">
            <span className="t-small font-mono font-bold tabular-nums text-[color:var(--brand-400)]">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="heading-display t-h4 mt-4">{step.title}</h3>
            <p className="t-small mt-3 flex-1 leading-relaxed text-[color:var(--ink-400)]">
              {step.description}
            </p>
            {step.outcome ? (
              <p className="t-small mt-5 border-t border-[color:var(--line)] pt-4 text-[color:var(--accent-400)]">
                {step.outcome}
              </p>
            ) : null}
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol className="flex flex-col">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="grid gap-x-8 gap-y-3 border-t border-[color:var(--line-strong)] py-8 sm:grid-cols-[auto_minmax(0,1fr)] last:border-b"
        >
          <span
            aria-hidden="true"
            className="heading-display text-[color:var(--ink-600)] tabular-nums sm:w-16"
            style={{ fontSize: "var(--step-3)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </span>
          <div className="measure">
            <h3 className="heading-display t-h4">
              <span className="sr-only">Schritt {index + 1}: </span>
              {step.title}
            </h3>
            <p className="t-body mt-3 text-[color:var(--ink-400)]">{step.description}</p>
            {step.outcome ? (
              <p className="t-small mt-4 text-[color:var(--accent-400)]">
                <span className="text-[color:var(--ink-500)]">Ergebnis: </span>
                {step.outcome}
              </p>
            ) : null}
          </div>
        </li>
      ))}
    </ol>
  );
}

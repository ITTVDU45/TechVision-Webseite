/**
 * Zahlenband.
 *
 * Kennzahlen als Zahl, nicht als Kachel. Eine Zahl mit Beschriftung braucht
 * keinen Rahmen, keinen Farbverlauf und keine Hover-Anhebung – sie muss nur
 * groß genug sein, um im Vorbeiscrollen gelesen zu werden.
 */

export interface Stat {
  value: string;
  label: string;
  /** Woher die Zahl stammt. Eine Kennzahl ohne Herkunft ist Behauptung. */
  source?: string;
}

interface StatBandProps {
  stats: Stat[];
  /** "quiet" ohne Trennlinien, "ruled" mit senkrechten Linien dazwischen. */
  variant?: "quiet" | "ruled";
}

export default function StatBand({ stats, variant = "ruled" }: StatBandProps) {
  return (
    <dl
      className={
        variant === "ruled"
          ? "grid gap-px overflow-hidden bg-[color:var(--line-strong)] sm:grid-cols-2 lg:grid-cols-4"
          : "grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
      }
    >
      {stats.map((stat) => (
        <div
          key={stat.label}
          className={variant === "ruled" ? "bg-[color:var(--ink-950)] px-6 py-8" : ""}
        >
          <dt className="sr-only">{stat.label}</dt>
          <dd>
            <span
              className="heading-display block tabular-nums text-[color:var(--brand-300)]"
              style={{ fontSize: "var(--step-4)" }}
            >
              {stat.value}
            </span>
            <span className="t-small mt-3 block leading-snug text-[color:var(--ink-300)]">
              {stat.label}
            </span>
            {stat.source ? (
              <span className="t-small mt-2 block text-[color:var(--ink-500)]">
                {stat.source}
              </span>
            ) : null}
          </dd>
        </div>
      ))}
    </dl>
  );
}

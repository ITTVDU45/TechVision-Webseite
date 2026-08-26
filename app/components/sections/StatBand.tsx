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
        // Wert oben, Beschriftung darunter - über die Reihenfolge im Layout,
        // damit <dt>/<dd> korrekt bleiben und die Beschriftung nicht doppelt
        // vorgelesen wird. Genau ein <div> je Gruppe, so erlaubt es <dl>.
        <div
          key={stat.label}
          className={`flex flex-col-reverse ${
            variant === "ruled" ? "bg-[color:var(--ink-950)] px-6 py-8" : ""
          }`}
        >
          <dt className="t-small mt-3 leading-snug text-[color:var(--ink-300)]">
            {stat.label}
            {stat.source ? (
              <span className="mt-2 block text-[color:var(--ink-500)]">{stat.source}</span>
            ) : null}
          </dt>
          <dd
            className="heading-display tabular-nums text-[color:var(--brand-300)]"
            style={{ fontSize: "var(--step-4)" }}
          >
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

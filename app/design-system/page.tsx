import type { Metadata } from "next";
import { SectionHeader, SplitFeature, StepFlow, StatBand } from "@/components/sections";

/**
 * Interne Musterseite für das Gestaltungssystem.
 *
 * Zeigt Tokens, Schriftgrade und die Sektionsbausteine an einer Stelle, damit
 * Abweichungen auffallen, bevor sie sich über zwanzig Seiten verteilen.
 * Nicht für Besucher gedacht – daher aus dem Index genommen.
 */

export const metadata: Metadata = {
  title: "Gestaltungssystem",
  robots: { index: false, follow: false },
};

const farben = [
  ["--brand-300", "#7dd3fc", "11,90:1"],
  ["--brand-400", "#38bdf8", "9,26:1"],
  ["--brand-500", "#0ea5e9", "7,16:1"],
  ["--brand-600", "#0284c7", "4,84:1"],
  ["--accent-400", "#34d399", "10,32:1"],
  ["--ink-200", "#e2e8f0", "16,09:1"],
  ["--ink-300", "#cbd5e1", "13,36:1"],
  ["--ink-400", "#94a3b8", "7,74:1"],
  ["--ink-500", "#64748b", "4,17:1"],
  ["--ink-600", "#33415c", "1,94:1"],
];

const grade = [
  ["t-display", "--step-5", "Hero, einmal pro Seite"],
  ["t-h1", "--step-4", "Seitentitel"],
  ["t-h2", "--step-3", "Sektionsüberschrift"],
  ["t-h3", "--step-2", "Themenüberschrift"],
  ["t-h4", "--step-1", "Karten- und Schrittüberschrift"],
  ["t-body", "--step-0", "Fließtext"],
  ["t-small", "--step--1", "Metatext, Beschriftungen"],
];

const schritte = [
  { title: "Einordnen", description: "Wir sichten Abläufe, Systeme und Daten und benennen, wo der Engpass wirklich sitzt.", outcome: "Priorisierte Liste mit Aufwand und Wirkung" },
  { title: "Entwerfen", description: "Wir skizzieren die Lösung so weit, dass Aufwand und Risiko belastbar werden – nicht weiter.", outcome: "Entwurf, Schnittstellen, Festpreisrahmen" },
  { title: "Bauen", description: "Umsetzung in kurzen Abschnitten, jeder Abschnitt läuft am Ende in Ihrer Umgebung.", outcome: "Lauffähige Software, dokumentiert" },
  { title: "Betreiben", description: "Überwachung, Sicherungen und Weiterentwicklung mit klarer Zuständigkeit.", outcome: "Vereinbarte Reaktionszeiten" },
];

const zahlen = [
  { value: "97 %", label: "kleinere Bilddateien nach Konvertierung", source: "93,3 auf 7,4 MB" },
  { value: "8.011", label: "Zeilen toter Code entfernt", source: "56 Dateien" },
  { value: "53 → 25", label: "Pakete im Projekt", source: "Phase 0" },
  { value: "14 → 1", label: "Definitionen für „Blogartikel“", source: "gemeinsames Modell" },
];

export default function DesignSystemPage() {
  return (
    <main className="bg-[color:var(--ink-950)] pb-32">
      <section className="section-y section-container">
        <SectionHeader
          as="h1"
          eyebrow="Intern"
          title="Gestaltungssystem"
          lead="Tokens, Schriftgrade und Sektionsbausteine an einer Stelle. Wer hier eine Form nicht findet, soll sie nicht erfinden, sondern ergänzen."
        />
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">Farben</h2>
        <p className="t-small measure mt-4 text-[color:var(--ink-400)]">
          Kontrast gegen den Seitengrund. Ab 4,5:1 für Fließtext, ab 3:1 für
          große Schrift. Alles darunter trägt keinen Text.
        </p>
        <ul className="mt-8 grid gap-px bg-[color:var(--line-strong)] sm:grid-cols-2 lg:grid-cols-5">
          {farben.map(([token, hex, kontrast]) => (
            <li key={token} className="bg-[color:var(--ink-950)] p-5">
              <span className="block h-12 w-full rounded" style={{ background: hex }} />
              <code className="t-small mt-4 block font-mono text-[color:var(--ink-300)]">{token}</code>
              <span className="t-small block text-[color:var(--ink-500)]">{hex}</span>
              <span className="t-small block tabular-nums text-[color:var(--ink-400)]">{kontrast}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">Schriftgrade</h2>
        <div className="mt-8 flex flex-col">
          {grade.map(([klasse, token, zweck]) => (
            <div key={klasse} className="grid gap-2 border-t border-[color:var(--line)] py-6 sm:grid-cols-[minmax(0,1fr)_14rem] sm:items-baseline">
              <p className={`heading-display ${klasse}`}>Software, KI und Automatisierung</p>
              <p className="t-small font-mono text-[color:var(--ink-500)]">
                .{klasse} · {token}
                <span className="mt-1 block font-sans text-[color:var(--ink-400)]">{zweck}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">SplitFeature</h2>
        <p className="t-small measure mt-4 text-[color:var(--ink-400)]">
          Für ein Thema, das Gewicht hat. Der Gegenentwurf zur Kachelreihe.
        </p>
        <div className="mt-10">
          <SplitFeature
            eyebrow="Referenz"
            title="Projektplattform für die Bauplanung"
            body="Terminketten, Dokumente und Freigaben lagen in getrennten Werkzeugen. Wir haben sie in einer Plattform zusammengeführt, die den bestehenden Ablauf abbildet statt ihn zu ersetzen."
            points={[
              "Freigaben nachvollziehbar statt per E-Mail",
              "Termine und Dokumente an einem Ort",
              "Anbindung an die vorhandene Buchhaltung",
            ]}
            image={{ src: "/images/planen-project-platform.webp", alt: "Projektplattform für die Bauplanung", width: 1200, height: 800 }}
            action={{ label: "Referenz ansehen", href: "/case-studies" }}
          />
        </div>
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">StepFlow</h2>
        <p className="t-small measure mt-4 text-[color:var(--ink-400)]">
          Nummeriert, weil die Reihenfolge hier wirklich etwas bedeutet.
        </p>
        <div className="mt-10">
          <StepFlow steps={schritte} />
        </div>
        <div className="mt-16">
          <p className="t-small text-[color:var(--ink-500)]">Variante „horizontal“ für knappe Beschreibungen:</p>
          <div className="mt-6">
            <StepFlow steps={schritte} orientation="horizontal" />
          </div>
        </div>
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">StatBand</h2>
        <p className="t-small measure mt-4 text-[color:var(--ink-400)]">
          Zahlen als Zahlen. Die Herkunftszeile ist kein Beiwerk – eine
          Kennzahl ohne Herkunft ist eine Behauptung.
        </p>
        <div className="mt-10">
          <StatBand stats={zahlen} />
        </div>
      </section>

      <section className="section-y-tight section-container">
        <h2 className="eyebrow">Schaltflächen</h2>
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <button type="button" className="btn-primary focus-ring">Kostenloses Erstgespräch</button>
          <button type="button" className="btn-secondary focus-ring">Referenzen ansehen</button>
          <a href="#" className="focus-ring t-small rounded font-semibold text-[color:var(--brand-300)] hover:text-[color:var(--brand-200)]">
            Textlink →
          </a>
        </div>
      </section>
    </main>
  );
}

import Link from "next/link";
import HeroBackdrop from "./hero/HeroBackdrop";

/**
 * Hero der Startseite.
 *
 * Server-Komponente: Überschrift, Fließtext und Verweise stehen im
 * ausgelieferten HTML. Nur der 3D-Hintergrund ist Client-Code und wird
 * nachgeladen - sichtbar ist die Aussage also sofort, unabhängig davon,
 * ob und wann WebGL startet.
 */

const trustPoints = [
  "KI-Beratung nach BSI IT-Grundschutz",
  "Individualsoftware & System-Integration",
  "Prozessautomatisierung & KI-Agenten",
  "Deutscher Anbieter · DSGVO-konform",
];

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[92dvh] w-full items-center overflow-hidden bg-[color:var(--ink-950)]"
    >
      <HeroBackdrop />

      {/* Liegt über dem Gitter und hält den Text lesbar, egal was darunter
          passiert. Auch ohne WebGL trägt der Verlauf die Fläche. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(14,165,233,0.10),transparent_55%),linear-gradient(180deg,rgba(5,10,18,0.72)_0%,rgba(5,10,18,0.55)_45%,rgba(5,10,18,0.94)_100%)]"
      />

      <div className="section-container relative z-10 pb-20 pt-32 md:pb-28 md:pt-36">
        <div className="max-w-4xl">
          <p className="eyebrow">IT · KI · Automatisierung</p>

          <h1 className="heading-display t-display mt-6">
            Software, KI und Automatisierung –{" "}
            <span className="text-[color:var(--brand-300)]">gebaut für messbare Ergebnisse.</span>
          </h1>

          <p className="t-body measure mt-7 text-[color:var(--ink-300)]">
            Wir konzipieren, entwickeln und betreiben individuelle Softwarelösungen, KI-Agenten und
            Prozessautomatisierung für mittelständische Unternehmen – strategisch, integrativ und
            langfristig verlässlich.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary focus-ring">
              Kostenloses Erstgespräch <span aria-hidden="true">↗</span>
            </Link>
            <Link href="#referenz" className="btn-secondary focus-ring">
              Referenzen ansehen
            </Link>
          </div>

          <ul className="mt-12 flex flex-wrap gap-x-6 gap-y-3" aria-label="Kompetenzbereiche">
            {trustPoints.map((point) => (
              <li
                key={point}
                className="t-small flex items-center gap-2.5 text-[color:var(--ink-400)]"
              >
                <span
                  aria-hidden="true"
                  className="h-px w-4 bg-[color:var(--brand-400)]"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

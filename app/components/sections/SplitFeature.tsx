import Image from "next/image";
import Link from "next/link";

/**
 * Bild und Text nebeneinander – der Gegenentwurf zur Kachelreihe.
 *
 * Ein Thema bekommt hier die ganze Breite statt ein Drittel davon. Genau das
 * fehlte bisher: Es gab nur eine Darstellungsform, und die machte jede Aussage
 * gleich groß.
 */

interface SplitFeatureProps {
  eyebrow?: string;
  title: string;
  /** Zwei bis vier Sätze. Mehr gehört auf eine eigene Seite. */
  body: string;
  /** Stichpunkte, die den Fließtext ergänzen – nicht wiederholen. */
  points?: string[];
  image: { src: string; alt: string; width: number; height: number };
  action?: { label: string; href: string };
  /** "right" stellt das Bild nach rechts. Bei Reihen abwechselnd einsetzen. */
  imageSide?: "left" | "right";
  /**
   * Nur für das erste Bild oberhalb der Falz. Sonst weggelassen, damit die
   * Priorität dort bleibt, wo sie zählt.
   */
  priority?: boolean;
}

export default function SplitFeature({
  eyebrow,
  title,
  body,
  points,
  image,
  action,
  imageSide = "right",
  priority = false,
}: SplitFeatureProps) {
  return (
    <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={imageSide === "right" ? "lg:order-1" : "lg:order-2"}>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h3 className="heading-display t-h3 mt-5">{title}</h3>
        <p className="t-body measure mt-5 text-[color:var(--ink-300)]">{body}</p>

        {points?.length ? (
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex gap-3 text-[color:var(--ink-400)]">
                <span
                  aria-hidden="true"
                  className="mt-2.5 h-px w-4 shrink-0 bg-[color:var(--brand-400)]"
                />
                <span className="t-small leading-relaxed">{point}</span>
              </li>
            ))}
          </ul>
        ) : null}

        {action ? (
          <Link
            href={action.href}
            className="focus-ring t-small mt-8 inline-flex items-center gap-2 rounded font-semibold text-[color:var(--brand-300)] transition-colors hover:text-[color:var(--brand-200)]"
          >
            {action.label}
            <span aria-hidden="true">→</span>
          </Link>
        ) : null}
      </div>

      <figure
        className={`relative overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)] ${
          imageSide === "right" ? "lg:order-2" : "lg:order-1"
        }`}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={image.width}
          height={image.height}
          priority={priority}
          sizes="(min-width: 1024px) 42rem, 100vw"
          className="h-auto w-full object-cover"
        />
      </figure>
    </div>
  );
}

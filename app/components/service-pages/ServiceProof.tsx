import Image from "next/image";
import Link from "next/link";
import type { ServiceProfile } from "@/app/data/services";

/**
 * Beleg-Sektion einer Leistungsseite.
 *
 * Schließt die auffälligste Lücke der acht Leistungsseiten: Sie enthielten
 * zusammen null Bilder. Jede Seite bekommt hier eine Aufnahme, die benannten
 * Werkzeuge und den Satz, was am Ende vorliegt.
 *
 * Bewusst ohne Kennzahl: Prozentwerte gehören zu einem konkreten Projekt und
 * damit auf die Referenzseite. Eine Zahl an einer Leistungsbeschreibung wäre
 * eine Behauptung ohne Bezug.
 */

interface ServiceProofProps {
  service: ServiceProfile;
  /** Passende Referenz, falls es eine gibt. */
  reference?: { title: string; href: string };
}

export default function ServiceProof({ service, reference }: ServiceProofProps) {
  return (
    <section className="section-y hairline-top" aria-labelledby={`proof-${service.id}`}>
      <div className="section-container">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <figure className="relative overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)]">
            <Image
              src={service.image}
              alt={service.imageAlt}
              width={1200}
              height={800}
              sizes="(min-width: 1024px) 36rem, 100vw"
              className="h-auto w-full object-cover"
            />
          </figure>

          <div>
            <p className="eyebrow">In der Praxis</p>
            <h2 id={`proof-${service.id}`} className="heading-display t-h3 mt-5">
              {service.trigger}
            </h2>

            <p className="t-body measure mt-5 text-[color:var(--ink-300)]">
              {service.description}
            </p>

            <dl className="mt-9 flex flex-col gap-6">
              <div className="border-t border-[color:var(--line)] pt-5">
                <dt className="t-small font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-500)]">
                  Womit wir arbeiten
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {service.tools.map((tool) => (
                    <span
                      key={tool}
                      className="t-small rounded border border-[color:var(--line-strong)] px-2.5 py-1 text-[color:var(--ink-300)]"
                    >
                      {tool}
                    </span>
                  ))}
                </dd>
              </div>

              <div className="border-t border-[color:var(--line)] pt-5">
                <dt className="t-small font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-500)]">
                  Was am Ende vorliegt
                </dt>
                <dd className="t-body mt-3 text-[color:var(--accent-300)]">{service.outcome}</dd>
              </div>
            </dl>

            {reference ? (
              <Link
                href={reference.href}
                className="focus-ring t-small mt-9 inline-flex items-center gap-2 rounded font-semibold text-[color:var(--brand-300)] hover:text-[color:var(--brand-200)]"
              >
                Referenz: {reference.title}
                <span aria-hidden="true">→</span>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}

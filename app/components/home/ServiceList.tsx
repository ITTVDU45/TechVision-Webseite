"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

/**
 * Leistungen als geführte Liste.
 *
 * Ersetzt sieben gleich große Kacheln mit der Beschriftung "Leistung 01" bis
 * "Leistung 07". Die Nummerierung suggerierte eine Reihenfolge, die es nicht
 * gibt, und jede Kachel beanspruchte gleich viel Aufmerksamkeit.
 *
 * Als Liste führt die Typografie: Der Name der Leistung ist groß, alles
 * andere ordnet sich unter. Auf breiten Fenstern zeigt die rechte Spalte
 * das Bild zur gerade betrachteten Zeile - auf schmalen entfällt sie, weil
 * dort ohnehin nur eine Zeile im Blick ist.
 */

export interface ServiceEntry {
  title: string;
  description: string;
  href: string;
  /** Für wen die Leistung gedacht ist – der Satz, der beim Einordnen hilft. */
  audience: string;
  image: string;
}

export default function ServiceList({ services }: { services: ServiceEntry[] }) {
  const [active, setActive] = useState(0);
  const current = services[active] ?? services[0];

  return (
    <div className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-16">
      <ul className="flex flex-col">
        {services.map((service, index) => (
          <li key={service.href}>
            <Link
              href={service.href}
              onMouseEnter={() => setActive(index)}
              onFocus={() => setActive(index)}
              className="focus-ring group block border-t border-[color:var(--line)] py-6 transition-colors last:border-b hover:border-[color:var(--line-strong)]"
            >
              <div className="flex items-baseline justify-between gap-6">
                <h3
                  className={`heading-display t-h3 transition-colors ${
                    index === active
                      ? "text-[color:var(--brand-300)]"
                      : "text-[color:var(--ink-200)] group-hover:text-[color:var(--brand-300)]"
                  }`}
                >
                  {service.title}
                </h3>
                <span
                  aria-hidden="true"
                  className="t-h4 shrink-0 text-[color:var(--ink-600)] transition-all group-hover:translate-x-1 group-hover:text-[color:var(--brand-400)]"
                >
                  →
                </span>
              </div>
              <p className="t-small measure mt-2 text-[color:var(--ink-400)]">
                {service.description}
              </p>
              <p className="t-small mt-2 text-[color:var(--ink-500)]">{service.audience}</p>
            </Link>
          </li>
        ))}
      </ul>

      {/* Rein illustrativ - die Information steht vollständig in der Liste. */}
      <div
        aria-hidden="true"
        className="relative hidden aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)] lg:block"
      >
        {services.map((service, index) => (
          <Image
            key={service.href}
            src={service.image}
            alt=""
            fill
            sizes="(min-width: 1024px) 32rem, 0px"
            className={`object-cover transition-opacity duration-500 ${
              index === active ? "opacity-100" : "opacity-0"
            }`}
            priority={index === 0}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--ink-950)] via-transparent to-transparent" />
        <p className="absolute bottom-5 left-6 right-6 t-small font-semibold text-[color:var(--ink-200)]">
          {current.title}
        </p>
      </div>
    </div>
  );
}

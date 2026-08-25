import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CTA from "../components/CTA";
import { SectionHeader } from "@/components/sections";
import { services } from "../data/services";

/**
 * Leistungsübersicht.
 *
 * Gab es bisher nicht – es führte nur die Sektion auf der Startseite direkt
 * auf acht Einzelseiten. Diese Seite nimmt der Startseite die Last, alles
 * erklären zu müssen, und gibt jeder Leistung so viel Raum, dass man sie
 * einordnen kann, ohne sie anzuklicken.
 *
 * Server-Komponente: hier gibt es nichts zu bedienen.
 */

export const metadata: Metadata = {
  title: "Leistungen",
  description:
    "Acht Leistungen von KI-Strategie bis Betrieb – wofür sie gedacht sind, woran man den Bedarf erkennt und was am Ende vorliegt.",
  alternates: { canonical: "/leistungen" },
};

export default function LeistungenPage() {
  return (
    <div className="min-h-screen w-full bg-[color:var(--ink-950)] text-[color:var(--ink-200)]">
      <Header />
      <main className="pt-24">
        <section className="section-y">
          <div className="section-container">
            <SectionHeader
              as="h1"
              eyebrow="Leistungen"
              title="Acht Leistungen, ein Ansprechpartner."
              lead="Sie müssen nicht wissen, welche davon Sie brauchen. Jede Beschreibung nennt, woran man den Bedarf erkennt und was am Ende vorliegt."
              action={{ label: "Erstgespräch vereinbaren", href: "/contact" }}
            />
          </div>
        </section>

        <section className="section-container pb-24">
          <ul className="flex flex-col">
            {services.map((service, index) => (
              <li key={service.id}>
                <article className="grid items-center gap-8 border-t border-[color:var(--line-strong)] py-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-14">
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <h2 className="heading-display t-h3">
                      <Link
                        href={service.href}
                        className="focus-ring rounded transition-colors hover:text-[color:var(--brand-300)]"
                      >
                        {service.title}
                      </Link>
                    </h2>

                    <p className="t-body measure mt-4 text-[color:var(--ink-300)]">
                      {service.description}
                    </p>

                    <dl className="mt-7 grid gap-5 sm:grid-cols-2">
                      <div>
                        <dt className="t-small font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-500)]">
                          Wann sinnvoll
                        </dt>
                        <dd className="t-small mt-2 text-[color:var(--ink-400)]">
                          {service.trigger}
                        </dd>
                      </div>
                      <div>
                        <dt className="t-small font-semibold uppercase tracking-[0.14em] text-[color:var(--ink-500)]">
                          Ergebnis
                        </dt>
                        <dd className="t-small mt-2 text-[color:var(--accent-300)]">
                          {service.outcome}
                        </dd>
                      </div>
                    </dl>

                    <p className="t-small mt-6 text-[color:var(--ink-500)]">
                      {service.tools.join(" · ")}
                    </p>

                    <Link
                      href={service.href}
                      className="focus-ring t-small mt-7 inline-flex items-center gap-2 rounded font-semibold text-[color:var(--brand-300)] hover:text-[color:var(--brand-200)]"
                    >
                      {service.title} im Detail
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>

                  <Link
                    href={service.href}
                    tabIndex={-1}
                    aria-hidden="true"
                    className={`relative block aspect-[4/3] overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)] ${
                      index % 2 === 1 ? "lg:order-1" : ""
                    }`}
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22rem, 100vw"
                      className="object-cover transition-transform duration-500 motion-safe:hover:scale-[1.03]"
                      priority={index === 0}
                    />
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        </section>

        <CTA />
      </main>
      <Footer />
    </div>
  );
}

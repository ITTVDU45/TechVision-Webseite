import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import CTA from "@/app/components/CTA";
import { getIndustryProfile, industryProfiles } from "@/app/data/industries";

interface PageProps { params: Promise<{ id: string }> }

export function generateStaticParams() {
  return industryProfiles.map(({ id }) => ({ id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const industry = getIndustryProfile(id);
  return industry ? { title: industry.name, description: industry.description } : {};
}

export default async function IndustrySolutionDetailPage({ params }: PageProps) {
  const { id } = await params;
  const industry = getIndustryProfile(id);
  if (!industry) notFound();

  return (
    <div className="min-h-screen bg-[color:var(--ink-950)] text-white">
      <Header />
      <main>
        <section className="border-b border-[color:var(--line)] pb-16 pt-36 sm:pb-20 sm:pt-44">
          <div className="section-container grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <div>
              <p className="eyebrow">{industry.shortLabel}</p>
              <h1 className="heading-display t-h1 mt-6 break-words [hyphens:auto]">Digitale Lösungen für {industry.name}.</h1>
              <p className="t-body measure mt-7 text-[color:var(--ink-300)]">{industry.description}</p>
              {industry.reference ? (
                <Link href={industry.reference.href} className="focus-ring t-small mt-8 inline-flex items-center gap-2 rounded font-semibold text-[color:var(--brand-300)] hover:text-[color:var(--brand-200)]">
                  Referenz aus dieser Branche: {industry.reference.title}
                  <span aria-hidden="true">→</span>
                </Link>
              ) : null}
            </div>
            <figure className="relative overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)]">
              <Image src={industry.image} alt={industry.imageAlt} width={1200} height={800} priority sizes="(min-width: 1024px) 32rem, 100vw" className="h-auto w-full object-cover" />
            </figure>
          </div>
        </section>

        <section className="section-y bg-[#070b13]">
          <div className="section-container grid gap-5 lg:grid-cols-3">
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Herausforderung</p><p className="mt-5 leading-7 text-slate-300">{industry.challenge}</p></article>
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">Unser Ansatz</p><p className="mt-5 leading-7 text-slate-300">{industry.approach}</p></article>
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-300">Betrieblicher Nutzen</p><ul className="mt-5 space-y-3 text-sm text-slate-300">{industry.benefits.map((benefit) => <li key={benefit} className="flex gap-3"><span className="text-emerald-300" aria-hidden="true">✓</span>{benefit}</li>)}</ul></article>
          </div>
        </section>

        <section className="section-y-tight bg-[color:var(--ink-950)]">
          <div className="section-container grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="eyebrow">Mögliche Bausteine</p><h2 className="heading-display mt-5 text-3xl sm:text-4xl">Passend kombiniert statt pauschal verkauft.</h2></div>
            <ul className="grid gap-3 sm:grid-cols-2">{industry.capabilities.map((capability) => <li key={capability} className="surface-card flex min-h-20 items-center px-5 text-sm font-semibold text-slate-200">{capability}</li>)}</ul>
          </div>
        </section>
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

import type { Metadata } from "next";
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
    <div className="min-h-screen bg-[#050912] text-white">
      <Header />
      <main>
        <section className="border-b border-white/[0.07] pb-16 pt-36 sm:pb-20 sm:pt-44">
          <div className="section-container">
            <p className="eyebrow">{industry.shortLabel}</p>
            <h1 className="heading-display mt-6 max-w-5xl break-words text-4xl [hyphens:auto] sm:text-6xl lg:text-7xl">Digitale Lösungen für {industry.name}.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300">{industry.description}</p>
          </div>
        </section>

        <section className="section-y bg-[#070b13]">
          <div className="section-container grid gap-5 lg:grid-cols-3">
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-slate-500">Herausforderung</p><p className="mt-5 leading-7 text-slate-300">{industry.challenge}</p></article>
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-sky-300">Unser Ansatz</p><p className="mt-5 leading-7 text-slate-300">{industry.approach}</p></article>
            <article className="surface-card p-7"><p className="text-xs font-semibold uppercase tracking-[.16em] text-emerald-300">Betrieblicher Nutzen</p><ul className="mt-5 space-y-3 text-sm text-slate-300">{industry.benefits.map((benefit) => <li key={benefit} className="flex gap-3"><span className="text-emerald-300" aria-hidden="true">✓</span>{benefit}</li>)}</ul></article>
          </div>
        </section>

        <section className="section-y-tight bg-[#050912]">
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

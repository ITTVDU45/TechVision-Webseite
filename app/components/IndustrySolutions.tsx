import Link from "next/link";
import { industryProfiles } from "@/app/data/industries";

export default function IndustrySolutions() {
  return (
    <>
      <section className="relative overflow-hidden border-b border-white/[0.07] bg-[#050912] pb-16 pt-36 sm:pb-20 sm:pt-44">
        <div className="section-container">
          <div className="max-w-4xl">
            <p className="eyebrow">Branchenkompetenz</p>
            <h1 className="heading-display mt-6 text-4xl sm:text-6xl lg:text-7xl">Technologie im Kontext Ihrer Abläufe.</h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">Wir übertragen technische Möglichkeiten nicht schematisch, sondern auf reale Prozesse, Anforderungen und Sicherheitsbedürfnisse Ihrer Branche.</p>
          </div>
        </div>
      </section>

      <section className="section-y bg-[#070b13]" aria-labelledby="industries-heading">
        <div className="section-container">
          <div className="max-w-2xl">
            <h2 id="industries-heading" className="heading-display text-3xl sm:text-5xl">Ausgewählte Branchenfelder</h2>
            <p className="mt-5 leading-7 text-slate-400">Jede Lösung beginnt mit dem Verständnis des konkreten Engpasses.</p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {industryProfiles.map((industry, index) => (
              <article key={industry.id} className="surface-card surface-card--hover flex flex-col p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{industry.shortLabel}</span>
                  <span className="text-sm text-slate-600" aria-hidden="true">0{index + 1}</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold text-white">{industry.name}</h3>
                <p className="mt-4 flex-1 text-sm leading-7 text-slate-400">{industry.description}</p>
                <Link href={`/industry-solutions/${industry.id}`} className="focus-ring mt-7 inline-flex items-center gap-2 rounded-md text-sm font-semibold text-sky-300 hover:text-sky-200">
                  Branchenlösung ansehen <span aria-hidden="true">→</span>
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

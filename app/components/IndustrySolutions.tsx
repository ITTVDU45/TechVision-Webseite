import Image from "next/image";
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
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {industryProfiles.map((industry) => (
              <li key={industry.id}>
                <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--line-strong)] bg-[color:var(--ink-900)]">
                  <div className="relative aspect-[16/10] bg-[color:var(--ink-850)]">
                    <Image
                      src={industry.image}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24rem, 100vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                    <p className="eyebrow eyebrow--bare">{industry.shortLabel}</p>
                    <h3 className="heading-display t-h4 mt-4">{industry.name}</h3>
                    <p className="t-small mt-4 flex-1 leading-relaxed text-[color:var(--ink-400)]">{industry.description}</p>
                    {industry.reference ? (
                      <p className="t-small mt-5 text-[color:var(--ink-500)]">
                        Referenz: {industry.reference.title}
                      </p>
                    ) : null}
                    <Link href={`/industry-solutions/${industry.id}`} className="focus-ring t-small mt-6 inline-flex items-center gap-2 rounded font-semibold text-[color:var(--brand-300)] hover:text-[color:var(--brand-200)]">
                      Branchenlösung ansehen <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

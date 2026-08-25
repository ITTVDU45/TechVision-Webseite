import Link from "next/link";

type Accent = "sky" | "emerald" | "amber" | "violet";

interface ServiceHeroProps {
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  primaryLabel: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  outcomes?: string[];
  accent?: Accent;
}

const accentStyles: Record<Accent, string> = {
  sky: "from-sky-400 to-cyan-300",
  emerald: "from-emerald-400 to-teal-300",
  amber: "from-amber-300 to-orange-400",
  violet: "from-violet-400 to-sky-400",
};

export default function ServiceHero({
  eyebrow,
  title,
  highlight,
  description,
  primaryLabel,
  primaryHref = "/contact",
  secondaryLabel,
  secondaryHref = "#details",
  outcomes = ["Strategisch geplant", "Sicher integriert", "Langfristig betreut"],
  accent = "sky",
}: ServiceHeroProps) {
  return (
    <section className="relative isolate flex min-h-[min(780px,88svh)] items-center overflow-hidden border-b border-white/[0.07] bg-[#050912] pb-20 pt-36 sm:pt-40">
      <div className="absolute inset-0 -z-20 bg-[linear-gradient(rgba(255,255,255,.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.025)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:linear-gradient(to_bottom,black,transparent_85%)]" aria-hidden="true" />
      <div className="absolute left-[8%] top-24 -z-10 h-64 w-64 rounded-full bg-sky-500/[0.08] blur-3xl" aria-hidden="true" />

      <div className="section-container w-full">
        <div className="grid items-end gap-12 lg:grid-cols-[minmax(0,1fr)_22rem] lg:gap-20">
          <div className="max-w-4xl reveal-fade-up">
            <p className="eyebrow mb-7">{eyebrow}</p>
            <h1 className="heading-display text-[clamp(2.7rem,7vw,5.8rem)]">
              {title}{" "}
              <span className={`bg-gradient-to-r ${accentStyles[accent]} bg-clip-text text-transparent`}>
                {highlight}
              </span>
            </h1>
            <p className="mt-7 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
              {description}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link href={primaryHref} className="btn-primary focus-ring min-h-12">
                {primaryLabel}
                <span aria-hidden="true">→</span>
              </Link>
              {secondaryLabel ? (
                <Link href={secondaryHref} className="btn-secondary focus-ring min-h-12">
                  {secondaryLabel}
                </Link>
              ) : null}
            </div>
          </div>

          <aside className="surface-card p-6 sm:p-7" aria-label="Projektprinzipien">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
              Unser Anspruch
            </p>
            <ul className="mt-5 space-y-4">
              {outcomes.map((outcome, index) => (
                <li key={outcome} className="flex items-center gap-3 text-sm font-medium text-slate-200">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-sky-400/25 bg-sky-400/[0.08] text-xs text-sky-300" aria-hidden="true">
                    {index + 1}
                  </span>
                  {outcome}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}

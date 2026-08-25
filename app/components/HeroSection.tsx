import Link from "next/link";

type Props = { isLoading?: boolean };

const trustPoints = [
  "KI-Beratung nach BSI IT-Grundschutz",
  "Individualsoftware & System-Integration",
  "Prozessautomatisierung & KI-Agenten",
  "Deutscher Anbieter · DSGVO-konform",
];

const systemNodes = [
  { label: "Strategie", detail: "Ziele & Roadmap", style: { left: 0, top: "1.5rem" } },
  { label: "Software", detail: "Produkte & Plattformen", style: { right: 0, top: "7rem" } },
  { label: "Automatisierung", detail: "Abläufe & Agenten", style: { left: "1.5rem", bottom: "5rem" } },
  { label: "Betrieb", detail: "Cloud & Sicherheit", style: { right: "2rem", bottom: 0 } },
];

export default function HeroSection({ isLoading: _isLoading = false }: Props) {
  return (
    <section id="hero" className="relative flex min-h-[100dvh] w-full items-center overflow-hidden bg-[#050a12] [contain:layout_paint]">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.045)_1px,transparent_1px)] bg-[size:72px_72px]" aria-hidden="true" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_82%_45%,rgba(14,165,233,0.13),transparent_28%),radial-gradient(circle_at_64%_70%,rgba(20,184,166,0.09),transparent_26%),linear-gradient(90deg,#050a12_0%,rgba(5,10,18,0.94)_48%,rgba(5,10,18,0.6)_100%)]" aria-hidden="true" />

      <div className="section-container relative z-10 grid w-full items-center gap-16 pb-16 pt-28 md:pb-24 md:pt-32 lg:grid-cols-[minmax(0,1.25fr)_minmax(19rem,.75fr)]">
        <div className="max-w-3xl">
          <span className="eyebrow">IT · KI · Automatisierung</span>
          <h1 className="heading-display mt-5 text-4xl sm:text-5xl md:text-6xl lg:text-7xl">Software, KI und Automatisierung – gebaut für messbare Ergebnisse.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl">Wir konzipieren, entwickeln und betreiben individuelle Softwarelösungen, KI-Agenten und Prozessautomatisierung für mittelständische Unternehmen – strategisch, integrativ und langfristig verlässlich.</p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link href="/contact" className="btn-primary focus-ring">Kostenloses Erstgespräch <span aria-hidden="true">↗</span></Link>
            <Link href="#success-stories" className="btn-secondary focus-ring">Referenzen ansehen</Link>
          </div>

          <ul className="mt-10 flex flex-wrap gap-x-3 gap-y-2" aria-label="Kompetenzbereiche">
            {trustPoints.map((point) => <li key={point} className="flex items-center gap-2 rounded-full border border-white/10 bg-[#09101b] px-3 py-1.5 text-xs text-slate-300"><span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-sky-400" />{point}</li>)}
          </ul>
        </div>

        <div className="relative hidden aspect-square w-full max-w-[25rem] justify-self-end lg:block" aria-hidden="true">
          <div className="absolute inset-[14%] rounded-full border border-sky-300/15" />
          <div className="absolute inset-[27%] rounded-full border border-dashed border-teal-300/20" />
          <div className="absolute left-1/2 top-1/2 grid h-28 w-28 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-2xl border border-sky-300/25 bg-[#091521] shadow-[0_0_60px_rgba(14,165,233,0.12)]">
            <div className="text-center"><span className="block text-[10px] font-semibold uppercase tracking-[0.25em] text-sky-300">IT-Techvision</span><span className="mt-2 block text-sm font-semibold text-white">Ein System</span></div>
          </div>
          <svg className="absolute inset-0 h-full w-full text-sky-300/20" viewBox="0 0 480 480" fill="none"><path d="M109 76 240 240l140-100M240 240 120 155M240 240 104 354" stroke="currentColor" strokeWidth="1" strokeDasharray="5 7" /><circle cx="240" cy="240" r="4" fill="currentColor" /></svg>
          {systemNodes.map((node) => <div key={node.label} style={node.style} className="absolute w-40 rounded-xl border border-white/10 bg-[#09101b] p-4 shadow-xl shadow-black/20"><span className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-300">{node.label}</span><span className="mt-2 block text-sm text-slate-300">{node.detail}</span></div>)}
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 items-center gap-2 text-xs uppercase tracking-[0.2em] text-slate-500 md:flex"><span className="h-8 w-px bg-gradient-to-b from-transparent via-slate-500 to-transparent" />Scroll</div>
    </section>
  );
}

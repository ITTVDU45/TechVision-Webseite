import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  icon?: string;
}

interface ServiceFAQProps {
  title: string;
  description?: string;
  faqs: FAQItem[];
  ctaText?: string;
  ctaLink?: string;
}

export default function ServiceFAQ({
  title,
  description,
  faqs,
  ctaText = "Kontakt aufnehmen",
  ctaLink = "/contact",
}: ServiceFAQProps) {
  return (
    <section className="section-y hairline-top bg-[#070b13]" aria-labelledby="service-faq-heading">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Fragen & Antworten</p>
          <h2 id="service-faq-heading" className="heading-display mt-5 text-3xl sm:text-4xl md:text-5xl">
            {title}
          </h2>
          {description ? <p className="mt-5 text-base leading-7 text-slate-400 sm:text-lg">{description}</p> : null}
        </div>

        <div className="mx-auto mt-12 max-w-4xl space-y-3">
          {faqs.map((faq, index) => (
            <details key={`${faq.question}-${index}`} className="group surface-card overflow-hidden open:border-sky-400/25">
              <summary className="focus-ring flex min-h-16 cursor-pointer list-none items-center justify-between gap-5 px-5 py-4 text-left text-base font-semibold text-white marker:content-none sm:px-7 sm:text-lg">
                <span className="flex items-center gap-3">
                  {faq.icon ? <span aria-hidden="true">{faq.icon}</span> : null}
                  {faq.question}
                </span>
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-white/10 text-sky-300 transition-transform group-open:rotate-45" aria-hidden="true">
                  +
                </span>
              </summary>
              <div className="border-t border-white/[0.06] px-5 py-5 text-sm leading-7 text-slate-400 sm:px-7 sm:text-base">
                {faq.answer.split("\n").filter(Boolean).map((line, lineIndex) => (
                  <p key={lineIndex} className="mb-3 last:mb-0">{line}</p>
                ))}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 text-sm text-slate-400">Ihre Frage ist nicht dabei? Wir helfen persönlich weiter.</p>
          <Link href={ctaLink} className="btn-secondary focus-ring min-h-12">
            {ctaText}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

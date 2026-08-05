"use client";
import React, { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { fetchFAQs } from "@/lib/api";
import { faqs as staticFAQs } from "@/app/data/faqs";

interface FAQ {
  question: string;
  answer: string;
  page?: string;
  order?: number;
}

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: FAQ;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const id = useId();
  return (
    <div className="surface-card overflow-hidden">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${id}-panel`}
          id={`${id}-btn`}
          className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-white/[0.02] md:px-6 md:py-5"
        >
          <span className="text-base font-medium text-white md:text-lg">
            {faq.question}
          </span>
          <span
            aria-hidden
            className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 text-sky-300 transition-transform duration-300 ${
              isOpen ? "rotate-45 bg-sky-500/10 border-sky-500/30" : ""
            }`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-4 w-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
          </span>
        </button>
      </h3>

      <div
        id={`${id}-panel`}
        role="region"
        aria-labelledby={`${id}-btn`}
        className="grid transition-[grid-template-rows,opacity] duration-300 ease-out"
        style={{ gridTemplateRows: isOpen ? "1fr" : "0fr", opacity: isOpen ? 1 : 0 }}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 pt-1 text-sm leading-relaxed text-slate-400 md:px-6 md:pb-6 md:text-[15px]">
            {faq.answer.split("\n").map((line, i) => (
              <p key={i} className={i > 0 ? "mt-3" : ""}>
                {line}
              </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FAQSection(): React.JSX.Element {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [faqs, setFaqs] = useState<FAQ[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    const loadFAQs = async () => {
      try {
        const apiFAQs = await fetchFAQs("home");
        if (cancelled) return;

        if (apiFAQs && Array.isArray(apiFAQs) && apiFAQs.length > 0) {
          const sorted = apiFAQs.sort((a, b) => (a.order || 0) - (b.order || 0));
          setFaqs(sorted);
        } else {
          const homeFAQs = staticFAQs.filter((faq) => !faq.category || faq.category === "home");
          setFaqs(homeFAQs.slice(0, 6));
        }
      } catch (error) {
        console.error("Error loading FAQs:", error);
        const homeFAQs = staticFAQs.filter((faq) => !faq.category || faq.category === "home");
        setFaqs(homeFAQs.slice(0, 6));
      }
    };
    loadFAQs();
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="eyebrow"
          >
            FAQ
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="heading-display mt-4 text-3xl md:text-5xl"
          >
            Häufig gestellte Fragen
          </motion.h2>
          <p className="mt-4 text-base text-slate-400">
            Die häufigsten Fragen aus Erstgesprächen. Ihre Frage nicht dabei? Wir antworten persönlich.
          </p>
        </div>

        <div className="mx-auto mt-10 max-w-3xl space-y-3">
          {faqs === null ? (
            <div className="space-y-3" aria-hidden>
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="skeleton h-16" />
              ))}
              <span className="sr-only">FAQs werden geladen</span>
            </div>
          ) : faqs.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-12 text-center text-slate-400">
              Keine FAQs verfügbar.
            </div>
          ) : (
            faqs.map((faq, index) => (
              <FAQItem
                key={index}
                faq={faq}
                isOpen={openFaq === index}
                onToggle={() => setOpenFaq(openFaq === index ? null : index)}
              />
            ))
          )}
        </div>

        <div className="mt-12 text-center">
          <p className="mb-5 text-sm text-slate-400">Noch Fragen? Wir sind persönlich für Sie da.</p>
          <Link href="/contact" className="btn-primary focus-ring">
            Kontakt aufnehmen
          </Link>
        </div>
      </div>
    </section>
  );
}

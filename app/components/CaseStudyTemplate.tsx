"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { caseStudies } from "../data/caseStudies";
import Script from "next/script";

type CaseStudy = {
  id: string;
  title: string;
  subtitle?: string;
  heroImage?: string;
  gallery?: readonly string[];
  summary?: string;
  challenges?: string[];
  results?: string[];
};

export default function CaseStudyTemplate({ data }: { data: CaseStudy }) {
  const others = Object.values(caseStudies).filter((c: any) => c.id !== data.id);

  // helper: render gallery - special layout for cms-webentwicklung (2x2)
  const renderGallery = () => {
    if (!data.gallery || data.gallery.length === 0) return null;
    const imgs = data.gallery.slice(0, 4);
    const gridClass = data.id === "cms-webentwicklung" ? "grid grid-cols-2 gap-4 mt-8" : "grid grid-cols-2 md:grid-cols-3 gap-4 mt-8";
    return (
      <div className={gridClass}>
        {imgs.map((src, i) => (
          <div key={i} className="w-full aspect-[4/3] relative rounded-lg overflow-hidden">
            <Image src={src} alt={`${data.title} ${i}`} fill className="object-cover" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* JSON-LD Schema for CaseStudy */}
      <Script id={`cs-schema-${data.id}`} type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CaseStudy",
          "name": data.title,
          "description": data.summary,
          "url": `https://your-domain.com/case-studies/${data.id}`,
          "image": data.heroImage || null,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://your-domain.com/case-studies/${data.id}`
          }
        })}
      </Script>
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
            {data.subtitle && <p className="text-xl text-gray-400 mb-6">{data.subtitle}</p>}
            {data.heroImage && (
              <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8 glass">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-700/10 via-indigo-700/6 to-transparent" />
                <Image src={data.heroImage} alt={data.title} fill className="object-cover transition-transform duration-700 ease-out hover:scale-105" />
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-invert">
            <h2>Zusammenfassung</h2>
            <p>{data.summary}</p>

            {data.challenges && (
              <>
                <h3>Herausforderungen</h3>
                <ul>
                  {data.challenges.map((c, i) => (
                    <li key={i} className="mb-2">{c}</li>
                  ))}
                </ul>
              </>
            )}

            {data.results && (
              <>
                <h3>Ergebnisse</h3>
                <ul>
                  {data.results.map((r, i) => (
                    <li key={i} className="mb-2">{r}</li>
                  ))}
                </ul>
              </>
            )}

            {renderGallery()}
          </div>
        </div>
      </section>

      {/* Weitere Projekte - horizontal slider showing 2 cards approx */}
      {others.length > 0 && (
        <section className="py-20 bg-neutral-900/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Weitere Projekte</h2>
            <div className="-mx-4 overflow-x-auto">
              <div className="flex gap-6 px-4">
                {others.map((o: any) => (
                  <Link
                    key={o.id}
                    href={`/case-studies/${o.id}`}
                    className="min-w-[320px] max-w-xs bg-neutral-900 p-6 rounded-2xl border border-white/6 hover:scale-105 transform transition glass"
                  >
                    <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                      {o.heroImage && <Image src={o.heroImage} alt={o.title} fill className="object-cover" />}
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{o.title}</h3>
                    {o.subtitle && <p className="text-sm text-gray-400 mb-2">{o.subtitle}</p>}
                    <p className="text-sm text-gray-300">{o.summary?.slice(0, 120)}{o.summary && o.summary.length > 120 ? '…' : ''}</p>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}



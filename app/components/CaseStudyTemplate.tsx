"use client";
import React from "react";
import Image from "next/image";

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
  return (
    <div className="min-h-screen bg-black text-white">
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">{data.title}</h1>
            {data.subtitle && <p className="text-xl text-gray-400 mb-6">{data.subtitle}</p>}
            {data.heroImage && (
              <div className="w-full h-80 relative rounded-2xl overflow-hidden mb-8">
                <Image src={data.heroImage} alt={data.title} fill className="object-cover" />
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
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </>
            )}

            {data.results && (
              <>
                <h3>Ergebnisse</h3>
                <ul>
                  {data.results.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </>
            )}

            {data.gallery && data.gallery.length > 0 && (
              <div className="grid grid-cols-2 gap-4 mt-8">
                {data.gallery.map((src, i) => (
                  <div key={i} className="w-full h-48 relative rounded-lg overflow-hidden">
                    <Image src={src} alt={`${data.title} ${i}`} fill className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}



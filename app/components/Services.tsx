"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchServices } from "@/lib/api";

type Service = {
  name?: string;
  title?: string;
  description: string;
  link?: string;
  published?: boolean;
};

const staticServices: Service[] = [
  { title: "KI-Strategie & Entwicklung", description: "Wir identifizieren belastbare Einsatzfelder und integrieren KI-Lösungen sicher in bestehende Abläufe und Systeme.", link: "/ki-transformation" },
  { title: "Workflow-Automatisierung", description: "Wir verbinden Systeme und automatisieren wiederkehrende Prozesse nachvollziehbar, überwacht und wartbar.", link: "/workflow-automation" },
  { title: "Individuelle Software", description: "Wir entwickeln Web-, Backend- und Fachanwendungen für Abläufe, die mit Standardsoftware nicht sauber abbildbar sind.", link: "/software-development" },
  { title: "Branchenlösungen", description: "Wir übersetzen branchenspezifische Regeln und Engpässe in praktikable digitale Werkzeuge und Plattformen.", link: "/industry-solutions" },
  { title: "Cybersecurity", description: "Wir priorisieren Risiken und stärken Zugriffe, Backups, Systeme und Sicherheitsprozesse mit klarem Maßnahmenplan.", link: "/cybersecurity" },
  { title: "Webentwicklung", description: "Wir bauen performante, barrierearme Websites und Webanwendungen mit tragfähigem SEO- und Tracking-Fundament.", link: "/web-development" },
  { title: "Hosting & Betrieb", description: "Wir betreiben geschäftskritische Anwendungen zuverlässig – mit Monitoring, Backups und klarer Verantwortung.", link: "/webhosting" },
];

function normalizePath(value?: string) {
  const path = value?.trim();
  if (!path || path === "#") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

function fallbackFor(service: Service) {
  const path = normalizePath(service.link);
  return staticServices.find((item) => normalizePath(item.link) === path) || staticServices.find((item) => item.title === service.name || item.title === service.title);
}

function uniqueServices(services: Service[]) {
  const unique = new Map<string, Service>();
  services.forEach((service) => {
    const key = normalizePath(service.link) || service.name || service.title;
    if (key && !unique.has(key)) unique.set(key, service);
  });
  return Array.from(unique.values());
}

export default function Services() {
  const [services, setServices] = useState<Service[]>(staticServices);

  useEffect(() => {
    let active = true;
    fetchServices("home")
      .then((data) => {
        if (!active) return;
        if (!Array.isArray(data) || !data.length) { setServices(staticServices); return; }
        const normalized = data.filter((service: Service) => service.published !== false).map((service: Service) => {
          const fallback = fallbackFor(service);
          return {
            title: (service.name || service.title || fallback?.title || "Leistung").trim(),
            description: service.description?.trim() || fallback?.description || "",
            link: normalizePath(service.link) || fallback?.link || "/contact",
          };
        });
        setServices(uniqueServices(normalized).length ? uniqueServices(normalized) : staticServices);
      })
      .catch(() => { if (active) setServices(staticServices); })
    return () => { active = false; };
  }, []);

  return (
    <section id="services" className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)] lg:items-end">
          <div><span className="eyebrow">Leistungen</span><h2 className="heading-display mt-4 text-3xl md:text-5xl">Technologie für konkrete betriebliche Engpässe.</h2></div>
          <p className="max-w-2xl text-base leading-7 text-slate-400 lg:justify-self-end">Von der ersten Einordnung bis zum stabilen Betrieb: Wir kombinieren Beratung, Entwicklung, Integration und IT-Verantwortung zu einer nachvollziehbaren Lösung.</p>
        </div>

        <div className="mt-12">
          {services.length ? (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => <article key={`${service.link}-${service.title}`} className="surface-card surface-card--hover group flex min-h-64 flex-col p-6 sm:p-7"><div className="flex items-center justify-between border-b border-white/[0.07] pb-5"><span className="text-xs font-semibold uppercase tracking-[0.22em] text-sky-300">Leistung {String(index + 1).padStart(2, "0")}</span><span className="h-2 w-2 rounded-full border border-sky-300/50" aria-hidden="true" /></div><h3 className="mt-6 text-xl font-semibold text-white">{service.title || service.name}</h3><p className="mt-3 flex-1 text-sm leading-6 text-slate-400">{service.description}</p><Link href={service.link || "/contact"} className="focus-ring mt-7 inline-flex items-center gap-2 self-start rounded text-sm font-semibold text-sky-300 hover:text-sky-200">Mehr erfahren <span aria-hidden="true" className="transition-transform group-hover:translate-x-1">→</span></Link></article>)}
            </div>
          ) : <div className="surface-card px-6 py-14 text-center text-slate-400">Derzeit sind keine Leistungen verfügbar.</div>}
        </div>
      </div>
    </section>
  );
}

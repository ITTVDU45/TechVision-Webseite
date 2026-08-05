"use client";
import React, { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchServices } from "@/lib/api";
import { usePreferLightEffects } from "@/hooks/usePreferLightEffects";

type Service = {
  icon?: string;
  name?: string;
  title?: string;
  description: string;
  gradient?: string;
  link?: string;
  page?: string;
  published?: boolean;
  image?: string;
};

/** NFD: passt zu macOS-Dateinamen (z. B. „ä“ als a + Kombinierzeichen), sonst 404 trotz korrektem Dateinamen. */
function publicImageFile(name: string): string {
  return `/images/${encodeURIComponent(name.normalize("NFD"))}`;
}

const staticServices: Service[] = [
  {
    icon: "🤖",
    title: "KI‑Transformation",
    description:
      "Analyse Ihrer Prozesse, Identifikation echter KI‑Use‑Cases und schrittweise Umsetzung mit klarem ROI.",
    gradient: "from-sky-500 to-cyan-500",
    link: "/ki-transformation",
    image: publicImageFile("AI-basierte Geschäftsvernetzung in der Zukunft.png"),
  },
  {
    icon: "⚡",
    title: "Workflow‑Automatisierung",
    description:
      "Automatisierte End‑to‑End‑Prozesse zwischen Ihren Systemen – integriert, überwacht und wartbar.",
    gradient: "from-cyan-500 to-teal-500",
    link: "/workflow-automation",
    image: publicImageFile("Futuristische Automatisierung in Aktion.png"),
  },
  {
    icon: "💻",
    title: "Software‑Entwicklung",
    description:
      "Individuelle Web‑ und Backend‑Anwendungen, sauber architektiert, dokumentiert und langfristig wartbar.",
    gradient: "from-sky-500 to-indigo-500",
    link: "/software-development",
    image: publicImageFile("Futuristische Software-Entwicklungsumgebung.png"),
  },
  {
    icon: "🎯",
    title: "Branchen‑Lösungen",
    description:
      "Fachlich zugeschnittene Anwendungen für Recht, Bau, Handel, Logistik – mit branchenspezifischen Regeln.",
    gradient: "from-teal-500 to-emerald-500",
    link: "/industry-solutions",
    image: publicImageFile("Futuristische KI und Industrievernetzung.png"),
  },
  {
    icon: "🔒",
    title: "Cybersecurity",
    description:
      "Absicherung Ihrer IT nach BSI‑Grundschutz und ISO‑27001‑Prinzipien: Backups, Zugriffe, Monitoring.",
    gradient: "from-slate-400 to-slate-600",
    link: "/cybersecurity",
  },
  {
    icon: "🌐",
    title: "Web‑Entwicklung",
    description: "Performante, barrierearme Websites und Web‑Apps mit sauberem SEO‑Fundament.",
    gradient: "from-indigo-500 to-sky-500",
    link: "/web-development",
  },
  {
    icon: "☁️",
    title: "Hosting & Betrieb",
    description:
      "Zuverlässiger Betrieb Ihrer Anwendungen in europäischen Rechenzentren mit Monitoring und Backups.",
    gradient: "from-cyan-500 to-blue-500",
    link: "/webhosting",
  },
];

function normalizeServicePath(raw: string): string {
  const t = raw.trim();
  if (!t || t === "#") return "";
  const withSlash = t.startsWith("/") ? t : `/${t}`;
  const noTrail = withSlash.replace(/\/+$/, "");
  return noTrail || "/";
}

function staticFallbackForApiService(
  href: string,
  apiName?: string,
  apiTitle?: string
): Service | undefined {
  const norm = normalizeServicePath(href === "#" ? "" : href);
  const byLink = staticServices.find(
    (st) => normalizeServicePath(st.link || "") === norm
  );
  if (byLink) return byLink;
  const label = (apiName || apiTitle || "").trim();
  if (!label) return undefined;
  return staticServices.find((st) => (st.title || "").trim() === label);
}

function resolveServiceImageUrl(s: Service): string | undefined {
  const u = s.image?.trim();
  if (u) return u;
  return undefined;
}

function ServiceCardMedia({ service }: { service: Service }) {
  const src = resolveServiceImageUrl(service);
  const alt = service.title || service.name || "Service";
  const g = service.gradient || "from-sky-500 to-cyan-500";

  if (src) {
    return (
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-t-2xl bg-neutral-900 sm:h-48 md:h-56">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 42vw"
          className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#050a12]/85 via-[#050a12]/25 to-transparent" aria-hidden />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-44 w-full shrink-0 items-center justify-center rounded-t-2xl bg-gradient-to-br ${g} text-5xl text-white/95 sm:h-48 md:h-56`}
      aria-hidden
    >
      <span>{service.icon || "💼"}</span>
    </div>
  );
}

function ServiceSlide({ service }: { service: Service }) {
  return (
    <article className="group relative h-full">
      <div className="relative flex h-full min-h-[440px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a1220] transition-colors duration-300 group-hover:border-white/20 md:min-h-[500px]">
        <ServiceCardMedia service={service} />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col border-t border-white/10 px-6 pb-6 pt-5 md:px-7 md:pb-7 md:pt-6">
          <h3 className="mb-2 shrink-0 text-lg font-semibold leading-snug text-white md:text-xl">
            {service.title}
          </h3>
          <p className="mb-6 flex-1 text-sm leading-relaxed text-slate-300 md:text-[15px]">
            {service.description}
          </p>
          <Link
            href={service.link ?? "/"}
            className="focus-ring inline-flex items-center gap-2 text-sm font-semibold text-sky-300 transition-colors hover:text-sky-200"
          >
            Mehr erfahren
            <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}

const PrevArrow = (props: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={props.onClick}
    className="focus-ring absolute left-[-56px] top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all hover:border-white/25 hover:bg-white/[0.08] lg:flex"
    aria-label="Vorheriger Service"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
    </svg>
  </button>
);

const NextArrow = (props: { onClick?: () => void }) => (
  <button
    type="button"
    onClick={props.onClick}
    className="focus-ring absolute right-[-56px] top-1/2 z-20 hidden h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white transition-all hover:border-white/25 hover:bg-white/[0.08] lg:flex"
    aria-label="Nächster Service"
  >
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  </button>
);

function ServiceSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {Array.from({ length: 2 }).map((_, i) => (
        <div key={i} className="skeleton h-[440px] md:h-[500px]" aria-hidden />
      ))}
      <span className="sr-only">Services werden geladen</span>
    </div>
  );
}

export default function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const preferLightEffects = usePreferLightEffects();

  useEffect(() => {
    const loadServices = async () => {
      try {
        const apiServices = await fetchServices("home");

        if (apiServices && Array.isArray(apiServices) && apiServices.length > 0) {
          const published = apiServices
            .filter((s: Service & { imageMeta?: { url?: string } }) => s.published !== false)
            .map((s: Service & { imageMeta?: { url?: string } }) => {
              const raw = (s.link || "").trim();
              const href =
                raw === "" ? "#" : raw.startsWith("/") ? raw : `/${raw}`;
              const img =
                (typeof s.image === "string" && s.image.trim()) ||
                (s.imageMeta?.url && String(s.imageMeta.url).trim()) ||
                undefined;
              const fallback = staticFallbackForApiService(href, s.name, s.title);
              const descFromApi =
                typeof s.description === "string" ? s.description.trim() : "";
              return {
                icon: s.icon || fallback?.icon || "💼",
                image: img || fallback?.image,
                title: (s.name || s.title || fallback?.title || "Service").trim(),
                description: descFromApi || fallback?.description || "",
                gradient:
                  (s.gradient && s.gradient.trim()) ||
                  fallback?.gradient ||
                  "from-sky-500 to-cyan-500",
                link: href,
              };
            });

          if (published.length > 0) {
            setServices(published);
          } else {
            setServices(staticServices);
          }
        } else {
          setServices(staticServices);
        }
      } catch (error) {
        console.error("Error loading services:", error);
        setServices(staticServices);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  const settings = useMemo(() => {
    const slidesToShow = 2;
    return {
      dots: true,
      infinite: services.length > slidesToShow,
      speed: 500,
      cssEase: "cubic-bezier(0.22, 1, 0.36, 1)",
      slidesToShow,
      slidesToScroll: 1,
      autoplay: false,
      arrows: true,
      swipeToSlide: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2 } },
        { breakpoint: 768, settings: { slidesToShow: 1, arrows: false } },
      ],
    };
  }, [services.length]);

  return (
    <section id="services" className="section-y relative overflow-hidden bg-[#050a12]">
      <div className="section-container relative z-10">
        <div className="mb-12 flex flex-col gap-4 md:mb-16 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              className="eyebrow"
            >
              Leistungen
            </motion.span>
            <motion.h2
              initial={preferLightEffects ? false : { opacity: 0, y: 12 }}
              whileInView={preferLightEffects ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.5 }}
              className="heading-display mt-4 text-3xl md:text-5xl"
            >
              Was wir für Sie umsetzen
            </motion.h2>
            <p className="mt-4 max-w-xl text-base text-slate-400">
              Strategie, Umsetzung und Betrieb – aus einer Hand. Wir kombinieren KI, Softwareentwicklung und Automatisierung
              zu belastbaren Lösungen für Ihr Unternehmen.
            </p>
          </div>
        </div>

        <div className="services-carousel relative -mx-4">
          {loading ? (
            <div className="px-4">
              <ServiceSkeleton />
            </div>
          ) : services.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] px-6 py-16 text-center text-slate-400">
              Keine Services verfügbar
            </div>
          ) : (
            <Slider {...settings}>
              {services.map((service, index) => (
                <div
                  key={`${service.link ?? ""}-${service.title ?? index}-${index}`}
                  className="h-full px-4 pb-12"
                >
                  <ServiceSlide service={service} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

    </section>
  );
}

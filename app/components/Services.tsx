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
    title: "KI-Transformation",
    description:
      "Wir analysieren Ihre Geschäftsprozesse und identifizieren Potenziale für den Einsatz von Künstlicher Intelligenz, um Effizienz und Produktivität zu steigern.",
    gradient: "from-blue-400 via-blue-500 to-indigo-500",
    link: "/ki-transformation",
    image: publicImageFile("AI-basierte Geschäftsvernetzung in der Zukunft.png"),
  },
  {
    icon: "⚡",
    title: "Workflow Automatisierung",
    description:
      "Von der Planung bis zur Umsetzung integrieren wir maßgeschneiderte KI-Lösungen nahtlos in Ihre bestehenden Systeme.",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    link: "/workflow-automation",
    image: publicImageFile("Futuristische Automatisierung in Aktion.png"),
  },
  {
    icon: "💻",
    title: "Software Entwicklung",
    description:
      "Entwicklung intelligenter Softwarelösungen, die durch KI Ihre Geschäftsabläufe optimieren und automatisieren.",
    gradient: "from-purple-400 via-pink-500 to-red-500",
    link: "/software-development",
    image: publicImageFile("Futuristische Software-Entwicklungsumgebung.png"),
  },
  {
    icon: "🎯",
    title: "KI für Branchen",
    description:
      "Spezialisierte KI-Lösungen für verschiedene Branchen wie IT, Bauwesen und Rechtswesen, um branchenspezifische Herausforderungen zu meistern.",
    gradient: "from-blue-500 via-indigo-500 to-purple-500",
    link: "/industry-solutions",
    image: publicImageFile("Futuristische KI und Industrievernetzung.png"),
  },
  {
    icon: "🔒",
    title: "Cybersecurity",
    description:
      "Umfassender Schutz und professionelles Management Ihrer IT-Systeme, von Backup-Lösungen bis hin zu sicherer Cloud-Integration und Netzwerkarchitektur.",
    gradient: "from-indigo-400 via-purple-500 to-purple-600",
    link: "/cybersecurity",
  },
  {
    icon: "🌐",
    title: "Webseitenentwicklung",
    description: "Moderne und responsive Webauftritte für Ihren professionellen Online-Auftritt.",
    gradient: "from-indigo-500 via-purple-500 to-pink-500",
    link: "/web-development",
  },
  {
    icon: "☁️",
    title: "Hosting",
    description:
      "Zuverlässiges Hosting für Ihre Webseiten und Softwarelösungen mit erstklassigem Support.",
    gradient: "from-blue-400 via-indigo-500 to-purple-500",
    link: "/webhosting",
  },
];

/** Gleicher Pfad wie aus dem CMS (z. B. /ki-transformation) */
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
  const g = service.gradient || "from-blue-400 via-blue-500 to-indigo-500";

  if (src) {
    return (
      <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-t-2xl bg-neutral-900 sm:h-48 md:h-52">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover object-center"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
          aria-hidden
        />
      </div>
    );
  }

  return (
    <div
      className={`relative flex h-44 w-full shrink-0 items-center justify-center rounded-t-2xl bg-gradient-to-br ${g} text-5xl text-white/95 shadow-inner sm:h-48 md:h-52`}
      aria-hidden
    >
      <span>{service.icon || "💼"}</span>
    </div>
  );
}

function ServiceSlide({
  service,
  preferLightEffects,
}: {
  service: Service;
  preferLightEffects: boolean;
}) {
  const g = service.gradient || "from-blue-400 via-blue-500 to-indigo-500";

  const cardInner = (
    <div
      className={`relative flex h-full min-h-[480px] w-full flex-col overflow-hidden rounded-2xl border border-white/10 shadow-2xl transition-colors duration-300 md:min-h-[540px] ${
        preferLightEffects
          ? "bg-neutral-950/90 group-hover:border-white/20 group-hover:bg-neutral-900/95"
          : "bg-white/[0.03] backdrop-blur-xl group-hover:border-white/20 group-hover:bg-white/[0.05]"
      }`}
    >
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${g} opacity-0 transition-opacity duration-500 group-hover:opacity-[0.03]`}
        aria-hidden
      />

      <ServiceCardMedia service={service} />

      <div className="relative z-10 flex min-h-0 flex-1 flex-col border-t border-white/10 bg-black/90 px-6 pb-6 pt-5 md:px-8 md:pb-8 md:pt-6">
        <h3 className="mb-3 shrink-0 text-xl font-bold leading-snug text-white md:text-2xl">
          {service.title}
        </h3>

        <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain">
          <p className="text-sm leading-relaxed text-gray-300 md:text-base">
            {service.description}
          </p>
        </div>

        <div className="mt-5 shrink-0">
          <Link href={service.link ?? "/"} className="block">
            {preferLightEffects ? (
              <button
                type="button"
                className={`group/button relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${g} px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300 active:scale-[0.98]`}
              >
                <span className="relative z-10">Mehr dazu</span>
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover/button:opacity-20" />
              </button>
            ) : (
              <motion.button
                type="button"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`group/button relative w-full overflow-hidden rounded-xl bg-gradient-to-r ${g} px-4 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-300`}
              >
                <span className="relative z-10">Mehr dazu</span>
                <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-300 group-hover/button:opacity-20" />
              </motion.button>
            )}
          </Link>
        </div>
      </div>

      <div
        className={`pointer-events-none absolute -right-12 -top-12 h-24 w-24 bg-gradient-to-br ${g} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
        aria-hidden
      />
    </div>
  );

  if (preferLightEffects) {
    return (
      <div className="group relative h-full min-h-[480px] md:min-h-[540px]">
        <div
          className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${g} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
          aria-hidden
        />
        {cardInner}
      </div>
    );
  }

  return (
    <motion.div
      className="group relative h-full min-h-[480px] md:min-h-[540px]"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div
        className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${g} opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-20`}
        aria-hidden
      />
      {cardInner}
    </motion.div>
  );
}

const PrevArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute left-[-60px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 lg:flex"
      aria-label="Vorherige"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
      </svg>
    </button>
  );
};

const NextArrow = (props: { onClick?: () => void }) => {
  const { onClick } = props;
  return (
    <button
      type="button"
      onClick={onClick}
      className="absolute right-[-60px] top-1/2 z-20 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white backdrop-blur-md transition-all hover:border-white/20 hover:bg-white/10 lg:flex"
      aria-label="Nächste"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-6 w-6">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

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
                  "from-blue-400 via-blue-500 to-indigo-500",
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

  const settings = useMemo(
    () => ({
      dots: true,
      infinite: true,
      speed: preferLightEffects ? 320 : 800,
      cssEase: preferLightEffects ? "ease-out" : "ease-in-out",
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: !preferLightEffects,
      autoplaySpeed: 2500,
      pauseOnHover: true,
      arrows: true,
      prevArrow: <PrevArrow />,
      nextArrow: <NextArrow />,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    }),
    [preferLightEffects]
  );

  return (
    <section id="services" className="relative overflow-hidden bg-black py-32">
      <div className="pointer-events-none absolute left-0 right-0 top-0 z-20 h-32 bg-gradient-to-b from-black to-transparent" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-20 h-32 bg-gradient-to-t from-black to-transparent" />

      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
        <div className="absolute bottom-0 left-0 h-[500px] w-[500px] -translate-x-1/2 translate-y-1/2 rounded-full bg-blue-600/5 blur-[120px]" />
        <div className="absolute right-0 top-1/2 h-[400px] w-[400px] -translate-y-1/2 translate-x-1/3 rounded-full bg-indigo-600/5 blur-[100px]" />
      </div>

      <div className="container relative z-10 mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16 text-center text-4xl font-bold md:text-5xl"
        >
          Unsere Services
        </motion.h2>

        <div className="services-carousel relative z-10 -mx-4">
          {loading ? (
            <div className="py-16 text-center text-gray-400">Lädt Services...</div>
          ) : services.length === 0 ? (
            <div className="py-16 text-center text-gray-400">Keine Services verfügbar</div>
          ) : (
            <Slider {...settings}>
              {services.map((service, index) => (
                <div key={`${service.link ?? ""}-${service.title ?? index}-${index}`} className="h-full px-4 pb-12">
                  <ServiceSlide service={service} preferLightEffects={preferLightEffects} />
                </div>
              ))}
            </Slider>
          )}
        </div>
      </div>

      <style jsx global>{`
        .services-carousel .slick-dots {
          bottom: -20px;
        }
        .services-carousel .slick-dots li button:before {
          color: rgba(255, 255, 255, 0.3);
          font-size: 10px;
        }
        .services-carousel .slick-dots li.slick-active button:before {
          color: #3b82f6;
        }
        .services-carousel .slick-track {
          display: flex !important;
        }
        .services-carousel .slick-slide {
          height: inherit !important;
        }
        .services-carousel .slick-slide > div {
          height: 100%;
        }
      `}</style>
    </section>
  );
}

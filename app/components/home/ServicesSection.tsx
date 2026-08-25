"use client";

import { useEffect, useState } from "react";
import { fetchServices } from "@/lib/api";
import ServiceList, { type ServiceEntry } from "./ServiceList";
import { services as serviceProfiles } from "@/app/data/services";

/**
 * Leistungen der Startseite, mit CMS-Anbindung.
 *
 * Der statische Satz ist der Ausgangszustand und steht im ausgelieferten HTML.
 * Liefert das CMS gepflegte Einträge, ersetzen sie ihn. Ohne Datenbank bleibt
 * es beim statischen Satz - dasselbe Verhalten wie vorher, nur an einer Stelle
 * statt über die Sektion verteilt.
 */

/** Aus der zentralen Leistungsquelle abgeleitet - nicht hier gepflegt. */
const STATIC_SERVICES: ServiceEntry[] = serviceProfiles.map((service) => ({
  title: service.title,
  description: service.description,
  audience: service.audience,
  href: service.href,
  image: service.image,
}));

function normalizePath(value?: string) {
  const path = value?.trim();
  if (!path || path === "#") return "";
  return path.startsWith("/") ? path : `/${path}`;
}

interface RawService {
  name?: string;
  title?: string;
  description?: string;
  link?: string;
  image?: string;
  published?: boolean;
}

/** CMS-Eintrag auf die Listenform bringen; fehlende Felder aus dem statischen Satz. */
function merge(raw: RawService): ServiceEntry | null {
  const href = normalizePath(raw.link);
  const fallback =
    STATIC_SERVICES.find((entry) => entry.href === href) ??
    STATIC_SERVICES.find((entry) => entry.title === (raw.name ?? raw.title));

  const title = (raw.name || raw.title || fallback?.title || "").trim();
  if (!title) return null;

  return {
    title,
    description: raw.description?.trim() || fallback?.description || "",
    audience: fallback?.audience ?? "",
    href: href || fallback?.href || "/contact",
    image: raw.image?.trim() || fallback?.image || "/images/system-integration-network.webp",
  };
}

export default function ServicesSection() {
  const [services, setServices] = useState<ServiceEntry[]>(STATIC_SERVICES);

  useEffect(() => {
    let active = true;

    fetchServices("home")
      .then((data) => {
        if (!active || !Array.isArray(data) || data.length === 0) return;
        const mapped = data
          .filter((entry: RawService) => entry.published !== false)
          .map(merge)
          .filter((entry): entry is ServiceEntry => entry !== null);
        if (mapped.length) setServices(mapped);
      })
      .catch(() => {
        /* Ohne CMS bleibt der statische Satz stehen. */
      });

    return () => {
      active = false;
    };
  }, []);

  return <ServiceList services={services} />;
}

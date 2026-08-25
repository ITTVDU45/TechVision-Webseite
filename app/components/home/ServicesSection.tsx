"use client";

import { useEffect, useState } from "react";
import { fetchServices } from "@/lib/api";
import ServiceList, { type ServiceEntry } from "./ServiceList";

/**
 * Leistungen der Startseite, mit CMS-Anbindung.
 *
 * Der statische Satz ist der Ausgangszustand und steht im ausgelieferten HTML.
 * Liefert das CMS gepflegte Einträge, ersetzen sie ihn. Ohne Datenbank bleibt
 * es beim statischen Satz - dasselbe Verhalten wie vorher, nur an einer Stelle
 * statt über die Sektion verteilt.
 */

const STATIC_SERVICES: ServiceEntry[] = [
  {
    title: "KI-Strategie & Entwicklung",
    description:
      "Wir identifizieren belastbare Einsatzfelder und integrieren KI-Lösungen sicher in bestehende Abläufe und Systeme.",
    audience: "Für Unternehmen, die wissen wollen, wo KI trägt – und wo nicht.",
    href: "/ki-transformation",
    image: "/images/KITransofmation.webp",
  },
  {
    title: "Workflow-Automatisierung",
    description:
      "Wir verbinden Systeme und automatisieren wiederkehrende Prozesse nachvollziehbar, überwacht und wartbar.",
    audience: "Wenn dieselben Daten mehrfach von Hand übertragen werden.",
    href: "/workflow-automation",
    image: "/images/automation-dashboard.webp",
  },
  {
    title: "Individuelle Software",
    description:
      "Wir entwickeln Web-, Backend- und Fachanwendungen für Abläufe, die mit Standardsoftware nicht sauber abbildbar sind.",
    audience: "Wenn das Standardprodukt den eigenen Ablauf verbiegt.",
    href: "/software-development",
    image: "/images/laptop-software-mockup.webp",
  },
  {
    title: "Branchenlösungen",
    description:
      "Wir übersetzen branchenspezifische Regeln und Engpässe in praktikable digitale Werkzeuge und Plattformen.",
    audience: "Für Rechtswesen, Handel und Bahnbetrieb.",
    href: "/industry-solutions",
    image: "/images/legaltech.webp",
  },
  {
    title: "Cybersecurity",
    description:
      "Wir priorisieren Risiken und stärken Zugriffe, Backups, Systeme und Sicherheitsprozesse mit klarem Maßnahmenplan.",
    audience: "Wenn Sicherheit bisher aus einzelnen Werkzeugen besteht.",
    href: "/cybersecurity",
    image: "/images/cybersecurity.webp",
  },
  {
    title: "Webentwicklung",
    description:
      "Wir bauen performante, barrierearme Websites und Webanwendungen mit tragfähigem SEO- und Tracking-Fundament.",
    audience: "Wenn die Website Anfragen bringen soll, nicht nur existieren.",
    href: "/web-development",
    image: "/images/cms-development.webp",
  },
  {
    title: "IT-Infrastruktur",
    description:
      "Wir planen, betreiben und betreuen Netze, Server und Arbeitsplätze mit klarer Zuständigkeit.",
    audience: "Wenn die IT wächst, aber niemand sie verantwortet.",
    href: "/it-infrastructure",
    image: "/images/system-integration-network.webp",
  },
  {
    title: "Hosting & Betrieb",
    description:
      "Wir betreiben geschäftskritische Anwendungen zuverlässig – mit Monitoring, Backups und klarer Verantwortung.",
    audience: "Wenn Ausfälle Geld kosten.",
    href: "/webhosting",
    image: "/images/multiple-devices-background.webp",
  },
];

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

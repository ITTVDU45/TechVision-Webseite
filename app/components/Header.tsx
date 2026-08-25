"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH } from "@/lib/site-logo";

const services = [
  { name: "KI-Transformation", href: "/ki-transformation", description: "Strategie, Entwicklung und Integration" },
  { name: "Softwareentwicklung", href: "/software-development", description: "Individuelle Anwendungen und Plattformen" },
  { name: "Workflow-Automatisierung", href: "/workflow-automation", description: "Systeme, Prozesse und KI-Agenten verbinden" },
  { name: "Cybersecurity", href: "/cybersecurity", description: "Risiken erkennen und wirksam reduzieren" },
  { name: "Tools & KI-Agenten", href: "/tools", description: "Passende Werkzeuge kontrolliert einsetzen" },
  { name: "IT-Infrastruktur", href: "/it-infrastructure", description: "Planung, Betrieb und Betreuung" },
  { name: "Webentwicklung", href: "/web-development", description: "Schnelle Websites und Webanwendungen" },
  { name: "Hosting", href: "/webhosting", description: "Sicherer, überwachter Betrieb" },
];

const primaryLinks = [
  { name: "Referenzen", href: "/case-studies" },
  { name: "Branchen", href: "/industry-solutions" },
  { name: "Magazin", href: "/blog" },
  { name: "Kontakt", href: "/contact" },
];

export default function Header(): React.JSX.Element {
  const pathname = usePathname();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    setServicesOpen(false);
    closeMobile();
  }, [pathname, closeMobile]);

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      if (!servicesRef.current?.contains(event.target as Node)) setServicesOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setServicesOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("keydown", onEscape);
    };
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = mobilePanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
    focusable?.[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMobile();
        menuButtonRef.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen, closeMobile]);

  const isActive = (href: string) => pathname === href || pathname?.startsWith(`${href}/`);
  const linkClass = (href: string) =>
    `focus-ring rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
      isActive(href) ? "text-white" : "text-slate-400 hover:text-white"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-[100] border-b border-white/[0.08] bg-[#050912]/95 supports-[backdrop-filter]:bg-[#050912]/85 supports-[backdrop-filter]:backdrop-blur-lg">
      <div className="section-container flex min-h-[76px] items-center justify-between gap-5 py-3" style={{ paddingTop: "max(.75rem, env(safe-area-inset-top))" }}>
        <Link href="/marketing" className="focus-ring flex shrink-0 items-center rounded-lg" aria-label="IT-Techvision – Startseite">
          <Image src={SITE_LOGO_PATH} alt="IT-Techvision" width={SITE_LOGO_WIDTH} height={SITE_LOGO_HEIGHT} priority className="h-11 w-auto max-w-[13rem] object-contain object-left sm:h-12" />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Hauptnavigation">
          <Link href="/marketing" className={linkClass("/marketing")} aria-current={isActive("/marketing") ? "page" : undefined}>Start</Link>
          <div ref={servicesRef} className="relative">
            <button type="button" onClick={() => setServicesOpen((open) => !open)} aria-expanded={servicesOpen} aria-controls="desktop-services-menu" className="focus-ring flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 transition-colors hover:text-white">
              Leistungen
              <svg className={`h-4 w-4 transition-transform ${servicesOpen ? "rotate-180" : ""}`} viewBox="0 0 20 20" fill="none" stroke="currentColor" aria-hidden="true"><path d="m5 7.5 5 5 5-5" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            {servicesOpen ? (
              <div id="desktop-services-menu" className="absolute left-1/2 top-full mt-4 w-[min(46rem,calc(100vw-2rem))] -translate-x-1/2 rounded-2xl border border-white/10 bg-[#0a101b] p-3 shadow-2xl shadow-black/50">
                <div className="grid grid-cols-2 gap-1">
                  {services.map((service) => (
                    <Link key={service.href} href={service.href} className="focus-ring group rounded-xl px-4 py-3 transition-colors hover:bg-white/[0.05]">
                      <span className="block text-sm font-semibold text-white group-hover:text-sky-300">{service.name}</span>
                      <span className="mt-1 block text-xs leading-5 text-slate-500">{service.description}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
          {primaryLinks.map((link) => <Link key={link.href} href={link.href} className={linkClass(link.href)} aria-current={isActive(link.href) ? "page" : undefined}>{link.name}</Link>)}
        </nav>

        <div className="flex items-center gap-2">
          <Link href="/contact" className="btn-primary focus-ring hidden min-h-11 px-5 py-2.5 text-sm sm:inline-flex">Projekt besprechen</Link>
          <button ref={menuButtonRef} type="button" onClick={() => setMobileOpen(true)} className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-white/[0.04] text-white lg:hidden" aria-label="Menü öffnen" aria-expanded={mobileOpen} aria-controls="mobile-site-navigation">
            <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16" strokeWidth="1.8" strokeLinecap="round" /></svg>
          </button>
        </div>
      </div>

      {mobileOpen ? (
        <div className="fixed inset-0 z-[110] lg:hidden">
          <button type="button" className="absolute inset-0 bg-black/70" onClick={closeMobile} aria-hidden="true" tabIndex={-1} />
          <div ref={mobilePanelRef} id="mobile-site-navigation" role="dialog" aria-modal="true" aria-label="Navigation" className="absolute inset-y-0 right-0 flex w-[min(92vw,26rem)] flex-col overflow-hidden border-l border-white/10 bg-[#070b13] shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4" style={{ paddingTop: "max(1rem, env(safe-area-inset-top))" }}>
              <span className="text-sm font-semibold text-white">Navigation</span>
              <button type="button" onClick={() => { closeMobile(); menuButtonRef.current?.focus(); }} className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-white/10" aria-label="Menü schließen">
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" strokeWidth="1.8" strokeLinecap="round" /></svg>
              </button>
            </div>
            <nav className="min-h-0 flex-1 overflow-y-auto px-5 py-5" aria-label="Mobile Hauptnavigation">
              <Link href="/marketing" className="focus-ring block rounded-xl px-3 py-3 font-semibold text-white">Startseite</Link>
              <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Leistungen</p>
              <div className="space-y-1">
                {services.map((service) => (
                  <Link key={service.href} href={service.href} className="focus-ring block rounded-xl px-3 py-3 transition-colors hover:bg-white/[0.05]">
                    <span className="block text-sm font-semibold text-white">{service.name}</span>
                    <span className="mt-1 block text-xs leading-5 text-slate-500">{service.description}</span>
                  </Link>
                ))}
              </div>
              <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Unternehmen</p>
              <div className="grid grid-cols-2 gap-1">
                {primaryLinks.map((link) => <Link key={link.href} href={link.href} className="focus-ring rounded-xl px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.05]">{link.name}</Link>)}
                <Link href="/faq" className="focus-ring rounded-xl px-3 py-3 text-sm font-medium text-slate-300 hover:bg-white/[0.05]">FAQ</Link>
              </div>
            </nav>
            <div className="border-t border-white/10 p-5" style={{ paddingBottom: "max(1.25rem, env(safe-area-inset-bottom))" }}>
              <Link href="/contact" className="btn-primary focus-ring min-h-12 w-full">Projekt besprechen <span aria-hidden="true">→</span></Link>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}

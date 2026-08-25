import Image from "next/image";
import Link from "next/link";
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH } from "@/lib/site-logo";

const serviceLinks = [
  { name: "KI-Transformation", href: "/ki-transformation" },
  { name: "Softwareentwicklung", href: "/software-development" },
  { name: "Workflow-Automatisierung", href: "/workflow-automation" },
  { name: "Cybersecurity", href: "/cybersecurity" },
  { name: "IT-Infrastruktur", href: "/it-infrastructure" },
  { name: "Webentwicklung", href: "/web-development" },
  { name: "Hosting", href: "/webhosting" },
];

const companyLinks = [
  { name: "Referenzen", href: "/case-studies" },
  { name: "Branchenlösungen", href: "/industry-solutions" },
  { name: "Magazin", href: "/blog" },
  { name: "FAQ", href: "/faq" },
  { name: "Kontakt", href: "/contact" },
];

export default function Footer(): React.JSX.Element {
  return (
    <footer className="border-t border-white/[0.08] bg-[#050912] text-slate-300">
      <div className="section-container py-14 sm:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/marketing" className="focus-ring inline-flex rounded-lg" aria-label="IT-Techvision – Startseite">
              <Image src={SITE_LOGO_PATH} alt="IT-Techvision" width={SITE_LOGO_WIDTH} height={SITE_LOGO_HEIGHT} className="h-14 w-auto max-w-[15rem] object-contain object-left" />
            </Link>
            <p className="mt-5 max-w-md text-sm leading-7 text-slate-400">Strategische IT-Beratung, individuelle Software, KI und sichere Infrastruktur für Unternehmen, die digitale Vorhaben verlässlich umsetzen wollen.</p>
            <a href="mailto:info@it-techvision.de" className="focus-ring mt-6 inline-flex rounded-md text-sm font-semibold text-sky-300 hover:text-sky-200">info@it-techvision.de</a>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Leistungen</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {serviceLinks.map((link) => <li key={link.href}><Link href={link.href} className="focus-ring rounded text-slate-400 transition-colors hover:text-white">{link.name}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Einblicke</h2>
            <ul className="mt-5 space-y-3 text-sm">
              {companyLinks.map((link) => <li key={link.href}><Link href={link.href} className="focus-ring rounded text-slate-400 transition-colors hover:text-white">{link.name}</Link></li>)}
            </ul>
          </div>

          <div>
            <h2 className="text-sm font-semibold text-white">Kontakt</h2>
            <address className="mt-5 space-y-3 text-sm not-italic leading-6 text-slate-400">
              <p>Hauffstr. 55<br />47166 Duisburg</p>
              <p>Deutschland</p>
            </address>
            <Link href="/contact" className="btn-secondary focus-ring mt-6 min-h-11 px-4 py-2.5 text-sm">Projekt anfragen</Link>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-5 border-t border-white/[0.08] pt-7 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} IT-Techvision. Alle Rechte vorbehalten.</p>
          <nav className="flex flex-wrap gap-x-6 gap-y-3" aria-label="Rechtliche Hinweise">
            <Link href="/datenschutz" className="focus-ring rounded hover:text-white">Datenschutz</Link>
            <Link href="/impressum" className="focus-ring rounded hover:text-white">Impressum</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}

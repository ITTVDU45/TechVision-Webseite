import type { Metadata, Viewport } from "next";
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH } from "@/lib/site-logo";
import "./styles/globals.css";
import "./styles/slick-overrides.css";
import AppChrome from "./components/AppChrome";

export const metadata: Metadata = {
  title: {
    default: "IT-Techvision | KI, Software und sichere IT-Lösungen",
    template: "%s | IT-Techvision",
  },
  description: "Strategische IT-Beratung, KI-Entwicklung, Prozessautomatisierung, individuelle Software und sichere Infrastruktur für Unternehmen.",
  keywords: ["KI-Entwicklung", "Softwareentwicklung", "IT-Beratung", "Prozessautomatisierung", "Cybersecurity"],
  authors: [{ name: "IT-Techvision" }],
  creator: "IT-Techvision",
  publisher: "IT-Techvision",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://it-techvision.de"),
  icons: {
    icon: [{ url: SITE_LOGO_PATH, type: "image/png" }],
    apple: SITE_LOGO_PATH,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Techvision',
  },
  openGraph: {
    title: "IT-Techvision | KI, Software und sichere IT-Lösungen",
    description: "Strategische IT-Beratung, KI-Entwicklung, Prozessautomatisierung, individuelle Software und sichere Infrastruktur für Unternehmen.",
    url: "https://it-techvision.de",
    siteName: "IT-Techvision",
    images: [
      {
        url: SITE_LOGO_PATH,
        width: SITE_LOGO_WIDTH,
        height: SITE_LOGO_HEIGHT,
        alt: "Techvision Logo",
      },
    ],
    locale: "de_DE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IT-Techvision | KI, Software und sichere IT-Lösungen",
    description: "Strategische IT-Beratung, KI-Entwicklung, Prozessautomatisierung, individuelle Software und sichere Infrastruktur für Unternehmen.",
    images: [SITE_LOGO_PATH],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href={SITE_LOGO_PATH} type="image/png" />
        <link rel="apple-touch-icon" href={SITE_LOGO_PATH} />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#050912" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="bg-[#050912] text-slate-100 antialiased" suppressHydrationWarning>
        <AppChrome />
        <div id="main-content" tabIndex={-1}>{children}</div>
      </body>
    </html>
  );
}


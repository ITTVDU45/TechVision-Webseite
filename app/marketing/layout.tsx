import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SITE_LOGO_HEIGHT, SITE_LOGO_PATH, SITE_LOGO_WIDTH } from "@/lib/site-logo";
import "../styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Techvision - KI-Telefonie & Softwareentwicklung",
  description: "Professionelle KI-Telefonie, Softwareentwicklung und IT-Beratung. Moderne Lösungen für Unternehmen.",
  keywords: ["KI-Telefonie", "Softwareentwicklung", "IT-Beratung", "KI-Transformation"],
  authors: [{ name: "Techvision" }],
  creator: "Techvision",
  publisher: "Techvision",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://techvision.de"),
  openGraph: {
    title: "Techvision - KI-Telefonie & Softwareentwicklung",
    description: "Professionelle KI-Telefonie, Softwareentwicklung und IT-Beratung. Moderne Lösungen für Unternehmen.",
    url: "https://techvision.de",
    siteName: "Techvision",
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
    title: "Techvision - KI-Telefonie & Softwareentwicklung",
    description: "Professionelle KI-Telefonie, Softwareentwicklung und IT-Beratung. Moderne Lösungen für Unternehmen.",
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
  verification: {
    google: "your-google-verification-code",
  },
};

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className={inter.className}>{children}</div>;
}


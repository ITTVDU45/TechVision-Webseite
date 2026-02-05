import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./styles/globals.css";
import "./styles/slick-overrides.css";
import CustomCursor from "./components/CustomCursor";
import SmoothScroll from "./components/SmoothScroll";

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
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Techvision',
  },
  openGraph: {
    title: "Techvision - KI-Telefonie & Softwareentwicklung",
    description: "Professionelle KI-Telefonie, Softwareentwicklung und IT-Beratung. Moderne Lösungen für Unternehmen.",
    url: "https://techvision.de",
    siteName: "Techvision",
    images: [
      {
        url: "/images/logo_wei_neu.png.avif",
        width: 1200,
        height: 630,
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
    images: ["/images/logo_wei_neu.png.avif"],
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={inter.className} suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#3B82F6" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <SmoothScroll />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}


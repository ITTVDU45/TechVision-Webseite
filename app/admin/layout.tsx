import type { Metadata, Viewport } from "next";
import AdminShell from "./AdminShell";

export const metadata: Metadata = {
  title: { default: "TechVision CMS", template: "%s · TechVision CMS" },
  description: "Verwaltung der TechVision Website",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
  appleWebApp: {
    capable: true,
    title: "TechVision CMS",
    statusBarStyle: "black-translucent",
  },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#0f172a" },
    { color: "#030712" },
  ],
  colorScheme: "dark",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AdminShell>{children}</AdminShell>;
}

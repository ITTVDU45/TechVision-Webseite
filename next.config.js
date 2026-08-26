/** @type {import('next').NextConfig} */

const remotePatterns = [
  {
    protocol: "http",
    hostname: "localhost",
    port: "3000",
    pathname: "/**",
  },
  {
    protocol: "https",
    hostname: "via.placeholder.com",
    pathname: "/**",
  },
  {
    protocol: "http",
    hostname: "localhost",
    port: "9000",
    pathname: "/**",
  },
];

if (process.env.MINIO_PUBLIC_URL) {
  try {
    const u = new URL(process.env.MINIO_PUBLIC_URL);
    const entry = {
      protocol: u.protocol.replace(":", ""),
      hostname: u.hostname,
      pathname: "/**",
    };
    if (u.port) entry.port = u.port;
    remotePatterns.push(entry);
  } catch {
    // ignorieren
  }
}

const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    remotePatterns,
    unoptimized: false,
  },
  /**
   * Die Startseite lag frueher unter /marketing. Dauerhafte Weiterleitung,
   * damit alte Links, Lesezeichen und Suchergebnisse nicht ins Leere laufen
   * und die Bewertung auf / uebergeht.
   */
  async redirects() {
    return [
      { source: "/marketing", destination: "/", permanent: true },
    ];
  },
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    // Der Build prueft mit. Warnungen brechen ihn nicht ab, Fehler schon.
    ignoreDuringBuilds: false,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

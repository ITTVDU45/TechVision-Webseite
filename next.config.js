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
  trailingSlash: false,
  poweredByHeader: false,
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;

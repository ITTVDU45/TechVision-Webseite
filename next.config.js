/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
    ],
    unoptimized: false,
  },
  // Output configuration for Vercel
  output: 'standalone',
  trailingSlash: false,
  poweredByHeader: false,
  // React 19 Strict Mode
  reactStrictMode: true,
  // ESLint-Fehler sollen den Build nicht stoppen (nur Warnungen)
  eslint: {
    ignoreDuringBuilds: true, // Ignoriere ESLint-Fehler während des Builds
  },
  typescript: {
    ignoreBuildErrors: false, // TypeScript-Fehler sollen den Build stoppen
  },
};

export default nextConfig;


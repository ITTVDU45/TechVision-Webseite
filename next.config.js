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
    ],
    unoptimized: false,
  },
  trailingSlash: false,
  poweredByHeader: false,
  // React 19 Strict Mode
  reactStrictMode: true,
};

export default nextConfig;


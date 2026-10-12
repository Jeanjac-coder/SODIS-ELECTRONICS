import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 640, 828, 1080, 1280, 1600, 1920, 2560],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    // Médiathèques officielles autorisées (pour remplacer les visuels par des versions HD/4K)
    remotePatterns: [
      { protocol: "https", hostname: "www.lg.com" },
      { protocol: "https", hostname: "media.us.lg.com" },
      { protocol: "https", hostname: "gscs.lge.com" },
    ],
  },
  compress: true,
  poweredByHeader: false,
  experimental: { optimizePackageImports: ["lucide-react", "framer-motion"] },
  async redirects() {
    return [{ source: "/services", destination: "/installation-sav", permanent: false }];
  },
  async headers() {
    return [
      {
        source: "/:all*(webp|png|svg|pdf)",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
        ],
      },
    ];
  },
};

export default nextConfig;

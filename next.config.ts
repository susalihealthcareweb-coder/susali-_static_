import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static HTML export -> ./out (deploy to Cloudflare Pages or Vercel)
  output: "export",
  trailingSlash: false,
  images: { unoptimized: true },
  // branded 404 for the whole site (the site has two root layouts: EN and TE)
  experimental: { globalNotFound: true },
  turbopack: {
    rules: {
      "*.css": { loaders: ["@tailwindcss/turbopack"], as: "*.css" },
    },
  },
};

export default nextConfig;

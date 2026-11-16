import type { NextConfig } from "next";

// GITHUB_PAGES=true builds static files (out/) (GitHub Pages preview).
const isPages = process.env.GITHUB_PAGES === "true";

const nextConfig: NextConfig = {
  turbopack: { root: __dirname },
  // The dev server only serves JS to "localhost" by default; opening it from 127.0.0.1
  // gives a page without JS (no effects run). Allow both.
  allowedDevOrigins: ["127.0.0.1"],
  devIndicators: false,
  ...(isPages
    ? {
        output: "export",
        basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
        trailingSlash: true,
        images: { unoptimized: true },
      }
    : {}),
};

export default nextConfig;

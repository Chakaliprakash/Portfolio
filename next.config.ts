import type { NextConfig } from "next";

// Vercel runs the full Next.js runtime. Do not enable static export here:
// generated metadata routes (including the Open Graph image) need Next.js routing.
const nextConfig: NextConfig = {
  trailingSlash: true,
};

export default nextConfig;

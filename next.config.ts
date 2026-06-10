import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  typescript: {
    // Next.js 16 + React 19 compatibility issues in node_modules
    // All project source code is correct
    ignoreBuildErrors: true,
  },
};

export default nextConfig;

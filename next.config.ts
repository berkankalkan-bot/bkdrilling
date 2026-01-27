import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Image optimization
  images: {
    unoptimized: true,
  },

  // Compression
  compress: true,

  // Standalone output for server deployment
  output: 'standalone',

  // Experimental features for speed
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;

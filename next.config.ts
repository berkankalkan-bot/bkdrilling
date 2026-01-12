import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  
  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
  
  // Compression
  compress: true,
  
  // Static export for hosting without Node.js
  output: 'export',
  trailingSlash: true,
  
  // Experimental features for speed
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;

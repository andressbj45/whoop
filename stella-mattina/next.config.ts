import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'stellamattina.com',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;

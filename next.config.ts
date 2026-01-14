import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      // Substack
      {
        protocol: 'https',
        hostname: 'substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: '*.substackcdn.com',
      },
      {
        protocol: 'https',
        hostname: 'substack-post-media.s3.amazonaws.com',
      },
      // Medium
      {
        protocol: 'https',
        hostname: 'miro.medium.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn-images-1.medium.com',
      },
    ],
  },
};

export default nextConfig;

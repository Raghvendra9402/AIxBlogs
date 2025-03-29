import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "unsplash.com",
      },
      // Add more hostnames if you'll be using images from other domains
    ],
  },
};

export default nextConfig;

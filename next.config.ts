import type { NextConfig } from "next";

const nextConfig = {
  images: {
    // List the domains you are pulling images from
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyimage.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/home",
        permanent: true, // Use a permanent redirect for this case
      },
    ];
  },
};

export default nextConfig;

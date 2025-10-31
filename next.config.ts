// next.config.js

// Import the plugin
const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/** @type {import('next').NextConfig} */
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
  // Any other Next.js config options here (like output: 'standalone')

  // The 'webpack' key is how you access the underlying Webpack configuration
  webpack: (config: any, { isServer }: { isServer: boolean }) => {
    // We only want to run this customization for the server-side build
    // (which becomes the Vercel Serverless Function)
    if (isServer) {
      // Add the plugin to the existing list of Webpack plugins
      config.plugins = [...config.plugins, new PrismaPlugin()];
    }

    // Always return the final configuration object
    return config;
  },
};

module.exports = nextConfig;

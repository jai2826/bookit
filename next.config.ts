const { PrismaPlugin } = require("@prisma/nextjs-monorepo-workaround-plugin");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  experimental: {
    // Disables the default Turbopack build
    // This allows your custom 'webpack' config to run without error.
    forceSwcTransforms: true, // Forces usage of the underlying SWC compiler which respects the Webpack hook
  },
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

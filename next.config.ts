import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.180",
        port: "8000",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
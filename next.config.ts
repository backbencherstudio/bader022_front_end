import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.180",
        port: "8000",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
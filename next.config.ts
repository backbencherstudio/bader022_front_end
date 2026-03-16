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
      {
        protocol: "https",
        hostname: "bader.apphero.agency",
      },
      {
        protocol: "https",
        hostname: "bader",
      },
    ],
  },
};

export default nextConfig;

// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   poweredByHeader: false,
//   images: {
//     remotePatterns: [
//       {
//         protocol: "https",
//         hostname: "",
//       },
//       {
//         protocol: "http",
//         hostname: "",
//       },
//     ],
//   },
// };

// export default nextConfig;

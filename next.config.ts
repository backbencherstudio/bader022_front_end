import type { NextConfig } from "next";

const nextConfig: NextConfig = {
<<<<<<< HEAD
  poweredByHeader: false,
=======
>>>>>>> 48c49af9f886763e35352d6196511bc9122fc11d
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.7.180",
        port: "8000",
<<<<<<< HEAD
        pathname: "/uploads/**",
=======
        pathname: "/**",
>>>>>>> 48c49af9f886763e35352d6196511bc9122fc11d
      },
    ],
  },
};

<<<<<<< HEAD
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
=======
export default nextConfig;
>>>>>>> 48c49af9f886763e35352d6196511bc9122fc11d

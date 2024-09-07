/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.0.8",
        pathname: "**",
      },
    ],
  },
};

export default nextConfig;

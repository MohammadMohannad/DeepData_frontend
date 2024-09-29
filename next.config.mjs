import withPWA from "next-pwa";
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true, // Enable React strict mode for improved error handling
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "192.168.0.8",
        pathname: "**",
      },
    ],
  },
  swcMinify: true, // Enable SWC minification for improved performance
};

export default withPWA({
  dest: "public", // destination directory for the PWA files
  register: true, // register the PWA service worker
  skipWaiting: true, // skip waiting for service worker activation
})(nextConfig);

const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    disable: process.env.NODE_ENV !== "production",
    skipWaiting: true,
  },
});

module.exports = nextConfig;

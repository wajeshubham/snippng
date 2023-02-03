const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  disable: process.env.NODE_ENV !== "production",
  skipWaiting: true,
});

module.exports = withPWA({
  // nextConfig
  reactStrictMode: true,
  output: "standalone",
});

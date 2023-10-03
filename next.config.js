// This is the configuration file for Next.js.
// It sets up various settings for the Next.js application.

const nextConfig = {
  // Enable React Strict Mode for better debugging and performance.
  reactStrictMode: true,
  // Configure image domains for Next.js Image component.
  images: {
    domains: ["vidalco.in"], // Add "localhost" here for local development
  },
};

module.exports = nextConfig;

// This is the configuration file for Next.js.
// It sets up various settings for the Next.js application.

const nextConfig = {
  // Configure image domains for Next.js Image component.
  images: {
    domains: ['vidalco.in', 'athletifi-s3.s3.us-east-2.amazonaws.com'], // Add "localhost" here for local development
  },
  // Enable React Strict Mode for better debugging and performance.
  reactStrictMode: true,
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // This is allows you to use images from jsonplaceholder.typicode.com.
        // Eventually this should be replaced with the actual website where the nft images will be pulled from
        protocol: 'https',
        hostname: '**.placeholder.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
}

module.exports = nextConfig

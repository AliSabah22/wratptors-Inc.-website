/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
      { protocol: 'http', hostname: '**' },
      {
        protocol: 'https',
        hostname: 'www.wraptorsinc.com',
        pathname: '/wp-content/uploads/**',
      },
      { protocol: 'https', hostname: 'preferredmechanic.ca' },
    ],
  },
};

module.exports = nextConfig;

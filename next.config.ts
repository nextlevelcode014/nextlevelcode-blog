import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'nextlevelblog.onrender.com',
      },
    ],
    formats: ['image/webp'],
  },
}

export default nextConfig

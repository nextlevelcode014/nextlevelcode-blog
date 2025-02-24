import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  env: {
    SANITY_DATASET: process.env.SANITY_DATASET,
    SANITY_PROJECT_ID: process.env.SANITY_PROJECT_ID,
    API_URL: process.env.API_URL,
    API_KEY: process.env.API_KEY,
  },
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
        protocol: 'http',
        hostname: 'localhost:3000',
      },
    ],
    formats: ['image/webp'],
  },
}

export default nextConfig

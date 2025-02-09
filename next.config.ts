import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  crossOrigin: 'anonymous',
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/api/images/**',
        port: '8080',
        search: '',
      },
    ],
    formats: ['image/webp'],
  },
}

export default nextConfig

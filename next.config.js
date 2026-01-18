/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/fr',
        destination: '/',
        permanent: true,
      },
      {
        source: '/fr/:path*',
        destination: '/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

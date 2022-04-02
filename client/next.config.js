/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  redirects: async () => [
    {
      source: '/contribute/newCoaster.html',
      destination: '/contribute/newCoaster',
      permanent: true,
    }
  ],
}

module.exports = nextConfig

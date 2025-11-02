/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true
  },
  typescript: {
    // Keep TypeScript checks enabled
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig
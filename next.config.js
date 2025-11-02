/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true
  },
  experimental: {
    optimizePackageImports: ['lucide-react']
  },
  eslint: {
    // DISABLE ESLint during production builds completely
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Keep TypeScript checks enabled
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig
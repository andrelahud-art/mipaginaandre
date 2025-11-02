/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    unoptimized: true
  },
  // Next.js 16: optimizePackageImports is now a stable top-level option (no longer under experimental)
  optimizePackageImports: ['lucide-react'],
  typescript: {
    // Keep TypeScript checks enabled
    ignoreBuildErrors: false,
  }
}

module.exports = nextConfig
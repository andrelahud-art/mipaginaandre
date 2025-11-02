import { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://andrelahud.com' // Replace with your actual domain
  
  // Static pages
  const staticPages = [
    '',
    '/sobre-mi',
    '/servicios',
    '/casos',
    '/blog',
    '/contacto'
  ].map(route => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'monthly' as const,
    priority: route === '' ? 1 : 0.8
  }))

  // Blog posts
  const blogPosts = [
    'automatizacion-ia-estrategia',
    'analisis-datos-decisiones-estrategicas', 
    'transformacion-digital-pymes'
  ].map(slug => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: 0.7
  }))

  return [...staticPages, ...blogPosts]
}
import type { Metadata } from "next";
import BlogList from "@/components/BlogList";

export const metadata: Metadata = {
  title: "Blog | André Lahud",
  description: "Artículos sobre IA aplicada, estrategia digital y operación eficiente para empresas que quieren crecer.",
};

async function getBlogPosts() {
  try {
    // In production, this would be an API call
    // For now, we'll read the data directly
    const fs = require('fs');
    const path = require('path');
    const postsPath = path.join(process.cwd(), 'data/blog-posts.json');
    const data = fs.readFileSync(postsPath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="pt-32 pb-16 border-b border-gray-200">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Blog de Estrategia e IA
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Descubre análisis profundos, tendencias del mercado y estrategias que están transformando 
              el panorama empresarial. Todo lo que necesitas para impulsar tu negocio con inteligencia.
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Section */}
      <section className="py-16">
        <div className="container-custom">
          <BlogList posts={posts} />
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container-custom max-w-2xl text-center">
          <h2 className="text-4xl font-bold mb-4">
            No te pierdas ningún insight
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Suscríbete a nuestro newsletter y recibe contenido exclusivo sobre 
            estrategia, IA y creación de valor directo en tu inbox.
          </p>
          
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 px-4 py-3 bg-white/10 border border-white/20 rounded-lg placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-white/30"
              />
              <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors duration-300">
                Suscribirse
              </button>
            </div>
            <p className="text-xs text-blue-100 mt-3">
              📧 Máximo 1 email por semana. Sin spam. Cancelar en cualquier momento.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
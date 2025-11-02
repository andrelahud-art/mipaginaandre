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
    <main className="section-padding pt-32">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Blog de Estrategia e IA
          </h1>
          <p className="text-xl text-accent max-w-3xl mx-auto">
            Análisis profundos, tendencias del mercado y estrategias que están transformando 
            el panorama empresarial. Conocimiento aplicable para impulsar tu negocio.
          </p>
        </div>

        <BlogList posts={posts} />

        {/* Newsletter CTA */}
        <div className="mt-20 text-center">
          <div className="card max-w-2xl mx-auto">
            <div className="text-4xl mb-6">📧</div>
            <h3 className="text-2xl font-bold mb-4">
              No te pierdas ningún insight
            </h3>
            <p className="text-accent mb-8">
              Suscríbete a nuestro newsletter y recibe contenido exclusivo sobre 
              estrategia, IA y creación de valor directo en tu email.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="tu@email.com"
                  className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:border-white/30"
                />
                <button className="btn-primary px-6">
                  Suscribirme
                </button>
              </div>
              <p className="text-xs text-accent mt-2">
                Enviamos máximo 1 email por semana. Sin spam.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-padding pt-32">
      <div className="container-custom">
        <div className="text-center max-w-2xl mx-auto">
          <div className="text-8xl mb-8">🔍</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Artículo no encontrado
          </h1>
          <p className="text-xl text-accent mb-8">
            El artículo que buscas no existe o ha sido movido. 
            Te invitamos a explorar nuestro contenido disponible.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/blog" className="btn-primary">
              Ver todos los artículos
            </Link>
            <Link href="/" className="btn-secondary">
              Ir al inicio
            </Link>
          </div>

          {/* Suggested Articles */}
          <div className="mt-16 pt-8 border-t border-white/10">
            <h2 className="text-2xl font-bold mb-8">Artículos sugeridos</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <article className="card text-left">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">IA</span>
                </div>
                <h3 className="text-lg font-bold mb-2 hover:text-accent transition-colors">
                  <Link href="/blog/automatizacion-ia-estrategia">
                    Automatización con IA: Más Allá de la Eficiencia
                  </Link>
                </h3>
                <p className="text-accent text-sm">
                  Cómo las empresas están usando IA para crear nuevas fuentes de valor...
                </p>
              </article>

              <article className="card text-left">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">Datos</span>
                </div>
                <h3 className="text-lg font-bold mb-2 hover:text-accent transition-colors">
                  <Link href="/blog/analisis-datos-decisiones-estrategicas">
                    Del Análisis a la Acción: Decisiones Basadas en Datos
                  </Link>
                </h3>
                <p className="text-accent text-sm">
                  Framework práctico para convertir insights en decisiones estratégicas...
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
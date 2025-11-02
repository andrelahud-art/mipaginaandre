import Image from "next/image";
import Link from "next/link";
import LogoStrip from "@/components/LogoStrip";
import CTA from "@/components/CTA";

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/hero-linkedin.jpg"
            alt="André Lahud Background"
            fill
            className="object-cover opacity-40"
            priority
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary"></div>
        </div>
        
        <div className="container-custom relative z-10 text-center py-32">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
            Estrategia • Inteligencia Artificial • Creación de Valor
          </h1>
          <p className="text-xl md:text-2xl text-accent mb-12 max-w-3xl mx-auto">
            Convierto objetivos agresivos en resultados medibles. Menos discurso, más ejecución.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contacto" className="btn-primary">
              Agenda un diagnóstico
            </Link>
            <Link href="/casos" className="btn-secondary">
              Ver casos
            </Link>
          </div>
          
          <div className="absolute bottom-8 right-8 md:bottom-16 md:right-16">
            <p className="font-serif italic text-2xl md:text-3xl text-accent/80">
              André Lahud
            </p>
          </div>
        </div>
      </section>

      {/* Frase destacada */}
      <section className="section-padding bg-gradient-to-b from-primary to-primary/95">
        <div className="container-custom text-center">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8">
            Piensa en grande, innova constantemente.
          </h2>
        </div>
      </section>

      {/* Logo Strip */}
      <section className="py-16 bg-white/5">
        <LogoStrip />
      </section>

      {/* Pilares */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-center">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Estrategia</h3>
              <p className="text-accent">
                Rumbo claro antes de tecnología.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-2xl font-bold mb-4">IA Aplicada</h3>
              <p className="text-accent">
                Automatización, personalización y velocidad.
              </p>
            </div>
            
            <div className="card text-center">
              <div className="text-5xl mb-6">📈</div>
              <h3 className="text-2xl font-bold mb-4">Creación de Valor</h3>
              <p className="text-accent">
                ROI, flujo y defensas competitivas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Últimos Insights
            </h2>
            <p className="text-xl text-accent max-w-3xl mx-auto">
              Análisis profundos sobre estrategia, IA y creación de valor. 
              Conocimiento aplicable para impulsar tu negocio.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            <article className="card group hover:scale-105 transition-transform">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">IA</span>
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">Automatización</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                <Link href="/blog/automatizacion-ia-estrategia">
                  Automatización con IA: Más Allá de la Eficiencia
                </Link>
              </h3>
              <p className="text-accent text-sm mb-4">
                Cómo las empresas están usando IA no solo para automatizar tareas, 
                sino para crear nuevas fuentes de valor...
              </p>
              <div className="text-xs text-accent">
                <span>5 min de lectura</span>
                <span className="mx-2">•</span>
                <span>23 Nov 2024</span>
              </div>
            </article>

            <article className="card group hover:scale-105 transition-transform">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">Datos</span>
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">Estrategia</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                <Link href="/blog/analisis-datos-decisiones-estrategicas">
                  Del Análisis a la Acción: Decisiones Basadas en Datos
                </Link>
              </h3>
              <p className="text-accent text-sm mb-4">
                Framework práctico para convertir insights de datos en decisiones 
                estratégicas que impulsen el crecimiento...
              </p>
              <div className="text-xs text-accent">
                <span>8 min de lectura</span>
                <span className="mx-2">•</span>
                <span>20 Nov 2024</span>
              </div>
            </article>

            <article className="card group hover:scale-105 transition-transform">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">Digital</span>
                <span className="bg-white/10 px-2 py-1 rounded-full text-xs text-accent">PyME</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                <Link href="/blog/transformacion-digital-pymes">
                  Transformación Digital para PyMEs: Hoja de Ruta
                </Link>
              </h3>
              <p className="text-accent text-sm mb-4">
                Guía paso a paso para que las pequeñas y medianas empresas 
                aborden la digitalización sin perder el foco...
              </p>
              <div className="text-xs text-accent">
                <span>6 min de lectura</span>
                <span className="mx-2">•</span>
                <span>18 Nov 2024</span>
              </div>
            </article>
          </div>

          <div className="text-center">
            <Link href="/blog" className="btn-primary">
              Ver todos los artículos
            </Link>
          </div>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="section-padding bg-white/5">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            Cómo trabajo
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-4">Diagnóstico brutalmente honesto</h3>
              <p className="text-accent">
                Sin filtros. Identifico lo que frena y lo que impulsa.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-4">Prototipo en 7-14 días</h3>
              <p className="text-accent">
                Prueba rápida con métricas reales antes de escalar.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-4">Escalamiento y métricas</h3>
              <p className="text-accent">
                Iteración continua con tableros y responsables claros.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <CTA 
        title="Si no medimos, no sirve."
        description="Agenda ahora y empecemos con diagnóstico sin compromiso."
        buttonText="Agenda ahora"
        buttonLink="/contacto"
      />
    </>
  );
}
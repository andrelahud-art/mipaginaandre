import Link from "next/link";
import LogoStrip from "@/components/LogoStrip";
import CTA from "@/components/CTA";
import { AnimatedElement } from "@/components/AnimatedElement";
import MiHistoria from "@/components/MiHistoria";
import RocketAnimation from "@/components/RocketAnimation";
import StarfieldBackground from "@/components/StarfieldBackground";
import NeonTitle from "@/components/NeonTitle";
import HomeScrollFX from "@/components/HomeScrollFX";

export default function HomePage() {
  return (
    <div className="relative min-h-screen theme-dark overflow-hidden">
      {/* Live starfield background (GPU) */}
      <StarfieldBackground accent="#60A5FA" />
      <HomeScrollFX />
      {/* Left-side rocket with subtle tilt */}
      <RocketAnimation />

      {/* HERO */}
      <header id="hero" className="relative z-10 text-center py-32 section-padding">
        <div className="container-custom">
          <div className="space-y-3 mb-8">
            <NeonTitle
              lines={["Estrategia", "Inteligencia Artificial", "Creación de Valor"]}
              className="mx-auto"
              accent="#60A5FA"
            />
          </div>
          <AnimatedElement delay={0.6}>
            <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Convierto objetivos agresivos en resultados medibles. Menos discurso, más ejecución.
            </p>
          </AnimatedElement>
          <AnimatedElement delay={0.8}>
            <div className="flex items-center justify-center gap-4">
              <a href="#pilares" className="btn-primary">Ver pilares</a>
              <a href="/contacto" className="btn-secondary">Hablemos</a>
            </div>
          </AnimatedElement>
        </div>
      </header>
      
      {/* Logo Strip (ya es un componente) */}
      <AnimatedElement delay={0.3}>
        <LogoStrip />
      </AnimatedElement>

      {/* Pilares */}
      <section id="pilares" className="section-padding bg-white/5 backdrop-blur-sm">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            {/* Aplicar animación con delay a cada pilar */}
            <AnimatedElement delay={0} className="card text-center bg-white/5 border-white/10">
              <div className="text-5xl mb-6">🎯</div>
              <h3 className="text-2xl font-bold mb-4">Estrategia</h3>
              <p className="text-gray-300">
                 Rumbo claro antes de tecnología.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={0.1} className="card text-center bg-white/5 border-white/10">
              <div className="text-5xl mb-6">🤖</div>
              <h3 className="text-2xl font-bold mb-4">IA Aplicada</h3>
              <p className="text-gray-300">
                 Automatización, personalización y velocidad.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={0.2} className="card text-center bg-white/5 border-white/10">
              <div className="text-5xl mb-6">📈</div>
              <h3 className="text-2xl font-bold mb-4">Creación de Valor</h3>
              <p className="text-gray-300">
                 Resultados medibles y ROI.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
               Insights Recientes
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
               Análisis profundos sobre estrategia, IA y creación de valor. 
               Conocimiento aplicable para impulsar tu negocio.
            </p>
          </AnimatedElement>
          
          {/* Aquí iría un componente <BlogList posts={...} /> si cargaras los posts */}
          {/* Por ahora, es un preview estático o un CTA al blog */}
          <AnimatedElement delay={0.1} className="text-center">
            <Link href="/blog" className="btn-primary">
              Ver todos los artículos
            </Link>
          </AnimatedElement>
        </div>
      </section>

      {/* Cómo trabajo */}
      <section className="section-padding bg-white/5 backdrop-blur-sm">
        <div className="container-custom">
          <AnimatedElement className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center text-white">
              Cómo trabajo
            </h2>
          </AnimatedElement>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <AnimatedElement delay={0} className="text-center">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                1
              </div>
              <h3 className="text-xl font-bold mb-2">Diagnóstico</h3>
              <p className="text-gray-300">
                Sin filtros. Identifico lo que frena y lo que impulsa.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={0.1} className="text-center">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                2
              </div>
              <h3 className="text-xl font-bold mb-2">Piloto</h3>
              <p className="text-gray-300">
                Prueba rápida con métricas reales antes de escalar.
              </p>
            </AnimatedElement>
            
            <AnimatedElement delay={0.2} className="text-center">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6">
                3
              </div>
              <h3 className="text-xl font-bold mb-2">Escalado</h3>
              <p className="text-gray-300">
                Implementación completa con optimización continua.
              </p>
            </AnimatedElement>
          </div>
        </div>
      </section>
      {/* Mi Historia - Sección innovadora */}
      <MiHistoria />
    </div>
  );
}
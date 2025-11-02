import type { Metadata } from "next";
import Image from "next/image";
import CTA from "@/components/CTA";

export const metadata: Metadata = {
  title: "Sobre Mí | André Lahud",
  description: "Hago que la estrategia y la IA trabajen para el negocio —no al revés. Vengo de operar, vender y construir en el mundo real.",
};

export default function SobreMi() {
  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-custom max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-8">
            Sobre Mí
          </h1>
          
          {/* Imagen de perfil y texto principal */}
          <div className="grid md:grid-cols-3 gap-12 items-center mb-12">
            <div className="md:col-span-1">
              <div className="relative mx-auto max-w-sm">
                <Image
                  src="/andre-lahud-perfil.jpg"
                  alt="André Lahud - Estrategia y IA para negocios"
                  width={400}
                  height={400}
                  className="rounded-2xl object-cover border-4 border-accent/20 shadow-2xl w-full"
                  priority
                />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-transparent to-primary/10"></div>
              </div>
            </div>
            
            <div className="md:col-span-2">
              <div className="prose prose-invert prose-lg max-w-none">
                <p className="text-xl text-accent leading-relaxed mb-6">
                  Soy André Lahud. Hago que la estrategia y la IA trabajen para el negocio —no al revés. 
                  Vengo de operar, vender y construir en el mundo real.
                </p>
                
                <p className="text-lg text-accent/90 leading-relaxed">
                  He ejecutado e-commerce, entrenamientos de IA y proyectos de mejora para pymes y equipos directivos. 
                  Mi regla: foco, iteración y números.
                </p>
              </div>
            </div>
          </div>

          <div className="card mb-16">
            <h2 className="text-3xl font-bold mb-8">Creencias no negociables</h2>
            <ul className="space-y-6">
              <li className="flex items-start">
                <span className="text-2xl mr-4">→</span>
                <span className="text-lg text-accent">
                  La estrategia manda sobre la herramienta.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">→</span>
                <span className="text-lg text-accent">
                  Todo plan merece una hipótesis de fracaso y contramedidas.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-2xl mr-4">→</span>
                <span className="text-lg text-accent">
                  La IA es una navaja, no una religión.
                </span>
              </li>
            </ul>
          </div>

          <div className="card bg-white/10">
            <h2 className="text-2xl font-bold mb-6">Datos de contacto</h2>
            <div className="space-y-4 text-lg">
              <p>
                <span className="text-accent">Email:</span>{" "}
                <a href="mailto:a00573316@itesm.mx" className="hover:text-white transition-colors">
                  a00573316@itesm.mx
                </a>
              </p>
              <p>
                <span className="text-accent">WhatsApp:</span>{" "}
                <a href="https://wa.me/524777068594" className="hover:text-white transition-colors" target="_blank" rel="noopener noreferrer">
                  +52 477-706-8594
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <CTA 
        title="¿Hablamos de tu proyecto?"
        description="Sin compromisos. Solo una conversación directa sobre cómo puedo ayudarte."
        buttonText="Contactar"
        buttonLink="/contacto"
      />
    </>
  );
}
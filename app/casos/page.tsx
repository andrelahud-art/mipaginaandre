import type { Metadata } from "next";
import CardCaso from "@/components/CardCaso";
import CTA from "@/components/CTA";
import casosData from "@/data/casos.json";

export const metadata: Metadata = {
  title: "Casos de Éxito | André Lahud",
  description: "Casos reales de transformación digital, implementación de IA y estrategia de crecimiento con resultados medibles.",
};

export default function Casos() {
  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Casos de Éxito
          </h1>
          <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-16">
            Resultados reales con empresas que decidieron actuar.
          </p>
          
          <div className="space-y-12">
            {casosData.map((caso, index) => (
              <CardCaso key={index} {...caso} />
            ))}
          </div>
        </div>
      </section>

      <CTA 
        title="¿Listo para tu propio caso de éxito?"
        description="Solicita un diagnóstico y veamos qué podemos lograr juntos."
        buttonText="Solicitar diagnóstico"
        buttonLink="/contacto"
      />
    </>
  );
}
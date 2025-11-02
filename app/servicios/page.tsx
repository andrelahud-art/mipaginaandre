import type { Metadata } from "next";
import CardServicio from "@/components/CardServicio";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import serviciosData from "@/data/servicios.json";

export const metadata: Metadata = {
  title: "Servicios | André Lahud",
  description: "Transformación con IA, entrenamientos para equipos comerciales y estrategia de escalamiento. Resultados medibles desde la primera semana.",
};

export default function Servicios() {
  return (
    <>
      <section className="section-padding pt-32">
        <div className="container-custom">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 text-center">
            Servicios
          </h1>
          <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-16">
            Cada servicio está diseñado para generar resultados medibles en semanas, no en meses.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {serviciosData.map((servicio, index) => (
              <CardServicio key={index} {...servicio} />
            ))}
          </div>
        </div>
      </section>

      <Pricing />

      <CTA 
        title="¿Cuál es el servicio ideal para ti?"
        description="Agenda una llamada de diagnóstico y lo descubrimos juntos."
        buttonText="Agendar diagnóstico"
        buttonLink="/contacto"
      />
    </>
  );
}
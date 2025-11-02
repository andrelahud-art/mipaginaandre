import type { Metadata } from "next";
import CardServicio from "@/components/CardServicio";
import Pricing from "@/components/Pricing";
import CTA from "@/components/CTA";
import serviciosData from "@/data/servicios.json";
import StarfieldBackground from "@/components/StarfieldBackground";
import NeonTitle from "@/components/NeonTitle";
import HomeScrollFX from "@/components/HomeScrollFX";

export const metadata: Metadata = {
  title: "Servicios | André Lahud",
  description: "Transformación con IA, entrenamientos para equipos comerciales y estrategia de escalamiento. Resultados medibles desde la primera semana.",
};

export default function Servicios() {
  return (
    <div className="theme-dark relative overflow-hidden min-h-screen">
      {/* lighter starfield for services */}
      <StarfieldBackground accent="#60A5FA" density={2200} />
  <HomeScrollFX heroSelector="#hero-servicios" duration={0.35} boost={0.6} />
      <section id="hero-servicios" className="section-padding pt-32 relative z-10">
        <div className="container-custom">
          <div className="flex items-center justify-center mb-6">
            <NeonTitle lines={["Servicios"]} />
          </div>
          <p className="text-xl text-blue-300 text-center max-w-3xl mx-auto mb-16">
            Cada servicio está diseñado para generar resultados medibles en semanas, no en meses.
          </p>
          
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {serviciosData.map((servicio, index) => (
              <CardServicio key={index} {...servicio} />
            ))}
          </div>
        </div>
      </section>

      <div className="relative z-10">
        <Pricing />
      </div>

      <div className="relative z-10">
        <CTA 
          title="¿Cuál es el servicio ideal para ti?"
          description="Agenda una llamada de diagnóstico y lo descubrimos juntos."
          buttonText="Agendar diagnóstico"
          buttonLink="/contacto"
        />
      </div>
    </div>
  );
}
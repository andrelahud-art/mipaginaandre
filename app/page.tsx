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
              <a href="/servicios" className="btn-primary">Ver servicios</a>
              <a href="/contacto" className="btn-secondary">Hablemos</a>
            </div>
          </AnimatedElement>
        </div>
      </header>
      
      {/* Logo Strip (ya es un componente) */}
      <AnimatedElement delay={0.3}>
        <LogoStrip />
      </AnimatedElement>

      {/* Mi Historia - Sección innovadora */}
      <MiHistoria />
    </div>
  );
}
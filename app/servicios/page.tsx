import type { Metadata } from "next";
import Link from "next/link";
import { Check, TrendingUp, Zap, Target } from "lucide-react";
import StarfieldBackground from "@/components/StarfieldBackground";
import NeonTitle from "@/components/NeonTitle";
import HomeScrollFX from "@/components/HomeScrollFX";
import { AnimatedElement } from "@/components/AnimatedElement";

export const metadata: Metadata = {
  title: "Servicios | André Lahud - Transformación Estratégica con IA",
  description: "De la operación manual a la estrategia inteligente. Implementación práctica de herramientas y sistemas que devuelven tiempo y enfoque a tu equipo.",
};

export default function Servicios() {
  const phases = [
    {
      number: "01",
      icon: <Target className="w-8 h-8" />,
      title: "Diagnóstico Estratégico",
      subtitle: "El punto de partida",
      description: "Juntos, mapeamos tus procesos actuales para identificar los cuellos de botella que frenan tu crecimiento. No se trata de tecnología, se trata de claridad.",
      benefits: [
        "Análisis profundo de flujos de trabajo",
        "Identificación de áreas de alto impacto para la optimización",
        "Diseño de un roadmap de herramientas y procesos a medida",
        "Definición de métricas clave para medir el éxito"
      ],
      cta: "Iniciar Diagnóstico",
      recommended: false,
      gradient: "from-blue-600 to-cyan-600"
    },
    {
      number: "02",
      icon: <Zap className="w-8 h-8" />,
      title: "Implementación y Capacitación",
      subtitle: "Del plan a la acción",
      description: "Integramos las herramientas prácticas en tu operación y, lo más importante, capacitamos a tu equipo para que las adopten y las amen.",
      benefits: [
        "Configuración e integración del stack tecnológico definido",
        "Creación de 'Playbooks' de uso para una adopción sin fricción",
        "Talleres prácticos enfocados en el uso diario y la obtención de valor",
        "Implementación de tableros de control para visibilidad total"
      ],
      cta: "Explorar Implementación",
      recommended: true,
      gradient: "from-indigo-600 to-purple-600"
    },
    {
      number: "03",
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Acompañamiento y Evolución",
      subtitle: "Transformación continua",
      description: "La verdadera transformación es un proceso continuo. Te acompañamos para asegurar que las nuevas capacidades se traduzcan en resultados sostenibles y exponenciales.",
      benefits: [
        "Soporte continuo para resolver dudas y optimizar el uso",
        "Revisiones trimestrales de rendimiento contra objetivos",
        "Iteración y mejora continua de los sistemas implementados",
        "Asesoría para escalar el impacto a nuevas áreas del negocio"
      ],
      cta: "Conocer Más",
      recommended: false,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  return (
    <div className="theme-dark relative overflow-x-hidden min-h-screen">
      <StarfieldBackground accent="#60A5FA" density={2200} />
      <HomeScrollFX heroSelector="#hero-servicios" duration={0.35} boost={0.6} />

      {/* Hero Section */}
      <section id="hero-servicios" className="section-padding pt-32 relative z-10">
        <div className="container-custom max-w-7xl">
          <AnimatedElement direction="up">
            <div className="flex items-center justify-center mb-8">
              <NeonTitle lines={["Transformación", "Estratégica"]} />
            </div>
          </AnimatedElement>

          {/* Value Proposition */}
          <AnimatedElement delay={0.2} direction="up">
            <div className="max-w-4xl mx-auto mb-20">
              <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-6">
                De la Operación Manual a la <span className="text-blue-400">Estrategia Inteligente</span>
              </h2>
              <p className="text-lg text-gray-300 text-center leading-relaxed mb-6">
                En cada negocio existe un punto de inflexión: el momento en que las tareas repetitivas ahogan la visión estratégica. El día se consume en apagar incendios, en lugar de diseñar el futuro. <span className="text-white font-semibold">Lo sé porque lo he vivido.</span>
              </p>
              <p className="text-lg text-blue-300 text-center leading-relaxed">
                Mi propósito no es venderte "automatización". Es <span className="text-white font-bold">devolverte tu recurso más valioso: el tiempo y el enfoque de tu equipo</span>. Lo hacemos a través de la implementación de herramientas prácticas y sistemas inteligentes que potencian tus capacidades, permitiéndote pasar del "hacer" manual al "lograr" estratégico.
              </p>
            </div>
          </AnimatedElement>

          {/* Package Label */}
          <AnimatedElement delay={0.3} direction="up">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-400/30 px-6 py-3 rounded-full backdrop-blur-sm">
                <span className="text-2xl">📦</span>
                <span className="text-lg font-bold text-white">Paquete Integral de Transformación</span>
              </div>
            </div>
          </AnimatedElement>

          {/* Three Phases - Fixed Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
            {phases.map((phase, index) => (
              <AnimatedElement key={index} delay={0.4 + (index * 0.1)} direction="up">
                <div className="relative h-full group">
                  {/* Recommended Badge */}
                  {phase.recommended && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 z-20">
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                        ⭐ Recomendado
                      </div>
                    </div>
                  )}

                  {/* Card */}
                  <div className={`relative h-full bg-white/5 backdrop-blur-sm border-2 ${
                    phase.recommended ? 'border-yellow-400/50' : 'border-white/10'
                  } rounded-2xl p-8 hover:bg-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl ${
                    phase.recommended ? 'shadow-yellow-400/20' : ''
                  }`}>

                    {/* Phase Number */}
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${phase.gradient} mb-6 text-white shadow-lg`}>
                      {phase.icon}
                    </div>

                    {/* Title */}
                    <div className="mb-4">
                      <div className={`text-6xl font-black bg-gradient-to-r ${phase.gradient} bg-clip-text text-transparent mb-2`}>
                        {phase.number}
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-1">{phase.title}</h3>
                      <p className="text-blue-300 text-sm font-medium">{phase.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-gray-300 mb-6 leading-relaxed text-sm">
                      {phase.description}
                    </p>

                    {/* Benefits */}
                    <ul className="space-y-3 mb-8">
                      {phase.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm">
                          <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-300">{benefit}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href="/contacto"
                      className={`w-full inline-flex items-center justify-center px-6 py-4 bg-gradient-to-r ${phase.gradient} text-white font-bold rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 text-center`}
                    >
                      {phase.cta}
                    </Link>
                  </div>
                </div>
              </AnimatedElement>
            ))}
          </div>

          {/* Why This Approach */}
          <AnimatedElement delay={0.8} direction="up">
            <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 border border-blue-400/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm max-w-5xl mx-auto">
              <h3 className="text-2xl md:text-3xl font-bold text-white text-center mb-6">
                ¿Por qué este enfoque funciona?
              </h3>
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-4xl font-bold text-blue-400 mb-2">100%</div>
                  <p className="text-gray-300 text-sm">Práctico y aplicable desde el primer día</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-purple-400 mb-2">3-6</div>
                  <p className="text-gray-300 text-sm">Semanas para ver resultados medibles</p>
                </div>
                <div>
                  <div className="text-4xl font-bold text-pink-400 mb-2">∞</div>
                  <p className="text-gray-300 text-sm">Impacto sostenible y escalable</p>
                </div>
              </div>
            </div>
          </AnimatedElement>

          {/* Final CTA */}
          <AnimatedElement delay={1} direction="up">
            <div className="text-center mt-16">
              <h3 className="text-2xl font-bold text-white mb-4">
                ¿Listo para recuperar tu tiempo y enfoque?
              </h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                Agenda una llamada de diagnóstico gratuita y descubramos juntos el camino hacia tu transformación estratégica.
              </p>
              <Link
                href="/contacto"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold text-lg rounded-xl hover:shadow-2xl hover:shadow-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                <span>Agendar Diagnóstico Gratuito</span>
                <span className="text-2xl">→</span>
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </div>
  );
}
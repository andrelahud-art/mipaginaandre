import Link from "next/link";
import { AnimatedElement } from "@/components/AnimatedElement";
import MiHistoria from "@/components/MiHistoria";
import StarfieldBackground from "@/components/StarfieldBackground";
import { TrendingUp, Target, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* HERO Section - Dark with Starfield */}
      <div className="theme-dark relative">
        <StarfieldBackground accent="#60A5FA" />

        <header id="hero" className="relative z-10 text-center py-32 section-padding min-h-[60vh] flex items-center">
          <div className="container-custom max-w-5xl mx-auto">
            <AnimatedElement delay={0.2}>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
                Somos especialistas en convertir <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">modelos de negocio</span> en <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">plataformas de crecimiento</span>
              </h1>
            </AnimatedElement>
            <AnimatedElement delay={0.4}>
              <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Diagnóstico, rediseño y escalabilidad con inteligencia artificial y estrategia de valor.
              </p>
            </AnimatedElement>
          </div>
        </header>
      </div>

      {/* CTA Section - Gradient Transition Blue to Teal */}
      <section className="relative z-10 bg-gradient-to-br from-[#1e3a5f] via-[#1a4d5c] to-[#0f5257] py-20 md:py-32">
        <div className="container-custom max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <AnimatedElement delay={0.2} direction="left">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                    ¿Tu empresa depende <span className="text-yellow-400">demasiado de ti</span>?
                  </h2>
                  <h3 className="text-2xl md:text-3xl font-semibold text-cyan-300">
                    ¿Podrías vender más si tus procesos fueran claros y automáticos?
                  </h3>
                </div>

                <p className="text-xl text-gray-200 leading-relaxed">
                  Si respondiste <span className="font-bold text-white">'sí'</span>, te ayudo a convertir tu PyME en un sistema escalable con <span className="text-cyan-300 font-semibold">estrategia e inteligencia artificial</span>.
                </p>

                <div className="pt-4">
                  <Link
                    href="/contacto"
                    className="inline-flex flex-col items-center justify-center px-8 py-5 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-gray-900 font-bold text-lg rounded-xl shadow-2xl shadow-yellow-500/50 hover:shadow-yellow-500/70 transition-all duration-300 hover:scale-105"
                  >
                    <span className="text-xl">Agenda una cita estratégica</span>
                    <span className="text-sm font-normal mt-1 opacity-90">15 minutos · Diagnóstico inicial sin costo</span>
                  </Link>
                </div>
              </div>
            </AnimatedElement>

            {/* Right: Visual Element */}
            <AnimatedElement delay={0.4} direction="right">
              <div className="relative">
                {/* Dashboard/Growth Visual */}
                <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/20 rounded-2xl p-8 shadow-2xl">
                  <div className="space-y-6">
                    {/* Metric Cards */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <TrendingUp className="w-5 h-5 text-cyan-400" />
                          <span className="text-xs text-gray-300 uppercase tracking-wider">Crecimiento</span>
                        </div>
                        <div className="text-3xl font-bold text-white">+156%</div>
                      </div>
                      <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-400/30 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Target className="w-5 h-5 text-yellow-400" />
                          <span className="text-xs text-gray-300 uppercase tracking-wider">Eficiencia</span>
                        </div>
                        <div className="text-3xl font-bold text-white">-40%</div>
                      </div>
                    </div>

                    {/* Progress Bars */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Automatización</span>
                          <span className="text-sm font-bold text-cyan-400">92%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 w-[92%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">Escalabilidad</span>
                          <span className="text-sm font-bold text-yellow-400">87%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 w-[87%] rounded-full"></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-300">ROI</span>
                          <span className="text-sm font-bold text-green-400">95%</span>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-green-400 to-emerald-500 w-[95%] rounded-full"></div>
                        </div>
                      </div>
                    </div>

                    {/* Icon Grid */}
                    <div className="grid grid-cols-3 gap-3 pt-4">
                      <div className="flex items-center justify-center h-16 bg-white/5 rounded-lg border border-white/10">
                        <Zap className="w-6 h-6 text-yellow-400" />
                      </div>
                      <div className="flex items-center justify-center h-16 bg-white/5 rounded-lg border border-white/10">
                        <Target className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div className="flex items-center justify-center h-16 bg-white/5 rounded-lg border border-white/10">
                        <TrendingUp className="w-6 h-6 text-green-400" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400/20 rounded-full blur-2xl animate-pulse"></div>
                <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-cyan-400/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1s' }}></div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </section>

      {/* Mi Historia - Teal to Dark Gray Gradient */}
      <MiHistoria />
    </div>
  );
}
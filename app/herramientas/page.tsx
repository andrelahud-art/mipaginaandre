"use client";

import { useState } from "react";
import type { Metadata } from "next";
import ToolCard from "@/components/ToolCard";
import CTA from "@/components/CTA";
import herramientasData from "@/data/herramientas.json";
import StarfieldBackground from "@/components/StarfieldBackground";
import NeonTitle from "@/components/NeonTitle";
import HomeScrollFX from "@/components/HomeScrollFX";
import { AnimatedElement } from "@/components/AnimatedElement";

// Note: metadata export doesn't work in client components, moved to layout or use generateMetadata

export default function Herramientas() {
  const [selectedCategory, setSelectedCategory] = useState<string>("Todas");

  // Extract unique categories
  const categories = ["Todas", ...Array.from(new Set(herramientasData.map(h => h.categoria)))];

  // Filter tools by category
  const filteredTools = selectedCategory === "Todas"
    ? herramientasData
    : herramientasData.filter(h => h.categoria === selectedCategory);

  return (
    <div className="theme-dark relative overflow-hidden min-h-screen">
      <StarfieldBackground accent="#818CF8" density={2400} />
      <HomeScrollFX heroSelector="#hero-herramientas" duration={0.4} boost={0.65} />

      <section id="hero-herramientas" className="section-padding pt-32 relative z-10">
        <div className="container-custom">
          {/* Hero */}
          <AnimatedElement delay={0.1} direction="up">
            <div className="flex items-center justify-center mb-6">
              <NeonTitle lines={["Herramientas", "para Emprendedores"]} accent="#818CF8" />
            </div>
          </AnimatedElement>

          <AnimatedElement delay={0.2} direction="up">
            <p className="text-xl text-indigo-300 text-center max-w-3xl mx-auto mb-12">
              Las mejores herramientas para acelerar tu startup. Curadas, probadas y recomendadas.
            </p>
          </AnimatedElement>

          {/* Category filters */}
          <AnimatedElement delay={0.3} direction="up">
            <div className="flex flex-wrap justify-center gap-3 mb-16">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${selectedCategory === category
                      ? 'bg-indigo-500 text-white shadow-lg shadow-indigo-500/50'
                      : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                    }
                  `}
                >
                  {category}
                </button>
              ))}
            </div>
          </AnimatedElement>

          {/* Tools grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {filteredTools.map((tool, index) => (
              <AnimatedElement key={index} delay={0.4 + (index * 0.05)} direction="up">
                <ToolCard {...tool} />
              </AnimatedElement>
            ))}
          </div>

          {/* Stats section */}
          <AnimatedElement delay={0.5} direction="up">
            <div className="grid md:grid-cols-3 gap-8 mb-20">
              <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-indigo-400 mb-2">
                  {herramientasData.length}+
                </div>
                <p className="text-gray-400">Herramientas curadas</p>
              </div>
              <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-indigo-400 mb-2">
                  {categories.length - 1}
                </div>
                <p className="text-gray-400">Categorías</p>
              </div>
              <div className="text-center p-8 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl font-bold text-indigo-400 mb-2">
                  100%
                </div>
                <p className="text-gray-400">Probadas en producción</p>
              </div>
            </div>
          </AnimatedElement>
        </div>
      </section>

      {/* CTA Section */}
      <div className="relative z-10">
        <CTA
          title="¿Necesitas ayuda implementando estas herramientas?"
          description="Te ayudo a elegir el stack perfecto para tu negocio y configurarlo correctamente."
          buttonText="Agenda una consultoría"
          buttonLink="/contacto"
        />
      </div>
    </div>
  );
}

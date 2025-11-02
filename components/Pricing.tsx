import Link from "next/link";
import { ArrowRight } from 'lucide-react';

export default function Pricing() {
  const servicios = [
    {
      nombre: "Diagnóstico Estratégico",
      descripcion: "El punto de partida. Juntos, mapeamos tus procesos actuales para identificar los cuellos de botella que frenan tu crecimiento. No se trata de tecnología, se trata de claridad.",
      incluye: [
        "Análisis profundo de flujos de trabajo.",
        "Identificación de áreas de alto impacto para la optimización.",
        "Diseño de un roadmap de herramientas y procesos a medida.",
        "Definición de métricas clave para medir el éxito.",
      ],
      cta: "Iniciar Diagnóstico",
    },
    {
      nombre: "Implementación y Capacitación",
      destacado: true,
      descripcion: "Pasamos del plan a la acción. Integramos las herramientas prácticas en tu operación y, lo más importante, capacitamos a tu equipo para que las adopten y las amen.",
      incluye: [
        "Configuración e integración del stack tecnológico definido.",
        "Creación de 'Playbooks' de uso para una adopción sin fricción.",
        "Talleres prácticos enfocados en el uso diario y la obtención de valor.",
        "Implementación de tableros de control para visibilidad total.",
      ],
      cta: "Explorar Implementación",
    },
    {
      nombre: "Acompañamiento y Evolución",
      descripcion: "La verdadera transformación es un proceso continuo. Te acompañamos para asegurar que las nuevas capacidades se traduzcan en resultados sostenibles y exponenciales.",
      incluye: [
        "Soporte continuo para resolver dudas y optimizar el uso.",
        "Revisiones trimestrales de rendimiento contra objetivos.",
        "Iteración y mejora continua de los sistemas implementados.",
        "Asesoría para escalar el impacto a nuevas áreas del negocio.",
      ],
      cta: "Conocer Más",
    },
  ];

  return (
    <section className="section-padding bg-gray-900 text-white">
      <div className="container-custom">
        
        {/* Storytelling Intro */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-teal-300">
            De la Operación Manual a la Estrategia Inteligente
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            En cada negocio existe un punto de inflexión: el momento en que las tareas repetitivas ahogan la visión estratégica. El día se consume en apagar incendios, en lugar de diseñar el futuro. Lo sé porque lo he vivido.
            <br/><br/>
            Mi propósito no es venderte "automatización". Es devolverte tu recurso más valioso: <strong className="text-white">el tiempo y el enfoque de tu equipo</strong>. Lo hacemos a través de la implementación de herramientas prácticas y sistemas inteligentes que potencian tus capacidades, permitiéndote pasar del "hacer" manual al "lograr" estratégico.
          </p>
        </div>

        {/* Servicios */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {servicios.map((servicio) => (
            <div
              key={servicio.nombre}
              className={`bg-gray-800/50 rounded-2xl p-8 flex flex-col transition-transform duration-300 hover:scale-105 hover:bg-gray-800/80 ${
                servicio.destacado ? "ring-2 ring-blue-500" : "ring-1 ring-white/10"
              }`}
            >
              <div className="flex-grow">
                {servicio.destacado && (
                  <div className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                    Recomendado
                  </div>
                )}
                
                <h3 className="text-2xl font-bold mb-4 text-white">{servicio.nombre}</h3>
                <p className="text-gray-400 text-sm mb-6">{servicio.descripcion}</p>
                
                <ul className="space-y-3 mb-8">
                  {servicio.incluye.map((item, index) => (
                    <li key={index} className="flex items-start text-sm text-gray-300">
                      <span className="text-blue-400 mr-3 mt-1">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <Link
                href="/contacto"
                className={`mt-auto group ${
                  servicio.destacado ? "btn-primary" : "btn-secondary"
                } w-full text-center`}
              >
                {servicio.cta}
                <ArrowRight className="inline-block ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
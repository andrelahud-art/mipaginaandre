import Link from "next/link";

export default function Pricing() {
  const paquetes = [
    {
      nombre: "Arranca",
      precio: "3,500",
      descripcion: "Ideal para validar una idea o automatizar un proceso específico",
      incluye: [
        "Diagnóstico inicial (1 sesión)",
        "Prototipo funcional de 1 automatización o asistente",
        "Documentación básica",
        "1 revisión incluida",
      ],
    },
    {
      nombre: "Fortalece",
      precio: "6,000",
      destacado: true,
      descripcion: "Para equipos que buscan resultados medibles en ventas u operaciones",
      incluye: [
        "Todo lo de Arranca",
        "Entrenamiento para 1 equipo (ventas u operaciones)",
        "Playbook con prompts y flujos",
        "Dashboard de métricas",
        "2 sesiones de seguimiento",
      ],
    },
    {
      nombre: "Escala",
      precio: "8,000",
      descripcion: "Estrategia completa con IA aplicada para crecimiento sostenido",
      incluye: [
        "Todo lo de Fortalece",
        "Roadmap estratégico trimestral",
        "OKRs y tableros de control",
        "3-5 automatizaciones integradas",
        "Soporte mensual incluido",
      ],
    },
  ];

  return (
    <section className="section-padding bg-white/5">
      <div className="container-custom">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-center">
          Paquetes
        </h2>
        <p className="text-xl text-accent text-center max-w-3xl mx-auto mb-16">
          Precios en MXN. Todos los paquetes incluyen diagnóstico y entregables claros.
        </p>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {paquetes.map((paquete) => (
            <div
              key={paquete.nombre}
              className={`card ${
                paquete.destacado ? "ring-2 ring-white/30 scale-105" : ""
              }`}
            >
              {paquete.destacado && (
                <div className="bg-white text-primary px-4 py-1 rounded-full text-sm font-bold inline-block mb-4">
                  Más popular
                </div>
              )}
              
              <h3 className="text-2xl font-bold mb-2">{paquete.nombre}</h3>
              <div className="mb-4">
                <span className="text-5xl font-bold">${paquete.precio}</span>
                <span className="text-accent"> MXN</span>
              </div>
              <p className="text-accent text-sm mb-6">{paquete.descripcion}</p>
              
              <ul className="space-y-3 mb-8">
                {paquete.incluye.map((item, index) => (
                  <li key={index} className="flex items-start text-sm">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              
              <Link
                href="/contacto"
                className={`${
                  paquete.destacado ? "btn-primary" : "btn-secondary"
                } w-full text-center`}
              >
                Contratar
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
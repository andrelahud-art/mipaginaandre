import Link from "next/link";
import { Check, Zap, TrendingUp, Rocket, Target } from "lucide-react";

const courses = [
  {
    id: 1,
    slug: "despierta",
    title: "Despierta, cabrón",
    price: "$0",
    priceCents: 0,
    level: 1,
    icon: Zap,
    tagline: "Rompe la flojera, actúa hoy",
    color: "from-orange-500 to-red-600",
    borderColor: "border-orange-500",
    benefits: [
      "5 videos cortos (3-6 min cada uno)",
      "Reto: Vende algo en 72 horas",
      "Checklist de acción diaria",
      "Insignia 'Tomaste Acción'",
      "Acceso inmediato y gratis"
    ],
    cta: "Empezar gratis",
    highlight: false
  },
  {
    id: 2,
    slug: "ordena-tu-desmadre",
    title: "Ordena tu desmadre",
    price: "$9.99",
    priceCents: 999,
    level: 2,
    icon: Target,
    tagline: "Del caos al flujo real",
    color: "from-blue-500 to-cyan-600",
    borderColor: "border-blue-500",
    benefits: [
      "5 módulos: flujo, dinero, reputación",
      "Plantillas descargables (control de caja)",
      "Checklist de preventa y clientes",
      "Insignia 'Primer Flujo'",
      "Cupón -20% para siguiente nivel"
    ],
    cta: "Ordenar mi negocio",
    highlight: false
  },
  {
    id: 3,
    slug: "piensa-como-estratega",
    title: "Piensa como estratega",
    price: "$39.99",
    priceCents: 3999,
    level: 3,
    icon: TrendingUp,
    tagline: "Profesionaliza y sube márgenes",
    color: "from-purple-500 to-pink-600",
    borderColor: "border-purple-500",
    benefits: [
      "5 videos: sistemas, márgenes, negociación",
      "1 sesión estratégica de 20 min incluida",
      "Playbook operativo profesional",
      "Comunidad privada de estrategas",
      "Insignia 'Playbook Listo'",
      "Acceso a herramientas exclusivas"
    ],
    cta: "Profesionalizar ahora",
    highlight: true
  },
  {
    id: 4,
    slug: "multiplica-tu-negocio",
    title: "Multiplica tu negocio",
    price: "$199",
    priceCents: 19900,
    level: 4,
    icon: Rocket,
    tagline: "Financia, escala y lidera",
    color: "from-yellow-500 to-orange-600",
    borderColor: "border-yellow-500",
    benefits: [
      "5 videos: liderazgo, financiamiento, legal",
      "3-4 sesiones de 60 min con mentoría",
      "Conexión directa con inversionistas",
      "Plantilla de pitch + contratos",
      "Red exclusiva de founders",
      "Insignia 'Pitch Presentado'",
      "Certificado compartible en LinkedIn"
    ],
    cta: "Escalar mi empresa",
    highlight: false
  }
];

export default function EmprendedorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container-custom max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-6">
              <span className="px-6 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold rounded-full text-sm uppercase tracking-wider">
                ¿Eres Emprendedor?
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Deja de improvisar.
              <br />
              <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Construye de verdad.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-8">
              4 programas diseñados para llevarte de{" "}
              <span className="text-yellow-400 font-bold">"idea en la cabeza"</span> a{" "}
              <span className="text-green-400 font-bold">"negocio que genera"</span>.
              <br />
              Sin teoría de MBA. Solo lo que funciona.
            </p>

            <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Videos prácticos (3-8 min)</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Plantillas descargables</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Sesiones 1:1 incluidas</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-400" />
                <span>Certificados compartibles</span>
              </div>
            </div>
          </div>

          {/* Course Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mt-16">
            {courses.map((course) => {
              const Icon = course.icon;
              return (
                <div
                  key={course.id}
                  className={`relative group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg border-2 ${
                    course.highlight ? course.borderColor : "border-white/20"
                  } rounded-3xl p-8 hover:border-white/40 transition-all duration-300 hover:scale-[1.02] ${
                    course.highlight ? "shadow-2xl shadow-purple-500/30" : ""
                  }`}
                >
                  {/* Highlight Badge */}
                  {course.highlight && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full text-xs uppercase tracking-wider shadow-lg">
                        🔥 Más Popular
                      </span>
                    </div>
                  )}

                  {/* Icon and Level */}
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${course.color} rounded-2xl`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400 uppercase tracking-wider">Nivel {course.level}</p>
                      <p className="text-4xl font-bold mt-1">{course.price}</p>
                      {course.priceCents === 0 && (
                        <p className="text-sm text-green-400 font-medium">GRATIS</p>
                      )}
                    </div>
                  </div>

                  {/* Title and Tagline */}
                  <h3 className="text-3xl font-bold mb-3">{course.title}</h3>
                  <p className="text-lg text-gray-300 mb-6 leading-relaxed">{course.tagline}</p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {course.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        <span className="text-sm leading-relaxed">{benefit}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Link
                    href={`/emprendedor/${course.slug}`}
                    className={`block w-full py-4 px-6 bg-gradient-to-r ${course.color} text-white font-bold rounded-xl text-center hover:shadow-2xl transition-all duration-300 hover:scale-105`}
                  >
                    {course.cta}
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Trust Section */}
          <div className="mt-20 text-center">
            <p className="text-2xl font-bold mb-4">¿Por qué esto funciona?</p>
            <div className="grid md:grid-cols-3 gap-8 mt-8">
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">⚡</div>
                <h4 className="text-lg font-bold mb-2">Sin relleno</h4>
                <p className="text-gray-400 text-sm">
                  Videos cortos (3-8 min). Cero teoría inútil. Solo acción directa.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🎯</div>
                <h4 className="text-lg font-bold mb-2">Resultados reales</h4>
                <p className="text-gray-400 text-sm">
                  Cada curso termina con un entregable concreto que usas en tu negocio.
                </p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                <div className="text-4xl mb-4">🚀</div>
                <h4 className="text-lg font-bold mb-2">Comunidad + mentores</h4>
                <p className="text-gray-400 text-sm">
                  No estás solo. Red de emprendedores reales y sesiones 1:1 con expertos.
                </p>
              </div>
            </div>
          </div>

          {/* FAQ Quick */}
          <div className="mt-20 max-w-3xl mx-auto">
            <h3 className="text-3xl font-bold mb-8 text-center">Preguntas frecuentes</h3>
            <div className="space-y-4">
              <details className="p-6 bg-white/5 rounded-xl border border-white/10">
                <summary className="font-bold cursor-pointer">
                  ¿Necesito experiencia previa?
                </summary>
                <p className="text-gray-400 mt-4">
                  No. El nivel 1 es para quienes apenas empiezan. Si ya tienes clientes, empieza directo en nivel 2.
                </p>
              </details>

              <details className="p-6 bg-white/5 rounded-xl border border-white/10">
                <summary className="font-bold cursor-pointer">
                  ¿Puedo pagar en cuotas?
                </summary>
                <p className="text-gray-400 mt-4">
                  Sí, aceptamos PayPal "Pay in 4" para cursos de $39.99 y $199.
                </p>
              </details>

              <details className="p-6 bg-white/5 rounded-xl border border-white/10">
                <summary className="font-bold cursor-pointer">
                  ¿Hay reembolso?
                </summary>
                <p className="text-gray-400 mt-4">
                  Sí, 14 días de garantía si no consumiste más del 20% del contenido.
                </p>
              </details>

              <details className="p-6 bg-white/5 rounded-xl border border-white/10">
                <summary className="font-bold cursor-pointer">
                  ¿Cuánto tiempo tengo para terminar?
                </summary>
                <p className="text-gray-400 mt-4">
                  Acceso ilimitado una vez que pagas. Ve a tu ritmo.
                </p>
              </details>
            </div>
          </div>

          {/* Final CTA */}
          <div className="mt-20 text-center p-12 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-3xl">
            <h3 className="text-4xl font-bold mb-4">
              ¿Listo para dejar de improvisar?
            </h3>
            <p className="text-xl text-gray-300 mb-8">
              Empieza gratis con el nivel 1. Cero riesgo. Cero excusas.
            </p>
            <Link
              href="/emprendedor/despierta"
              className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 to-yellow-600 text-gray-900 font-bold rounded-xl text-lg hover:shadow-2xl hover:shadow-yellow-500/50 transition-all duration-300 hover:scale-105"
            >
              Empezar ahora (gratis) →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

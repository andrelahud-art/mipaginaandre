"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Check, Play, Download, Lock, Trophy, Users, Clock, Star } from "lucide-react";
import ConektaCheckoutButton from "@/components/checkout/ConektaCheckoutButton";

// Data de cursos (después moverás esto a BD)
const coursesData: Record<string, any> = {
  "despierta": {
    id: 1,
    slug: "despierta",
    title: "Despierta, cabrón",
    subtitle: "Rompe la flojera y empieza a actuar hoy",
    price: "$0",
    priceCents: 0,
    level: 1,
    heroImage: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1200&h=400&fit=crop",
    modules: [
      {
        index: 1,
        title: "Por qué no avanzas (y no es lo que crees)",
        lessons: [
          { title: "El enemigo no es el dinero, es la indefinición", duration: "4:32", isFree: true },
          { title: "Cómo el perfeccionismo te está matando", duration: "3:45", isFree: true }
        ]
      },
      {
        index: 2,
        title: "Tu primera venta en 72 horas",
        lessons: [
          { title: "Identifica qué puedes vender YA (sin producto terminado)", duration: "5:12", isFree: true },
          { title: "Cómo hacer que alguien te pague antes de crear", duration: "6:20", isFree: true }
        ]
      },
      {
        index: 3,
        title: "Mentalidad de acción diaria",
        lessons: [
          { title: "El hábito de los 10 minutos productivos", duration: "3:58", isFree: true }
        ]
      }
    ],
    downloadables: [
      "Checklist: Acción diaria en 10 minutos",
      "Template: Validación de idea en 48h",
      "Guía: Tu primera venta sin producto"
    ],
    activity: {
      title: "Reto: Vende algo en 72 horas",
      description: "Demuestra que puedes generar tu primera venta. Sube evidencia (captura, link, testimonio)."
    },
    badge: {
      title: "Tomaste Acción",
      icon: "⚡"
    },
    nextCourse: {
      slug: "ordena-tu-desmadre",
      title: "Ordena tu desmadre",
      discount: 0
    },
    testimonials: [
      {
        name: "Carlos M.",
        role: "Fundador, MercadoLocal",
        text: "En 3 días vendí mi primer servicio de consultoría. $5,000 MXN. Sin página web, sin nada. Solo seguí los pasos."
      },
      {
        name: "Ana R.",
        role: "E-commerce",
        text: "Llevaba 6 meses 'preparándome'. Este curso me sacó del análisis paralítico. Primera venta en 48 horas."
      }
    ]
  },
  "ordena-tu-desmadre": {
    id: 2,
    slug: "ordena-tu-desmadre",
    title: "Ordena tu desmadre",
    subtitle: "Del caos al flujo real",
    price: "$9.99",
    priceCents: 999,
    level: 2,
    heroImage: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&h=400&fit=crop",
    modules: [
      {
        index: 1,
        title: "Flujo de trabajo que no te esclaviza",
        lessons: [
          { title: "Mapea tu semana real (no la ideal)", duration: "6:15", isFree: false },
          { title: "3 tipos de tareas y cómo priorizarlas", duration: "5:40", isFree: false }
        ]
      },
      {
        index: 2,
        title: "Control de dinero sin contador",
        lessons: [
          { title: "El sistema de 3 cuentas que funciona", duration: "7:20", isFree: false },
          { title: "Cómo saber si estás ganando (de verdad)", duration: "5:55", isFree: false }
        ]
      },
      {
        index: 3,
        title: "Reputación y confianza",
        lessons: [
          { title: "Por qué nadie te compra (aunque tu producto sea bueno)", duration: "6:30", isFree: false }
        ]
      }
    ],
    downloadables: [
      "Plantilla: Control de caja semanal",
      "Checklist: Preventa y validación de clientes",
      "Template: Flujo semanal anti-caos"
    ],
    activity: {
      title: "Implementa tu sistema de flujo",
      description: "Aplica el sistema de 3 cuentas y flujo semanal durante 7 días. Sube tu reporte."
    },
    badge: {
      title: "Primer Flujo",
      icon: "🎯"
    },
    nextCourse: {
      slug: "piensa-como-estratega",
      title: "Piensa como estratega",
      discount: 20
    }
  },
  "piensa-como-estratega": {
    id: 3,
    slug: "piensa-como-estratega",
    title: "Piensa como estratega",
    subtitle: "Profesionaliza y sube márgenes",
    price: "$39.99",
    priceCents: 3999,
    level: 3,
    heroImage: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=400&fit=crop",
    modules: [
      {
        index: 1,
        title: "Sistemas que escalan",
        lessons: [
          { title: "Cómo dejar de ser el cuello de botella", duration: "8:15", isFree: false },
          { title: "Automatiza sin gastar en software caro", duration: "7:30", isFree: false }
        ]
      },
      {
        index: 2,
        title: "Márgenes y pricing estratégico",
        lessons: [
          { title: "Por qué cobras barato (y cómo arreglarlo)", duration: "9:20", isFree: false },
          { title: "Triplica tu margen sin perder clientes", duration: "8:45", isFree: false }
        ]
      },
      {
        index: 3,
        title: "Negociación y colaboración",
        lessons: [
          { title: "Cómo negociar sin quedar como el malo", duration: "7:50", isFree: false }
        ]
      }
    ],
    downloadables: [
      "Playbook operativo básico (50 páginas)",
      "Calculadora de márgenes y pricing",
      "Framework de negociación",
      "Acceso a comunidad privada"
    ],
    activity: {
      title: "Rediseña tu modelo de pricing",
      description: "Aplica el framework de márgenes. Calcula tu nuevo precio y justifícalo."
    },
    badge: {
      title: "Playbook Listo",
      icon: "📊"
    },
    sessionsIncluded: {
      count: 1,
      duration: 20,
      description: "1 sesión estratégica de 20 minutos incluida"
    },
    nextCourse: {
      slug: "multiplica-tu-negocio",
      title: "Multiplica tu negocio",
      discount: 15
    }
  },
  "multiplica-tu-negocio": {
    id: 4,
    slug: "multiplica-tu-negocio",
    title: "Multiplica tu negocio",
    subtitle: "Financia, escala y lidera",
    price: "$199",
    priceCents: 19900,
    level: 4,
    heroImage: "https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=1200&h=400&fit=crop",
    modules: [
      {
        index: 1,
        title: "Liderazgo sin ego",
        lessons: [
          { title: "Cómo contratar cuando no sabes delegar", duration: "10:15", isFree: false },
          { title: "El team mínimo viable para escalar", duration: "9:30", isFree: false }
        ]
      },
      {
        index: 2,
        title: "Financiamiento real",
        lessons: [
          { title: "Cuándo buscar inversión (y cuándo NO)", duration: "11:20", isFree: false },
          { title: "Cómo presentarte a un inversionista sin verte desesperado", duration: "10:45", isFree: false }
        ]
      },
      {
        index: 3,
        title: "Legal y protección",
        lessons: [
          { title: "Contratos que te protegen (sin abogado de $500/hr)", duration: "8:50", isFree: false }
        ]
      }
    ],
    downloadables: [
      "Plantilla de pitch deck (Keynote + PowerPoint)",
      "Contratos básicos (NDA, servicios, socios)",
      "Guía de due diligence",
      "Directorio de inversionistas en LATAM"
    ],
    activity: {
      title: "Presenta tu pitch",
      description: "Crea tu pitch deck y graba tu presentación de 3 minutos. Recibe feedback."
    },
    badge: {
      title: "Pitch Presentado",
      icon: "🚀"
    },
    sessionsIncluded: {
      count: 4,
      duration: 60,
      description: "4 sesiones de mentoría de 60 minutos"
    },
    investorNetwork: true
  }
};

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const course = coursesData[slug];

  const [expandedModule, setExpandedModule] = useState<number | null>(null);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Curso no encontrado</h1>
          <Link href="/emprendedor" className="text-blue-400 hover:underline">
            ← Volver a cursos
          </Link>
        </div>
      </div>
    );
  }

  const totalLessons = course.modules.reduce((acc: number, m: any) => acc + m.lessons.length, 0);
  const totalMinutes = course.modules.reduce(
    (acc: number, m: any) =>
      acc + m.lessons.reduce((sum: number, l: any) => sum + parseInt(l.duration.split(":")[0]), 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
      {/* Breadcrumb */}
      <div className="pt-24 pb-6 px-4">
        <div className="container-custom max-w-6xl mx-auto">
          <Link
            href="/emprendedor"
            className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2"
          >
            ← Volver a cursos
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="px-4 pb-12">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="bg-gradient-to-r from-white/10 to-white/5 backdrop-blur-lg border border-white/20 rounded-3xl overflow-hidden">
            <div
              className="h-64 bg-cover bg-center"
              style={{ backgroundImage: `url(${course.heroImage})` }}
            >
              <div className="h-full bg-gradient-to-t from-gray-900 to-transparent flex items-end p-8">
                <div>
                  <span className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-sm font-medium mb-4 inline-block">
                    Nivel {course.level}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-8 md:p-12">
              <h1 className="text-4xl md:text-6xl font-bold mb-4">{course.title}</h1>
              <p className="text-xl text-gray-300 mb-8">{course.subtitle}</p>

              <div className="flex flex-wrap gap-6 mb-8 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Play className="w-5 h-5" />
                  <span>{totalLessons} lecciones</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>~{totalMinutes} minutos</span>
                </div>
                <div className="flex items-center gap-2">
                  <Download className="w-5 h-5" />
                  <span>{course.downloadables.length} recursos</span>
                </div>
                {course.sessionsIncluded && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    <span>{course.sessionsIncluded.description}</span>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {course.priceCents === 0 ? (
                  <Link
                    href="/emprendedor/despierta#curso-gratuito"
                    className="px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 text-center"
                  >
                    Empezar gratis →
                  </Link>
                ) : (
                  <>
                    <ConektaCheckoutButton
                      courseSlug={course.slug}
                      courseTitle={course.title}
                      price={course.price}
                      priceCents={course.priceCents}
                    />
                    <Link
                      href="/emprendedor/despierta"
                      className="px-8 py-4 border-2 border-white/30 rounded-xl font-medium hover:bg-white/10 transition-all text-center"
                    >
                      Ver curso gratuito
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus */}
      <section className="px-4 py-12">
        <div className="container-custom max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Contenido del curso</h2>

          <div className="space-y-4">
            {course.modules.map((module: any, index: number) => (
              <div
                key={index}
                className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setExpandedModule(expandedModule === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                >
                  <div>
                    <h3 className="text-xl font-bold mb-1">
                      Módulo {module.index}: {module.title}
                    </h3>
                    <p className="text-sm text-gray-400">{module.lessons.length} lecciones</p>
                  </div>
                  <div className="text-2xl">{expandedModule === index ? "−" : "+"}</div>
                </button>

                {expandedModule === index && (
                  <div className="border-t border-white/10 p-6 space-y-3">
                    {module.lessons.map((lesson: any, lessonIndex: number) => (
                      <div
                        key={lessonIndex}
                        className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          {lesson.isFree ? (
                            <Play className="w-5 h-5 text-green-400" />
                          ) : (
                            <Lock className="w-5 h-5 text-gray-500" />
                          )}
                          <div>
                            <p className="font-medium">{lesson.title}</p>
                            {lesson.isFree && (
                              <span className="text-xs text-green-400">Vista previa gratis</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-400">{lesson.duration}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Downloadables */}
      <section className="px-4 py-12">
        <div className="container-custom max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Recursos descargables</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {course.downloadables.map((item: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <Download className="w-6 h-6 text-blue-400" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activity */}
      <section className="px-4 py-12">
        <div className="container-custom max-w-6xl mx-auto">
          <div className="p-8 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border-2 border-yellow-500/50 rounded-3xl">
            <div className="flex items-start gap-4">
              <Trophy className="w-8 h-8 text-yellow-400 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold mb-2">{course.activity.title}</h3>
                <p className="text-gray-300 mb-4">{course.activity.description}</p>
                <div className="flex items-center gap-3 text-sm">
                  <span className="px-3 py-1 bg-yellow-500/30 rounded-full">
                    Gana: {course.badge.icon} {course.badge.title}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {course.testimonials && (
        <section className="px-4 py-12">
          <div className="container-custom max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Lo que dicen otros emprendedores</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {course.testimonials.map((testimonial: any, index: number) => (
                <div key={index} className="p-6 bg-white/5 border border-white/10 rounded-xl">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-300 mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-gray-400">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Next Course Upsell */}
      {course.nextCourse && (
        <section className="px-4 py-12">
          <div className="container-custom max-w-6xl mx-auto">
            <div className="p-8 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-2 border-purple-500/50 rounded-3xl text-center">
              <h3 className="text-3xl font-bold mb-4">¿Qué sigue después?</h3>
              <p className="text-xl text-gray-300 mb-6">
                Completa este curso y desbloquea{" "}
                {course.nextCourse.discount > 0 && (
                  <span className="text-yellow-400 font-bold">-{course.nextCourse.discount}% </span>
                )}
                en el siguiente nivel:
              </p>
              <p className="text-2xl font-bold mb-6">{course.nextCourse.title}</p>
              <Link
                href={`/emprendedor/${course.nextCourse.slug}`}
                className="inline-block px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105"
              >
                Ver siguiente nivel →
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

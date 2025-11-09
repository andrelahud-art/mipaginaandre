import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { AnimatedElement } from '@/components/AnimatedElement';
import { Lightbulb, Sparkles, Rocket, BookOpen } from 'lucide-react';
import './sobre-mi.css';

export const metadata: Metadata = {
  title: "Sobre Mí – André Lahud Lira | Estratega Digital & IA",
  description: "Conoce la trayectoria de André Lahud, un líder en transformación digital, inteligencia artificial y estrategias de negocio que convierte datos en decisiones.",
  keywords: ['André Lahud', 'Estratega Digital', 'Inteligencia Artificial', 'Transformación Digital', 'Consultor de Negocios', 'Líder de Opinión'],
  openGraph: {
    title: "Sobre Mí – André Lahud Lira | Estratega Digital & IA",
    description: "Descubre la historia y la visión de André Lahud, un pionero en la aplicación de la tecnología para el crecimiento empresarial.",
    url: "https://mipaginaandre.vercel.app/sobre-mi",
    siteName: "André Lahud",
    images: [
      {
        url: '/andre-lahud-lira.jpg',
        width: 1200,
        height: 630,
        alt: 'André Lahud - Perfil Profesional',
      },
    ],
    locale: "es_MX",
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sobre Mí – André Lahud Lira | Estratega Digital & IA",
    description: "Conoce la trayectoria de André Lahud, un líder en transformación digital, inteligencia artificial y estrategias de negocio.",
    images: ['/andre-lahud-lira.jpg'],
  },
};

const SobreMiPage = () => {
  const specialties = [
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: "Estrategia de Negocio",
      items: ["Modelos de negocio", "Posicionamiento competitivo", "Roadmaps ejecutables", "KPIs y métricas de valor"]
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "IA Aplicada",
      items: ["Automatización inteligente", "Personalización de experiencias", "Análisis predictivo", "Implementación práctica"]
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: "Consultoría de Transformación",
      items: ["Diagnóstico integral", "Implementación de cambios", "Gestión de proyectos tech", "Optimización de procesos"]
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Formación Ejecutiva",
      items: ["Programas personalizados", "Capacitación de equipos", "Talleres de IA práctica", "Mentoría estratégica"]
    }
  ];

  const skills = [
    "Estrategia de Negocio", "Business Model Canvas", "OKRs", "Design Thinking",
    "ChatGPT & IA Generativa", "Automatización con Make/Zapier", "CRMs Inteligentes",
    "Google Analytics 4", "Python", "SQL", "Power BI", "Tableau",
    "E-commerce", "Shopify", "WooCommerce", "Marketing Digital",
    "SEO/SEM", "Growth Marketing", "Formación Corporativa", "Facilitación"
  ];

  return (
    <>
      <div className="sobre-mi-container">
        <div className="sobre-mi-grid">
          <AnimatedElement direction="left">
            <div className="profile-image-container">
              <Image
                src="/andre-lahud-lira.jpg"
                alt="André Lahud Lira - Perfil Profesional"
                fill
                className="profile-image"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority
              />
            </div>
          </AnimatedElement>
          <div className="text-content">
            <AnimatedElement direction="up" delay={0.2}>
              <p className="eyebrow">Estratega. Innovador. Agente de Cambio.</p>
            </AnimatedElement>
            <AnimatedElement direction="up" delay={0.3}>
              <h1 className="main-heading">
                Transformando datos en <span className="highlight">decisiones</span>.
              </h1>
            </AnimatedElement>
            <AnimatedElement direction="up" delay={0.4}>
              <p className="sub-heading">
                Mi misión es clara: fusionar la inteligencia artificial con la visión de negocio para crear soluciones que no solo resuelven problemas, sino que redefinen industrias. Desde el análisis de datos hasta la automatización, construyo los puentes entre la tecnología del mañana y los resultados de hoy.
              </p>
            </AnimatedElement>
            <AnimatedElement direction="up" delay={0.5}>
              <Link href="/contacto" className="cta-button">
                Hablemos de tu proyecto
              </Link>
            </AnimatedElement>
          </div>
        </div>
      </div>

      {/* Mis Especialidades */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <div className="container-custom">
          <AnimatedElement direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Mis <span className="text-blue-600">Especialidades</span>
            </h2>
          </AnimatedElement>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialties.map((specialty, index) => (
              <AnimatedElement key={index} delay={0.1 * index} direction="up">
                <div className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:border-blue-300 hover:shadow-2xl transition-all duration-300 h-full">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-blue-600">
                    {specialty.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-gray-900">{specialty.title}</h3>
                  <ul className="space-y-2">
                    {specialty.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-blue-600 mt-1 font-bold">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </section>

      {/* Herramientas y Habilidades */}
      <section className="py-20 md:py-32 bg-white">
        <div className="container-custom">
          <AnimatedElement direction="up">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">
              Herramientas y <span className="text-blue-600">Habilidades</span>
            </h2>
          </AnimatedElement>

          <div className="flex flex-wrap justify-center gap-3 max-w-5xl mx-auto">
            {skills.map((skill, index) => (
              <AnimatedElement key={index} delay={0.02 * index} direction="up">
                <span className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 px-5 py-2.5 rounded-full text-sm font-semibold text-gray-900 hover:bg-gradient-to-r hover:from-blue-100 hover:to-indigo-100 hover:border-blue-300 hover:shadow-md transition-all duration-300 cursor-default inline-block">
                  {skill}
                </span>
              </AnimatedElement>
            ))}
          </div>

          <AnimatedElement delay={0.5} direction="up">
            <div className="text-center mt-16">
              <Link href="/contacto" className="inline-block px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl">
                Trabajemos Juntos
              </Link>
            </div>
          </AnimatedElement>
        </div>
      </section>
    </>
  );
};

export default SobreMiPage;
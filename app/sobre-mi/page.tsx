import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { AnimatedElement } from '@/components/AnimatedElement';
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
  return (
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
  );
};

export default SobreMiPage;
          <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
            Estratega en negocios, IA y transformación digital
          </h2>
          <p className="text-gray-400 max-w-xl mb-7 leading-relaxed">
            Hago que la estrategia y la inteligencia artificial trabajen para el negocio — no al revés.
            Vengo de operar, vender y construir en el mundo real. Mi regla: foco, iteración y números.
          </p>
          <div className="flex gap-4">
            <a href="#contacto-sobre-mi" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold transition-all duration-300">
              Contáctame
            </a>
            <a href="#historia" className="border border-gray-600 hover:bg-gray-800 px-6 py-3 rounded-lg text-gray-200 font-semibold transition-all duration-300">
              Ver mi historia
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/andre-lahud-perfil.jpg"
            alt="Foto profesional de André Lahud"
            className="w-72 h-72 object-cover rounded-3xl shadow-xl border border-gray-800"
          />
        </div>
      </section>

      {/* SUBHEADER LOCAL - SOLO EN SOBRE MÍ */}
      <section className="sticky top-0 z-20 backdrop-blur bg-[#0B0B0F]/70 border-y border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <nav className="flex gap-6 text-sm text-gray-300">
            <a href="#creencias" className="hover:text-white">Creencias</a>
            <a href="#historia" className="hover:text-white">Historia</a>
            <a href="#credenciales" className="hover:text-white">Credenciales</a>
            <a href="#testimonios" className="hover:text-white">Testimonios</a>
          </nav>
          <a href="#contacto-sobre-mi" className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm font-semibold">
            Contacto
          </a>
        </div>
      </section>

      {/* CREENCIAS NO NEGOCIABLES */}
      <section id="creencias" className="mt-16 bg-[#111218] p-10 rounded-2xl border border-gray-800 shadow-inner max-w-6xl mx-auto">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Creencias no negociables</h3>
        <ul className="grid md:grid-cols-2 gap-4 text-gray-300">
          <li className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">→</span>
            <p><strong>La estrategia manda sobre la herramienta.</strong> Cada decisión técnica responde a una intención estratégica.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">→</span>
            <p><strong>Todo plan merece hipótesis de fracaso y contramedidas.</strong> Diseño operativo con escenarios y números.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">→</span>
            <p><strong>La IA es una navaja, no una religión.</strong> Priorizo impacto medible sobre hype.</p>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-blue-500 text-xl">→</span>
            <p><strong>Construir {'>'}  Opinar.</strong> Iteración rápida, entregar, medir, mejorar.</p>
          </li>
        </ul>
      </section>

      {/* HISTORIA PROFESIONAL */}
      <section id="historia" className="max-w-6xl mx-auto px-6 mt-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Mi historia profesional</h3>
        <div className="grid md:grid-cols-2 gap-8 text-gray-300">
          <p>
            Soy estratega en formación (LAET – Estrategia y Transformación de Negocios, Tec de Monterrey) con ejecución real en
            e-commerce, consultoría y capacitación en IA. Hago que la estrategia y la IA trabajen para el negocio — no al revés.
          </p>
          <p>
            He operado <strong>Todo Para Tu Familia</strong> (e-commerce) con ventas ~<strong>$500k MXN/mes</strong> en temporadas pico,
            diseñé y ejecuté entrenamientos de IA aplicada para agentes inmobiliarios (tres paquetes comerciales) y he liderado
            proyectos con socios formadores (p.ej., <strong>Macufrescos</strong> y <strong>Pacto por la Primera Infancia</strong>),
            entregando diagnósticos, rediseño organizacional y observatorios digitales.
          </p>
        </div>
      </section>

      {/* CREDENCIALES */}
      <section id="credenciales" className="max-w-6xl mx-auto px-6 mt-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Credenciales & propuesta de valor</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-[#111218] border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold mb-2">Estrategia & Operación</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Diagnóstico, FODA, PESTEL, QSPM, BSC</li>
              <li>Diseño de procesos y KPIs</li>
              <li>Propuestas a nivel directivo</li>
            </ul>
          </div>
          <div className="bg-[#111218] border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold mb-2">Finanzas & Datos</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>Modelos en Excel, pricing, unit economics</li>
              <li>Dashboards operativos</li>
              <li>Toma de decisiones basada en datos</li>
            </ul>
          </div>
          <div className="bg-[#111218] border border-gray-800 rounded-xl p-6">
            <h4 className="font-semibold mb-2">IA aplicada a negocio</h4>
            <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
              <li>ChatGPT/Gemini para productividad</li>
              <li>Automatizaciones no-code/low-code</li>
              <li>Capacitación ejecutiva (Inmobiliarias)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="testimonios" className="max-w-6xl mx-auto px-6 mt-16">
        <h3 className="text-2xl md:text-3xl font-bold mb-6">Testimonios</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <blockquote className="bg-[#111218] border border-gray-800 rounded-xl p-6 text-gray-300">
            "La sesión de IA con André nos ahorró horas semanales y estandarizó la prospección. 
             Pasamos de tareas manuales a flujos automáticos."
            <footer className="mt-3 text-sm text-gray-400">Cliente inmobiliario – Paquete 3 herramientas</footer>
          </blockquote>
          <blockquote className="bg-[#111218] border border-gray-800 rounded-xl p-6 text-gray-300">
            "Su diagnóstico estratégico aterrizó decisiones en semanas. Documentó KPIs y un tablero útil para dirección."
            <footer className="mt-3 text-sm text-gray-400">Proyecto con socio formador (Macufrescos)</footer>
          </blockquote>
        </div>
      </section>

      {/* PRUEBA SOCIAL - STATS */}
      <section className="max-w-6xl mx-auto px-6 mt-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <p className="text-3xl font-extrabold">+$500k</p>
            <p className="text-gray-400 text-sm">Ventas mensuales pico (e-commerce)</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">20+</p>
            <p className="text-gray-400 text-sm">Sesiones de IA personalizadas</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">3</p>
            <p className="text-gray-400 text-sm">Paquetes de capacitación activos</p>
          </div>
          <div>
            <p className="text-3xl font-extrabold">2</p>
            <p className="text-gray-400 text-sm">Proyectos con socios formadores</p>
          </div>
        </div>
      </section>

      {/* CONTACTO LOCAL */}
      <section id="contacto-sobre-mi" className="max-w-6xl mx-auto px-6 mt-20 mb-16">
        <div className="bg-[#111218] border border-gray-800 rounded-2xl p-8">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Conectemos</h3>
          <p className="text-gray-300 mb-6">¿Proyecto, consultoría o capacitación en IA aplicada? Escríbeme.</p>

          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            <div className="space-y-2 text-gray-300">
              <p><strong>Email:</strong> <a className="text-blue-400 hover:underline" href="mailto:andrelahud@gmail.com">andrelahud@gmail.com</a></p>
              <p><strong>LinkedIn:</strong> <a className="text-blue-400 hover:underline" href="https://www.linkedin.com/in/andré-lahud-lira-008720326" target="_blank" rel="noopener noreferrer">/in/andré-lahud-lira-008720326</a></p>
            </div>

            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
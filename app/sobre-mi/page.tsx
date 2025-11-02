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
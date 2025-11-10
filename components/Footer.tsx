import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary border-t border-white/10 py-12">
      <div className="container-custom">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">André Ops</h3>
            <p className="text-accent text-sm">
              Estrategia • IA • Creación de Valor
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-bold mb-4">Navegación</h4>
            <ul className="space-y-2 text-accent text-sm">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/servicios" className="hover:text-white transition-colors">¿El cómo?</Link></li>
              <li><Link href="/sobre-mi" className="hover:text-white transition-colors">Sobre Mí</Link></li>
              <li><Link href="/contacto" className="hover:text-white transition-colors">Hablemos</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Recursos</h4>
            <ul className="space-y-2 text-accent text-sm">
              <li><Link href="/herramientas" className="hover:text-white transition-colors">Herramientas</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">Artículos</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold mb-4">Contacto</h4>
            <ul className="space-y-2 text-accent text-sm">
              <li>
                <a href="mailto:andrelahud@gmail.com" className="hover:text-white transition-colors">
                  andrelahud@gmail.com
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/andré-lahud-lira-008720326" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  LinkedIn
                </a>
              </li>
              <li>
                <a href="https://wa.me/524777068594" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  +52 477-706-8594
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center text-accent text-sm">
          <p>&copy; {currentYear} André Lahud. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
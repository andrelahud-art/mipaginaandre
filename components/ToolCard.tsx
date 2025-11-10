interface ToolCardProps {
  titulo: string;
  categoria: string;
  descripcion: string;
  caracteristicas: string[];
  ventajas: string;
  enlace: string;
  icon: string;
}

export default function ToolCard({
  titulo,
  categoria,
  descripcion,
  caracteristicas,
  ventajas,
  enlace,
  icon
}: ToolCardProps) {
  return (
    <div className="card group">
      {/* Header con icono y categoría */}
      <div className="flex items-start justify-between mb-4">
        <span className="text-4xl group-hover:scale-110 transition-transform duration-300">
          {icon}
        </span>
        <span className="tag-pill text-xs">
          {categoria}
        </span>
      </div>

      {/* Título y descripción */}
      <h3 className="text-2xl font-bold mb-3">{titulo}</h3>
      <p className="text-accent mb-6">{descripcion}</p>

      {/* Características */}
      <div className="mb-6">
        <h4 className="font-bold mb-3 text-sm uppercase tracking-wider">Características:</h4>
        <ul className="space-y-2">
          {caracteristicas.map((item, index) => (
            <li key={index} className="flex items-start text-accent text-sm">
              <span className="mr-2 text-blue-400">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Ventajas */}
      <div className="mb-6 p-4 bg-blue-500/10 rounded-lg border border-blue-500/20">
        <p className="text-blue-300 text-sm font-medium">{ventajas}</p>
      </div>

      {/* Call to action */}
      <a
        href={enlace}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary w-full text-center inline-flex items-center justify-center gap-2"
      >
        <span>Explorar herramienta</span>
        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
      </a>
    </div>
  );
}

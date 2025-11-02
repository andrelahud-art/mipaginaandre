import Link from "next/link";

interface CardServicioProps {
  titulo: string;
  descripcion: string;
  queEntrego: string[];
  resultados: string;
}

export default function CardServicio({ 
  titulo, 
  descripcion, 
  queEntrego, 
  resultados 
}: CardServicioProps) {
  return (
    <div className="card">
      <h3 className="text-2xl font-bold mb-4">{titulo}</h3>
      <p className="text-accent mb-6">{descripcion}</p>
      
      <div className="mb-6">
        <h4 className="font-bold mb-3">Qué entrego:</h4>
        <ul className="space-y-2">
          {queEntrego.map((item, index) => (
            <li key={index} className="flex items-start text-accent text-sm">
              <span className="mr-2">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      
      <div className="mb-6">
        <h4 className="font-bold mb-2">Resultados esperados:</h4>
        <p className="text-accent text-sm">{resultados}</p>
      </div>
      
      <Link href="/contacto" className="btn-primary w-full text-center">
        Solicitar información
      </Link>
    </div>
  );
}
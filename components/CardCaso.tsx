interface CardCasoProps {
  titulo: string;
  problema: string;
  intervencion: string;
  resultado: string;
  stack?: string[];
  tiempo?: string;
  testimonio?: string;
}

export default function CardCaso({
  titulo,
  problema,
  intervencion,
  resultado,
  stack,
  tiempo,
  testimonio,
}: CardCasoProps) {
  return (
    <div className="card">
      <h3 className="text-3xl font-bold mb-6">{titulo}</h3>
      
      <div className="grid md:grid-cols-3 gap-6 mb-6">
        <div>
          <h4 className="font-bold text-red-400 mb-2">Problema</h4>
          <p className="text-accent text-sm">{problema}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-yellow-400 mb-2">Intervención</h4>
          <p className="text-accent text-sm">{intervencion}</p>
        </div>
        
        <div>
          <h4 className="font-bold text-green-400 mb-2">Resultado</h4>
          <p className="text-accent text-sm">{resultado}</p>
        </div>
      </div>
      
      {(stack || tiempo) && (
        <div className="flex flex-wrap gap-4 mb-6 text-sm">
          {stack && (
            <div>
              <span className="text-accent">Stack:</span>{" "}
              <span className="text-white">{stack.join(", ")}</span>
            </div>
          )}
          {tiempo && (
            <div>
              <span className="text-accent">Tiempo:</span>{" "}
              <span className="text-white">{tiempo}</span>
            </div>
          )}
        </div>
      )}
      
      {testimonio && (
        <blockquote className="border-l-4 border-white/30 pl-4 italic text-accent">
          &quot;{testimonio}&quot;
        </blockquote>
      )}
    </div>
  );
}
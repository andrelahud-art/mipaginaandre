"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, ArrowRight, Mail, BookOpen } from "lucide-react";
import { Suspense } from "react";

function SuccessContent() {
  const searchParams = useSearchParams();
  const course = searchParams.get("course");

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto">
          {/* Icono de éxito */}
          <div className="flex justify-center mb-8">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center">
              <CheckCircle className="w-16 h-16 text-green-500" />
            </div>
          </div>

          {/* Título */}
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
            ¡Pago exitoso!
          </h1>
          <p className="text-xl text-white/60 text-center mb-12">
            Tu compra se ha procesado correctamente
          </p>

          {/* Información */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Revisa tu email</h3>
                  <p className="text-white/60 text-sm">
                    Te hemos enviado un correo con los detalles de tu compra y las instrucciones para acceder al curso.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <BookOpen className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold mb-1">Acceso al curso</h3>
                  <p className="text-white/60 text-sm">
                    Ya tienes acceso completo a todos los módulos y recursos del curso.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Próximos pasos */}
          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl p-6 mb-8">
            <h3 className="font-bold mb-3">Próximos pasos:</h3>
            <ol className="space-y-2 text-sm text-white/80">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">1.</span>
                <span>Revisa tu correo electrónico para confirmar el acceso</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">2.</span>
                <span>Crea tu cuenta o inicia sesión en la plataforma</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold">3.</span>
                <span>Comienza a aprender y completa los módulos a tu ritmo</span>
              </li>
            </ol>
          </div>

          {/* Botones de acción */}
          <div className="flex flex-col sm:flex-row gap-4">
            {course && (
              <Link
                href={`/emprendedor/${course}`}
                className="flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 flex items-center justify-center gap-2"
              >
                <span>Ir al curso</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
            )}
            <Link
              href="/emprendedor"
              className="flex-1 px-8 py-4 border-2 border-white/20 rounded-xl font-medium hover:bg-white/10 transition-all text-center"
            >
              Ver todos los cursos
            </Link>
          </div>

          {/* Soporte */}
          <p className="text-center text-white/40 text-sm mt-8">
            ¿Tienes problemas? Contacta a{" "}
            <a href="mailto:soporte@tudominio.com" className="text-blue-400 hover:underline">
              soporte@tudominio.com
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p>Cargando...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}

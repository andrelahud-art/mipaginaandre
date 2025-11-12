"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { UserPlus, Mail, Lock, User, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      setLoading(false);
      return;
    }

    try {
      // Registrar usuario
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Error al registrarse");
        setLoading(false);
        return;
      }

      // Auto login después del registro
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError("Registro exitoso pero error al iniciar sesión");
        setLoading(false);
        return;
      }

      // Redirigir al dashboard
      router.push("/dashboard");
      router.refresh();

    } catch (err: any) {
      setError("Error al registrarse");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo/Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
            ¿Eres Emprendedor?
          </h1>
          <p className="text-white/60">Crea tu cuenta gratis</p>
        </div>

        {/* Beneficios */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 text-sm">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <span>Acceso inmediato al curso gratuito</span>
          </div>
        </div>

        {/* Formulario */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Nombre */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Nombre completo
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Tu nombre"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="tu@email.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Mínimo 6 caracteres"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Confirmar Password */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Confirmar contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-orange-500 transition-colors"
                  placeholder="Repite tu contraseña"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="flex items-start gap-2 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white font-bold rounded-xl hover:shadow-2xl transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Creando cuenta...</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Crear cuenta gratis</span>
                </>
              )}
            </button>
          </form>

          {/* Login */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-orange-500 hover:text-orange-400 font-medium">
                Inicia sesión
              </Link>
            </p>
          </div>

          {/* Volver */}
          <div className="mt-4 text-center">
            <Link href="/emprendedor" className="text-white/40 hover:text-white/60 text-sm">
              Volver al inicio
            </Link>
          </div>
        </div>

        {/* Términos */}
        <p className="text-center text-white/40 text-xs mt-6">
          Al registrarte aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}

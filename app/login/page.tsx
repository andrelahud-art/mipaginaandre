"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false
      });

      if (result?.error) {
        setError(result.error);
        setLoading(false);
        return;
      }

      // Redirigir al dashboard
      router.push("/dashboard");
      router.refresh();

    } catch (err: any) {
      setError("Error al iniciar sesión");
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
          <p className="text-white/60">Inicia sesión para continuar</p>
        </div>

        {/* Formulario */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
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
                  placeholder="••••••••"
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
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Iniciar sesión</span>
                </>
              )}
            </button>
          </form>

          {/* Registro */}
          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              ¿No tienes cuenta?{" "}
              <Link href="/register" className="text-orange-500 hover:text-orange-400 font-medium">
                Regístrate gratis
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
      </div>
    </div>
  );
}

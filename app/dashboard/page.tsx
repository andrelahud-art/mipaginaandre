"use client"

import { useSession, signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login")
    }
  }, [status, router])

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black">
        <div className="text-white text-xl">Cargando...</div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Bienvenido, {session.user?.name || session.user?.email}
            </h1>
            <p className="text-gray-400 mt-2">
              Gestiona tus cursos y progreso
            </p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Cursos Activos</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="text-4xl">📚</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Progreso Total</p>
                <p className="text-3xl font-bold text-white mt-2">0%</p>
              </div>
              <div className="text-4xl">📊</div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Certificados</p>
                <p className="text-3xl font-bold text-white mt-2">0</p>
              </div>
              <div className="text-4xl">🏆</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* My Courses */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">Mis Cursos</h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📚</div>
              <p className="text-gray-400 mb-4">
                Aún no estás inscrito en ningún curso
              </p>
              <Link
                href="/emprendedor"
                className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Explorar Cursos
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h2 className="text-xl font-bold text-white mb-4">
              Actividad Reciente
            </h2>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📋</div>
              <p className="text-gray-400">
                No hay actividad reciente
              </p>
            </div>
          </div>
        </div>

        {/* Profile Info */}
        <div className="mt-8 bg-gray-800 rounded-lg p-6 border border-gray-700">
          <h2 className="text-xl font-bold text-white mb-4">
            Información de Perfil
          </h2>
          <div className="space-y-3">
            <div>
              <span className="text-gray-400">Nombre:</span>{" "}
              <span className="text-white">{session.user?.name || "No especificado"}</span>
            </div>
            <div>
              <span className="text-gray-400">Email:</span>{" "}
              <span className="text-white">{session.user?.email}</span>
            </div>
            <div>
              <span className="text-gray-400">Rol:</span>{" "}
              <span className="text-white">{(session.user as any)?.role || "USER"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

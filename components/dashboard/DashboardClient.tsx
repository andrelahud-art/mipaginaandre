"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  BookOpen,
  Trophy,
  Award,
  LogOut,
  Play,
  CheckCircle,
  Lock,
  TrendingUp,
  Calendar,
  Download
} from "lucide-react";

interface DashboardClientProps {
  user: any;
  enrollments: any[];
  certificates: any[];
  badges: any[];
  allCourses: any[];
}

export default function DashboardClient({
  user,
  enrollments,
  certificates,
  badges,
  allCourses
}: DashboardClientProps) {
  const [activeTab, setActiveTab] = useState("courses");

  const enrolledCourseIds = enrollments.map(e => e.course.id);
  const availableCourses = allCourses.filter(
    course => !enrolledCourseIds.includes(course.id) && course.priceCents > 0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/emprendedor" className="text-2xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                ¿Eres Emprendedor?
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-white/60">{user.email}</p>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: "/emprendedor" })}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Cursos activos</p>
                <p className="text-3xl font-bold">{enrollments.length}</p>
              </div>
              <BookOpen className="w-10 h-10 text-blue-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Certificados</p>
                <p className="text-3xl font-bold">{certificates.length}</p>
              </div>
              <Award className="w-10 h-10 text-green-400" />
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm mb-1">Insignias</p>
                <p className="text-3xl font-bold">{badges.length}</p>
              </div>
              <Trophy className="w-10 h-10 text-orange-400" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() => setActiveTab("courses")}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === "courses"
                ? "bg-orange-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Mis Cursos
          </button>
          <button
            onClick={() => setActiveTab("available")}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === "available"
                ? "bg-orange-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Cursos Disponibles
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === "certificates"
                ? "bg-orange-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Certificados
          </button>
          <button
            onClick={() => setActiveTab("badges")}
            className={`px-6 py-3 rounded-lg font-medium whitespace-nowrap transition-colors ${
              activeTab === "badges"
                ? "bg-orange-500 text-white"
                : "bg-white/10 hover:bg-white/20"
            }`}
          >
            Insignias
          </button>
        </div>

        {/* Content */}
        {activeTab === "courses" && (
          <div className="space-y-4">
            {enrollments.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <BookOpen className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 mb-4">No tienes cursos activos</p>
                <button
                  onClick={() => setActiveTab("available")}
                  className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-xl transition-all"
                >
                  Explorar cursos
                </button>
              </div>
            ) : (
              enrollments.map((enrollment) => (
                <div
                  key={enrollment.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                          Nivel {enrollment.course.level}
                        </span>
                        {enrollment.progressPercentage === 100 && (
                          <span className="px-3 py-1 bg-green-500/20 text-green-400 text-xs font-medium rounded-full flex items-center gap-1">
                            <CheckCircle className="w-3 h-3" />
                            Completado
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl font-bold mb-2">{enrollment.course.title}</h3>
                      <p className="text-white/60 mb-4">{enrollment.course.subtitle}</p>

                      {/* Progress Bar */}
                      <div className="mb-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-white/60">
                            {enrollment.completedLessons} de {enrollment.totalLessons} lecciones
                          </span>
                          <span className="text-sm font-medium text-orange-400">
                            {enrollment.progressPercentage}%
                          </span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-500 transition-all duration-500"
                            style={{ width: `${enrollment.progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    <Link
                      href={`/emprendedor/${enrollment.course.slug}`}
                      className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg font-medium hover:shadow-xl transition-all flex items-center gap-2 justify-center whitespace-nowrap"
                    >
                      <Play className="w-4 h-4" />
                      Continuar
                    </Link>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "available" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {availableCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:border-orange-500/30 transition-colors"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="px-3 py-1 bg-orange-500/20 text-orange-400 text-xs font-medium rounded-full">
                    Nivel {course.level}
                  </span>
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-xs font-medium rounded-full">
                    ${(course.priceCents / 100).toFixed(2)} {course.currency}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                <p className="text-white/60 mb-4">{course.subtitle}</p>
                <Link
                  href={`/emprendedor/${course.slug}`}
                  className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:shadow-xl transition-all flex items-center gap-2 justify-center"
                >
                  <Lock className="w-4 h-4" />
                  Ver detalles
                </Link>
              </div>
            ))}
          </div>
        )}

        {activeTab === "certificates" && (
          <div className="space-y-4">
            {certificates.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Award className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Aún no tienes certificados</p>
                <p className="text-white/40 text-sm mt-2">Completa un curso para obtener tu primer certificado</p>
              </div>
            ) : (
              certificates.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <Award className="w-12 h-12 text-green-400 flex-shrink-0" />
                      <div>
                        <h3 className="text-lg font-bold mb-1">{cert.course.title}</h3>
                        <p className="text-white/60 text-sm mb-2">
                          Código: {cert.code}
                        </p>
                        <p className="text-white/40 text-xs">
                          Emitido: {new Date(cert.issuedAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    {cert.pdfUrl && (
                      <a
                        href={cert.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-3 bg-green-500 hover:bg-green-600 rounded-lg font-medium transition-colors flex items-center gap-2 justify-center whitespace-nowrap"
                      >
                        <Download className="w-4 h-4" />
                        Descargar
                      </a>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === "badges" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {badges.length === 0 ? (
              <div className="col-span-full bg-white/5 border border-white/10 rounded-xl p-12 text-center">
                <Trophy className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <p className="text-white/60">Aún no tienes insignias</p>
                <p className="text-white/40 text-sm mt-2">Completa desafíos para ganar insignias</p>
              </div>
            ) : (
              badges.map((userBadge) => (
                <div
                  key={userBadge.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 text-center hover:border-orange-500/30 transition-colors"
                >
                  <div className="text-5xl mb-3">{userBadge.badge.icon || "🏆"}</div>
                  <h3 className="font-bold mb-2">{userBadge.badge.title}</h3>
                  <p className="text-white/60 text-sm mb-3">{userBadge.badge.description}</p>
                  <p className="text-white/40 text-xs">
                    {new Date(userBadge.awardedAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

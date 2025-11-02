"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

interface DashboardStats {
  totalPosts: number;
  totalViews: number;
  totalComments: number;
  totalLikes: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalPosts: 0,
    totalViews: 0,
    totalComments: 0,
    totalLikes: 0
  });

  useEffect(() => {
    // Load stats from API
    fetch('/api/blog/posts')
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          const posts = data.posts;
          setStats({
            totalPosts: posts.length,
            totalViews: posts.reduce((sum: number, post: any) => sum + post.views, 0),
            totalComments: posts.reduce((sum: number, post: any) => sum + post.commentsCount, 0),
            totalLikes: posts.reduce((sum: number, post: any) => sum + post.likes, 0)
          });
        }
      });
  }, []);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Gestiona tu sitio web de forma visual</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl">📝</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Posts Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalPosts}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl">👁️</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Vistas Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalViews.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl">💬</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Comentarios</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalComments}</p>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex items-center">
            <div className="text-3xl">❤️</div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Likes Totales</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalLikes}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link href="/admin/profile" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Editar Perfil</h3>
                <p className="text-sm text-gray-500">Información personal, bio, foto</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">👤</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/services" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Gestionar Servicios</h3>
                <p className="text-sm text-gray-500">Agregar, editar, reordenar servicios</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">🛠️</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/cases" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Casos de Estudio</h3>
                <p className="text-sm text-gray-500">Añadir proyectos exitosos</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📊</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/blog" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Gestionar Blog</h3>
                <p className="text-sm text-gray-500">Crear, editar, publicar artículos</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📝</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/media" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Gestión de Medios</h3>
                <p className="text-sm text-gray-500">Subir y organizar imágenes</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">📸</div>
            </div>
          </div>
        </Link>

        <Link href="/admin/settings" className="group">
          <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Configuración</h3>
                <p className="text-sm text-gray-500">SEO, analytics, APIs</p>
              </div>
              <div className="text-2xl group-hover:scale-110 transition-transform">⚙️</div>
            </div>
          </div>
        </Link>
      </div>

      {/* Recent Activity */}
      <div className="mt-8 bg-white rounded-lg shadow">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Actividad Reciente</h3>
        </div>
        <div className="p-6">
          <div className="flow-root">
            <ul className="-mb-8">
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Nuevo post publicado: "Automatización con IA"
                        </p>
                        <p className="text-xs text-gray-400">Hace 2 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative pb-8">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-500">
                      <span className="text-white text-sm">💬</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Nuevo comentario en "Análisis de Datos"
                        </p>
                        <p className="text-xs text-gray-400">Hace 4 horas</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li>
                <div className="relative">
                  <div className="relative flex space-x-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-500">
                      <span className="text-white text-sm">👤</span>
                    </div>
                    <div className="min-w-0 flex-1 pt-1.5">
                      <div>
                        <p className="text-sm text-gray-500">
                          Perfil actualizado
                        </p>
                        <p className="text-xs text-gray-400">Ayer</p>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
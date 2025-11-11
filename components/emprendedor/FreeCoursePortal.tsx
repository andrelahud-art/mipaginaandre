"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type StoredProgress = {
  name: string;
  email: string;
  completedLessons: string[];
};

const STORAGE_KEY = "emprendedor-free-course";

const lessons = [
  {
    id: "video-1",
    title: "Video 1 · Rompe la flojera",
    description: "Acciones inmediatas para salir de la parálisis",
  },
  {
    id: "video-2",
    title: "Video 2 · Diseña tu oferta",
    description: "Construye una propuesta de valor irresistible",
  },
  {
    id: "video-3",
    title: "Video 3 · Consigue tus primeros clientes",
    description: "Tácticas concretas para validar tu idea",
  },
  {
    id: "video-4",
    title: "Video 4 · Estructura tu flujo de trabajo",
    description: "Organiza tu día para ejecutar sin fricción",
  },
  {
    id: "video-5",
    title: "Video 5 · Reto 72 horas",
    description: "Checklist para medir si cumpliste el reto",
  },
];

export function FreeCoursePortal() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [progress, setProgress] = useState<StoredProgress | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as StoredProgress;
        setProgress(parsed);
        setName(parsed.name);
        setEmail(parsed.email);
      }
    } catch (err) {
      console.error("Unable to restore course progress", err);
    }
  }, []);

  useEffect(() => {
    if (!progress) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    } catch (err) {
      console.error("Unable to persist course progress", err);
    }
  }, [progress]);

  const score = useMemo(() => {
    if (!progress) return 0;
    return Math.round((progress.completedLessons.length / lessons.length) * 100);
  }, [progress]);

  function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError("Completa tu nombre y correo para empezar.");
      return;
    }
    setError("");
    setProgress({ name: name.trim(), email: email.trim(), completedLessons: progress?.completedLessons ?? [] });
  }

  function toggleLesson(id: string) {
    setProgress((current) => {
      if (!current) {
        return current;
      }
      const hasLesson = current.completedLessons.includes(id);
      const completedLessons = hasLesson
        ? current.completedLessons.filter((lesson) => lesson !== id)
        : [...current.completedLessons, id];
      return { ...current, completedLessons };
    });
  }

  function resetProgress() {
    setProgress((current) => {
      if (!current) return current;
      return { ...current, completedLessons: [] };
    });
  }

  return (
    <section className="mt-24">
      <div className="max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 backdrop-blur-lg">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <p className="text-sm uppercase tracking-widest text-yellow-400 font-semibold mb-2">
              Portal del curso gratuito
            </p>
            <h2 className="text-3xl md:text-4xl font-bold">Regístrate y mide tu score</h2>
            <p className="text-gray-300 mt-2 max-w-xl">
              Guarda tu avance de los 5 videos del nivel 1. Completa cada reto y mira cómo sube tu score en tiempo real.
            </p>
          </div>
          <div className="px-6 py-4 bg-gradient-to-br from-yellow-400/20 to-orange-500/20 border border-yellow-400/40 rounded-2xl text-center">
            <p className="text-sm text-yellow-300 uppercase tracking-wide">Tu score actual</p>
            <p className="text-4xl font-black text-yellow-100">{score}%</p>
          </div>
        </div>

        <form onSubmit={handleRegister} className="grid md:grid-cols-3 gap-4 mb-10">
          <div className="md:col-span-1">
            <label htmlFor="name" className="block text-sm font-semibold text-gray-200 mb-1">
              Nombre
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 text-white"
              placeholder="Tu nombre completo"
            />
          </div>
          <div className="md:col-span-1">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-200 mb-1">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 focus:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-400/40 text-white"
              placeholder="nombre@empresa.com"
            />
          </div>
          <div className="md:col-span-1 flex flex-col justify-end">
            <button
              type="submit"
              className="w-full px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 hover:shadow-lg hover:shadow-yellow-500/40 transition-all"
            >
              {progress ? "Actualizar registro" : "Registrarme gratis"}
            </button>
            {error && <p className="text-sm text-red-300 mt-2">{error}</p>}
          </div>
        </form>

        {progress ? (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <div>
                <p className="text-sm text-gray-400">Estás avanzando como: </p>
                <p className="text-lg font-semibold text-white">{progress.name}</p>
                <p className="text-sm text-gray-500">{progress.email}</p>
              </div>
              <button
                type="button"
                onClick={resetProgress}
                className="self-start md:self-auto px-4 py-2 rounded-lg border border-white/20 text-sm text-gray-200 hover:border-yellow-400/60 hover:text-yellow-200 transition"
              >
                Reiniciar score
              </button>
            </div>

            <div className="grid gap-4">
              {lessons.map((lesson) => {
                const checked = progress.completedLessons.includes(lesson.id);
                return (
                  <label
                    key={lesson.id}
                    className="flex items-start gap-4 p-5 bg-black/40 border border-white/10 rounded-2xl hover:border-yellow-400/40 transition"
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleLesson(lesson.id)}
                      className="mt-1 h-5 w-5 rounded border-white/20 bg-black/60 text-yellow-400 focus:ring-yellow-400/60"
                    />
                    <span>
                      <span className="block text-lg font-semibold text-white">{lesson.title}</span>
                      <span className="block text-sm text-gray-400">{lesson.description}</span>
                    </span>
                  </label>
                );
              })}
            </div>

            <div className="mt-6">
              <div className="h-3 w-full rounded-full bg-white/5 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-yellow-400 to-orange-500" style={{ width: `${score}%` }}></div>
              </div>
              <p className="text-sm text-gray-400 mt-2">
                Marca cada video cuando termines su reto para subir tu score y desbloquear tu insignia.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-gray-400 text-sm">
            Regístrate para empezar el curso gratuito "Despierta, cabrón" y desbloquear el tablero de progreso.
          </p>
        )}
      </div>
    </section>
  );
}

export default FreeCoursePortal;

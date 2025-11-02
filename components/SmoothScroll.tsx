"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

// Componente para inicializar el scroll suave (Lenis)
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1, // Controla la suavidad (más bajo = más suave)
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy(); // Limpiar al desmontar el componente
    };
  }, []);

  return <>{children}</>;
}
"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export default function RocketAnimation() {
  const ref = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const nx = (e.clientX / w - 0.5) * 2; // -1..1
      const ny = (e.clientY / h - 0.5) * 2;
      // small inverse tilt for subtle depth
      const max = 6; // degrees
      setTilt({ rx: ny * max, ry: -nx * max });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div className="fixed top-1/4 left-4 z-50 pointer-events-none">
      <motion.div
        ref={ref}
        className="text-8xl md:text-9xl relative drop-shadow-2xl will-change-transform"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        🚀
        {/* Flame */}
        <motion.div
          className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-6xl"
          animate={{ scale: [0.9, 1.2, 0.95, 1.15, 0.9], opacity: [0.8, 1, 0.9, 1, 0.8] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          🔥
        </motion.div>

        {/* Subtle sparkles */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={`spark-${i}`}
              className="absolute w-2 h-2 bg-yellow-300 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0.9 }}
              animate={{
                x: Math.cos((i / 10) * Math.PI * 2) * 40,
                y: Math.sin((i / 10) * Math.PI * 2) * 40,
                opacity: 0,
                scale: 0.8,
              }}
              transition={{ duration: 1.2, delay: i * 0.05, repeat: Infinity, ease: "easeOut" }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

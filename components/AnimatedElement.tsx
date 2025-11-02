"use client";
import { motion } from "framer-motion";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  delay?: number;
  className?: string;
}

/**
 * Componente reutilizable para animar elementos cuando entran en la vista.
 * Usa Framer Motion para una animación suave de "fade in" y "slide up".
 * Utiliza `whileInView` para una detección de vista más robusta y compatible con SSR.
 */
export function AnimatedElement({ children, delay = 0, className }: Props) {
  const variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: delay,
        ease: [0.25, 0.1, 0.25, 1.0],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
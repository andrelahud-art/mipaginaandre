"use client";

import { motion, Variants } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
  stagger?: number;
  delay?: number;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: (delay: number = 0) => ({
    opacity: 1,
    transition: {
      delay,
      staggerChildren: 0.04, // Velocidad entre cada letra
    },
  }),
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(5px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      // 'spring' is the desired animation; cast as const to satisfy the type definitions
      type: "spring" as const,
      damping: 12,
      stiffness: 200,
    },
  },
};

export default function AnimatedText({ text, className, delay = 0 }: AnimatedTextProps) {
  const letters = Array.from(text);

  return (
    <motion.h1
      className={`font-heading ${className}`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      custom={delay}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span key={index} variants={letterVariants} className="inline-block">
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  );
}

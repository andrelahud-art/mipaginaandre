"use client";

import { motion } from "framer-motion";

export default function RocketAnimation() {
  return (
    <motion.div
      className="fixed top-1/2 left-0 z-50 pointer-events-none"
      initial={{ x: "-100px", y: 0, rotate: -45 }}
      animate={{ x: "110vw", y: -200, rotate: 45 }}
      transition={{
        duration: 3,
        ease: "easeInOut",
        delay: 0.5,
      }}
      onAnimationComplete={() => {
        // Animation completes, rocket disappears
      }}
    >
      <div className="text-6xl">🚀</div>
    </motion.div>
  );
}

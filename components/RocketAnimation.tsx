"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RocketAnimation() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  useEffect(() => {
    // Initialize audio context for sound effects
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
  }, []);

  const playRocketSound = () => {
    if (!audioContext) return;

    // Create a simple rocket whoosh sound
    const now = audioContext.currentTime;
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Sweep from high to low frequency (rocket sound)
    oscillator.frequency.setValueAtTime(800, now);
    oscillator.frequency.exponentialRampToValueAtTime(200, now + 0.5);

    gainNode.gain.setValueAtTime(0.3, now);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.5);

    oscillator.start(now);
    oscillator.stop(now + 0.5);
  };

  useEffect(() => {
    // Play sound when component mounts (after a small delay)
    const timer = setTimeout(() => {
      playRocketSound();
    }, 500);

    return () => clearTimeout(timer);
  }, [audioContext]);

  // Sparkle particles animation
  const Sparkle = ({ delay }: { delay: number }) => (
    <motion.div
      className="absolute w-2 h-2 bg-yellow-400 rounded-full"
      initial={{ x: 0, y: 0, opacity: 1 }}
      animate={{
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        opacity: 0,
      }}
      transition={{
        duration: 0.8,
        delay: delay,
        ease: "easeOut",
      }}
    />
  );

  return (
    <>
      {/* Rocket Container */}
      <motion.div
        className="fixed top-1/3 left-0 z-50 pointer-events-none"
        initial={{ x: "-200px", y: 0 }}
        animate={{ x: "110vw", y: -300 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        {/* Main Rocket */}
        <motion.div
          className="text-9xl relative"
          animate={{ rotate: [0, 15, -15, 25, -25, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          🚀

          {/* Sparkles Container */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-3 h-3 bg-yellow-400 rounded-full"
                initial={{ x: 0, y: 0, opacity: 1 }}
                animate={{
                  x: Math.cos((i / 8) * Math.PI * 2) * 80,
                  y: Math.sin((i / 8) * Math.PI * 2) * 80 + 50,
                  opacity: 0,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>

          {/* Flame effect */}
          <motion.div
            className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-6xl"
            animate={{ scale: [1, 1.2, 0.9, 1.1, 1] }}
            transition={{
              duration: 0.3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🔥
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Trail particles */}
      <motion.div
        className="fixed top-1/3 left-0 z-40 pointer-events-none"
        initial={{ x: "-200px", y: 0 }}
        animate={{ x: "110vw", y: -300 }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <div className="relative w-32 h-32 ml-8">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-orange-400 rounded-full"
              initial={{ x: 0, y: 0, opacity: 0.8 }}
              animate={{
                x: Math.random() * 60 - 30,
                y: Math.random() * 60 + 20,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                delay: i * 0.05,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </motion.div>
    </>
  );
}


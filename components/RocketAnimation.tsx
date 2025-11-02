"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function RocketAnimation() {
  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);
  const [showExplosion, setShowExplosion] = useState(false);

  useEffect(() => {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    setAudioContext(ctx);
  }, []);

  const playRocketSound = () => {
    if (!audioContext) return;
    const now = audioContext.currentTime;

    // Launch sound (ascending pitch)
    const osc1 = audioContext.createOscillator();
    const gain1 = audioContext.createGain();
    osc1.connect(gain1);
    gain1.connect(audioContext.destination);
    osc1.frequency.setValueAtTime(300, now);
    osc1.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    gain1.gain.setValueAtTime(0.4, now);
    gain1.gain.exponentialRampToValueAtTime(0, now + 0.8);
    osc1.start(now);
    osc1.stop(now + 0.8);

    // Rocket rumble/thrust sound
    const osc2 = audioContext.createOscillator();
    const gain2 = audioContext.createGain();
    osc2.connect(gain2);
    gain2.connect(audioContext.destination);
    osc2.frequency.setValueAtTime(100, now + 0.3);
    osc2.frequency.exponentialRampToValueAtTime(400, now + 3);
    gain2.gain.setValueAtTime(0.3, now + 0.3);
    gain2.gain.exponentialRampToValueAtTime(0, now + 3.2);
    osc2.start(now + 0.3);
    osc2.stop(now + 3.2);
  };

  const playExplosionSound = () => {
    if (!audioContext) return;
    const now = audioContext.currentTime;

    // Explosion burst
    const noiseBuffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.5, audioContext.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < audioContext.sampleRate * 0.5; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }

    const noiseSource = audioContext.createBufferSource();
    noiseSource.buffer = noiseBuffer;
    const gainNode = audioContext.createGain();
    noiseSource.connect(gainNode);
    gainNode.connect(audioContext.destination);
    gainNode.gain.setValueAtTime(0.5, now);
    gainNode.gain.exponentialRampToValueAtTime(0, now + 0.5);
    noiseSource.start(now);
    noiseSource.stop(now + 0.5);
  };

  useEffect(() => {
    const launchTimer = setTimeout(() => {
      playRocketSound();
    }, 300);

    const explosionTimer = setTimeout(() => {
      playExplosionSound();
      setShowExplosion(true);
    }, 4500);

    return () => {
      clearTimeout(launchTimer);
      clearTimeout(explosionTimer);
    };
  }, [audioContext]);

  // Explosion particle
  const ExplosionParticle = ({ index }: { index: number }) => {
    const angle = (index / 40) * Math.PI * 2;
    const distance = 150 + Math.random() * 150;

    return (
      <motion.div
        className="absolute w-4 h-4 rounded-full shadow-xl bg-gradient-to-r from-red-500 to-orange-400"
        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
        animate={{
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance,
          opacity: 0,
          scale: 0,
          rotate: angle * 180,
        }}
        transition={{
          duration: 2,
          ease: "easeOut",
        }}
      />
    );
  };

  return (
    <>
      {/* Rocket with CSS keyframe animation for complex path */}
      <div
        className="fixed top-1/4 left-0 z-50 pointer-events-none"
        style={{ animation: "rocketPath 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}
      >
        {/* Main Rocket */}
        <motion.div
          className="text-9xl relative"
          animate={{
            rotateZ: [0, 360, 720, 1080, 720, 540, 360],
            rotateY: [0, 180, 360, 180, 0, -180, 0],
          }}
          transition={{
            duration: 5,
            ease: "easeInOut",
          }}
        >
          🚀

          {/* Flame effect */}
          <motion.div
            className="absolute -bottom-20 left-1/2 transform -translate-x-1/2 text-7xl"
            animate={{ scale: [0.8, 1.2, 0.9, 1.3, 0.8] }}
            transition={{
              duration: 0.4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            🔥
          </motion.div>

          {/* Sparkles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={`sparkle-${i}`}
                className="absolute w-2 h-2 bg-yellow-300 rounded-full"
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 1,
                }}
                animate={{
                  x: Math.cos((i / 12) * Math.PI * 2) * 80,
                  y: Math.sin((i / 12) * Math.PI * 2) * 80,
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.05,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* Trail particles following rocket */}
      <div
        className="fixed top-1/4 left-0 z-40 pointer-events-none"
        style={{ animation: "rocketPath 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}
      >
        <div className="relative w-32 h-32">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`trail-${i}`}
              className="absolute w-2 h-2 bg-gradient-to-r from-orange-400 to-yellow-300 rounded-full"
              initial={{
                x: 0,
                y: 0,
                opacity: 0.8,
              }}
              animate={{
                x: (Math.random() - 0.5) * 80,
                y: Math.random() * 80 + 20,
                opacity: 0,
              }}
              transition={{
                duration: 1,
                delay: i * 0.03,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      </div>

      {/* Glow effect background */}
      <div
        className="fixed top-1/4 left-0 z-30 pointer-events-none w-96 h-96 rounded-full blur-3xl bg-gradient-to-r from-orange-500 to-red-500 opacity-0"
        style={{ animation: "glowPulse 5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards" }}
      />

      {/* Explosion Effect */}
      {showExplosion && (
        <div
          className="fixed top-1/4 z-40 pointer-events-none"
          style={{ left: "75vw", top: "calc(25% - 350px)", transform: "translate(-50%, -50%)" }}
        >
          <div className="relative w-64 h-64">
            {[...Array(40)].map((_, i) => (
              <ExplosionParticle key={`explosion-${i}`} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* CSS Keyframe Animations */}
      <style>{`
        @keyframes rocketPath {
          0% {
            left: -300px;
            top: calc(25% + 0px);
            transform: scale(1) rotateZ(0deg);
          }
          15% {
            left: 20vw;
            top: calc(25% - 50px);
            transform: scale(1) rotateZ(360deg);
          }
          35% {
            left: 40vw;
            top: calc(25% - 150px);
            transform: scale(1.1) rotateZ(720deg);
          }
          55% {
            left: 50vw;
            top: calc(25% - 200px);
            transform: scale(1.1) rotateZ(1080deg);
          }
          70% {
            left: 60vw;
            top: calc(25% - 250px);
            transform: scale(1.1);
          }
          80% {
            left: 75vw;
            top: calc(25% - 350px);
            transform: scale(2);
          }
          100% {
            left: 110vw;
            top: calc(25% - 400px);
            transform: scale(0.3);
          }
        }

        @keyframes glowPulse {
          0% {
            opacity: 0;
            left: -300px;
            top: calc(25% + 0px);
          }
          40% {
            opacity: 0.6;
          }
          70% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            left: 110vw;
            top: calc(25% - 400px);
          }
        }
      `}</style>
    </>
  );
}

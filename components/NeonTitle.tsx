"use client";

import { useEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";

type NeonTitleProps = {
  id?: string;
  lines: string[]; // each line of the hero title
  className?: string;
  accent?: string; // hex color
};

export default function NeonTitle({ id = "main-title", lines, className = "", accent = "#60A5FA" }: NeonTitleProps) {
  const rootRef = useRef<HTMLHeadingElement | null>(null);

  // Split into words per line
  const splitLines = useMemo(() => lines.map(line => line.trim().split(/\s+/)), [lines]);

  useEffect(() => {
    if (!rootRef.current) return;
  const el = rootRef.current;
  const wordEls = Array.from(el!.querySelectorAll<HTMLSpanElement>(".neon-word"));

    // Create tiny audio ping via Web Audio for hover micro-interaction
    let audioCtx: AudioContext | null = null;
    const playPing = () => {
      try {
        if (!audioCtx) audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const ctx = audioCtx!;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.value = 880; // A5
        gain.gain.value = 0.0001; // start silent
        osc.connect(gain);
        gain.connect(ctx.destination);
        const now = ctx.currentTime;
        osc.start(now);
        // quick ping envelope
        gain.gain.exponentialRampToValueAtTime(0.05, now + 0.01);
        osc.frequency.exponentialRampToValueAtTime(1320, now + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.00001, now + 0.12);
        osc.stop(now + 0.14);
      } catch {}
    };

    const enter = (w: HTMLElement) => {
      playPing();
      gsap.to(w, {
        duration: 0.5,
        ease: "power2.out",
        textShadow: `0 0 6px ${accent}, 0 0 18px ${accent}80, 0 0 36px ${accent}55`,
        filter: `drop-shadow(0 0 6px ${accent})`,
      });
    };
    const leave = (w: HTMLElement) => {
      gsap.to(w, {
        duration: 0.6,
        ease: "power2.out",
        textShadow: `0 0 2px ${accent}55, 0 0 8px ${accent}40`,
        filter: `drop-shadow(0 0 2px ${accent}55)`,
      });
    };

    wordEls.forEach((w) => {
      // baseline subtle glow
      (w as HTMLElement).style.textShadow = `0 0 2px ${accent}55, 0 0 8px ${accent}40`;
      (w as HTMLElement).style.filter = `drop-shadow(0 0 2px ${accent}55)`;
      w.addEventListener("mouseenter", () => enter(w));
      w.addEventListener("mouseleave", () => leave(w));
    });

    // Also apply hover glow to CTA buttons on the page
    const ctas = Array.from(document.querySelectorAll<HTMLElement>(".btn-primary, .btn-secondary"));
    const ctaEnter = (b: HTMLElement) => {
      gsap.to(b, { duration: 0.4, ease: "power2.out", boxShadow: `0 0 24px ${accent}88, 0 0 48px ${accent}44` });
    };
    const ctaLeave = (b: HTMLElement) => {
      gsap.to(b, { duration: 0.5, ease: "power2.out", boxShadow: `0 0 0px transparent` });
    };
    ctas.forEach((b) => {
      b.addEventListener("mouseenter", () => { playPing(); ctaEnter(b); });
      b.addEventListener("mouseleave", () => ctaLeave(b));
    });

    return () => {
      wordEls.forEach((w) => {
        w.replaceWith(w.cloneNode(true)); // quick detach listeners
      });
      ctas.forEach((b) => {
        b.replaceWith(b.cloneNode(true));
      });
      try { audioCtx?.close(); } catch {}
    };
  }, [accent]);

  return (
    <h1 id={id} ref={rootRef} className={`select-none font-heading text-4xl md:text-6xl lg:text-7xl font-bold leading-tight text-white ${className}`}>
      {splitLines.map((words, li) => (
        <span key={li} className="block">
          {words.map((w, wi) => (
            <span key={wi} className="neon-word inline-block mr-2 align-baseline">
              {w}
            </span>
          ))}
        </span>
      ))}
    </h1>
  );
}

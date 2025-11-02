"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Controls the short, cinematic transition when leaving the hero.
type Props = {
  heroSelector?: string;
  duration?: number; // seconds for the flare/pin sequence
  boost?: number;    // 0..1 how strong the starfield reacts
};

export default function HomeScrollFX({ heroSelector = "#hero", duration = 0.5, boost = 1 }: Props) {
  useEffect(() => {
    const hero = document.querySelector(heroSelector);
    if (!hero) return;

    // Pin briefly and animate starfield "boost" uniform for 0.5s on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: hero as Element,
        start: "bottom top-=120", // when near the end of hero
        end: "+=1", // minimal duration
        scrub: false,
        pin: true,
        pinSpacing: true,
        onEnter: () => dispatchBoost(boost),
        onLeave: () => dispatchBoost(0),
        onEnterBack: () => dispatchBoost(boost),
        onLeaveBack: () => dispatchBoost(0),
      },
      defaults: { duration, ease: "power2.out" },
    });

    // quick flare to 1 then back to 0
    tl.to({}, { duration: duration / 2, onUpdate: () => dispatchBoost(boost) })
      .to({}, { duration: duration / 2, onUpdate: () => dispatchBoost(0) });

    function dispatchBoost(value: number) {
      window.dispatchEvent(new CustomEvent("starfield:boost", { detail: { value } }));
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [heroSelector, duration, boost]);

  return null;
}

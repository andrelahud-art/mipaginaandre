"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type StarfieldBackgroundProps = {
  accent?: string; // CSS color string e.g. "#60A5FA"
  density?: number; // number of points (approx)
};

// GPU-based starfield with mouse-repulsion in clip-space for performance
export default function StarfieldBackground({ accent = "#60A5FA", density = 4000 }: StarfieldBackgroundProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const animationId = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.z = 8;
    cameraRef.current = camera;

    const particles = density;
    const positions = new Float32Array(particles * 3);
    const radius = 20;
    for (let i = 0; i < particles; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * radius;
      positions[i3 + 1] = (Math.random() - 0.5) * radius * 0.6; // slight flattening
      positions[i3 + 2] = (Math.random() - 0.5) * radius;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Convert accent hex to normalized rgb
    const hex = new THREE.Color(accent);
    const accentRGB = new THREE.Vector3(hex.r, hex.g, hex.b);

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(2, 2) }, // off-screen initial
        uBoost: { value: 0 },
        uAccent: { value: accentRGB },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: /* glsl */ `
        uniform float uTime;
        uniform vec2 uMouse; // in clip space (-1..1)
        uniform float uBoost;
        varying float vProximity;
        varying float vTwinkle;
        
        void main() {
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          vec4 clipPosition = projectionMatrix * mvPosition;
          vec2 clipXY = clipPosition.xy / clipPosition.w;
          float d = distance(clipXY, uMouse);
          float radius = mix(0.25, 0.4, uBoost); // interaction radius grows with boost
          float influence = smoothstep(radius, 0.0, d);
          // direction in clip space away from mouse
          vec2 dir = normalize(clipXY - uMouse + 1e-6);
          // max displacement in clip units
          float maxDisp = mix(0.02, 0.06, uBoost);
          clipPosition.xy += dir * influence * maxDisp;

          gl_Position = clipPosition;
          // star size modulation
          float baseSize = 2.0;
          float size = baseSize + influence * 3.0 + uBoost * 1.5;
          gl_PointSize = size;
          vProximity = influence;
          vTwinkle = sin(uTime * 0.8 + position.x * 1.7 + position.y * 2.3);
        }
      `,
      fragmentShader: /* glsl */ `
        precision highp float;
        uniform vec3 uAccent;
        uniform float uBoost;
        uniform float uPixelRatio;
        varying float vProximity;
        varying float vTwinkle;

        void main() {
          // soft circle
          vec2 uv = gl_PointCoord * 2.0 - 1.0;
          float r = length(uv);
          float alpha = smoothstep(1.0, 0.6, r);
          // base star color
          vec3 base = vec3(0.8);
          // accent glow near cursor
          vec3 color = mix(base, uAccent, clamp(vProximity * (0.6 + uBoost * 0.6), 0.0, 1.0));
          // subtle twinkle
          color += 0.07 * vTwinkle;
          gl_FragColor = vec4(color, alpha * (0.6 + vProximity * 0.5 + uBoost * 0.2));
        }
      `,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = material;

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const mouse = new THREE.Vector2(2, 2);
    const onPointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouse.set(x, y);
      material.uniforms.uMouse.value.copy(mouse);
    };
    window.addEventListener("mousemove", onPointerMove);

    const onResize = () => {
      if (!rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      rendererRef.current.setSize(w, h);
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    const onBoost = (e: Event) => {
      const ce = e as CustomEvent<{ value: number }>;
      const v = Math.max(0, Math.min(1, ce.detail?.value ?? 0));
      if (materialRef.current) materialRef.current.uniforms.uBoost.value = v;
    };
    window.addEventListener("starfield:boost", onBoost as EventListener);

    const clock = new THREE.Clock();
    const tick = () => {
      if (!rendererRef.current || !sceneRef.current || !cameraRef.current || !materialRef.current) return;
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      animationId.current = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      window.removeEventListener("mousemove", onPointerMove);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("starfield:boost", onBoost as EventListener);
      if (animationId.current) cancelAnimationFrame(animationId.current);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        container.removeChild(rendererRef.current.domElement);
      }
      geometry.dispose();
      material.dispose();
    };
  }, [density, accent]);

  return (
    <div ref={containerRef} className="absolute inset-0 -z-10" aria-hidden />
  );
}

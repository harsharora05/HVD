"use client";

import { useEffect, useRef } from "react";

type Shape = "node" | "ring" | "plus" | "chevron" | "square" | "link";

type Particle = {
  /** 0–1 position inside the left or right gutter. */
  gutterX: number;
  side: -1 | 1;
  /** 0–1 starting position in the vertical band. */
  y: number;
  /** How much faster than the page the particle falls. */
  speed: number;
  size: number;
  spin: number;
  phase: number;
  sway: number;
  shape: Shape;
  color: string;
  alpha: number;
  /** 0.35 (far) – 1 (near): scales size, fall speed and brightness for a sense of depth. */
  depth: number;
};

const SHAPES: Shape[] = ["node", "ring", "plus", "chevron", "square", "link"];
const COLORS = ["79, 124, 255", "167, 139, 250", "116, 149, 255"];
const CONTENT_MAX = 1280; // matches the max-w-7xl container
const LINK_DISTANCE = 120;

/** Small deterministic PRNG so the field looks the same on every visit. */
function random(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };
}

function createParticles(count: number): Particle[] {
  const rand = random(7);
  return Array.from({ length: count }, (_, i) => {
    const depth = 0.35 + rand() * 0.65;
    return {
    depth,
    gutterX: rand(),
    side: (i % 2 === 0 ? -1 : 1) as -1 | 1,
    y: rand(),
    speed: 0.25 + depth * 0.95,
    size: (5 + rand() * 9) * (0.6 + depth * 0.6),
    spin: (rand() - 0.5) * 0.012,
    phase: rand() * Math.PI * 2,
    sway: 6 + rand() * 18,
    shape: SHAPES[Math.floor(rand() * SHAPES.length)],
    color: COLORS[Math.floor(rand() * COLORS.length)],
    alpha: (0.3 + rand() * 0.35) * (0.45 + depth * 0.55),
    };
  });
}

function draw(ctx: CanvasRenderingContext2D, p: Particle, x: number, y: number, rotation: number, alpha: number, trail: number) {
  const s = p.size;
  // Motion trail opposite to the direction of travel while the page is moving fast.
  if (Math.abs(trail) > 2) {
    const gradient = ctx.createLinearGradient(x, y, x, y - trail);
    gradient.addColorStop(0, `rgba(${p.color}, ${alpha * 0.5})`);
    gradient.addColorStop(1, `rgba(${p.color}, 0)`);
    ctx.strokeStyle = gradient;
    ctx.lineWidth = Math.max(1, s * 0.18);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x, y - trail);
    ctx.stroke();
  }
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(rotation);
  ctx.strokeStyle = `rgba(${p.color}, ${alpha})`;
  ctx.fillStyle = `rgba(${p.color}, ${alpha})`;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.beginPath();
  switch (p.shape) {
    case "node":
      ctx.arc(0, 0, s * 0.32, 0, Math.PI * 2);
      ctx.fill();
      break;
    case "ring":
      ctx.arc(0, 0, s * 0.5, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case "plus":
      ctx.moveTo(-s / 2, 0);
      ctx.lineTo(s / 2, 0);
      ctx.moveTo(0, -s / 2);
      ctx.lineTo(0, s / 2);
      ctx.stroke();
      break;
    case "chevron": // the "V" from the HVD monogram
      ctx.moveTo(-s / 2, -s / 3);
      ctx.lineTo(0, s / 3);
      ctx.lineTo(s / 2, -s / 3);
      ctx.stroke();
      break;
    case "square":
      ctx.roundRect(-s / 2, -s / 2, s, s, s * 0.22);
      ctx.stroke();
      break;
    case "link": // two connected nodes
      ctx.moveTo(-s / 2, 0);
      ctx.lineTo(s / 2, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(-s / 2, 0, 2, 0, Math.PI * 2);
      ctx.arc(s / 2, 0, 2, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
  ctx.restore();
}

/**
 * Brand-shaped particles in the page gutters whose positions are a pure function of the
 * scroll position: they fall as you scroll down and rise back as you scroll up. Rendering
 * only happens while the (eased) scroll value is changing, so it costs nothing at rest.
 */
export function ScrollParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    let current = window.scrollY;
    let velocity = 0;
    let frame = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width < 640 ? 10 : width < 1024 ? 16 : 30);
      render(current);
    };

    const render = (scroll: number) => {
      ctx.clearRect(0, 0, width, height);
      const narrow = width < 1024;
      // Keep particles in the side gutters next to the content column on wide screens.
      const gutter = narrow ? width * 0.12 : Math.max(56, (width - CONTENT_MAX) / 2 + 32);
      const margin = 40;
      const band = height + margin * 2;
      const dim = narrow ? 0.55 : 1;
      const points = particles.map((p) => {
        const travel = p.y * band + scroll * p.speed;
        const y = (((travel % band) + band) % band) - margin;
        const swayX = Math.sin(scroll * 0.004 + p.phase) * p.sway;
        const baseX = p.side < 0 ? p.gutterX * gutter : width - p.gutterX * gutter;
        // Fade at the top/bottom edges so particles never pop in or out.
        const edge = Math.max(0, Math.min(1, (y + margin) / 80, (height + margin - y) / 80));
        return { p, x: baseX + swayX, y, alpha: p.alpha * edge * dim };
      });

      // Connect nearby particles on the same side — a quiet nod to the logo's linked nodes.
      ctx.lineWidth = 1;
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const a = points[i];
          const b = points[j];
          if (a.p.side !== b.p.side) continue;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d > LINK_DISTANCE) continue;
          const strength = (1 - d / LINK_DISTANCE) * Math.min(a.alpha, b.alpha) * 0.55;
          ctx.strokeStyle = `rgba(${a.p.color}, ${strength})`;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      const trailScale = Math.max(-60, Math.min(60, velocity)) * 0.6;
      for (const { p, x, y, alpha } of points) {
        draw(ctx, p, x, y, p.phase + scroll * p.spin, alpha, trailScale * p.speed);
      }
    };

    const tick = () => {
      const target = window.scrollY;
      velocity = (target - current) * 0.14; // eased so the field feels weighty
      current += velocity;
      if (Math.abs(target - current) < 0.3) {
        current = target;
        velocity = 0;
      }
      render(current);
      frame = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 z-40 h-full w-full" />;
}

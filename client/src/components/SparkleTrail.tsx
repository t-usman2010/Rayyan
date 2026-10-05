import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  rotation: number;
  vRot: number;
  color: string;
  shape: "star" | "heart" | "dot";
}

const COLORS = [
  "rgba(183, 110, 121, ", // rose gold
  "rgba(255, 215, 0, ",   // gold sparkle
  "rgba(255, 182, 193, ", // petal pink
  "rgba(245, 240, 236, ", // starlight cream
];

export default function SparkleTrail() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];

    const addParticles = (x: number, y: number, count = 2) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 1.5 + 0.5;
        const shapes: Particle["shape"][] = ["star", "heart", "dot"];
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 0.4, // gentle float up
          size: Math.random() * 5 + 3,
          alpha: 1,
          decay: Math.random() * 0.025 + 0.015,
          rotation: Math.random() * Math.PI * 2,
          vRot: (Math.random() - 0.5) * 0.1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          shape: shapes[Math.floor(Math.random() * shapes.length)],
        });
      }
    };

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;

    const handlePointerMove = (e: PointerEvent) => {
      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist > 18 || now - lastTime > 60) {
        addParticles(e.clientX, e.clientY, 2);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      addParticles(e.clientX, e.clientY, 8); // nice burst on click/tap
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    window.addEventListener("pointerdown", handlePointerDown, { passive: true });

    // Draw 4-point sparkle star
    const drawStar = (c: CanvasRenderingContext2D, size: number) => {
      c.beginPath();
      c.moveTo(0, -size);
      c.quadraticCurveTo(0, 0, size, 0);
      c.quadraticCurveTo(0, 0, 0, size);
      c.quadraticCurveTo(0, 0, -size, 0);
      c.quadraticCurveTo(0, 0, 0, -size);
      c.closePath();
      c.fill();
    };

    // Draw mini heart
    const drawHeart = (c: CanvasRenderingContext2D, size: number) => {
      const s = size * 0.6;
      c.beginPath();
      c.moveTo(0, s * 0.3);
      c.bezierCurveTo(-s, -s * 0.7, -s * 1.5, s * 0.3, 0, s * 1.4);
      c.bezierCurveTo(s * 1.5, s * 0.3, s, -s * 0.7, 0, s * 0.3);
      c.closePath();
      c.fill();
    };

    const loop = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.rotation += p.vRot;
        p.alpha -= p.decay;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = `${p.color}${p.alpha.toFixed(3)})`;
        ctx.shadowColor = `${p.color}0.8)`;
        ctx.shadowBlur = 6;

        if (p.shape === "star") {
          drawStar(ctx, p.size);
        } else if (p.shape === "heart") {
          drawHeart(ctx, p.size);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size * 0.45, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}

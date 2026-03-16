'use client';

import { useRef, useEffect } from 'react';

export default function BurstCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const particles: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = [];

    const emit = (clientX: number, clientY: number) => {
      for (let i = 0; i < 60; i++) {
        const angle = (Math.PI * 2 * i) / 60 + Math.random() * 0.5;
        const speed = 1.5 + Math.random() * 2.5;
        particles.push({
          x: clientX,
          y: clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 0,
          maxLife: 1.2,
        });
      }
    };

    const onMouseEnter = (e: MouseEvent) => {
      const card = (e.target as HTMLElement).closest('.review-card');
      if (!card) return;
      const rect = card.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      emit(x, y);
    };

    document.querySelectorAll('.review-card').forEach((el) => {
      el.addEventListener('mouseenter', onMouseEnter as EventListener);
    });

    let rafId: number;
    const animate = () => {
      if (document.hidden) {
        rafId = requestAnimationFrame(animate);
        return;
      }
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life += 0.016;
        const t = p.life / p.maxLife;
        if (t >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const opacity = 1 - t;
        ctx.fillStyle = `rgba(200, 169, 110, ${opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 4, 0, Math.PI * 2);
        ctx.fill();
      }
      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      document.querySelectorAll('.review-card').forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnter as EventListener);
      });
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="burst-canvas"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
        willChange: 'transform',
      }}
    />
  );
}

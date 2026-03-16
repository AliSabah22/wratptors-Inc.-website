'use client';

import { useEffect } from 'react';

export default function CustomCursor() {
  useEffect(() => {
    let mx = 0,
      my = 0,
      rx = 0,
      ry = 0;
    const cursor = document.querySelector('.cursor') as HTMLElement;
    const ring = document.querySelector('.cursor-ring') as HTMLElement;
    if (!cursor || !ring) return;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const animate = () => {
      cursor.style.transform = `translate(${mx - 6}px, ${my - 6}px)`;
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      ring.style.transform = `translate(${rx - 18}px, ${ry - 18}px)`;
      requestAnimationFrame(animate);
    };
    document.addEventListener('mousemove', onMove);
    animate();
    return () => document.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <>
      <div className="cursor" aria-hidden />
      <div className="cursor-ring" aria-hidden />
    </>
  );
}

'use client';

import { useRef, useState } from 'react';

const MAGNET_RADIUS = 120;
const MAX_OFFSET = 12;
const STRENGTH = 0.3;

export default function MagneticButton({
  children,
  className,
  style,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < MAGNET_RADIUS) {
      const factor = 1 - dist / MAGNET_RADIUS;
      const x = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dx * STRENGTH * factor));
      const y = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, dy * STRENGTH * factor));
      setOffset({ x, y });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  return (
    <div
      ref={ref}
      className={className}
      style={{
        ...style,
        display: 'inline-block',
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: 'transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
    </div>
  );
}

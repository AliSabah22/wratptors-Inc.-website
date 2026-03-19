'use client';

import { useRef } from 'react';
import { useInView, m } from 'framer-motion';

export default function ImageReveal({
  children,
  className,
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <div ref={ref} className={className} style={{ position: 'relative', overflow: 'hidden', ...style }}>
      {children}
      <m.div
        initial={{ x: '-101%' }}
        animate={isInView ? { x: ['-101%', '0%', '101%'] } : { x: '-101%' }}
        transition={{
          duration: 0.9,
          ease: [0.76, 0, 0.24, 1],
          times: [0, 0.45, 1],
        }}
        style={{
          position: 'absolute',
          inset: 0,
          background: '#C8A96E',
          pointerEvents: 'none',
          zIndex: 1,
        }}
      />
    </div>
  );
}

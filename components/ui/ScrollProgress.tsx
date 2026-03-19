'use client';

import { useScroll, useSpring, m } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <m.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: 1,
        background: '#C8A96E',
        zIndex: 99996,
        transformOrigin: '0%',
        scaleX,
      }}
      aria-hidden
    />
  );
}

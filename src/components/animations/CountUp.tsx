'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

type CountUpProps = {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
};

export default function CountUp({
  end,
  suffix = '',
  duration = 2,
  className,
}: CountUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    if (prefersReducedMotion) {
      setCurrent(end);
      return;
    }

    const start = 0;
    const delta = end - start;
    const startTime = performance.now();
    const durationMs = duration * 1000;

    let raf = 0;
    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(1, elapsed / durationMs);
      // EaseOutCubic
      const eased = 1 - Math.pow(1 - t, 3);
      setCurrent(Math.round(start + delta * eased));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [duration, end, isInView, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {Math.floor(current)}
      {suffix}
    </span>
  );
}


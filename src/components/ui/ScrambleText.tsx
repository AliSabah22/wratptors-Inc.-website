'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'framer-motion';

const POOL = 'WRAPTORS0123456789!@#$%';

export default function ScrambleText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [text, setText] = useState(children);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!isInView || done) return;

    const target = children;
    const len = target.length;
    let iteration = 0;
    const maxIterations = 5;
    const staggerMs = 40;
    const resolveDelay = 30;

    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < len; i++) {
      const startDelay = i * resolveDelay;
      for (let k = 0; k <= maxIterations; k++) {
        const t = startDelay + k * staggerMs;
        timers.push(
          setTimeout(() => {
            setText((prev) => {
              const next = prev.split('');
              if (k < maxIterations) {
                next[i] = POOL[Math.floor(Math.random() * POOL.length)];
              } else {
                next[i] = target[i];
              }
              return next.join('');
            });
            if (i === len - 1 && k === maxIterations) setDone(true);
          }, t)
        );
      }
    }

    return () => timers.forEach(clearTimeout);
  }, [children, isInView, done]);

  return (
    <span ref={ref} className={className}>
      {text}
    </span>
  );
}

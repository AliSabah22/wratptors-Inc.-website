'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type SlideInProps = {
  children: React.ReactNode;
  direction: 'left' | 'right';
  delay?: number;
  className?: string;
};

export default function SlideIn({
  children,
  direction,
  delay = 0,
  className,
}: SlideInProps) {
  const prefersReducedMotion = useReducedMotion();

  const x = direction === 'left' ? -60 : 60;
  const initial = prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 0, x };
  const whileInView = prefersReducedMotion ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 };
  const transition = prefersReducedMotion
    ? { duration: 0.01, delay }
    : { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const, delay };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={{ once: true, margin: '-80px' }}
    >
      {children}
    </motion.div>
  );
}


'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type ScaleInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function ScaleIn({ children, delay = 0, className }: ScaleInProps) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.88 };
  const whileInView = prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 };
  const transition = prefersReducedMotion
    ? { duration: 0.01, delay }
    : { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const, delay };

  return (
    <motion.div
      className={className}
      initial={initial}
      whileInView={whileInView}
      transition={transition}
      viewport={{ once: true, margin: '-60px' }}
    >
      {children}
    </motion.div>
  );
}


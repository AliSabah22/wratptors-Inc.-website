'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type FadeInProps = {
  children: React.ReactNode;
  delay?: number;
  className?: string;
};

export default function FadeIn({ children, delay = 0, className }: FadeInProps) {
  const prefersReducedMotion = useReducedMotion();

  const initial = prefersReducedMotion ? { opacity: 1 } : { opacity: 0 };
  const whileInView = prefersReducedMotion ? { opacity: 1 } : { opacity: 1 };
  const transition = prefersReducedMotion
    ? { duration: 0.01, delay }
    : { duration: 0.6, ease: 'easeOut' as const, delay };

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


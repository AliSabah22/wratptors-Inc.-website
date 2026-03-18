'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type FadeUpProps = {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
};

export default function FadeUp({
  children,
  delay = 0,
  duration = 0.7,
  className,
}: FadeUpProps) {
  const prefersReducedMotion = useReducedMotion();
  const yOffset =
    typeof window !== 'undefined' && window.innerWidth < 768 ? 20 : 40;

  const initial = prefersReducedMotion
    ? { opacity: 1, y: 0 }
    : { opacity: 0, y: yOffset };
  const whileInView = prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 };

  const transition = prefersReducedMotion
    ? { duration: 0.01, delay }
    : {
        duration,
        ease: [0.16, 1, 0.3, 1] as const,
        delay,
      };

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

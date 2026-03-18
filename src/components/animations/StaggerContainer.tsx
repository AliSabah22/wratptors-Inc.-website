'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

type StaggerContainerProps = {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
};

export default function StaggerContainer({
  children,
  staggerDelay = 0.08,
  className,
}: StaggerContainerProps) {
  const prefersReducedMotion = useReducedMotion();

  const parentVariants = {
    hidden: {},
    show: prefersReducedMotion
      ? {}
      : {
          transition: { staggerChildren: staggerDelay },
        },
  } as const;

  const childVariants = {
    hidden: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 },
    show: prefersReducedMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
  } as const;

  return (
    <motion.div
      className={className}
      variants={parentVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={
        prefersReducedMotion ? { duration: 0.01 } : { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const }
      }
    >
      {React.Children.toArray(children).map((child, idx) => (
        <motion.div key={idx} variants={childVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}


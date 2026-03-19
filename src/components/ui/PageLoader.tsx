'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState, useRef } from 'react';
import { AnimatePresence, m } from 'framer-motion';

export default function PageLoader() {
  const pathname = usePathname();
  const [isVisible, setIsVisible] = useState(false);
  const prevPathRef = useRef<string | null>(null);

  useEffect(() => {
    if (prevPathRef.current !== null && prevPathRef.current !== pathname) {
      setIsVisible(true);
      const t = setTimeout(() => setIsVisible(false), 700);
      return () => clearTimeout(t);
    }
    prevPathRef.current = pathname;
  }, [pathname]);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          className="page-loader-overlay"
          initial={{ y: '100%' }}
          animate={{ y: '0%' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.35, ease: [0.76, 0, 0.24, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0A0A0A',
            zIndex: 99997,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <m.span
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '8rem',
              color: '#C8A96E',
              animation: 'pageLoaderPulse 0.6s ease-in-out',
            }}
          >
            W
          </m.span>
        </m.div>
      )}
    </AnimatePresence>
  );
}

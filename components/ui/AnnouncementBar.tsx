'use client';

import { useState, useEffect } from 'react';

const MESSAGE = '🔥 BOOK THIS MONTH & RECEIVE A FREE WINDOW TINT WITH ANY FULL WRAP — LIMITED SPOTS';
const STORAGE_KEY = 'wraptors-promo-dismissed';

export default function AnnouncementBar() {
  const [dismissed, setDismissed] = useState(true);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    setDismissed(!!stored);
  }, []);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, '1');
    setDismissed(true);
  };

  if (dismissed) return null;

  return (
    <div
      className="announcement-bar"
      style={{
        background: '#C8A96E',
        height: 36,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1002,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        fontFamily: "'DM Sans', sans-serif",
        fontWeight: 500,
        fontSize: 10,
        textTransform: 'uppercase',
        color: '#000',
        letterSpacing: '0.05em',
        overflow: 'hidden',
      }}
    >
      <div
        className="announcement-marquee"
        style={{
          whiteSpace: 'nowrap',
          animation: 'marquee 25s linear infinite',
        }}
      >
        {MESSAGE}
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss"
        style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          background: 'transparent',
          border: 'none',
          color: '#000',
          cursor: 'pointer',
          padding: 4,
          fontSize: 18,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

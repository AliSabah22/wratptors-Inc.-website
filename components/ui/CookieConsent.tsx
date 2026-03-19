'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'wraptors-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY) : null;
    if (!stored) {
      const t = setTimeout(() => setVisible(true), 300);
      return () => clearTimeout(t);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem(STORAGE_KEY, 'declined');
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        zIndex: 99995,
        padding: '1rem 8%',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1rem',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: 14,
        color: 'var(--color-muted-light)',
      }}
    >
      <span style={{ flex: '1 1 280px' }}>
        We use cookies to enhance your experience and analyze site traffic. By continuing you agree to our{' '}
        <Link href="/privacy-policy" style={{ color: 'var(--color-gold)' }}>
          Privacy Policy
        </Link>
        .
      </span>
      <div style={{ display: 'flex', gap: 12 }}>
        <button
          type="button"
          onClick={accept}
          style={{
            background: 'var(--color-gold)',
            color: '#000',
            border: 'none',
            padding: '10px 20px',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          Accept all
        </button>
        <button
          type="button"
          onClick={decline}
          style={{
            background: 'transparent',
            color: 'var(--color-muted-light)',
            border: '1px solid var(--color-border)',
            padding: '10px 20px',
            fontSize: 10,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Decline
        </button>
      </div>
    </div>
  );
}

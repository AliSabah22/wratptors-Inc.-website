'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const TABS = [
  { href: '/', label: 'Home', icon: '⌂' },
  { href: '/services', label: 'Services', icon: '◆' },
  { href: 'tel:+16476209727', label: 'Phone', icon: '✆', external: true },
  { href: '/contact', label: 'Quote', icon: '✎' },
];

export default function MobileBar() {
  const pathname = usePathname();

  return (
    <div
      className="mobile-bar"
      style={{
        display: 'none',
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        background: 'rgba(10,10,10,0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid var(--color-border)',
        zIndex: 9988,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
      }}
    >
      {TABS.map(({ href, label, icon, external }) => (
        <Link
          key={href}
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            color: pathname === href ? 'var(--color-gold)' : 'var(--color-muted)',
            textDecoration: 'none',
            fontSize: 10,
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          <span style={{ fontSize: 20 }}>{icon}</span>
          {label}
        </Link>
      ))}
    </div>
  );
}

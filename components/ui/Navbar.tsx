'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const NavLogoCanvas = dynamic(() => import('@/components/NavLogoCanvas'), { ssr: false });

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Utility bar - desktop only */}
      <div
        style={{
          display: 'none',
          height: 36,
          background: 'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '8%',
          paddingRight: '8%',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          color: 'var(--color-muted)',
        }}
        className="nav-utility-bar"
      >
        <div style={{ display: 'flex', gap: 24 }}>
          <a href="tel:+16476209727" style={{ color: 'inherit', textDecoration: 'none' }}>647.620.WRAP</a>
          <a href="mailto:wrap@torontowraptors.com" style={{ color: 'inherit', textDecoration: 'none' }}>wrap@torontowraptors.com</a>
        </div>
        <div style={{ display: 'flex', gap: 16 }}>
          <a href="https://instagram.com/wraptors" target="_blank" rel="noopener noreferrer" aria-label="Instagram" style={{ color: 'inherit' }}>IG</a>
          <a href="https://facebook.com/wraptors" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: 'inherit' }}>FB</a>
        </div>
      </div>

      {/* Main nav */}
      <nav
        id="navbar"
        className={`nav-main ${scrolled ? 'solid' : ''}`}
        style={{
          height: 64,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingLeft: '8%',
          paddingRight: '8%',
          transition: 'background 0.3s, border-color 0.3s',
        }}
      >
        <Link href="/" className="nav-logo-link" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }} aria-label="Wraptors home">
          <NavLogoCanvas />
        </Link>
        <ul className="nav-links" style={{ display: 'flex', listStyle: 'none', gap: 32, margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} style={{ color: 'var(--color-text)', textDecoration: 'none', fontSize: 14 }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/contact"
          style={{
            background: 'var(--color-gold)',
            color: '#000',
            padding: '10px 20px',
            fontSize: 10,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontWeight: 500,
            textDecoration: 'none',
          }}
        >
          GET A QUOTE
        </Link>
        <button
          type="button"
          className="hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: 8,
            flexDirection: 'column',
            gap: 6,
          }}
        >
          <span style={{ display: 'block', width: 24, height: 1, background: '#fff' }} />
          <span style={{ display: 'block', width: 24, height: 1, background: '#fff' }} />
          <span style={{ display: 'block', width: 24, height: 1, background: '#fff' }} />
        </button>
      </nav>

      {/* Mobile menu */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          background: '#0A0A0A',
          zIndex: 999,
          display: mobileOpen ? 'flex' : 'none',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
        className="mobile-menu"
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '3.5rem',
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
        <Link href="/contact" onClick={() => setMobileOpen(false)} style={{ color: 'var(--color-gold)', fontFamily: "'Bebas Neue', sans-serif", fontSize: '2rem', textDecoration: 'none' }}>
          Get a Quote
        </Link>
      </div>
    </>
  );
}

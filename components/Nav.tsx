'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/locations', label: 'Locations' },
  { href: '/contact', label: 'Contact' },
];

const NavLogoCanvas = dynamic(() => import('./NavLogoCanvas'), {
  ssr: false,
});

export default function Nav() {
  const [solid, setSolid] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav id="navbar" className={solid ? 'solid' : ''}>
        <Link href="/" className="nav-logo" aria-label="Wraptors home">
          <NavLogoCanvas />
        </Link>
        <ul className="nav-links">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
        <Link href="/contact" className="nav-cta">
          Get a Quote
        </Link>
        <button
          type="button"
          className="hamburger"
          id="hamburger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      <div
        className={`mobile-menu ${mobileOpen ? 'open' : ''}`}
        id="mobileMenu"
        aria-hidden={!mobileOpen}
      >
        {NAV_LINKS.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            onClick={() => setMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
        <Link
          href="/contact"
          onClick={() => setMobileOpen(false)}
          style={{ color: 'var(--gold)' }}
        >
          Get a Quote
        </Link>
      </div>
    </>
  );
}

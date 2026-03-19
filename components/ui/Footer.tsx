'use client';

import Link from 'next/link';

const FOOTER_SERVICES = [
  { href: '/services/vehicle-wrapping', label: 'Vehicle Wrapping' },
  { href: '/services/paint-protection', label: 'Paint Protection Film' },
  { href: '/services/window-tinting', label: 'Window Tinting' },
  { href: '/services/auto-detailing', label: 'Auto Detailing' },
  { href: '/services/custom-interior', label: 'Custom Interior' },
  { href: '/services/starlight-headliner', label: 'Starlight Headliner' },
  { href: '/services/racing-stripes', label: 'Racing Stripes' },
  { href: '/services/galaxy-ceilings', label: 'Galaxy Ceilings' },
  { href: '/services/decals', label: 'Decals' },
  { href: '/services/caliper-painting', label: 'Caliper Painting' },
  { href: '/services/wheel-painting', label: 'Wheel Painting' },
];

const FOOTER_COMPANY = [
  { href: '/about', label: 'About' },
  { href: '/locations', label: 'Locations' },
  { href: '/franchises', label: 'Franchises' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/faqs', label: 'FAQs' },
  { href: '/careers', label: 'Careers' },
  { href: '/privacy-policy', label: 'Privacy Policy' },
];

const FOOTER_CONNECT = [
  { href: 'https://instagram.com/wraptors', label: 'Instagram', external: true },
  { href: 'https://facebook.com/wraptors', label: 'Facebook', external: true },
  { href: '/contact', label: 'Contact' },
];

const PARTNERS = ['3M', 'Avery Dennison', 'Hexis', 'Suntek', 'STEK', 'Wraptors Mafia'];

export default function Footer() {
  return (
    <footer className="footer-with-canvas" style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)', padding: '4rem 8% 2rem' }}>
      <div className="footer-watermark" aria-hidden>WRAPTORS</div>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem', position: 'relative', zIndex: 1 }}>
        <div>
          <span className="footer-brand-name" style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '2.5rem', color: 'var(--color-gold)', letterSpacing: '0.15em', display: 'block', marginBottom: '1rem' }}>WRAPTORS</span>
          <p className="footer-brand-desc" style={{ fontSize: '0.85rem', color: 'var(--color-muted)', lineHeight: 1.8, marginBottom: '1.5rem' }}>
            The world&apos;s largest and most experienced vehicle wrap shop. 13 locations across Canada, USA and South Africa. Over 9,000 vehicles transformed.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <a href="https://apps.apple.com/ca/app/wraptors-inc/id1572692992" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', border: '1px solid var(--color-border)', padding: '0.6rem 1rem', textDecoration: 'none', textAlign: 'center' }}>App Store</a>
            <a href="https://play.google.com/store/apps/details?id=com.wraptor.wraptorclient" target="_blank" rel="noopener noreferrer" style={{ fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', border: '1px solid var(--color-border)', padding: '0.6rem 1rem', textDecoration: 'none', textAlign: 'center' }}>Google Play</a>
          </div>
        </div>
        <div>
          <span className="footer-col-title" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block' }}>Services</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FOOTER_SERVICES.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'none' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="footer-col-title" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block' }}>Company</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FOOTER_COMPANY.map(({ href, label }) => (
              <li key={label}>
                <Link href={href} style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'none' }}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="footer-col-title" style={{ fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block' }}>Connect</span>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {FOOTER_CONNECT.map(({ href, label, external }) => (
              <li key={label}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'none' }}>{label}</a>
                ) : (
                  <Link href={href} style={{ fontSize: '0.85rem', color: 'var(--color-muted)', textDecoration: 'none' }}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div style={{ marginTop: 24, textAlign: 'center', fontSize: 12, color: 'var(--color-muted)', position: 'relative', zIndex: 1 }}>
        {PARTNERS.join(' · ')}
      </div>
      <div className="footer-bottom" style={{ borderTop: '1px solid var(--color-border)', paddingTop: '2rem', marginTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16, position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 12, color: 'var(--color-muted)', margin: 0 }}>© 2026 Wraptors Inc. ™ All Rights Reserved.</p>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <Link href="/privacy-policy" style={{ fontSize: 12, color: 'var(--color-muted)', textDecoration: 'none' }}>Privacy Policy</Link>
          <Link href="/faqs" style={{ fontSize: 12, color: 'var(--color-muted)', textDecoration: 'none' }}>FAQs</Link>
        </div>
      </div>
    </footer>
  );
}

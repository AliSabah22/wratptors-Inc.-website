'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

const FooterCanvas = dynamic(() => import('@/components/FooterCanvas'), { ssr: false });

const FOOTER_SERVICES = [
  { href: '#services', label: 'Vehicle Wrapping' },
  { href: '#services', label: 'Paint Protection Film' },
  { href: '#services', label: 'Window Tinting' },
  { href: '#services', label: 'Auto Detailing' },
  { href: '#services', label: 'Custom Interior' },
  { href: '#services', label: 'Starlight Headliner' },
];

const FOOTER_COMPANY = [
  { href: '#about', label: 'About Wraptors' },
  { href: '#locations', label: 'Locations' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#financing', label: 'Financing' },
  { href: 'https://wraptorsinc.com/franchises/', label: 'Franchises', external: true },
  { href: 'https://wraptorsinc.com/careers/', label: 'Careers', external: true },
];

const FOOTER_CONNECT = [
  { href: 'https://instagram.com/wraptors', label: 'Instagram', external: true },
  { href: '#', label: 'Facebook' },
  { href: '#', label: 'YouTube' },
  { href: '#', label: 'TikTok' },
  { href: 'https://wraptorsstore.com', label: 'Shop', external: true },
  { href: '#contact', label: 'Contact Us' },
];

export default function Footer() {
  return (
    <footer className="footer-with-canvas">
      <FooterCanvas />
      <div className="footer-grid">
        <div>
          <span className="footer-brand-name">WRAPTORS</span>
          <p className="footer-brand-desc">
            The world&apos;s largest and most experienced vehicle wrap shop. 13
            locations across Canada, USA and South Africa. Over 9,000 vehicles
            transformed.
          </p>
          <div className="footer-app-badges">
            <a
              href="https://apps.apple.com/ca/app/wraptors-inc/id1572692992"
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge"
            >
              Download on App Store
            </a>
            <a
              href="https://play.google.com/store/apps/details?id=com.wraptor.wraptorclient"
              target="_blank"
              rel="noopener noreferrer"
              className="app-badge"
            >
              Get it on Google Play
            </a>
          </div>
        </div>
        <div>
          <span className="footer-col-title">Services</span>
          <ul className="footer-links">
            {FOOTER_SERVICES.map(({ href, label }) => (
              <li key={label}>
                <Link href={href}>{label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="footer-col-title">Company</span>
          <ul className="footer-links">
            {FOOTER_COMPANY.map(({ href, label, external }) => (
              <li key={label}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <span className="footer-col-title">Connect</span>
          <ul className="footer-links">
            {FOOTER_CONNECT.map(({ href, label, external }) => (
              <li key={label}>
                {external ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {label}
                  </a>
                ) : (
                  <Link href={href}>{label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer-bottom">
        <p className="footer-copy">© 2026 Wraptors Inc. ™ All Rights Reserved.</p>
        <div className="footer-legal">
          <a href="https://wraptorsinc.com/privacy-policy/" target="_blank" rel="noopener noreferrer">
            Privacy Policy
          </a>
          <a href="https://wraptorsinc.com/faqs/" target="_blank" rel="noopener noreferrer">
            FAQs
          </a>
        </div>
      </div>
    </footer>
  );
}

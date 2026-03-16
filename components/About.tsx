'use client';

import dynamic from 'next/dynamic';

const AboutCanvas = dynamic(() => import('@/components/AboutCanvas'), { ssr: false });

const FEATURES = [
  {
    title: 'Premium Material Partners',
    text: 'Certified with 3M, Avery Dennison, Hexis, Suntek, STEK and more.',
  },
  {
    title: 'Financing Available',
    text: 'We offer financing on all car wrap services — apply online today.',
  },
  {
    title: 'Wraptors Mobile App',
    text: 'Book, track and manage your wrap from your phone — iOS and Android.',
  },
  {
    title: 'Best of Mississauga 2024',
    text: 'Award-winning auto detailing recognized by the community.',
  },
];

export default function About() {
  return (
    <section id="about">
      <div className="reveal">
        <p className="section-label">Who We Are</p>
        <h2 className="section-title">
          ABOUT
          <br />
          WRAPTORS
        </h2>
      </div>
      <div className="about-grid">
        <div className="about-text reveal" style={{ transitionDelay: '0.1s' }}>
          <p>
            Wraptors is the{' '}
            <strong>
              world&apos;s largest and most experienced vehicle wrap shop
            </strong>{' '}
            — rated number one car boutique. With over 10 years of expertise, we
            have wrapped 9,000+ vehicles across 13 global locations in Canada,
            the United States, and South Africa.
          </p>
          <p>
            We specialize in professional vinyl wraps, paint protection film,
            window tinting, auto detailing, custom interiors, and a full range
            of styling services. From cars to boats and trucks — any vehicle,
            any size, any vision.
          </p>
          <p>
            Our team of creative professionals operates with one mission:{' '}
            <strong>transform your vehicle into a legend.</strong>
          </p>
          <div className="about-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="about-feature">
                <div className="about-feature-dot" />
                <div className="about-feature-text">
                  <strong>{f.title}</strong>
                  {f.text}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="about-visual reveal" style={{ transitionDelay: '0.2s', position: 'relative' }}>
          <AboutCanvas />
          <div className="about-visual-overlay" />
          <p className="about-canvas-label">Premium Vinyl Wrap Film</p>
          <div className="about-badge">Est. 10+ Years</div>
        </div>
      </div>
    </section>
  );
}

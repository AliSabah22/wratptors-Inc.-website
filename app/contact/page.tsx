'use client';

/* eslint-disable react/no-unescaped-entities */

import React, { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useReducedMotion } from 'framer-motion';
import FadeUp from '@/src/components/animations/FadeUp';
import FadeIn from '@/src/components/animations/FadeIn';
import StaggerContainer from '@/src/components/animations/StaggerContainer';
import ScrambleText from '@/src/components/ui/ScrambleText';

const blurDataURL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k=';

function SocialIcon({
  kind,
}: {
  kind: 'facebook' | 'instagram' | 'youtube' | 'tiktok';
}) {
  const common = {
    width: 16,
    height: 16,
    viewBox: '0 0 24 24',
    fill: 'currentColor',
    xmlns: 'http://www.w3.org/2000/svg',
    'aria-hidden': true,
  } as const;

  if (kind === 'facebook') {
    return (
      <svg {...common}>
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    );
  }

  if (kind === 'instagram') {
    return (
      <svg {...common}>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M17.5 6.5h.01" />
      </svg>
    );
  }

  if (kind === 'youtube') {
    return (
      <svg {...common}>
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5" />
    </svg>
  );
}

function SocialIconButton({
  href,
  label,
  kind,
}: {
  href: string;
  label: string;
  kind: 'facebook' | 'instagram' | 'youtube' | 'tiktok';
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="social-icon-btn"
      aria-label={label}
    >
      <SocialIcon kind={kind} />
    </a>
  );
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function ContactPage() {
  const prefersReducedMotion = useReducedMotion();

  const vehicleOptions = useMemo(
    () => [
      'Sedan',
      'Coupe',
      'Sports Car',
      'Super Car',
      'Station Wagon',
      'Hatch Back',
      'Convertible',
      'SUV / 4X4',
      'Ute / Pickup Truck',
      'Van',
      'Motorbike',
      'Commercial Vehicle',
      'Other / Various',
    ],
    [],
  );

  const serviceOptions = useMemo(
    () => [
      'Vehicle Wrapping',
      'Auto Detailing',
      'Window Tinting',
      'Paint Protection',
      'Custom Interior',
      'Starlight Headliner',
      'Galaxy Ceiling',
      'Caliper Painting',
      'Wheel Painting',
      'Decals',
      'Racing Stripes',
      'Ceramic Coating',
      'Paint Protection Film (PPF)',
      'Light Tinting',
      'Vehicle Signage',
      'Commercial Signage',
      'Other / Various',
    ],
    [],
  );

  const [status, setStatus] = useState<FormStatus>('idle');
  const [formError, setFormError] = useState<string | null>(null);
  const [focused, setFocused] = useState<string | null>(null);

  const [values, setValues] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicle: '',
    vehicleType: '',
    serviceType: '',
    message: '',
    consent: false,
    _honey: '',
  });

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT;

  const requiredFieldsOk =
    values.fullName.trim() &&
    values.phone.trim() &&
    values.email.trim() &&
    values.vehicleType.trim() &&
    values.serviceType.trim() &&
    values.consent;

  useEffect(() => {
    if (!prefersReducedMotion) return;
    if (status === 'success') return;
  }, [prefersReducedMotion, status]);

  const resetForm = () => {
    setStatus('idle');
    setFormError(null);
    setValues({
      fullName: '',
      phone: '',
      email: '',
      vehicle: '',
      vehicleType: '',
      serviceType: '',
      message: '',
      consent: false,
      _honey: '',
    });
    setFocused(null);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);

    if (!requiredFieldsOk) {
      setFormError('Please complete all required fields.');
      return;
    }

    setStatus('sending');

    try {
      if (endpoint) {
        const fd = new FormData();
        fd.append('fullName', values.fullName);
        fd.append('phone', values.phone);
        fd.append('email', values.email);
        fd.append('vehicle', values.vehicle);
        fd.append('vehicleType', values.vehicleType);
        fd.append('serviceType', values.serviceType);
        fd.append('message', values.message);
        fd.append('consent', values.consent ? '1' : '0');
        fd.append('_honey', values._honey);

        const res = await fetch(endpoint, { method: 'POST', body: fd });
        if (!res.ok) throw new Error('Request failed');
      } else {
        await new Promise((r) => setTimeout(r, 1500));
      }

      setStatus('success');
    } catch {
      setStatus('error');
    }
  };

  const fieldLabelLift = (key: keyof typeof values) =>
    (focused === key || ('' + values[key]).trim().length > 0) && key !== '_honey';

  return (
    <div style={{ background: 'var(--black)', color: 'var(--white)', minHeight: '100vh' }}>
      <style>{`
        .social-icon-btn {
          width: 44px;
          height: 44px;
          border: 1px solid #222222;
          background: transparent;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          color: #666666;
          transition: all 300ms;
          border-radius: 8px;
          text-decoration: none;
        }
        .social-icon-btn:hover {
          border-color: #C8A96E;
          color: #C8A96E;
        }
        .floating-field {
          position: relative;
        }
        .floating-field input,
        .floating-field select,
        .floating-field textarea {
          background: #111111;
          border: none;
          border-bottom: 1px solid #2A2A2A;
          color: #FAFAFA;
          font-family: 'DM Sans', sans-serif;
          font-size: 0.9rem;
          padding: 2.6rem 1.3rem 1rem;
          outline: none;
          width: 100%;
          transition: border-color 300ms;
          border-radius: 0;
        }
        .floating-field select {
          appearance: none;
          cursor: pointer;
          background: #111111;
        }
        .floating-field textarea {
          resize: none;
        }
        .floating-field input:focus,
        .floating-field select:focus,
        .floating-field textarea:focus {
          border-bottom-color: #C8A96E;
        }
        .floating-label {
          position: absolute;
          top: 1.4rem;
          left: 1.3rem;
          font-size: 9px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #666666;
          pointer-events: none;
          transition: all 300ms;
          font-family: 'DM Sans', sans-serif;
        }
        .floating-label.lift {
          top: 0.65rem;
          font-size: 7.5px;
          color: #C8A96E;
        }
        .consent-box {
          width: 16px;
          height: 16px;
          border: 1px solid #C8A96E;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 4px;
          flex-shrink: 0;
          background: transparent;
        }
        .consent-box.checked {
          background: #C8A96E;
        }
        .consent-check {
          width: 10px;
          height: 10px;
          background: #ffffff;
          clip-path: polygon(14% 43%, 0 53%, 45% 100%, 100% 14%, 84% 0%, 45% 67%);
          opacity: 0;
          transition: opacity 150ms ease;
        }
        .consent-box.checked .consent-check {
          opacity: 1;
        }
        .contact-feature-photo {
          border: 1px solid #222222;
          transition: border-color 300ms;
          overflow: hidden;
          border-radius: 0;
        }
        .contact-feature-photo:hover {
          border-color: #C8A96E;
        }
        @media (max-width: 768px) {
          .contact-feature-photo { display: none; }
        }
        .social-row {
          display: flex;
          justify-content: flex-start;
          gap: 14px;
          flex-wrap: wrap;
        }
        .partner-row {
          display: flex;
          justify-content: center;
          gap: 48px;
          flex-wrap: wrap;
        }
        .checkmark-path {
          stroke-dasharray: 80;
          stroke-dashoffset: 80;
          animation: checkdraw 800ms ease forwards;
        }
        @keyframes checkdraw {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>

      {/* PAGE HERO */}
      <section style={{ padding: '7rem 6% 0', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 10,
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'var(--gold)',
              marginBottom: 14,
            }}
          >
            Home → Contact
          </div>

          <div style={{ fontSize: 10, letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: "'DM Sans', sans-serif" }}>
            <ScrambleText>GET IN TOUCH</ScrambleText>
          </div>

          <FadeUp delay={0.1}>
            <h1 style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 'clamp(4rem, 7vw, 8rem)', lineHeight: 0.88, marginTop: 12 }}>
              CONTACT
            </h1>
          </FadeUp>
        </div>

        {/* SOCIAL ROW */}
        <div style={{ maxWidth: 1400, margin: '0 auto', paddingBottom: 38 }}>
          <div style={{ marginTop: 26 }}>
            <StaggerContainer staggerDelay={0.06} className="social-row">
              <SocialIconButton
                href="https://www.facebook.com/wraptors"
                label="Facebook"
                kind="facebook"
              />
              <SocialIconButton
                href="https://www.instagram.com/wraptors"
                label="Instagram"
                kind="instagram"
              />
              <SocialIconButton
                href="https://www.youtube.com/@wraptors"
                label="YouTube"
                kind="youtube"
              />
              <SocialIconButton
                href="https://www.tiktok.com/@wraptors"
                label="TikTok"
                kind="tiktok"
              />
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* MAIN TWO-COLUMN LAYOUT */}
      <section style={{ padding: '5rem 6%', maxWidth: 1400, margin: '0 auto' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.4fr',
            gap: '5rem',
            alignItems: 'start',
          }}
          className="contact-grid"
        >
          {/* Right column first in DOM to appear first on mobile */}
          <div className="contact-right-col" style={{ gridColumn: 2 }}>
            <FadeUp>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: 28, color: 'var(--white)' }}>
                CONTACT WRAPTORS
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div style={{ marginTop: 10, fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', fontSize: 15, lineHeight: 1.6 }}>
                Fill in the form and we'll be in touch within 24 hours.
              </div>
            </FadeUp>
            <div style={{ marginTop: 18 }}>
              <FadeIn delay={0.2}>
                {status === 'success' ? (
                  <div
                    style={{
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      padding: 18,
                      borderRadius: 10,
                      position: 'relative',
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 14 }}>
                      <svg width="72" height="72" viewBox="0 0 72 72" aria-hidden>
                        <circle cx="36" cy="36" r="32" stroke="#C8A96E" strokeWidth="2" fill="none" opacity="0.15" />
                        <path
                          className="checkmark-path"
                          d="M18 38 L30 50 L54 24"
                          stroke="#C8A96E"
                          strokeWidth="4"
                          fill="none"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          style={prefersReducedMotion ? { animation: 'none', strokeDashoffset: 0 } : undefined}
                        />
                      </svg>
                    </div>
                    <div style={{ textAlign: 'center' }}>
                      <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--gold)', fontSize: 32, lineHeight: 1 }}>
                        MESSAGE SENT!
                      </div>
                      <div style={{ marginTop: 10, fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', textAlign: 'center', lineHeight: 1.8 }}>
                        Thank you! We'll be in touch within 24 hours.
                      </div>
                      <button
                        type="button"
                        onClick={resetForm}
                        style={{
                          marginTop: 14,
                          background: 'transparent',
                          border: 'none',
                          color: 'var(--gold)',
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 14,
                          cursor: 'pointer',
                        }}
                      >
                        Send another message →
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} style={{ width: '100%', position: 'relative' }}>
                    <input
                      type="text"
                      name="_honey"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      autoComplete="off"
                      value={values._honey}
                      onChange={(ev) => setValues((v) => ({ ...v, _honey: ev.target.value }))}
                    />

                    {formError && (
                      <div style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif", marginBottom: 12 }}>
                        {formError}
                      </div>
                    )}

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#222' }}>
                      {/* Row 1 */}
                      <div className="floating-field">
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={values.fullName}
                          onFocus={() => setFocused('fullName')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, fullName: ev.target.value }))}
                          placeholder=" "
                        />
                        <div className={`floating-label ${fieldLabelLift('fullName') ? 'lift' : ''}`}>Full Name</div>
                      </div>
                      <div className="floating-field">
                        <input
                          type="tel"
                          name="phone"
                          required
                          value={values.phone}
                          onFocus={() => setFocused('phone')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, phone: ev.target.value }))}
                          placeholder=" "
                        />
                        <div className={`floating-label ${fieldLabelLift('phone') ? 'lift' : ''}`}>Mobile Number</div>
                      </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#222', marginTop: 1 }}>
                      {/* Row 2 */}
                      <div className="floating-field">
                        <input
                          type="email"
                          name="email"
                          required
                          value={values.email}
                          onFocus={() => setFocused('email')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, email: ev.target.value }))}
                          placeholder=" "
                        />
                        <div className={`floating-label ${fieldLabelLift('email') ? 'lift' : ''}`}>Email Address</div>
                      </div>
                      <div className="floating-field">
                        <input
                          type="text"
                          name="vehicle"
                          value={values.vehicle}
                          onFocus={() => setFocused('vehicle')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, vehicle: ev.target.value }))}
                          placeholder=" "
                        />
                        <div className={`floating-label ${fieldLabelLift('vehicle') ? 'lift' : ''}`}>Vehicle Make & Model</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 1 }}>
                      {/* Field 5 */}
                      <div className="floating-field">
                        <select
                          name="vehicleType"
                          required
                          value={values.vehicleType}
                          onFocus={() => setFocused('vehicleType')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, vehicleType: ev.target.value }))}
                        >
                          <option value="" disabled>
                            {' '}
                          </option>
                          {vehicleOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className={`floating-label ${fieldLabelLift('vehicleType') ? 'lift' : ''}`}>Vehicle Type</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 1 }}>
                      {/* Field 6 */}
                      <div className="floating-field">
                        <select
                          name="serviceType"
                          required
                          value={values.serviceType}
                          onFocus={() => setFocused('serviceType')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, serviceType: ev.target.value }))}
                        >
                          <option value="" disabled>
                            {' '}
                          </option>
                          {serviceOptions.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                        <div className={`floating-label ${fieldLabelLift('serviceType') ? 'lift' : ''}`}>Service Type</div>
                      </div>
                    </div>

                    <div style={{ marginTop: 1 }}>
                      {/* Field 7 */}
                      <div className="floating-field">
                        <textarea
                          name="message"
                          rows={5}
                          value={values.message}
                          onFocus={() => setFocused('message')}
                          onBlur={() => setFocused(null)}
                          onChange={(ev) => setValues((v) => ({ ...v, message: ev.target.value }))}
                          placeholder=" "
                        />
                        <div className={`floating-label ${fieldLabelLift('message') ? 'lift' : ''}`}>Additional Details / Requests</div>
                      </div>
                    </div>

                    {/* Field 8 checkbox */}
                    <div style={{ marginTop: 14 }}>
                      <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', lineHeight: 1.8 }}>
                        <input
                          id="consent"
                          type="checkbox"
                          required
                          name="consent"
                          checked={values.consent}
                          onChange={(ev) => setValues((v) => ({ ...v, consent: ev.target.checked }))}
                          style={{ display: 'none' }}
                        />
                        <span className={`consent-box ${values.consent ? 'checked' : ''}`} aria-hidden>
                          <span className="consent-check" />
                        </span>
                        <span>
                          I agree to{' '}
                          <a href="/privacy-policy" className="text-gold hover:underline" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                            privacy policy
                          </a>{' '}
                          provided by the company. By providing my phone number, I agree to receive text messages from the business.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      disabled={status === 'sending'}
                      style={{
                        marginTop: 1,
                        width: '100%',
                        background: '#C8A96E',
                        color: '#000000',
                        border: 'none',
                        padding: '1.3rem',
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 10,
                        letterSpacing: '0.22em',
                        textTransform: 'uppercase',
                        fontWeight: 500,
                        cursor: 'pointer',
                        transition: 'background 300ms',
                      }}
                      onMouseEnter={(e) => {
                        if (status === 'sending') return;
                        (e.currentTarget as HTMLButtonElement).style.background = '#FAFAFA';
                      }}
                      onMouseLeave={(e) => {
                        if (status === 'sending') return;
                        (e.currentTarget as HTMLButtonElement).style.background = '#C8A96E';
                      }}
                    >
                      {status === 'sending' ? 'SENDING...' : 'SEND MY REQUEST \u2192'}
                    </button>

                    {status === 'error' && (
                      <div style={{ color: '#ff6b6b', fontFamily: "'DM Sans', sans-serif", marginTop: 12 }}>
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </form>
                )}
              </FadeIn>
            </div>
          </div>

          {/* Left column */}
          <div className="contact-left-col" style={{ gridColumn: 1 }}>
            <FadeUp>
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.8rem', lineHeight: 1.1 }}>
                LET'S TRANSFORM YOUR VEHICLE
              </div>
            </FadeUp>

            <div style={{ marginTop: 22 }}>
              {[
                {
                  label: 'ADDRESS',
                  value: '1081 Meyerside Dr Unit 1-2,\nMississauga, ON L5T 1M4, Canada',
                  href: 'https://goo.gl/maps/rZEQBMhtQV3K1xxY6',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5A2.5 2.5 0 1 1 12 7a2.5 2.5 0 0 1 0 4.5z" />
                    </svg>
                  ),
                },
                {
                  label: 'PHONE',
                  value: '647.620.WRAP (9727)',
                  href: 'tel:+16476209727',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                    </svg>
                  ),
                },
                {
                  label: 'EMAIL',
                  value: 'wrap@torontowraptors.com',
                  href: 'mailto:wrap@torontowraptors.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                    </svg>
                  ),
                },
                {
                  label: 'COMMERCIAL EMAIL',
                  value: 'commercial@torontowraptors.com',
                  href: 'mailto:commercial@torontowraptors.com',
                  sub: 'For all your commercial needs',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M10 4h4l2 3h4v13H4V7h4l2-3zm2 2h-0.01L11 5.5 10 6H14l-1-0.5zM7 12h10v2H7v-2z" />
                    </svg>
                  ),
                },
                {
                  label: 'WEBSITE',
                  value: 'www.wraptorsinc.com',
                  href: 'https://www.wraptorsinc.com',
                  icon: (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.33 9h-2.16a13.74 13.74 0 0 0-1.1-6.05A8.03 8.03 0 0 1 17.33 11zM12 5.12c.53 0 1.4 1.93 1.86 5.88H10.14C10.6 7.05 11.47 5.12 12 5.12zM6.67 13H8.83c.29 2.1.83 4.04 1.5 5.4A8.05 8.05 0 0 1 6.67 13zm1.1-2H6.67a8.03 8.03 0 0 1 3.66-6.05A13.74 13.74 0 0 0 7.77 11zM14.5 18.4c.67-1.36 1.2-3.3 1.5-5.4h2.16a8.05 8.05 0 0 1-3.66 5.4z" />
                    </svg>
                  ),
                },
              ].map((b, idx) => (
                <FadeUp key={b.label} delay={idx * 0.08}>
                  <div
                    style={{
                      paddingBottom: '1.5rem',
                      borderBottom: idx === 4 ? 'none' : '1px solid #222222',
                      marginBottom: idx === 4 ? 0 : '1.5rem',
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 10,
                    }}
                  >
                    <div style={{ marginTop: 3, color: '#C8A96E' }}>{b.icon}</div>
                    <div>
                      <div
                        style={{
                          fontFamily: "'DM Sans', sans-serif",
                          fontSize: 9,
                          letterSpacing: '0.28em',
                          textTransform: 'uppercase',
                          color: 'var(--gold)',
                          marginBottom: 6,
                        }}
                      >
                        {b.label}
                      </div>
                      {b.label === 'ADDRESS' ? (
                        <a
                          href={b.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{
                            color: '#666666',
                            textDecoration: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-line',
                            display: 'block',
                          }}
                        >
                          {b.value}
                        </a>
                      ) : b.sub ? (
                        <div style={{ color: '#666666', fontFamily: "'DM Sans', sans-serif", fontSize: '0.9rem', lineHeight: 1.7 }}>
                          <a href={b.href} style={{ color: '#666666', textDecoration: 'none' }} target="_self">
                            {b.value}
                          </a>
                          <div style={{ marginTop: 6, color: '#666666', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', lineHeight: 1.6 }}>
                            {b.sub}
                          </div>
                        </div>
                      ) : (
                        <a
                          href={b.href}
                          target={b.href.startsWith('http') ? '_blank' : undefined}
                          rel={b.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          style={{
                            color: '#666666',
                            textDecoration: 'none',
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: '0.9rem',
                            lineHeight: 1.7,
                            whiteSpace: 'pre-line',
                            display: 'block',
                          }}
                        >
                          {b.value}
                        </a>
                      )}
                    </div>
                  </div>
                </FadeUp>
              ))}

              {/* Social links row */}
              <div style={{ marginTop: '2rem', display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <SocialIconButton href="https://www.facebook.com/wraptors" label="Facebook" kind="facebook" />
                <SocialIconButton href="https://www.instagram.com/wraptors" label="Instagram" kind="instagram" />
                <SocialIconButton href="https://www.youtube.com/@wraptors" label="YouTube" kind="youtube" />
                <SocialIconButton href="https://www.tiktok.com/@wraptors" label="TikTok" kind="tiktok" />
              </div>

              <div style={{ marginTop: 26 }} className="contact-feature-photo">
                <Image
                  src="https://www.wraptorsinc.com/wp-content/uploads/2023/05/quote-pic-contact-640x800.jpg"
                  alt="Wraptors Inc"
                  width={640}
                  height={800}
                  placeholder="blur"
                  blurDataURL={blurDataURL}
                  unoptimized={false}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PARTNER LOGOS */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', textAlign: 'center' }}>
          <FadeUp>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 10,
                letterSpacing: '0.35em',
                textTransform: 'uppercase',
                color: 'var(--gold)',
              }}
            >
              CERTIFIED MATERIAL PARTNERS
            </div>
          </FadeUp>

          <div style={{ marginTop: 26 }}>
            <StaggerContainer staggerDelay={0.06} className="partner-row">
              {[
                { name: '3M', href: 'https://www.3m.com' },
                { name: 'Avery Dennison', href: 'https://www.averydennison.com' },
                { name: 'Hexis', href: 'https://www.hexis-graphics.com/us' },
                { name: 'Suntek', href: 'https://suntekfilms.com' },
                { name: 'STEK', href: 'https://www.stek-usa.com' },
                { name: 'Wraptors Mafia', href: 'https://wraptorsmafia.com', isImage: true },
              ].map((p) =>
                p.isImage ? (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#666', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    <Image
                      src="https://www.wraptorsinc.com/wp-content/uploads/2023/03/partner-mafia.jpg"
                      alt="Wraptors Mafia"
                      width={160}
                      height={40}
                      placeholder="blur"
                      blurDataURL={blurDataURL}
                      unoptimized={false}
                      style={{ height: 40, width: 'auto' }}
                    />
                  </a>
                ) : (
                  <a
                    key={p.name}
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: '#666', fontSize: 13, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                  >
                    {p.name}
                  </a>
                ),
              )}
            </StaggerContainer>
          </div>
        </div>
      </section>

      {/* MAILING LIST SIGNUP */}
      <section style={{ background: '#0A0A0A', padding: '5rem 8%' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <FadeUp>
            <div
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                color: 'var(--gold)',
                fontSize: 'clamp(2rem, 3vw, 2.5rem)',
                letterSpacing: '0.04em',
              }}
            >
              JOIN OUR MAILING LIST
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div
              style={{
                fontFamily: "'DM Sans', sans-serif",
                color: 'var(--muted)',
                marginTop: 10,
                fontSize: 14,
              }}
            >
              Stay up to date with our Latest Releases and Promotions.
            </div>
          </FadeUp>
          <form
            style={{ marginTop: 22, display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}
            method="post"
          >
            <input type="text" name="_honey" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />
            <input
              type="email"
              name="email"
              placeholder="Your email address"
              required
              style={{
                background: 'transparent',
                border: '1px solid var(--border)',
                color: 'var(--white)',
                padding: '14px 16px',
                width: 320,
                outline: 'none',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
              }}
            />
            <button
              type="submit"
              style={{
                background: '#C8A96E',
                color: '#000000',
                border: 'none',
                padding: '14px 24px',
                cursor: 'pointer',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 11,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
              }}
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}



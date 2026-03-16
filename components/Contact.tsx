'use client';

import { useState, useRef, FormEvent } from 'react';
import gsap from 'gsap';

const SERVICE_OPTIONS = [
  'Vehicle Wrapping',
  'Paint Protection Film (PPF)',
  'Window Tinting',
  'Auto Detailing',
  'Custom Interior',
  'Starlight Headliner',
  'Racing Stripes',
  'Galaxy Ceilings',
  'Decals',
  'Caliper Painting',
  'Wheel Painting',
  'Multiple Services',
];

export default function Contact() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'sent' | 'reset'>('idle');
  const envelopeRef = useRef<HTMLSpanElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitStatus('sent');
    if (envelopeRef.current) {
      gsap.to(envelopeRef.current, {
        y: -80,
        opacity: 0,
        scale: 0.5,
        duration: 0.8,
        ease: 'power2.in',
      });
    }
    setTimeout(() => {
      setSubmitStatus('reset');
      (e.target as HTMLFormElement).reset();
      if (envelopeRef.current) {
        gsap.set(envelopeRef.current, { y: 0, opacity: 0.6, scale: 1 });
      }
    }, 3000);
  }

  return (
    <section id="contact">
      <div className="reveal">
        <p className="section-label">Book Your Transformation</p>
        <h2 className="section-title">GET A QUOTE</h2>
      </div>
      <div className="contact-grid">
        <div className="reveal" style={{ transitionDelay: '0.1s' }}>
          <p className="contact-info-title">LET&apos;S TRANSFORM YOUR VEHICLE</p>
          <div className="contact-detail">
            <span className="contact-detail-label">Head Office</span>
            <div className="contact-detail-value">
              1081 Meyerside Dr Unit 1-2
              <br />
              Mississauga, ON L5T 1M4, Canada
            </div>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-label">Phone</span>
            <div className="contact-detail-value">
              <a href="tel:+16476209727">647.620.WRAP (9727)</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-label">Email</span>
            <div className="contact-detail-value">
              <a href="mailto:wrap@torontowraptors.com">wrap@torontowraptors.com</a>
            </div>
          </div>
          <div className="contact-detail">
            <span className="contact-detail-label">Shop</span>
            <div className="contact-detail-value">
              <a href="https://wraptorsstore.com" target="_blank" rel="noopener noreferrer">
                wraptorsstore.com
              </a>
            </div>
          </div>
          <div className="contact-socials">
            <a href="https://instagram.com/wraptors" target="_blank" rel="noopener noreferrer" className="social-link">
              Instagram
            </a>
            <a href="#" className="social-link">Facebook</a>
            <a href="#" className="social-link">YouTube</a>
            <a href="#" className="social-link">TikTok</a>
          </div>
        </div>
        <div className="reveal" style={{ transitionDelay: '0.2s' }}>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <input type="text" id="name" name="name" placeholder=" " required />
                <label htmlFor="name">Full Name</label>
              </div>
              <div className="form-group">
                <input type="email" id="email" name="email" placeholder=" " required />
                <label htmlFor="email">Email Address</label>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <input type="tel" id="phone" name="phone" placeholder=" " />
                <label htmlFor="phone">Phone Number</label>
              </div>
              <div className="form-group">
                <input type="text" id="vehicle" name="vehicle" placeholder=" " required />
                <label htmlFor="vehicle">Vehicle Make & Model</label>
              </div>
            </div>
            <div className="form-group">
              <select id="service" name="service" required>
                <option value="" disabled selected></option>
                {SERVICE_OPTIONS.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
              <label htmlFor="service">Service Required</label>
            </div>
            <div className="form-group">
              <textarea id="message" name="message" placeholder=" " />
              <label htmlFor="message">Tell Us About Your Vision</label>
            </div>
            <div className="form-submit-wrap">
              <span
                ref={envelopeRef}
                className="envelope"
                aria-hidden
              >
                ✉
              </span>
              <button
                ref={submitRef}
                type="submit"
                className="form-submit"
                disabled={submitStatus === 'sent'}
                style={
                  submitStatus === 'sent'
                    ? { background: '#444', color: 'var(--muted)' }
                    : undefined
                }
              >
                {submitStatus === 'sent' ? 'Request Sent ✓' : 'Send My Request →'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* eslint-disable react/no-unescaped-entities */
'use client';

import { useMemo, useState } from 'react';

type QuoteFormProps = {
  formId?: string;
};

const VEHICLE_TYPES = [
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
];

const SERVICE_TYPES = [
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
];

export default function QuoteForm({ formId = 'quote-form' }: QuoteFormProps) {
  const [status, setStatus] = useState<'idle' | 'success'>('idle');

  const privacyHref = '/privacy-policy';

  const formTitle = useMemo(() => 'Quote Request', []);

  if (status === 'success') {
    return (
      <div
        id={formId}
        aria-live="polite"
        style={{
          border: '1px solid var(--border)',
          background: 'var(--surface)',
          padding: 18,
          borderRadius: 10,
          fontFamily: "'DM Sans', sans-serif",
          color: 'var(--white)',
        }}
      >
        Thank you! We'll be in touch shortly.
      </div>
    );
  }

  return (
    <form
      id={formId}
      aria-label={formTitle}
      onSubmit={(e) => {
        e.preventDefault();
        setStatus('success');
      }}
      style={{
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        padding: 18,
        borderRadius: 10,
        fontFamily: "'DM Sans', sans-serif",
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Full Name
            <input required type="text" name="full_name" style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }} />
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Mobile Number
            <input type="tel" name="mobile" style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }} />
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Email Address
            <input required type="email" name="email" style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }} />
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Vehicle Type
            <select required name="vehicle_type" style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }}>
              <option value="" />
              {VEHICLE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Service Type
            <select required name="service_type" style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }}>
              <option value="" />
              {SERVICE_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6, color: 'var(--muted)' }}>
            Additional Details / Requests
            <textarea name="details" rows={4} style={{ padding: 12, background: 'transparent', border: '1px solid var(--border)', color: 'var(--white)' }} />
          </label>
        </div>

        <div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, color: 'var(--muted)', lineHeight: 1.5 }}>
            <input required type="checkbox" name="consent" style={{ marginTop: 4 }} />
            <span>
              I agree to{' '}
              <a href={privacyHref} style={{ color: 'var(--gold)', textDecoration: 'none' }}>
                privacy policy
              </a>{' '}
              provided by the company.
              <br />
              By providing my phone number, I agree to receive text
              <br />
              messages from the business.
            </span>
          </label>
        </div>

        <button
          type="submit"
          style={{
            marginTop: 6,
            width: '100%',
            background: 'var(--gold)',
            color: 'var(--black)',
            border: 'none',
            padding: '14px 16px',
            fontFamily: "'DM Sans', sans-serif",
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            fontSize: 11,
            fontWeight: 500,
            cursor: 'pointer',
          }}
        >
          SEND MY REQUEST
        </button>
      </div>
    </form>
  );
}


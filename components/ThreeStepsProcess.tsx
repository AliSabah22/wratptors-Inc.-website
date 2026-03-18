import React from 'react';

type Step = {
  title: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    title: 'Contact Our Team',
    desc: 'Fill in our form and let us know what you need.',
  },
  {
    title: "We'll Book you In",
    desc: 'Our team will call you to arrange an in-person\nfixed price offer.',
  },
  {
    title: 'Pay When Completed',
    desc: 'You only pay once the job is completed and\nyou\'re satisfied.',
  },
];

export default function ThreeStepsProcess() {
  return (
    <section style={{ background: '#0A0A0A', borderTop: '1px solid #222222', borderBottom: '1px solid #222222', padding: '5rem 8%' }}>
      <div style={{ maxWidth: 1400, margin: '0 auto' }}>
        <div style={{ marginBottom: 26 }}>
          <div
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              color: 'var(--gold)',
              fontSize: 44,
              letterSpacing: '0.04em',
              lineHeight: 1,
            }}
          >
            WE TAKE THE STRESS AWAY
          </div>
          <div
            style={{
              marginTop: 10,
              fontFamily: "'DM Sans', sans-serif",
              color: 'var(--white)',
              fontSize: 18,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            3 STEPS TO A NEW RIDE
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18 }}>
          {STEPS.map((s, idx) => (
            <div
              key={s.title}
              style={{
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                padding: 22,
                borderRadius: 12,
              }}
            >
              <div style={{ fontFamily: "'Bebas Neue', sans-serif", color: 'var(--gold)', fontSize: 44 }}>{String(idx + 1).padStart(2, '0')}</div>
              <div style={{ marginTop: 10, fontFamily: "'Bebas Neue', sans-serif", color: 'var(--white)', fontSize: 22 }}>{s.title}</div>
              <div style={{ marginTop: 8, fontFamily: "'DM Sans', sans-serif", color: 'var(--muted)', whiteSpace: 'pre-line', lineHeight: 2.0, fontSize: 14 }}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


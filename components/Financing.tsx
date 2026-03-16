'use client';

import dynamic from 'next/dynamic';

const CardCanvas = dynamic(() => import('@/components/CardCanvas'), { ssr: false });

const FINANCING_URL =
  'https://applicant.myfrontline.app/applications/20230625-YAOA/pre-submission/applicant/personal-details';

export default function Financing() {
  return (
    <section id="financing" className="financing-section">
      <div className="financing-bg" />
      <div className="financing-inner reveal">
        <div style={{ position: 'relative' }}>
          <p className="section-label" style={{ textAlign: 'center' }}>
            No Limits
          </p>
          <h2 className="financing-title">WE DO FINANCING</h2>
          <p className="financing-sub">We now offer financing on all your car wraps</p>
          <a
            href={FINANCING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
          >
            Apply Now
          </a>
        </div>
        <div className="financing-canvas-wrap">
          <CardCanvas />
          <p className="card-canvas-label">Flexible financing available</p>
        </div>
      </div>
    </section>
  );
}

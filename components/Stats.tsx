'use client';

import dynamic from 'next/dynamic';

const TrophyCanvas = dynamic(() => import('@/components/TrophyCanvas'), { ssr: false });

const STATS = [
  { target: 9000, suffix: '+', label: 'Vehicles Wrapped', delay: '0s' },
  { target: 10, suffix: '+', label: 'Years Experience', delay: '0.1s' },
  { target: 13, suffix: '+', label: 'Global Locations', delay: '0.2s' },
  { target: 556, suffix: '+', label: 'Five Star Reviews', delay: '0.3s' },
];

export default function Stats() {
  return (
    <section id="stats" className="stats-section">
      <div id="trophy-wrap" className="trophy-canvas-wrap">
        <TrophyCanvas />
      </div>
      <div className="stats-grid">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="stat-item reveal"
            style={{ transitionDelay: stat.delay }}
          >
            <span
              className="stat-number"
              data-target={stat.target}
              data-suffix={stat.suffix}
            >
              0
            </span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

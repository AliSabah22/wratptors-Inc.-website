'use client';

import dynamic from 'next/dynamic';

const BurstCanvas = dynamic(() => import('@/components/BurstCanvas'), { ssr: false });

const REVIEWS = [
  {
    text: 'Top tier. Nothing short of perfection. They deserve a ten star on a five star review. They have taken incredible time and care with a full colour change on my X4.',
    author: 'Jeremy K.',
  },
  {
    text: 'Absolutely top-tier work. The wrap on my Lamborghini Huracán Tecnica came out flawless — attention to detail was perfect and the car looks insane. Straight perfection from start to finish.',
    author: 'Vithurshan A.',
  },
  {
    text: "Chose Wraptors for the wrap on my new MDX. They far exceeded my expectations. I'm so glad I trusted their suggestions. They know their stuff. Phenomenal experience.",
    author: 'Frank L.',
  },
  {
    text: 'Wraptors did an amazing job on my G-Wagon. The quality, attention to detail, and the finish are next level. Always get compliments. Huge thank you to the whole team.',
    author: 'Parmjit R.',
  },
];

export default function Reviews() {
  return (
    <section id="reviews">
      <BurstCanvas />
      <div className="reviews-header reveal">
        <div>
          <p className="section-label">Client Approved</p>
          <h2 className="section-title">
            WHAT THEY
            <br />
            SAY
          </h2>
        </div>
        <div className="reviews-rating">
          <span className="reviews-rating-score">556+</span>
          <div className="stars">★★★★★</div>
          <span className="reviews-rating-label">Five Star Reviews — Excellent</span>
        </div>
      </div>
      <div className="reviews-grid reveal" style={{ transitionDelay: '0.15s' }}>
        {REVIEWS.map((r, i) => (
          <div key={i} className="review-card" data-burst-card>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">{r.text}</p>
            <div className="review-author">{r.author}</div>
            <div className="review-count">Verified Google Review</div>
          </div>
        ))}
      </div>
    </section>
  );
}

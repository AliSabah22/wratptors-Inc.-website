'use client';

import { useState, useEffect } from 'react';

const LOADER_DURATION_MS = 1500;

type LoaderProps = {
  onFinish: () => void;
};

export default function Loader({ onFinish }: LoaderProps) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const bar = document.getElementById('loaderBar');
    const text = document.getElementById('loaderText');
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / LOADER_DURATION_MS, 1);
      if (bar) bar.style.width = `${Math.round(progress * 100)}%`;
      if (text) text.textContent = progress >= 1 ? 'Ready' : 'Loading experience';
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setHidden(true);
          onFinish();
        }, 500);
      }
    };
    requestAnimationFrame(tick);
  }, [onFinish]);

  return (
    <div
      className={`loader ${hidden ? 'hidden' : ''}`}
      id="loader"
      aria-hidden={hidden}
    >
      <div className="loader-logo">WRAPTORS</div>
      <div className="loader-bar-wrap">
        <div
          className="loader-bar"
          id="loaderBar"
          style={{ width: '0%' }}
        />
      </div>
      <div className="loader-text" id="loaderText">
        Loading experience
      </div>
    </div>
  );
}

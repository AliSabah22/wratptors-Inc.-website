'use client';

import { useEffect, useRef } from 'react';

function countUp(el: HTMLElement) {
  const target = parseInt(el.dataset.target ?? '0', 10);
  const suffix = el.dataset.suffix ?? '';
  const duration = 2000;
  const start = performance.now();
  function update(now: number) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target).toLocaleString() + suffix;
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

export function useReveal(enabled: boolean) {
  const statsTriggered = useRef(false);

  useEffect(() => {
    if (!enabled) return;
    const reveals = document.querySelectorAll('.reveal');
    const stats = document.querySelectorAll('.stat-number');
    const statsSection = document.getElementById('stats');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !statsTriggered.current) {
            statsTriggered.current = true;
            stats.forEach((el) => countUp(el as HTMLElement));
            statsObserver.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    reveals.forEach((el) => observer.observe(el));
    if (statsSection) statsObserver.observe(statsSection);

    return () => {
      observer.disconnect();
      statsObserver.disconnect();
    };
  }, [enabled]);
}

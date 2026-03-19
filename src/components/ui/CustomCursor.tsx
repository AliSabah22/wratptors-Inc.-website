'use client';

import { useEffect, useRef, useState } from 'react';

const GOLD = '#C8A96E';
const GOLD_RGBA = 'rgba(200, 169, 110, 0.5)';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<'default' | 'link' | 'image' | 'canvas'>('default');
  const [isPressed, setIsPressed] = useState(false);
  const mx = useRef(0);
  const my = useRef(0);
  const rx = useRef(0);
  const ry = useRef(0);

  useEffect(() => {
    document.body.classList.add('custom-cursor-active');
    return () => document.body.classList.remove('custom-cursor-active');
  }, []);

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring || typeof window === 'undefined') return;

    const onMove = (e: MouseEvent) => {
      mx.current = e.clientX;
      my.current = e.clientY;
    };

    let raf = 0;
    const animate = () => {
      rx.current += (mx.current - rx.current) * 0.12;
      ry.current += (my.current - ry.current) * 0.12;
      const dx = mx.current - 4;
      const dy = my.current - 4;
      const rxx = rx.current - 20;
      const ryy = ry.current - 20;
      dot.style.transform = `translate(${dx}px, ${dy}px) scale(${isPressed ? 0.6 : 1})`;
      const ringScale = hoverState === 'link' ? 2.5 : 1;
      ring.style.transform = `translate(${rxx}px, ${ryy}px) scale(${ringScale})`;
      ring.style.borderColor = hoverState === 'link' ? GOLD : GOLD_RGBA;
      dot.style.opacity = hoverState === 'link' ? '0' : '1';
      raf = requestAnimationFrame(animate);
    };

    const onDown = () => setIsPressed(true);
    const onUp = () => setIsPressed(false);
    const onEnterLinkOrButton = () => setHoverState('link');
    const onLeaveLinkOrButton = () => setHoverState('default');
    const onEnterImage = () => setHoverState('image');
    const onLeaveImage = () => setHoverState('default');
    const onEnterCanvas = () => setHoverState('canvas');
    const onLeaveCanvas = () => setHoverState('default');

    document.addEventListener('mousemove', onMove);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    document.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('mouseenter', onEnterLinkOrButton);
      el.addEventListener('mouseleave', onLeaveLinkOrButton);
    });
    document.querySelectorAll('img').forEach((el) => {
      el.addEventListener('mouseenter', onEnterImage);
      el.addEventListener('mouseleave', onLeaveImage);
    });
    document.querySelectorAll('[data-cursor-canvas]').forEach((el) => {
      el.addEventListener('mouseenter', onEnterCanvas);
      el.addEventListener('mouseleave', onLeaveCanvas);
    });

    raf = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.querySelectorAll('a, button').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterLinkOrButton);
        el.removeEventListener('mouseleave', onLeaveLinkOrButton);
      });
      document.querySelectorAll('img').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterImage);
        el.removeEventListener('mouseleave', onLeaveImage);
      });
      document.querySelectorAll('[data-cursor-canvas]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnterCanvas);
        el.removeEventListener('mouseleave', onLeaveCanvas);
      });
    };
  }, [hoverState, isPressed]);

  return (
    <div className="custom-cursor-wrapper" aria-hidden>
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{
          width: 8,
          height: 8,
          background: GOLD,
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99999,
          left: 0,
          top: 0,
          transition: hoverState === 'link' ? 'opacity 250ms' : 'none',
        }}
      />
      <div
        ref={ringRef}
        className="custom-cursor-ring"
        style={{
          width: 40,
          height: 40,
          border: `1px solid ${GOLD_RGBA}`,
          borderRadius: '50%',
          position: 'fixed',
          pointerEvents: 'none',
          zIndex: 99998,
          left: 0,
          top: 0,
          transition: 'border-color 250ms',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 8,
          letterSpacing: '0.2em',
          color: GOLD,
        }}
      >
        {hoverState === 'image' && 'VIEW'}
        {hoverState === 'canvas' && 'DRAG'}
      </div>
    </div>
  );
}

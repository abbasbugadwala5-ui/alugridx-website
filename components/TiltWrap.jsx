'use client';
import { useRef } from 'react';

// Wrap any child to give it a 3D mouse-tilt on hover.
// Sets --rx / --ry CSS vars on the wrapper; pair with the `.tilt-card` class.
// `max` is the maximum rotation in degrees (default 8).
export default function TiltWrap({ children, max = 8, className = '' }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;  // 0..1
    const y = (e.clientY - rect.top) / rect.height;  // 0..1
    const rx = (x - 0.5) * (max * 2);  // left  → -max, right → +max
    const ry = (0.5 - y) * (max * 2);  // top   → +max, bottom → -max
    el.style.setProperty('--rx', `${rx}deg`);
    el.style.setProperty('--ry', `${ry}deg`);
  };

  const reset = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty('--rx', '0deg');
    el.style.setProperty('--ry', '0deg');
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      className={`tilt-card ${className}`}
    >
      {children}
    </div>
  );
}

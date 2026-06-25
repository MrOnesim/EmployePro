import { useRef, useCallback } from 'react';

export function useTilt(maxTilt = 6) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const midX = rect.width / 2;
      const midY = rect.height / 2;
      const rotateY = ((x - midX) / midX) * maxTilt;
      const rotateX = ((midY - y) / midY) * maxTilt;
      el.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(4px)`;
    },
    [maxTilt],
  );

  const handleMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateZ(0)';
    el.style.transition = 'transform 0.5s ease-out';
    setTimeout(() => {
      if (el) el.style.transition = '';
    }, 500);
  }, []);

  return { tiltRef: ref, handleMouseMove, handleMouseLeave };
}

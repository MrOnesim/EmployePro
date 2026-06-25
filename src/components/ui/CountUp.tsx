import { useState, useEffect, useRef } from 'react';

interface CountUpProps {
  end: number;
  suffix?: string;
  duration?: number;
  className?: string;
  format?: boolean;
}

function formatNumber(n: number): string {
  return n.toLocaleString('fr-FR');
}

export default function CountUp({ end, suffix = '', duration = 2000, className = '', format = true }: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const step = (now: number) => {
            const progress = Math.min((now - startTime) / duration, 1);
            const eased = 1 - (1 - progress) * (1 - progress);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return <span ref={ref} className={className}>{format ? formatNumber(count) : count}{suffix}</span>;
}

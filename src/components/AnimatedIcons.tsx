import { useEffect, useState } from 'react';

export function PulsingDot({ color = 'bg-blue-600', size = 8 }: { color?: string; size?: number }) {
  return (
    <span className="relative flex h-2 w-2">
      <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${color}`} />
      <span className={`relative inline-flex rounded-full ${color}`} style={{ width: size, height: size }} />
    </span>
  );
}

export function FloatAnimation({ children, duration = 3, delay = 0 }: { children: React.ReactNode; duration?: number; delay?: number }) {
  return (
    <div className="animate-bounce" style={{ animationDuration: duration + 's', animationDelay: delay + 's' }}>
      {children}
    </div>
  );
}

export function Shimmer({ width = 'w-full', height = 'h-4' }: { width?: string; height?: string }) {
  return <div className={`${width} ${height} bg-gray-200 rounded shimmer`} />;
}

export function AnimatedCounter({ end, duration = 1500, suffix = '', prefix = '' }: { end: number; duration?: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [end, duration]);
  return <span>{prefix}{count.toLocaleString()}{suffix}</span>;
}

export function WaveDivider({ color = '#2563EB' }: { color?: string }) {
  return (
    <div className="relative h-16 overflow-hidden">
      <svg className="absolute bottom-0 w-full h-16" viewBox="0 0 1200 120" preserveAspectRatio="none" fill={color}>
        <path d="M0,60 C200,120 400,0 600,60 C800,120 1000,0 1200,60 L1200,120 L0,120 Z" className="animate-wave" />
      </svg>
    </div>
  );
}

export function AnimatedUsers({ size = 24, color = 'text-blue-600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <g className="animate-pulse" style={{ animationDuration: '2s' }}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function AnimatedDollar({ size = 24, color = 'text-green-600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <g className="animate-spin" style={{ animationDuration: '8s' }}>
        <line x1="12" y1="1" x2="12" y2="23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

export function AnimatedClock({ size = 24, color = 'text-orange-600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '3s' }} />
      <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="animate-spin" style={{ animationDuration: '2s', transformOrigin: 'center' }} />
    </svg>
  );
}

export function AnimatedChart({ size = 24, color = 'text-purple-600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <g>
        <rect x="3" y="12" width="4" height="9" rx="1" stroke="currentColor" strokeWidth="2" className="animate-bounce" style={{ animationDuration: '2s', animationDelay: '0ms' }} />
        <rect x="10" y="6" width="4" height="15" rx="1" stroke="currentColor" strokeWidth="2" className="animate-bounce" style={{ animationDuration: '2s', animationDelay: '150ms' }} />
        <rect x="17" y="3" width="4" height="18" rx="1" stroke="currentColor" strokeWidth="2" className="animate-bounce" style={{ animationDuration: '2s', animationDelay: '300ms' }} />
      </g>
    </svg>
  );
}

export function AnimatedRocket({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <g className="animate-bounce" style={{ animationDuration: '2s' }}>
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" fill="url(#rocket-grad)" />
        <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" fill="url(#rocket-grad)" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <linearGradient id="rocket-grad" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#7C3AED" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AnimatedShield({ size = 24, color = 'text-green-600' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="2" className="animate-pulse" style={{ animationDuration: '4s' }} />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-pulse" style={{ animationDuration: '2s' }} />
    </svg>
  );
}

export function AnimatedSparkle({ size = 16 }: { size?: number }) {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setRotate((r) => r + 45), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.5s' }}>
      <path d="M12 2l2.4 7.2L22 12l-7.6 2.8L12 22l-2.4-7.2L2 12l7.6-2.8z" fill="url(#sparkle-grad)" />
      <defs>
        <linearGradient id="sparkle-grad" x1="2" y1="2" x2="22" y2="22">
          <stop stopColor="#F59E0B" />
          <stop offset="1" stopColor="#EF4444" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function AnimatedHeart({ size = 24, color = 'text-red-500' }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={color}>
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" fill="currentColor" className="animate-pulse" style={{ animationDuration: '1s' }} />
    </svg>
  );
}

export function AnimatedGlobe({ size = 32 }: { size?: number }) {
  const [rotate, setRotate] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => setRotate((r) => r + 2), 50);
    return () => clearInterval(timer);
  }, []);
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" style={{ transform: `rotate(${rotate}deg)`, transition: 'transform 0.05s linear' }}>
      <circle cx="12" cy="12" r="10" stroke="url(#globe-grad)" strokeWidth="2" />
      <path d="M2 12h20" stroke="url(#globe-grad)" strokeWidth="1" opacity="0.5" />
      <path d="M12 2a15 15 0 0 1 0 20" stroke="url(#globe-grad)" strokeWidth="1" opacity="0.5" />
      <path d="M12 2a15 15 0 0 0 0 20" stroke="url(#globe-grad)" strokeWidth="1" opacity="0.5" />
      <path d="M2 12h20" stroke="url(#globe-grad)" strokeWidth="1" opacity="0.5" />
      <defs>
        <linearGradient id="globe-grad" x1="2" y1="2" x2="22" y2="22">
          <stop stopColor="#2563EB" />
          <stop offset="1" stopColor="#10B981" />
        </linearGradient>
      </defs>
    </svg>
  );
}

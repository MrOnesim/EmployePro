import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Users, Shield, Star } from 'lucide-react';
import { useCountUp } from '../../hooks/useCountUp';

const stats = [
  { value: 50, label: 'Employés gérés', icon: Users, suffix: 'K+' },
  { value: 16, label: 'Pays supportés', icon: Globe, suffix: '+' },
  { value: 99, label: 'Disponibilité', icon: Shield, suffix: '.9%' },
  { value: 49, label: 'Satisfaction', icon: Star, suffix: '/5', prefix: '4.' },
];

function StatCard({ stat }: { stat: (typeof stats)[0] }) {
  const { count, ref } = useCountUp(stat.value, 2500);
  return (
    <div
      ref={ref}
      className="bg-white/10 backdrop-blur-sm rounded-xl px-3 py-4 md:px-4 md:py-5 border border-white/10 hover:bg-white/15 transition-all hover:-translate-y-0.5 text-center"
    >
      <div className="text-2xl md:text-3xl font-black text-white tracking-tight leading-none mb-1.5">
        {stat.prefix ?? ''}
        {count}
        {stat.suffix}
      </div>
      <div className="flex items-center justify-center gap-1.5">
        <stat.icon size={13} className="text-blue-300 shrink-0" />
        <span className="text-xs md:text-sm font-medium text-white/80 leading-tight">
          {stat.label}
        </span>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pb-12 md:pb-20"
    >
      {/* Animated grid background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Cpath d='M40 0L0 40M0 0l40 40' stroke='white' stroke-width='0.5'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px',
          transform: `translateY(${scrollY * -0.3}px)`,
        }}
      />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
      />
      <div
        className="absolute top-1/3 left-1/2 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl"
      />

      {/* Bottom transition gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-gray-50 z-10" />
      <div
        className="absolute -bottom-1 left-0 right-0 h-16 bg-gray-50 z-10"
        style={{ clipPath: 'ellipse(80% 100% at 50% 100%)' }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 w-full"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div className="pt-20 lg:pt-0">
            <h1 className="text-5xl md:text-6xl lg:text-7xl mt-8 font-black text-white leading-[1.05] mb-6 tracking-tight">
              Gérez vos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400">
                RH
              </span>{' '}
              <span className="bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent">
                sans limites
              </span>
            </h1>

            <p className="text-lg md:text-xl text-blue-100/90 leading-relaxed mb-10 max-w-lg">
              La plateforme RH et paie tout-en-un pour les entreprises ambitieuses. Paie multi-pays,
              IA embarquée, signatures électroniques.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/register-company"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 active:scale-95 transition-all shadow-lg hover:shadow-xl"
              >
                Essai gratuit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 active:scale-95 transition-all border border-white/20 backdrop-blur-sm">
                <Play size={20} />
                Voir la démo
              </button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-4">
              {stats.map((stat) => (
                <StatCard key={stat.label} stat={stat} />
              ))}
            </div>
          </div>

          {/* Right column — floating mockup */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl animate-float">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="space-y-4">
                <div className="flex items-end gap-3 h-32">
                  {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-white/40 to-white/60 rounded-t-lg hover:opacity-100 transition-all"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="grid mb-10 grid-cols-3 gap-3 text-center">
                  {[
                    { label: 'Employés', value: '1 247', change: '+12%' },
                    { label: 'Paie traitée', value: '485K €', change: '+8%' },
                    { label: 'Présences', value: '95.2%', change: '+3%' },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="bg-white/10 rounded-xl p-4 border border-white/10"
                    >
                      <div className="text-xs text-blue-200">{item.label}</div>
                      <div className="text-lg font-bold text-white mt-1">{item.value}</div>
                      <div className="text-xs text-green-300 mt-0.5">{item.change}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div
              className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-5 shadow-xl"
              style={{ animationDelay: '-1s' }}
            >
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-blue-600" />
                <div>
                  <div className="text-gray-900 font-bold">Sécurisé</div>
                  <div className="text-gray-500 text-xs">Données chiffrées</div>
                </div>
              </div>
            </div>
            <div
              className="absolute -top-4 -left-4 bg-gradient-to-r from-yellow-200 via-orange-200 to-pink-400 rounded-2xl p-3 shadow-xl"
              style={{ animationDelay: '-2s' }}
            >
              <div className="flex items-center gap-2">
                <Star size={16} className="text-white fill-white" />
                <span className="text-white font-bold text-sm">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

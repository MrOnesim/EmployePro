import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Globe, Users, Shield, Star } from 'lucide-react';

const stats = [
  { value: '50 000+', label: 'Employés gérés', icon: Users },
  { value: '16+', label: 'Pays supportés', icon: Globe },
  { value: '99.9%', label: 'Disponibilité', icon: Shield },
  { value: '4.9/5', label: 'Satisfaction', icon: Star },
];

export default function HeroSection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handle);
    return () => window.removeEventListener('mousemove', handle);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center bg-[#0a0e27] overflow-hidden">
      {/* Animated grid background */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Gradient orbs */}
      <div
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/20 rounded-full blur-[120px]"
        style={{ transform: `translate(${(mousePos.x - window.innerWidth / 2) * 0.02}px, ${(mousePos.y - window.innerHeight / 2) * 0.02}px)` }}
      />
      <div
        className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-indigo-600/20 rounded-full blur-[120px]"
        style={{ transform: `translate(${(mousePos.x - window.innerWidth / 2) * -0.015}px, ${(mousePos.y - window.innerHeight / 2) * -0.015}px)` }}
      />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[100px]" />

      {/* Floating geometric shapes */}
      <div className="absolute top-20 left-[15%] w-16 h-16 border border-blue-400/20 rounded-xl rotate-45 animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute bottom-40 right-[20%] w-12 h-12 border border-indigo-400/20 rounded-full animate-pulse" style={{ animationDuration: '5s', animationDelay: '1s' }} />
      <div className="absolute top-1/3 right-[10%] w-8 h-8 bg-blue-500/10 rounded-lg rotate-12 animate-pulse" style={{ animationDuration: '7s', animationDelay: '2s' }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div className="pt-20 lg:pt-0">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur-sm mb-8 animate-fade-in">
              <Globe size={14} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Conçu pour l'Afrique</span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Gérez vos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
                RH
              </span>{' '}
              sans limites
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-400 leading-relaxed mb-10 max-w-lg">
              La plateforme RH et paie tout-en-un pour les entreprises ambitieuses.
              Paie multi-pays, IA embarquée, signatures électroniques.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/register-company"
                className="group inline-flex items-center gap-2 bg-white text-[#0a0e27] px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-white/20"
              >
                Essai gratuit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/5 hover:text-white transition-all">
                <Play size={20} />
                Voir la démo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <div className="text-2xl font-black text-white">{stat.value}</div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <stat.icon size={12} className="text-blue-400" />
                    <span className="text-sm text-gray-500">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column - Hero visual */}
          <div className="hidden lg:block relative">
            <div className="relative">
              {/* Main glass card */}
              <div className="relative bg-white/[0.03] backdrop-blur-xl rounded-3xl border border-white/[0.08] p-8 shadow-2xl">
                {/* Dashboard mockup header */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                {/* Chart area */}
                <div className="space-y-4">
                  <div className="flex items-end gap-3 h-32">
                    {[40, 65, 45, 80, 55, 90, 70, 95, 60, 85, 75, 100].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg opacity-80 hover:opacity-100 transition-all"
                        style={{ height: `${h}%`, animationDelay: `${i * 0.1}s` }}
                      />
                    ))}
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Employés', value: '1 247', change: '+12%' },
                      { label: 'Paie traitée', value: '485K FCFA', change: '+8%' },
                      { label: 'Présences', value: '95.2%', change: '+3%' },
                    ].map((item) => (
                      <div key={item.label} className="bg-white/[0.04] rounded-xl p-4 border border-white/[0.06]">
                        <div className="text-xs text-gray-500">{item.label}</div>
                        <div className="text-lg font-bold text-white mt-1">{item.value}</div>
                        <div className="text-xs text-green-400 mt-0.5">{item.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
                {/* Decorative glow */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/20 via-transparent to-purple-600/20 rounded-3xl -z-10 blur-2xl" />
              </div>
              {/* Floating badge */}
              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-5 shadow-xl shadow-blue-600/20 animate-bounce" style={{ animationDuration: '4s' }}>
                <div className="flex items-center gap-3">
                  <Shield size={24} className="text-white" />
                  <div>
                    <div className="text-white font-bold">Sécurisé</div>
                    <div className="text-blue-200 text-xs">Données chiffrées</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0a0e27] to-transparent" />
    </section>
  );
}

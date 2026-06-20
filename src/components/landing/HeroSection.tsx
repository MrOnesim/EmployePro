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
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handle = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handle);
    return () => window.removeEventListener('scroll', handle);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center bg-cover bg-center overflow-hidden pb-12 md:pb-20"
      style={{ backgroundImage: "url('/images/bg-hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/85 to-indigo-800/90" />
      {/* Decorative circles */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
      <div
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '1s' }}
      />
      <div
        className="absolute top-1/3 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse"
        style={{ animationDelay: '2s' }}
      />

      {/* Geometric shapes */}
      <div
        className="absolute top-32 left-[20%] w-16 h-16 border border-white/20 rounded-xl rotate-45 animate-pulse"
        style={{ animationDuration: '6s' }}
      />
      <div
        className="absolute bottom-48 right-[15%] w-12 h-12 border border-white/20 rounded-full animate-pulse"
        style={{ animationDuration: '5s', animationDelay: '1s' }}
      />

      <div
        className="relative z-10 max-w-7xl mx-auto px-4 w-full"
        style={{ transform: `translateY(${scrollY * 0.15}px)` }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left column */}
          <div className="pt-20 lg:pt-0">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
              <Globe size={14} className="text-blue-200" />
              <span className="text-sm font-medium text-white">Conçu pour l'Afrique</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
              Gérez vos{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">
                RH
              </span>{' '}
              sans limites
            </h1>

            <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-lg">
              La plateforme RH et paie tout-en-un pour les entreprises ambitieuses. Paie multi-pays,
              IA embarquée, signatures électroniques.
            </p>

            <div className="flex flex-wrap gap-4 mb-16">
              <Link
                to="/register-company"
                className="group inline-flex items-center gap-2 bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl"
              >
                Essai gratuit
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center gap-2 bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
                <Play size={20} />
                Voir la démo
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/15 transition-all"
                >
                  <div className="text-3xl md:text-4xl font-black text-white tracking-tight leading-none mb-2">
                    {stat.value}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <stat.icon size={14} className="text-blue-300" />
                    <span className="text-xs md:text-sm font-medium text-white/80">
                      {stat.label}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column */}
          <div className="hidden lg:block relative">
            <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 p-8 shadow-2xl">
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
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { label: 'Employés', value: '1 247', change: '+12%' },
                    { label: 'Paie traitée', value: '485K FCFA', change: '+8%' },
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
            <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl p-5 shadow-xl animate-float">
              <div className="flex items-center gap-3">
                <Shield size={24} className="text-blue-600" />
                <div>
                  <div className="text-gray-900 font-bold">Sécurisé</div>
                  <div className="text-gray-500 text-xs">Données chiffrées</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

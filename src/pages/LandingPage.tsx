import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Users, DollarSign, Calendar, BarChart3, MessageSquare,
  Globe, Zap, Shield,   CheckCircle, ArrowRight, ChevronDown,
  Play, Star, MapPin
} from 'lucide-react';

const features = [
  { icon: Users, title: 'Gestion des employés', desc: 'Créez, gérez et suivez tous vos employés depuis une seule interface.', color: 'from-blue-500 to-blue-600', delay: 0 },
  { icon: DollarSign, title: 'Paie & Salaires', desc: 'Automatisez la paie, générez des bulletins et suivez la masse salariale.', color: 'from-green-500 to-green-600', delay: 100 },
  { icon: Calendar, title: 'Congés & Présences', desc: 'Pointage intelligent et gestion des congés simplifiée.', color: 'from-orange-500 to-orange-600', delay: 200 },
  { icon: BarChart3, title: 'Rapports & Analyses', desc: 'Tableaux de bord interactifs et rapports détaillés.', color: 'from-purple-500 to-purple-600', delay: 300 },
  { icon: MessageSquare, title: 'Communication interne', desc: 'Messagerie intégrée pour une communication fluide.', color: 'from-teal-500 to-teal-600', delay: 400 },
  { icon: Zap, title: 'Assistant IA', desc: 'Intelligence artificielle pour des analyses RH avancées.', color: 'from-pink-500 to-pink-600', delay: 500 },
];

const stats = [
  { value: '60+', label: 'Pays supportés', icon: Globe },
  { value: '10K+', label: 'Entreprises', icon: Users },
  { value: '99.9%', label: 'Disponibilité', icon: Shield },
  { value: '4.9/5', label: 'Satisfaction', icon: Star },
];

const testimonials = [
  { name: 'Amadou Diallo', role: 'CEO, TechStart Dakar', text: 'EmployePro a transformé notre gestion RH. Gain de temps de 40%.', country: 'Sénégal' },
  { name: 'Marie Dubois', role: 'DRH, Innovate Paris', text: 'L\'assistant IA est incroyable. Des insights que je n\'aurais jamais trouvés seule.', country: 'France' },
  { name: 'Carlos Rodriguez', role: 'CTO, Digital Lima', text: 'La meilleure plateforme RH que nous ayons utilisée. Interface intuitive.', country: 'Pérou' },
];

const AnimatedBackground = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    const p = Array.from({ length: 20 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }));
    setParticles(p);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-500/10 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: '3s',
          }}
        />
      ))}
    </div>
  );
};

const ScrollIndicator = () => {
  const [opacity, setOpacity] = useState(1);
  useEffect(() => {
    const interval = setInterval(() => {
      setOpacity(o => o === 1 ? 0.3 : 1);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity }}>
      <span className="text-sm text-white/70">Découvrir</span>
      <ChevronDown size={24} className="text-white animate-bounce" />
    </div>
  );
};

const FeatureCard = ({ feature }: { feature: typeof features[0] }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsVisible(true);
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-500 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${feature.delay}ms` }}
    >
      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <feature.icon size={28} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl" />
    </div>
  );
};

const StatCard = ({ stat, index }: { stat: typeof stats[0]; index: number }) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        const numericValue = parseFloat(stat.value);
        if (!isNaN(numericValue)) {
          const step = numericValue / 60;
          let current = 0;
          const timer = setInterval(() => {
            current += step;
            if (current >= numericValue) {
              setCount(numericValue);
              clearInterval(timer);
            } else {
              setCount(current);
            }
          }, 16);
        }
      }
    }, { threshold: 0.1 });
    const el = document.getElementById(`stat-${index}`);
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div id={`stat-${index}`} className="text-center">
      <div className="w-12 h-12 mx-auto mb-3 bg-white/10 rounded-xl flex items-center justify-center">
        <stat.icon size={24} className="text-white" />
      </div>
      <div className="text-3xl font-bold text-white mb-1">
        {isVisible ? (
          typeof stat.value === 'number' ? count : stat.value.replace(/[^\d.]/g, '') + stat.value.replace(/[\d.]/g, '')
        ) : stat.value}
      </div>
      <p className="text-white/70 text-sm">{stat.label}</p>
    </div>
  );
};

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTestimonial(t => (t + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 overflow-hidden">
        <AnimatedBackground />

        {/* Decorative circles */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />

        <div className="relative z-10 max-w-6xl mx-auto px-4 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-white" style={{ transform: `translateY(${scrollY * 0.2}px)` }}>
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <Globe size={16} className="mr-2" />
              <span className="text-sm font-medium">Disponible dans 60+ pays</span>
            </div>
            <h1 className="text-5xl lg:text-7xl font-black leading-tight mb-6">
              Gérez vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-orange-400">RH</span> sans limites
            </h1>
            <p className="text-xl text-blue-100 mb-8 leading-relaxed">
              La plateforme RH tout-en-un pour les entreprises modernes. Salaires, présences, congés et IA au service de votre croissance.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/login" className="group inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl">
                Commencer gratuitement
                <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="inline-flex items-center bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
                <Play size={20} className="mr-2" />
                Voir la démo
              </button>
            </div>

            {/* Floating badges */}
            <div className="mt-12 flex flex-wrap gap-3">
              {['✓ Gratuit pour commencer', '✓ 60+ pays', '✓ Support 24/7', '✓ IA intégrée'].map((badge, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm border border-white/10 animate-float" style={{ animationDelay: `${i * 0.5}s` }}>
                  {badge}
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-3xl p-6 border border-white/20 shadow-2xl">
              <img
                src="/images/dashboard-illustration.png"
                alt="Dashboard EmployePro"
                className="w-full rounded-2xl"
                style={{ transform: `translateY(${scrollY * -0.1}px)` }}
              />
              {/* Floating stat cards */}
              <div className="absolute -top-4 -right-4 bg-white rounded-xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <CheckCircle size={16} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Présence</p>
                    <p className="font-bold text-green-600">95.2%</p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <Users size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Employés</p>
                    <p className="font-bold text-blue-600">1,247</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <ScrollIndicator />
      </section>

      {/* Stats Section */}
      <section className="bg-gradient-to-r from-blue-700 to-indigo-700 py-16">
        <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => <StatCard key={i} stat={stat} index={i} />)}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-flex items-center bg-blue-100 text-blue-600 rounded-full px-4 py-2 text-sm font-medium mb-4">
              Fonctionnalités
            </span>
            <h2 className="text-4xl font-black text-gray-800 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Une suite complète d'outils RH pour gérer votre entreprise efficacement
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => <FeatureCard key={feature.title} feature={feature} />)}
          </div>
        </div>
      </section>

      {/* Global Coverage */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-1.5 bg-green-100 text-green-600 rounded-full px-4 py-2 text-sm font-medium mb-4">
                <Globe size={16} /> Plateforme Globale
              </span>
              <h2 className="text-4xl font-black text-gray-800 mb-6">
                Disponible partout dans le monde
              </h2>
              <p className="text-gray-500 text-lg mb-8 leading-relaxed">
                EmployePro est conçu pour les entreprises de toutes tailles, partout dans le monde. Indicateurs téléphoniques, monnaies locales, et réglementations locales intégrées.
              </p>
              <div className="space-y-4">
                {[
                  '60+ pays supportés avec indicateurs locaux',
                  'Multi-devises : FCFA, EUR, USD, MAD, et plus',
                  'Conformité aux réglementations locales',
                  'Support multilingue (FR, EN, PT, AR, ES)'
                ].map((item, i) => (
                  <div key={i} className="flex items-center space-x-3">
                    <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={14} className="text-green-600" />
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl blur-3xl opacity-50" />
              <img
                src="/images/global-network.png"
                alt="Couverture mondiale"
                className="relative w-full rounded-3xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black text-gray-800 mb-4">Ils nous font confiance</h2>
            <p className="text-gray-500 text-lg">Des entreprises à travers le monde utilisent EmployePro</p>
          </div>

          <div className="relative">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-500 ${
                  i === currentTestimonial ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'
                }`}
              >
                <div className="flex items-center space-x-1 mb-4">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={20} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">"{t.text}"</p>
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800">{t.name}</p>
                    <p className="text-sm text-gray-500">{t.role} <MapPin size={12} className="inline" /> {t.country}</p>
                  </div>
                </div>
              </div>
            ))}

            <div className="flex justify-center space-x-2 mt-8">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonial(i)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    i === currentTestimonial ? 'bg-blue-600 w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-blue-600 to-indigo-700 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Prêt à transformer votre gestion RH ?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Rejoignez des milliers d'entreprises qui font confiance à EmployePro
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/login" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl group">
              Se connecter
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link to="/register-company" className="inline-flex items-center bg-white/10 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all border border-white/20">
              Créer une entreprise
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">EP</span>
                </div>
                <span className="text-xl font-bold">EmployePro</span>
              </div>
              <p className="text-gray-400 text-sm">
                La plateforme RH globale pour les entreprises modernes.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Produit</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Fonctionnalités</li>
                <li>Prix</li>
                <li>Intégrations</li>
                <li>API</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Entreprise</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>À propos</li>
                <li>Blog</li>
                <li>Carrières</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li>Centre d'aide</li>
                <li>Documentation</li>
                <li>Communauté</li>
                <li>Statut</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            © 2024 EmployePro. Tous droits réservés. Plateforme RH globale.
          </div>
        </div>
      </footer>
    </div>
  );
}

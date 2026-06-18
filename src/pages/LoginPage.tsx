import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { Mail, Lock, Building2, User, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';

const AnimatedParticles = () => {
  const [particles, setParticles] = useState<{ x: number; y: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 15 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 3,
      duration: Math.random() * 3 + 2,
    })));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-blue-400/20 animate-pulse"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginType, setLoginType] = useState<'company' | 'employee'>('company');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useApp();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const success = login(email, password, loginType);
    if (success) {
      navigate(loginType === 'company' ? '/admin' : '/employee');
    } else {
      setError('Email ou mot de passe incorrect');
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 flex items-center justify-center p-4 relative overflow-hidden">
      <AnimatedParticles />

      <div className="absolute inset-0 opacity-10">
        <img src="/images/team-collaboration.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl shadow-lg mb-4 border border-white/30 animate-pulse-glow">
            <span className="text-white font-bold text-3xl">EP</span>
            <Sparkles size={16} className="absolute -top-1 -right-1 text-yellow-300 animate-spin" style={{ animationDuration: '3s' }} />
          </div>
          <h1 className="text-3xl font-black text-white mb-2">EmployePro</h1>
          <p className="text-blue-100">Plateforme RH Globale • 60+ pays</p>
        </div>

        <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 animate-slide-up">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Connexion</h2>

          <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setLoginType('company')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                loginType === 'company'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <Building2 size={18} />
              <span className="font-medium">Entreprise</span>
            </button>
            <button
              type="button"
              onClick={() => setLoginType('employee')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                loginType === 'employee'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <User size={18} />
              <span className="font-medium">Employé</span>
            </button>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg mb-4 text-sm animate-shake">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Adresse email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            <div className="group">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">Mot de passe</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" size={20} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all bg-gray-50 focus:bg-white"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="text-sm text-gray-600">Se souvenir de moi</span>
              </label>
              <button type="button" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Mot de passe oublié ?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 px-4 rounded-xl font-bold hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg shadow-blue-200 flex items-center justify-center space-x-2 disabled:opacity-70"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Connexion en cours...</span>
                </>
              ) : (
                <>
                  <span>Se connecter</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-gray-500 text-sm">
              Pas encore de compte ?{' '}
              <Link to="/register-company" className="text-blue-600 font-bold hover:text-blue-700 transition-colors">
                Créer une entreprise
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 bg-white/10 backdrop-blur-sm rounded-xl p-5 border border-white/20 animate-fade-in-delay">
          <p className="text-sm text-blue-100 font-medium mb-3">Comptes de démonstration :</p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between text-blue-100">
              <span>Admin :</span>
              <code className="bg-white/20 px-2 py-1 rounded text-xs">admin@techafrique.com</code>
            </div>
            <div className="flex items-center justify-between text-blue-100">
              <span>Employé :</span>
              <code className="bg-white/20 px-2 py-1 rounded text-xs">ama@techafrique.com</code>
            </div>
            <p className="text-blue-200/70 text-xs">Mot de passe : n'importe lequel</p>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function CTASection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="relative py-32 bg-[#0a0e27] overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-600/[0.03] to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-blue-600/[0.04] via-purple-600/[0.04] to-blue-600/[0.04] rounded-full blur-[120px]" />

      {/* Geometric decorations */}
      <div className="absolute top-10 left-10 w-20 h-20 border border-blue-400/10 rounded-2xl rotate-45 animate-pulse" style={{ animationDuration: '7s' }} />
      <div className="absolute bottom-10 right-10 w-16 h-16 border border-purple-400/10 rounded-full animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }} />

      <div ref={ref} className={`relative max-w-4xl mx-auto px-4 text-center transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur-sm mb-8">
          <Sparkles size={14} className="text-blue-400" />
          <span className="text-sm font-medium text-blue-300">Prêt à passer à l'action ?</span>
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight leading-[1.05]">
          Prêt à transformer{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">
            votre gestion RH
          </span>
          {' '}?
        </h2>

        <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
          Rejoignez des milliers d'entreprises qui font confiance à EmployéPro Africa.
          Commencez gratuitement, sans carte bancaire.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            to="/register-company"
            className="group inline-flex items-center gap-2 bg-white text-[#0a0e27] px-10 py-5 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all shadow-lg shadow-white/10 hover:shadow-white/20"
          >
            Essai gratuit 14 jours
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            to="/login"
            className="inline-flex items-center gap-2 border border-gray-700 text-gray-300 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/5 hover:text-white transition-all"
          >
            Se connecter
          </Link>
        </div>

        <div className="mt-10 flex flex-wrap justify-center gap-8 text-sm text-gray-600">
          <span>&#10003; Sans carte bancaire</span>
          <span>&#10003; 14 jours d'essai</span>
          <span>&#10003; Accès complet</span>
          <span>&#10003; Support 24/7</span>
        </div>
      </div>
    </section>
  );
}

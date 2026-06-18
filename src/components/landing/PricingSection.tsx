import { Link } from 'react-router-dom';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Check, ArrowRight } from 'lucide-react';

const plans = [
  {
    name: 'Gratuit', price: '0', period: 'Toujours',
    desc: 'Pour découvrir EmployéPro en toute liberté.',
    featured: false,
    features: ['Jusqu\'à 10 employés', 'Gestion RH de base', 'Paie simple', '1 pays', 'Support email'],
  },
  {
    name: 'Pro', price: '49', period: '/mois',
    desc: 'Pour les PME en croissance. Pas de facturation par employé.',
    featured: true,
    features: ['Employés illimités', 'Tous les modules RH', 'Paie multi-pays', 'Assistant IA', 'Signature électronique', 'Support prioritaire 24/7', 'API & Intégrations'],
  },
  {
    name: 'Entreprise', price: 'Sur mesure', period: '',
    desc: 'Pour les grands groupes et administrations.',
    featured: false,
    features: ['Tout le plan Pro', 'Multi-entreprises', 'Data center dédié', 'SLA 99.99%', 'Audit & Conformité', 'Formation on-site', 'Account manager dédié'],
  },
];

export default function PricingSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
            <span className="text-sm font-medium text-green-600">Tarifs transparents</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Pas de facturation par employé
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Un prix fixe, quel que soit le nombre d'employés. Pas de surprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative rounded-3xl p-8 border-2 transition-all duration-300 ${
                plan.featured
                  ? 'border-blue-500 shadow-xl shadow-blue-600/10 scale-105 md:scale-105 bg-white'
                  : 'border-gray-100 bg-white hover:border-gray-200'
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  Recommandé
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-1">{plan.name}</h3>
                <div className="flex items-baseline gap-1 mb-2">
                  <span className="text-4xl font-black text-gray-900">{plan.price}</span>
                  <span className="text-gray-400 text-sm">{plan.period}</span>
                </div>
                <p className="text-sm text-gray-500">{plan.desc}</p>
              </div>
              <ul className="space-y-3 mb-8">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <Check size={16} className="text-green-500 shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-600">{f}</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/register-company"
                className={`block text-center py-3.5 px-6 rounded-xl font-bold text-sm transition-all ${
                  plan.featured
                    ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                    : 'border-2 border-gray-200 text-gray-700 hover:border-gray-300'
                }`}
              >
                {plan.name === 'Gratuit' ? 'Commencer' : plan.name === 'Pro' ? (
                  <span className="flex items-center justify-center gap-2">
                    Essai gratuit <ArrowRight size={16} />
                  </span>
                ) : 'Nous contacter'}
              </Link>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-gray-400 mt-8">
          Tous les plans incluent un essai gratuit de 14 jours. Sans carte bancaire.
        </p>
      </div>
    </section>
  );
}

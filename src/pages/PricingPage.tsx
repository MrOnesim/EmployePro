import { useState } from 'react';
import { Check, X, Star, Shield, Zap, Crown, Users, DollarSign, BarChart3, MessageSquare, HelpCircle, ArrowRight, Sparkles } from 'lucide-react';

interface Plan {
  name: string;
  icon: any;
  price: string;
  period: string;
  description: string;
  badge?: string;
  badgeColor?: string;
  features: { text: string; included: boolean }[];
  cta: string;
  highlighted?: boolean;
  gradient?: string;
}

const plans: Plan[] = [
  {
    name: 'Starter',
    icon: Users,
    price: '0',
    period: '/mois',
    description: 'Pour les très petites équipes',
    features: [
      { text: "Jusqu'à 3 employés", included: true },
      { text: 'Gestion des présences', included: true },
      { text: 'Bulletins de paie (PDF)', included: true },
      { text: 'Gestion des congés', included: true },
      { text: 'Support email', included: true },
      { text: 'Messages internes', included: false },
      { text: 'Assistant IA', included: false },
      { text: 'Rapports avancés', included: false },
      { text: 'Documents RH', included: false },
      { text: 'Performance & Évaluations', included: false },
      { text: 'API & Intégrations', included: false },
      { text: 'Support prioritaire 24/7', included: false },
    ],
    cta: 'Commencer gratuitement',
  },
  {
    name: 'Pro',
    icon: Star,
    price: '29',
    period: '/mois',
    description: "Pour les PME en pleine croissance",
    badge: 'Populaire',
    badgeColor: 'bg-blue-500',
    features: [
      { text: "Jusqu'à 25 employés", included: true },
      { text: 'Gestion des présences', included: true },
      { text: 'Bulletins de paie (PDF)', included: true },
      { text: 'Gestion des congés', included: true },
      { text: 'Support prioritaire', included: true },
      { text: 'Messages internes', included: true },
      { text: 'Assistant IA', included: true },
      { text: 'Rapports avancés', included: true },
      { text: 'Documents RH', included: true },
      { text: 'Performance & Évaluations', included: true },
      { text: 'API & Intégrations', included: false },
      { text: 'Support dédié 24/7', included: false },
    ],
    cta: 'Essai gratuit 14 jours',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    icon: Crown,
    price: '99',
    period: '/mois',
    description: 'Pour les grandes organisations',
    features: [
      { text: 'Employés illimités', included: true },
      { text: 'Gestion des présences', included: true },
      { text: 'Bulletins de paie (PDF)', included: true },
      { text: 'Gestion des congés', included: true },
      { text: 'Support dédié 24/7', included: true },
      { text: 'Messages internes', included: true },
      { text: 'Assistant IA avancé', included: true },
      { text: 'Rapports personnalisés', included: true },
      { text: 'Documents RH', included: true },
      { text: 'Performance & Évaluations', included: true },
      { text: 'API & Intégrations', included: true },
      { text: 'Account Manager dédié', included: true },
    ],
    cta: 'Contacter les ventes',
    gradient: 'from-gray-900 to-gray-800',
  },
];

export default function PricingPage() {
  const [annual, setAnnual] = useState(true);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/3 right-1/4 w-32 h-32 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sparkles size={16} className="mr-2 text-yellow-300" />
            <span className="text-sm font-medium text-white">Tarification simple et transparente</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Un plan pour chaque entreprise
          </h1>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
            De la startup de 5 employés à l'entreprise de 5000+, EmployePro s'adapte à vos besoins.
          </p>

          {/* Toggle Annual */}
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1 border border-white/20">
            <button
              onClick={() => setAnnual(false)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all ${
                !annual ? 'bg-white text-blue-600 shadow-lg' : 'text-white/80 hover:text-white'
              }`}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all flex items-center ${
                annual ? 'bg-white text-blue-600 shadow-lg' : 'text-white/80 hover:text-white'
              }`}
            >
              Annuel
              <span className="ml-2 bg-green-500 text-white text-xs px-2 py-0.5 rounded-full">-20%</span>
            </button>
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="max-w-6xl mx-auto px-4 -mt-16 relative z-10 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          {plans.map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? 'bg-white border-2 border-blue-500 shadow-2xl shadow-blue-200 scale-105 z-10'
                  : plan.gradient
                  ? `bg-gradient-to-br ${plan.gradient} text-white shadow-xl`
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              {plan.badge && (
                <div className={`absolute -top-4 left-1/2 -translate-x-1/2 ${plan.badgeColor} text-gray-900 text-sm font-bold px-4 py-1.5 rounded-full shadow-lg`}>
                  {plan.badge}
                </div>
              )}

              <div className="flex items-center justify-center mb-4">
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                  plan.highlighted ? 'bg-blue-100' : plan.gradient ? 'bg-white/10' : 'bg-gray-100'
                }`}>
                  <plan.icon size={28} className={plan.highlighted ? 'text-blue-600' : plan.gradient ? 'text-white' : 'text-gray-600'} />
                </div>
              </div>

              <h3 className={`text-2xl font-bold text-center mb-2 ${plan.gradient ? 'text-white' : 'text-gray-800'}`}>
                {plan.name}
              </h3>
              <p className={`text-center mb-6 ${plan.gradient ? 'text-gray-300' : 'text-gray-500'}`}>
                {plan.description}
              </p>

              <div className="text-center mb-6">
                {plan.price === 'Sur mesure' ? (
                  <span className={`text-3xl font-black ${plan.gradient ? 'text-white' : 'text-gray-800'}`}>Sur mesure</span>
                ) : (
                  <>
                    <span className={`text-5xl font-black ${plan.gradient ? 'text-white' : 'text-gray-800'}`}>
                      {annual && plan.price !== '0' ? Math.round(parseFloat(plan.price) * 0.8) : plan.price}€
                    </span>
                    <span className={plan.gradient ? 'text-gray-400' : 'text-gray-400'}>{plan.period}</span>
                  </>
                )}
              </div>

              <button className={`w-full py-3.5 px-4 rounded-xl font-bold text-lg transition-all mb-8 ${
                plan.highlighted
                  ? 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-200'
                  : plan.gradient
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}>
                {plan.cta}
              </button>

              <div className="space-y-3">
                {plan.features.map((feature, j) => (
                  <div key={j} className="flex items-start space-x-3">
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      feature.included
                        ? plan.gradient ? 'bg-green-400/20' : 'bg-green-100'
                        : plan.gradient ? 'bg-gray-500/20' : 'bg-gray-100'
                    }`}>
                      {feature.included ? (
                        <Check size={12} className={plan.gradient ? 'text-green-400' : 'text-green-600'} />
                      ) : (
                        <X size={12} className={plan.gradient ? 'text-gray-400' : 'text-gray-400'} />
                      )}
                    </div>
                    <span className={`text-sm ${
                      feature.included
                        ? plan.gradient ? 'text-gray-200' : 'text-gray-700'
                        : plan.gradient ? 'text-gray-500' : 'text-gray-400'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Comparison */}
      <section className="max-w-6xl mx-auto px-4 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Pourquoi choisir EmployePro ?</h2>
          <p className="text-gray-500 text-lg">Des fonctionnalités puissantes pour gérer votre entreprise</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: DollarSign, title: 'Multi-devises', desc: 'FCFA, EUR, USD, MAD...', color: 'bg-green-100 text-green-600' },
            { icon: Shield, title: 'Sécurité maximale', desc: 'SSL, 2FA, chiffrement', color: 'bg-blue-100 text-blue-600' },
            { icon: Zap, title: 'Assistant IA', desc: 'Analyses intelligentes', color: 'bg-purple-100 text-purple-600' },
            { icon: MessageSquare, title: 'Support 24/7', desc: 'Français, Anglais, Arabe', color: 'bg-orange-100 text-orange-600' },
            { icon: BarChart3, title: 'Rapports avancés', desc: 'Visualisations interactives', color: 'bg-indigo-100 text-indigo-600' },
            { icon: Users, title: '60+ pays', desc: 'Conformité locale', color: 'bg-teal-100 text-teal-600' },
            { icon: HelpCircle, title: 'Formation', desc: 'Guides et tutoriels', color: 'bg-pink-100 text-pink-600' },
            { icon: Crown, title: 'SLA garanti', desc: '99.9% disponibilité', color: 'bg-yellow-100 text-yellow-600' },
          ].map((feature, i) => (
            <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className={`w-12 h-12 rounded-xl ${feature.color} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                <feature.icon size={24} />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 pb-24">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-12 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-5 right-10 w-20 h-20 bg-white/5 rounded-full animate-pulse" />
            <div className="absolute bottom-5 left-10 w-32 h-32 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
          <div className="relative">
            <h3 className="text-3xl font-black mb-4">Prêt à transformer votre gestion RH ?</h3>
            <p className="text-blue-100 text-lg mb-8">Essayez EmployePro gratuitement pendant 14 jours. Aucune carte de crédit requise.</p>
            <a href="/register-company" className="inline-flex items-center bg-white text-blue-600 px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-50 transition-all shadow-lg group">
              Commencer maintenant
              <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

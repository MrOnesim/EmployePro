import {
  Users,
  DollarSign,
  Calendar,
  Briefcase,
  Bot,
  Video,
  FileSignature,
  BookOpen,
  TrendingUp,
  MessageSquare,
  Shield,
  BarChart3,
} from 'lucide-react';
import { useScrollReveal } from '../../hooks/useScrollReveal';

const features = [
  {
    icon: Users,
    title: 'Gestion RH',
    desc: 'Employés, contrats, organigramme, onboarding — tout en un.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: DollarSign,
    title: 'Paie multi-pays',
    desc: 'FCFA, EUR, USD, MAD... Devises locales et conformité automatique.',
    color: 'from-green-500 to-green-600',
  },
  {
    icon: Calendar,
    title: 'Congés & Présences',
    desc: 'Pointage mobile, demandes de congés, suivi en temps réel.',
    color: 'from-orange-500 to-orange-600',
  },
  {
    icon: Briefcase,
    title: 'Recrutement',
    desc: 'Publiez des offres, gérez les candidatures, suivez les entretiens.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: Bot,
    title: 'Assistant IA',
    desc: 'Analyse prédictive, génération de rapports, suggestions intelligentes.',
    color: 'from-pink-500 to-pink-600',
  },
  {
    icon: Video,
    title: 'Réunions',
    desc: 'Visio, comptes rendus IA, actions automatiques.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: FileSignature,
    title: 'Signature électronique',
    desc: 'Signez tous vos documents RH en ligne, valeur légale.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: BookOpen,
    title: 'Formation & Quiz',
    desc: 'Cours, quiz automatiques, certificats de fin de formation.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: TrendingUp,
    title: 'Performance',
    desc: 'Objectifs, évaluations, feed-back 360°.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: MessageSquare,
    title: 'Messagerie',
    desc: 'Communication interne fluide avec notifications push.',
    color: 'from-violet-500 to-violet-600',
  },
  {
    icon: Shield,
    title: 'Coffre-fort',
    desc: 'Documents sensibles, accès contrôlé, audit trail.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: BarChart3,
    title: 'Rapports',
    desc: 'Tableaux de bord interactifs, exports PDF et Excel.',
    color: 'from-sky-500 to-sky-600',
  },
];

function FeatureCard({ feature, index }: { feature: (typeof features)[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`group relative bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:border-blue-100 transition-all duration-500 cursor-default ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <div
        className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-md`}
      >
        <feature.icon size={22} className="text-white" />
      </div>
      <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
      <div className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
}

export default function FeaturesSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="features"
      className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
            <span className="text-sm font-medium text-blue-600">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Une suite complète de 12 modules RH intégrés pour gérer votre entreprise efficacement.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {features.map((feature, i) => (
            <FeatureCard key={feature.title} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

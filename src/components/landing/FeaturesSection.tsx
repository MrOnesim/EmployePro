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

const features = [
  { icon: Users, title: 'Gestion RH', color: 'from-blue-500 to-blue-600' },
  { icon: DollarSign, title: 'Paie multi-pays', color: 'from-green-500 to-green-600' },
  { icon: Calendar, title: 'Congés & Présences', color: 'from-blue-600 to-blue-700' },
  { icon: Briefcase, title: 'Recrutement', color: 'from-orange-500 to-orange-600' },
  { icon: Bot, title: 'Assistant IA', color: 'from-indigo-500 to-indigo-600' },
  { icon: Video, title: 'Réunions', color: 'from-purple-500 to-purple-600' },
  { icon: FileSignature, title: 'Signature', color: 'from-blue-500 to-blue-600' },
  { icon: BookOpen, title: 'Formation', color: 'from-blue-600 to-blue-700' },
  { icon: TrendingUp, title: 'Performance', color: 'from-sky-500 to-blue-500' },
  { icon: MessageSquare, title: 'Messagerie', color: 'from-blue-500 to-blue-600' },
  { icon: Shield, title: 'Coffre-fort', color: 'from-emerald-500 to-emerald-600' },
  { icon: BarChart3, title: 'Rapports', color: 'from-sky-500 to-blue-500' },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 shadow-sm mb-6">
            <span className="text-sm font-medium text-blue-600">Fonctionnalités</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Tout ce dont vous avez besoin
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Une suite complète de 12 modules RH intégrés.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="group bg-gray-50 rounded-xl p-4 md:p-5 border border-gray-100 hover:bg-blue-50 hover:border-blue-100 hover:shadow-sm transition-all duration-300 text-center cursor-default"
            >
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-300 shadow-sm`}
              >
                <feature.icon size={20} className="text-white" />
              </div>
              <h3 className="text-xs md:text-sm font-semibold text-gray-700 group-hover:text-blue-700 transition-colors leading-tight">
                {feature.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

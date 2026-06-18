import { Globe, Users, Shield, Zap, Clock, Heart, Target, ArrowRight, MapPin } from 'lucide-react';

const values = [
  { icon: Globe, title: 'Global', desc: 'Disponible dans 60+ pays avec conformité locale', color: 'from-blue-500 to-blue-600' },
  { icon: Users, title: 'Centré sur l\'humain', desc: 'Les employés sont au cœur de chaque fonctionnalité', color: 'from-green-500 to-green-600' },
  { icon: Shield, title: 'Sécurité', desc: 'Données protégées avec chiffrement et 2FA', color: 'from-purple-500 to-purple-600' },
  { icon: Zap, title: 'Innovation', desc: 'IA intégrée pour des analyses RH avancées', color: 'from-orange-500 to-orange-600' },
  { icon: Clock, title: 'Efficacité', desc: 'Gagnez du temps sur vos processus RH', color: 'from-teal-500 to-teal-600' },
  { icon: Heart, title: 'Bienveillance', desc: 'QVT et bien-être au travail prioritaires', color: 'from-pink-500 to-pink-600' },
];

const team = [
  { name: 'Amadou Diallo', role: 'CEO & Co-fondateur', bio: 'Ex-directeur RH chez Orange', location: 'Sénégal' },
  { name: 'Marie Dubois', role: 'CTO & Co-fondatrice', bio: '15 ans d\'expérience en SaaS', location: 'France' },
  { name: 'Carlos Rodriguez', role: 'VP de Produit', bio: 'Expert UX & Data Science', location: 'Pérou' },
  { name: 'Aisha Mohammed', role: 'VP d\'Ingénierie', bio: 'Ex-Google, leader tech', location: 'Nigeria' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 py-24 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/5 rounded-full animate-pulse" />
          <div className="absolute bottom-10 right-10 w-60 h-60 bg-white/5 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
            <Target size={16} className="mr-2" />
            <span className="text-sm font-medium text-white">Notre mission</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
            Simplifier les RH,<br />partout dans le monde
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed">
            EmployePro est née d'un constat simple : les entreprises, qu'elles soient à Dakar, Paris, Lima ou Dubaï, 
            méritent les mêmes outils RH performants. Nous construisons la plateforme qui rend cela possible.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 -mt-12 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { value: '2020', label: 'Année de création' },
            { value: '60+', label: 'Pays supportés' },
            { value: '10K+', label: 'Entreprises clientes' },
            { value: '50M+', label: 'Salaires traités/mois' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-black text-blue-600 mb-1">{stat.value}</div>
              <p className="text-gray-500 text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Nos valeurs</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Les principes qui guident chaque décision que nous prenons</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all group">
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${v.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <v.icon size={28} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{v.title}</h3>
              <p className="text-gray-500">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-800 mb-4">L'équipe</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Des passionnés venant de tout le monde pour construire l'avenir des RH</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, i) => (
              <div key={i} className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all group">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                  <span className="text-white font-bold text-2xl">{member.name.charAt(0)}</span>
                </div>
                <div className="flex items-center justify-center gap-1 text-sm text-gray-500 mb-1"><MapPin size={14} />{member.location}</div>
                <h3 className="font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-blue-600 text-sm font-medium mb-2">{member.role}</p>
                <p className="text-gray-500 text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-24 text-center">
        <h2 className="text-3xl font-black text-gray-800 mb-4">Rejoignez notre mission</h2>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          Des milliers d'entreprises utilisent déjà EmployePro. Et vous ?
        </p>
        <a href="/register-company" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg group">
          Essayer gratuitement
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
      </section>
    </div>
  );
}

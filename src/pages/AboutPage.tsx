import { Globe, Users, Shield, Zap, Clock, Heart, Target, ArrowRight, MapPin, CheckCircle, CreditCard, Smartphone, Building2, BookOpen, HeadphonesIcon, BarChart3, Briefcase, DollarSign, FileText, MessageSquare, Gift, Monitor } from 'lucide-react';

const values = [
  { icon: Globe, title: 'Global', desc: 'Disponible dans 60+ pays avec conformité locale', color: 'from-blue-500 to-blue-600' },
  { icon: Users, title: "Centré sur l'humain", desc: 'Les employés sont au cœur de chaque fonctionnalité', color: 'from-green-500 to-green-600' },
  { icon: Shield, title: 'Sécurité', desc: 'Données protégées avec chiffrement et 2FA', color: 'from-purple-500 to-purple-600' },
  { icon: Zap, title: 'Innovation', desc: 'IA embarquée pour des analyses RH avancées', color: 'from-orange-500 to-orange-600' },
  { icon: Clock, title: 'Efficacité', desc: 'Automatisez vos processus RH en un clic', color: 'from-teal-500 to-teal-600' },
  { icon: Heart, title: 'Bienveillance', desc: 'QVT et bien-être au travail prioritaires', color: 'from-pink-500 to-pink-600' },
];

const team = [
  { name: 'Amadou Diallo', role: 'CEO & Co-fondateur', bio: 'Ex-directeur RH chez Orange, expert en transformation RH', location: 'Sénégal' },
  { name: 'Marie Dubois', role: 'CTO & Co-fondatrice', bio: '15 ans d\'expérience en SaaS, ex-Tech Lead Microsoft', location: 'France' },
  { name: 'Carlos Rodriguez', role: 'VP Produit', bio: 'Expert UX & Data Science, ex-Meta', location: 'Pérou' },
  { name: 'Aisha Mohammed', role: "VP d'Ingénierie", bio: 'Ex-Google, leader tech spécialiste infrastructure', location: 'Nigeria' },
  { name: 'Jean-Pierre Kamga', role: 'Directeur Financier', bio: 'Expert en fintech et paiements africains', location: 'Cameroun' },
  { name: 'Fatima El Amrani', role: 'VP Marketing', bio: 'Growth & expansion Afrique, ex-Jumia', location: 'Maroc' },
];

const modules = [
  { icon: Users, title: 'Gestion RH', desc: 'Employés, équipes, organigramme, import CSV' },
  { icon: DollarSign, title: 'Paie multi-pays', desc: 'Salaire, fiches de paie, banque, fiscalité' },
  { icon: Clock, title: 'Temps & Présences', desc: 'Pointage, congés, calendrier, planning' },
  { icon: Briefcase, title: 'Recrutement', desc: 'Offres, candidatures, pipeline de recrutement' },
  { icon: BarChart3, title: 'Performance', desc: 'Objectifs, évaluations, suivi des compétences' },
  { icon: FileText, title: 'Documents', desc: 'Gestion documentaire, signatures, coffre-fort' },
  { icon: MessageSquare, title: 'Communication', desc: 'Messagerie, réunions, fil d\'actualité social' },
  { icon: BookOpen, title: 'Formation', desc: 'Catalogue, quiz, certificats, parcours' },
  { icon: Gift, title: 'Récompenses', desc: 'Points, badges, catalogue d\'avantages' },
  { icon: Monitor, title: 'Matériel', desc: 'Inventaire, affectations, maintenance' },
  { icon: Heart, title: 'Bien-être', desc: 'Sondages anonymes, analyse de climat social' },
  { icon: Zap, title: 'Assistant IA', desc: 'NLP, analyses prédictives, recommandations' },
];

const paymentMethods = [
  { name: 'Carte bancaire', desc: 'Visa, Mastercard, American Express', regions: 'Monde' },
  { name: 'Mobile Money', desc: 'Orange Money, MTN Mobile Money, M-Pesa, Airtel Money, Moov Money, Wave', regions: 'Afrique' },
  { name: 'Transfert bancaire', desc: 'SEPA, SWIFT, virement local', regions: 'Monde' },
  { name: 'Flutterwave', desc: 'Paiement via Flutterwave (50+ pays africains)', regions: 'Afrique' },
  { name: 'PayPal', desc: 'Standard et Business', regions: 'Monde' },
  { name: 'Bitcoin/USDT', desc: 'Crypto et stablecoins via partenaires', regions: 'Monde' },
];

const steps = [
  {
    step: 1,
    title: "Créez votre compte",
    desc: "Inscrivez-vous en 2 minutes. Aucune carte bancaire requise pour l'essai.",
    detail: "Remplissez les informations de votre entreprise, définissez vos politiques RH et paramétrez votre cycle de paie.",
  },
  {
    step: 2,
    title: "Importez vos données",
    desc: "Importez vos employés via CSV ou manuellement. Notre assistant vous guide pas à pas.",
    detail: "Colonnes automatiquement détectées, validation des données en temps réel, mapping intelligent.",
  },
  {
    step: 3,
    title: "Configurez la paie",
    desc: "Définissez les grilles salariales, les taux de cotisation et les règles de calcul par pays.",
    detail: "Barème progressif, heures supplémentaires, primes, congés payés, avantages en nature.",
  },
  {
    step: 4,
    title: "Démarrez la gestion RH",
    desc: "Accédez à tous vos modules : présences, congés, documents, performances, recrutement.",
    detail: "Tableau de bord centralisé, notifications automatiques, workflow de validation intégré.",
  },
  {
    step: 5,
    title: "Générez les bulletins",
    desc: "Calculez et générez les fiches de paie conformes à la législation de chaque pays.",
    detail: "Export PDF, archivage automatique, intégration bancaire pour les virements.",
  },
  {
    step: 6,
    title: "Pilotez avec l'IA",
    desc: "Analysez les tendances, anticipez les départs, optimisez la masse salariale.",
    detail: "Assistant IA disponible 24/7, alertes intelligentes, rapports personnalisés.",
  },
];

const partners = [
  { name: 'Flutterwave', logo: 'Flutterwave', desc: 'Paiements africains' },
  { name: 'Orange Finances', logo: 'Orange', desc: 'Mobile Money' },
  { name: 'Sage', logo: 'Sage', desc: 'Intégration comptable' },
  { name: 'QuickBooks', logo: 'QuickBooks', desc: 'Synchro comptable' },
  { name: 'Microsoft 365', logo: 'Microsoft', desc: 'Productivité' },
  { name: 'Slack', logo: 'Slack', desc: 'Notifications RH' },
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
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            EmployéPro est née d'un constat simple : les entreprises méritent les mêmes outils RH performants,
            qu'elles soient à Dakar, Paris, Douala, Abidjan, Lima ou Dubaï.
            Nous construisons la plateforme unique qui rend cela possible.
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

      {/* Story */}
      <section className="max-w-4xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Notre histoire</h2>
          <p className="text-gray-500 text-lg max-w-3xl mx-auto">
            EmployéPro a été fondée en 2020 par Amadou Diallo et Marie Dubois, réunissant 
            une expertise RH de terrain et une maîtrise technologique de pointe.
          </p>
        </div>
        <div className="space-y-8 text-gray-600 leading-relaxed text-lg">
          <p>
            <strong className="text-gray-800">Le constat :</strong> Les solutions RH disponibles sur le marché 
            sont soit trop chères pour les PME, soit conçues uniquement pour les pays développés, 
            ignorant les spécificités africaines : mobile money, régimes sociaux variés, 
            absence de couverture Internet permanente.
          </p>
          <p>
            <strong className="text-gray-800">La solution :</strong> Une plateforme SaaS complète, accessible partout, 
            fonctionnant hors ligne, compatible avec les moyens de paiement locaux 
            et conforme aux législations de 60+ pays. Le tout propulsé par une intelligence 
            artificielle qui automatise les tâches répétitives et fournit des analyses prédictives.
          </p>
          <p>
            <strong className="text-gray-800">Aujourd'hui :</strong> Plus de 10 000 entreprises nous font confiance 
            à travers le monde. Nous traitons plus de 50 millions de salaires chaque mois 
            et notre équipe de 120+ collaborateurs répartis sur 4 continents continue d'innover 
            pour rendre les RH accessibles à toutes les entreprises.
          </p>
        </div>
      </section>

      {/* How it works */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-800 mb-4">Comment ça marche</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Démarrez en moins de 10 minutes. Notre onboarding guidé vous accompagne à chaque étape.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.step} className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-lg transition-all relative">
                <div className="absolute -top-3 -left-3 w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 mt-2">{s.title}</h3>
                <p className="text-gray-500 mb-3">{s.desc}</p>
                <p className="text-gray-400 text-sm">{s.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Modules disponibles</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Une solution complète pour tous vos processus RH, de l'embauche à la paie
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((m, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-5 border border-gray-100 hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <m.icon size={24} className="text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-1">{m.title}</h3>
              <p className="text-gray-500 text-sm">{m.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Payment Methods */}
      <section className="bg-gradient-to-br from-gray-900 to-gray-800 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6 border border-white/20">
              <CreditCard size={16} className="mr-2 text-blue-300" />
              <span className="text-sm font-medium text-white">Moyens de paiement</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">Payez comme vous voulez</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Nous supportons les moyens de paiement internationaux et africains pour que vous puissiez payer depuis n'importe où
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((pm, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-600/30 rounded-xl flex items-center justify-center flex-shrink-0">
                    <CreditCard size={24} className="text-blue-300" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold mb-1">{pm.name}</h3>
                    <p className="text-gray-400 text-sm mb-2">{pm.desc}</p>
                    <span className="inline-block text-xs font-medium bg-blue-600/30 text-blue-300 px-3 py-1 rounded-full">
                      {pm.regions}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <div className="inline-flex items-center space-x-2 text-gray-400 text-sm">
              <Shield size={16} className="text-green-400" />
              <span>Paiement sécurisé via TLS 1.3. Nous ne stockons pas vos données bancaires.</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-black text-gray-800 mb-6">Sécurité & Conformité</h2>
            <div className="space-y-4">
              {[
                'Chiffrement AES-256 au repos et TLS 1.3 en transit',
                'Authentification multi-facteurs (2FA)',
                'Conforme RGPD, OHADA, CEMAC, UEMOA',
                'Hébergement chez OVHcloud (Europe) et AWS (Afrique)',
                'Backup quotidien avec PRA (Plan de Reprise d\'Activité)',
                'Audit de sécurité trimestriel par des cabinets indépendants',
                'Certification ISO 27001 en cours',
                'Données bancaires tokenisées via des partenaires PCI-DSS',
              ].map((item, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <CheckCircle size={20} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100">
            <h3 className="font-bold text-gray-800 text-lg mb-4">Disponibilité garantie</h3>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {[
                { label: 'Uptime', value: '99.9%' },
                { label: 'Support', value: '24/7' },
                { label: 'Latence', value: '<200ms' },
                { label: 'SLA', value: 'Garanti' },
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100">
                  <div className="text-2xl font-black text-blue-600">{s.value}</div>
                  <p className="text-gray-500 text-sm">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-gray-500 text-sm">
              Notre infrastructure cloud est répartie sur plusieurs datacenters garantissant 
              une disponibilité continue, même en cas de panne régionale.
            </p>
          </div>
        </div>
      </section>

      {/* Support */}
      <section className="bg-gray-50 py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-black text-gray-800 mb-4">Support client</h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">Nous sommes là pour vous accompagner à chaque étape</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <HeadphonesIcon size={32} className="text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Support prioritaire</h3>
              <p className="text-gray-500 text-sm">Réponse sous 24h (gratuit) ou sous 1h (Premium). Chat en direct, email et téléphone.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={32} className="text-green-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Base de connaissances</h3>
              <p className="text-gray-500 text-sm">Tutoriels vidéo, documentation complète, FAQ, webinaires hebdomadaires et forum communautaire.</p>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-100 text-center hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Building2 size={32} className="text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Onboarding dédié</h3>
              <p className="text-gray-500 text-sm">Un Account Manager dédié pour vous accompagner dans la migration et la prise en main de la plateforme.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="max-w-6xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-gray-800 mb-4">Nos partenaires</h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Nous collaborons avec les meilleurs acteurs technologiques et financiers
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {partners.map((p, i) => (
            <div key={i} className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-center hover:shadow-md transition-all">
              <div className="w-12 h-12 bg-white rounded-xl border border-gray-200 flex items-center justify-center mx-auto mb-3">
                <Building2 size={24} className="text-gray-600" />
              </div>
              <p className="font-bold text-gray-800 text-sm">{p.name}</p>
              <p className="text-gray-400 text-xs mt-1">{p.desc}</p>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        <h2 className="text-3xl font-black text-gray-800 mb-4">Prêt à transformer vos RH ?</h2>
        <p className="text-gray-500 text-lg mb-8 max-w-2xl mx-auto">
          Plus de 10 000 entreprises utilisent déjà EmployéPro. Essayez gratuitement pendant 14 jours, sans carte bancaire.
        </p>
        <a href="/register-company" className="inline-flex items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-lg group">
          Essayer gratuitement
          <ArrowRight size={20} className="ml-2 group-hover:translate-x-1 transition-transform" />
        </a>
        <p className="text-gray-400 text-sm mt-4">Sans engagement • Annulation à tout moment</p>
      </section>
    </div>
  );
}

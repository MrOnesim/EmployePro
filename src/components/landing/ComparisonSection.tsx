import { useScrollReveal } from '../../hooks/useScrollReveal';
import { X, Check } from 'lucide-react';

const competitors = [
  {
    name: 'SAP SuccessFactors',
    price: '€100K+/an',
    features: [true, false, false, false, true, false, false, true],
    bad: 'Configuration longue, surcoût Afrique',
  },
  {
    name: 'Sage',
    price: '€50K+/an',
    features: [true, true, true, false, false, false, false, false],
    bad: 'Limité à l\'Europe, absence IA',
  },
  {
    name: 'EmployéPro Africa',
    price: 'À partir de 0€',
    features: [true, true, true, true, true, true, true, true],
    bad: null,
    isOurs: true,
  },
];

const featureLabels = [
  'Paie multi-pays',
  'Assistant IA',
  'Signature électronique',
  'Multi-devises',
  'Formation & Quiz',
  'Support 24/7',
  'Mode hors-ligne PWA',
  'Facturation fixe',
];

export default function ComparisonSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-gradient-to-b from-gray-50 to-white relative">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 border border-orange-100 mb-6">
            <span className="text-sm font-medium text-orange-600">Pourquoi EmployéPro ?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Le choix intelligent
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Conçu spécifiquement pour les besoins africains, sans les lourdeurs des logiciels occidentaux.
          </p>
        </div>

        <div className="overflow-x-auto bg-white rounded-3xl border border-gray-100 shadow-sm">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-5 px-6 text-sm font-medium text-gray-500">Fonctionnalités</th>
                {competitors.map((c) => (
                  <th key={c.name} className={`py-5 px-6 text-left text-sm font-semibold ${c.isOurs ? 'text-blue-600' : 'text-gray-700'}`}>
                    <div className="flex items-center gap-2 mb-0.5">
                      {c.isOurs && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">EP</span>
                        </div>
                      )}
                      {c.name}
                    </div>
                    <div className="text-xs text-gray-400 font-normal">{c.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map((label, i) => (
                <tr key={label} className="border-b border-gray-50">
                  <td className="py-4 px-6 text-sm text-gray-600">{label}</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`py-4 px-6 ${c.isOurs ? 'bg-blue-50/50' : ''}`}>
                      {c.features[i] ? (
                        <Check size={18} className={c.isOurs ? 'text-green-500' : 'text-gray-300'} />
                      ) : (
                        <X size={18} className="text-red-300" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-5 px-6 text-sm text-gray-500 font-medium">Prix</td>
                {competitors.map((c) => (
                  <td key={c.name} className={`py-5 px-6 ${c.isOurs ? 'bg-blue-50/50' : ''}`}>
                    <span className={`text-sm font-bold ${c.isOurs ? 'text-green-600' : 'text-gray-500'}`}>
                      {c.price}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-1">
          {competitors.filter(c => c.bad).map(c => (
            <p key={c.name} className="text-sm text-gray-400 text-right">
              — {c.name} : {c.bad}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { X, Check, Minus } from 'lucide-react';

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
    <section className="py-28 bg-[#0a0e27] relative">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-orange-400/20 bg-orange-500/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-orange-300">Pourquoi EmployéPro ?</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Le choix intelligent
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Conçu spécifiquement pour les besoins africains, sans les lourdeurs des logiciels occidentaux.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-white/[0.06]">
                <th className="text-left py-4 pr-8 text-sm font-medium text-gray-500">Fonctionnalités</th>
                {competitors.map((c) => (
                  <th key={c.name} className={`py-4 px-6 text-left text-sm font-semibold ${c.isOurs ? 'text-blue-400' : 'text-gray-300'}`}>
                    <div className="flex items-center gap-2">
                      {c.isOurs && (
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold">EP</span>
                        </div>
                      )}
                      {c.name}
                    </div>
                    <div className="text-xs text-gray-500 font-normal mt-0.5">{c.price}</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {featureLabels.map((label, i) => (
                <tr key={label} className="border-b border-white/[0.03]">
                  <td className="py-4 pr-8 text-sm text-gray-300">{label}</td>
                  {competitors.map((c) => (
                    <td key={c.name} className={`py-4 px-6 ${c.isOurs ? 'bg-blue-500/[0.03]' : ''}`}>
                      {c.features[i] ? (
                        <Check size={18} className={c.isOurs ? 'text-green-400' : 'text-gray-600'} />
                      ) : (
                        <X size={18} className="text-gray-600" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td className="py-6 pr-8 text-sm text-gray-500">Prix</td>
                {competitors.map((c) => (
                  <td key={c.name} className={`py-6 px-6 ${c.isOurs ? 'bg-blue-500/[0.03]' : ''}`}>
                    <span className={`text-sm font-bold ${c.isOurs ? 'text-green-400' : 'text-gray-400'}`}>
                      {c.price}
                    </span>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

        {competitors.map((c) => c.bad && (
          <div key={c.name} className="mt-4 text-sm text-gray-500 flex items-center gap-2 justify-end">
            <Minus size={14} />
            <span>{c.name} : {c.bad}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

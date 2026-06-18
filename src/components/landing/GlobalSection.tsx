import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Globe, MapPin, CheckCircle } from 'lucide-react';

const regions = [
  { name: 'Afrique de l\'Ouest', countries: 'Bénin, Côte d\'Ivoire, Sénégal, Mali, Ghana...' },
  { name: 'Afrique Centrale', countries: 'Cameroun, Gabon, RDC, Congo...' },
  { name: 'Afrique Australe', countries: 'Angola, Mozambique, Zambie...' },
  { name: 'Europe', countries: 'France, Belgique, Suisse, Luxembourg...' },
  { name: 'Afrique du Nord', countries: 'Maroc, Tunisie, Algérie...' },
  { name: 'Afrique de l\'Est', countries: 'Kenya, Éthiopie, Tanzanie, Ouganda...' },
];

export default function GlobalSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
              <Globe size={14} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-600">Couverture globale</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
              Disponible dans toute l'Afrique et au-delà
            </h2>
            <p className="text-gray-500 text-lg mb-8 leading-relaxed">
              EmployéPro est conçu pour les entreprises opérant sur le continent africain et à l'international.
              Indicateurs téléphoniques, monnaies locales et réglementations intégrées.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {[
                'Multi-devises (FCFA, EUR, USD, MAD, XAF...)',
                'Conformité fiscale locale',
                'Support multilingue (FR, EN, PT, AR, ES)',
                'Data Centers Europe & Afrique',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {regions.map((region) => (
              <div key={region.name} className="group bg-gray-50 hover:bg-blue-50 border border-gray-100 hover:border-blue-200 rounded-xl p-5 transition-all cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-md">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-800">{region.name}</div>
                    <div className="text-sm text-gray-500">{region.countries}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Globe, MapPin, CheckCircle } from 'lucide-react';

const regions = [
  { name: 'Afrique de l\'Ouest', countries: 'Bénin, Côte d\'Ivoire, Sénégal, Mali, Ghana...', flag: '🌍' },
  { name: 'Afrique Centrale', countries: 'Cameroun, Gabon, RDC, Congo...', flag: '🌍' },
  { name: 'Afrique Australe', countries: 'Angola, Mozambique, Zambie...', flag: '🌍' },
  { name: 'Europe', countries: 'France, Belgique, Suisse, Luxembourg...', flag: '🌍' },
  { name: 'Afrique du Nord', countries: 'Maroc, Tunisie, Algérie...', flag: '🌍' },
  { name: 'Afrique de l\'Est', countries: 'Kenya, Éthiopie, Tanzanie, Ouganda...', flag: '🌍' },
];

export default function GlobalSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-[#070a1e] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.02] via-transparent to-blue-600/[0.02]" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-blue-400/20 bg-blue-500/10 backdrop-blur-sm mb-6">
              <Globe size={14} className="text-blue-400" />
              <span className="text-sm font-medium text-blue-300">Couverture globale</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
              Disponible dans toute l'Afrique et au-delà
            </h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed">
              EmployéPro est conçu pour les entreprises opérant sur le continent africain et à l'international.
              Indicateurs téléphoniques, monnaies locales et réglementations intégrées.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                'Multi-devises (FCFA, EUR, USD, MAD, XAF...)',
                'Conformité fiscale locale (Côte d\'Ivoire, Cameroun...)',
                'Support multilingue (FR, EN, PT, AR, ES)',
                'Data Centers en Europe et Afrique',
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <CheckCircle size={16} className="text-green-400 shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Regions list */}
          <div className="space-y-3">
            {regions.map((region) => (
              <div key={region.name} className="group bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] hover:border-blue-500/30 rounded-xl p-5 transition-all cursor-default">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                    <MapPin size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-white">{region.name}</div>
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

import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Users, DollarSign, BarChart3, FileText, Smartphone, QrCode } from 'lucide-react';

const slides = [
  { icon: Users, label: 'Gestion des employés', desc: 'Fiches complètes, contrats, organigramme interactif.', color: 'from-blue-500 to-blue-600' },
  { icon: DollarSign, label: 'Paie multi-pays', desc: 'FCFA, EUR, USD — conformité locale automatique.', color: 'from-green-500 to-green-600' },
  { icon: BarChart3, label: 'Tableaux de bord', desc: 'KPIs en temps réel, exports PDF et Excel.', color: 'from-purple-500 to-purple-600' },
  { icon: Smartphone, label: 'Application mobile', desc: 'Pointage, congés, notifications depuis votre téléphone.', color: 'from-orange-500 to-orange-600' },
  { icon: QrCode, label: 'Pointage QR Code', desc: 'Scan sécurisé avec géolocalisation et anti-double-scan.', color: 'from-indigo-500 to-indigo-600' },
  { icon: FileText, label: 'Signature électronique', desc: 'Documents RH signés en ligne, valeur légale.', color: 'from-pink-500 to-pink-600' },
];

export default function ShowcaseSection() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % slides.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const s = slides[current];

  return (
    <section className="py-28 bg-white overflow-hidden">
      <div ref={ref} className={`relative max-w-6xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 ring-1 ring-blue-200 shadow-sm mb-6">
            <span className="text-sm font-medium text-blue-600">Découvrez l'application</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Une plateforme, des <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">possibilités infinies</span>
          </h2>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Mockup */}
          <div className="flex-1 relative">
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-6 shadow-2xl border border-gray-700 max-w-lg mx-auto">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700/50 min-h-[280px] flex flex-col items-center justify-center text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mb-4 shadow-lg transition-all duration-500`}>
                  <s.icon size={40} className="text-white" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">{s.label}</h3>
                <p className="text-gray-400 text-sm">{s.desc}</p>
                <div className="flex gap-1.5 mt-6">
                  {slides.map((_, i) => (
                    <button key={i} onClick={() => setCurrent(i)}
                      className={`h-1.5 rounded-full transition-all ${i === current ? 'w-8 bg-blue-500' : 'w-1.5 bg-gray-600'}`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl p-4 shadow-xl border border-gray-100 flex items-center gap-3">
              <QrCode size={20} className="text-blue-600" />
              <span className="text-sm font-medium text-gray-700">Pointage QR</span>
            </div>
          </div>

          {/* Feature list */}
          <div className="flex-1 space-y-6">
            {slides.map((item, i) => (
              <button
                key={i} onClick={() => setCurrent(i)}
                className={`w-full text-left flex items-center gap-4 p-4 rounded-xl transition-all ${
                  i === current
                    ? 'bg-blue-50 border border-blue-200 shadow-sm'
                    : 'bg-gray-50 border border-gray-100 hover:bg-gray-100'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0`}>
                  <item.icon size={20} className="text-white" />
                </div>
                <div>
                  <h4 className={`font-semibold ${i === current ? 'text-blue-700' : 'text-gray-700'}`}>{item.label}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

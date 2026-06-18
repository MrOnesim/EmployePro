import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

export default function DashboardSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-white relative overflow-hidden">
      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 mb-6">
            <span className="text-sm font-medium text-green-600">Plateforme temps réel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Votre tableau de bord en temps réel
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Visualisez et pilotez tous vos indicateurs RH depuis une interface unique, moderne et intuitive.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl border border-gray-200 overflow-hidden shadow-2xl shadow-blue-600/5">
            <div className="flex items-center justify-between px-8 py-5 border-b border-gray-50">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="text-sm text-gray-400 font-mono">Tableau de bord — EmployéPro</span>
              </div>
              <div className="w-8 h-8 rounded-full bg-blue-600" />
            </div>

            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Employés actifs', value: '1 247', change: '+12%' },
                    { label: 'Masse salariale', value: '2.4M FCFA', change: '+8%' },
                    { label: 'Taux présence', value: '95.2%', change: '+3%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-gray-800">{stat.value}</div>
                      <div className="text-xs text-green-600 mt-1">{stat.change}</div>
                    </div>
                  ))}
                </div>

                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-medium text-gray-700">Présences mensuelles</div>
                    <div className="flex gap-3">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        <span className="text-xs text-gray-500">2024</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-blue-200" />
                        <span className="text-xs text-gray-500">2023</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[60, 75, 55, 85, 70, 90, 65, 95, 80, 88, 72, 92].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t" style={{ height: `${h * 0.7}%` }} />
                        <div className="w-full bg-gradient-to-t from-blue-200 to-blue-100 rounded-t" style={{ height: `${h * 0.5}%` }} />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
                  <div className="text-sm font-medium text-gray-700 mb-4">Activité récente</div>
                  <div className="space-y-3">
                    {[
                      { text: 'Nouvel employé — Amadou Diallo', time: '2 min' },
                      { text: 'Bulletin de paie validé — Marketing', time: '15 min' },
                      { text: 'Demande congé approuvée — Marie D.', time: '1h' },
                      { text: 'Rapport RH généré par IA', time: '2h' },
                    ].map((act, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                        <div>
                          <div className="text-sm text-gray-600">{act.text}</div>
                          <div className="text-xs text-gray-400">Il y a {act.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-5 border border-green-100">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm font-medium text-green-700">Système OK</span>
                  </div>
                  <div className="text-xs text-gray-500">Tous les services fonctionnent normalement</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {['RGPD & CNIL', 'Chiffrement AES-256', 'Data centers Europe & Afrique', 'Audit trail complet'].map((item) => (
            <div key={item} className="flex items-center gap-2 justify-center">
              <CheckCircle size={14} className="text-green-500 shrink-0" />
              <span className="text-sm text-gray-500">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

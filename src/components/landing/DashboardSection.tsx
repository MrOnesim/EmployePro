import { useScrollReveal } from '../../hooks/useScrollReveal';
import { CheckCircle } from 'lucide-react';

export default function DashboardSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-[#070a1e] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-600/[0.03] via-transparent to-blue-600/[0.03]" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-400/20 bg-green-500/10 backdrop-blur-sm mb-6">
            <span className="text-sm font-medium text-green-300">Plateforme temps réel</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Votre tableau de bord en temps réel
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Visualisez et pilotez tous vos indicateurs RH depuis une interface unique, moderne et intuitive.
          </p>
        </div>

        {/* Dashboard mockup */}
        <div className="relative max-w-5xl mx-auto">
          <div className="bg-[#0d1233] rounded-3xl border border-white/[0.08] overflow-hidden shadow-2xl shadow-blue-600/10">
            {/* Mockup header */}
            <div className="flex items-center justify-between px-8 py-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="text-sm text-gray-500 font-mono">Tableau de bord — EmployéPro</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-20 h-2 rounded-full bg-gray-700" />
                <div className="w-8 h-8 rounded-full bg-blue-600" />
              </div>
            </div>

            {/* Mockup body */}
            <div className="p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left column - stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { label: 'Employés actifs', value: '1 247', change: '+12%' },
                    { label: 'Masse salariale', value: '2.4M FCFA', change: '+8%' },
                    { label: 'Taux présence', value: '95.2%', change: '+3%' },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06]">
                      <div className="text-xs text-gray-500 mb-1">{stat.label}</div>
                      <div className="text-2xl font-bold text-white">{stat.value}</div>
                      <div className="text-xs text-green-400 mt-1">{stat.change}</div>
                    </div>
                  ))}
                </div>

                {/* Chart mockup */}
                <div className="bg-white/[0.03] rounded-xl p-6 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-sm font-medium text-white">Présences mensuelles</div>
                    <div className="flex gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500" />
                      <span className="text-xs text-gray-500">2024</span>
                      <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                      <span className="text-xs text-gray-500">2023</span>
                    </div>
                  </div>
                  <div className="flex items-end gap-2 h-32">
                    {[60, 75, 55, 85, 70, 90, 65, 95, 80, 88, 72, 92].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <div
                          className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t"
                          style={{ height: `${h * 0.7}%` }}
                        />
                        <div
                          className="w-full bg-gradient-to-t from-blue-500/20 to-blue-400/20 rounded-t"
                          style={{ height: `${h * 0.5}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column - activity */}
              <div className="space-y-4">
                <div className="bg-white/[0.03] rounded-xl p-5 border border-white/[0.06]">
                  <div className="text-sm font-medium text-white mb-4">Activité récente</div>
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
                          <div className="text-sm text-gray-300">{act.text}</div>
                          <div className="text-xs text-gray-600">Il y a {act.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl p-5 border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={16} className="text-green-400" />
                    <span className="text-sm font-medium text-green-400">Système OK</span>
                  </div>
                  <div className="text-xs text-gray-500">Tous les services fonctionnent normalement</div>
                </div>
              </div>
            </div>
          </div>

          {/* Decorative glow */}
          <div className="absolute -inset-10 bg-gradient-to-r from-blue-600/10 via-transparent to-purple-600/10 rounded-3xl -z-10 blur-3xl" />
        </div>

        {/* Trust markers below */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
          {['RGPD & CNIL', 'Chiffrement AES-256', 'Data centers Europe & Afrique', 'Audit trail complet'].map((item) => (
            <div key={item} className="flex items-center gap-2 justify-center">
              <CheckCircle size={14} className="text-green-400 shrink-0" />
              <span className="text-sm text-gray-400">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

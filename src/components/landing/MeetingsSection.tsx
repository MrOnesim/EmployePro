import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Video, FileText, ListChecks, Clock } from 'lucide-react';

const steps = [
  { icon: Video, title: 'Réunion vidéo HD', desc: 'Visio intégrée avec partage d\'écran, recording et chat en direct.', color: 'from-blue-500 to-cyan-500' },
  { icon: FileText, title: 'Compte rendu IA', desc: 'Transcription automatique et résumé intelligent généré après chaque réunion.', color: 'from-purple-500 to-pink-500' },
  { icon: ListChecks, title: 'Tâches automatiques', desc: 'Les actions identifiées sont converties en tâches avec assignation et deadline.', color: 'from-green-500 to-emerald-500' },
  { icon: Clock, title: 'Suivi des décisions', desc: 'Historique complet, votes, validation et archivage des PV.', color: 'from-orange-500 to-red-500' },
];

export default function MeetingsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-[#070a1e] relative overflow-hidden">
      <div ref={ref} className={`max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-teal-400/20 bg-teal-500/10 backdrop-blur-sm mb-6">
            <Video size={14} className="text-teal-400" />
            <span className="text-sm font-medium text-teal-300">Réunions intelligentes</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Des réunions qui avanzent
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            De l'invitation au compte rendu, tout est automatisé pour gagner du temps.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step) => (
            <div key={step.title} className="group bg-white/[0.03] hover:bg-white/[0.06] rounded-2xl p-6 border border-white/[0.06] hover:border-teal-500/30 transition-all duration-300 cursor-default">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                <step.icon size={22} className="text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

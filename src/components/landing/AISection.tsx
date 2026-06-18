import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Bot, Sparkles, MessageSquare, BarChart3, FileText, Calendar } from 'lucide-react';

const examples = [
  { icon: BarChart3, question: 'Quels employés sont les plus performants ce trimestre ?', answer: 'Amadou Diallo (95%), Marie Dubois (92%), Jean Nkosi (88%) — détails disponibles dans le rapport ci-joint.', delay: 0 },
  { icon: FileText, question: 'Génère le rapport RH du mois dernier.', answer: 'Rapport généré : 14 recrutements, 98.2% présence, 2.4M FCFA masse salariale. Envoyé par email.', delay: 200 },
  { icon: Calendar, question: 'Quels sont les congés à venir cette semaine ?', answer: '5 employés en congé : Sophie T. (lun-mer), Marc K. (lun-ven), Amina D. (mar-jeu)...', delay: 400 },
];

export default function AISection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-28 bg-[#0a0e27] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/[0.03] rounded-full blur-[120px]" />

      <div ref={ref} className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-purple-400/20 bg-purple-500/10 backdrop-blur-sm mb-6">
            <Sparkles size={14} className="text-purple-400" />
            <span className="text-sm font-medium text-purple-300">Assistant IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Votre assistant RH intelligent
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Posez des questions, générez des rapports et prenez des décisions éclairées avec notre IA embarquée.
          </p>
        </div>

        {/* AI Chat mockup */}
        <div className="max-w-4xl mx-auto">
          {/* AI header */}
          <div className="bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-indigo-600/20 rounded-t-3xl p-6 border border-white/[0.08] border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-white">Assistant RH</div>
                <div className="flex items-center gap-1.5 text-sm text-green-400">
                  <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  En ligne — IA active
                </div>
              </div>
            </div>
          </div>

          {/* Chat messages */}
          <div className="bg-[#0d1233] border border-white/[0.08] border-t-0 rounded-b-3xl p-6 space-y-6">
            {examples.map((ex, i) => (
              <div key={i} className="space-y-3 animate-fade-in" style={{ animationDelay: `${ex.delay}ms` }}>
                {/* User message */}
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-600/20 rounded-2xl rounded-br-sm px-5 py-3 max-w-[80%] border border-blue-500/10">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare size={12} className="text-blue-400" />
                      <span className="text-xs text-blue-400">Vous</span>
                    </div>
                    <p className="text-sm text-gray-200">{ex.question}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                    <span className="text-white text-xs font-bold">M</span>
                  </div>
                </div>

                {/* AI response */}
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shrink-0">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-white/[0.04] rounded-2xl rounded-bl-sm px-5 py-3 max-w-[80%] border border-white/[0.06]">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={12} className="text-purple-400" />
                      <span className="text-xs text-purple-400">Assistant IA</span>
                    </div>
                    <p className="text-sm text-gray-300">{ex.answer}</p>
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

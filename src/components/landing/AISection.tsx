import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Bot, Sparkles, MessageSquare, BarChart3, FileText, Calendar, User } from 'lucide-react';

const examples = [
  {
    icon: BarChart3,
    question: 'Quels employés sont les plus performants ce trimestre ?',
    answer:
      'Amadou Diallo (95%), Marie Dubois (92%), Jean Nkosi (88%) — détails disponibles dans le rapport ci-joint.',
    delay: 0,
  },
  {
    icon: FileText,
    question: 'Génère le rapport RH du mois dernier.',
    answer:
      'Rapport généré : 14 recrutements, 98.2% présence, 2.4M € masse salariale. Envoyé par email.',
    delay: 200,
  },
  {
    icon: Calendar,
    question: 'Quels sont les congés à venir cette semaine ?',
    answer: '5 employés en congé : Sophie T. (lun-mer), Marc K. (lun-ven), Amina D. (mar-jeu)...',
    delay: 400,
  },
];

export default function AISection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section
      id="ai-section"
      className="py-28 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
    >
      <div
        ref={ref}
        className={`relative max-w-7xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 ring-1 ring-blue-200 shadow-sm mb-6">
            <Sparkles size={14} className="text-blue-600" />
            <span className="text-sm font-medium text-blue-600">Assistant IA</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4 tracking-tight">
            Votre assistant RH intelligent
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Posez des questions, générez des rapports et prenez des décisions éclairées avec notre
            IA embarquée.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 via-blue-100 to-blue-50 rounded-t-3xl p-6 border border-gray-200 border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shadow-lg">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-800">Assistant RH</div>
                <div className="flex items-center gap-1.5 text-sm text-blue-600">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  En ligne — IA active
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white border border-gray-200 border-t-0 rounded-b-3xl p-6 space-y-6 shadow-sm">
            {examples.map((ex, i) => (
              <div
                key={i}
                className="space-y-3 animate-stagger"
                style={{ animationDelay: `${i * 300}ms` }}
              >
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-blue-50 rounded-2xl rounded-br-sm px-5 py-3 max-w-[80%] border border-blue-100">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare size={12} className="text-blue-500" />
                      <span className="text-xs text-blue-600 font-medium">Vous</span>
                    </div>
                    <p className="text-sm text-gray-700">{ex.question}</p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0 shadow-sm">
                    <User size={16} className="text-white" />
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center shrink-0 shadow-sm">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-gray-50 rounded-2xl rounded-bl-sm px-5 py-3 max-w-[80%] border border-gray-100">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles size={12} className="text-blue-500" />
                      <span className="text-xs text-blue-600 font-medium">Assistant IA</span>
                    </div>
                    <p className="text-sm text-gray-600">{ex.answer}</p>
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

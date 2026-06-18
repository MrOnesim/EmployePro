import { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Send, Bot, User, TrendingUp, Users, Clock, DollarSign, AlertTriangle, BarChart3, Lightbulb, Zap, Sparkles, Cpu, Globe, Search } from 'lucide-react';
import { QUICK_QUESTIONS } from '../constants';
import { processQuestion } from '../ai/rules';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  suggestions?: string[];
}

const icons: Record<string, typeof BarChart3> = {
  BarChart3, Users, DollarSign, TrendingUp, Clock, AlertTriangle, Globe, Lightbulb, Zap, Search,
};

export default function AIAssistant() {
  const { employees, attendance, leaves, currentCompany, vaultItems, rewardTransactions, equipment, wellnessSurveys, wellnessResponses, salaryAdvances, salaryTransfers, quizzes, certificates, currentUser } = useApp();
  const [messages, setMessages] = useState<Message[]>([{
    id: '1',
    content: 'Bonjour ! Je suis votre assistant RH intelligent de EmployéPro. Je peux analyser vos données RH, détecter des anomalies, faire des recommandations, ou répondre à des questions sur vos employés, salaires, présences et congés. Posez-moi vos questions !',
    sender: 'ai',
    timestamp: new Date(),
    suggestions: ['Résumé complet de l\'entreprise', 'Qui est absent aujourd\'hui ?', 'Analyse de la masse salariale', 'Top 3 des meilleurs employés'],
  }]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    return () => {
      if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    };
  }, []);

  const handleSend = () => {
    if (!inputValue.trim() || isTyping) return;
    const userMsg: Message = { id: String(Date.now()), content: inputValue, sender: 'user', timestamp: new Date() };
    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);
    setShowSuggestions(false);

    typingTimeoutRef.current = setTimeout(() => {
      const extraContext = { vaultItems: vaultItems.filter(v => v.employeeId === currentUser?.id), rewardTransactions: rewardTransactions.filter(r => r.employeeId === currentUser?.id), equipment: equipment.filter(e => e.assigneeId === currentUser?.id), wellnessSurveys, wellnessResponses, salaryAdvances: salaryAdvances.filter(s => s.employeeId === currentUser?.id), salaryTransfers: salaryTransfers.filter(s => s.employeeId === currentUser?.id), quizzes, certificates: certificates.filter(c => c.employeeId === currentUser?.id) };
      const result = processQuestion(inputValue, employees, attendance, leaves, currentCompany, extraContext);
      const aiMsg: Message = { id: String(Date.now() + 1), content: result.content, sender: 'ai', timestamp: new Date(), suggestions: result.suggestions };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, Math.min(500 + inputValue.length * 20, 1500));
  };

  const formatContent = (content: string) => {
    const escaped = content.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return escaped.split('\n').map((line, i) => (
      <p key={i} className="leading-relaxed">{line || '\u00A0'}</p>
    ));
  };

  const formatTime = (date: Date) => date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 rounded-t-2xl p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <Cpu size={24} />
            </div>
            <div>
              <h1 className="font-bold text-lg flex items-center">EmployePro AI <Sparkles size={16} className="ml-2 text-yellow-300" /></h1>
              <p className="text-blue-200 text-xs">Assistant RH intelligent • Données en temps réel</p>
            </div>
          </div>
          <span className="text-xs text-blue-200 bg-white/10 px-3 py-1.5 rounded-full flex items-center">
            <Zap size={12} className="mr-1" />
            {messages.filter((m) => m.sender === 'user').length} questions
          </span>
        </div>
      </div>

      {showSuggestions && messages.length <= 2 && (
        <div className="bg-gradient-to-b from-blue-50 to-white border-b border-blue-100 px-4 py-3">
          <p className="text-xs font-medium text-blue-600 mb-2 flex items-center"><Lightbulb size={12} className="mr-1" />Questions populaires:</p>
          <div className="flex overflow-x-auto space-x-2 pb-1">
            {QUICK_QUESTIONS.slice(0, 5).map((q, i) => {
              const Icon = icons[q.icon] || BarChart3;
              return (
                <button key={i} onClick={() => { setInputValue(q.text); setShowSuggestions(false); }}
                  className="flex items-center space-x-1.5 px-3 py-1.5 bg-white hover:bg-blue-100 border border-blue-200 rounded-full text-xs whitespace-nowrap transition-all">
                  <Icon size={12} className={q.color} />
                  <span className="text-gray-700">{q.text.length > 25 ? `${q.text.substring(0, 25)}...` : q.text}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="flex-1 bg-gray-50 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${msg.sender === 'user' ? 'bg-blue-600' : 'bg-gradient-to-br from-blue-500 to-indigo-600'}`}>
                {msg.sender === 'user' ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
              </div>
              <div>
                <div className={`rounded-2xl px-4 py-3 ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-br-sm' : 'bg-white text-gray-800 rounded-bl-sm shadow-sm border border-gray-100'}`}>
                  {msg.sender === 'user' ? <p>{msg.content}</p> : <div className="text-sm space-y-1">{formatContent(msg.content)}</div>}
                </div>
                {msg.sender === 'ai' && msg.suggestions && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {msg.suggestions.map((s, i) => (
                      <button key={i} onClick={() => setInputValue(s)}
                        className="text-xs px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full hover:bg-blue-100 transition-colors border border-blue-100">{s}</button>
                    ))}
                  </div>
                )}
                <p className={`text-xs text-gray-400 mt-1 ${msg.sender === 'user' ? 'text-right' : ''}`}>{formatTime(msg.timestamp)}</p>
              </div>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex items-start space-x-2">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <Bot size={16} className="text-white" />
            </div>
            <div className="bg-white rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm border border-gray-100">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="bg-white border-t border-gray-100 rounded-b-2xl p-4">
        <div className="flex items-center space-x-3">
          <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Posez votre question sur les RH..."
            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none text-sm" disabled={isTyping} />
          <button onClick={handleSend} disabled={!inputValue.trim() || isTyping}
            className="p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50 flex-shrink-0">
            <Send size={18} />
          </button>
        </div>
        <div className="flex items-center justify-center mt-2 text-xs text-gray-400">
          <Globe size={12} className="mr-1" />EmployePro AI - Plateforme RH globale
        </div>
      </div>
    </div>
  );
}

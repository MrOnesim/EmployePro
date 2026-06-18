import { useScrollReveal } from '../../hooks/useScrollReveal';

const clients = [
  { name: 'AfriTech', color: 'from-blue-500 to-cyan-500' },
  { name: 'SaharaCorp', color: 'from-orange-500 to-red-500' },
  { name: 'NileGroup', color: 'from-green-500 to-emerald-500' },
  { name: 'Magnet', color: 'from-purple-500 to-pink-500' },
  { name: 'Kibo', color: 'from-yellow-500 to-orange-500' },
  { name: 'Zamani', color: 'from-indigo-500 to-purple-500' },
];

export default function ClientsSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section className="py-20 bg-white border-b border-gray-100">
      <div ref={ref} className={`max-w-6xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider mb-12">
          Ils nous font confiance
        </p>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center">
          {clients.map((client) => (
            <div key={client.name} className="flex items-center justify-center">
              <div className="flex items-center gap-2 opacity-40 hover:opacity-70 transition-all group cursor-default">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${client.color} flex items-center justify-center`}>
                  <span className="text-white font-bold text-xs">{client.name.charAt(0)}</span>
                </div>
                <span className="text-gray-500 font-semibold text-sm group-hover:text-gray-700 transition-colors">
                  {client.name}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

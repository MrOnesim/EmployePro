export default function MarqueeLogosSection() {
  const logos = [
    { name: 'Orange', initials: 'OR', color: 'from-orange-500' },
    { name: 'TotalEnergies', initials: 'TE', color: 'from-red-500' },
    { name: 'Sonatel', initials: 'SN', color: 'from-blue-500' },
    { name: 'Ecobank', initials: 'EB', color: 'from-green-500' },
    { name: 'Air France', initials: 'AF', color: 'from-blue-600' },
    { name: 'BICIS', initials: 'BC', color: 'from-yellow-500' },
    { name: 'MTN', initials: 'MN', color: 'from-yellow-600' },
    { name: 'CFAO', initials: 'CF', color: 'from-purple-500' },
  ];

  return (
    <section className="py-12 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <p className="text-center text-sm font-medium text-gray-400 uppercase tracking-wider">
          Ils nous font confiance
        </p>
      </div>
      <div className="relative [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
        <div className="flex gap-8 items-center w-max animate-slide hover:[animation-play-state:paused]" style={{ animationDuration: '25s' }}>
          {[...logos, ...logos].map((l, i) => (
            <div key={i} className="flex items-center gap-3 bg-white px-5 py-3 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${l.color} to-blue-600 flex items-center justify-center`}>
                <span className="text-white font-bold text-sm">{l.initials}</span>
              </div>
              <span className="text-gray-700 font-medium whitespace-nowrap">{l.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

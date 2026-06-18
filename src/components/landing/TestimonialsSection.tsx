import { useState, useEffect } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import { Star, MapPin, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Amadou Diallo',
    role: 'CEO',
    company: 'AfriTech Solutions',
    country: 'Sénégal',
    text: 'EmployéPro a révolutionné notre gestion RH. Nous sommes passés de 3 logiciels différents à une seule plateforme. Gain de temps de 40%.',
    rating: 5,
    initials: 'AD',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    name: 'Marie Dubois',
    role: 'DRH',
    company: 'Innovate Paris',
    country: 'France',
    text: 'L\'assistant IA est bluffant. Il génère des rapports que je mettais 3 heures à produire. La paie multi-pays marche parfaitement.',
    rating: 5,
    initials: 'MD',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    name: 'Jean Nkosi',
    role: 'Directeur RH',
    company: 'Groupe Kamer',
    country: 'Cameroun',
    text: 'Enfin une solution qui comprend les réalités africaines. FCFA, impôts locaux, signatures électroniques... Tout est là.',
    rating: 5,
    initials: 'JN',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    name: 'Amina Benali',
    role: 'CHRO',
    company: 'Maghreb Industries',
    country: 'Maroc',
    text: 'Nous gérons 3 000 employés dans 5 pays. EmployéPro nous offre une vision consolidée de notre capital humain.',
    rating: 5,
    initials: 'AB',
    gradient: 'from-orange-500 to-red-500',
  },
];

export default function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const { ref, isVisible } = useScrollReveal();

  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % testimonials.length), 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-28 bg-[#0a0e27] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/[0.02] via-transparent to-purple-600/[0.02]" />

      <div ref={ref} className={`relative max-w-6xl mx-auto px-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-400/20 bg-yellow-500/10 backdrop-blur-sm mb-6">
            <Star size={14} className="text-yellow-400" />
            <span className="text-sm font-medium text-yellow-300">Ils nous font confiance</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">
            Ce qu'ils disent
          </h2>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className={`transition-all duration-500 ${i === current ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0 pointer-events-none'}`}
            >
              <div className="bg-white/[0.03] backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-white/[0.08]">
                <Quote size={40} className="text-blue-500/30 mb-4" />
                <p className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8">"{t.text}"</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${t.gradient} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-lg">{t.initials}</span>
                    </div>
                    <div>
                      <div className="font-bold text-white">{t.name}</div>
                      <div className="text-sm text-gray-400">{t.role}, {t.company}</div>
                      <div className="flex items-center gap-1 text-sm text-gray-500 mt-0.5">
                        <MapPin size={12} />
                        {t.country}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} size={16} className="text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`w-2.5 h-2.5 rounded-full transition-all ${
                  i === current ? 'bg-blue-500 w-8' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

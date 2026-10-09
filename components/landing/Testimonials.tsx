import { Quote } from "lucide-react";

export function Testimonials() {
  const testimonials = [
    {
      quote: "GrandHotel completely transformed how we run our boutique properties. Check-in times are down 90% and guest satisfaction is through the roof.",
      name: "Sarah Jenkins",
      role: "General Manager",
      property: "The Azure Boutique",
      avatar: "SJ"
    },
    {
      quote: "The unified dashboard means I no longer have to log into 5 different OTAs to manage our rates. The channel manager is flawless and instantaneous.",
      name: "Marcus Thorne",
      role: "Revenue Director",
      property: "Thorne Hotel Group",
      avatar: "MT"
    },
    {
      quote: "Housekeeping and front desk finally communicate without radios. The automated scheduling saves our team over 15 hours every single week.",
      name: "Elena Rodriguez",
      role: "Operations Manager",
      property: "Vista Serviced Apartments",
      avatar: "ER"
    }
  ];

  return (
    <section className="py-24 px-6 bg-brand-dark">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Loved by Hoteliers</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Don't just take our word for it. See what property managers around the world say about GrandHotel.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-brand-darker border border-white/5 rounded-2xl p-8 hover:border-brand-gold/20 transition-colors">
              <Quote className="w-10 h-10 text-brand-gold/20 mb-6" />
              <p className="text-gray-300 mb-8 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand-green/30 border border-brand-gold/30 flex items-center justify-center text-brand-gold font-bold">
                  {t.avatar}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm">{t.name}</h4>
                  <p className="text-gray-400 text-xs">{t.role}, <span className="text-brand-gold">{t.property}</span></p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

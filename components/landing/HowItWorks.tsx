import { Building2, RefreshCw, Zap } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: Building2,
      title: "1. Connect properties",
      description: "Import your existing properties, rooms, and rates in seconds."
    },
    {
      icon: RefreshCw,
      title: "2. Sync channels",
      description: "Connect to Airbnb, Booking.com, and Expedia with zero double-bookings."
    },
    {
      icon: Zap,
      title: "3. Automate operations",
      description: "Put housekeeping, guest messaging, and payments on autopilot."
    }
  ];

  return (
    <section className="py-24 px-6 bg-brand-darker relative border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">How It Works</h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Get up and running in minutes, not months. Our streamlined onboarding gets your properties online instantly.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connecting Line (Desktop only) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gradient-to-r from-brand-gold/0 via-brand-gold/30 to-brand-gold/0 z-0"></div>

          {steps.map((step, i) => (
            <div key={i} className="relative z-10 flex flex-col items-center text-center group">
              <div className="w-24 h-24 bg-brand-dark border-2 border-white/10 rounded-full flex items-center justify-center mb-6 group-hover:border-brand-gold group-hover:shadow-[0_0_30px_rgba(203,168,100,0.2)] transition-all duration-300">
                <step.icon className="w-10 h-10 text-brand-gold" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
              <p className="text-gray-400">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

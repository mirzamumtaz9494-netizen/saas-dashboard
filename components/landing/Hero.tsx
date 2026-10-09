import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function Hero() {
  return (
    <section className="relative pt-40 pb-20 overflow-hidden">
      {/* Background gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-[500px] bg-brand-green/20 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute top-40 left-1/2 -translate-x-1/2 w-full max-w-2xl h-[300px] bg-brand-gold/10 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-brand-gold/30 bg-brand-gold/5 mb-8">
          <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
          <span className="text-brand-gold text-xs font-semibold tracking-wider uppercase">GrandHotel 2.0 is Live</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-8 leading-tight">
          Run every property from <br className="hidden md:block" />
          one <span className="text-brand-gold font-serif italic pr-2">powerful</span> workspace.
        </h1>
        
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          The ultimate hospitality operating system. Manage reservations, automate guest communication, and increase revenue across all your properties.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link href="/signup" className="w-full sm:w-auto bg-brand-gold text-brand-darker font-medium px-8 py-3.5 rounded-full hover:bg-brand-gold-light transition">
            Start Your Free Trial
          </Link>
          <Link href="/demo" className="w-full sm:w-auto bg-transparent text-white font-medium px-8 py-3.5 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold transition">
            Schedule a Demo
          </Link>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-400">
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> No credit card required</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> 14-day free trial</div>
          <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold" /> Cancel anytime</div>
        </div>
      </div>
    </section>
  );
}

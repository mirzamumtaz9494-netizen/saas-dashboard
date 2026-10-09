import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function Integrations() {
  return (
    <section className="py-24 bg-brand-darker border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left: Diagram */}
          <div className="relative aspect-square md:aspect-auto md:h-[500px] flex items-center justify-center">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand-gold/10 blur-[80px] rounded-full"></div>
            
            {/* Hub Diagram */}
            <div className="relative w-full h-full max-w-[400px] max-h-[400px]">
              
              {/* Central Node */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-brand-green border-2 border-brand-gold rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(203,168,100,0.3)] z-20">
                <span className="text-brand-gold font-bold text-4xl leading-none font-serif italic">G</span>
              </div>

              {/* Connecting Lines with animated pulse */}
              <svg className="absolute top-0 left-0 w-full h-full z-0" viewBox="0 0 400 400">
                <style>{`
                  .pulse-line { stroke-dasharray: 4; animation: march 20s linear infinite; }
                  @keyframes march { to { stroke-dashoffset: -100; } }
                `}</style>
                <line x1="200" y1="200" x2="200" y2="40" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="338" y2="120" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="338" y2="280" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="200" y2="360" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="62" y2="280" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
                <line x1="200" y1="200" x2="62" y2="120" className="stroke-brand-gold/40 pulse-line" strokeWidth="1.5" />
              </svg>

              {/* Outer Nodes */}
              {/* Top - PayGateway */}
              <div className="absolute top-[40px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10">
                <span className="text-white text-xs font-bold">PayGateway</span>
              </div>
              
              {/* Top Right - GlobalOTA */}
              <div className="absolute top-[120px] left-[338px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10">
                <span className="text-blue-400 text-xs font-bold text-center leading-tight">Booking<br/>.com</span>
              </div>

              {/* Bottom Right - TravelNet */}
              <div className="absolute top-[280px] left-[338px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10">
                <span className="text-yellow-400 text-xs font-bold">TravelNet</span>
              </div>

              {/* Bottom - VacationRentals */}
              <div className="absolute top-[360px] left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10">
                <span className="text-red-400 text-xs font-bold">VacationRentals</span>
              </div>

              {/* Bottom Left - CloudBooks */}
              <div className="absolute top-[280px] left-[62px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10 text-center">
                <span className="text-green-400 text-xs font-bold">Quick<br/>Books</span>
              </div>

              {/* Top Left - AcctPlus */}
              <div className="absolute top-[120px] left-[62px] -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-brand-dark border border-white/20 rounded-xl flex items-center justify-center z-10">
                <span className="text-blue-300 text-xs font-bold">AcctPlus</span>
              </div>

            </div>
          </div>

          {/* Right: Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Connects seamlessly with tools you already use</h2>
            <p className="text-gray-400 mb-8 leading-relaxed text-lg">
              No need to rip and replace your entire tech stack. GrandHotel integrates natively with the world's leading OTAs, payment gateways, accounting software, and smart lock providers.
            </p>
            <ul className="space-y-4 mb-8 text-white">
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold">✓</div>
                Real-time 2-way sync with 100+ OTAs
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold">✓</div>
                Direct accounting ledger export
              </li>
              <li className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-brand-gold/20 flex items-center justify-center text-brand-gold text-sm font-bold">✓</div>
                Automated smart lock code generation
              </li>
            </ul>
            <Link href="/product/integrations" className="inline-flex items-center gap-2 text-brand-gold font-medium hover:text-white transition">
              View all integrations <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

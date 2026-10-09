import Image from "next/image";
import Link from "next/link";

export function FinalCTA() {
  return (
    <section className="bg-brand-dark pt-24 pb-0 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Product in Action (Moved from Footer) */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-white mb-4">Product in Action</h2>
            <p className="text-gray-400">Everything you need, right where you need it.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-white/10">
              <Image src="https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80" alt="Smart Lock Integration" fill className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-white/10">
              <Image src="https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80" alt="Mobile Guest Check-in App" fill className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group border border-white/10">
              <Image src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80" alt="GrandHotel Property Dashboard View" fill className="object-cover transition duration-700 group-hover:scale-105" />
            </div>
          </div>
        </div>

        {/* Final CTA Banner */}
        <div className="bg-brand-green border border-brand-gold/30 rounded-3xl p-12 text-center relative overflow-hidden mb-24 shadow-2xl shadow-brand-gold/5">
          {/* Decorative glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-brand-gold/5 blur-[120px] rounded-full pointer-events-none"></div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to run your property smarter?</h2>
          <p className="text-gray-300 max-w-2xl mx-auto text-lg mb-10 relative z-10">Join thousands of property managers who are saving time, increasing revenue, and delivering better guest experiences.</p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative z-10">
            <Link href="/signup" className="w-full sm:w-auto bg-brand-gold text-brand-darker font-medium px-8 py-4 rounded-full hover:bg-brand-gold-light transition">
              Start Your Free Trial
            </Link>
            <Link href="/demo" className="w-full sm:w-auto bg-transparent text-white font-medium px-8 py-4 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold transition">
              Schedule a Demo
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}

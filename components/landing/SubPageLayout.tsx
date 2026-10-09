import { Navbar } from "@/components/landing/Navbar";
import { Footer } from "@/components/landing/Footer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface SubPageLayoutProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SubPageLayout({ title, description, children }: SubPageLayoutProps) {
  return (
    <div className="bg-brand-dark min-h-screen font-sans flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32">
        {/* Page Hero */}
        <section className="relative pb-16 pt-8 overflow-hidden border-b border-white/5">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-[300px] bg-brand-green/20 blur-[100px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">{title}</h1>
            <p className="text-xl text-gray-400 leading-relaxed max-w-2xl mx-auto">{description}</p>
          </div>
        </section>

        {/* Page Content Blocks */}
        <div className="py-20">
          {children}
        </div>
        
        {/* Universal Mini-CTA for Subpages */}
        <section className="py-24 bg-brand-darker border-y border-white/5 text-center px-6">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-white mb-6">Ready to see it in action?</h2>
            <p className="text-gray-400 mb-10 text-lg">Join the thousands of properties running on GrandStay today.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/signup" className="bg-brand-gold text-brand-darker font-medium px-8 py-3 rounded-full hover:bg-brand-gold-light transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">
                Start Free Trial
              </Link>
              <Link href="/demo" className="bg-transparent text-white font-medium px-8 py-3 rounded-full border border-white/20 hover:border-brand-gold transition flex items-center justify-center gap-2">
                Book a Demo <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

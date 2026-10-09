import { ShieldCheck, Lock, FileCheck } from "lucide-react";

export function SecurityStrip() {
  return (
    <section className="py-12 bg-brand-darker border-y border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-24">
          <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-default">
            <ShieldCheck className="w-8 h-8 text-brand-gold" />
            <div>
              <p className="font-bold text-sm text-white">SOC 2 Type II</p>
              <p className="text-xs">Certified Compliant</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          
          <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-default">
            <FileCheck className="w-8 h-8 text-brand-gold" />
            <div>
              <p className="font-bold text-sm text-white">GDPR Ready</p>
              <p className="text-xs">Data Privacy Enforced</p>
            </div>
          </div>
          <div className="hidden md:block w-px h-10 bg-white/10"></div>
          
          <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-default">
            <Lock className="w-8 h-8 text-brand-gold" />
            <div>
              <p className="font-bold text-sm text-white">AES-256 Encryption</p>
              <p className="text-xs">Banking-Grade Security</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

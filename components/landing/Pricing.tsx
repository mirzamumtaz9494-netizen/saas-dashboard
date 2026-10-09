"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export function Pricing() {
  const [billing, setBilling] = useState<"monthly" | "yearly">("monthly");

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Simple, transparent pricing</h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-8">Choose the plan that fits your hospitality business. No hidden fees.</p>
        
        {/* Billing Toggle */}
        <div className="flex items-center justify-center gap-4">
          <span className={`text-sm font-medium ${billing === 'monthly' ? 'text-white' : 'text-gray-400'}`}>Monthly</span>
          <button 
            onClick={() => setBilling(b => b === "monthly" ? "yearly" : "monthly")}
            className="w-14 h-7 bg-brand-darker border border-white/20 rounded-full relative focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold"
            aria-label="Toggle billing period"
          >
            <div className={`absolute top-1 w-5 h-5 bg-brand-gold rounded-full transition-all duration-300 ${billing === 'monthly' ? 'left-1' : 'left-8'}`}></div>
          </button>
          <span className={`text-sm font-medium ${billing === 'yearly' ? 'text-white' : 'text-gray-400'}`}>
            Yearly <span className="text-brand-gold text-xs ml-1 bg-brand-gold/10 px-2 py-0.5 rounded-full">-20%</span>
          </span>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-stretch">
        {/* Starter */}
        <div className="bg-brand-dark border border-white/10 rounded-2xl p-8 hover:border-brand-gold/30 transition flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-2 text-white">Starter</h3>
          <p className="text-gray-400 text-sm mb-6 h-10">For individual properties and B&Bs</p>
          <div className="mb-6 h-16">
            <span className="text-5xl font-bold text-white">${billing === 'monthly' ? '49' : '39'}</span><span className="text-gray-400">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm text-gray-300 flex-1">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Up to 20 Rooms</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Basic Calendar</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Guest Profiles</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Email Support</li>
          </ul>
          <Link href="/signup" className="w-full text-center block py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition font-medium mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">Start Free Trial</Link>
        </div>

        {/* Professional (Highlighted) */}
        <div className="bg-brand-green/20 border border-brand-gold rounded-2xl p-8 relative shadow-2xl shadow-brand-gold/5 flex flex-col h-full md:-mt-4 md:mb-4">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-darker text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
            Most Popular
          </div>
          <h3 className="text-xl font-semibold mb-2 text-brand-gold">Professional</h3>
          <p className="text-gray-400 text-sm mb-6 h-10">For boutique hotels & managers</p>
          <div className="mb-6 h-16">
            <span className="text-5xl font-bold text-white">${billing === 'monthly' ? '149' : '119'}</span><span className="text-gray-400">/mo</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm text-gray-300 flex-1">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Up to 10 Properties</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Advanced Analytics</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> 24/7 Priority Support</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Custom Integrations</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Automated Messaging</li>
          </ul>
          <Link href="/signup" className="w-full text-center block py-3 rounded-full bg-brand-gold text-brand-darker hover:bg-brand-gold-light transition font-bold mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark">Start Free Trial</Link>
        </div>

        {/* Enterprise */}
        <div className="bg-brand-dark border border-white/10 rounded-2xl p-8 hover:border-brand-gold/30 transition flex flex-col h-full">
          <h3 className="text-xl font-semibold mb-2 text-white">Enterprise</h3>
          <p className="text-gray-400 text-sm mb-6 h-10">For large hotel chains</p>
          <div className="mb-6 h-16 flex flex-col justify-center">
            <span className="text-4xl font-bold text-white">Custom</span>
            <span className="text-brand-gold text-xs mt-1">Volume discounts available</span>
          </div>
          <ul className="space-y-4 mb-8 text-sm text-gray-300 flex-1">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Unlimited Properties</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Dedicated Account Manager</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Custom Development</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> White Labeling</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-gray-500"/> Custom SLA</li>
          </ul>
          <Link href="/demo" className="w-full text-center block py-3 rounded-full border border-white/20 text-white hover:bg-white/5 transition font-medium mt-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold">Contact Sales</Link>
        </div>
      </div>
    </section>
  );
}

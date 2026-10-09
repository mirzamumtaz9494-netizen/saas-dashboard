import { SubPageLayout } from "@/components/landing/SubPageLayout";
import { Pricing as PricingSection } from "@/components/landing/Pricing";
import { FAQ } from "@/components/landing/FAQ";

export const metadata = {
  title: "Pricing | GrandStay",
  description: "Simple, transparent pricing for properties of all sizes."
};

export default function PricingPage() {
  return (
    <SubPageLayout title="Pricing Plans" description="Choose the right plan for your property portfolio. Start with a 14-day free trial on any tier.">
      
      {/* The Pricing Cards Section (Reused from landing) */}
      <div className="-mt-20">
        <PricingSection />
      </div>

      {/* Feature Comparison Table */}
      <section className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">Compare Plans</h2>
          <p className="text-gray-400">A detailed breakdown of what's included.</p>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10">
                <th className="py-4 px-6 text-gray-400 font-medium w-2/5">Feature</th>
                <th className="py-4 px-6 text-white font-bold text-center">Starter</th>
                <th className="py-4 px-6 text-brand-gold font-bold text-center">Professional</th>
                <th className="py-4 px-6 text-white font-bold text-center">Enterprise</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">Max Properties</td>
                <td className="py-4 px-6 text-gray-400 text-center">1</td>
                <td className="py-4 px-6 text-white text-center font-medium">Up to 10</td>
                <td className="py-4 px-6 text-white text-center font-medium">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">Staff Accounts</td>
                <td className="py-4 px-6 text-gray-400 text-center">5</td>
                <td className="py-4 px-6 text-white text-center font-medium">Unlimited</td>
                <td className="py-4 px-6 text-white text-center font-medium">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">OTA Channels (Booking, Expedia)</td>
                <td className="py-4 px-6 text-gray-400 text-center">3 included</td>
                <td className="py-4 px-6 text-white text-center font-medium">Unlimited</td>
                <td className="py-4 px-6 text-white text-center font-medium">Unlimited</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">Automated Guest Messaging</td>
                <td className="py-4 px-6 text-gray-500 text-center">—</td>
                <td className="py-4 px-6 text-brand-gold text-center font-bold">✓</td>
                <td className="py-4 px-6 text-brand-gold text-center font-bold">✓</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">Dynamic Pricing Engine</td>
                <td className="py-4 px-6 text-gray-500 text-center">—</td>
                <td className="py-4 px-6 text-brand-gold text-center font-bold">✓</td>
                <td className="py-4 px-6 text-brand-gold text-center font-bold">✓</td>
              </tr>
              <tr className="border-b border-white/5 hover:bg-white/5 transition">
                <td className="py-4 px-6 text-gray-300">Dedicated Account Manager</td>
                <td className="py-4 px-6 text-gray-500 text-center">—</td>
                <td className="py-4 px-6 text-gray-500 text-center">—</td>
                <td className="py-4 px-6 text-brand-gold text-center font-bold">✓</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Reused */}
      <FAQ />

    </SubPageLayout>
  );
}

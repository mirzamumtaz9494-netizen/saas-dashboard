import { SubPageLayout } from "@/components/landing/SubPageLayout";

export const metadata = {
  title: "Press | GrandHotel",
  description: "Media kit, brand assets, and recent press releases."
};

export default function Page() {
  return (
    <SubPageLayout title="Press" description="Media kit, brand assets, and recent press releases.">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Content Block 1 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Streamline Your Workflow</h2>
            <p className="text-gray-400 leading-relaxed">
              We understand the challenges you face daily. This module is specifically designed to remove friction, automate repetitive tasks, and give you back hours of your day. Focus on what truly matters: your guests.
            </p>
          </div>
          <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <span className="text-brand-gold/50 font-medium">Feature Preview</span>
          </div>
        </div>

        {/* Content Block 2 */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center order-2 md:order-1">
            <span className="text-brand-gold/50 font-medium">Analytics Dashboard</span>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-white mb-4">Data-Driven Decisions</h2>
            <p className="text-gray-400 leading-relaxed">
              Stop guessing and start knowing. Access real-time data and actionable insights exactly when you need them. Our robust reporting engine does the heavy lifting so you don't have to.
            </p>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}

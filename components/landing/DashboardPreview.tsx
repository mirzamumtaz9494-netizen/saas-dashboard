import Image from "next/image";

export function DashboardPreview() {
  return (
    <section className="relative z-10 pb-20">
      <div className="max-w-5xl mx-auto px-6 relative">
        <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(203,168,100,0.1)]">
          <div className="absolute top-0 left-0 w-full h-12 bg-[#0A1610] border-b border-white/5 flex items-center px-4 gap-2 z-10">
            <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
            <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
          </div>
          <Image 
            src="/images/dashboard-mockup.jpg" 
            alt="GrandStay property management dashboard showing occupancy and revenue metrics" 
            width={1200} 
            height={800} 
            className="w-full h-auto mt-12 object-cover bg-[#0f1f16]"
            priority
          />
        </div>
      </div>
    </section>
  );
}

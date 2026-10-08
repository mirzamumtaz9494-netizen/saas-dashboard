export function SocialProof() {
  return (
    <section id="trusted-by" className="border-y bg-muted/30 py-10">
      <div className="container">
        <p className="text-center text-sm font-semibold text-muted-foreground mb-8">
          TRUSTED BY OVER 2,000 HOSPITALITY BUSINESSES
        </p>
        <div className="flex flex-wrap justify-center gap-10 md:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all">
          {/* Using text for demo purposes, normally these would be SVG logos */}
          <div className="flex items-center text-xl font-bold font-serif">Grand Hotels</div>
          <div className="flex items-center text-xl font-bold tracking-tighter">OASIS RESORTS</div>
          <div className="flex items-center text-xl font-bold uppercase tracking-widest">Wanderlust</div>
          <div className="flex items-center text-xl font-bold">BoutiqueStays</div>
          <div className="flex items-center text-xl font-bold italic">Luxe Villas</div>
        </div>
      </div>
    </section>
  )
}

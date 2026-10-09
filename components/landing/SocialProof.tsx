export function SocialProof() {
  return (
    <section className="py-12 border-b border-white/5 bg-brand-darker">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p className="text-gray-400 text-sm font-medium tracking-widest uppercase mb-8">Trusted by 500+ properties worldwide</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-50">
          {/* Placeholder Logos replacing real ones, keeping grayscale to gold hover */}
          {["Hilton Boutique", "Marriott Stays", "Four Seasons", "Ritz Rentals", "Hyatt Suites"].map((name, i) => (
            <div key={i} className="text-xl font-serif italic text-white hover:text-brand-gold transition duration-300 cursor-pointer">
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

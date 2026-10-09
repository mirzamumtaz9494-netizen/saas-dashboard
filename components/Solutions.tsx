export default function Solutions() {
  const solutions = [
    "Corporate Websites",
    "Customer Portals",
    "Admin Dashboards",
    "E-commerce Platforms",
    "Native Mobile Apps",
    "AI Customer Support",
    "AI Business Assistants",
    "Lead Automation Systems",
    "Internal Business Software",
    "Custom SaaS Platforms",
    "Inventory Management",
    "Workflow Integrations"
  ];

  return (
    <section id="solutions" className="py-24 bg-slate-50 border-t border-slate-200">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Solutions We Deliver</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
          Whether you need to face your customers, empower your employees, or automate your operations, we build the exact system you need.
        </p>

        <div className="flex flex-wrap justify-center gap-4 max-w-5xl mx-auto">
          {solutions.map((solution, index) => (
            <div 
              key={index}
              className="bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm text-slate-800 font-medium hover:border-blue-400 hover:text-blue-700 transition-colors cursor-default"
            >
              {solution}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

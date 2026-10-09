import { CheckCircle2 } from "lucide-react";

export default function WhyTeqdeepseek() {
  const reasons = [
    {
      title: "Requirement-first thinking",
      description: "We start by deeply understanding your business problem rather than forcing a predefined technology stack onto you.",
    },
    {
      title: "Custom-built solutions",
      description: "Off-the-shelf software often falls short. Our solutions are designed around your actual operational requirements.",
    },
    {
      title: "Modern technology",
      description: "We utilize current, scalable web, application, and AI technologies to ensure your product is fast, secure, and future-proof.",
    },
    {
      title: "AI-first capability",
      description: "We seamlessly integrate AI agents and powered workflows where they provide tangible business value and efficiency.",
    },
    {
      title: "Scalable development",
      description: "We build digital architecture that grows alongside your business, preventing the need for costly complete rebuilds later.",
    },
    {
      title: "Long-term partnership",
      description: "Our support doesn't end at launch. We provide ongoing maintenance, iterations, and strategic technology consulting.",
    }
  ];

  return (
    <section id="why-us" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Why build with Teqdeepseek?</h2>
          <p className="text-lg text-slate-600">
            We bridge the gap between business strategy and technical execution, ensuring the technology serves your goals.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <CheckCircle2 className="text-blue-600 w-8 h-8 mb-4" />
              <h3 className="text-xl font-semibold text-slate-900 mb-3">{reason.title}</h3>
              <p className="text-slate-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

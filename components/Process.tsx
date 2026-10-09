export default function Process() {
  const steps = [
    {
      number: "01",
      title: "Understand",
      description: "We understand your business, goals, requirements, and challenges before writing a single line of code."
    },
    {
      number: "02",
      title: "Plan",
      description: "We determine the appropriate technology stack and design a scalable solution architecture."
    },
    {
      number: "03",
      title: "Design",
      description: "We create the user experience, interface design, and operational workflows."
    },
    {
      number: "04",
      title: "Build",
      description: "We develop, integrate, thoroughly test, and refine the digital solution to production standards."
    },
    {
      number: "05",
      title: "Launch & Support",
      description: "We help deploy the product successfully and provide ongoing improvements and technical support."
    }
  ];

  return (
    <section id="process" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">How We Work</h2>
          <p className="text-lg text-slate-600">
            A structured, requirement-first approach to ensure we build exactly what your business needs.
          </p>
        </div>

        <div className="max-w-5xl mx-auto relative">
          {/* Connecting line for desktop */}
          <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-100 -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-blue-50 border-4 border-white shadow-md flex items-center justify-center text-xl font-bold text-blue-700 mb-6">
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

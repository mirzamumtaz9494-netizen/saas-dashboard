import Link from "next/link";
import { Monitor, Smartphone, Bot, Lightbulb, Settings, LayoutGrid } from "lucide-react";

export default function Services() {
  const services = [
    {
      icon: <Monitor size={28} />,
      title: "Website Development",
      description: "Modern, responsive, and performant websites designed around your specific business goals and conversion requirements.",
      benefit: "Establish a powerful online presence that drives results."
    },
    {
      icon: <LayoutGrid size={28} />,
      title: "Web Applications",
      description: "Custom web platforms, interactive dashboards, client portals, and complex business applications built for scale.",
      benefit: "Streamline operations and deliver rich digital experiences."
    },
    {
      icon: <Smartphone size={28} />,
      title: "Mobile Applications",
      description: "Native and cross-platform custom mobile applications designed to provide seamless experiences on iOS and Android devices.",
      benefit: "Engage your customers directly on the devices they use most."
    },
    {
      icon: <Bot size={28} />,
      title: "AI Agents",
      description: "Custom AI agents engineered for business workflows, customer support, sales automation, and internal knowledge management.",
      benefit: "Scale your team's capabilities without scaling headcount."
    },
    {
      icon: <Lightbulb size={28} />,
      title: "AI Solutions",
      description: "Intelligent AI-powered features and deep systems designed and integrated around your specialized business requirements.",
      benefit: "Unlock new efficiencies and data-driven insights."
    },
    {
      icon: <Settings size={28} />,
      title: "Automation & Custom Software",
      description: "Bespoke automation systems and software solutions that eliminate manual repetitive work and connect disparate tools.",
      benefit: "Reduce operational overhead and eliminate human error."
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 max-w-6xl mx-auto">
          <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Comprehensive Digital Capabilities</h2>
            <p className="text-lg text-slate-600">
              We provide end-to-end development services, bringing together engineering, design, and artificial intelligence to solve your challenges.
            </p>
          </div>
          <Link 
            href="#contact" 
            className="mt-6 md:mt-0 text-blue-700 font-semibold hover:text-blue-800 flex items-center gap-1 group"
          >
            Discuss a service 
            <span className="transform group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="group p-8 rounded-2xl bg-slate-50 border border-slate-100 hover:bg-white hover:border-blue-100 hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                {service.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                {service.description}
              </p>
              <div className="pt-4 border-t border-slate-200">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-1">Business Impact</p>
                <p className="text-sm text-slate-800 font-medium">{service.benefit}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

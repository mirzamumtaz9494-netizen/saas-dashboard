import Link from "next/link";
import { MessageSquare, Users, FileText, Zap } from "lucide-react";

export default function AIAgents() {
  const useCases = [
    {
      icon: <MessageSquare size={24} />,
      title: "Customer Support Agents",
      description: "24/7 intelligent support that understands context, accesses your documentation, and resolves customer issues autonomously."
    },
    {
      icon: <Users size={24} />,
      title: "Sales & Lead Qualification",
      description: "Agents that engage prospects, answer product questions, qualify leads based on your criteria, and schedule appointments."
    },
    {
      icon: <FileText size={24} />,
      title: "Knowledge & Document Assistants",
      description: "Internal tools that allow your team to query databases, process massive documents, and retrieve company information instantly."
    },
    {
      icon: <Zap size={24} />,
      title: "Workflow Automation Agents",
      description: "Systems that monitor events, trigger actions, draft communications, and handle multi-step business processes without manual input."
    }
  ];

  return (
    <section className="py-24 bg-slate-950 text-white relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 opacity-10">
        <div className="w-[800px] h-[800px] bg-blue-500 rounded-full blur-[120px]" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <div className="space-y-8">
            <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-sm font-medium text-blue-300">
              Featured Capability
            </div>
            
            <h2 className="text-3xl md:text-5xl font-bold leading-tight">
              AI Agents Built Around <span className="text-blue-400">Your Business</span>
            </h2>
            
            <p className="text-lg text-slate-300 leading-relaxed">
              We build custom AI agents designed specifically for your unique workflows, instead of forcing your business to adapt to generic, off-the-shelf AI solutions.
            </p>
            
            <p className="text-slate-400">
              Our agents integrate securely with your existing data, tools, and platforms to provide meaningful automation where it matters most.
            </p>
            
            <div className="pt-4">
              <Link 
                href="#contact" 
                className="px-8 py-4 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-all inline-block"
              >
                Build an AI Agent
              </Link>
            </div>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {useCases.map((useCase, index) => (
              <div key={index} className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl backdrop-blur-sm hover:border-blue-500/50 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-blue-900/30 text-blue-400 flex items-center justify-center mb-4">
                  {useCase.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{useCase.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">
                  {useCase.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

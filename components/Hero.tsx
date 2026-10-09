import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowRight, Code2, Cpu, Globe } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white pt-24 pb-32 lg:pt-36 lg:pb-40">
      {/* Background decoration */}
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
      <div className="absolute top-0 right-0 -translate-y-12 translate-x-1/3 opacity-20">
        <div className="w-96 h-96 bg-blue-400 rounded-full blur-3xl" />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-4">
            <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
            Custom Technology & AI Solutions
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-tight">
            We Build Digital & AI Solutions <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-indigo-600">Around Your Business.</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Teqdeepseek helps businesses turn ideas, challenges, and requirements into high-performance websites, applications, AI agents, and custom software systems.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link 
              href="#contact"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center justify-center gap-2"
            >
              Start Your Project
              <ArrowRight size={18} />
            </Link>
            <Link 
              href={siteConfig.website}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white text-slate-700 font-semibold border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all flex items-center justify-center"
            >
              Explore Teqdeepseek
            </Link>
          </div>
        </div>

        {/* Visual representation */}
        <div className="mt-20 max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
              <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
                <Globe size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Web Platforms</h3>
                <p className="text-sm text-slate-500 mt-1">Scalable websites and applications.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4 md:-translate-y-4">
              <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600">
                <Cpu size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">AI Integration</h3>
                <p className="text-sm text-slate-500 mt-1">Smart agents and automated workflows.</p>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-start space-x-4">
              <div className="p-3 bg-purple-50 rounded-lg text-purple-600">
                <Code2 size={24} />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">Custom Software</h3>
                <p className="text-sm text-slate-500 mt-1">Built entirely for your specific needs.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

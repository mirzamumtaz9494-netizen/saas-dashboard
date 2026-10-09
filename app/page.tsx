import Image from "next/image";
import Link from "next/link";
import { 
  ChevronDown, 
  Calendar, 
  Wrench, 
  Users, 
  FileText, 
  BarChart3, 
  PieChart,
  CheckCircle2
} from "lucide-react";

export default function LandingPage() {
  return (
    <div className="bg-brand-dark min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed w-full z-50 top-0 left-0 border-b border-white/10 bg-brand-dark/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded border border-brand-gold flex items-center justify-center">
              <span className="text-brand-gold font-bold text-lg leading-none">G</span>
            </div>
            <span className="text-white font-semibold text-xl">GrandStay</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-300">
            <Link href="#" className="hover:text-white flex items-center gap-1">Product <ChevronDown className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-white flex items-center gap-1">Solutions <ChevronDown className="w-4 h-4" /></Link>
            <Link href="#" className="hover:text-white">Pricing</Link>
            <Link href="#" className="hover:text-white flex items-center gap-1">Company <ChevronDown className="w-4 h-4" /></Link>
          </div>

          <div className="flex items-center gap-4">
            <Link href="#" className="text-sm font-medium text-white hover:text-brand-gold px-4 py-2 rounded-full border border-white/20 hover:border-brand-gold transition">Sign In</Link>
            <Link href="#" className="text-sm font-medium bg-brand-gold text-brand-darker px-5 py-2 rounded-full hover:bg-brand-gold-light transition">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 min-h-screen flex flex-col items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <Image 
            src="/images/hero-bg.jpg" 
            alt="Luxury Hotel Lobby" 
            fill 
            className="object-cover object-center opacity-30"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/95 to-brand-dark"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center mt-10">
          <p className="text-brand-gold text-sm tracking-widest uppercase mb-4">Top-rated Hospitality SaaS platform</p>
          <h1 className="text-5xl md:text-7xl font-semibold text-white tracking-tight leading-tight mb-6">
            Run every property from <br className="hidden md:block"/>
            one <span className="text-brand-gold italic font-serif">powerful workspace.</span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            Manage success rates, property operations, facilities, and costs to performance seamlessly. Hospitality operational platform.
          </p>
          <div className="flex items-center justify-center gap-4">
            <button className="bg-brand-gold text-brand-darker font-medium px-8 py-3.5 rounded-full hover:bg-brand-gold-light transition">
              Start Your Free Trial
            </button>
            <button className="bg-transparent text-white font-medium px-8 py-3.5 rounded-full border border-white/20 hover:border-brand-gold hover:text-brand-gold transition">
              Schedule a Demo
            </button>
          </div>
        </div>

        {/* Dashboard Mockup Presentation */}
        <div className="relative z-10 w-full max-w-5xl mx-auto mt-20 perspective-1000">
          <div className="relative p-2 rounded-2xl bg-gradient-to-b from-brand-gold/30 to-transparent border border-brand-gold/20 shadow-2xl shadow-brand-gold/10 transform rotate-x-2 transition-transform duration-500 hover:rotate-x-0">
            <div className="relative rounded-xl overflow-hidden aspect-video border border-brand-darker bg-brand-darker">
              <Image 
                src="/images/dashboard-mockup.jpg" 
                alt="GrandStay Dashboard Mockup" 
                fill 
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden bg-brand-dark px-6">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Everything you need to run your property</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              From guest check-in to automated cleaning schedules, everything is integrated into one powerful platform.
            </p>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-8 justify-center">
            {/* Left Image */}
            <div className="hidden lg:block w-1/4 relative rounded-2xl overflow-hidden aspect-[3/4]">
              <Image src="/images/receptionist.jpg" alt="Hotel Receptionist" fill className="object-cover opacity-80 hover:opacity-100 transition duration-500"/>
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
            </div>

            {/* Features Grid */}
            <div className="w-full lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Property Management", icon: <Calendar className="w-5 h-5 text-brand-gold"/>, desc: "Centralized calendar and booking management." },
                { title: "Guest Experience", icon: <Wrench className="w-5 h-5 text-brand-gold"/>, desc: "Automate communication and requests." },
                { title: "Teams & Crews", icon: <Users className="w-5 h-5 text-brand-gold"/>, desc: "Manage staff shifts and responsibilities." },
                { title: "Documents & Terms", icon: <FileText className="w-5 h-5 text-brand-gold"/>, desc: "Digital signatures and policy tracking." },
                { title: "Powerful Data", icon: <BarChart3 className="w-5 h-5 text-brand-gold"/>, desc: "Real-time metrics and revenue analysis." },
                { title: "True Analytics", icon: <PieChart className="w-5 h-5 text-brand-gold"/>, desc: "Deep dive into your property's performance." }
              ].map((feature, idx) => (
                <div key={idx} className="bg-brand-green/30 border border-brand-green p-6 rounded-xl hover:bg-brand-green/50 transition cursor-default">
                  <div className="mb-4 bg-brand-dark/50 w-10 h-10 rounded flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.desc}</p>
                </div>
              ))}
            </div>

            {/* Right Image */}
            <div className="hidden lg:block w-1/4 relative rounded-2xl overflow-hidden aspect-[3/4]">
              <Image src="/images/maid.jpg" alt="Hotel Housekeeper" fill className="object-cover opacity-80 hover:opacity-100 transition duration-500"/>
              <div className="absolute inset-0 bg-brand-dark/20 mix-blend-overlay"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Integrations Section */}
      <section className="py-24 bg-brand-dark px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16">
          <div className="w-full md:w-1/2">
            <div className="relative h-64 md:h-96 w-full flex items-center justify-center">
              {/* Central Node */}
              <div className="absolute z-10 w-16 h-16 rounded-xl bg-brand-green border border-brand-gold flex items-center justify-center shadow-lg shadow-brand-gold/20">
                <span className="text-brand-gold font-bold text-2xl">G</span>
              </div>
              
              {/* Connecting Lines and external nodes (simplified representation) */}
              <div className="absolute inset-0">
                <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                  <path d="M 50% 50% Q 20% 20% 10% 20%" fill="none" stroke="#cba864" strokeWidth="1" strokeDasharray="4 4" className="opacity-50"/>
                  <path d="M 50% 50% Q 20% 50% 10% 50%" fill="none" stroke="#cba864" strokeWidth="1" strokeDasharray="4 4" className="opacity-50"/>
                  <path d="M 50% 50% Q 20% 80% 10% 80%" fill="none" stroke="#cba864" strokeWidth="1" strokeDasharray="4 4" className="opacity-50"/>
                  <path d="M 50% 50% Q 80% 20% 90% 20%" fill="none" stroke="#cba864" strokeWidth="1" strokeDasharray="4 4" className="opacity-50"/>
                  <path d="M 50% 50% Q 80% 80% 90% 80%" fill="none" stroke="#cba864" strokeWidth="1" strokeDasharray="4 4" className="opacity-50"/>
                </svg>
              </div>
              
              {/* Surrounding Nodes */}
              <div className="absolute top-[10%] left-[5%] w-10 h-10 bg-[#1c3626] rounded-full border border-white/10 flex items-center justify-center text-xs text-white">1</div>
              <div className="absolute top-[45%] left-[2%] w-10 h-10 bg-[#1c3626] rounded-full border border-white/10 flex items-center justify-center text-xs text-white">2</div>
              <div className="absolute top-[80%] left-[5%] w-10 h-10 bg-[#1c3626] rounded-full border border-white/10 flex items-center justify-center text-xs text-white">3</div>
              
              <div className="absolute top-[10%] right-[5%] w-10 h-10 bg-[#1c3626] rounded-full border border-white/10 flex items-center justify-center text-xs text-white">4</div>
              <div className="absolute top-[80%] right-[5%] w-10 h-10 bg-[#1c3626] rounded-full border border-white/10 flex items-center justify-center text-xs text-white">5</div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Connects with your favorite tools</h2>
            <p className="text-gray-400 mb-10 max-w-lg">
              Seamlessly integrate with major OTAs, payment gateways, and accounting software to keep your business running smoothly without missing a beat.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {['Stripe', 'Booking.com', 'Expedia', 'Airbnb', 'QuickBooks', 'Xero'].map((tool, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-brand-green/20 border border-white/5 p-4 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-brand-darker flex items-center justify-center text-brand-gold text-xs font-bold">
                    {tool[0]}
                  </div>
                  <span className="text-gray-300 font-medium">{tool}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 bg-brand-darker px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6">Simple, transparent pricing</h2>
            <p className="text-gray-400">Choose the plan that fits your property portfolio.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto items-center">
            {/* Starter */}
            <div className="bg-brand-dark border border-white/10 rounded-2xl p-8 hover:border-brand-gold/30 transition">
              <h3 className="text-xl font-semibold mb-2">Starter</h3>
              <p className="text-gray-400 text-sm mb-6">For single property owners</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">$49</span><span className="text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> 1 Property</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Basic Reporting</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Email Support</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition font-medium">Start Free Trial</button>
            </div>

            {/* Professional (Highlighted) */}
            <div className="bg-brand-green/20 border border-brand-gold rounded-2xl p-8 relative transform md:-translate-y-4 shadow-2xl shadow-brand-gold/5">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-gold text-brand-darker text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Most Popular
              </div>
              <h3 className="text-xl font-semibold mb-2 text-brand-gold">Professional</h3>
              <p className="text-gray-400 text-sm mb-6">For boutique hotels & managers</p>
              <div className="mb-6">
                <span className="text-5xl font-bold">$149</span><span className="text-gray-400">/mo</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Up to 10 Properties</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Advanced Analytics</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> 24/7 Priority Support</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Custom Integrations</li>
              </ul>
              <button className="w-full py-3 rounded-full bg-brand-gold text-brand-darker hover:bg-brand-gold-light transition font-bold">Start Free Trial</button>
            </div>

            {/* Enterprise */}
            <div className="bg-brand-dark border border-white/10 rounded-2xl p-8 hover:border-brand-gold/30 transition">
              <h3 className="text-xl font-semibold mb-2">Enterprise</h3>
              <p className="text-gray-400 text-sm mb-6">For large hotel chains</p>
              <div className="mb-6">
                <span className="text-4xl font-bold">Custom</span>
              </div>
              <ul className="space-y-4 mb-8 text-sm text-gray-300">
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Unlimited Properties</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Dedicated Account Manager</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> Custom Development</li>
                <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-brand-gold"/> White Labeling</li>
              </ul>
              <button className="w-full py-3 rounded-full border border-white/20 hover:bg-white/5 transition font-medium">Contact Sales</button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-dark border-t border-white/10 pt-20 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            {/* Brand Column */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded border border-brand-gold flex items-center justify-center">
                  <span className="text-brand-gold font-bold text-lg leading-none">G</span>
                </div>
                <span className="text-white font-semibold text-xl">GrandStay</span>
              </div>
              <p className="text-gray-400 text-sm mb-8 leading-relaxed">
                Top-rated Hospitality SaaS platform used by properties worldwide to streamline operations and enhance guest experiences.
              </p>
              <div className="mb-6">
                <h4 className="font-medium text-white mb-3">Office Locations</h4>
                <ul className="text-gray-400 text-sm space-y-2">
                  <li>New York</li>
                  <li>London</li>
                  <li>Dubai</li>
                </ul>
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="font-semibold text-white mb-6">Features & Solutions</h4>
              <ul className="text-gray-400 text-sm space-y-3">
                <li><Link href="#" className="hover:text-brand-gold transition">Guest Check-in</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Housekeeping Logs</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Dynamic Pricing Matrix</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Revenue Reports</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Shift Scheduler</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Asset Maintenance</Link></li>
              </ul>
            </div>

            {/* Resources */}
            <div>
              <h4 className="font-semibold text-white mb-6">Resources & Help</h4>
              <ul className="text-gray-400 text-sm space-y-3">
                <li><Link href="#" className="hover:text-brand-gold transition">Help Center</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">API Docs</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">User Guides</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Blog</Link></li>
                <li><Link href="#" className="hover:text-brand-gold transition">Community Forum</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-6">Contact & Legal</h4>
              <form className="space-y-3 mb-6">
                <input type="email" placeholder="Email" className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold text-white"/>
                <textarea placeholder="Your message" rows={3} className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-brand-gold text-white"></textarea>
                <button className="w-full bg-brand-gold text-brand-darker font-medium py-2 rounded-lg hover:bg-brand-gold-light transition">Get in Touch</button>
              </form>
              <div className="flex gap-4 text-sm text-gray-400">
                <Link href="#" className="hover:text-white">Privacy Policy</Link>
                <Link href="#" className="hover:text-white">Terms</Link>
              </div>
            </div>
          </div>

          {/* Bottom Images Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-white/5">
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image src="/images/footer-lock.jpg" alt="Smart Lock" fill className="object-cover transition duration-700 group-hover:scale-105"/>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image src="/images/footer-mobile.jpg" alt="Mobile App" fill className="object-cover transition duration-700 group-hover:scale-105"/>
            </div>
            <div className="relative aspect-[4/3] rounded-xl overflow-hidden group">
              <Image src="/images/footer-dashboard.jpg" alt="Dashboard View" fill className="object-cover transition duration-700 group-hover:scale-105"/>
            </div>
          </div>
          
          <div className="text-center text-gray-500 text-xs mt-10">
            &copy; 2026 GrandStay Hospitality SaaS. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}

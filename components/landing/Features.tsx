import { Calendar, Wrench, Users, FileText, BarChart3, PieChart } from "lucide-react";
import Link from "next/link";

export function Features() {
  const features = [
    {
      icon: Calendar,
      title: "Property Management",
      desc: "Centralized calendar and reservations. Manage availability across all channels in one unified interface.",
      link: "/product/property-management"
    },
    {
      icon: Users,
      title: "Guest Check-in",
      desc: "Contactless mobile check-in, automated welcome emails, and rich guest profiling.",
      link: "/product/guest-check-in"
    },
    {
      icon: Wrench,
      title: "Housekeeping & Maintenance",
      desc: "Auto-assign tasks based on check-outs. Track maintenance requests and room status in real-time.",
      link: "/product/housekeeping-maintenance"
    },
    {
      icon: PieChart,
      title: "Revenue & Pricing",
      desc: "Dynamic pricing matrix. Adjust rates automatically based on occupancy, season, and competitor data.",
      link: "/product/revenue-pricing"
    },
    {
      icon: BarChart3,
      title: "Analytics & Reports",
      desc: "Customizable dashboards showing RevPAR, ADR, and occupancy trends with beautiful visual charts.",
      link: "/product/analytics-reports"
    },
    {
      icon: FileText,
      title: "Staff & Shift Scheduler",
      desc: "Manage employee shifts, payroll exports, and internal communications securely.",
      link: "/product/staff-scheduler"
    }
  ];

  return (
    <section className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Everything you need to run your property</h2>
        <p className="text-gray-300 max-w-2xl mx-auto text-lg">We didn't just build software. We built an entire hospitality operating system.</p>
      </div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {features.map((f, i) => (
          <Link href={f.link} key={i} className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-gold focus-visible:ring-offset-2 focus-visible:ring-offset-brand-dark rounded-2xl">
            <div className="bg-brand-darker border border-white/5 rounded-2xl p-8 hover:border-brand-gold/30 transition-all duration-300 h-full flex flex-col hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-gold/5">
              <div className="w-12 h-12 bg-brand-dark border border-white/10 rounded-xl flex items-center justify-center mb-6 group-hover:border-brand-gold/50 transition-colors">
                <f.icon className="w-6 h-6 text-brand-gold" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-brand-gold transition-colors">{f.title}</h3>
              <p className="text-gray-300 text-[15px] leading-relaxed flex-1">
                {f.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

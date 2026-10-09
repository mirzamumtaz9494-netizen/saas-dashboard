import os

routes = [
  {"path": "product", "title": "Product Overview", "desc": "Discover how GrandHotel unifies your operations into a single platform."},
  {"path": "product/property-management", "title": "Property Management", "desc": "Centralized calendar and reservations. Manage availability across all channels in one interface."},
  {"path": "product/guest-check-in", "title": "Guest Check-in", "desc": "Contactless mobile check-in, automated welcome emails, and rich guest profiling."},
  {"path": "product/housekeeping-maintenance", "title": "Housekeeping & Maintenance", "desc": "Auto-assign tasks based on check-outs and track maintenance in real-time."},
  {"path": "product/revenue-pricing", "title": "Revenue & Pricing", "desc": "Dynamic pricing matrix that adjusts rates automatically to maximize your RevPAR."},
  {"path": "product/analytics-reports", "title": "Analytics & Reports", "desc": "Customizable dashboards showing occupancy trends with beautiful visual charts."},
  {"path": "product/staff-scheduler", "title": "Staff & Shift Scheduler", "desc": "Manage employee shifts, payroll exports, and internal communications securely."},
  {"path": "product/integrations", "title": "Integrations", "desc": "Connect seamlessly with the OTAs, payment gateways, and tools you already use."},
  {"path": "product/whats-new", "title": "What's New", "desc": "Stay up-to-date with the latest product updates and feature releases."},
  {"path": "solutions/boutique-hotels", "title": "For Boutique Hotels", "desc": "Deliver personalized guest experiences with enterprise-grade operational tools."},
  {"path": "solutions/hotel-chains", "title": "For Hotel Chains", "desc": "Multi-property management at scale with centralized reporting and controls."},
  {"path": "solutions/vacation-rentals", "title": "For Vacation Rentals", "desc": "Automate guest communication and smart lock generation seamlessly."},
  {"path": "solutions/serviced-apartments", "title": "For Serviced Apartments", "desc": "Long-term stay management with integrated billing and housekeeping."},
  {"path": "solutions/hostels-bnb", "title": "For Hostels and B&Bs", "desc": "Affordable, easy-to-use software that handles the heavy lifting."},
  {"path": "solutions/owners", "title": "For Owners", "desc": "High-level dashboard insights to track portfolio performance and ROI."},
  {"path": "solutions/general-managers", "title": "For General Managers", "desc": "Complete operational visibility from check-ins to maintenance alerts."},
  {"path": "solutions/front-desk", "title": "For Front Desk", "desc": "A lightning-fast interface to check guests in and handle requests."},
  {"path": "solutions/housekeeping", "title": "For Housekeeping", "desc": "Mobile-friendly checklists and real-time room status updates."},
  {"path": "company/about", "title": "About Us", "desc": "Our mission is to empower hospitality professionals with better technology."},
  {"path": "company/customers", "title": "Customers", "desc": "See how properties around the world are succeeding with GrandHotel."},
  {"path": "company/careers", "title": "Careers", "desc": "Join our fully remote team and help shape the future of hospitality."},
  {"path": "company/blog", "title": "Blog", "desc": "Insights, tips, and news for modern hoteliers."},
  {"path": "company/partners", "title": "Partners", "desc": "Grow your business by partnering with the GrandHotel ecosystem."},
  {"path": "company/press", "title": "Press", "desc": "Media kit, brand assets, and recent press releases."},
  {"path": "resources/help-center", "title": "Help Center", "desc": "Search our knowledge base for quick answers and tutorials."},
  {"path": "resources/api-docs", "title": "API Documentation", "desc": "Build custom integrations with our robust, RESTful API."},
  {"path": "resources/user-guides", "title": "User Guides", "desc": "In-depth manuals for getting the most out of every GrandHotel feature."},
  {"path": "resources/community", "title": "Community Forum", "desc": "Connect with other property managers to share tips and strategies."},
  {"path": "privacy", "title": "Privacy Policy", "desc": "How we collect, use, and protect your data."},
  {"path": "terms", "title": "Terms of Service", "desc": "The rules and guidelines for using the GrandHotel platform."}
]

template = '''import {{ SubPageLayout }} from "@/components/landing/SubPageLayout";

export const metadata = {{
  title: "{title} | GrandHotel",
  description: "{desc}"
}};

export default function Page() {{
  return (
    <SubPageLayout title="{title}" description="{desc}">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {{/* Content Block 1 */}}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-white mb-4">Streamline Your Workflow</h2>
            <p className="text-gray-400 leading-relaxed">
              We understand the challenges you face daily. This module is specifically designed to remove friction, automate repetitive tasks, and give you back hours of your day. Focus on what truly matters: your guests.
            </p>
          </div>
          <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
            <span className="text-brand-gold/50 font-medium">Feature Preview</span>
          </div>
        </div>

        {{/* Content Block 2 */}}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="aspect-video bg-white/5 border border-white/10 rounded-xl flex items-center justify-center order-2 md:order-1">
            <span className="text-brand-gold/50 font-medium">Analytics Dashboard</span>
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-2xl font-bold text-white mb-4">Data-Driven Decisions</h2>
            <p className="text-gray-400 leading-relaxed">
              Stop guessing and start knowing. Access real-time data and actionable insights exactly when you need them. Our robust reporting engine does the heavy lifting so you don't have to.
            </p>
          </div>
        </div>

      </div>
    </SubPageLayout>
  );
}}
'''

for r in routes:
    dir_path = os.path.join('app', r['path'])
    os.makedirs(dir_path, exist_ok=True)
    with open(os.path.join(dir_path, 'page.tsx'), 'w', encoding='utf-8') as f:
        f.write(template.format(title=r['title'], desc=r['desc'].replace('"', '\\"')))

print("Pages generated!")

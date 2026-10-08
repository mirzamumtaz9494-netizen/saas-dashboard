import { 
  CalendarDays, 
  Users, 
  Building2, 
  LineChart, 
  Wallet, 
  Map 
} from "lucide-react"

export function Features() {
  const features = [
    {
      title: "Booking Management",
      description: "A centralized calendar to manage reservations, modify dates, and track availability across all channels.",
      icon: CalendarDays,
    },
    {
      title: "Guest Experience",
      description: "Automate check-in flows, send custom messages, and manage guest profiles with full history.",
      icon: Users,
    },
    {
      title: "Property & Rooms",
      description: "Manage multiple properties from a single dashboard. Track housekeeping status and maintenance.",
      icon: Building2,
    },
    {
      title: "Advanced Analytics",
      description: "Visualize RevPAR, occupancy rates, and channel performance with pre-built hospitality metrics.",
      icon: LineChart,
    },
    {
      title: "Financial Hub",
      description: "Track invoices, payments, and generate accounting reports in one click. Multi-currency support.",
      icon: Wallet,
    },
    {
      title: "Multi-Location",
      description: "Scale from a single boutique hotel to a worldwide chain without changing your software.",
      icon: Map,
    },
  ]

  return (
    <section id="features" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Everything you need to run your property
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Vprofessionals is built specifically for the hospitality industry. 
          No generic CRM features—just tools that actually help you manage your daily operations.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {features.map((feature) => (
          <div 
            key={feature.title} 
            className="group relative overflow-hidden rounded-xl border bg-card p-2 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 cursor-default"
          >
            <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
              <feature.icon className="h-10 w-10 text-primary transition-transform duration-300 group-hover:scale-110" />
              <div className="space-y-2">
                <h3 className="font-bold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

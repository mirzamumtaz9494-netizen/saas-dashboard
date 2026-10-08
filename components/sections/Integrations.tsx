import { 
  Building2, 
  CreditCard,
  Mail,
  MessageSquare,
  Lock,
  Globe
} from "lucide-react"

export function Integrations() {
  const integrations = [
    { name: "Stripe", icon: CreditCard, color: "text-[#6366f1]", bg: "bg-[#6366f1]/10" },
    { name: "Mailchimp", icon: Mail, color: "text-[#F6E05E]", bg: "bg-[#F6E05E]/10" },
    { name: "Expedia Group", icon: Globe, color: "text-[#000080]", bg: "bg-[#000080]/10" },
    { name: "Twilio", icon: MessageSquare, color: "text-[#F56565]", bg: "bg-[#F56565]/10" },
    { name: "Salto", icon: Lock, color: "text-[#10B981]", bg: "bg-[#10B981]/10" },
    { name: "Airbnb", icon: Building2, color: "text-[#FF5A5F]", bg: "bg-[#FF5A5F]/10" },
  ]

  return (
    <section id="integrations" className="container py-12 md:py-24 lg:py-32 bg-muted/30 border-y border-border">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Connects with your favorite tools
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Vprofessionals integrates seamlessly with payment gateways, OTAs, smart locks, and communication platforms you already use.
        </p>
      </div>
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3 mt-12">
        {integrations.map((item) => (
          <div 
            key={item.name} 
            className="group flex items-center gap-4 rounded-xl border border-border bg-card p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary/50 cursor-pointer"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${item.bg}`}>
              <item.icon className={`h-6 w-6 ${item.color} transition-transform duration-300 group-hover:scale-110`} />
            </div>
            <h3 className="font-bold text-foreground">{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  )
}

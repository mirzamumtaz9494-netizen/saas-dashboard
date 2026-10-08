import { CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

const plans = [
  {
    name: "Starter",
    description: "For individual properties",
    price: "$49",
    features: [
      "Up to 20 rooms",
      "Basic reservations calendar",
      "Guest management",
      "Email support",
    ],
    highlighted: false,
    cta: "Start Free Trial",
  },
  {
    name: "Professional",
    description: "For growing hospitality teams",
    price: "$149",
    features: [
      "Unlimited rooms",
      "Advanced revenue analytics",
      "Multi-property support (up to 3)",
      "Automated guest messaging",
      "Priority 24/7 support",
    ],
    highlighted: true,
    cta: "Start Free Trial",
  },
  {
    name: "Enterprise",
    description: "For multi-property operations",
    price: "Custom",
    features: [
      "Unlimited properties",
      "Custom API integrations",
      "Dedicated account manager",
      "Custom reporting",
      "White-label options",
    ],
    highlighted: false,
    cta: "Contact Sales",
  },
]

export function Pricing() {
  return (
    <section className="bg-background py-24 md:py-32" id="pricing">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl text-foreground">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-lg text-muted-foreground font-medium">
            Choose the plan that fits your hospitality business. All plans include a 14-day free trial.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {plans.map((plan) => (
            <Card 
              key={plan.name} 
              className={`flex flex-col relative overflow-hidden transition-all duration-200 ${
                plan.highlighted 
                  ? "border-primary shadow-lg scale-100 lg:scale-105 z-10 bg-card" 
                  : "border-border shadow-sm scale-100 bg-background hover:border-border/80 hover:shadow-md"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute top-0 left-0 right-0 bg-primary text-primary-foreground text-center text-xs font-bold uppercase tracking-wider py-1.5">
                  Recommended
                </div>
              )}
              
              <CardHeader className={plan.highlighted ? "pt-10" : ""}>
                <CardTitle className="font-heading text-2xl">{plan.name}</CardTitle>
                <CardDescription className="text-sm font-medium">{plan.description}</CardDescription>
                <div className="mt-6 flex items-baseline text-5xl font-extrabold text-foreground tracking-tight">
                  {plan.price}
                  {plan.price !== "Custom" && <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>}
                </div>
              </CardHeader>
              
              <CardContent className="flex-1">
                <ul className="space-y-4">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <CheckCircle2 className={`h-5 w-5 ${plan.highlighted ? "text-primary" : "text-muted-foreground"}`} />
                      <span className="text-sm font-medium text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className="w-full h-11 text-base font-semibold" 
                  variant={plan.highlighted ? "default" : "outline"}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

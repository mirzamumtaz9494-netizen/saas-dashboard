import { Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card"

export function Pricing() {
  return (
    <section id="pricing" className="container py-12 md:py-24 lg:py-32">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center mb-12">
        <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
          Simple, transparent pricing
        </h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Choose the perfect plan for your property. No hidden fees.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Boutique</CardTitle>
            <CardDescription>Perfect for small B&Bs and independent rentals</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $49
              <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {['Up to 10 rooms', 'Basic booking engine', 'Standard reporting', 'Email support', '1 admin user'].map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Start Free Trial</Button>
          </CardFooter>
        </Card>

        <Card className="border-primary shadow-lg relative">
          <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Most Popular
          </div>
          <CardHeader>
            <CardTitle>Hotel</CardTitle>
            <CardDescription>Ideal for mid-sized hotels and resorts</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $149
              <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {['Up to 50 rooms', 'Advanced channel manager', 'Custom reporting', 'Priority 24/7 support', '5 admin users', 'Automated guest emails'].map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Start Free Trial</Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Enterprise</CardTitle>
            <CardDescription>For large hotel chains and multi-properties</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              $399
              <span className="ml-1 text-xl font-medium text-muted-foreground">/mo</span>
            </div>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {['Unlimited rooms', 'Custom API access', 'Dedicated account manager', 'SLA guarantee', 'Unlimited users', 'Multi-property management'].map(feature => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button className="w-full" variant="outline">Contact Sales</Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}

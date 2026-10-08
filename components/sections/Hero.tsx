import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-24 pb-20 lg:pt-36 lg:pb-32">
      {/* Premium subtle background element */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/5 via-background to-background"></div>
      
      <div className="container relative z-10 mx-auto px-4 md:px-6 text-center">
        <div className="mx-auto max-w-4xl space-y-8">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider backdrop-blur-sm">
            The new standard in property management
          </div>
          
          <h1 className="font-heading text-5xl font-bold tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-7xl leading-[1.1]">
            Run every property from one <span className="text-primary">powerful workspace.</span>
          </h1>
          
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground sm:text-xl font-medium leading-relaxed">
            Manage reservations, guests, rooms, revenue, and property performance from a single hospitality operations platform.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button size="lg" className="h-12 px-8 text-base font-semibold w-full sm:w-auto shadow-md hover:shadow-lg transition-all" asChild>
              <Link href="/signup">
                Start Free Trial <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base font-semibold w-full sm:w-auto border-border hover:bg-muted transition-all" asChild>
              <Link href="/dashboard">
                View Interactive Demo
              </Link>
            </Button>
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8 pt-8 text-sm text-muted-foreground font-semibold">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>14-day free trial</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-success" />
              <span>Cancel anytime</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

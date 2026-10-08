import Link from "next/link"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/Button"

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-background pt-16 md:pt-24 lg:pt-32">
      <div className="container relative z-10 flex flex-col items-center text-center">
        <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm font-medium text-primary mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
          New: Multi-property management is live
        </div>
        
        <h1 className="font-heading text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl max-w-4xl">
          Hospitality management, <br className="hidden sm:block" />
          <span className="text-primary">beautifully simplified.</span>
        </h1>
        
        <p className="mt-6 max-w-[42rem] text-muted-foreground sm:text-xl sm:leading-8">
          The all-in-one SaaS platform for independent hotels, resorts, and vacation rentals. 
          Manage bookings, automate guest communication, and increase revenue.
        </p>
        
        <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <Link href="/signup">
            <Button size="lg" className="w-full sm:w-auto h-12 px-8 text-base">
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
          <Link href="#preview">
            <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 text-base">
              View Interactive Demo
            </Button>
          </Link>
        </div>
        
        <div className="mt-10 flex items-center justify-center gap-6 text-sm text-muted-foreground sm:gap-8">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>No credit card required</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>14-day free trial</span>
          </div>
          <div className="flex items-center gap-2 hidden sm:flex">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
      
      {/* Decorative background blur */}
      <div className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80" aria-hidden="true">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-accent opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }}></div>
      </div>
    </section>
  )
}

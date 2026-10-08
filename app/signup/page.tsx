import Link from "next/link"
import { Hotel, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Left Side: Premium Hospitality Visual */}
      <div className="hidden lg:flex w-1/2 flex-col justify-between bg-card border-r border-border relative overflow-hidden">
        {/* Placeholder for actual architectural/hospitality image */}
        <div className="absolute inset-0 bg-primary/10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-80"></div>
        
        <div className="relative z-10 p-12">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
              <Hotel className="h-4 w-4" />
            </div>
            <span className="font-heading tracking-tight text-xl text-foreground">Vprofessionals</span>
          </Link>
        </div>

        <div className="relative z-10 p-12 max-w-lg space-y-6">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground">
            Start managing better.
          </h2>
          <div className="space-y-4">
            {[
              "Manage reservations across multiple properties",
              "Automate guest communications",
              "Track revenue and occupancy in real-time"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <CheckCircle2 className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Create an account</h1>
            <p className="text-muted-foreground">Start your 14-day free trial. No credit card required.</p>
          </div>
          
          <form className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name" className="text-sm font-semibold">First name</Label>
                <Input id="first-name" placeholder="Alex" required className="h-11" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name" className="text-sm font-semibold">Last name</Label>
                <Input id="last-name" placeholder="Smith" required className="h-11" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-sm font-semibold">Property/Company name</Label>
              <Input id="company" placeholder="Grand Hotel" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Work email</Label>
              <Input id="email" type="email" placeholder="alex@hotel.com" required className="h-11" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" required className="h-11" />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Create Account
            </Button>
          </form>

          <div className="text-center lg:text-left text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

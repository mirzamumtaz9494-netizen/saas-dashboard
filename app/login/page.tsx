import Link from "next/link"
import { Hotel } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function LoginPage() {
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

        <div className="relative z-10 p-12 max-w-lg">
          <h2 className="font-heading text-4xl font-bold tracking-tight text-foreground mb-4">
            Elevating hospitality operations.
          </h2>
          <p className="text-lg text-muted-foreground font-medium">
            Join thousands of modern hotel managers who run their entire portfolio from a single, powerful workspace.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="flex w-full lg:w-1/2 flex-col justify-center items-center p-8 sm:p-12">
        <div className="w-full max-w-[400px] space-y-8">
          <div className="space-y-2 text-center lg:text-left">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your account to manage your properties.</p>
          </div>
          
          <form className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email address</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="manager@hotel.com" 
                required 
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-semibold">Password</Label>
                <Link href="/forgot-password" className="text-sm font-semibold text-primary hover:underline">
                  Forgot password?
                </Link>
              </div>
              <Input 
                id="password" 
                type="password" 
                placeholder="••••••••" 
                required 
                className="h-11"
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base font-semibold">
              Sign in
            </Button>
          </form>

          <div className="text-center lg:text-left text-sm text-muted-foreground">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="font-semibold text-primary hover:underline">
              Start your free trial
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

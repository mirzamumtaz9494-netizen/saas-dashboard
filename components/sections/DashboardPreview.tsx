import Image from "next/image"
import { ShieldCheck, LineChart, Users } from "lucide-react"

export function DashboardPreview() {
  return (
    <section className="relative bg-background pb-24 md:pb-32 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        
        {/* Massive edge-to-edge product mockup container */}
        <div className="relative mx-auto max-w-[1200px] rounded-2xl border border-border/50 bg-card p-2 shadow-2xl md:p-3 -mt-8 md:-mt-12 z-20">
          
          <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm relative">
            
            {/* Mac OS Window Controls */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/40 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-error/80 border border-error/20"></div>
              <div className="h-3 w-3 rounded-full bg-warning/80 border border-warning/20"></div>
              <div className="h-3 w-3 rounded-full bg-success/80 border border-success/20"></div>
              <div className="mx-auto flex items-center justify-center rounded-md bg-background px-3 py-1 text-xs text-muted-foreground font-medium shadow-sm border border-border/50">
                staymanagers.com/dashboard
              </div>
            </div>
            
            {/* Mock Dashboard Image (Using CSS fallback for layout demonstration) */}
            <div className="flex h-[300px] sm:h-[400px] md:h-[600px] lg:h-[700px] w-full bg-background relative overflow-hidden">
              
              {/* Sidebar */}
              <div className="hidden md:flex w-64 flex-col border-r border-border/50 bg-card p-4 space-y-6">
                <div className="h-8 w-32 rounded bg-primary/10"></div>
                <div className="space-y-3">
                  <div className="h-8 w-full rounded bg-primary/5"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                </div>
              </div>

              {/* Main Content Area */}
              <div className="flex-1 p-6 space-y-6 bg-background">
                <div className="flex justify-between items-center border-b border-border/50 pb-4">
                  <div className="h-8 w-48 rounded bg-muted"></div>
                  <div className="h-8 w-32 rounded bg-muted"></div>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="h-24 rounded-xl border border-border/50 bg-card"></div>
                  ))}
                </div>
                <div className="h-64 w-full rounded-xl border border-border/50 bg-card"></div>
              </div>

              {/* Contextual Floating Elements for "Pop" */}
              <div className="absolute right-8 top-16 hidden lg:flex flex-col gap-3 z-30 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                <div className="bg-card border border-border shadow-lg rounded-lg p-3 w-64 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-success/10 flex items-center justify-center text-success">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">New Booking</p>
                    <p className="text-xs text-muted-foreground">Suite 402 • 3 Nights</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Social Proof beneath the hero image */}
        <div className="mt-20 flex flex-col items-center justify-center gap-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Trusted by 1,000+ forward-thinking hotels and property groups
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale">
            {/* Using text placeholders instead of SVGs for robustness */}
            <div className="font-heading font-bold text-xl text-foreground">Oasis Resorts</div>
            <div className="font-heading font-bold text-xl text-foreground">Grand Hotels</div>
            <div className="font-heading font-bold text-xl text-foreground">Luxe Villas</div>
            <div className="font-heading font-bold text-xl text-foreground">Stay Group</div>
          </div>
        </div>

      </div>
    </section>
  )
}

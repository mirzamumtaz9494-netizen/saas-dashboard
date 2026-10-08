import Image from "next/image"

export function DashboardPreview() {
  return (
    <section className="relative bg-background pb-24 md:pb-32 -mt-16 overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="relative mx-auto max-w-6xl rounded-2xl border border-border/50 bg-card p-2 shadow-2xl md:p-4">
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none h-32 bottom-0 top-auto rounded-b-2xl"></div>
          
          <div className="overflow-hidden rounded-xl border border-border/50 bg-background shadow-sm">
            {/* Window Controls (Mac Style) */}
            <div className="flex items-center gap-2 border-b border-border/50 bg-muted/30 px-4 py-3">
              <div className="h-3 w-3 rounded-full bg-error/80"></div>
              <div className="h-3 w-3 rounded-full bg-warning/80"></div>
              <div className="h-3 w-3 rounded-full bg-success/80"></div>
              <div className="mx-auto flex items-center justify-center rounded-md bg-background px-3 py-1 text-xs text-muted-foreground shadow-sm border border-border/50">
                vprofessionals.com/dashboard
              </div>
            </div>
            
            {/* Dashboard Mockup Content */}
            <div className="flex h-[400px] md:h-[600px] w-full bg-background">
              {/* Sidebar Mock */}
              <div className="hidden w-64 flex-shrink-0 border-r border-border/50 bg-muted/10 p-4 md:block">
                <div className="mb-8 h-6 w-32 rounded bg-muted"></div>
                <div className="space-y-3">
                  <div className="h-8 w-full rounded bg-primary/10"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                  <div className="h-8 w-full rounded bg-muted/50"></div>
                </div>
              </div>
              
              {/* Main Content Mock */}
              <div className="flex-1 p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="h-8 w-48 rounded bg-muted"></div>
                  <div className="h-8 w-24 rounded bg-muted"></div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="rounded-xl border border-border/50 p-4 space-y-3">
                      <div className="h-4 w-20 rounded bg-muted"></div>
                      <div className="h-8 w-24 rounded bg-foreground/10"></div>
                    </div>
                  ))}
                </div>
                
                <div className="h-64 w-full rounded-xl border border-border/50 bg-muted/5"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

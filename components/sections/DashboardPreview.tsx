import Image from "next/image"

export function DashboardPreview() {
  return (
    <section id="preview" className="py-12 md:py-20 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="relative mx-auto max-w-5xl rounded-xl border bg-background/50 p-2 shadow-2xl backdrop-blur sm:p-4">
          <div className="overflow-hidden rounded-lg border bg-card">
            {/* Minimal window controls */}
            <div className="flex h-10 items-center gap-1.5 border-b bg-muted/50 px-4">
              <div className="h-3 w-3 rounded-full bg-rose-500" />
              <div className="h-3 w-3 rounded-full bg-amber-500" />
              <div className="h-3 w-3 rounded-full bg-emerald-500" />
            </div>
            
            <div className="relative aspect-video w-full bg-muted/20">
              {/* Fallback layout if no image is present - looks like a dashboard wireframe */}
              <div className="absolute inset-0 flex">
                <div className="w-64 border-r bg-card hidden md:block p-4 space-y-4">
                  <div className="h-8 w-32 bg-primary/20 rounded-md"></div>
                  <div className="space-y-2 mt-8">
                    {[1, 2, 3, 4, 5, 6].map(i => (
                      <div key={i} className="h-8 w-full bg-muted rounded-md"></div>
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-6">
                  <div className="flex justify-between items-center">
                    <div className="h-8 w-48 bg-muted rounded-md"></div>
                    <div className="h-10 w-32 bg-primary rounded-md"></div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-32 bg-card border rounded-lg p-4 flex flex-col justify-between">
                        <div className="h-4 w-1/2 bg-muted rounded"></div>
                        <div className="h-8 w-3/4 bg-foreground/20 rounded"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-64 bg-card border rounded-lg w-full"></div>
                </div>
              </div>
              
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                 <p className="text-sm font-medium text-muted-foreground flex items-center">
                   <span className="inline-block h-2 w-2 rounded-full bg-primary mr-2"></span>
                   Interactive Preview Available in Template
                 </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

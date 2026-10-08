import { Filter, UserCircle, CheckCircle, AlertCircle, Clock, ChevronDown, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export default function HousekeepingPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Housekeeping</h1>
          <p className="text-muted-foreground mt-1 text-sm">Daily operational task board and staff assignments.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background">Grand Plaza Hotel <ChevronDown className="ml-2 h-4 w-4" /></Button>
          <Button variant="outline" className="h-9 bg-background">Staff: All <ChevronDown className="ml-2 h-4 w-4" /></Button>
          <Button className="h-9">Assign Tasks</Button>
        </div>
      </div>

      {/* Main Board Layout */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Room Grid / Status Board */}
        <div className="lg:w-2/3 flex flex-col gap-4">
          <div className="flex items-center gap-2 bg-card p-2 rounded-lg border border-border shadow-sm overflow-x-auto">
            <Button variant="ghost" size="sm" className="bg-success-muted/50 text-success"><CheckCircle className="h-4 w-4 mr-2"/> Clean (42)</Button>
            <Button variant="ghost" size="sm" className="bg-warning-muted/50 text-warning"><AlertCircle className="h-4 w-4 mr-2"/> Dirty (15)</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground"><ListTodo className="h-4 w-4 mr-2"/> Inspected (18)</Button>
            <Button variant="ghost" size="sm" className="text-muted-foreground"><Clock className="h-4 w-4 mr-2"/> Cleaning (8)</Button>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-6">
            <h3 className="font-semibold text-foreground mb-4">Floor 2 Priorities</h3>
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-3">
              {[
                { n: "201", s: "clean" }, { n: "202", s: "dirty" }, { n: "203", s: "cleaning" }, { n: "204", s: "inspected" },
                { n: "205", s: "dirty" }, { n: "206", s: "dirty" }, { n: "207", s: "clean" }, { n: "208", s: "clean" },
                { n: "209", s: "clean" }, { n: "210", s: "cleaning" }, { n: "211", s: "dirty" }, { n: "212", s: "dirty" },
              ].map(r => (
                <div key={r.n} className={`aspect-square rounded-lg flex items-center justify-center font-semibold text-sm border cursor-pointer hover:opacity-80 transition-opacity
                  ${r.s === 'clean' ? 'bg-success-muted/30 border-success/30 text-success' : 
                    r.s === 'dirty' ? 'bg-warning-muted/30 border-warning/30 text-warning' : 
                    r.s === 'cleaning' ? 'bg-primary/10 border-primary/30 text-primary' : 
                    'bg-muted border-border text-muted-foreground'}`}>
                  {r.n}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Active Task Detail / Assignment */}
        <div className="lg:w-1/3 flex flex-col gap-4">
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col h-[500px]">
            <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
              <div>
                <h3 className="font-heading font-bold text-foreground">Room 205</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Deluxe Suite • Checkout Today</p>
              </div>
              <Badge variant="softWarning">Dirty</Badge>
            </div>
            
            <div className="p-4 flex-1 overflow-y-auto space-y-6">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Tasks</h4>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Replace all towels & linens</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Deep clean bathroom</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Restock minibar completely</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" className="mt-0.5 rounded border-border text-primary focus:ring-primary" />
                    <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">Final supervisor inspection</span>
                  </label>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">Assigned Staff</h4>
                <div className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                  <div className="flex items-center gap-3">
                    <UserCircle className="h-8 w-8 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-semibold text-foreground">Maria Rodriguez</p>
                      <p className="text-xs text-muted-foreground">Housekeeper</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs">Change</Button>
                </div>
              </div>
            </div>
            
            <div className="p-4 border-t border-border bg-background">
              <Button className="w-full">Mark as Cleaning</Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

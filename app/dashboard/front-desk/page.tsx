import { Search, LogIn, LogOut, Coffee, ArrowRight, UserPlus } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"

export default function FrontDeskPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Front Desk</h1>
          <p className="text-muted-foreground mt-1 text-sm">Today's operational queue: arrivals, departures, and in-house requests.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="h-9"><UserPlus className="h-4 w-4 mr-2" /> Walk-in Check-in</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left Column: Arrival & Departure Queue */}
        <div className="lg:w-2/3 flex flex-col gap-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Quick search reservation by guest name or confirmation..." 
              className="pl-9 h-11 bg-card border-border shadow-sm text-base"
            />
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <LogIn className="h-4 w-4 text-primary" /> Today's Arrivals
              </h3>
              <Badge variant="softAccent">4 Pending</Badge>
            </div>
            <div className="divide-y divide-border/50">
              {[
                { name: "Eleanor Pena", room: "402", type: "Deluxe Suite", eta: "14:00", vip: true },
                { name: "Jacob Jones", room: "204", type: "Standard", eta: "15:30", vip: false },
                { name: "Leslie Alexander", room: "305", type: "Standard", eta: "16:00", vip: false },
                { name: "Cameron Williamson", room: "501", type: "Penthouse", eta: "18:00", vip: true },
              ].map((g, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-semibold text-sm text-primary">
                      {g.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">
                        {g.name}
                        {g.vip && <Badge variant="softWarning" className="text-[9px] px-1.5 py-0 h-4">VIP</Badge>}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">Room {g.room} • {g.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">ETA</p>
                      <p className="font-medium text-foreground">{g.eta}</p>
                    </div>
                    <Button size="sm">Check In</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-4 border-b border-border bg-muted/20 flex justify-between items-center">
              <h3 className="font-semibold text-foreground flex items-center gap-2">
                <LogOut className="h-4 w-4 text-muted-foreground" /> Today's Departures
              </h3>
              <Badge variant="softDefault">2 Remaining</Badge>
            </div>
            <div className="divide-y divide-border/50 opacity-75">
              {[
                { name: "Brooklyn Simmons", room: "105", type: "Standard", out: "11:00" },
                { name: "Devon Lane", room: "201", type: "Deluxe", out: "12:00 (Late)" },
              ].map((g, i) => (
                <div key={i} className="p-4 flex items-center justify-between hover:bg-muted/30 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-muted border border-border flex items-center justify-center font-semibold text-sm text-muted-foreground">
                      {g.name.split(' ').map(n=>n[0]).join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-foreground flex items-center gap-2">{g.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Room {g.room} • {g.type}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <div className="text-right hidden sm:block">
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Out By</p>
                      <p className="font-medium text-foreground">{g.out}</p>
                    </div>
                    <Button variant="outline" size="sm">Check Out</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: In-House & Quick Actions */}
        <div className="lg:w-1/3 flex flex-col gap-6">
          <div className="bg-primary text-primary-foreground rounded-xl p-6 shadow-md relative overflow-hidden">
            <div className="absolute -right-4 -top-4 opacity-10">
              <Coffee className="h-32 w-32" />
            </div>
            <h3 className="font-semibold mb-1 relative z-10">In-House Guests</h3>
            <p className="text-4xl font-bold tracking-tight relative z-10">142</p>
            <p className="text-sm mt-2 opacity-80 relative z-10">85% current occupancy</p>
          </div>

          <div className="bg-card rounded-xl border border-border shadow-sm p-4">
            <h3 className="font-semibold text-foreground mb-4 uppercase text-xs tracking-wider">Quick Actions</h3>
            <div className="space-y-2">
              <Button variant="outline" className="w-full justify-between font-medium">
                Create Reservation <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="w-full justify-between font-medium">
                Process Payment <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="w-full justify-between font-medium">
                Room Change Request <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Button>
              <Button variant="outline" className="w-full justify-between font-medium">
                Add Guest Note <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

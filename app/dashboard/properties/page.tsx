import { Building2, Search, Plus, MapPin, MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"

const properties = [
  { id: "P-01", name: "Grand Plaza Hotel", type: "Luxury Hotel", location: "New York, NY", rooms: 168, occupancy: "82%", revenue: "$48,240", status: "Active" },
  { id: "P-02", name: "V Resort & Spa", type: "Resort", location: "Miami, FL", rooms: 240, occupancy: "92%", revenue: "$68,200", status: "Active" },
  { id: "P-03", name: "V Business Suites", type: "Business Hotel", location: "Chicago, IL", rooms: 120, occupancy: "64%", revenue: "$12,400", status: "Maintenance" },
  { id: "P-04", name: "V Beach Resort", type: "Resort", location: "Malibu, CA", rooms: 85, occupancy: "98%", revenue: "$84,100", status: "Active" },
]

export default function PropertiesPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Properties</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage your multi-property portfolio and high-level performance.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="h-9"><Plus className="h-4 w-4 mr-2" /> Add Property</Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Properties", value: "4" },
          { label: "Total Rooms", value: "613" },
          { label: "Average Occupancy", value: "84%" },
          { label: "Portfolio Revenue (Today)", value: "$212,940" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 bg-card rounded-xl border border-border shadow-sm flex flex-col justify-center">
            <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
            <div className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Portfolio Grid */}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {properties.map((prop) => (
          <div key={prop.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex flex-col hover:border-primary/50 transition-colors group">
            <div className="h-32 bg-muted relative border-b border-border">
              <div className="absolute inset-0 bg-primary/10"></div>
              {/* Optional: Add an image tag here for actual property images */}
              <div className="absolute top-4 right-4">
                <Badge variant={prop.status === 'Active' ? 'softSuccess' : 'softWarning'}>{prop.status}</Badge>
              </div>
            </div>
            
            <div className="p-5 flex flex-col flex-1">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors">{prop.name}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mt-1 font-medium">
                    <MapPin className="h-3 w-3 mr-1" /> {prop.location}
                    <span className="mx-2">•</span>
                    {prop.type}
                  </div>
                </div>
              </div>
              
              <div className="mt-6 grid grid-cols-3 gap-2 border-t border-border pt-4">
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Rooms</p>
                  <p className="font-semibold text-foreground">{prop.rooms}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Occ %</p>
                  <p className="font-semibold text-foreground">{prop.occupancy}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">Revenue</p>
                  <p className="font-semibold text-foreground">{prop.revenue}</p>
                </div>
              </div>

              <div className="mt-6 flex gap-2">
                <Button className="w-full h-9">View Property</Button>
                <Button variant="outline" size="icon" className="h-9 w-9 shrink-0"><MoreHorizontal className="h-4 w-4" /></Button>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Property Card */}
        <div className="bg-background rounded-xl border-2 border-dashed border-border shadow-sm flex flex-col items-center justify-center p-6 text-center hover:bg-muted/50 transition-colors cursor-pointer min-h-[300px]">
          <div className="h-12 w-12 rounded-full bg-primary/10 text-primary flex items-center justify-center mb-4">
            <Plus className="h-6 w-6" />
          </div>
          <h3 className="font-semibold text-foreground">Add New Property</h3>
          <p className="text-sm text-muted-foreground mt-1 max-w-[200px]">Expand your portfolio by adding a new hotel or resort.</p>
        </div>
      </div>
    </div>
  )
}

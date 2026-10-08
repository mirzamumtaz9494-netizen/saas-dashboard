import { Filter, ChevronDown, CheckCircle2, AlertCircle, Wrench } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const floors = [
  {
    level: "Floor 1",
    rooms: [
      { number: "101", type: "Standard", status: "Available", hk: "Clean" },
      { number: "102", type: "Standard", status: "Occupied", hk: "Dirty" },
      { number: "103", type: "Deluxe", status: "Available", hk: "Cleaning" },
      { number: "104", type: "Deluxe", status: "Available", hk: "Inspected" },
      { number: "105", type: "Suite", status: "Out of Service", hk: "Maintenance" },
    ]
  },
  {
    level: "Floor 2",
    rooms: [
      { number: "201", type: "Standard", status: "Occupied", hk: "Clean" },
      { number: "202", type: "Standard", status: "Available", hk: "Clean" },
      { number: "203", type: "Deluxe", status: "Occupied", hk: "Dirty" },
      { number: "204", type: "Deluxe", status: "Available", hk: "Cleaning" },
      { number: "205", type: "Suite", status: "Occupied", hk: "Clean" },
    ]
  }
]

function getRoomStyles(status: string, hk: string) {
  let base = "relative flex flex-col p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md h-32 justify-between "
  
  if (status === "Out of Service") return base + "bg-muted/50 border-border opacity-60"
  if (status === "Occupied") return base + "bg-primary/5 border-primary/20"
  if (hk === "Clean" || hk === "Inspected") return base + "bg-success-muted/30 border-success-muted"
  if (hk === "Dirty" || hk === "Cleaning") return base + "bg-warning-muted/30 border-warning-muted"
  
  return base + "bg-card border-border"
}

export default function RoomsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Rooms</h1>
          <p className="text-muted-foreground mt-1 text-sm">Visual property overview and real-time room statuses.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background">Grand Plaza Hotel <ChevronDown className="ml-2 h-4 w-4" /></Button>
          <Button variant="outline" className="h-9 bg-background"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {[
          { label: "Total Rooms", value: "168" },
          { label: "Available", value: "42", color: "text-success" },
          { label: "Occupied", value: "115", color: "text-primary" },
          { label: "Cleaning", value: "8", color: "text-warning" },
          { label: "Maintenance", value: "3", color: "text-error" },
        ].map((stat, i) => (
          <div key={i} className={`p-4 bg-card rounded-xl border border-border shadow-sm col-span-2 md:col-span-1 ${i === 0 ? 'md:col-span-2' : ''}`}>
            <span className="text-xs font-medium text-muted-foreground">{stat.label}</span>
            <div className={`mt-1 text-2xl font-bold ${stat.color || 'text-foreground'}`}>{stat.value}</div>
          </div>
        ))}
      </div>

      {/* Visual Room Grid */}
      <div className="flex-1 space-y-8">
        {floors.map((floor, i) => (
          <div key={i} className="space-y-4">
            <div className="flex items-center gap-4">
              <h3 className="font-heading text-lg font-semibold text-foreground">{floor.level}</h3>
              <div className="h-px bg-border flex-1"></div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {floor.rooms.map((room) => (
                <div key={room.number} className={getRoomStyles(room.status, room.hk)}>
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="font-heading text-xl font-bold text-foreground">{room.number}</span>
                      <p className="text-xs font-medium text-muted-foreground mt-0.5">{room.type}</p>
                    </div>
                    {room.status === "Occupied" && <Badge variant="softAccent" className="text-[10px] px-1.5 py-0">Occupied</Badge>}
                    {room.status === "Out of Service" && <Wrench className="h-4 w-4 text-muted-foreground" />}
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-1.5">
                      {room.hk === 'Clean' || room.hk === 'Inspected' ? (
                        <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      ) : room.hk === 'Maintenance' ? (
                        <Wrench className="h-3.5 w-3.5 text-error" />
                      ) : (
                        <AlertCircle className="h-3.5 w-3.5 text-warning" />
                      )}
                      <span className="text-xs font-medium text-muted-foreground">{room.hk}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

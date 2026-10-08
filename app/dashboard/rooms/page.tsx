import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function RoomsPage() {
  const rooms = [
    { number: "101", type: "Standard", status: "Clean", condition: "Good" },
    { number: "102", type: "Standard", status: "Occupied", condition: "Good" },
    { number: "103", type: "Standard", status: "Dirty", condition: "Maintenance Requested" },
    { number: "201", type: "Deluxe", status: "Clean", condition: "Good" },
    { number: "202", type: "Deluxe", status: "Out of Order", condition: "Plumbing Issue" },
    { number: "301", type: "Suite", status: "Occupied", condition: "Good" },
  ]

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Room Status</h1>
          <p className="text-muted-foreground">Housekeeping and maintenance overview.</p>
        </div>
        <Button>Add Room</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {rooms.map((room, i) => (
          <Card key={i} className={room.status === 'Out of Order' ? 'border-error bg-error/5' : ''}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-xl">Room {room.number}</CardTitle>
                <span className="text-xs text-muted-foreground">{room.type}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mt-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Status:</span>
                  <span className={`text-sm font-bold ${
                    room.status === 'Clean' ? 'text-success' : 
                    room.status === 'Occupied' ? 'text-primary' : 
                    room.status === 'Dirty' ? 'text-accent' : 'text-error'
                  }`}>{room.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Condition:</span>
                  <span className="text-sm text-muted-foreground">{room.condition}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

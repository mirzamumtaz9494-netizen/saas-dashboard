import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"

export default function ReservationsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Structural Match: Screenshot 2 Bottom Left (Reservations Calendar Gantt) */}
      
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground">Reservations Calendar</h1>
      </div>

      {/* Gantt Calendar View */}
      <Card className="border-border shadow-sm bg-card overflow-hidden">
        
        {/* Calendar Header */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-muted/10">
          <div className="flex items-center gap-4">
            <span className="font-bold text-sm">Room Type</span>
          </div>
          <div className="flex items-center gap-2">
            <Button className="h-8 text-xs bg-primary text-primary-foreground">Add Booking</Button>
            <Button variant="outline" className="h-8 text-xs">View All</Button>
          </div>
        </div>

        {/* Gantt Grid Structure */}
        <div className="flex flex-col w-full overflow-x-auto">
          {/* Dates Header Row */}
          <div className="flex border-b border-border min-w-[800px]">
            <div className="w-48 shrink-0 p-3 bg-background border-r border-border"></div>
            <div className="flex-1 grid grid-cols-5 bg-background">
              {[19, 20, 21, 22, 23].map(date => (
                <div key={date} className="p-2 border-r border-border flex flex-col items-center justify-center">
                  <span className="text-xs text-muted-foreground font-semibold uppercase">Oct</span>
                  <span className="text-sm font-bold text-foreground">{date}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Deluxe Row */}
          <div className="flex border-b border-border min-w-[800px] bg-background">
            <div className="w-48 shrink-0 p-4 border-r border-border">
              <span className="font-bold text-sm block mb-2">Deluxe</span>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center text-[10px] font-bold text-primary">GB</div>
                <div>
                  <p className="text-xs font-semibold leading-none">Gim Baxter</p>
                  <p className="text-[10px] text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative border-r border-border bg-[linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:20%]">
              {/* Gantt Bar spanning day 19, 20, 21 */}
              <div className="absolute top-4 left-4 right-[42%] h-8 bg-success-muted border border-success/30 rounded flex items-center px-3 shadow-sm">
                <span className="text-xs font-semibold text-success">Confirmed</span>
                <span className="text-[10px] text-success/70 ml-auto">Checked in 11:15m</span>
              </div>
            </div>
          </div>

          {/* Suite Row */}
          <div className="flex border-b border-border min-w-[800px] bg-background">
            <div className="w-48 shrink-0 p-4 border-r border-border">
              <span className="font-bold text-sm block mb-2">Suite</span>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-warning/20 flex items-center justify-center text-[10px] font-bold text-warning">EC</div>
                <div>
                  <p className="text-xs font-semibold leading-none">Enna Coles</p>
                  <p className="text-[10px] text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative border-r border-border bg-[linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:20%]">
              {/* Gantt Bar spanning day 20, 21, 22 */}
              <div className="absolute top-4 left-[22%] right-[22%] h-8 bg-warning-muted border border-warning/30 rounded flex items-center px-3 shadow-sm">
                <span className="text-xs font-semibold text-warning">Confirmed</span>
                <span className="text-[10px] text-warning/70 ml-auto">Checked in 14:00m</span>
              </div>
            </div>
          </div>

          {/* Standard Row */}
          <div className="flex border-b border-border min-w-[800px] bg-background">
            <div className="w-48 shrink-0 p-4 border-r border-border">
              <span className="font-bold text-sm block mb-2">Standard</span>
              <div className="flex items-center gap-2 mb-2">
                <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center text-[10px] font-bold text-primary">SS</div>
                <div>
                  <p className="text-xs font-semibold leading-none">Sora Somes</p>
                  <p className="text-[10px] text-muted-foreground">Confirmed</p>
                </div>
              </div>
            </div>
            <div className="flex-1 relative border-r border-border bg-[linear-gradient(90deg,var(--border)_1px,transparent_1px)] bg-[size:20%]">
              {/* Gantt Bar spanning day 21, 22, 23 */}
              <div className="absolute top-4 left-[42%] right-4 h-8 bg-primary/10 border border-primary/30 rounded flex items-center px-3 shadow-sm">
                <span className="text-xs font-semibold text-primary">Confirmed</span>
                <span className="text-[10px] text-primary/70 ml-auto">Check-in in 1 day</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Today's Arrivals & Departures Table (From screenshot) */}
      <Card className="border-border shadow-sm bg-card mt-2">
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div>
            <h3 className="font-bold text-sm text-foreground">Today's Arrivals & Departures</h3>
            <p className="text-xs text-muted-foreground">4 Arrivals • 2 Departures</p>
          </div>
          <Button variant="outline" className="h-8 text-xs">View All</Button>
        </div>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <tbody className="divide-y divide-border">
              {[
                { name: "Arian Saberi", type: "Arrivals", room: "Room Number", status: "Checked In" },
                { name: "Armin Hadziber", type: "Arrivals", room: "Room Number", status: "Checked In" },
                { name: "Peth Geroen", type: "Arrivals", room: "Room Number", status: "Checked In" },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-muted/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/10 text-[10px] font-bold text-primary flex items-center justify-center">
                        {row.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{row.name}</p>
                        <p className="text-[10px] text-muted-foreground">{row.type}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground font-medium">{row.room}</td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-semibold text-success bg-success-muted px-2 py-1 rounded-md">{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground">Actions...</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>

    </div>
  )
}

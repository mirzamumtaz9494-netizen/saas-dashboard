import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { CalendarDays, Clock, CheckCircle2 } from "lucide-react"

export default function ReservationsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reservations Calendar</h1>
          <p className="text-muted-foreground">Manage your property availability and daily schedules.</p>
        </div>
        <Button>Add Block</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Today's Schedule</CardTitle>
          <CardDescription>October 12, 2026</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "09:00 AM", event: "Housekeeping - Room 101-110", type: "ops" },
              { time: "11:00 AM", event: "Check-out deadline", type: "deadline" },
              { time: "14:00 PM", event: "Check-in begins", type: "deadline" },
              { time: "15:30 PM", event: "VIP Arrival: Jonathan Doe (Suite 405)", type: "vip" },
              { time: "19:00 PM", event: "Restaurant full booking", type: "ops" }
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 rounded-lg border p-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                  {item.type === 'ops' ? <CheckCircle2 className="h-5 w-5 text-muted-foreground" /> :
                   item.type === 'deadline' ? <Clock className="h-5 w-5 text-accent" /> :
                   <CalendarDays className="h-5 w-5 text-primary" />}
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">{item.event}</p>
                  <p className="text-sm text-muted-foreground">{item.time}</p>
                </div>
                {item.type === 'vip' && <span className="px-2 py-1 text-xs font-semibold bg-primary/20 text-primary rounded-full">Priority</span>}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

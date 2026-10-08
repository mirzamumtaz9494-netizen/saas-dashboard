import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Bell, Info, AlertTriangle, CheckCircle } from "lucide-react"

export default function NotificationsPage() {
  const notifications = [
    { type: "info", title: "New Booking Received", desc: "Alice Smith booked Suite 402 for Oct 12.", time: "10 mins ago" },
    { type: "alert", title: "Maintenance Alert", desc: "AC issue reported in Room 204.", time: "1 hour ago" },
    { type: "success", title: "Payment Cleared", desc: "Payout of $4,520 has been deposited to your bank.", time: "3 hours ago" },
    { type: "info", title: "Review Received", desc: "Guest left a 5-star review on Booking.com", time: "Yesterday" },
  ]

  return (
    <div className="grid gap-4 md:gap-8 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Notifications</h1>
          <p className="text-muted-foreground">Your recent alerts and messages.</p>
        </div>
        <Button variant="outline">Mark All as Read</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          {notifications.map((n, i) => (
            <div key={i} className="flex items-start gap-4 p-4 border-b last:border-0 hover:bg-muted/30">
              <div className="mt-1">
                {n.type === 'info' ? <Info className="h-5 w-5 text-accent" /> :
                 n.type === 'alert' ? <AlertTriangle className="h-5 w-5 text-error" /> :
                 <CheckCircle className="h-5 w-5 text-success" />}
              </div>
              <div className="flex-1 space-y-1">
                <p className="font-semibold">{n.title}</p>
                <p className="text-sm text-muted-foreground">{n.desc}</p>
              </div>
              <div className="text-xs text-muted-foreground">{n.time}</div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

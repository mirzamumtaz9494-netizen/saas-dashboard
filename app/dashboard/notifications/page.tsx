import { Bell, ShieldCheck, AlertCircle, CalendarDays, Wallet } from "lucide-react"
import { Button } from "@/components/ui/Button"

const notifications = [
  { id: 1, type: "reservation", title: "New Booking Received", desc: "Sarah Wilson booked Deluxe Suite for Oct 15 - Oct 18.", time: "6 mins ago", icon: CalendarDays, color: "text-primary", bg: "bg-primary/10", unread: true },
  { id: 2, type: "housekeeping", title: "Room 204 requires cleaning", desc: "Housekeeping task automatically assigned to Maria.", time: "14 mins ago", icon: AlertCircle, color: "text-warning", bg: "bg-warning-muted", unread: true },
  { id: 3, type: "payment", title: "Payout Processed", desc: "A payout of $14,240 has been deposited to your bank account.", time: "2 hours ago", icon: Wallet, color: "text-success", bg: "bg-success-muted", unread: false },
  { id: 4, type: "system", title: "System Update", desc: "Vprofessionals platform updated to v2.4. View changelog.", time: "Yesterday", icon: ShieldCheck, color: "text-muted-foreground", bg: "bg-muted", unread: false },
]

export default function NotificationsPage() {
  return (
    <div className="flex flex-col gap-6 h-full max-w-4xl mx-auto w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Notifications</h1>
          <p className="text-muted-foreground mt-1 text-sm">Your centralized alerts and system messages.</p>
        </div>
        <Button variant="outline" className="h-9 bg-background">Mark All as Read</Button>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden flex-1">
        <div className="p-0 divide-y divide-border/50">
          {notifications.map((n) => (
            <div key={n.id} className={`flex items-start gap-4 p-5 transition-colors cursor-pointer ${n.unread ? 'bg-primary/5 hover:bg-primary/10' : 'bg-background hover:bg-muted/30'}`}>
              <div className={`mt-1 h-10 w-10 shrink-0 rounded-full flex items-center justify-center ${n.bg}`}>
                <n.icon className={`h-5 w-5 ${n.color}`} />
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex justify-between items-start">
                  <p className={`text-sm ${n.unread ? 'font-bold text-foreground' : 'font-semibold text-foreground'}`}>
                    {n.title}
                  </p>
                  <span className={`text-xs font-medium whitespace-nowrap ml-4 ${n.unread ? 'text-primary' : 'text-muted-foreground'}`}>
                    {n.time}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{n.desc}</p>
              </div>
              {n.unread && (
                <div className="shrink-0 mt-2">
                  <div className="h-2 w-2 rounded-full bg-primary" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

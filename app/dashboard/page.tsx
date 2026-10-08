import { 
  Users, 
  CreditCard, 
  Activity, 
  CalendarDays, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"

export default function DashboardPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back, here's what's happening at your properties today.</p>
        </div>
        <Button>Download Report</Button>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Occupancy Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">84%</div>
            <p className="text-xs text-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Bookings</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+128</div>
            <p className="text-xs text-error flex items-center mt-1">
              <ArrowDownRight className="h-3 w-3 mr-1" /> -4% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Guests</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-success flex items-center mt-1">
              <ArrowUpRight className="h-3 w-3 mr-1" /> +42 since yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Your revenue and ADR across all properties for the last 7 days.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full bg-muted/20 rounded-md border flex items-center justify-center">
              <p className="text-muted-foreground text-sm flex items-center">
                <span className="h-2 w-2 rounded-full bg-primary mr-2"></span>
                Chart component preview
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Check-ins</CardTitle>
            <CardDescription>
              Guests arriving today.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Olivia Martin", room: "Suite 402", time: "14:30 PM", status: "Checked In" },
                { name: "Jackson Lee", room: "Room 105", time: "15:00 PM", status: "Pending" },
                { name: "Isabella Nguyen", room: "Penthouse", time: "16:45 PM", status: "Pending" },
                { name: "William Kim", room: "Room 204", time: "18:00 PM", status: "Late Arrival" },
              ].map((guest, i) => (
                <div key={i} className="flex items-center">
                  <div className="h-9 w-9 rounded-full bg-muted flex items-center justify-center font-medium">
                    {guest.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{guest.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {guest.room} • {guest.time}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <span className={cn(
                      "text-xs px-2 py-1 rounded-full",
                      guest.status === "Checked In" ? "bg-success/20 text-success" :
                      guest.status === "Pending" ? "bg-accent/20 text-accent-foreground" :
                      "bg-error/20 text-error"
                    )}>
                      {guest.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

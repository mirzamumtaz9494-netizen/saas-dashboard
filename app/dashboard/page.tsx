"use client"

import { 
  Users, 
  CreditCard, 
  BedDouble, 
  CalendarDays, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const revenueData = [
  { name: "Mon", total: 3200 },
  { name: "Tue", total: 4100 },
  { name: "Wed", total: 3800 },
  { name: "Thu", total: 5400 },
  { name: "Fri", total: 7200 },
  { name: "Sat", total: 8500 },
  { name: "Sun", total: 6100 },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8 pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Overview</h1>
          <p className="text-muted-foreground mt-1 text-sm">Here's what's happening at Grand Hotel Downtown today.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9">Oct 12, 2026</Button>
          <Button className="h-9">Download Report</Button>
        </div>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Occupancy Rate</CardTitle>
            <BedDouble className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">78.4%</div>
            <p className="text-xs text-success flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> +8.2% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">$128,450</div>
            <p className="text-xs text-success flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> +12.4% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Reservations</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">1,284</div>
            <p className="text-xs text-success flex items-center mt-1 font-medium">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> +6.8% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">ADR (Avg Daily Rate)</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold tracking-tight">$184.20</div>
            <p className="text-xs text-error flex items-center mt-1 font-medium">
              <ArrowDownRight className="h-3 w-3 mr-0.5" /> -4.2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 flex flex-col">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Daily revenue performance for the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 pl-0">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <XAxis 
                    dataKey="name" 
                    stroke="var(--color-muted-foreground-light)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    dy={10}
                  />
                  <YAxis 
                    stroke="var(--color-muted-foreground-light)" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`}
                    dx={-10}
                  />
                  <Tooltip 
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                    itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  />
                  <Bar dataKey="total" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Arrivals</CardTitle>
              <CardDescription>Guests checking in today.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 -mr-2"><MoreHorizontal className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { name: "Olivia Martin", room: "Suite 402", time: "14:30 PM", status: "VIP", initials: "OM" },
                { name: "Jackson Lee", room: "Room 105", time: "15:00 PM", status: "Standard", initials: "JL" },
                { name: "Isabella Nguyen", room: "Penthouse", time: "16:45 PM", status: "VIP", initials: "IN" },
                { name: "William Kim", room: "Room 204", time: "18:00 PM", status: "Standard", initials: "WK" },
                { name: "Sofia Davis", room: "Room 305", time: "20:00 PM", status: "Late", initials: "SD" },
              ].map((guest, i) => (
                <div key={i} className="flex items-center group">
                  <div className="h-9 w-9 rounded-full bg-muted border border-border flex items-center justify-center font-medium text-xs text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {guest.initials}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">{guest.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {guest.room} • {guest.time}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant={guest.status === 'VIP' ? 'softAccent' : guest.status === 'Late' ? 'softWarning' : 'softDefault'} className="text-[10px] px-2 uppercase tracking-wider">
                      {guest.status}
                    </Badge>
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

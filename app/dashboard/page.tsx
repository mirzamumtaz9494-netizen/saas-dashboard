"use client"

import { 
  Users, 
  CreditCard, 
  BedDouble, 
  CalendarDays, 
  ArrowUpRight, 
  ArrowDownRight, 
  MoreHorizontal,
  ChevronDown
} from "lucide-react"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const revenueData = [
  { name: "Mon", revenue: 14200, occupancy: 72 },
  { name: "Tue", revenue: 16100, occupancy: 74 },
  { name: "Wed", revenue: 15800, occupancy: 76 },
  { name: "Thu", revenue: 18400, occupancy: 78 },
  { name: "Fri", revenue: 24200, occupancy: 92 },
  { name: "Sat", revenue: 26500, occupancy: 95 },
  { name: "Sun", revenue: 21100, occupancy: 84 },
]

export default function DashboardPage() {
  return (
    <div className="grid gap-6 md:gap-8 pb-8">
      {/* 1. Page Context & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Good morning, Alex</h1>
          <p className="text-muted-foreground mt-1 text-sm">Here's your property performance for today.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 bg-background">
            Today <ChevronDown className="ml-2 h-4 w-4 text-muted-foreground" />
          </Button>
          <Button className="h-9">Export Report</Button>
        </div>
      </div>
      
      {/* 2. Key Business KPIs (Level 2 Surface - Borderless grid approach) */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="flex flex-col p-5 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <BedDouble className="h-16 w-16 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Occupancy</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">78.4%</span>
            <span className="text-xs font-semibold text-success flex items-center bg-success-muted px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> 8.2%
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <CreditCard className="h-16 w-16 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Revenue</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">$128,450</span>
            <span className="text-xs font-semibold text-success flex items-center bg-success-muted px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> 12.4%
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <CalendarDays className="h-16 w-16 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">Reservations</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">1,284</span>
            <span className="text-xs font-semibold text-success flex items-center bg-success-muted px-1.5 py-0.5 rounded-md">
              <ArrowUpRight className="h-3 w-3 mr-0.5" /> 6.8%
            </span>
          </div>
        </div>

        <div className="flex flex-col p-5 bg-card rounded-xl border border-border shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-5 opacity-10">
            <Users className="h-16 w-16 text-primary" />
          </div>
          <p className="text-sm font-medium text-muted-foreground">ADR</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-foreground">$184.20</span>
            <span className="text-xs font-semibold text-error flex items-center bg-error-muted px-1.5 py-0.5 rounded-md">
              <ArrowDownRight className="h-3 w-3 mr-0.5" /> 4.2%
            </span>
          </div>
        </div>
      </div>

      {/* 3. Main Performance Visualization */}
      <Card className="col-span-full border-border/60">
        <CardHeader className="flex flex-row items-center justify-between pb-6">
          <div>
            <CardTitle>Revenue & Occupancy Trend</CardTitle>
            <CardDescription>Daily revenue performance overlaid with occupancy context.</CardDescription>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-primary" />
              <span className="text-muted-foreground">Revenue ($)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded-full bg-primary/20" />
              <span className="text-muted-foreground">Occupancy (%)</span>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[320px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="name" 
                  stroke="var(--color-muted-foreground-light)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  dy={10}
                />
                <YAxis 
                  yAxisId="left"
                  stroke="var(--color-muted-foreground-light)" 
                  fontSize={12} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `$${value/1000}k`}
                  dx={-10}
                />
                <Tooltip 
                  cursor={{ stroke: 'var(--border)', strokeWidth: 1, strokeDasharray: '4 4' }}
                  contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }}
                  itemStyle={{ color: 'var(--foreground)', fontWeight: 600 }}
                  labelStyle={{ color: 'var(--muted-foreground)', marginBottom: '4px' }}
                />
                <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 4. Secondary Intelligence & Activity */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Property Performance */}
        <Card className="col-span-4 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Property Performance</CardTitle>
              <CardDescription>Metrics breakdown by location.</CardDescription>
            </div>
            <Button variant="ghost" className="h-8 text-xs font-medium text-primary">View All</Button>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-y border-border">
                  <tr>
                    <th className="px-6 py-3 font-semibold tracking-wider">Property</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Occ %</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Revenue</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">RevPAR</th>
                    <th className="px-6 py-3 font-semibold tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {[
                    { name: "Grand Hotel Downtown", occ: "84%", rev: "$42,500", revpar: "$142", status: "Active" },
                    { name: "Oasis Resort & Spa", occ: "92%", rev: "$68,200", revpar: "$210", status: "Active" },
                    { name: "V Business Suites", occ: "64%", rev: "$12,400", revpar: "$84", status: "Maintenance" },
                    { name: "V Beach Resort", occ: "98%", rev: "$84,100", revpar: "$280", status: "Active" },
                  ].map((prop, i) => (
                    <tr key={i} className="bg-card hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-3.5 font-medium text-foreground">{prop.name}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{prop.occ}</td>
                      <td className="px-6 py-3.5 text-muted-foreground font-medium">{prop.rev}</td>
                      <td className="px-6 py-3.5 text-muted-foreground">{prop.revpar}</td>
                      <td className="px-6 py-3.5">
                        <Badge variant={prop.status === 'Active' ? 'softSuccess' : 'softWarning'} className="text-[10px] uppercase tracking-wider">
                          {prop.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
        
        {/* Upcoming Arrivals */}
        <Card className="col-span-3 border-border/60">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Arrivals</CardTitle>
              <CardDescription>Expected check-ins for the next 4 hours.</CardDescription>
            </div>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground hover:text-foreground"><MoreHorizontal className="h-4 w-4" /></Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Olivia Martin", room: "Suite 402", time: "14:30 PM", status: "VIP", initials: "OM" },
                { name: "Jackson Lee", room: "Room 105", time: "15:00 PM", status: "Standard", initials: "JL" },
                { name: "Isabella Nguyen", room: "Penthouse", time: "16:45 PM", status: "VIP", initials: "IN" },
                { name: "William Kim", room: "Room 204", time: "18:00 PM", status: "Standard", initials: "WK" },
              ].map((guest, i) => (
                <div key={i} className="flex items-center group p-2 -mx-2 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-semibold text-sm text-primary">
                    {guest.initials}
                  </div>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-semibold leading-none text-foreground">{guest.name}</p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {guest.room} <span className="mx-1 text-border">•</span> {guest.time}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Badge variant={guest.status === 'VIP' ? 'softAccent' : 'softDefault'} className="text-[10px] px-2 uppercase tracking-wider">
                      {guest.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4 text-xs font-medium">View All Arrivals</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ComposedChart, CartesianGrid, Legend } from "recharts"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Calendar as CalendarIcon, ArrowUpRight, ArrowDownRight, Users, DoorOpen, DollarSign, Activity, AlertCircle, ChevronRight } from "lucide-react"
import { formatCurrency, formatDateTime } from "@/lib/formatters"
import { mockTasks } from "@/lib/mock-data"
import Link from "next/link"

const revenueData = [
  { name: "Mon", revenue: 4200, occ: 65, prevOcc: 60, prevRevenue: 3900 },
  { name: "Tue", revenue: 4800, occ: 68, prevOcc: 65, prevRevenue: 4500 },
  { name: "Wed", revenue: 5100, occ: 72, prevOcc: 70, prevRevenue: 4800 },
  { name: "Thu", revenue: 4900, occ: 75, prevOcc: 72, prevRevenue: 4600 },
  { name: "Fri", revenue: 5800, occ: 85, prevOcc: 80, prevRevenue: 5200 },
  { name: "Sat", revenue: 6400, occ: 92, prevOcc: 88, prevRevenue: 5900 },
  { name: "Sun", revenue: 6200, occ: 88, prevOcc: 85, prevRevenue: 5800 },
]

const roomTypeOcc = [
  { name: 'Standard', value: 85 },
  { name: 'Deluxe', value: 72 },
  { name: 'Suite', value: 95 },
]
const COLORS = ['#3b82f6', '#8b5cf6', '#eab308']

const sources = [
  { name: 'Direct', value: 45 },
  { name: 'Booking.com', value: 30 },
  { name: 'Expedia', value: 15 },
  { name: 'Airbnb', value: 10 },
]

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7D")

  const kpis = [
    { title: "Occupancy", value: "82%", trend: "+5.2%", up: true, icon: DoorOpen },
    { title: "ADR", value: formatCurrency(145), trend: "+2.1%", up: true, icon: DollarSign },
    { title: "RevPAR", value: formatCurrency(118.90), trend: "+7.4%", up: true, icon: Activity },
    { title: "Revenue", value: formatCurrency(37400), trend: "+8.3%", up: true, icon: DollarSign },
    { title: "Arrivals", value: "24", trend: "-2", up: false, icon: Users },
    { title: "In-House", value: "112", trend: "+12", up: true, icon: Users },
  ]

  return (
    <div className="flex flex-col gap-6 pb-12">
      {/* Global Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h1 className="font-heading text-2xl font-bold text-foreground">Overview</h1>
        <div className="flex items-center gap-3">
          <div className="bg-card border border-border rounded-lg p-1 flex items-center text-sm shadow-sm">
            {['Today', '7D', '30D', 'Custom'].map(r => (
              <button key={r} onClick={() => setDateRange(r)} className={`px-3 py-1.5 rounded-md transition-colors ${dateRange === r ? 'bg-primary text-primary-foreground font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                {r}
              </button>
            ))}
          </div>
          <Button variant="outline" className="h-9"><CalendarIcon className="w-4 h-4 mr-2"/> Compare: Prev Period</Button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        {kpis.map((kpi, i) => (
          <Card key={i} className="bg-card shadow-sm border-border">
            <CardContent className="p-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">{kpi.title}</span>
                <kpi.icon className="h-4 w-4 opacity-50" />
              </div>
              <div className="text-2xl font-bold text-foreground">{kpi.value}</div>
              <div className={`flex items-center text-xs font-medium ${kpi.up ? 'text-success' : 'text-destructive'}`}>
                {kpi.up ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {kpi.trend} <span className="text-muted-foreground font-normal ml-1">vs prev</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        
        {/* Main Chart */}
        <Card className="lg:col-span-2 shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <div>
              <CardTitle className="text-base font-bold">Revenue & Occupancy Trend</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-xs">Export CSV</Button>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `$${val/1000}k`} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(val) => `${val}%`} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))', borderRadius: '8px' }}
                    itemStyle={{ color: 'hsl(var(--foreground))' }}
                  />
                  <Legend wrapperStyle={{ paddingTop: '20px' }} />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                  <Line yAxisId="right" type="monotone" dataKey="occ" name="Occupancy %" stroke="#eab308" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tasks & Alerts Panel */}
        <Card className="shadow-sm border-border bg-card flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-bold flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-warning" /> Tasks & Alerts
            </CardTitle>
            <Link href="/dashboard/housekeeping" className="text-xs text-primary hover:underline">View All</Link>
          </CardHeader>
          <CardContent className="pt-4 flex-1 flex flex-col gap-3 overflow-y-auto">
              <Link href="/dashboard/messages" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3 bg-primary/5">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Unanswered Guest Message</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Jane Doe (Room 302) has been waiting for &gt;30m</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">View</Badge>
              </Link>
              
              <Link href="/dashboard/staff?tab=schedule" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-warning" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Open Shift (Maintenance)</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Needs coverage for tomorrow</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">Assign</Badge>
              </Link>
              
              <Link href="/dashboard/staff?tab=time-off" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Pending Time-Off Request</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Rosa Diaz (Sick Leave)</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">Review</Badge>
              </Link>
            {mockTasks.map(t => (
              <div key={t.id} className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
                <div className={`w-2 h-2 mt-1.5 rounded-full shrink-0 ${t.priority === 'Urgent' ? 'bg-destructive' : 'bg-warning'}`} />
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-foreground">{t.title}</h4>
                  <p className="text-xs text-muted-foreground mt-1">Room {t.roomId} • Assignee: {t.assignee}</p>
                </div>
                <Badge variant="outline" className="text-[10px]">{t.status}</Badge>
              </div>
            ))}
            <div className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
              <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-destructive" />
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-foreground">Unpaid Folio</h4>
                <p className="text-xs text-muted-foreground mt-1">Room 304 checkout pending $450 balance.</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Booking Sources (Donut) */}
        <Card className="shadow-sm border-border bg-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-bold">Booking Sources</CardTitle>
          </CardHeader>
          <CardContent className="pt-6 flex flex-col items-center">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={sources} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                    {sources.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy by Room Type */}
        <Card className="shadow-sm border-border bg-card lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-bold">Occupancy Rate by Room Type</CardTitle>
            <Link href="/dashboard/rooms" className="text-xs text-primary hover:underline">View Availability <ChevronRight className="inline w-3 h-3"/></Link>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={roomTypeOcc} layout="vertical" margin={{ top: 0, right: 30, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="hsl(var(--border))" />
                  <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} />
                  <YAxis type="category" dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: 'hsl(var(--foreground))', fontWeight: 500 }} />
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--card))', borderColor: 'hsl(var(--border))' }} cursor={{fill: 'hsl(var(--muted))'}} formatter={(val) => [`${val}%`, 'Occupancy']} />
                  <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} maxBarSize={30}>
                    {roomTypeOcc.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

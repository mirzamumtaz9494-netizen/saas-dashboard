"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, CartesianGrid, LineChart, Line } from "recharts"
import { MoreHorizontal } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"

const sparklineData = [
  { val: 12 }, { val: 18 }, { val: 15 }, { val: 25 }, { val: 22 }, { val: 30 }, { val: 28 }
]

const marketShareData = [
  { name: 'Jan', a: 4000, b: 2400, c: 2400 },
  { name: 'Feb', a: 3000, b: 1398, c: 2210 },
  { name: 'Mar', a: 2000, b: 9800, c: 2290 },
  { name: 'Apr', a: 2780, b: 3908, c: 2000 },
  { name: 'May', a: 1890, b: 4800, c: 2181 },
  { name: 'Jun', a: 2390, b: 3800, c: 2500 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground">Property Analytics & Reporting</h1>
      </div>

      {/* Top Row: 3 Large KPI Cards with internal charts (matching Screenshot 2 Top Right) */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        
        {/* RevPAR Card */}
        <Card className="border-border shadow-sm bg-card flex flex-col h-[220px]">
          <CardHeader className="pb-0 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">RevPAR</CardTitle>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-foreground">$54,290</span>
                <span className="text-xs font-semibold text-success bg-success-muted px-2 py-0.5 rounded-sm">+12.4%</span>
              </div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 p-0 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <Bar dataKey="val" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* ADR Card */}
        <Card className="border-border shadow-sm bg-card flex flex-col h-[220px]">
          <CardHeader className="pb-0 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">ADR</CardTitle>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-foreground">$210</span>
                <span className="text-xs font-semibold text-success bg-success-muted px-2 py-0.5 rounded-sm">+8%</span>
              </div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 p-0 mt-4 px-4 pb-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={sparklineData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                <XAxis dataKey="val" tick={false} axisLine={false} />
                <Bar dataKey="val" fill="var(--primary)" fillOpacity={0.6} radius={[2, 2, 0, 0]} maxBarSize={15} />
              </BarChart>
            </ResponsiveContainer>
            <div className="flex justify-between text-[10px] text-muted-foreground uppercase font-bold mt-2">
              <span>Daily</span><span>Weekly</span><span>Monthly</span><span>Quarterly</span>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Card */}
        <Card className="border-border shadow-sm bg-card flex flex-col h-[220px]">
          <CardHeader className="pb-0 flex flex-row justify-between items-start">
            <div>
              <CardTitle className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Occupancy</CardTitle>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="text-3xl font-bold text-foreground">88%</span>
              </div>
            </div>
            <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex-1 p-0 mt-4 relative">
            <div className="absolute top-4 right-4 bg-primary/10 border border-primary/20 px-2 py-1 rounded text-xs font-semibold text-primary z-10">
              Target 85%
            </div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={sparklineData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorOcc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <Area type="monotone" dataKey="val" stroke="var(--primary)" strokeWidth={3} fillOpacity={1} fill="url(#colorOcc)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        
        {/* Market Share Stacked Area */}
        <Card className="border-border shadow-sm bg-card flex flex-col h-[400px]">
          <CardHeader className="pb-2 flex justify-between flex-row">
            <div>
              <CardTitle className="text-md">Market Share</CardTitle>
              <p className="text-xs text-muted-foreground">Competitive market share analysis</p>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={marketShareData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }} />
                <Area type="monotone" dataKey="a" stackId="1" stroke="#f43f5e" fill="#f43f5e" fillOpacity={0.8} />
                <Area type="monotone" dataKey="b" stackId="1" stroke="#f59e0b" fill="#f59e0b" fillOpacity={0.8} />
                <Area type="monotone" dataKey="c" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.8} />
                <Area type="monotone" dataKey="c" stackId="1" stroke="var(--primary)" fill="var(--primary)" fillOpacity={0.8} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Predictive Analytics */}
        <Card className="border-border shadow-sm bg-card flex flex-col h-[400px]">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Predictive Analytics</CardTitle>
            <p className="text-xs text-muted-foreground">Forecast for future true bookings</p>
          </CardHeader>
          <CardContent className="flex-1 pt-4 space-y-6">
            
            <div className="flex items-center justify-between text-xs text-muted-foreground border-b border-border pb-2 uppercase tracking-wider font-semibold">
              <span>Scenario</span>
              <span>Confidence Interval</span>
            </div>

            {[
              { label: "Scenario 1", val: 88, color: "bg-success" },
              { label: "Scenario 2", val: 72, color: "bg-primary" },
              { label: "Scenario 3", val: 45, color: "bg-warning" },
              { label: "Scenario 4", val: 32, color: "bg-error" },
            ].map((row, i) => (
              <div key={i} className="flex items-center justify-between group">
                <span className="text-sm font-semibold text-foreground">{row.label}</span>
                <div className="flex items-center gap-4 w-2/3">
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${row.color}`} style={{ width: `${row.val}%` }} />
                  </div>
                  <span className="text-sm font-bold w-8 text-right">{row.val}%</span>
                </div>
              </div>
            ))}
            
            <div className="mt-8 p-4 bg-muted/20 border border-border rounded-lg flex justify-between items-center">
              <div>
                <p className="text-sm font-bold text-foreground">Forecast Complete</p>
                <p className="text-xs text-muted-foreground">Model executed successfully across all variables.</p>
              </div>
              <Button variant="outline" size="sm">View Data</Button>
            </div>

          </CardContent>
        </Card>

      </div>
    </div>
  )
}

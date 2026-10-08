"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts"
import { ChevronDown, Download, Filter } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card"

const performanceData = [
  { name: "Jan", revpar: 120, adr: 150 },
  { name: "Feb", revpar: 132, adr: 155 },
  { name: "Mar", revpar: 145, adr: 160 },
  { name: "Apr", revpar: 160, adr: 175 },
  { name: "May", revpar: 180, adr: 190 },
  { name: "Jun", revpar: 210, adr: 215 },
]

const sourceData = [
  { name: "Direct", value: 45 },
  { name: "Booking.com", value: 30 },
  { name: "Expedia", value: 15 },
  { name: "Corporate", value: 10 },
]

export default function AnalyticsPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Analytics</h1>
          <p className="text-muted-foreground mt-1 text-sm">Advanced business intelligence and multi-property comparisons.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background">Grand Plaza Hotel <ChevronDown className="ml-2 h-4 w-4" /></Button>
          <Button variant="outline" className="h-9 bg-background">Last 6 Months <ChevronDown className="ml-2 h-4 w-4" /></Button>
          <Button className="h-9"><Download className="h-4 w-4 mr-2" /> Export PDF</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* KPI Strip */}
        <div className="col-span-full grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Revenue", value: "$1.2M", diff: "+14%" },
            { label: "Avg Occupancy", value: "76%", diff: "+4%" },
            { label: "ADR", value: "$184", diff: "+8%" },
            { label: "RevPAR", value: "$142", diff: "+12%" },
            { label: "Booking Volume", value: "8,402", diff: "+6%" },
          ].map((kpi, i) => (
            <div key={i} className="p-4 bg-card rounded-xl border border-border shadow-sm flex flex-col justify-center">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{kpi.label}</span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                <span className="text-xs font-semibold text-success">{kpi.diff}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Charts */}
        <Card className="col-span-full lg:col-span-2 border-border/60">
          <CardHeader>
            <CardTitle>ADR vs RevPAR Trend</CardTitle>
            <CardDescription>Average Daily Rate compared to Revenue Per Available Room over the last 6 months.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }} barGap={8}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                  <XAxis dataKey="name" stroke="var(--color-muted-foreground-light)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                  <YAxis stroke="var(--color-muted-foreground-light)" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v}`} />
                  <Tooltip 
                    cursor={{ fill: 'var(--muted)' }}
                    contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                  />
                  <Bar dataKey="adr" name="ADR" fill="var(--primary)" radius={[4, 4, 0, 0]} maxBarSize={30} />
                  <Bar dataKey="revpar" name="RevPAR" fill="var(--primary)" fillOpacity={0.3} radius={[4, 4, 0, 0]} maxBarSize={30} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/60">
          <CardHeader>
            <CardTitle>Booking Sources</CardTitle>
            <CardDescription>Distribution of reservations by channel.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6 mt-4">
              {sourceData.map((src, i) => (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-semibold text-foreground">{src.name}</span>
                    <span className="text-muted-foreground font-medium">{src.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full" 
                      style={{ width: `${src.value}%`, opacity: 1 - (i * 0.2) }}
                    />
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

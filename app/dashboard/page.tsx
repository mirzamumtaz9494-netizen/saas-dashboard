"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell } from "recharts"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

const revenueData = [
  { name: "1st", revenue: 42000, occ: 35000 },
  { name: "5th", revenue: 48000, occ: 38000 },
  { name: "10th", revenue: 51000, occ: 42000 },
  { name: "15th", revenue: 49000, occ: 45000 },
  { name: "20th", revenue: 58000, occ: 52000 },
  { name: "25th", revenue: 54000, occ: 48000 },
  { name: "30th", revenue: 62000, occ: 55000 },
]

const roomTypeData = [
  { name: 'Deluxe', value: 45 },
  { name: 'Suite', value: 30 },
  { name: 'Standard', value: 25 },
]
const COLORS = ['var(--primary)', '#818cf8', '#c7d2fe']

const sentimentData = [
  [4, 5, 4, 3, 5, 4, 5],
  [5, 4, 5, 4, 4, 5, 4],
  [3, 4, 4, 3, 4, 4, 5],
  [4, 5, 5, 4, 5, 5, 4],
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Top Row: Revenue and Room Type (Matches Screenshot 1 Dark Mode structure) */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        
        {/* Revenue Chart - spanning 2 cols */}
        <Card className="lg:col-span-2 border-border shadow-sm bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-start pb-2">
            <div>
              <CardTitle className="text-lg">Revenue</CardTitle>
              <p className="text-xs text-muted-foreground mt-1">Last 30 Days</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-3xl font-bold">$54,290</span>
                <span className="text-sm text-muted-foreground line-through">$54,290</span>
                <span className="text-xs font-semibold text-success bg-success-muted px-2 py-0.5 rounded-full">+12.4%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[10px] font-medium">RevPAR & Occupancy</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }} />
                <Area type="monotone" dataKey="occ" stroke="#818cf8" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="revenue" stroke="var(--primary)" strokeWidth={3} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Type Performance - Donut */}
        <Card className="border-border shadow-sm bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-lg">Room Type Performance</CardTitle>
            <Button variant="ghost" size="sm" className="text-[10px] h-6 px-2 bg-muted/50">View All</Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[250px]">
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)', borderRadius: '8px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 w-full mt-4">
              {roomTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <div className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        
        {/* RevPAR & Occupancy Bar Chart */}
        <Card className="border-border shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">RevPAR & Occupancy</CardTitle>
            <p className="text-xs text-muted-foreground">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">58%</span>
              <span className="text-[10px] text-success">+10.4%</span>
            </div>
          </CardHeader>
          <CardContent className="h-[180px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(0, 5)} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'var(--muted-foreground)' }} />
                <Bar dataKey="revenue" fill="var(--primary)" radius={[2, 2, 0, 0]} maxBarSize={12} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Rate Progress */}
        <Card className="border-border shadow-sm bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-md">Occupancy Rate</CardTitle>
            <p className="text-xs text-muted-foreground">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-2xl font-bold">28%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 mt-4">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Standard</span>
                <span className="font-bold">$55,300</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[75%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Deluxe</span>
                <span className="font-bold">$26,305</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/60 w-[45%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-muted-foreground">Suite</span>
                <span className="font-bold">$9,105</span>
              </div>
              <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-primary/30 w-[15%] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Feedback Sentiment (Heatmap Grid) */}
        <Card className="border-border shadow-sm bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <CardTitle className="text-md">Guest Feedback Sentiment</CardTitle>
            <Button variant="ghost" size="sm" className="text-[10px] h-6 px-2 bg-muted/50">View All</Button>
          </CardHeader>
          <CardContent className="flex-1 pt-2">
            <div className="grid grid-cols-8 gap-1 h-[140px]">
              <div className="col-span-1 flex flex-col justify-between text-[9px] text-muted-foreground text-right pr-2">
                <span>Deluxe</span>
                <span>Standard</span>
                <span>Suite</span>
                <span>Other</span>
              </div>
              <div className="col-span-7 grid grid-rows-4 gap-1">
                {sentimentData.map((row, i) => (
                  <div key={i} className="grid grid-cols-7 gap-1">
                    {row.map((val, j) => (
                      <div 
                        key={j} 
                        className="rounded-sm" 
                        style={{ 
                          backgroundColor: val === 5 ? 'var(--primary)' : 
                                           val === 4 ? 'rgba(79, 70, 229, 0.6)' : 
                                           val === 3 ? 'rgba(79, 70, 229, 0.3)' : 'var(--muted)' 
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div className="col-span-1"></div>
              <div className="col-span-7 flex justify-between text-[9px] text-muted-foreground mt-1">
                <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

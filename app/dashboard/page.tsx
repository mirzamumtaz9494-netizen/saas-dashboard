"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, ComposedChart } from "recharts"
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
const COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))']

const sentimentData = [
  [4, 5, 4, 3, 5, 4, 5],
  [5, 4, 5, 4, 4, 5, 4],
  [3, 4, 4, 3, 4, 4, 5],
  [4, 5, 5, 4, 5, 5, 4],
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 h-full pb-8">
      {/* Top Row: Revenue and Room Type */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        
        {/* Revenue Chart */}
        <Card className="border-border shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-start pb-2">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground tracking-wide">Revenue</CardTitle>
              <p className="text-[10px] text-muted-foreground mt-0.5">Last 7 days</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-primary">$54,290</span>
                <span className="text-xs text-muted-foreground line-through">$54,290</span>
                <span className="text-[10px] font-semibold text-success bg-success-muted px-1.5 py-0.5 rounded-sm">+12.4%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] font-medium border-border text-primary bg-background">RevPAR & Occupancy</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '4px', fontSize: '12px', color: 'hsl(var(--primary))' }} 
                />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[2, 2, 0, 0]} maxBarSize={20} />
                <Line type="monotone" dataKey="occ" stroke="hsl(var(--chart-2))" strokeWidth={2} dot={{ r: 3, fill: 'hsl(var(--primary))', strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Type Performance - Donut */}
        <Card className="border-border shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-0">
            <CardTitle className="text-sm font-semibold tracking-wide">Room Type Performance</CardTitle>
            <Button variant="ghost" size="sm" className="text-[9px] h-5 px-2 bg-background hover:bg-muted border border-border text-primary">View All</Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[220px] relative">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
               <div className="h-24 w-24 rounded-full border border-border opacity-50"></div>
            </div>
            <div className="h-[180px] w-full z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={roomTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={75}
                    paddingAngle={2}
                    dataKey="value"
                    stroke="none"
                  >
                    {roomTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ backgroundColor: 'hsl(var(--background))', borderColor: 'hsl(var(--border))', borderRadius: '4px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 w-full mt-2 z-10">
              {roomTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: COLORS[index] }} />
                  {item.name}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Row */}
      <div className="grid gap-5 grid-cols-1 md:grid-cols-3">
        
        {/* RevPAR & Occupancy Bar Chart */}
        <Card className="border-border shadow-none bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">RevPAR & Occupancy</CardTitle>
            <p className="text-[9px] text-muted-foreground mt-0.5">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-primary">58%</span>
              <span className="text-[9px] font-semibold text-success">+10.4%</span>
            </div>
          </CardHeader>
          <CardContent className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData.slice(0, 5)} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} />
                <Bar dataKey="revenue" fill="hsl(var(--chart-1))" radius={[1, 1, 0, 0]} maxBarSize={6} />
                <Line type="monotone" dataKey="occ" stroke="hsl(var(--chart-2))" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Rate Progress */}
        <Card className="border-border shadow-none bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">Occupancy Rate</CardTitle>
            <p className="text-[9px] text-muted-foreground mt-0.5">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold text-primary">28%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 mt-3">
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Standard</span>
                <span className="font-bold text-primary">$55,300</span>
              </div>
              <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-chart-1 w-[75%] rounded-full shadow-sm" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Deluxe</span>
                <span className="font-bold text-primary">$26,305</span>
              </div>
              <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-chart-1 opacity-70 w-[45%] rounded-full" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Suite</span>
                <span className="font-bold text-primary">$9,105</span>
              </div>
              <div className="h-1 w-full bg-background rounded-full overflow-hidden">
                <div className="h-full bg-chart-1 opacity-40 w-[15%] rounded-full" style={{ backgroundColor: 'hsl(var(--chart-1))' }} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Feedback Sentiment (Heatmap Grid) */}
        <Card className="border-border shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle className="text-sm font-semibold tracking-wide">Guest Feedback Sentiment</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-[9px] h-5 px-2 bg-background hover:bg-muted border border-border text-primary">View All</Button>
          </CardHeader>
          <CardContent className="flex-1 pt-2">
            <div className="grid grid-cols-[auto_1fr] gap-2 h-[120px]">
              <div className="flex flex-col justify-between text-[8px] font-medium text-muted-foreground text-right">
                <span>Deluxe</span>
                <span>Standard</span>
                <span>Suite</span>
                <span>Other</span>
              </div>
              <div className="flex flex-col justify-between w-full">
                <div className="grid grid-rows-4 gap-[2px] flex-1">
                  {sentimentData.map((row, i) => (
                    <div key={i} className="grid grid-cols-7 gap-[2px]">
                      {row.map((val, j) => {
                        let op = val === 5 ? 1 : val === 4 ? 0.6 : val === 3 ? 0.2 : 0;
                        return (
                          <div 
                            key={j} 
                            className="rounded-[1px]" 
                            style={{ 
                              backgroundColor: op > 0 ? `hsl(var(--primary) / ${op})` : 'hsl(var(--background))' 
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-[2px] text-[8px] text-muted-foreground mt-1 text-center">
                  <span>01</span><span>02</span><span>03</span><span>04</span><span>05</span><span>06</span><span>07</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

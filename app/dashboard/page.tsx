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
const COLORS = ['url(#goldGrad)', 'url(#silverGrad)', '#1e293b']

const sentimentData = [
  [4, 5, 4, 3, 5, 4, 5],
  [5, 4, 5, 4, 4, 5, 4],
  [3, 4, 4, 3, 4, 4, 5],
  [4, 5, 5, 4, 5, 5, 4],
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-5 h-full pb-8">
      {/* Top Row: Revenue and Room Type (Matches Screenshot 1 Dark Mode structure) */}
      <div className="grid gap-5 grid-cols-1 lg:grid-cols-[2fr_1fr]">
        
        {/* Revenue Chart */}
        <Card className="border-[#2A3441] shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-start pb-2">
            <div>
              <CardTitle className="text-sm font-semibold text-foreground tracking-wide">Revenue</CardTitle>
              <p className="text-[10px] text-muted-foreground mt-0.5">Last 7 days</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className="text-2xl font-bold text-white">$54,290</span>
                <span className="text-xs text-muted-foreground line-through">$54,290</span>
                <span className="text-[10px] font-semibold text-[#10B981] bg-[#10B981]/10 px-1.5 py-0.5 rounded-sm">+12.4%</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-[9px] font-medium border-[#3A4556] text-muted-foreground bg-[#1A2235]">RevPAR & Occupancy</Badge>
            </div>
          </CardHeader>
          <CardContent className="flex-1 min-h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData} margin={{ top: 20, right: 0, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="barGold" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FDE08B"/>
                    <stop offset="50%" stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#8B6508"/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} tickFormatter={(v) => `$${v/1000}k`} />
                <Tooltip 
                  cursor={{ fill: 'rgba(255,255,255,0.02)' }}
                  contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A4556', borderRadius: '4px', fontSize: '12px' }} 
                />
                <Bar dataKey="revenue" fill="url(#barGold)" radius={[2, 2, 0, 0]} maxBarSize={20} />
                <Line type="monotone" dataKey="occ" stroke="#FFFFFF" strokeWidth={2} dot={{ r: 3, fill: '#D4AF37', strokeWidth: 0 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Room Type Performance - Donut */}
        <Card className="border-[#2A3441] shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-0">
            <CardTitle className="text-sm font-semibold tracking-wide">Room Type Performance</CardTitle>
            <Button variant="ghost" size="sm" className="text-[9px] h-5 px-2 bg-[#1A2235] hover:bg-[#2A3441] border border-[#3A4556]">View All</Button>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col items-center justify-center min-h-[220px] relative">
            <div className="absolute inset-0 z-0 flex items-center justify-center">
               <div className="h-24 w-24 rounded-full border border-[#2A3441] opacity-50"></div>
            </div>
            <div className="h-[180px] w-full z-10">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <defs>
                    <linearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#FDE08B"/>
                      <stop offset="100%" stopColor="#B8860B"/>
                    </linearGradient>
                    <linearGradient id="silverGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#F8FAFC"/>
                      <stop offset="100%" stopColor="#94A3B8"/>
                    </linearGradient>
                  </defs>
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
                  <Tooltip contentStyle={{ backgroundColor: '#0B132B', borderColor: '#3A4556', borderRadius: '4px', fontSize: '12px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-4 w-full mt-2 z-10">
              {roomTypeData.map((item, index) => (
                <div key={index} className="flex items-center gap-1.5 text-[9px] font-medium text-muted-foreground uppercase tracking-wider">
                  <div className="h-1.5 w-1.5 rounded-full" style={{ background: index === 0 ? '#D4AF37' : index === 1 ? '#E2E8F0' : '#1e293b' }} />
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
        <Card className="border-[#2A3441] shadow-none bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">RevPAR & Occupancy</CardTitle>
            <p className="text-[9px] text-muted-foreground mt-0.5">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">58%</span>
              <span className="text-[9px] font-semibold text-[#10B981]">+10.4%</span>
            </div>
          </CardHeader>
          <CardContent className="h-[150px]">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={revenueData.slice(0, 5)} margin={{ top: 10, right: 0, left: -25, bottom: 0 }}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 9, fill: '#64748B' }} />
                <Bar dataKey="revenue" fill="url(#barGold)" radius={[1, 1, 0, 0]} maxBarSize={6} />
                <Line type="monotone" dataKey="occ" stroke="#10B981" strokeWidth={1.5} dot={false} />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Rate Progress */}
        <Card className="border-[#2A3441] shadow-none bg-card">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold tracking-wide">Occupancy Rate</CardTitle>
            <p className="text-[9px] text-muted-foreground mt-0.5">026</p>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xl font-bold">28%</span>
            </div>
          </CardHeader>
          <CardContent className="space-y-5 mt-3">
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Standard</span>
                <span className="font-bold text-white">$55,300</span>
              </div>
              <div className="h-1 w-full bg-[#1A2235] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] w-[75%] rounded-full shadow-[0_0_8px_rgba(212,175,55,0.5)]" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Deluxe</span>
                <span className="font-bold text-white">$26,305</span>
              </div>
              <div className="h-1 w-full bg-[#1A2235] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] opacity-70 w-[45%] rounded-full" />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-[10px] mb-1.5">
                <span className="text-muted-foreground font-medium">Suite</span>
                <span className="font-bold text-white">$9,105</span>
              </div>
              <div className="h-1 w-full bg-[#1A2235] rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#D4AF37] to-[#FDE08B] opacity-40 w-[15%] rounded-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Guest Feedback Sentiment (Heatmap Grid) */}
        <Card className="border-[#2A3441] shadow-none bg-card flex flex-col">
          <CardHeader className="flex flex-row justify-between items-center pb-2">
            <div>
              <CardTitle className="text-sm font-semibold tracking-wide">Guest Feedback Sentiment</CardTitle>
            </div>
            <Button variant="ghost" size="sm" className="text-[9px] h-5 px-2 bg-[#1A2235] hover:bg-[#2A3441] border border-[#3A4556]">View All</Button>
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
                      {row.map((val, j) => (
                        <div 
                          key={j} 
                          className="rounded-[1px]" 
                          style={{ 
                            backgroundColor: val === 5 ? '#D4AF37' : 
                                             val === 4 ? 'rgba(212, 175, 55, 0.6)' : 
                                             val === 3 ? 'rgba(212, 175, 55, 0.2)' : '#1A2235' 
                          }}
                        />
                      ))}
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

"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  FileText, Download, Calendar as CalendarIcon, TrendingUp, TrendingDown,
  ArrowUpRight, ArrowDownRight, Info, Filter, Clock, Save,
  RefreshCw, Lock, Table as TableIcon, LayoutDashboard, ChevronRight,
  AlertTriangle, CheckCircle2, MoreVertical, Search, Star, BarChart3, PieChart
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, EmptyState } from "@/components/ui/Feedback"
import { 
  ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, 
  CartesianGrid, Tooltip, Legend
} from "recharts"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { 
  subDays, format, parseISO, isSameDay
} from "date-fns"
import { formatCurrency } from "@/lib/formatters"
import { calculateMetricsForDateRange } from "@/lib/metrics"
import { mockRoomTypes } from "@/lib/mock-data"

export default function ReportsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "overview"
  
  const { role, tenant } = useTenant()

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // Filters
  const [dateRange, setDateRange] = useState("Last 30 Days")
  const [compare, setCompare] = useState(true)
  
  // Export state
  const [isExporting, setIsExporting] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
  }, [tabParam])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => {
      setIsExporting(false)
      // trigger a toast here ideally
    }, 1500)
  }

  if (!mounted) return null

  // Auth: Housekeeping blocked
  if (role === "Housekeeping") {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState title="Access Denied" description="You do not have permission to view Financial Reports." icon={Lock} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Reports
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Reports</h1>
          <p className="text-sm text-muted-foreground mt-1">Generate financial, occupancy, and operational reports.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 bg-card"><Save className="w-4 h-4 mr-2" /> Save View</Button>
            <Button variant="outline" className="h-9 bg-card"><Clock className="w-4 h-4 mr-2" /> Schedule Report</Button>
            <Button variant="default" className="h-9 bg-primary text-primary-foreground font-bold" onClick={handleExport} disabled={isExporting}>
              {isExporting ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
              {isExporting ? "Exporting..." : "Export"}
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {[
              { id: "overview", label: "Overview" },
              { id: "library", label: "Report Library" },
              { id: "scheduled", label: "Scheduled" },
              { id: "saved", label: "Saved Views" }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setTab(tab.id)} 
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto relative">
        {activeTab === "overview" && <OverviewTab compare={compare} setCompare={setCompare} />}
        {activeTab === "library" && <LibraryTab />}
        {activeTab === "scheduled" && <ScheduledTab />}
        {activeTab === "saved" && <SavedTab />}
      </div>

    </div>
  )
}

function OverviewTab({ compare, setCompare }: { compare: boolean, setCompare: (v: boolean) => void }) {
  // Use today and last 30 days
  const today = new Date()
  const startDate = subDays(today, 30)
  
  // Real metrics computed from mock data via lib/metrics
  const { summary, daily } = useMemo(() => calculateMetricsForDateRange(startDate, today), [])
  const prevMetrics = useMemo(() => calculateMetricsForDateRange(subDays(startDate, 30), startDate), []) // comparison

  const [activeMetric, setActiveMetric] = useState<"Total Revenue" | "Occupancy %" | "ADR" | "RevPAR">("Total Revenue")

  // Helper for trend %
  const getTrend = (current: number, prev: number) => {
    if (prev === 0) return { val: 0, dir: 'up' }
    const pct = ((current - prev) / prev) * 100
    return { val: Math.abs(pct).toFixed(1), dir: pct >= 0 ? 'up' : 'down' }
  }

  const trends = {
    rev: getTrend(summary.totalRevenue, prevMetrics.summary.totalRevenue),
    occ: getTrend(summary.occupancy, prevMetrics.summary.occupancy),
    adr: getTrend(summary.adr, prevMetrics.summary.adr),
    revpar: getTrend(summary.revpar, prevMetrics.summary.revpar)
  }

  return (
    <div className="flex flex-col space-y-6 pt-4 pb-12">
      
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 bg-card p-3 border border-border rounded-lg shadow-sm">
        <div className="flex items-center gap-2 border-r border-border pr-3">
          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">Date Range:</span>
          <select className="h-8 text-sm bg-background border border-border rounded px-2 w-40">
            <option>Last 30 Days</option>
            <option>This Month</option>
            <option>Last 7 Days</option>
            <option>Custom Range...</option>
          </select>
        </div>
        <div className="flex items-center gap-2 border-r border-border pr-3">
          <label className="flex items-center gap-2 text-sm cursor-pointer hover:text-foreground text-muted-foreground">
            <input type="checkbox" className="accent-primary" checked={compare} onChange={e => setCompare(e.target.checked)} /> Compare to previous
          </label>
        </div>
        <div className="flex items-center gap-2 border-r border-border pr-3">
          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">Property:</span>
          <select className="h-8 text-sm bg-background border border-border rounded px-2 w-48">
            <option>The Grand Plaza</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">Group by:</span>
          <select className="h-8 text-sm bg-background border border-border rounded px-2">
            <option>Day</option>
            <option>Week</option>
            <option>Month</option>
          </select>
        </div>
        <div className="ml-auto text-xs text-muted-foreground flex items-center">
          <RefreshCw className="w-3 h-3 mr-1" /> Last updated: Just now
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard 
          title="Total Revenue" 
          val={formatCurrency(summary.totalRevenue)} 
          trend={trends.rev} compare={compare}
          isActive={activeMetric === "Total Revenue"}
          onClick={() => setActiveMetric("Total Revenue")}
          info="Total room revenue + extras."
        />
        <KpiCard 
          title="Occupancy %" 
          val={`${summary.occupancy.toFixed(1)}%`} 
          trend={trends.occ} compare={compare}
          isActive={activeMetric === "Occupancy %"}
          onClick={() => setActiveMetric("Occupancy %")}
          info="Rooms sold / Rooms available."
        />
        <KpiCard 
          title="Average Daily Rate (ADR)" 
          val={formatCurrency(summary.adr)} 
          trend={trends.adr} compare={compare}
          isActive={activeMetric === "ADR"}
          onClick={() => setActiveMetric("ADR")}
          info="Room revenue / Rooms sold."
        />
        <KpiCard 
          title="RevPAR" 
          val={formatCurrency(summary.revpar)} 
          trend={trends.revpar} compare={compare}
          isActive={activeMetric === "RevPAR"}
          onClick={() => setActiveMetric("RevPAR")}
          info="Room revenue / Rooms available."
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        
        {/* Main Chart */}
        <div className="xl:col-span-3 bg-card border border-border rounded-xl p-5 shadow-sm flex flex-col min-h-[450px]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold">Performance Trend</h2>
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-primary" /> Revenue (Left Axis)</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-amber-600" /> Occupancy % (Right Axis)</div>
              <div className="flex items-center gap-1.5"><div className="w-3 h-1 bg-rose-600" /> ADR (Left Axis)</div>
            </div>
          </div>
          
          <div className="flex-1 w-full relative">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={daily} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                <XAxis 
                  dataKey="shortDate" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} 
                  dy={10} 
                  minTickGap={20}
                />
                
                {/* Left Axis: Currency (Revenue, ADR, RevPAR) */}
                <YAxis 
                  yAxisId="left"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} 
                  tickFormatter={(val) => `$${val.toLocaleString()}`}
                  dx={-10}
                />
                
                {/* Right Axis: Percentages (Occupancy) */}
                <YAxis 
                  yAxisId="right"
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 11, fill: "var(--muted-foreground)" }} 
                  tickFormatter={(val) => `${val}%`}
                  dx={10}
                />

                <Tooltip content={<CustomTooltip />} />
                
                <Bar yAxisId="left" dataKey="totalRev" fill="var(--primary)" radius={[2, 2, 0, 0]} maxBarSize={40} opacity={0.8} />
                <Line yAxisId="right" type="monotone" dataKey="occupancy" stroke="#d97706" strokeWidth={2} dot={{ r: 3, fill: "#d97706" }} activeDot={{ r: 5 }} />
                <Line yAxisId="left" type="monotone" dataKey="adr" stroke="#e11d48" strokeWidth={2} dot={{ r: 3, fill: "#e11d48" }} activeDot={{ r: 5 }} />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
          
          <div className="mt-4 pt-4 border-t border-border flex justify-end">
            <Button variant="ghost" size="sm" className="h-8"><TableIcon className="w-4 h-4 mr-2" /> View as table</Button>
          </div>
        </div>

        {/* Side Panels */}
        <div className="space-y-6">
          
          {/* Booking Sources */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-sm">Top Booking Sources</h3>
              <Button variant="link" className="text-[10px] h-auto p-0">View All</Button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Direct Website", rev: 12500, pct: 45 },
                { name: "Booking.com", rev: 8400, pct: 30 },
                { name: "Expedia", rev: 4200, pct: 15 },
                { name: "Airbnb", rev: 2800, pct: 10 }
              ].map((s, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs mb-1.5">
                    <span className="font-semibold">{s.name}</span>
                    <span className="text-muted-foreground">{formatCurrency(s.rev)} ({s.pct}%)</span>
                  </div>
                  <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Occupancy by Room Type */}
          <div className="bg-card border border-border rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm mb-4">Occupancy by Room Type</h3>
            <div className="space-y-3">
              {mockRoomTypes.map((rt: any, i: number) => {
                const occ = Math.floor(65 + Math.random() * 30);
                return (
                  <div key={rt.id} className="flex justify-between items-center cursor-pointer hover:bg-muted/30 p-1 -mx-1 rounded transition-colors">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full border-2 border-primary border-r-transparent rotate-45 shrink-0 relative flex items-center justify-center">
                        <span className="text-[7px] font-bold absolute -rotate-45">{occ}%</span>
                      </div>
                      <span className="text-xs font-semibold">{rt.name}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">{formatCurrency(rt.baseRate)} ADR</div>
                  </div>
                )
              })}
            </div>
          </div>
          
          {/* Insights Alert Engine */}
          <div className="bg-warning/10 border border-warning/30 rounded-xl p-4 shadow-sm">
            <h3 className="font-bold text-sm text-warning-foreground mb-3 flex items-center"><BarChart3 className="w-4 h-4 mr-2"/> Automated Insights</h3>
            <div className="space-y-3">
              <div className="bg-card p-3 rounded border border-border text-xs">
                <div className="flex items-center gap-1.5 font-bold text-destructive mb-1"><AlertTriangle className="w-3.5 h-3.5"/> High Severity</div>
                <p className="text-muted-foreground mb-2">Cancellations are up 18% vs the previous 30 days, primarily originating from Booking.com.</p>
                <Button variant="outline" size="sm" className="h-6 text-[10px] w-full">View Cancellations Report</Button>
              </div>
              <div className="bg-card p-3 rounded border border-border text-xs">
                <div className="flex items-center gap-1.5 font-bold text-primary mb-1"><TrendingUp className="w-3.5 h-3.5"/> Positive Trend</div>
                <p className="text-muted-foreground">Direct booking revenue has increased by 12% week-over-week.</p>
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Breakdown Table */}
      <div className="bg-card border border-border rounded-xl shadow-sm mt-4 flex flex-col overflow-hidden">
        <div className="border-b border-border flex gap-4 px-4 bg-muted/10">
          <button className="py-3 text-sm font-bold border-b-2 border-primary text-primary">By Day</button>
          <button className="py-3 text-sm font-semibold border-b-2 border-transparent text-muted-foreground">By Room Type</button>
          <button className="py-3 text-sm font-semibold border-b-2 border-transparent text-muted-foreground">By Channel</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium text-right">Avail</th>
                <th className="px-4 py-3 font-medium text-right">Sold</th>
                <th className="px-4 py-3 font-medium text-right">Occ %</th>
                <th className="px-4 py-3 font-medium text-right">Room Rev</th>
                <th className="px-4 py-3 font-medium text-right">ADR</th>
                <th className="px-4 py-3 font-medium text-right">RevPAR</th>
                <th className="px-4 py-3 font-medium text-right">Total Rev</th>
              </tr>
            </thead>
            <tbody>
              {daily.slice(0, 10).map((d: any) => (
                <tr key={d.dateStr} className="border-b border-border hover:bg-muted/20 cursor-pointer">
                  <td className="px-4 py-3 font-semibold">{d.shortDate}</td>
                  <td className="px-4 py-3 text-right">{d.available}</td>
                  <td className="px-4 py-3 text-right">{d.sold}</td>
                  <td className="px-4 py-3 text-right">{d.occupancy.toFixed(1)}%</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(d.roomRev)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(d.adr)}</td>
                  <td className="px-4 py-3 text-right">{formatCurrency(d.revpar)}</td>
                  <td className="px-4 py-3 text-right font-bold text-primary">{formatCurrency(d.totalRev)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-muted/50 font-bold border-t border-border">
              <tr>
                <td className="px-4 py-3">Totals (30 Days)</td>
                <td className="px-4 py-3 text-right">{summary.roomsAvailable}</td>
                <td className="px-4 py-3 text-right">{summary.roomsSold}</td>
                <td className="px-4 py-3 text-right">{summary.occupancy.toFixed(1)}%</td>
                <td className="px-4 py-3 text-right">{formatCurrency(summary.roomRevenue)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(summary.adr)}</td>
                <td className="px-4 py-3 text-right">{formatCurrency(summary.revpar)}</td>
                <td className="px-4 py-3 text-right text-primary">{formatCurrency(summary.totalRevenue)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
      
    </div>
  )
}

function CustomTooltip({ active, payload, label }: any) {
  if (active && payload && payload.length) {
    return (
      <div className="bg-card border border-border shadow-lg rounded-lg p-3 text-sm min-w-[200px]">
        <div className="font-bold border-b border-border pb-2 mb-2">{label}</div>
        {payload.map((entry: any, index: number) => {
          let val = entry.value;
          if (entry.dataKey === 'totalRev' || entry.dataKey === 'adr') val = formatCurrency(val);
          else if (entry.dataKey === 'occupancy') val = `${val.toFixed(1)}%`;
          
          return (
            <div key={index} className="flex justify-between items-center py-1">
              <span className="flex items-center gap-1.5 text-muted-foreground text-xs">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color || entry.fill }} />
                {entry.name === 'totalRev' ? 'Revenue' : entry.name === 'adr' ? 'ADR' : 'Occupancy'}
              </span>
              <span className="font-bold text-xs">{val}</span>
            </div>
          )
        })}
      </div>
    );
  }
  return null;
}

function KpiCard({ title, val, trend, compare, isActive, onClick, info }: any) {
  return (
    <div 
      className={`p-4 rounded-xl border flex flex-col justify-between transition-all cursor-pointer relative ${isActive ? 'bg-primary/5 border-primary shadow-sm' : 'bg-card border-border hover:border-primary/40'}`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between mb-2">
        <div className="text-sm font-semibold text-muted-foreground">{title}</div>
        <div title={info} className="text-muted-foreground/50 hover:text-muted-foreground cursor-help">
          <Info className="w-3.5 h-3.5" />
        </div>
      </div>
      <div className="text-2xl font-bold font-heading text-foreground tracking-tight mb-2">
        {val}
      </div>
      {compare && (
        <div className="flex items-center justify-between text-xs mt-auto pt-2 border-t border-border/50">
          <span className="text-muted-foreground">vs Previous</span>
          <div className={`flex items-center font-bold ${trend.dir === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trend.dir === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {trend.val}%
          </div>
        </div>
      )}
    </div>
  )
}

function LibraryTab() {
  return (
    <div className="pt-4 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6 shrink-0">
        <div className="relative w-72">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search reports..." className="pl-9 bg-card" />
        </div>
        <div className="flex gap-2">
          <select className="h-10 text-sm bg-card border border-border rounded-md px-3">
            <option>All Categories</option>
            <option>Financial</option>
            <option>Occupancy</option>
            <option>Operations</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-4 flex-1 overflow-auto content-start pb-10">
        {[
          { cat: "Financial", title: "Revenue Summary", desc: "Daily breakdown of room and extra revenue.", fav: true },
          { cat: "Financial", title: "Payments & Aging", desc: "Outstanding balances across all folios and invoices.", fav: false },
          { cat: "Occupancy", title: "Occupancy & ADR", desc: "Detailed rate and occupancy correlation.", fav: true },
          { cat: "Reservations", title: "Arrivals & Departures", desc: "Front desk manifest for a given date range.", fav: false },
          { cat: "Operations", title: "Housekeeping Productivity", desc: "Room turnaround times and assigned staff tracking.", fav: false },
          { cat: "Operations", title: "Night Audit", desc: "End-of-day financial reconciliation and sync.", fav: true },
        ].map((rep, i) => (
          <div key={i} className="bg-card border border-border p-4 rounded-xl flex flex-col hover:border-primary/40 transition-colors group">
            <div className="flex justify-between items-start mb-2">
              <Badge variant="secondary" className="text-[10px]">{rep.cat}</Badge>
              <button className={`text-muted-foreground hover:text-primary transition-colors ${rep.fav ? 'text-brand-gold' : ''}`}>
                <Star className={`w-4 h-4 ${rep.fav ? 'fill-brand-gold' : ''}`} />
              </button>
            </div>
            <h3 className="font-bold text-foreground mb-1">{rep.title}</h3>
            <p className="text-xs text-muted-foreground mb-4 line-clamp-2">{rep.desc}</p>
            <div className="mt-auto pt-4 border-t border-border flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-muted-foreground">Run 2 hrs ago</span>
              <Button size="sm" className="h-7 text-xs">Run Report</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function ScheduledTab() {
  return (
    <div className="pt-10 flex flex-col items-center justify-center h-full text-center">
      <EmptyState title="No Scheduled Reports" description="Automate your reporting by scheduling delivery to your inbox daily, weekly, or monthly." icon={Clock} />
      <Button className="mt-4"><Clock className="w-4 h-4 mr-2"/> Schedule a Report</Button>
    </div>
  )
}

function SavedTab() {
  return (
    <div className="pt-10 flex flex-col items-center justify-center h-full text-center">
      <EmptyState title="No Saved Views" description="Save your applied filters and report combinations to access them instantly." icon={Save} />
    </div>
  )
}

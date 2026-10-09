"use client"

import { useState, useEffect } from "react"
import { 
  Calendar as CalendarIcon, Download, List, LayoutGrid, ChevronLeft, ChevronRight,
  TrendingUp, AlertTriangle, ArrowRight, ShieldAlert, X, Plus, Clock, History,
  Save, Undo2, RotateCw, Settings, CheckCircle2, MoreVertical, Globe, Lock
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog, EmptyState } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { 
  mockRoomTypes, mockRatePlans, mockPricingRules, mockSeasons, mockRatesHistory,
  mockRooms, mockReservations, mockWorkOrders, mockIntegrations
} from "@/lib/mock-data"
import { formatDate, formatCurrency } from "@/lib/formatters"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { 
  addDays, format, isSameDay, parseISO, differenceInDays
} from "date-fns"

export default function RatesPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "calendar"
  const { role, tenant } = useTenant()

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // Modals / Drawers
  const [bulkUpdateOpen, setBulkUpdateOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
  }, [tabParam])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  if (!mounted) return null

  // Auth: Owner, Manager, Front Desk
  if (role === "Housekeeping") {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState title="Access Denied" description="You do not have permission to view Rates & Availability." icon={Lock} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Rates & Availability
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Rates & Availability</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage pricing strategies, seasonal rates, and room blocks.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 bg-card"><Download className="w-4 h-4 mr-2" /> Export</Button>
            {(role === "Owner" || role === "Manager") && (
              <Button variant="default" className="h-9 bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={() => setBulkUpdateOpen(true)}>
                Bulk Update
              </Button>
            )}
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {[
              { id: "calendar", label: "Rate Calendar" },
              { id: "plans", label: "Rate Plans" },
              { id: "rules", label: "Pricing Rules" },
              { id: "channels", label: "Channels" },
              { id: "history", label: "History" }
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

      <div className="flex-1 overflow-hidden relative">
        {activeTab === "calendar" && <CalendarTab />}
        {activeTab === "plans" && <RatePlansTab />}
        {activeTab === "rules" && <PricingRulesTab />}
        {activeTab === "channels" && <ChannelsTab />}
        {activeTab === "history" && <HistoryTab />}
      </div>
      
      <BulkUpdateDrawer open={bulkUpdateOpen} onClose={() => setBulkUpdateOpen(false)} />

    </div>
  )
}

import { useRouter as useCalendarRouter } from "next/navigation"

function CalendarTab() {
  const router = useCalendarRouter()
  const { role } = useTenant()
  const isManagement = role === "Owner" || role === "Manager"
  
  const [viewMode, setViewMode] = useState<"grid" | "timeline">("grid")
  const [startDate, setStartDate] = useState(new Date())
  const [syncPanelOpen, setSyncPanelOpen] = useState(true)
  
  const daysCount = 14
  const dates = Array.from({ length: daysCount }).map((_, i) => addDays(startDate, i))
  const displayRange = `${format(dates[0], "MMM d, yyyy")} – ${format(dates[dates.length - 1], "MMM d, yyyy")}`
  
  // Selection State
  const [selectedCells, setSelectedCells] = useState<Set<string>>(new Set())
  const [unsavedChanges, setUnsavedChanges] = useState<Record<string, any>>({})
  
  // Derived state (Availability)
  const getAvailability = (rtId: string, d: Date) => {
    const rt = mockRoomTypes.find((r:any) => r.id === rtId)
    if (!rt) return 0
    // Total rooms
    let avail = rt.totalRooms
    // Minus bookings
    const bookings = mockReservations.filter((res:any) => {
      const room = mockRooms.find((r:any) => r.id === res.roomId)
      if (room?.type !== rtId) return false
      const cIn = parseISO(res.checkIn)
      const cOut = parseISO(res.checkOut)
      return d >= cIn && d < cOut
    })
    avail -= bookings.length
    // Minus OOO
    const ooo = mockWorkOrders.filter((wo:any) => {
      if (!wo.location.startsWith("Room ")) return false
      const roomNum = wo.location.replace("Room ", "")
      const room = mockRooms.find((r:any) => r.number === roomNum)
      if (room?.type !== rtId) return false
      if (wo.status === "Resolved") return false
      return true // Assuming OOO for the day if unresolved
    })
    avail -= ooo.length
    return Math.max(0, avail)
  }

  // Toggle selection
  const toggleCell = (id: string) => {
    const next = new Set(selectedCells)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedCells(next)
  }
  
  const clearSelection = () => setSelectedCells(new Set())

  return (
    <div className="flex h-full pt-4">
      
      {/* Main Calendar Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden relative">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between pb-3 shrink-0">
          <div className="flex items-center gap-2">
            <div className="flex bg-card border border-border rounded-md overflow-hidden">
              <button onClick={() => setViewMode("grid")} className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 ${viewMode === 'grid' ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}`}><LayoutGrid className="w-3.5 h-3.5"/> Grid View</button>
              <button onClick={() => setViewMode("timeline")} className={`px-3 py-1.5 text-xs font-semibold flex items-center gap-1.5 ${viewMode === 'timeline' ? 'bg-primary/20 text-primary' : 'hover:bg-muted text-muted-foreground'}`}><List className="w-3.5 h-3.5"/> Timeline</button>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setStartDate(new Date())}>Today</Button>
            <div className="flex items-center rounded-md border border-border bg-card overflow-hidden">
              <button className="px-2 py-1 hover:bg-muted" onClick={() => setStartDate(addDays(startDate, -7))}><ChevronLeft className="w-4 h-4" /></button>
              <div className="px-3 text-sm font-semibold whitespace-nowrap">{displayRange}</div>
              <button className="px-2 py-1 hover:bg-muted" onClick={() => setStartDate(addDays(startDate, 7))}><ChevronRight className="w-4 h-4" /></button>
            </div>
            
            <select className="h-9 text-sm bg-card border border-border rounded-md px-2 hidden lg:block">
              <option>All Channels</option>
              <option>Direct</option>
              <option>Booking.com</option>
            </select>
          </div>
        </div>
        
        {/* Unsaved Changes Bar */}
        {Object.keys(unsavedChanges).length > 0 && (
          <div className="bg-primary/10 border border-primary/30 p-2 rounded-lg mb-3 flex items-center justify-between animate-in fade-in slide-in-from-top-2 shrink-0">
            <div className="text-sm font-bold text-primary flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Review changes ({Object.keys(unsavedChanges).length})
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="h-7 text-xs" onClick={() => setUnsavedChanges({})}>Discard</Button>
              <Button size="sm" className="h-7 text-xs">Save Changes</Button>
            </div>
          </div>
        )}

        {/* Floating Selection Bar */}
        {selectedCells.size > 0 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border shadow-lg p-2 rounded-xl flex items-center gap-2 z-50 animate-in slide-in-from-bottom-4">
            <div className="text-xs font-bold px-3 border-r border-border">{selectedCells.size} Selected</div>
            {isManagement && <Button variant="ghost" size="sm" className="text-xs h-8">Edit Rate</Button>}
            <Button variant="ghost" size="sm" className="text-xs h-8">Edit Restrictions</Button>
            <Button variant="ghost" size="sm" className="text-xs h-8 text-destructive hover:bg-destructive/10 hover:text-destructive">Stop Sell</Button>
            <div className="w-px h-4 bg-border mx-1" />
            <Button variant="ghost" size="sm" className="text-xs h-8" onClick={clearSelection}><X className="w-4 h-4 mr-1"/> Clear</Button>
          </div>
        )}

        {/* Grid Container */}
        <div className="flex-1 overflow-auto border border-border rounded-lg bg-card shadow-sm scrollbar-hide relative z-0">
          
          {viewMode === "grid" ? (
            <div className="min-w-max">
              {/* Header Row */}
              <div className="sticky top-0 z-20 flex bg-card border-b border-border shadow-sm min-w-max">
                <div className="w-[220px] shrink-0 p-3 font-semibold text-sm border-r border-border bg-card sticky left-0 z-30">
                  Room Type
                </div>
                {dates.map((d, i) => {
                  const isWeekend = d.getDay() === 0 || d.getDay() === 6
                  const isToday = isSameDay(d, new Date())
                  return (
                    <div key={i} className={`w-[90px] p-2 text-center border-r border-border flex flex-col justify-center
                      ${isWeekend ? 'bg-muted/30' : ''} ${isToday ? 'bg-primary/10 text-primary border-b-2 border-b-primary' : ''}
                    `}>
                      <span className={`text-[10px] font-bold uppercase ${isToday ? '' : 'text-muted-foreground'}`}>{format(d, "MMM")} {format(d, "EEE")}</span>
                      <span className="text-base font-bold">{format(d, "d")}</span>
                    </div>
                  )
                })}
              </div>

              {/* Room Types Rows */}
              {mockRoomTypes.map((rt: any) => (
                <div key={rt.id} className="flex border-b border-border group hover:bg-muted/10 transition-colors">
                  {/* Sticky left col */}
                  <div className="w-[220px] shrink-0 p-3 border-r border-border bg-card sticky left-0 z-10 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm truncate max-w-[140px]">{rt.name}</div>
                      <div className="text-[10px] text-muted-foreground">{rt.totalRooms} Total Rooms</div>
                    </div>
                    {isManagement && <Button variant="outline" size="sm" className="h-7 text-[10px] px-2 opacity-0 group-hover:opacity-100 transition-opacity">Edit</Button>}
                  </div>
                  
                  {/* Date Cells */}
                  {dates.map((d, i) => {
                    const avail = getAvailability(rt.id, d)
                    const cellId = `${rt.id}-${format(d, "yyyy-MM-dd")}`
                    const isSelected = selectedCells.has(cellId)
                    const isWeekend = d.getDay() === 0 || d.getDay() === 6
                    const baseRate = rt.baseRate + (isWeekend ? 20 : 0) // Mock weekend premium
                    
                    let availStatus = 'normal'
                    if (avail === 0) availStatus = 'soldout'
                    else if (avail <= rt.totalRooms * 0.2) availStatus = 'low'
                    
                    return (
                      <div 
                        key={i} 
                        onClick={() => toggleCell(cellId)}
                        className={`w-[90px] p-2 border-r border-border flex flex-col relative cursor-pointer select-none transition-colors
                          ${isSelected ? 'bg-primary/10 ring-1 ring-inset ring-primary' : isWeekend ? 'bg-muted/10 hover:bg-muted/30' : 'hover:bg-muted/30'}
                        `}
                      >
                        <div className="text-sm font-bold text-center mt-1">{formatCurrency(baseRate)}</div>
                        
                        <div className="flex justify-center mt-2">
                          <Badge variant="outline" className={`
                            text-[9px] px-1 h-4 font-bold border rounded-sm
                            ${availStatus === 'soldout' ? 'bg-destructive/10 text-destructive border-destructive/30' : 
                              availStatus === 'low' ? 'bg-warning/10 text-warning border-warning/30' : 
                              'bg-success/10 text-success border-success/30'}
                          `}>
                            {availStatus === 'soldout' ? '0' : avail} left
                          </Badge>
                        </div>
                        
                        {/* Mock Restrictions */}
                        {i === 3 && <div className="absolute top-1 right-1 text-warning" title="Min Stay 3"><Clock className="w-3 h-3"/></div>}
                        {i === 4 && <div className="absolute top-1 right-1 text-destructive" title="Closed to Arrival"><Lock className="w-3 h-3"/></div>}
                      </div>
                    )
                  })}
                </div>
              ))}

              {/* Summary Row */}
              <div className="flex bg-muted/40 sticky bottom-0 z-20 border-t border-border font-semibold shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
                <div className="w-[220px] shrink-0 p-3 border-r border-border bg-muted/40 sticky left-0 z-30 text-sm">
                  Occupancy & ADR
                </div>
                {dates.map((d, i) => (
                  <div key={i} className="w-[90px] p-2 border-r border-border text-center flex flex-col justify-center">
                    <span className="text-[10px] text-muted-foreground">{Math.floor(60 + Math.random() * 30)}%</span>
                    <span className="text-[10px]">{formatCurrency(210 + Math.random() * 40)}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-8 text-center text-muted-foreground italic h-full flex items-center justify-center">
              Timeline view is synced with the Reservations Calendar.
            </div>
          )}
        </div>
      </div>

      {/* Right Side Sync Panel */}
      <div className={`shrink-0 overflow-y-auto bg-card border-l border-border pl-4 hidden xl:block transition-all ${syncPanelOpen ? 'w-[280px]' : 'w-0 hidden'}`}>
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <h3 className="font-bold text-sm uppercase">Channel Sync</h3>
          <Button variant="ghost" size="sm" className="h-7 text-xs bg-muted/50"><RotateCw className="w-3.5 h-3.5 mr-1.5"/> Sync All</Button>
        </div>
        
        <div className="space-y-3 pr-2">
          {mockIntegrations.filter(i => i.category === 'Channels').map((ch: any) => {
            const isConnected = ch.status === 'Connected'
            const isDirect = ch.id === "direct"
            return (
              <div key={ch.id} className="bg-card border border-border p-3 rounded-lg shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-muted-foreground"/>
                    <span className="font-bold text-sm">{ch.name}</span>
                  </div>
                  {isConnected && <span title="Sync now"><RotateCw className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" /></span>}
                </div>
                
                <div className="flex items-center justify-between">
                  {isConnected ? (
                    <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px] flex gap-1"><CheckCircle2 className="w-3 h-3"/> Connected</Badge>
                  ) : (
                    <Badge variant="outline" className="bg-muted text-muted-foreground text-[10px] flex gap-1"><Lock className="w-3 h-3"/> Disconnected</Badge>
                  )}
                  {isConnected && <span className="text-[9px] text-muted-foreground">Updated 2m ago</span>}
                </div>
                
                {!isConnected && (
                  <Button variant="link" size="sm" className="h-6 px-0 text-[10px] mt-1" onClick={() => router.push('/dashboard/integrations')}>Connect {ch.name}</Button>
                )}
              </div>
            )
          })}
        </div>
      </div>

    </div>
  )
}

function RatePlansTab() {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Rate Plans</h2>
          <p className="text-sm text-muted-foreground">Manage your base and derived pricing strategies.</p>
        </div>
        <Button><Plus className="w-4 h-4 mr-2"/> New Rate Plan</Button>
      </div>

      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Plan Name</th>
              <th className="px-4 py-3 font-medium">Type / Derivation</th>
              <th className="px-4 py-3 font-medium">Policies</th>
              <th className="px-4 py-3 font-medium">Channels</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockRatePlans.map((plan: any) => (
              <tr key={plan.id} className="border-b border-border hover:bg-muted/20">
                <td className="px-4 py-3 font-bold">{plan.name}</td>
                <td className="px-4 py-3">
                  <Badge variant={plan.type === 'Base' ? 'default' : 'outline'} className={plan.type === 'Base' ? 'bg-primary' : ''}>
                    {plan.type} {plan.derivation && `(${plan.derivation})`}
                  </Badge>
                </td>
                <td className="px-4 py-3 text-xs text-muted-foreground space-y-1">
                  <div><span className="font-semibold text-foreground">Cancel:</span> {plan.cancelPolicy}</div>
                  <div><span className="font-semibold text-foreground">Meal:</span> {plan.mealPlan}</div>
                  <div><span className="font-semibold text-foreground">Min Stay:</span> {plan.minStay} nights</div>
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-1 flex-wrap">
                    {plan.channels.map((c:string) => <Badge key={c} variant="secondary" className="text-[9px]">{c}</Badge>)}
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function PricingRulesTab() {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Dynamic Pricing Rules</h2>
          <p className="text-sm text-muted-foreground">Automate rate changes based on occupancy, season, or booking window.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><TrendingUp className="w-4 h-4 mr-2"/> Simulate</Button>
          <Button><Plus className="w-4 h-4 mr-2"/> New Rule</Button>
        </div>
      </div>

      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium w-16 text-center">Priority</th>
              <th className="px-4 py-3 font-medium">Rule Name & Conditions</th>
              <th className="px-4 py-3 font-medium text-center">Action</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium text-right">Edit</th>
            </tr>
          </thead>
          <tbody>
            {mockPricingRules.map((rule: any) => (
              <tr key={rule.id} className="border-b border-border hover:bg-muted/20 group">
                <td className="px-4 py-3 text-center font-bold text-muted-foreground group-hover:text-foreground">{rule.priority}</td>
                <td className="px-4 py-3">
                  <div className="font-bold mb-1">{rule.name}</div>
                  <div className="flex flex-wrap gap-1">
                    {rule.conditions.map((c:string) => <Badge key={c} variant="outline" className="text-[9px]">{c}</Badge>)}
                  </div>
                </td>
                <td className="px-4 py-3 text-center">
                  <Badge className={`font-bold text-sm ${rule.action.startsWith('+') ? 'bg-success/20 text-success hover:bg-success/30' : 'bg-primary/20 text-primary hover:bg-primary/30'}`}>{rule.action}</Badge>
                </td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={rule.active ? 'border-success text-success' : 'border-muted-foreground text-muted-foreground'}>{rule.active ? 'Active' : 'Disabled'}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm"><MoreVertical className="w-4 h-4"/></Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function ChannelsTab() {
  return (
    <div className="h-full flex flex-col pt-4">
       <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Channel Manager</h2>
          <p className="text-sm text-muted-foreground">Monitor sync health and channel-specific markups.</p>
        </div>
      </div>
      
      <EmptyState title="Channel Sync Dashboard" description="Full sync logs and parity monitoring will render here." icon={Globe} />
    </div>
  )
}

function HistoryTab() {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl font-bold">Audit History</h2>
          <p className="text-sm text-muted-foreground">Track all manual and automated rate changes.</p>
        </div>
        <Button variant="outline"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
      </div>

      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Time</th>
              <th className="px-4 py-3 font-medium">User / Source</th>
              <th className="px-4 py-3 font-medium">Action</th>
              <th className="px-4 py-3 font-medium">Details</th>
              <th className="px-4 py-3 font-medium text-right">Revert</th>
            </tr>
          </thead>
          <tbody>
            {mockRatesHistory.map((hist: any) => (
              <tr key={hist.id} className="border-b border-border hover:bg-muted/20">
                <td className="px-4 py-3 whitespace-nowrap text-muted-foreground text-xs">{formatDate(hist.timestamp)}</td>
                <td className="px-4 py-3">
                  <div className="font-semibold">{hist.user}</div>
                  <div className="text-[10px] text-muted-foreground">{hist.source}</div>
                </td>
                <td className="px-4 py-3"><Badge variant="secondary">{hist.action}</Badge></td>
                <td className="px-4 py-3 text-muted-foreground">{hist.details}</td>
                <td className="px-4 py-3 text-right">
                  {hist.source === "Manual" && <Button variant="ghost" size="sm" className="text-xs text-primary"><Undo2 className="w-3.5 h-3.5 mr-1"/> Revert</Button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

// Bulk Update Drawer
function BulkUpdateDrawer({ open, onClose }: { open: boolean, onClose: () => void }) {
  return (
    <Drawer open={open} onClose={onClose} title="Bulk Update Rates & Availability">
      <div className="space-y-6">
        
        <div className="bg-warning/10 border border-warning/30 p-3 rounded-lg flex items-start gap-3 text-warning-foreground">
          <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-bold">Warning: Broad Impact</p>
            <p className="mt-0.5 opacity-90">This bulk update will overwrite existing manual overrides for the selected dates. Please review carefully.</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-bold mb-1 block">Date Range</label>
            <div className="flex items-center gap-2">
              <Input type="date" className="bg-background" />
              <span className="text-muted-foreground">to</span>
              <Input type="date" className="bg-background" />
            </div>
            <div className="flex gap-2 mt-2">
              {['Mo','Tu','We','Th','Fr','Sa','Su'].map(d => (
                <div key={d} className="flex-1 bg-primary text-primary-foreground text-center rounded text-xs py-1 font-semibold cursor-pointer">{d}</div>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border">
            <label className="text-sm font-bold mb-1 block">Room Types</label>
            <div className="grid grid-cols-2 gap-2">
              {mockRoomTypes.map((rt:any) => (
                <label key={rt.id} className="flex items-center gap-2 text-sm p-2 border border-border rounded bg-card cursor-pointer hover:bg-muted/50">
                  <input type="checkbox" defaultChecked className="accent-primary" /> {rt.name}
                </label>
              ))}
            </div>
          </div>
          
          <div className="pt-4 border-t border-border space-y-4">
            <div>
              <label className="text-sm font-bold mb-1 block">Rate Action</label>
              <div className="flex gap-2">
                <select className="flex-1 bg-background border border-border rounded-md px-2 text-sm">
                  <option>Set fixed rate</option>
                  <option>Increase by amount</option>
                  <option>Increase by percent</option>
                  <option>Decrease by percent</option>
                </select>
                <Input type="number" placeholder="Value" className="w-24 bg-background" />
              </div>
            </div>
            
            <div>
              <label className="text-sm font-bold mb-1 block">Restrictions</label>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs">Min Stay</label>
                  <Input type="number" placeholder="Nights" className="bg-background h-8" />
                </div>
                <div className="space-y-1">
                  <label className="text-muted-foreground text-xs">Max Stay</label>
                  <Input type="number" placeholder="Nights" className="bg-background h-8" />
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-border rounded">
                    <input type="checkbox" className="accent-primary" /> Close to Arrival (CTA)
                  </label>
                </div>
                <div className="space-y-1 col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer p-2 border border-destructive/50 bg-destructive/5 rounded text-destructive font-semibold">
                    <input type="checkbox" className="accent-destructive" /> Stop Sell
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border flex flex-col gap-2">
          <Button className="w-full h-10 bg-primary text-primary-foreground font-bold">Preview & Confirm</Button>
          <Button variant="outline" className="w-full" onClick={onClose}>Cancel</Button>
        </div>
      </div>
    </Drawer>
  )
}

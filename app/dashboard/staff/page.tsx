"use client"

import { useState, useEffect } from "react"
import { 
  Users, Calendar as CalendarIcon, Clock, Briefcase, Plus, Search, Filter, 
  ChevronLeft, ChevronRight, Copy, CheckCircle2, AlertTriangle, MessageSquare, 
  Settings, MoreVertical, X, CalendarDays, DollarSign, Download, Lock
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
  mockStaff, mockShifts, mockShiftTemplates, mockTimeOff, mockTimesheets 
} from "@/lib/mock-data"
import { formatDate, formatCurrency } from "@/lib/formatters"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { 
  startOfWeek, endOfWeek, addDays, format, parseISO, isSameDay, 
  differenceInHours, addMinutes 
} from "date-fns"

// Helpers
const getDeptIcon = (dept: string) => {
  if (dept.includes("Front Desk")) return <Briefcase className="w-4 h-4" />
  if (dept.includes("Housekeeping")) return <Settings className="w-4 h-4" /> // or SprayCan
  if (dept.includes("Maintenance")) return <Settings className="w-4 h-4" /> // or Wrench
  return <Users className="w-4 h-4" />
}

export default function StaffPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "schedule"
  const staffParam = searchParams?.get("staff")
  
  const { role, tenant } = useTenant()

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // Date states for Schedule
  const [currentDate, setCurrentDate] = useState(new Date())
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 })
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1 })
  
  // Modals / Drawers
  const [addShiftOpen, setAddShiftOpen] = useState(false)
  const [addStaffOpen, setAddStaffOpen] = useState(false)
  const [timeOffOpen, setTimeOffOpen] = useState(false)
  const [staffDrawerOpen, setStaffDrawerOpen] = useState(false)
  
  const [selectedStaff, setSelectedStaff] = useState<any>(null)
  const [selectedShift, setSelectedShift] = useState<any>(null)

  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
    if (staffParam) {
      const st = mockStaff.find(s => s.id === staffParam)
      if (st) {
        setSelectedStaff(st)
        setStaffDrawerOpen(true)
      }
    }
  }, [tabParam, staffParam])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  if (!mounted) return null

  const isManagement = role === "Owner" || role === "Manager"
  
  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Staff & Shifts
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Staff & Shifts</h1>
          <p className="text-sm text-muted-foreground mt-1">Schedule employees, track hours, and manage roles.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {isManagement && <Button variant="outline" className="h-9 bg-card" onClick={() => setAddStaffOpen(true)}>Add Staff</Button>}
            <Button variant="default" className="h-9 bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={() => setAddShiftOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Add Shift
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {["schedule", "staff", "time-off", "timesheets"].map(tab => {
              const label = tab.replace("-", " ").replace(/\b\w/g, l => l.toUpperCase())
              return (
                <button 
                  key={tab} 
                  onClick={() => setTab(tab)} 
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors capitalize ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative">
        {activeTab === "schedule" && (
          <ScheduleTab 
            weekStart={weekStart} weekEnd={weekEnd} currentDate={currentDate} setCurrentDate={setCurrentDate}
            isManagement={isManagement} 
            selectedShift={selectedShift} setSelectedShift={setSelectedShift}
          />
        )}
        {activeTab === "staff" && <StaffTab isManagement={isManagement} setSelectedStaff={setSelectedStaff} setStaffDrawerOpen={setStaffDrawerOpen} />}
        {activeTab === "time-off" && <TimeOffTab isManagement={isManagement} setTimeOffOpen={setTimeOffOpen} />}
        {activeTab === "timesheets" && <TimesheetsTab isManagement={isManagement} />}
      </div>

      {/* Staff Drawer */}
      <Drawer open={staffDrawerOpen} onClose={() => setStaffDrawerOpen(false)} title="Staff Profile">
        {selectedStaff && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                {selectedStaff.avatar}
              </div>
              <div>
                <h2 className="text-xl font-bold text-foreground">{selectedStaff.name}</h2>
                <p className="text-sm text-muted-foreground">{selectedStaff.role} • {selectedStaff.department}</p>
                <Badge variant="outline" className="mt-2 text-xs bg-success/10 text-success border-success/30">{selectedStaff.status}</Badge>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-sm text-muted-foreground uppercase">Contact Info</h3>
              <div className="text-sm space-y-2">
                <div className="flex items-center gap-2"><Clock className="w-4 h-4 text-muted-foreground" /> {selectedStaff.type} ({selectedStaff.contractedHours}h/wk)</div>
                <div className="flex items-center gap-2"><MessageSquare className="w-4 h-4 text-muted-foreground" /> {selectedStaff.email}</div>
                {isManagement && <div className="flex items-center gap-2"><DollarSign className="w-4 h-4 text-muted-foreground" /> {formatCurrency(selectedStaff.hourlyRate)}/hr</div>}
              </div>
            </div>
            
            <div className="space-y-4 pt-4 border-t border-border">
              <h3 className="font-bold text-sm text-muted-foreground uppercase">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {selectedStaff.skills.map((s: string) => <Badge key={s} variant="secondary">{s}</Badge>)}
                {selectedStaff.skills.length === 0 && <span className="text-sm text-muted-foreground">No special skills listed.</span>}
              </div>
            </div>
          </div>
        )}
      </Drawer>

    </div>
  )
}

function ScheduleTab({ weekStart, weekEnd, currentDate, setCurrentDate, isManagement, selectedShift, setSelectedShift }: any) {
  const { role } = useTenant()
  const [filterDept, setFilterDept] = useState("All")
  
  const days = Array.from({ length: 7 }).map((_, i) => addDays(weekStart, i))
  const displayWeek = `${format(weekStart, "MMM d")} – ${format(weekEnd, "MMM d, yyyy")}`
  
  // Calculate total scheduled hours for each staff member this week
  const staffHours: Record<string, number> = {}
  mockShifts.forEach((s: any) => {
    if (s.staffId) {
      const shiftDate = parseISO(s.start)
      if (shiftDate >= weekStart && shiftDate <= weekEnd) {
        const hrs = differenceInHours(parseISO(s.end), parseISO(s.start)) - (s.breakMins || 0) / 60
        staffHours[s.staffId] = (staffHours[s.staffId] || 0) + hrs
      }
    }
  })

  // Open shifts this week
  const openShifts = mockShifts.filter((s: any) => !s.staffId && parseISO(s.start) >= weekStart && parseISO(s.start) <= weekEnd)
  
  // Quick summary
  const totalHrs = Object.values(staffHours).reduce((a, b) => a + b, 0)
  const conflicts = mockShifts.filter((s: any) => s.conflict).length
  const overtimes = Object.entries(staffHours).filter(([id, hrs]) => {
    const st = mockStaff.find(s => s.id === id)
    return st && hrs > st.contractedHours
  }).length

  return (
    <div className="flex h-full w-full">
      {/* Grid Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden border-r border-border pr-2 md:pr-4 relative">
        
        {/* Toolbar */}
        <div className="flex items-center justify-between py-3 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
            <div className="flex items-center rounded-md border border-border bg-card overflow-hidden">
              <button className="px-2 py-1 hover:bg-muted" onClick={() => setCurrentDate(addDays(currentDate, -7))}><ChevronLeft className="w-4 h-4" /></button>
              <div className="px-3 text-sm font-semibold">{displayWeek}</div>
              <button className="px-2 py-1 hover:bg-muted" onClick={() => setCurrentDate(addDays(currentDate, 7))}><ChevronRight className="w-4 h-4" /></button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <select className="h-9 text-sm bg-card border border-border rounded-md px-2 hidden md:block" value={filterDept} onChange={e => setFilterDept(e.target.value)}>
              <option>All</option>
              <option>Front Desk</option>
              <option>Housekeeping</option>
              <option>Maintenance</option>
              <option>Management</option>
            </select>
            {isManagement && (
              <>
                <Button variant="outline" size="sm" className="hidden lg:flex"><Copy className="w-3.5 h-3.5 mr-2"/> Copy Prev Week</Button>
                <Button variant="default" size="sm" className="bg-primary/20 text-primary border border-primary/30 hover:bg-primary/30"><CheckCircle2 className="w-3.5 h-3.5 mr-2"/> Publish Schedule</Button>
              </>
            )}
          </div>
        </div>

        {/* The Main Grid */}
        <div className="flex-1 overflow-auto border border-border rounded-lg bg-card/50 shadow-sm scrollbar-hide relative">
          
          {/* Grid Header */}
          <div className="sticky top-0 z-20 flex bg-card border-b border-border shadow-sm min-w-max">
            {/* Corner Staff Header */}
            <div className="w-[200px] shrink-0 p-3 font-semibold text-sm border-r border-border flex items-center justify-between">
              Staff 
              <span className="text-[10px] text-muted-foreground font-normal">Hrs / Wk</span>
            </div>
            
            {/* Days Header */}
            {days.map((day, i) => {
              const isTo = isSameDay(day, new Date())
              return (
                <div key={i} className={`flex-1 min-w-[140px] p-2 text-center border-r border-border flex flex-col items-center justify-center ${isTo ? 'bg-primary/10 text-primary' : ''}`}>
                  <span className={`text-xs font-bold uppercase ${isTo ? '' : 'text-muted-foreground'}`}>{format(day, "EEE")}</span>
                  <span className={`text-lg font-bold ${isTo ? '' : 'text-foreground'}`}>{format(day, "d")}</span>
                </div>
              )
            })}
          </div>

          {/* Open Shifts Row (Pinned at top of grid logic) */}
          {isManagement && (
            <div className="flex bg-muted/20 border-b border-border border-dashed min-w-max">
              <div className="w-[200px] shrink-0 p-3 text-sm font-semibold border-r border-border text-muted-foreground flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-warning"/> Open Shifts
              </div>
              {days.map((day, i) => {
                const dayOpens = openShifts.filter((s: any) => isSameDay(parseISO(s.start), day))
                return (
                  <div key={i} className="flex-1 min-w-[140px] p-1.5 border-r border-border border-dashed">
                    {dayOpens.map((s: any) => (
                      <div key={s.id} onClick={() => setSelectedShift(s)} className="bg-warning/20 border border-warning/50 text-warning-foreground text-[10px] p-1.5 rounded mb-1 cursor-pointer hover:bg-warning/30 font-semibold truncate">
                        {format(parseISO(s.start), "ha")} - {format(parseISO(s.end), "ha")} • {s.department}
                      </div>
                    ))}
                    {dayOpens.length === 0 && <div className="h-full w-full min-h-[30px] rounded group-hover:bg-muted/50 transition-colors" />}
                  </div>
                )
              })}
            </div>
          )}

          {/* Staff Rows */}
          <div className="min-w-max">
            {mockStaff.filter((st: any) => (filterDept === "All" || st.department === filterDept) && (role !== "Housekeeping" || st.department === "Housekeeping")).map((staff: any) => {
              
              const hrs = staffHours[staff.id] || 0
              const isOvertime = hrs > staff.contractedHours

              return (
                <div key={staff.id} className="flex border-b border-border hover:bg-muted/20 transition-colors group">
                  {/* Staff Info Cell */}
                  <div className="w-[200px] shrink-0 p-2 border-r border-border bg-card flex flex-col justify-center sticky left-0 z-10 shadow-[1px_0_0_0_rgba(0,0,0,0.1)]">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {staff.avatar}
                        </div>
                        <div className="truncate">
                          <div className="font-semibold text-sm truncate">{staff.name}</div>
                          <div className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                            {getDeptIcon(staff.department)} {staff.department}
                          </div>
                        </div>
                      </div>
                      <div className={`text-xs font-bold shrink-0 ml-1 ${isOvertime ? 'text-destructive' : 'text-muted-foreground'}`} title={isOvertime ? 'Overtime warning' : ''}>
                        {hrs.toFixed(0)} / {staff.contractedHours}
                        {isOvertime && <AlertTriangle className="inline w-3 h-3 ml-0.5 text-destructive" />}
                      </div>
                    </div>
                  </div>
                  
                  {/* Days Cells */}
                  {days.map((day, i) => {
                    const shifts = mockShifts.filter((s: any) => s.staffId === staff.id && isSameDay(parseISO(s.start), day))
                    const timeOffs = mockTimeOff.filter((to: any) => to.staffId === staff.id && to.status === "Approved" && parseISO(to.startDate) <= day && parseISO(to.endDate) >= day)
                    
                    return (
                      <div key={i} className="flex-1 min-w-[140px] p-1.5 border-r border-border relative group/cell min-h-[60px]">
                        
                        {/* Render Time Off Block */}
                        {timeOffs.map((to: any) => (
                          <div key={to.id} className="bg-muted border border-border text-muted-foreground text-[10px] p-1.5 rounded mb-1 font-semibold text-center repeating-linear-gradient">
                            {to.type}
                          </div>
                        ))}
                        
                        {/* Render Shifts */}
                        {shifts.map((s: any) => (
                          <div 
                            key={s.id} 
                            onClick={() => setSelectedShift(s)}
                            className={`p-1.5 rounded border text-[10px] leading-tight mb-1 cursor-pointer transition-colors
                              ${s.conflict ? 'bg-destructive/10 border-destructive/50 text-destructive' : 
                                s.status === 'Draft' ? 'bg-muted border-border border-dashed text-foreground' : 
                                'bg-primary/10 border-primary/30 text-foreground hover:bg-primary/20'}
                            `}
                          >
                            <div className="font-bold flex items-center justify-between">
                              <span>{format(parseISO(s.start), "ha")}-{format(parseISO(s.end), "ha")}</span>
                              {s.conflict && <AlertTriangle className="w-3 h-3 text-destructive" />}
                            </div>
                            <div className="truncate opacity-80 mt-0.5 flex items-center gap-1">{getDeptIcon(s.department)} {s.department}</div>
                          </div>
                        ))}
                        
                        {/* Empty cell hover plus */}
                        {shifts.length === 0 && timeOffs.length === 0 && (
                          <div className="absolute inset-1 rounded border border-dashed border-border flex items-center justify-center opacity-0 group-hover/cell:opacity-100 hover:bg-muted/50 cursor-pointer transition-all">
                            <Plus className="w-4 h-4 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
          
        </div>
        
        {/* Bottom Status Bar */}
        <div className="mt-3 bg-muted/30 border border-border rounded-lg p-2 flex items-center justify-between text-xs font-semibold shrink-0">
          <div className="flex gap-4">
            <span className="text-muted-foreground">Total Scheduled: {totalHrs.toFixed(1)}h</span>
            <span className={conflicts > 0 ? "text-destructive" : "text-muted-foreground"}>{conflicts} Conflicts</span>
            <span className={overtimes > 0 ? "text-warning" : "text-muted-foreground"}>{overtimes} Overtime</span>
          </div>
          <span className="text-muted-foreground hidden md:inline">Last Published: Today, 8:00 AM</span>
        </div>
      </div>

      {/* Right Side Panel: Week Summary / Details */}
      <div className="w-[300px] shrink-0 hidden md:block overflow-y-auto pl-4">
        {!selectedShift ? (
          <div className="space-y-6">
            <div>
              <h3 className="font-bold text-lg">Week Summary</h3>
              <p className="text-xs text-muted-foreground">{displayWeek}</p>
            </div>
            
            <div className="space-y-3">
              <div className="bg-card border border-border p-3 rounded-lg shadow-sm">
                <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Total Scheduled</div>
                <div className="text-2xl font-bold">{totalHrs.toFixed(0)} <span className="text-sm font-normal text-muted-foreground">hrs</span></div>
              </div>
              
              {isManagement && (
                <div className="bg-card border border-border p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-muted-foreground uppercase font-bold mb-1">Est. Labor Cost</div>
                  <div className="text-2xl font-bold">{formatCurrency(totalHrs * 22)}</div>
                </div>
              )}
            </div>
            
            <div>
              <h4 className="text-sm font-bold border-b border-border pb-2 mb-3">Coverage by Dept</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><Briefcase className="w-3.5 h-3.5"/> Front Desk</span> <span>160h</span></div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><Settings className="w-3.5 h-3.5"/> Housekeeping</span> <span>210h</span></div>
                <div className="flex justify-between items-center"><span className="text-muted-foreground flex items-center gap-2"><Settings className="w-3.5 h-3.5"/> Maintenance</span> <span>80h</span></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <h3 className="font-bold text-lg">Shift Details</h3>
              <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setSelectedShift(null)}><X className="w-4 h-4"/></Button>
            </div>
            
            {selectedShift.staffId ? (
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold">
                  {mockStaff.find((s:any) => s.id === selectedShift.staffId)?.avatar}
                </div>
                <div>
                  <div className="font-bold">{mockStaff.find((s:any) => s.id === selectedShift.staffId)?.name}</div>
                  <div className="text-xs text-muted-foreground">{selectedShift.department}</div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3 text-warning">
                <AlertTriangle className="w-8 h-8" />
                <div>
                  <div className="font-bold">Open Shift</div>
                  <div className="text-xs">{selectedShift.department}</div>
                </div>
              </div>
            )}
            
            <div className="bg-muted/30 border border-border p-3 rounded-lg space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-muted-foreground">Date:</span> <span>{format(parseISO(selectedShift.start), "MMM d, yyyy")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Time:</span> <span>{format(parseISO(selectedShift.start), "h:mm a")} - {format(parseISO(selectedShift.end), "h:mm a")}</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Break:</span> <span>{selectedShift.breakMins || 0} mins</span></div>
              <div className="flex justify-between"><span className="text-muted-foreground">Status:</span> <Badge variant="outline" className={selectedShift.status === 'Draft' ? 'bg-muted' : 'bg-success/10 text-success'}>{selectedShift.status}</Badge></div>
            </div>
            
            {selectedShift.conflict && (
              <div className="bg-destructive/10 border border-destructive/30 text-destructive text-xs p-3 rounded-lg flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>This shift overlaps with another shift scheduled for this staff member.</span>
              </div>
            )}
            
            <div className="pt-4 border-t border-border flex flex-col gap-2">
              <Button className="w-full">Edit Shift</Button>
              {selectedShift.staffId && <Button variant="outline" className="w-full">Message Staff</Button>}
              <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">Delete Shift</Button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}

function StaffTab({ isManagement, setSelectedStaff, setStaffDrawerOpen }: any) {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search staff..." className="pl-9 h-9" />
        </div>
        <Button variant="outline" size="sm" className="h-9"><Filter className="w-4 h-4 mr-2"/> Filters</Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Name</th>
              <th className="px-4 py-3 font-medium">Role & Dept</th>
              <th className="px-4 py-3 font-medium">Contact</th>
              <th className="px-4 py-3 font-medium">Type</th>
              <th className="px-4 py-3 font-medium">Status</th>
              {isManagement && <th className="px-4 py-3 font-medium text-right">Rate</th>}
            </tr>
          </thead>
          <tbody>
            {mockStaff.map((staff: any) => (
              <tr key={staff.id} className="border-b border-border hover:bg-muted/20 cursor-pointer transition-colors" onClick={() => { setSelectedStaff(staff); setStaffDrawerOpen(true) }}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">{staff.avatar}</div>
                    <span className="font-semibold">{staff.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="font-medium">{staff.role}</div>
                  <div className="text-[10px] text-muted-foreground">{staff.department}</div>
                </td>
                <td className="px-4 py-3">
                  <div className="truncate max-w-[150px]">{staff.email}</div>
                  <div className="text-[10px] text-muted-foreground">{staff.phone}</div>
                </td>
                <td className="px-4 py-3">{staff.type}</td>
                <td className="px-4 py-3">
                  <Badge variant="outline" className={staff.status === 'Active' ? 'bg-success/10 text-success border-success/30' : 'bg-warning/10 text-warning border-warning/30'}>{staff.status}</Badge>
                </td>
                {isManagement && <td className="px-4 py-3 text-right font-medium">{formatCurrency(staff.hourlyRate)}/h</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function TimeOffTab({ isManagement, setTimeOffOpen }: any) {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold">Time Off Requests</h2>
          <p className="text-sm text-muted-foreground">Manage vacations, sick days, and personal leave.</p>
        </div>
        <Button onClick={() => setTimeOffOpen(true)}><Plus className="w-4 h-4 mr-2"/> New Request</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-4 overflow-y-auto">
          {mockTimeOff.map((to: any) => {
            const staff = mockStaff.find((s:any) => s.id === to.staffId)
            return (
              <div key={to.id} className="bg-card border border-border p-4 rounded-xl shadow-sm flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold">{staff?.name}</span>
                    <Badge variant="outline" className="text-[10px]">{to.type}</Badge>
                    <Badge className={to.status === 'Approved' ? 'bg-success text-success-foreground' : to.status === 'Pending' ? 'bg-warning text-warning-foreground' : 'bg-muted text-muted-foreground'}>{to.status}</Badge>
                  </div>
                  <div className="text-sm text-muted-foreground mb-2 flex items-center gap-1.5"><CalendarDays className="w-3.5 h-3.5"/> {formatDate(to.startDate)} - {formatDate(to.endDate)} ({to.days} days)</div>
                  <div className="text-sm">"{to.reason}"</div>
                </div>
                {isManagement && to.status === 'Pending' && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="text-destructive hover:bg-destructive/10 hover:text-destructive border-destructive/30">Reject</Button>
                    <Button size="sm" className="bg-success text-success-foreground hover:bg-success/90">Approve</Button>
                  </div>
                )}
              </div>
            )
          })}
        </div>
        
        <div className="space-y-4">
          <div className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <h3 className="font-bold text-sm border-b border-border pb-2 mb-3">Leave Calendar</h3>
            <div className="h-48 flex items-center justify-center bg-muted/30 rounded border border-dashed border-border text-sm text-muted-foreground">
              [Mini Calendar View Placeholder]
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function TimesheetsTab({ isManagement }: any) {
  return (
    <div className="h-full flex flex-col pt-4">
      <div className="flex items-center justify-between mb-4">
        <div className="relative w-64">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search timesheets..." className="pl-9 h-9" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
          <Button variant="default" size="sm" className="h-9"><Clock className="w-4 h-4 mr-2"/> Clock In / Out (Mock)</Button>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Staff & Date</th>
              <th className="px-4 py-3 font-medium">Scheduled</th>
              <th className="px-4 py-3 font-medium">Actual</th>
              <th className="px-4 py-3 font-medium text-right">Total Hrs</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {mockTimesheets.map((ts: any) => {
              const staff = mockStaff.find((s:any) => s.id === ts.staffId)
              return (
                <tr key={ts.id} className="border-b border-border hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="font-semibold">{staff?.name}</div>
                    <div className="text-[10px] text-muted-foreground">{formatDate(ts.date)}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground text-xs">{ts.schedStart} - {ts.schedEnd}</td>
                  <td className="px-4 py-3 font-medium text-xs">
                    {ts.actualStart} - {ts.actualEnd || <span className="italic opacity-50">ongoing</span>}
                  </td>
                  <td className="px-4 py-3 text-right font-bold">{ts.totalHrs > 0 ? ts.totalHrs.toFixed(2) : '-'}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="outline" className={
                      ts.status === 'Approved' ? 'bg-success/10 text-success' : 
                      ts.status === 'Clocked In' ? 'bg-primary/10 text-primary border-primary/30' : 'bg-warning/10 text-warning'
                    }>{ts.status}</Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm">Edit</Button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

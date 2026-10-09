"use client"

import { useState, useEffect } from "react"
import { Plus, List, LayoutGrid, Filter, Download, Wrench, AlertTriangle, Clock, CheckCircle2, MoreVertical, Image as ImageIcon, Wind, Zap, Lock, Lightbulb, Box, Key, AlertCircle, Settings as SettingsIcon, X, Calendar as CalendarIcon, UserPlus, FileText } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Drawer, Modal, ConfirmDialog, Skeleton, EmptyState } from "@/components/ui/Feedback"
import { mockWorkOrders, mockStaff, mockAssets, mockRooms, mockPreventiveSchedules } from "@/lib/mock-data"
import { formatDate, formatDateTime, formatCurrency } from "@/lib/formatters"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"
import { isPast, parseISO, formatDistanceToNow } from "date-fns"
import { useSearchParams, useRouter, usePathname } from "next/navigation"

const CATEGORY_ICONS: Record<string, any> = {
  "HVAC": Wind,
  "Electrical": Zap,
  "Lock/Access": Lock,
  "Elevator": Box,
  "Pool": Box,
  "Other": Wrench
}

const PRIORITY_COLORS: Record<string, string> = {
  "Urgent": "bg-red-950/40 text-red-400 border-red-500/50 font-bold",
  "High": "bg-orange-950/40 text-orange-400 border-orange-500/50 font-bold",
  "Medium": "bg-yellow-950/40 text-yellow-400 border-yellow-500/50 font-bold",
  "Low": "bg-emerald-950/40 text-emerald-400 border-emerald-500/50 font-bold",
}

const priorityOrder: Record<string, number> = { "Urgent": 0, "High": 1, "Medium": 2, "Low": 3 }

export default function MaintenancePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const ticketIdParam = searchParams?.get("ticket")

  const [activeTab, setActiveTab] = useState<"Work Orders" | "Assets" | "Preventive Maintenance">("Work Orders")
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [telemetryOpen, setTelemetryOpen] = useState(true)
  const [mounted, setMounted] = useState(false)
  const [ticketDrawerOpen, setTicketDrawerOpen] = useState(false)
  const [createModalOpen, setCreateModalOpen] = useState(false)
  
  const [drawerTab, setDrawerTab] = useState<"Details" | "Comments" | "Activity">("Details")

  useEffect(() => {
    setMounted(true)
    if (ticketIdParam) setTicketDrawerOpen(true)
  }, [ticketIdParam])

  const checkIsOverdue = (ticket: any) => mounted && ticket.status !== "Resolved" && isPast(parseISO(ticket.dueDate))

  const columns = ["Reported", "Assigned & Dispatched", "In Verification", "Resolved"]

  const openTickets = mockWorkOrders.filter(w => w.status !== "Resolved").length
  const overdueTickets = mockWorkOrders.filter(w => checkIsOverdue(w)).length
  const urgentTickets = mockWorkOrders.filter(w => w.status !== "Resolved" && w.priority === "Urgent").length
  const oooRooms = mockRooms.filter(r => r.status === "OOO").length

  const sortTickets = (tickets: any[]) => tickets.sort((a, b) => {
    if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
      return priorityOrder[a.priority] - priorityOrder[b.priority]
    }
    return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
  })

  const selectedTicket = mockWorkOrders.find(t => t.id === ticketIdParam) || mockWorkOrders[0]

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Asset Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">Track work orders, manage repairs, and monitor asset health.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
            <Button variant="outline" className="h-9"><Download className="w-4 h-4 mr-2" /> Export CSV</Button>
            <Button variant="default" className="h-9 bg-[var(--primary)] text-[var(--primary-foreground)]" onClick={() => setCreateModalOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Create Ticket
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {["Work Orders", "Assets", "Preventive Maintenance"].map(tab => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab as any)} 
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col pt-4">
        
        {activeTab === "Work Orders" && (
          <div className="flex flex-col h-full gap-4">
            
            <div className="flex gap-4 items-center shrink-0 w-full overflow-x-auto pb-1">
              <div className="flex items-center bg-card border border-border rounded-lg p-1 shadow-sm shrink-0">
                <button onClick={() => setViewMode("board")} className={`p-1.5 rounded-md transition-colors ${viewMode === "board" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><LayoutGrid className="w-4 h-4" /></button>
                <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><List className="w-4 h-4" /></button>
              </div>

              {[
                { label: "Open Tickets", val: openTickets, color: "text-foreground" },
                { label: "Overdue", val: overdueTickets, color: "text-red-400" },
                { label: "Urgent", val: urgentTickets, color: "text-red-400" },
                { label: "Avg Resolution", val: "2.4h", color: "text-foreground" },
                { label: "Rooms OOO", val: oooRooms, color: "text-warning" },
                { label: "Due for Service", val: 1, color: "text-foreground" },
              ].map((kpi, i) => (
                <div key={i} className="bg-card border border-border px-4 py-2 rounded-lg shadow-sm flex flex-col justify-center min-w-[120px] shrink-0">
                  <div className={`text-xl font-bold ${kpi.color}`}>{kpi.val}</div>
                  <div className="text-[10px] uppercase tracking-wide text-muted-foreground font-semibold">{kpi.label}</div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 flex-1 overflow-hidden pb-2 mt-2">
              
              <div className="flex-1 flex flex-col overflow-hidden gap-6 relative">
                
                {viewMode === "board" && (
                  <div className="flex-1 flex gap-4 overflow-x-auto pb-2">
                    {columns.map(colName => {
                      const colTickets = sortTickets(mockWorkOrders.filter(w => w.status === colName))
                      return (
                        <div key={colName} className="flex-1 min-w-[280px] max-w-[320px] bg-muted/20 border border-border rounded-xl flex flex-col overflow-hidden relative">
                          <div className="p-3 border-b border-border bg-card font-bold flex justify-between items-center text-sm shadow-sm z-10 shrink-0">
                            {colName}
                            <Badge variant="outline" className="bg-muted text-muted-foreground">{colTickets.length}</Badge>
                          </div>
                          
                          <div className="p-3 flex-1 overflow-y-auto space-y-3 pb-8 scrollbar-hide relative z-0">
                            {colTickets.map(ticket => {
                              const Icon = CATEGORY_ICONS[ticket.category] || Wrench
                              const assignee = mockStaff.find(s => s.id === ticket.assigneeId)
                              const isOverdue = checkIsOverdue(ticket)
                              
                              return (
                                <div 
                                  key={ticket.id} 
                                  onClick={() => router.push(`${pathname}?ticket=${ticket.id}`)}
                                  className={`bg-card p-3 rounded-lg border shadow-sm cursor-pointer transition-all hover:border-primary/50 flex flex-col gap-3 relative group
                                    ${isOverdue ? "border-red-500/50 shadow-[0_0_8px_rgba(239,68,68,0.1)]" : "border-border"}`}
                                >
                                  <div className="flex justify-between items-start gap-2">
                                    <div className="flex items-start gap-2">
                                      <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                      <div>
                                        <div className="font-semibold text-sm leading-tight group-hover:text-primary transition-colors">{ticket.title}</div>
                                        <div className="text-[10px] text-muted-foreground mt-0.5">{ticket.location}</div>
                                      </div>
                                    </div>
                                    <DropdownMenu>
                                      <DropdownMenuTrigger asChild>
                                        <button onClick={e => e.stopPropagation()} className="h-6 w-6 rounded-md hover:bg-muted flex items-center justify-center shrink-0 -mr-1"><MoreVertical className="w-3 h-3 text-muted-foreground" /></button>
                                      </DropdownMenuTrigger>
                                      <DropdownMenuContent align="end" onClick={e => e.stopPropagation()}>
                                        <DropdownMenuItem>Move To...</DropdownMenuItem>
                                        <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                                        <DropdownMenuItem>Mark Room OOO</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                      </DropdownMenuContent>
                                    </DropdownMenu>
                                  </div>
                                  
                                  <p className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</p>
                                  
                                  <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                                    <div className={`flex items-center gap-1.5 text-[10px] font-medium p-1 -ml-1 rounded transition-colors ${!assignee ? "border border-dashed border-muted-foreground/50 hover:border-primary hover:text-primary cursor-pointer" : ""}`}>
                                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${assignee ? "bg-primary text-primary-foreground" : "bg-transparent text-muted-foreground"}`}>
                                        {assignee ? assignee.avatar : <UserPlus className="w-3 h-3" />}
                                      </div>
                                      <span>{assignee ? assignee.name : "Assign"}</span>
                                    </div>
                                    <Badge variant="outline" className={`text-[10px] h-5 ${PRIORITY_COLORS[ticket.priority]}`}>
                                      {ticket.priority === "Urgent" && <AlertTriangle className="w-2.5 h-2.5 mr-1" />}
                                      {ticket.priority}
                                    </Badge>
                                  </div>
                                  
                                  <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                                    {ticket.status === "Resolved" ? (
                                      <span className="text-success flex items-center"><CheckCircle2 className="w-3 h-3 mr-1"/> Resolved {mounted ? formatDistanceToNow(parseISO(ticket.lastUpdated), { addSuffix: true }) : formatDate(ticket.lastUpdated)}</span>
                                    ) : (
                                      <span className={isOverdue ? "text-red-400 font-bold flex items-center" : "flex items-center"}>
                                        {isOverdue && <AlertCircle className="w-3 h-3 mr-1"/>}
                                        Due: {formatDate(ticket.dueDate)}
                                      </span>
                                    )}
                                    {ticket.photos > 0 && <span className="flex items-center"><ImageIcon className="w-3 h-3 mr-1" /> {ticket.photos}</span>}
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                          
                          <div className="absolute bottom-0 w-full h-8 bg-gradient-to-t from-card to-transparent pointer-events-none z-10" />
                        </div>
                      )
                    })}
                  </div>
                )}

                {viewMode === "list" && (
                  <Card className="flex-1 bg-card border-border shadow-sm flex flex-col overflow-hidden">
                    <div className="flex-1 overflow-auto">
                      <table className="w-full text-sm text-left whitespace-nowrap">
                        <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider border-b border-border sticky top-0 z-10">
                          <tr>
                            <th className="px-4 py-3 font-medium w-10"><input type="checkbox" className="rounded border-muted-foreground" /></th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Work Order ID</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Asset & Location</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Priority</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Status</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Technician</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Due Date</th>
                            <th className="px-4 py-3 font-medium cursor-pointer hover:text-foreground">Last Updated</th>
                          </tr>
                        </thead>
                        <tbody>
                          {mockWorkOrders.map(ticket => {
                            const assignee = mockStaff.find(s => s.id === ticket.assigneeId)
                            const asset = mockAssets.find(a => a.id === ticket.assetId)
                            const isOverdue = checkIsOverdue(ticket)
                            
                            return (
                              <tr key={ticket.id} className="border-b border-border hover:bg-muted/20 cursor-pointer" onClick={() => router.push(`${pathname}?ticket=${ticket.id}`)}>
                                <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-muted-foreground" /></td>
                                <td className="px-4 py-3 font-mono font-medium">{ticket.id}</td>
                                <td className="px-4 py-3">
                                  <div className="font-semibold">{asset?.name || ticket.title}</div>
                                  <div className="text-[10px] text-muted-foreground">{ticket.location}</div>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant="outline" className={`text-[10px] h-5 ${PRIORITY_COLORS[ticket.priority]}`}>{ticket.priority}</Badge>
                                </td>
                                <td className="px-4 py-3">
                                  <Badge variant="outline" className="bg-card text-foreground">{ticket.status}</Badge>
                                </td>
                                <td className="px-4 py-3 text-xs">{assignee ? assignee.name : <span className="text-muted-foreground italic border-b border-dashed">Unassigned</span>}</td>
                                <td className={`px-4 py-3 text-xs ${isOverdue ? 'text-red-400 font-bold' : ''}`}>
                                  {ticket.status === "Resolved" ? "Resolved" : formatDate(ticket.dueDate)}
                                </td>
                                <td className="px-4 py-3 text-xs text-muted-foreground" title={formatDateTime(ticket.lastUpdated)}>
                                  {mounted ? formatDistanceToNow(parseISO(ticket.lastUpdated), { addSuffix: true }) : formatDate(ticket.lastUpdated)}
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </table>
                    </div>
                    <div className="p-3 border-t border-border flex justify-between items-center text-xs text-muted-foreground">
                      <span>Showing 1 to 5 of 5 entries</span>
                      <div className="flex items-center gap-2">
                        <select className="bg-card border border-border rounded px-2 py-1"><option>25</option><option>50</option><option>100</option></select>
                        <div className="flex gap-1"><Button variant="outline" size="sm" className="h-7 text-xs">Prev</Button><Button variant="outline" size="sm" className="h-7 text-xs">Next</Button></div>
                      </div>
                    </div>
                  </Card>
                )}

              </div>

              <div className={`transition-all duration-300 shrink-0 border border-border rounded-xl shadow-sm flex flex-col overflow-hidden bg-card ${telemetryOpen ? 'w-[320px] opacity-100' : 'w-0 opacity-0 border-none'}`}>
                {telemetryOpen && (
                  <>
                    <div className="p-3 border-b border-border flex justify-between items-center bg-muted/10 shrink-0">
                      <h3 className="font-bold text-sm flex items-center"><ActivityIcon className="w-4 h-4 mr-2 text-primary" /> Critical Telemetry</h3>
                      <div className="flex items-center gap-1">
                        <button className="text-muted-foreground hover:text-foreground p-1"><SettingsIcon className="w-3.5 h-3.5"/></button>
                        <button onClick={() => setTelemetryOpen(false)} className="text-muted-foreground hover:text-foreground p-1"><X className="w-3.5 h-3.5"/></button>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-6">
                      
                      <div className="flex flex-col items-center">
                        <div className="text-xs font-bold uppercase text-muted-foreground mb-2 self-start">HVAC Efficiency</div>
                        <div className="relative w-32 h-32 rounded-full border-8 border-muted flex items-center justify-center">
                          <svg className="absolute inset-0 w-full h-full -rotate-90">
                            <circle cx="56" cy="56" r="56" className="stroke-success fill-none" strokeWidth="8" strokeDasharray="351" strokeDashoffset="50" strokeLinecap="round" transform="translate(8,8)" />
                          </svg>
                          <div className="text-2xl font-bold">85%</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Active Error Codes <Badge variant="destructive" className="ml-2 h-4 text-[10px]">2</Badge></div>
                        <div className="space-y-2">
                          <div className="p-2 border border-border rounded bg-destructive/10 text-xs flex justify-between items-start group">
                            <div className="flex gap-2">
                              <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                              <div>
                                <div className="font-bold text-destructive">ERR_COMP_01</div>
                                <div className="text-muted-foreground mt-0.5">AC Unit 402 • Room 402</div>
                              </div>
                            </div>
                            <Button variant="ghost" size="sm" className="h-6 text-[10px] opacity-0 group-hover:opacity-100 transition-opacity text-primary">Ticket</Button>
                          </div>
                          <div className="p-2 border border-border rounded bg-warning/10 text-xs flex justify-between items-start group">
                            <div className="flex gap-2">
                              <AlertCircle className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                              <div>
                                <div className="font-bold text-warning">FILT_CLOG_W</div>
                                <div className="text-muted-foreground mt-0.5">Pool Pump Main</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="text-xs font-bold uppercase text-muted-foreground mb-2">Equipment Lifespan</div>
                        <div className="space-y-3">
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium">Elevator B</span>
                              <span className="text-muted-foreground">35%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-primary w-[35%]" /></div>
                          </div>
                          <div>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="font-medium">Boiler System</span>
                              <span className="text-warning font-bold">82%</span>
                            </div>
                            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden"><div className="h-full bg-warning w-[82%]" /></div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </>
                )}
              </div>
              
              {!telemetryOpen && (
                <button onClick={() => setTelemetryOpen(true)} className="w-8 shrink-0 bg-card border border-border rounded-xl flex items-center justify-center hover:bg-muted transition-colors">
                  <ActivityIcon className="w-4 h-4 text-muted-foreground -rotate-90" />
                </button>
              )}

            </div>
          </div>
        )}

        {activeTab === "Assets" && (
          <Card className="flex-1 bg-card border-border shadow-sm flex flex-col p-8 items-center justify-center text-center">
            <Box className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
            <h2 className="text-xl font-bold">Asset Registry</h2>
            <p className="text-sm text-muted-foreground mt-2 max-w-md">Manage the lifecycle of 45+ physical assets across the property. Track warranties, installation dates, and view complete service histories.</p>
            <Button className="mt-6">Add New Asset</Button>
          </Card>
        )}

        {activeTab === "Preventive Maintenance" && (
          <Card className="flex-1 bg-card border-border shadow-sm flex flex-col overflow-hidden">
             <div className="p-4 border-b border-border flex justify-between">
               <CardTitle className="text-lg">Preventive Schedules</CardTitle>
               <Button size="sm">Create Schedule</Button>
             </div>
             <table className="w-full text-sm text-left whitespace-nowrap">
                <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                  <tr>
                    <th className="px-4 py-3 font-medium">Task</th>
                    <th className="px-4 py-3 font-medium">Category</th>
                    <th className="px-4 py-3 font-medium">Frequency</th>
                    <th className="px-4 py-3 font-medium">Next Due</th>
                    <th className="px-4 py-3 font-medium">Team</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPreventiveSchedules.map(pm => (
                    <tr key={pm.id} className="border-b border-border hover:bg-muted/20">
                      <td className="px-4 py-3 font-semibold">{pm.title}</td>
                      <td className="px-4 py-3"><Badge variant="outline">{pm.category}</Badge></td>
                      <td className="px-4 py-3">{pm.frequency}</td>
                      <td className="px-4 py-3 text-foreground font-medium">{formatDate(pm.nextDue)}</td>
                      <td className="px-4 py-3 text-muted-foreground">{pm.assignedTeam}</td>
                    </tr>
                  ))}
                </tbody>
             </table>
          </Card>
        )}

      </div>

      <Drawer open={ticketDrawerOpen} onClose={() => { setTicketDrawerOpen(false); router.push(pathname) }} title={`Work Order ${selectedTicket.id}`}>
        <div className="flex flex-col h-full space-y-6">
          <div className="flex gap-4 border-b border-border">
            {["Details", "Comments", "Activity"].map(dt => (
              <button 
                key={dt} 
                onClick={() => setDrawerTab(dt as any)} 
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${drawerTab === dt ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {dt}
              </button>
            ))}
          </div>

          {drawerTab === "Details" && (
            <div className="flex-1 overflow-y-auto space-y-6 pr-2">
              <div>
                <h2 className="text-xl font-bold mb-1">{selectedTicket.title}</h2>
                <div className="flex gap-2 items-center text-xs text-muted-foreground">
                  <Badge variant="outline">{selectedTicket.status}</Badge>
                  <span>•</span>
                  <span>{selectedTicket.location}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/20 p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Assignee</div>
                  <div className="font-semibold">{mockStaff.find(s => s.id === selectedTicket.assigneeId)?.name || "Unassigned"}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Priority</div>
                  <Badge variant="outline" className={`text-[10px] h-5 ${PRIORITY_COLORS[selectedTicket.priority]}`}>{selectedTicket.priority}</Badge>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Asset</div>
                  <div className="font-semibold text-primary cursor-pointer hover:underline">{mockAssets.find(a => a.id === selectedTicket.assetId)?.name || "None"}</div>
                </div>
                <div className="bg-muted/20 p-3 rounded-lg border border-border">
                  <div className="text-xs text-muted-foreground mb-1">Due Date</div>
                  <div className={`font-semibold ${checkIsOverdue(selectedTicket) ? "text-red-400" : ""}`}>{formatDate(selectedTicket.dueDate)}</div>
                </div>
              </div>

              <div>
                <h3 className="font-bold text-sm mb-2 border-b border-border pb-1">Description</h3>
                <p className="text-sm text-muted-foreground">{selectedTicket.description}</p>
              </div>

              {selectedTicket.ooo && (
                <div className="bg-warning/10 border border-warning/30 p-3 rounded-lg flex items-center gap-3 text-warning text-sm">
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <div>
                    <span className="font-bold block">Room Out of Order</span>
                    <span className="text-xs opacity-80">This room is blocked in the calendar until resolved.</span>
                  </div>
                </div>
              )}

              <div>
                <h3 className="font-bold text-sm mb-2 border-b border-border pb-1">Photos ({selectedTicket.photos})</h3>
                {selectedTicket.photos > 0 ? (
                  <div className="flex gap-2">
                    {Array.from({length: selectedTicket.photos}).map((_, idx) => (
                      <div key={idx} className="w-20 h-20 bg-muted border border-border rounded flex items-center justify-center text-muted-foreground">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-xs text-muted-foreground italic">No photos attached.</div>
                )}
              </div>
            </div>
          )}

          {drawerTab === "Comments" && (
            <div className="flex-1 flex items-center justify-center text-muted-foreground text-sm italic">
              No comments yet. Mention staff with @ to notify them.
            </div>
          )}

          {drawerTab === "Activity" && (
            <div className="flex-1 overflow-y-auto space-y-4 text-sm">
              <div className="flex gap-3 text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0" />
                <div>
                  <div>Created by <strong>System</strong></div>
                  <div className="text-xs">{mounted ? formatDistanceToNow(parseISO(selectedTicket.dateLogged), { addSuffix: true }) : ""}</div>
                </div>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-border grid grid-cols-2 gap-2 mt-auto shrink-0">
            {selectedTicket.status !== "Resolved" ? (
              <>
                <Button className="col-span-2 bg-success text-success-foreground hover:bg-success/90 h-10" onClick={() => {
                  if(selectedTicket.ooo) {
                    confirm("Return room to service? This will unblock the calendar and notify Housekeeping.")
                  }
                  setTicketDrawerOpen(false); 
                  router.push(pathname);
                }}>Mark as Resolved</Button>
                {!selectedTicket.assigneeId && <Button variant="outline">Assign to Me</Button>}
                <Button variant="outline" className={!selectedTicket.assigneeId ? "" : "col-span-2"}>Update Status</Button>
              </>
            ) : (
              <Button variant="outline" className="col-span-2">Reopen Ticket</Button>
            )}
          </div>
        </div>
      </Drawer>

      <Modal open={createModalOpen} onClose={() => setCreateModalOpen(false)} title="Create Work Order">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setCreateModalOpen(false) }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <Input required placeholder="e.g. AC leaking water" className="bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Category</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {Object.keys(CATEGORY_ICONS).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Priority</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                {Object.keys(PRIORITY_COLORS).map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Asset / Location</label>
            <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
              <option>Search assets or rooms...</option>
              {mockAssets.map(a => <option key={a.id}>{a.name} ({a.location})</option>)}
              {mockRooms.map(r => <option key={r.id}>Room {r.number}</option>)}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring" placeholder="Provide details..."></textarea>
          </div>
          <div className="flex items-center gap-2 mt-2 p-3 border border-border rounded-lg bg-muted/20">
            <input type="checkbox" id="ooo" className="rounded border-muted-foreground w-4 h-4" />
            <label htmlFor="ooo" className="text-sm font-medium cursor-pointer">Mark Room as Out of Order</label>
          </div>
          <Button type="submit" className="w-full mt-4 bg-[var(--primary)] text-[var(--primary-foreground)]">Submit Work Order</Button>
        </form>
      </Modal>

    </div>
  )
}

function ActivityIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
    </svg>
  )
}

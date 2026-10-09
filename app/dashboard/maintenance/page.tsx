"use client"

import { useState } from "react"
import { Plus, List, LayoutGrid, Filter, Download, Wrench, AlertTriangle, Clock, CheckCircle2, MoreVertical, Image as ImageIcon, Wind, Zap, Lock, Lightbulb, Box, Key, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { mockWorkOrders, mockStaff, mockAssets, mockRooms } from "@/lib/mock-data"
import { formatDate, formatDateTime } from "@/lib/formatters"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"
import { isPast, parseISO, formatDistanceToNow } from "date-fns"

const CATEGORY_ICONS: Record<string, any> = {
  "HVAC": Wind,
  "Electrical": Zap,
  "Lock/Access": Lock,
  "Elevator": Box,
  "Pool": Box, // using box as fallback
  "Other": Wrench
}

const PRIORITY_COLORS: Record<string, string> = {
  "Urgent": "bg-destructive/10 text-destructive border-destructive/30",
  "High": "bg-orange-500/10 text-orange-500 border-orange-500/30",
  "Medium": "bg-yellow-500/10 text-yellow-500 border-yellow-500/30",
  "Low": "bg-success/10 text-success border-success/30",
}

export default function MaintenancePage() {
  const [viewMode, setViewMode] = useState<"board" | "list">("board")
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null)
  const [telemetryOpen, setTelemetryOpen] = useState(true)
  const [mounted, setMounted] = useState(false)

  import("react").then(React => {
    React.useEffect(() => setMounted(true), [])
  })

  const columns = ["Reported", "Assigned & Dispatched", "In Verification", "Resolved"]

  // KPIs
  const openTickets = mockWorkOrders.filter(w => w.status !== "Resolved").length
  const overdueTickets = mounted ? mockWorkOrders.filter(w => w.status !== "Resolved" && isPast(parseISO(w.dueDate))).length : 0
  const urgentTickets = mockWorkOrders.filter(w => w.status !== "Resolved" && w.priority === "Urgent").length
  const oooRooms = mockRooms.filter(r => r.status === "OOO").length

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Asset Maintenance</h1>
          <p className="text-sm text-muted-foreground mt-1">Track work orders, manage repairs, and monitor asset health.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-card border border-border rounded-lg p-1 mr-2 shadow-sm">
            <button onClick={() => setViewMode("board")} className={`p-1.5 rounded-md transition-colors ${viewMode === "board" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><LayoutGrid className="w-4 h-4" /></button>
            <button onClick={() => setViewMode("list")} className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}><List className="w-4 h-4" /></button>
          </div>
          <Button variant="outline" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
          <Button variant="outline" className="h-9"><Download className="w-4 h-4 mr-2" /> Export</Button>
          <Button className="h-9"><Plus className="w-4 h-4 mr-2" /> Create Ticket</Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4 py-4 shrink-0">
        {[
          { label: "Open Tickets", val: openTickets, color: "text-foreground" },
          { label: "Overdue", val: overdueTickets, color: "text-destructive" },
          { label: "Urgent", val: urgentTickets, color: "text-destructive" },
          { label: "Avg Resolution", val: "2.4h", color: "text-foreground" },
          { label: "Rooms OOO", val: oooRooms, color: "text-warning" },
          { label: "Due for Service", val: 1, color: "text-foreground" },
        ].map((kpi, i) => (
          <div key={i} className="bg-card border border-border p-3 rounded-xl shadow-sm text-center flex flex-col justify-center">
            <div className={`text-2xl font-bold ${kpi.color}`}>{kpi.val}</div>
            <div className="text-xs text-muted-foreground mt-1 font-medium">{kpi.label}</div>
          </div>
        ))}
      </div>

      {/* Main Area */}
      <div className="flex gap-6 flex-1 overflow-hidden pb-4">
        
        {/* Left Column (Flexible) */}
        <div className="flex-1 flex flex-col overflow-hidden gap-6">
          
          {/* Kanban Board */}
          {viewMode === "board" && (
            <div className="flex-1 flex gap-4 overflow-x-auto pb-2 min-h-0">
              {columns.map(colName => {
                const colTickets = mockWorkOrders.filter(w => w.status === colName)
                return (
                  <div key={colName} className="flex-1 min-w-[280px] max-w-[320px] bg-muted/30 border border-border rounded-xl flex flex-col overflow-hidden">
                    <div className="p-3 border-b border-border bg-card font-bold flex justify-between items-center text-sm shadow-sm">
                      {colName}
                      <Badge variant="outline" className="bg-muted text-muted-foreground">{colTickets.length}</Badge>
                    </div>
                    <div className="p-3 flex-1 overflow-y-auto space-y-3 scrollbar-hide">
                      {colTickets.map(ticket => {
                        const Icon = CATEGORY_ICONS[ticket.category] || Wrench
                        const assignee = mockStaff.find(s => s.id === ticket.assigneeId)
                        const isTicketOverdue = mounted && ticket.status !== "Resolved" && isPast(parseISO(ticket.dueDate))
                        const isSelected = selectedTicketId === ticket.id
                        
                        return (
                          <div 
                            key={ticket.id} 
                            onClick={() => setSelectedTicketId(ticket.id)}
                            className={`bg-card p-3 rounded-lg border shadow-sm cursor-pointer transition-all hover:border-primary/50 flex flex-col gap-3 relative
                              ${isSelected ? "ring-2 ring-primary border-transparent" : "border-border"}
                              ${isTicketOverdue ? "border-destructive/50 shadow-[0_0_8px_rgba(239,68,68,0.1)]" : ""}`}
                          >
                            {/* Card Header */}
                            <div className="flex justify-between items-start gap-2">
                              <div className="flex items-start gap-2">
                                <Icon className="w-4 h-4 mt-0.5 text-muted-foreground shrink-0" />
                                <div>
                                  <div className="font-semibold text-sm leading-tight">{ticket.title}</div>
                                  <div className="text-[10px] text-muted-foreground mt-0.5">{ticket.location}</div>
                                </div>
                              </div>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <button className="h-6 w-6 rounded-md hover:bg-muted flex items-center justify-center shrink-0 -mr-1"><MoreVertical className="w-3 h-3 text-muted-foreground" /></button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>Open Ticket</DropdownMenuItem>
                                  <DropdownMenuItem>Assign Technician</DropdownMenuItem>
                                  <DropdownMenuItem>Change Priority</DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                            
                            {/* Desc */}
                            <p className="text-xs text-muted-foreground line-clamp-1">{ticket.description}</p>
                            
                            {/* Footer */}
                            <div className="flex items-center justify-between mt-auto pt-2 border-t border-border/50">
                              <div className="flex items-center gap-1.5 text-[10px] font-medium">
                                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] ${assignee ? "bg-primary text-primary-foreground" : "bg-muted border border-border text-muted-foreground"}`}>
                                  {assignee ? assignee.avatar : "?"}
                                </div>
                                <span className={!assignee ? "text-muted-foreground italic" : ""}>{assignee ? assignee.name : "Unassigned"}</span>
                              </div>
                              <Badge variant="outline" className={`text-[10px] h-5 ${PRIORITY_COLORS[ticket.priority]}`}>
                                {ticket.priority === "Urgent" ? <AlertTriangle className="w-2.5 h-2.5 mr-1" /> : null}
                                {ticket.priority}
                              </Badge>
                            </div>
                            
                            {/* Date & Icons Row */}
                            <div className="flex justify-between items-center text-[10px] text-muted-foreground">
                              <span className={isTicketOverdue ? "text-destructive font-bold flex items-center" : ""}>
                                {isTicketOverdue && <AlertCircle className="w-3 h-3 mr-1"/>}
                                Due: {formatDate(ticket.dueDate)}
                              </span>
                              {ticket.photos > 0 && <span className="flex items-center"><ImageIcon className="w-3 h-3 mr-1" /> {ticket.photos}</span>}
                            </div>

                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Work Orders Table (Shown fully in List view, or a small slice if we wanted, but prompt says "collapsible section" or hidden. Let's show full table in List view) */}
          {viewMode === "list" && (
            <Card className="flex-1 bg-card border-border shadow-sm flex flex-col overflow-hidden">
              <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left whitespace-nowrap">
                  <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider border-b border-border sticky top-0 z-10">
                    <tr>
                      <th className="px-4 py-3 font-medium w-10"><input type="checkbox" className="rounded border-muted-foreground" /></th>
                      <th className="px-4 py-3 font-medium">Work Order ID</th>
                      <th className="px-4 py-3 font-medium">Asset & Location</th>
                      <th className="px-4 py-3 font-medium">Priority</th>
                      <th className="px-4 py-3 font-medium">Status</th>
                      <th className="px-4 py-3 font-medium">Assignee</th>
                      <th className="px-4 py-3 font-medium">Last Updated</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockWorkOrders.map(ticket => {
                      const assignee = mockStaff.find(s => s.id === ticket.assigneeId)
                      const asset = mockAssets.find(a => a.id === ticket.assetId)
                      return (
                        <tr key={ticket.id} className="border-b border-border hover:bg-muted/20 cursor-pointer" onClick={() => setSelectedTicketId(ticket.id)}>
                          <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-muted-foreground" /></td>
                          <td className="px-4 py-3 font-mono font-medium">{ticket.id}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">{asset?.name || ticket.location}</div>
                            <div className="text-[10px] text-muted-foreground">{ticket.location}</div>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className={`text-[10px] h-5 ${PRIORITY_COLORS[ticket.priority]}`}>{ticket.priority}</Badge>
                          </td>
                          <td className="px-4 py-3">
                            <Badge variant="outline" className="bg-card text-foreground">{ticket.status}</Badge>
                          </td>
                          <td className="px-4 py-3 text-xs">{assignee ? assignee.name : <span className="text-muted-foreground italic">Unassigned</span>}</td>
                          <td className="px-4 py-3 text-xs text-muted-foreground" title={formatDateTime(ticket.lastUpdated)}>
                            {mounted ? formatDistanceToNow(parseISO(ticket.lastUpdated), { addSuffix: true }) : formatDate(ticket.lastUpdated)}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

        </div>

        {/* Right Column: Critical Telemetry Placeholder */}
        {telemetryOpen && (
          <div className="w-[300px] xl:w-[350px] shrink-0 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden">
            <div className="p-3 border-b border-border flex justify-between items-center bg-muted/10">
              <h3 className="font-bold text-sm">Critical Telemetry</h3>
              <button onClick={() => setTelemetryOpen(false)} className="text-muted-foreground hover:text-foreground"><MoreVertical className="w-4 h-4"/></button>
            </div>
            <div className="flex-1 p-4 flex flex-col items-center justify-center text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Wind className="w-8 h-8 text-muted-foreground opacity-50" />
              </div>
              <div>
                <p className="font-semibold text-sm">Telemetry Not Connected</p>
                <p className="text-xs text-muted-foreground mt-1 max-w-[200px]">Connect your IoT sensors and building management systems in Integrations.</p>
              </div>
              <Button variant="outline" size="sm" className="mt-2">Go to Integrations</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Calendar, Printer, ListTodo, Search, AlertCircle, ChevronLeft, ChevronRight, UserCheck, LogOut, CheckCircle2, Clock, AlertTriangle, Filter, MoreHorizontal, Copy, Camera, Check } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Drawer, Modal, ConfirmDialog, Skeleton } from "@/components/ui/Feedback"
import { mockReservations, mockRooms, mockGuests, mockShifts, mockStaff, mockNotes } from "@/lib/mock-data"
import { formatCurrency, formatDateTime, formatDate } from "@/lib/formatters"
import { useTenant } from "@/providers/TenantProvider"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"
import { format, parseISO, isSameDay } from "date-fns"

export default function FrontDeskPage() {
  const { tenant } = useTenant()
  const [tab, setTab] = useState<"Arrivals" | "Departures" | "In-house">("Arrivals")
  
  // Modals state
  const [checkInDrawerOpen, setCheckInDrawerOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [walkInOpen, setWalkInOpen] = useState(false)
  const [printOpen, setPrintOpen] = useState(false)

  // Derived Data
  const filteredBookings = mockReservations.filter(r => {
    if (tab === "Arrivals") return r.status === "Expected Arrival" || r.status === "Checked In"
    if (tab === "Departures") return r.status === "Expected Departure" || r.status === "Checked Out"
    return r.status === "Checked In"
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Expected Arrival": return <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/30"><Clock className="w-3 h-3 mr-1"/> Expected</Badge>
      case "Checked In": return <Badge variant="outline" className="bg-success/10 text-success border-success/30"><CheckCircle2 className="w-3 h-3 mr-1"/> Checked In</Badge>
      case "Expected Departure": return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30"><Clock className="w-3 h-3 mr-1"/> Pending</Badge>
      case "Checked Out": return <Badge variant="outline" className="bg-muted text-muted-foreground border-border"><Check className="w-3 h-3 mr-1"/> Checked Out</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentBadge = (state: string) => {
    switch (state) {
      case "Paid": return <Badge variant="outline" className="text-success border-success/30">Paid</Badge>
      case "Balance due": return <Badge variant="outline" className="text-destructive border-destructive/30">Balance Due</Badge>
      case "Deposit held": return <Badge variant="outline" className="text-warning border-warning/30">Deposit Held</Badge>
      default: return null
    }
  }

  const getRoomReadiness = (roomId: string) => {
    const room = mockRooms.find(r => r.id === roomId)
    if (!room) return <span className="text-muted-foreground">Unassigned</span>
    if (room.status === "Clean" || room.status === "Inspected") return <span className="text-success flex items-center text-xs"><CheckCircle2 className="w-3 h-3 mr-1"/> Ready</span>
    return <span className="text-destructive flex items-center text-xs"><AlertTriangle className="w-3 h-3 mr-1"/> Not Ready</span>
  }

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Front Desk Operations</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage daily check-ins, check-outs, and guest services.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9"><Calendar className="w-4 h-4 mr-2" /> View Timeline</Button>
          <Button variant="outline" className="h-9" onClick={() => setPrintOpen(true)}><Printer className="w-4 h-4 mr-2" /> Print End of Day</Button>
          <Button className="h-9"><ListTodo className="w-4 h-4 mr-2" /> Manage Task Queue</Button>
        </div>
      </div>

      {/* Alert Banner */}
      <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 flex items-center gap-3 text-sm text-destructive font-medium">
        <AlertCircle className="w-5 h-5 shrink-0" />
        <span>Room 102 not ready for 2 PM arrival. Housekeeping notified.</span>
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1">
        
        {/* Column 1: Quick Check-Ins/Outs (lg:col-span-6) */}
        <Card className="lg:col-span-6 bg-card border-border shadow-sm flex flex-col overflow-hidden">
          <CardHeader className="border-b border-border p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Quick Check-Ins/Outs</CardTitle>
            <Button variant="outline" size="sm" className="h-8"><Filter className="w-3 h-3 mr-2"/> Filters</Button>
          </CardHeader>
          <div className="flex items-center gap-4 px-4 pt-3 border-b border-border bg-muted/10">
            {["Arrivals", "Departures", "In-house"].map(t => (
              <button 
                key={t}
                onClick={() => setTab(t as any)}
                className={`pb-3 text-sm font-medium border-b-2 transition-colors ${tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {t} <span className="ml-1 text-xs opacity-60">({t === "Arrivals" ? 1 : t === "Departures" ? 1 : 1})</span>
              </button>
            ))}
          </div>
          <div className="flex-1 overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/30 text-muted-foreground text-xs uppercase tracking-wider border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">Room</th>
                  <th className="px-4 py-3 font-medium">Guest</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Payment</th>
                  <th className="px-4 py-3 font-medium">Readiness</th>
                  <th className="px-4 py-3 font-medium"></th>
                </tr>
              </thead>
              <tbody>
                {filteredBookings.map(b => {
                  const guest = mockGuests.find(g => g.id === b.guestId)
                  return (
                    <tr key={b.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                      <td className="px-4 py-3 font-bold">{b.roomId ? mockRooms.find(r => r.id === b.roomId)?.number : "--"}</td>
                      <td className="px-4 py-3 font-medium">{guest?.name}</td>
                      <td className="px-4 py-3">{getStatusBadge(b.status)}</td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          {getPaymentBadge(b.paymentState)}
                          {b.balance > 0 && <span className="text-[10px] text-muted-foreground">{formatCurrency(b.balance)}</span>}
                        </div>
                      </td>
                      <td className="px-4 py-3">{getRoomReadiness(b.roomId)}</td>
                      <td className="px-4 py-3 text-right">
                        <Button size="sm" onClick={() => { setSelectedBooking(b); setCheckInDrawerOpen(true); }}>Review</Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Column 2: Staff Schedule (lg:col-span-3) */}
        <Card className="lg:col-span-3 bg-card border-border shadow-sm flex flex-col">
          <CardHeader className="border-b border-border p-4 flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Staff Schedule (Today)</CardTitle>
            <div className="flex gap-1">
              <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronLeft className="w-3 h-3"/></Button>
              <Button variant="ghost" size="icon" className="h-6 w-6"><ChevronRight className="w-3 h-3"/></Button>
            </div>
          </CardHeader>
          <CardContent className="p-0 flex-1 overflow-y-auto">
            {/* Timeline UI mock */}
            <div className="relative h-full p-4">
              <div className="absolute top-0 bottom-0 left-[60px] border-l border-primary/50 border-dashed z-0"></div>
              <div className="absolute top-2 left-[35px] text-[10px] text-primary font-bold bg-card px-1 rounded-sm border border-primary/30 z-10">NOW</div>
              
              <div className="space-y-4 mt-6 relative z-10">
                {mockShifts.filter((s:any) => s.status === 'Published' && isSameDay(parseISO(s.start), new Date())).map((s:any) => {
                  const staff = mockStaff.find(st => st.id === s.staffId)
                  return (
                    <div key={s.id} className="ml-[20px] bg-muted/40 border border-border p-3 rounded-lg hover:border-primary/50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-sm">{staff?.name}</span>
                        <span className="text-[10px] text-muted-foreground">{format(parseISO(s.start), "h a")} - {format(parseISO(s.end), "h a")}</span>
                      </div>
                      <Badge variant="outline" className="text-[10px] bg-background">{s.department}</Badge>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 border-t border-border pt-4">
                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3">Shift Notes</h4>
                {mockNotes.map(n => (
                  <div key={n.id} className="text-sm bg-muted/20 p-2 rounded mb-2 border border-border/50">
                    <p className="mb-1">{n.text}</p>
                    <p className="text-[10px] text-muted-foreground">— {n.author} at {format(parseISO(n.time), "h:mm a")}</p>
                  </div>
                ))}
                <Input placeholder="Add handover note..." className="h-8 text-xs mt-2 bg-background" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Column 3: Desk Pulse (lg:col-span-3) */}
        <Card className="lg:col-span-3 bg-card border-border shadow-sm flex flex-col">
          <CardHeader className="border-b border-border p-4">
            <CardTitle className="text-lg">Desk Pulse</CardTitle>
          </CardHeader>
          <CardContent className="p-4 flex-1 flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-3 rounded-xl bg-blue-500/10 border border-blue-500/20">
                <div className="text-3xl font-bold text-blue-500">2</div>
                <div className="text-xs text-blue-500/80 font-medium mt-1">Arrivals Left</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-orange-500/10 border border-orange-500/20">
                <div className="text-3xl font-bold text-orange-500">1</div>
                <div className="text-xs text-orange-500/80 font-medium mt-1">Departures Left</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                <div className="text-3xl font-bold text-destructive">1</div>
                <div className="text-xs text-destructive/80 font-medium mt-1">Pending Folios</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-success/10 border border-success/20">
                <div className="text-3xl font-bold text-success">92%</div>
                <div className="text-xs text-success/80 font-medium mt-1">Efficiency</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 border-b border-border pb-2 flex items-center justify-between">
                Upcoming VIPs
                <Badge variant="outline" className="bg-brand-gold/10 text-brand-gold border-brand-gold/30">2 Today</Badge>
              </h3>
              <div className="space-y-3">
                {mockGuests.filter(g => g.vip).map(g => (
                  <div key={g.id} className="flex flex-col gap-1 text-sm bg-muted/20 p-3 rounded-lg border border-border">
                    <div className="flex justify-between font-semibold">
                      <span>{g.name}</span>
                      <span className="text-brand-gold">VIP</span>
                    </div>
                    <p className="text-xs text-muted-foreground flex items-start gap-1">
                      <AlertCircle className="w-3 h-3 shrink-0 mt-0.5 text-primary"/> 
                      {g.specialRequest || "No special requests."}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <Button className="w-full mt-auto" onClick={() => setWalkInOpen(true)}>Walk-in Booking</Button>
          </CardContent>
        </Card>

      </div>

      {/* Check-In Wizard Drawer */}
      <Drawer open={checkInDrawerOpen} onClose={() => setCheckInDrawerOpen(false)} title="Check-In / Out Folio">
        {selectedBooking && (() => {
          const guest = mockGuests.find(g => g.id === selectedBooking.guestId)
          const room = mockRooms.find(r => r.id === selectedBooking.roomId)
          
          return (
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{guest?.name}</h2>
                <p className="text-muted-foreground text-sm">{selectedBooking.id} • {selectedBooking.source}</p>
              </div>
              {getStatusBadge(selectedBooking.status)}
            </div>

            <div className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-4">
              <h3 className="font-semibold text-sm border-b border-border pb-2">Room Details</h3>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold">Room {room?.number || "--"}</div>
                  <div className="text-xs text-muted-foreground uppercase">{room?.type || "Unassigned"}</div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium mb-1">Status</div>
                  {getRoomReadiness(room?.id || "")}
                </div>
              </div>
              <Button variant="outline" className="w-full" size="sm">Change Room Assignment</Button>
            </div>

            <div className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-4">
              <h3 className="font-semibold text-sm border-b border-border pb-2">Folio & Payment</h3>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Rate:</span>
                <span className="font-semibold">{formatCurrency(selectedBooking.totalAmount)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-border pt-2">
                <span className="text-muted-foreground">Balance Due:</span>
                <span className="font-bold text-destructive text-lg">{formatCurrency(selectedBooking.balance)}</span>
              </div>
              {selectedBooking.balance > 0 && (
                <div className="flex gap-2">
                  <Button className="flex-1">Take Payment</Button>
                  <Button variant="outline" className="flex-1">Add Charge</Button>
                </div>
              )}
            </div>

            <div className="bg-card border border-border p-4 rounded-xl shadow-sm space-y-3">
              <h3 className="font-semibold text-sm border-b border-border pb-2">ID Verification</h3>
              <div className="flex items-center justify-center p-6 border-2 border-dashed border-border rounded-lg bg-muted/30 text-muted-foreground hover:bg-muted/50 cursor-pointer transition-colors">
                <div className="flex flex-col items-center gap-2">
                  <Camera className="w-6 h-6" />
                  <span className="text-xs font-medium">Scan or Upload ID</span>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-6 grid grid-cols-2 gap-3">
              {selectedBooking.status === "Expected Arrival" && (
                <Button className="col-span-2 bg-success text-success-foreground hover:bg-success/90 h-12 text-base">Complete Check-In & Issue Key</Button>
              )}
              {selectedBooking.status === "Expected Departure" && (
                <Button className="col-span-2 bg-primary text-primary-foreground h-12 text-base" onClick={() => window.location.href = `/dashboard/billing?tab=folios`}>Open Folio & Check-Out</Button>
              )}
              {selectedBooking.status === "Checked In" && (
                <>
                  <Button variant="outline">Issue New Key</Button>
                  <Button variant="outline" onClick={() => window.location.href = `/dashboard/messages?guest=${selectedBooking.guestId}`}>Message Guest</Button>
                </>
              )}
            </div>
          </div>
          )
        })()}
      </Drawer>

      {/* Print Modal */}
      <Modal open={printOpen} onClose={() => setPrintOpen(false)} title="End of Day Report">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Previewing End of Day report for {format(new Date(), "MMM d, yyyy")}.</p>
          <div className="bg-muted p-4 rounded text-xs font-mono border border-border h-[300px] overflow-y-auto">
            -- THE GRAND PLAZA --<br/><br/>
            EOD REPORT<br/>
            DATE: {format(new Date(), "yyyy-MM-dd")}<br/>
            ------------------------<br/>
            TOTAL ARRIVALS: 2<br/>
            TOTAL DEPARTURES: 1<br/>
            <br/>
            PAYMENTS COLLECTED: $3,450.00<br/>
            PENDING BALANCES: $45.00<br/>
            <br/>
            NOTES:<br/>
            - VIP in 201 checked in smoothly.<br/>
            - Maintenance finished AC in 203.<br/>
            ------------------------<br/>
            END OF REPORT
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setPrintOpen(false)}>Cancel</Button>
            <Button onClick={() => setPrintOpen(false)}><Printer className="w-4 h-4 mr-2" /> Print Report</Button>
          </div>
        </div>
      </Modal>

      {/* Walk In Modal */}
      <Modal open={walkInOpen} onClose={() => setWalkInOpen(false)} title="Walk-In Booking">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setWalkInOpen(false) }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Guest Name</label>
            <Input required className="bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Nights</label>
              <Input type="number" defaultValue={1} min={1} required className="bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
          </div>
          <div className="space-y-2 pt-2 border-t border-border">
            <div className="flex justify-between text-sm font-bold">
              <span>Total Rate:</span>
              <span>$240.00</span>
            </div>
          </div>
          <Button type="submit" className="w-full mt-2">Proceed to Payment & Check-In</Button>
        </form>
      </Modal>

    </div>
  )
}

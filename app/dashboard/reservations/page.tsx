"use client"

import { useState } from "react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { ChevronLeft, ChevronRight, Search, Plus, Filter, Calendar as CalendarIcon, Settings, MoreHorizontal } from "lucide-react"
import { mockReservations, mockRooms, mockWorkOrders } from "@/lib/mock-data"
import { format, addDays, subDays } from "date-fns"
import { Drawer, Modal, ConfirmDialog } from "@/components/ui/Feedback"
import { formatCurrency } from "@/lib/formatters"

import { useEffect } from "react";

export default function ReservationsPage() {
  const [currentDate, setCurrentDate] = useState(new Date("2026-10-10T00:00:00Z"))
  const [view, setView] = useState("14 Days")
  
  useEffect(() => {
    setCurrentDate(new Date())
  }, [])
  
  // Modals / Drawers state
  const [bookingDrawerOpen, setBookingDrawerOpen] = useState(false)
  const [selectedBooking, setSelectedBooking] = useState<any>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)

  // Generate 14 days header
  const days = Array.from({ length: 14 }).map((_, i) => addDays(currentDate, i))

  const handleBookingClick = (booking: any) => {
    setSelectedBooking(booking)
    setBookingDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Reservations Calendar</h1>
          <p className="text-sm text-muted-foreground mt-1">Arrivals today: <strong className="text-foreground">12</strong> • Departures: <strong className="text-foreground">8</strong> • In-house: <strong className="text-foreground">45</strong></p>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-9 h-9 w-[200px] bg-card border-border" placeholder="Search guests..." />
          </div>
          <Button variant="outline" className="h-9"><Filter className="w-4 h-4 mr-2" /> Filters</Button>
          <Button onClick={() => setAddModalOpen(true)} className="h-9"><Plus className="w-4 h-4 mr-2" /> New Booking</Button>
        </div>
      </div>

      <Card className="border-border shadow-sm bg-card flex flex-col flex-1 min-h-[600px] overflow-hidden">
        
        {/* Controls */}
        <div className="flex justify-between items-center p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={() => setCurrentDate(new Date())}>Today</Button>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={() => setCurrentDate(subDays(currentDate, 7))}><ChevronLeft className="w-4 h-4" /></Button>
              <h2 className="font-semibold w-[140px] text-center">{format(currentDate, "MMM d, yyyy")}</h2>
              <Button variant="ghost" size="icon" onClick={() => setCurrentDate(addDays(currentDate, 7))}><ChevronRight className="w-4 h-4" /></Button>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 p-1 rounded-lg">
            {['Day', 'Week', '14 Days', 'Month'].map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1 text-xs rounded-md font-medium transition-colors ${view === v ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}>
                {v}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 p-3 border-b border-border bg-muted/20 text-xs text-muted-foreground overflow-x-auto">
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-blue-500/20 border border-blue-500"></div> Confirmed</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-yellow-500/20 border border-yellow-500"></div> Pending</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-green-500/20 border border-green-500"></div> Checked In</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-purple-500/20 border border-purple-500"></div> Checked Out</div>
          <div className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-sm bg-muted border border-border"></div> Blocked / OOO</div>
        </div>

        {/* Gantt Area (Mock Grid) */}
        <div className="flex-1 overflow-auto flex relative">
          
          {/* Left Column (Rooms) */}
          <div className="w-[180px] shrink-0 border-r border-border bg-card sticky left-0 z-20">
            <div className="h-[60px] border-b border-border flex items-end p-3 text-xs font-semibold text-muted-foreground">Rooms</div>
            {mockRooms.map(room => (
              <div key={room.id} className="h-14 border-b border-border p-3 flex flex-col justify-center">
                <span className="font-bold text-sm">Room {room.number}</span>
                <span className="text-[10px] text-muted-foreground uppercase">{room.type}</span>
              </div>
            ))}
          </div>

          {/* Right Area (Grid) */}
          <div className="flex-1 min-w-[1200px]">
            {/* Header Dates */}
            <div className="flex h-[60px] border-b border-border bg-card sticky top-0 z-10">
              {days.map((d, i) => (
                <div key={i} className="flex-1 border-r border-border flex flex-col items-center justify-center p-1">
                  <span className="text-[10px] text-muted-foreground uppercase">{format(d, "EEE")}</span>
                  <span className={`text-sm font-bold ${i === 0 ? 'text-primary' : 'text-foreground'}`}>{format(d, "d")}</span>
                </div>
              ))}
            </div>

            {/* Grid Rows */}
            {mockRooms.map(room => {
              // Find a mock booking for this room to render a drag block
              const booking = mockReservations.find(r => r.roomId === room.id)
              
              return (
                <div key={room.id} className="flex h-14 border-b border-border group relative">
                  {/* Empty Cells */}
                  {days.map((d, i) => (
                    <div key={i} className="flex-1 border-r border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setAddModalOpen(true)} />
                  ))}
                  
                  {/* Mock Booking Block if exists */}
                  {booking && (
                    <div 
                      onClick={() => handleBookingClick(booking)}
                      className={`absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[1.02] z-10
                        ${booking.status === 'Checked In' ? 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300' : 
                          booking.status === 'Expected' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-300' : 
                          'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'}`}
                      style={{ left: `${(parseInt(room.id.replace(/\D/g, '')) % 3) * 7.14}%`, width: `${(2 + (parseInt(room.id.replace(/\D/g, '')) % 3)) * 7.14}%` }}
                    >
                      <div className="font-semibold whitespace-nowrap">{booking.guestId}</div>
                      <div className="text-[10px] opacity-80">{booking.status}</div>
                    </div>
                  )}

                  {mockWorkOrders.some(w => w.location === `Room ${room.number}` && w.ooo && w.status !== "Resolved") && (
                    <div 
                      className="absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm z-20 bg-muted/90 border-border text-muted-foreground flex items-center justify-center font-bold"
                      style={{ left: `0%`, width: `21.42%` }}
                    >
                      BLOCKED / OOO
                    </div>
                  )}
                </div>
              )
            })}
          </div>

        </div>
      </Card>

      {/* Detail Drawer */}
      <Drawer open={bookingDrawerOpen} onClose={() => setBookingDrawerOpen(false)} title="Booking Details">
        {selectedBooking && (
          <div className="space-y-6">
            <div>
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-bold text-foreground">Guest {selectedBooking.guestId}</h3>
                <Badge>{selectedBooking.status}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{selectedBooking.id} • {selectedBooking.source}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Check In</div>
                <div className="font-semibold">{format(new Date(selectedBooking.checkIn), "MMM d, yyyy")}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Check Out</div>
                <div className="font-semibold">{format(new Date(selectedBooking.checkOut), "MMM d, yyyy")}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Room</div>
                <div className="font-semibold">{selectedBooking.roomId}</div>
              </div>
              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Balance</div>
                <div className="font-semibold text-destructive">{formatCurrency(selectedBooking.balance)}</div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <Button className="w-full">Check In Guest</Button>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline">Edit Booking</Button>
                <Button variant="outline" onClick={() => window.location.href = `/dashboard/messages?guest=${selectedBooking.guestId}`}>Message Guest</Button>
              </div>
              <Button variant="ghost" className="w-full text-destructive hover:bg-destructive/10 hover:text-destructive">Cancel Reservation</Button>
            </div>
          </div>
        )}
      </Drawer>

      {/* Add Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)} title="New Booking">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setAddModalOpen(false) }}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Guest Name or Search</label>
            <Input placeholder="Search existing or type new..." className="bg-background" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Check In</label>
              <Input type="date" className="bg-background [color-scheme:dark]" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Check Out</label>
              <Input type="date" className="bg-background [color-scheme:dark]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Room Type</label>
              <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                <option>Standard</option>
                <option>Deluxe</option>
                <option>Suite</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Adults</label>
              <Input type="number" defaultValue={2} className="bg-background" />
            </div>
          </div>
          <Button type="submit" className="w-full mt-4">Create Booking</Button>
        </form>
      </Modal>

    </div>
  )
}

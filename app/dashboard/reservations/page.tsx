"use client"

import { useState } from "react"
import { Search, Filter, Plus, Calendar as CalendarIcon, List, Clock, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Card, CardContent } from "@/components/ui/Card"

const reservations = [
  { id: "RES-4091", guest: "Alice Smith", property: "Grand Plaza Hotel", room: "Deluxe Suite (402)", checkIn: "Oct 12, 14:00", checkOut: "Oct 15, 11:00", guests: 2, amount: "$840.00", source: "Direct", status: "Confirmed", avatar: "AS" },
  { id: "RES-4092", guest: "Bob Jones", property: "Grand Plaza Hotel", room: "Standard Room (204)", checkIn: "Oct 12, 15:00", checkOut: "Oct 18, 11:00", guests: 1, amount: "$520.00", source: "Booking.com", status: "Checked In", avatar: "BJ" },
  { id: "RES-4093", guest: "Charlie Brown", property: "V Resort & Spa", room: "Penthouse", checkIn: "Oct 10, 14:00", checkOut: "Oct 12, 11:00", guests: 4, amount: "$1,200.00", source: "Expedia", status: "Checked Out", avatar: "CB" },
  { id: "RES-4094", guest: "Diana Prince", property: "V Beach Resort", room: "Villa 3", checkIn: "Nov 01, 14:00", checkOut: "Nov 07, 11:00", guests: 2, amount: "$3,450.00", source: "Direct", status: "Pending", avatar: "DP" },
  { id: "RES-4095", guest: "Evan Wright", property: "Grand Plaza Hotel", room: "Ocean View (305)", checkIn: "Oct 12, 16:00", checkOut: "Oct 20, 11:00", guests: 2, amount: "$900.00", source: "Direct", status: "Confirmed", avatar: "EW" },
]

function getStatusBadge(status: string) {
  switch(status) {
    case 'Confirmed': return <Badge variant="softSuccess">Confirmed</Badge>
    case 'Checked In': return <Badge variant="softAccent">Checked In</Badge>
    case 'Checked Out': return <Badge variant="softDefault">Checked Out</Badge>
    case 'Pending': return <Badge variant="softWarning">Pending</Badge>
    default: return <Badge variant="outline">{status}</Badge>
  }
}

export default function ReservationsPage() {
  const [view, setView] = useState<'list' | 'timeline'>('list')

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Reservations</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage bookings, arrivals, and departures across your properties.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background">Grand Plaza Hotel ▼</Button>
          <Button variant="outline" className="h-9 bg-background"><CalendarIcon className="h-4 w-4 mr-2" /> Oct 12 - Oct 19 ▼</Button>
          <Button variant="outline" className="h-9 bg-background"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button className="h-9"><Plus className="h-4 w-4 mr-2" /> New Reservation</Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Today's Arrivals", value: "24", sub: "8 pending" },
          { label: "Today's Departures", value: "18", sub: "12 checked out" },
          { label: "In-House Guests", value: "142", sub: "85% occupancy" },
          { label: "Pending Reservations", value: "6", sub: "Action required" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 bg-card rounded-xl border border-border flex flex-col justify-center shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
              <span className="text-xs text-muted-foreground font-medium">{kpi.sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-b border-border bg-muted/20 gap-4">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by guest name, reservation ID..." 
              className="pl-9 h-9 bg-background border-border"
            />
          </div>
          <div className="flex bg-muted rounded-lg p-1 border border-border">
            <button 
              onClick={() => setView('list')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'list' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <List className="h-4 w-4" /> List
            </button>
            <button 
              onClick={() => setView('timeline')}
              className={`flex items-center gap-2 px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${view === 'timeline' ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'}`}
            >
              <Clock className="h-4 w-4" /> Timeline
            </button>
          </div>
        </div>

        {/* View Content */}
        {view === 'list' ? (
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
                <tr>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Guest</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Reservation ID</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Property & Room</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Check-in / Check-out</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Source</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider">Status</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider text-right">Amount</th>
                  <th className="px-6 py-3.5 font-semibold tracking-wider text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {reservations.map((res) => (
                  <tr key={res.id} className="bg-background hover:bg-muted/30 transition-colors group cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-semibold text-xs text-primary">
                          {res.avatar}
                        </div>
                        <span className="font-semibold text-foreground">{res.guest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{res.id}</td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{res.property}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{res.room}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground font-medium">{res.checkIn}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">to {res.checkOut}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">{res.source}</td>
                    <td className="px-6 py-4">
                      {getStatusBadge(res.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-semibold text-foreground">{res.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-muted-foreground flex-1 flex flex-col items-center justify-center bg-muted/10">
            <CalendarIcon className="h-12 w-12 mb-4 opacity-20" />
            <p className="font-medium text-foreground">Timeline View Active</p>
            <p className="text-sm mt-1">Interactive Gantt chart of room reservations would render here.</p>
          </div>
        )}
      </div>
    </div>
  )
}

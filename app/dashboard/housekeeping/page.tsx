"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Plus, MoreHorizontal, CheckSquare, Clock, User, ClipboardList, CheckCircle2, AlertTriangle, ShieldCheck } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Input } from "@/components/ui/Input"
import { Drawer, ConfirmDialog } from "@/components/ui/Feedback"
import { mockRooms, mockWorkOrders } from "@/lib/mock-data"
import { formatDateTime } from "@/lib/formatters"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"

export default function HousekeepingPage() {
  const [selectedRoom, setSelectedRoom] = useState<any>(mockRooms[1])
  const [filter, setFilter] = useState<string | null>(null)
  
  // Floor grouping
  const roomsByFloor = useMemo(() => {
    const grouped = mockRooms.reduce((acc, room) => {
      const f = room.floor.toString();
      if (!acc[f]) acc[f] = [];
      acc[f].push(room);
      return acc;
    }, {} as Record<string, typeof mockRooms>);
    return grouped;
  }, [])

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Clean': return 'bg-success/20 border-success/50 text-success'
      case 'Dirty': return 'bg-warning/20 border-warning/50 text-warning'
      case 'Inspected': return 'bg-blue-500/20 border-blue-500/50 text-blue-500'
      case 'OOO': return 'bg-muted border-border text-muted-foreground'
      default: return 'bg-muted text-muted-foreground'
    }
  }

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'Clean': return <CheckCircle2 className="w-4 h-4 mr-1.5" />
      case 'Dirty': return <AlertTriangle className="w-4 h-4 mr-1.5" />
      case 'Inspected': return <ShieldCheck className="w-4 h-4 mr-1.5" />
      case 'OOO': return <Clock className="w-4 h-4 mr-1.5" />
      default: return null
    }
  }

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Housekeeping & Asset Management</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9"><Filter className="w-4 h-4 mr-2" /> View: My Tasks</Button>
          <Button className="h-9"><Plus className="w-4 h-4 mr-2" /> Create Ticket</Button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-[600px]">
        
        {/* Left Side: Dense Status Grid */}
        <Card className="flex-1 border-border shadow-sm bg-card flex flex-col">
          <div className="p-4 border-b border-border flex flex-wrap gap-3 items-center justify-between">
            <div className="flex gap-2">
              <Badge variant={filter === 'Clean' ? 'default' : 'outline'} onClick={() => setFilter(filter === 'Clean' ? null : 'Clean')} className="cursor-pointer text-success border-success/30 hover:bg-success/10"><CheckCircle2 className="w-3 h-3 mr-1"/> Clean (3)</Badge>
              <Badge variant={filter === 'Dirty' ? 'default' : 'outline'} onClick={() => setFilter(filter === 'Dirty' ? null : 'Dirty')} className="cursor-pointer text-warning border-warning/30 hover:bg-warning/10"><AlertTriangle className="w-3 h-3 mr-1"/> Dirty (8)</Badge>
              <Badge variant={filter === 'Inspected' ? 'default' : 'outline'} onClick={() => setFilter(filter === 'Inspected' ? null : 'Inspected')} className="cursor-pointer text-blue-500 border-blue-500/30 hover:bg-blue-500/10"><ShieldCheck className="w-3 h-3 mr-1"/> Inspected (2)</Badge>
              <Badge variant={filter === 'OOO' ? 'default' : 'outline'} onClick={() => setFilter(filter === 'OOO' ? null : 'OOO')} className="cursor-pointer text-muted-foreground border-border hover:bg-muted"><Clock className="w-3 h-3 mr-1"/> OOO (1)</Badge>
            </div>
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input className="pl-9 h-8 w-[200px] bg-background text-xs" placeholder="Search room..." />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {Object.entries(roomsByFloor).map(([floor, rooms]) => (
              <div key={floor}>
                <h3 className="font-bold text-sm text-muted-foreground mb-3 border-b border-border pb-1">Floor {floor}</h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-4 xl:grid-cols-6 gap-3">
                  {rooms.filter((r: any) => filter ? r.status === filter : true).map((room: any) => (
                    <div 
                      key={room.id}
                      onClick={() => setSelectedRoom(room)}
                      className={`cursor-pointer rounded-xl border p-3 flex flex-col transition-all hover:scale-105 ${selectedRoom?.id === room.id ? 'ring-2 ring-primary ring-offset-2 ring-offset-background' : ''} ${getStatusColor(room.status)}`}
                    >
                      <span className="font-bold text-lg leading-none">{room.number}</span>
                      <span className="text-[10px] mt-1 font-medium flex items-center">{getStatusIcon(room.status)} {room.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right Side: Selected Room Panel & Kanban */}
        <div className="w-full lg:w-[400px] flex flex-col gap-6">
          
          <Card className="border-border shadow-sm bg-card flex-1">
            <CardHeader className="border-b border-border pb-3 flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-xl">Room {selectedRoom?.number || "--"}</CardTitle>
                <p className="text-xs text-muted-foreground mt-1">Occupancy: <strong>Vacant</strong></p>
              </div>
              {selectedRoom && (
                <Badge className={getStatusColor(selectedRoom.status)} variant="outline">
                  {getStatusIcon(selectedRoom.status)} {selectedRoom.status}
                </Badge>
              )}
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-6">
              
              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <Button className="w-full bg-success text-success-foreground hover:bg-success/90"><CheckCircle2 className="w-4 h-4 mr-2"/> Mark Clean</Button>
                <Button className="w-full bg-blue-600 text-white hover:bg-blue-700"><ShieldCheck className="w-4 h-4 mr-2"/> Inspected</Button>
              </div>

              {/* Sub-tasks */}
              <div>
                <h4 className="text-sm font-bold flex items-center justify-between mb-3">
                  Cleaning Checklist
                  <span className="text-xs font-normal text-muted-foreground">0 / 4 completed</span>
                </h4>
                <div className="space-y-2">
                  {['Change linens', 'Restock minibar', 'Vacuum floors', 'Wipe surfaces'].map((task, i) => (
                    <label key={i} className="flex items-center gap-3 p-2 rounded hover:bg-muted/50 cursor-pointer border border-transparent hover:border-border transition-colors">
                      <input type="checkbox" className="rounded border-muted-foreground h-4 w-4 accent-primary" />
                      <span className="text-sm text-foreground select-none">{task}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-sm font-bold">Maintenance Tickets</h4>
                  <Button variant="ghost" size="sm" className="h-6 text-xs px-2"><Plus className="w-3 h-3 mr-1"/> New</Button>
                </div>
                {mockWorkOrders.filter(t => t.location === "Room " + selectedRoom?.number).length > 0 ? (
                  mockWorkOrders.filter(t => t.location === "Room " + selectedRoom?.number).map(t => (
                    <div key={t.id} className="p-3 border border-border rounded-lg bg-muted/20 text-sm">
                      <div className="flex justify-between font-semibold mb-1">
                        <span>{t.title}</span>
                        <Badge variant="outline" className="text-[10px]">{t.status}</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground flex items-center gap-2 mt-2">
                        <User className="w-3 h-3"/> {t.priority}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-sm text-muted-foreground italic p-3 border border-dashed border-border rounded-lg text-center">No open tickets.</div>
                )}
              </div>

            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  )
}

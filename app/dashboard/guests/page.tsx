"use client"

import { useState } from "react"
import { Search, Filter, Plus, MoreHorizontal, Mail, Download, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog } from "@/components/ui/Feedback"
import { mockGuests } from "@/lib/mock-data"
import { formatCurrency, formatDate } from "@/lib/formatters"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"

export default function GuestsPage() {
  const [guestDrawerOpen, setGuestDrawerOpen] = useState(false)
  const [drawerTab, setDrawerTab] = useState<"Overview" | "Messages">("Overview")
  const [selectedGuest, setSelectedGuest] = useState<any>(null)
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)

  const handleRowClick = (guest: any) => {
    setSelectedGuest(guest)
    setGuestDrawerOpen(true)
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Guests</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage guest profiles, histories, and preferences.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
          <Button variant="outline" className="h-9"><Filter className="h-4 w-4 mr-2" /> Filters</Button>
          <Button onClick={() => setAddModalOpen(true)} className="h-9"><Plus className="h-4 w-4 mr-2" /> Add Guest</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Guests", value: "8,249", trend: "+120 this month", color: "text-blue-500" },
          { label: "Active VIPs", value: "342", trend: "+12 this month", color: "text-brand-gold" },
          { label: "Repeat Guests", value: "28%", trend: "+2.4% vs prev", color: "text-green-500" },
          { label: "Avg Spend", value: formatCurrency(1240), trend: "+$45 vs prev", color: "text-purple-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-card border border-border p-4 rounded-xl shadow-sm">
            <div className="text-sm text-muted-foreground mb-1">{stat.label}</div>
            <div className="text-2xl font-bold">{stat.value}</div>
            <div className={`text-xs mt-1 ${stat.color}`}>{stat.trend}</div>
          </div>
        ))}
      </div>

      <div className="bg-card border border-border rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search guests..." className="pl-9 h-9 w-[300px] bg-background border-border" />
          </div>
          <div className="text-sm text-muted-foreground">Showing 1-10 of 8,249</div>
        </div>
        
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/50 border-b border-border text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium w-10"><input type="checkbox" className="rounded border-muted-foreground" /></th>
                <th className="px-4 py-3 font-medium">Guest Name</th>
                <th className="px-4 py-3 font-medium">Status / Tier</th>
                <th className="px-4 py-3 font-medium">Contact</th>
                <th className="px-4 py-3 font-medium">Last Stay</th>
                <th className="px-4 py-3 font-medium text-right">Total Spend</th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {mockGuests.map((guest) => (
                <tr key={guest.id} className="border-b border-border hover:bg-muted/30 transition-colors group cursor-pointer" onClick={() => handleRowClick(guest)}>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" className="rounded border-muted-foreground" /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs">
                        {guest.avatar}
                      </div>
                      <div>
                        <div className="font-semibold text-foreground group-hover:text-primary transition-colors">{guest.name}</div>
                        <div className="text-xs text-muted-foreground">ID: {guest.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5 flex-wrap">
                      {guest.tags.map(tag => (
                        <Badge key={tag} variant="outline" className={`text-[10px] uppercase ${tag === 'VIP' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/30' : 'bg-muted text-muted-foreground'}`}>{tag}</Badge>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">
                    <div>{guest.email}</div>
                    <div className="text-xs">{guest.phone}</div>
                  </td>
                  <td className="px-4 py-3 text-muted-foreground">{formatDate(guest.lastStay)}</td>
                  <td className="px-4 py-3 text-right font-medium text-foreground">{formatCurrency(guest.totalSpend)}</td>
                  <td className="px-4 py-3" onClick={e => e.stopPropagation()}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                          <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleRowClick(guest)}>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>New Booking</DropdownMenuItem>
                        <DropdownMenuItem><Mail className="w-4 h-4 mr-2"/> Message</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => setConfirmDelete(true)} className="text-destructive focus:text-destructive focus:bg-destructive/10">Delete Guest</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-border flex items-center justify-between bg-muted/10">
          <div className="text-xs text-muted-foreground">Rows per page: <strong>25</strong></div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronLeft className="w-4 h-4" /></Button>
            <Button variant="outline" size="sm" className="h-8 px-2"><ChevronRight className="w-4 h-4" /></Button>
          </div>
        </div>
      </div>

      <Drawer open={guestDrawerOpen} onClose={() => setGuestDrawerOpen(false)} title="Guest Profile">
        {selectedGuest && (
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex gap-4 border-b border-border pb-2 shrink-0">
              {["Overview", "Messages"].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setDrawerTab(tab as any)} 
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${drawerTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {drawerTab === "Overview" && (
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="flex items-center gap-4 border-b border-border pb-6">
              <div className="h-16 w-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl">
                {selectedGuest.avatar}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">{selectedGuest.name}</h2>
                <p className="text-muted-foreground">{selectedGuest.email} • {selectedGuest.phone}</p>
                <div className="flex gap-2 mt-2">
                  {selectedGuest.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className={`text-xs ${tag === 'VIP' ? 'bg-brand-gold/10 text-brand-gold border-brand-gold/30' : ''}`}>{tag}</Badge>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Total Stays</div>
                <div className="font-bold text-xl">{selectedGuest.totalStays}</div>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Total Spend</div>
                <div className="font-bold text-xl">{formatCurrency(selectedGuest.totalSpend)}</div>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3 border-b border-border pb-2">Preferences & Notes</h3>
              <ul className="text-sm space-y-2 text-muted-foreground">
                <li>• Prefers high floor away from elevator</li>
                <li>• Feather-free pillows</li>
                <li>• Dietary: Gluten-free</li>
              </ul>
            </div>

            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Open Message Center</Button>
              <Button variant="outline">Create New Booking</Button>
              <Button variant="outline">View Stay History</Button>
            </div>
          </div>
          )}

          {drawerTab === "Messages" && (
            <div className="flex-1 flex flex-col h-full border border-border rounded-lg bg-muted/10 items-center justify-center p-6 text-center mt-4">
              <div className="text-muted-foreground mb-4">View this guest's full message history in the Messages module.</div>
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Go to Messages</Button>
            </div>
          )}

          </div>
        )}
      </Drawer>

      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)} title="Add Guest">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setAddModalOpen(false) }}>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">First Name</label>
              <Input required className="bg-background" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Last Name</label>
              <Input required className="bg-background" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email Address</label>
            <Input type="email" required className="bg-background" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Phone Number</label>
            <Input type="tel" className="bg-background" />
          </div>
          <Button type="submit" className="w-full mt-4">Save Guest Profile</Button>
        </form>
      </Modal>

      <ConfirmDialog 
        open={confirmDelete} 
        onClose={() => setConfirmDelete(false)} 
        onConfirm={() => console.log("Deleted")} 
        title="Delete Guest Data?" 
        description="This action cannot be undone and will anonymize historical folios per GDPR compliance." 
        variant="destructive" 
        confirmText="Delete Guest" 
      />
    </div>
  )
}

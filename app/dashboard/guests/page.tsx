import { Search, Filter, Plus, Mail, Phone, MoreHorizontal, Star } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"

const guests = [
  { id: "G-102", name: "Eleanor Pena", email: "eleanor.pena@example.com", phone: "+1 (555) 0192", country: "United States", lastStay: "Oct 12, 2026", totalStays: 4, totalSpend: "$4,200", vip: true, avatar: "EP" },
  { id: "G-103", name: "Jacob Jones", email: "jacob.jones@example.com", phone: "+44 7700 900077", country: "United Kingdom", lastStay: "Oct 10, 2026", totalStays: 1, totalSpend: "$850", vip: false, avatar: "JJ" },
  { id: "G-104", name: "Leslie Alexander", email: "leslie.a@example.com", phone: "+1 (555) 0124", country: "Canada", lastStay: "Sep 28, 2026", totalStays: 12, totalSpend: "$14,500", vip: true, avatar: "LA" },
  { id: "G-105", name: "Cameron Williamson", email: "cameron.w@example.com", phone: "+61 400 000 000", country: "Australia", lastStay: "Sep 15, 2026", totalStays: 2, totalSpend: "$1,200", vip: false, avatar: "CW" },
  { id: "G-106", name: "Brooklyn Simmons", email: "brooklyn.s@example.com", phone: "+1 (555) 0111", country: "United States", lastStay: "Aug 30, 2026", totalStays: 1, totalSpend: "$450", vip: false, avatar: "BS" },
]

export default function GuestsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Guests</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage guest profiles, histories, and preferences.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background"><Filter className="h-4 w-4 mr-2" /> Filter Guests</Button>
          <Button className="h-9"><Plus className="h-4 w-4 mr-2" /> Add Guest</Button>
        </div>
      </div>

      {/* Guest Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Guests", value: "8,420" },
          { label: "Returning Guests", value: "2,145" },
          { label: "VIP Guests", value: "342" },
          { label: "Active Stays", value: "142" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 bg-card rounded-xl border border-border flex flex-col justify-center shadow-sm">
            <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
            <div className="mt-1 text-2xl font-bold text-foreground">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-muted/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search guests by name, email, or phone..." 
              className="pl-9 h-9 bg-background border-border w-full"
            />
          </div>
        </div>

        {/* List View */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Guest Identity</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Contact</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Location</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Last Stay</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider text-right">Total Stays</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider text-right">Total Spend</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider text-right"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {guests.map((guest) => (
                <tr key={guest.id} className="bg-background hover:bg-muted/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="h-9 w-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-semibold text-sm text-primary">
                          {guest.avatar}
                        </div>
                        {guest.vip && (
                          <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-warning flex items-center justify-center border border-background">
                            <Star className="h-2.5 w-2.5 text-warning-foreground fill-current" />
                          </div>
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-foreground flex items-center gap-2">
                          {guest.name}
                        </span>
                        <span className="text-xs text-muted-foreground mt-0.5">{guest.id}</span>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col space-y-1">
                      <span className="text-muted-foreground flex items-center text-xs">
                        <Mail className="h-3 w-3 mr-1.5" /> {guest.email}
                      </span>
                      <span className="text-muted-foreground flex items-center text-xs">
                        <Phone className="h-3 w-3 mr-1.5" /> {guest.phone}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{guest.country}</td>
                  <td className="px-6 py-4 text-foreground font-medium">{guest.lastStay}</td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">{guest.totalStays}</td>
                  <td className="px-6 py-4 text-right font-semibold text-foreground">{guest.totalSpend}</td>
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
      </div>
    </div>
  )
}

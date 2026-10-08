import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Search } from "lucide-react"

export default function GuestsPage() {
  const guests = [
    { name: "Alice Smith", email: "alice@example.com", visits: 3, lastStay: "Oct 2026", status: "VIP" },
    { name: "Bob Jones", email: "bob@example.com", visits: 1, lastStay: "Sep 2026", status: "Standard" },
    { name: "Charlie Brown", email: "charlie@example.com", visits: 5, lastStay: "Aug 2026", status: "VIP" },
    { name: "Diana Prince", email: "diana@example.com", visits: 2, lastStay: "Jan 2026", status: "Standard" },
  ]

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Guest Directory</h1>
          <p className="text-muted-foreground">Manage guest profiles, history, and preferences.</p>
        </div>
        <Button>Export CSV</Button>
      </div>

      <Card>
        <CardHeader className="p-4 sm:px-6">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search guests by name or email..." className="pl-8" />
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3 font-medium">Name</th>
                  <th className="px-6 py-3 font-medium">Email</th>
                  <th className="px-6 py-3 font-medium">Total Visits</th>
                  <th className="px-6 py-3 font-medium">Last Stay</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {guests.map((guest, i) => (
                  <tr key={i} className="bg-card border-b hover:bg-muted/30">
                    <td className="px-6 py-4 font-medium">{guest.name}</td>
                    <td className="px-6 py-4 text-muted-foreground">{guest.email}</td>
                    <td className="px-6 py-4">{guest.visits}</td>
                    <td className="px-6 py-4">{guest.lastStay}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${guest.status === 'VIP' ? 'bg-accent/20 text-accent' : 'bg-muted text-muted-foreground'}`}>
                        {guest.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

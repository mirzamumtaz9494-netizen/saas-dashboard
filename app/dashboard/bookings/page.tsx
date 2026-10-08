import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Search, Filter, Download, MoreHorizontal } from "lucide-react"

const bookings = [
  { id: "B-2041", guest: "Alice Smith", property: "Grand Hotel", room: "Deluxe Suite", checkIn: "Oct 12, 2026", checkOut: "Oct 15, 2026", status: "Confirmed", amount: "$840.00" },
  { id: "B-2042", guest: "Bob Jones", property: "Oasis Resort", room: "Standard Room", checkIn: "Oct 14, 2026", checkOut: "Oct 18, 2026", status: "Checked In", amount: "$520.00" },
  { id: "B-2043", guest: "Charlie Brown", property: "Grand Hotel", room: "Penthouse", checkIn: "Oct 10, 2026", checkOut: "Oct 12, 2026", status: "Checked Out", amount: "$1,200.00" },
  { id: "B-2044", guest: "Diana Prince", property: "Luxe Villas", room: "Villa 3", checkIn: "Nov 01, 2026", checkOut: "Nov 07, 2026", status: "Pending", amount: "$3,450.00" },
  { id: "B-2045", guest: "Evan Wright", property: "Oasis Resort", room: "Ocean View", checkIn: "Oct 15, 2026", checkOut: "Oct 20, 2026", status: "Confirmed", amount: "$900.00" },
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

export default function BookingsPage() {
  return (
    <div className="grid gap-6 md:gap-8 pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">Bookings</h1>
          <p className="text-muted-foreground mt-1 text-sm">View and manage all your property reservations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="h-9"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
          <Button className="h-9">Create Booking</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 sm:px-6 sm:py-5 border-b border-border/50">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by guest name or ID..." className="pl-9 h-9 bg-muted/50 border-transparent hover:bg-muted focus:bg-background focus:border-primary transition-colors" />
            </div>
            <Button variant="outline" className="w-full sm:w-auto h-9"><Filter className="h-4 w-4 mr-2" /> Filter Views</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border/50">
                <tr>
                  <th className="px-6 py-3.5 font-medium tracking-wider">Booking ID</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider">Guest</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider">Property & Room</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider">Dates</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider">Status</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider text-right">Amount</th>
                  <th className="px-6 py-3.5 font-medium tracking-wider text-right"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {bookings.map((booking) => (
                  <tr key={booking.id} className="bg-card hover:bg-muted/30 transition-colors group">
                    <td className="px-6 py-4 font-medium text-foreground">{booking.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted border border-border flex items-center justify-center font-medium text-xs text-muted-foreground">
                          {booking.guest.split(' ').map(n => n[0]).join('')}
                        </div>
                        <span className="font-medium text-foreground">{booking.guest}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <p className="font-medium text-foreground">{booking.property}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{booking.room}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-foreground">{booking.checkIn}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">to {booking.checkOut}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(booking.status)}
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-foreground">{booking.amount}</td>
                    <td className="px-6 py-4 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
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

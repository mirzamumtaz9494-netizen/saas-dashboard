import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Search, Filter, Download } from "lucide-react"

const bookings = [
  { id: "B-2041", guest: "Alice Smith", property: "Grand Hotel", room: "Deluxe Suite", checkIn: "Oct 12, 2026", checkOut: "Oct 15, 2026", status: "Confirmed", amount: "$840.00" },
  { id: "B-2042", guest: "Bob Jones", property: "Oasis Resort", room: "Standard Room", checkIn: "Oct 14, 2026", checkOut: "Oct 18, 2026", status: "Checked In", amount: "$520.00" },
  { id: "B-2043", guest: "Charlie Brown", property: "Grand Hotel", room: "Penthouse", checkIn: "Oct 10, 2026", checkOut: "Oct 12, 2026", status: "Checked Out", amount: "$1,200.00" },
  { id: "B-2044", guest: "Diana Prince", property: "Luxe Villas", room: "Villa 3", checkIn: "Nov 01, 2026", checkOut: "Nov 07, 2026", status: "Pending", amount: "$3,450.00" },
  { id: "B-2045", guest: "Evan Wright", property: "Oasis Resort", room: "Ocean View", checkIn: "Oct 15, 2026", checkOut: "Oct 20, 2026", status: "Confirmed", amount: "$900.00" },
]

export default function BookingsPage() {
  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Bookings Management</h1>
          <p className="text-muted-foreground">View and manage all your property reservations.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline"><Download className="h-4 w-4 mr-2" /> Export</Button>
          <Button>New Booking</Button>
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 sm:px-6 sm:py-4">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="Search by name or ID..." className="pl-8" />
            </div>
            <Button variant="outline" className="w-full sm:w-auto"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
                <tr>
                  <th className="px-6 py-3 font-medium">Booking ID</th>
                  <th className="px-6 py-3 font-medium">Guest</th>
                  <th className="px-6 py-3 font-medium">Property</th>
                  <th className="px-6 py-3 font-medium">Dates</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking) => (
                  <tr key={booking.id} className="bg-card border-b hover:bg-muted/30 transition-colors">
                    <td className="px-6 py-4 font-medium">{booking.id}</td>
                    <td className="px-6 py-4">{booking.guest}</td>
                    <td className="px-6 py-4">
                      {booking.property}
                      <div className="text-xs text-muted-foreground">{booking.room}</div>
                    </td>
                    <td className="px-6 py-4">
                      {booking.checkIn} <br/> <span className="text-muted-foreground">to</span> {booking.checkOut}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium
                        ${booking.status === 'Confirmed' ? 'bg-primary/20 text-primary' : 
                          booking.status === 'Checked In' ? 'bg-success/20 text-success' : 
                          booking.status === 'Checked Out' ? 'bg-secondary/20 text-secondary-foreground' : 
                          'bg-accent/20 text-accent-foreground'}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-medium">{booking.amount}</td>
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

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Building2, MapPin } from "lucide-react"

export default function PropertiesPage() {
  const properties = [
    { name: "Grand Hotel Downtown", location: "New York, NY", rooms: 120, status: "Active" },
    { name: "Oasis Resort & Spa", location: "Miami, FL", rooms: 85, status: "Active" },
    { name: "Luxe Villas", location: "Malibu, CA", rooms: 12, status: "Maintenance" },
  ]

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Properties</h1>
          <p className="text-muted-foreground">Manage your multi-location portfolio.</p>
        </div>
        <Button>Add Property</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((prop, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div>
                <CardTitle className="text-lg">{prop.name}</CardTitle>
                <CardDescription className="flex items-center mt-1">
                  <MapPin className="h-3 w-3 mr-1" /> {prop.location}
                </CardDescription>
              </div>
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <Building2 className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center mt-4">
                <div className="space-y-1">
                  <p className="text-sm font-medium">Total Rooms</p>
                  <p className="text-2xl font-bold">{prop.rooms}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${prop.status === 'Active' ? 'bg-success/20 text-success' : 'bg-error/20 text-error'}`}>
                  {prop.status}
                </span>
              </div>
              <Button variant="outline" className="w-full mt-6">Manage Property</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

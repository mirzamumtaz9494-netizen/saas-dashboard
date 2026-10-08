import { User, Mail, Phone, MapPin, Building, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6 h-full max-w-3xl w-full">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">My Profile</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your personal information and security.</p>
      </div>

      <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Banner & Avatar */}
        <div className="h-32 bg-primary/10 relative">
          <div className="absolute -bottom-10 left-6">
            <div className="h-20 w-20 rounded-xl bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold shadow-lg border-4 border-card">
              SJ
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <Button variant="outline" size="sm" className="bg-background/80 backdrop-blur border-border text-xs">
              Change Cover
            </Button>
          </div>
        </div>
        
        <div className="pt-14 p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-xl font-bold text-foreground">Sarah Johnson</h2>
              <p className="text-sm text-muted-foreground flex items-center mt-1">
                <ShieldCheck className="h-3.5 w-3.5 mr-1 text-primary" /> Front Desk Manager
              </p>
            </div>
            <Button variant="outline" className="h-9">Edit Profile</Button>
          </div>
        </div>

        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">Personal Information</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="first" className="text-sm font-semibold">First Name</Label>
              <Input id="first" defaultValue="Sarah" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last" className="text-sm font-semibold">Last Name</Label>
              <Input id="last" defaultValue="Johnson" className="bg-background" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="email" defaultValue="sarah.j@grandplaza.com" className="pl-9 bg-background" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-sm font-semibold">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="phone" defaultValue="+1 (555) 123-4567" className="pl-9 bg-background" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="px-6 pb-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4 border-b border-border pb-2">Employment Details</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role" className="text-sm font-semibold">Role</Label>
              <Input id="role" defaultValue="Front Desk Manager" readOnly className="bg-muted text-muted-foreground" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="property" className="text-sm font-semibold">Primary Property</Label>
              <div className="relative">
                <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input id="property" defaultValue="Grand Plaza Hotel" readOnly className="pl-9 bg-muted text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-border bg-muted/20 flex justify-end">
          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  )
}

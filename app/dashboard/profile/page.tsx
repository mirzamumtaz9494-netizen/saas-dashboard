import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function ProfilePage() {
  return (
    <div className="grid gap-4 md:gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="text-muted-foreground">Manage your personal account settings.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>Update your photo and personal details here.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="h-20 w-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
              GM
            </div>
            <Button variant="outline">Change Avatar</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="first">First Name</Label>
              <Input id="first" defaultValue="General" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="last">Last Name</Label>
              <Input id="last" defaultValue="Manager" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email Address</Label>
            <Input id="email" defaultValue="admin@vprofessionals.com" />
          </div>
          
          <Button>Save Changes</Button>
        </CardContent>
      </Card>
    </div>
  )
}

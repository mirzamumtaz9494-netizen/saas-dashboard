"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"
import { Input } from "@/components/ui/Input"
import { useTheme } from "next-themes"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="grid gap-4 md:gap-8 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Global workspace and application preferences.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>Customize how the dashboard looks on your device.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4">
            <Button 
              variant={theme === 'light' ? 'default' : 'outline'} 
              onClick={() => setTheme('light')}
            >
              Light Mode
            </Button>
            <Button 
              variant={theme === 'dark' ? 'default' : 'outline'} 
              onClick={() => setTheme('dark')}
            >
              Dark Mode
            </Button>
            <Button 
              variant={theme === 'system' ? 'default' : 'outline'} 
              onClick={() => setTheme('system')}
            >
              System Default
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Business Details</CardTitle>
          <CardDescription>Information used for invoices and public listings.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input defaultValue="Vprofessionals Hospitality Group" />
          </div>
          <div className="space-y-2">
            <Label>Billing Address</Label>
            <Input defaultValue="123 Hospitality Ave, Suite 100, NY" />
          </div>
          <Button>Update Business Info</Button>
        </CardContent>
      </Card>
    </div>
  )
}

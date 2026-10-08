"use client"

import { useTheme } from "next-themes"
import { Building2, Bell, Shield, CreditCard, Palette, User, Link as LinkIcon, Smartphone } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Label } from "@/components/ui/Label"

export default function SettingsPage() {
  const { setTheme, theme } = useTheme()

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div>
        <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-muted-foreground mt-1 text-sm">Manage your workspace configuration and preferences.</p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 flex-1">
        
        {/* Settings Navigation */}
        <div className="w-full md:w-64 shrink-0">
          <nav className="space-y-1">
            {[
              { id: 'profile', label: 'Profile', icon: User, active: false },
              { id: 'account', label: 'Account', icon: Shield, active: false },
              { id: 'properties', label: 'Properties', icon: Building2, active: false },
              { id: 'appearance', label: 'Appearance', icon: Palette, active: true },
              { id: 'notifications', label: 'Notifications', icon: Bell, active: false },
              { id: 'billing', label: 'Billing', icon: CreditCard, active: false },
              { id: 'integrations', label: 'Integrations', icon: LinkIcon, active: false },
            ].map(item => (
              <a 
                key={item.id} 
                href={`#${item.id}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                  item.active 
                    ? 'bg-primary/10 text-primary' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Settings Content Area */}
        <div className="flex-1 max-w-3xl space-y-8">
          
          <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
            <div className="p-6 border-b border-border">
              <h3 className="font-heading text-lg font-bold text-foreground">Appearance</h3>
              <p className="text-sm text-muted-foreground mt-1">Customize how Vprofessionals looks on your device.</p>
            </div>
            
            <div className="p-6 space-y-8">
              
              {/* Theme Colors */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">Theme Accent</Label>
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Indigo Executive', color: 'bg-[#4F46E5]', active: true },
                    { name: 'Navy Luxury', color: 'bg-[#0F172A]', active: false },
                    { name: 'Emerald Hospitality', color: 'bg-[#10B981]', active: false },
                    { name: 'Burgundy Luxury', color: 'bg-[#9f1239]', active: false },
                  ].map(t => (
                    <div 
                      key={t.name}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer transition-all ${
                        t.active ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-foreground/30 bg-background'
                      }`}
                    >
                      <div className={`h-4 w-4 rounded-full ${t.color}`}></div>
                      <span className="text-sm font-medium text-foreground">{t.name}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mode Selection */}
              <div>
                <Label className="text-sm font-semibold mb-3 block">Display Mode</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div 
                    onClick={() => setTheme('light')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      theme === 'light' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-foreground/30 bg-background'
                    }`}
                  >
                    <div className="h-20 w-full bg-[#F8FAFC] rounded-md border border-[#E2E8F0] p-2 flex flex-col gap-1 overflow-hidden">
                      <div className="h-2 w-full bg-[#FFFFFF] rounded-sm shadow-sm"></div>
                      <div className="flex gap-1 flex-1">
                        <div className="w-1/4 h-full bg-[#F1F5F9] rounded-sm"></div>
                        <div className="w-3/4 h-full bg-[#FFFFFF] rounded-sm shadow-sm"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">Light</span>
                  </div>

                  <div 
                    onClick={() => setTheme('dark')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      theme === 'dark' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-foreground/30 bg-background'
                    }`}
                  >
                    <div className="h-20 w-full bg-[#0B1120] rounded-md border border-[#263247] p-2 flex flex-col gap-1 overflow-hidden">
                      <div className="h-2 w-full bg-[#111827] rounded-sm border border-[#263247]"></div>
                      <div className="flex gap-1 flex-1">
                        <div className="w-1/4 h-full bg-[#172033] rounded-sm"></div>
                        <div className="w-3/4 h-full bg-[#111827] rounded-sm border border-[#263247]"></div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-foreground">Dark</span>
                  </div>

                  <div 
                    onClick={() => setTheme('system')}
                    className={`flex flex-col items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                      theme === 'system' ? 'border-primary bg-primary/5 ring-1 ring-primary/20' : 'border-border hover:border-foreground/30 bg-background'
                    }`}
                  >
                    <div className="h-20 w-full bg-muted rounded-md border border-border flex items-center justify-center">
                      <Smartphone className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <span className="text-sm font-medium text-foreground">System</span>
                  </div>
                </div>
              </div>

            </div>
            
            <div className="p-6 border-t border-border bg-muted/20 flex justify-end">
              <Button>Save Preferences</Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

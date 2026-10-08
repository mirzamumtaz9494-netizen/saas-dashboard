"use client"

import { useTheme } from "next-themes"
import { Building2, Bell, Shield, CreditCard, Palette, User, Link as LinkIcon, Smartphone, Check } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Label } from "@/components/ui/Label"

export default function SettingsPage() {
  const { setTheme, theme, resolvedTheme } = useTheme()

  const activeTheme = theme === 'system' ? resolvedTheme : theme;

  const themes = [
    { id: 'dark', name: 'Dark Blue', color: 'bg-[#3B82F6]' },
    { id: 'theme-green', name: 'Forest Green', color: 'bg-[#D1B583]' },
    { id: 'theme-gold', name: 'Navy & Gold', color: 'bg-[#D4AF37]' },
  ];

  return (
    <div className="flex flex-col gap-6 h-full pb-8">
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
                    ? 'bg-primary/10 text-primary border border-primary/20' 
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
                <Label className="text-sm font-semibold mb-3 block">Layout Theme Color</Label>
                <div className="flex flex-wrap gap-4">
                  {themes.map(t => (
                    <div 
                      key={t.id}
                      onClick={() => setTheme(t.id)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg border cursor-pointer transition-all ${
                        activeTheme === t.id 
                          ? 'border-primary bg-primary/5 ring-1 ring-primary/30 shadow-md' 
                          : 'border-border hover:border-foreground/30 bg-card hover:bg-muted/30'
                      }`}
                    >
                      <div className={`h-5 w-5 rounded-full ${t.color} flex items-center justify-center shadow-inner`}>
                        {activeTheme === t.id && <Check className="h-3 w-3 text-primary-foreground" />}
                      </div>
                      <span className="text-sm font-medium text-foreground">{t.name}</span>
                    </div>
                  ))}
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

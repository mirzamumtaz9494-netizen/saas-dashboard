"use client"

import { useState, useEffect } from "react"
import { 
  Building2, Users, Sliders, CreditCard, ChevronRight, CheckCircle2, AlertCircle, Save, X, Globe, UserCircle, Bell, Paintbrush, Link as LinkIcon, Shield, Database, Hotel, Languages, MoreVertical, Edit2, ShieldAlert
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { EmptyState, ConfirmDialog, Modal } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { mockStaff } from "@/lib/mock-data"

const NAV_GROUPS = [
  { group: "Property", icon: Building2, items: [
    { id: "property", label: "Property Details" },
    { id: "rooms", label: "Rooms & Rates" },
    { id: "language", label: "Language & Currency" }
  ]},
  { group: "People", icon: Users, items: [
    { id: "users", label: "Users & Roles" },
    { id: "profile", label: "My Profile" }
  ]},
  { group: "System", icon: Sliders, items: [
    { id: "operations", label: "Operations" },
    { id: "notifications", label: "Notifications" },
    { id: "branding", label: "Branding" },
    { id: "integrations", label: "Integrations" },
    { id: "security", label: "Security" },
    { id: "privacy", label: "Data & Privacy" }
  ]},
  { group: "Account", icon: CreditCard, items: [
    { id: "billing", label: "Plan & Billing" }
  ]}
]

export default function SettingsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "property"
  
  const { role, tenant } = useTenant()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
  }, [tabParam])

  const setTab = (tab: string) => {
    if (hasChanges) {
      if (!window.confirm("You have unsaved changes. Discard them?")) return
    }
    setHasChanges(false)
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      setHasChanges(false)
    }, 1000)
  }

  // Keyboard shortcut Ctrl+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault()
        if (hasChanges) handleSave()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [hasChanges])

  if (!mounted) return null

  // Role gating
  const isRestricted = role === "Housekeeping" || role === "Front Desk"
  const restrictedTabs = ["property", "rooms", "operations", "branding", "integrations", "security", "billing", "users", "privacy", "notifications"]
  
  if (isRestricted && restrictedTabs.includes(activeTab)) {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState title="Access Denied" description="You do not have permission to view this settings panel." icon={Shield} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden relative">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Settings <span className="text-border">/</span> <span className="capitalize">{activeTab.replace('-', ' ')}</span>
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure property details, users, and system preferences.</p>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden pt-4 gap-6">
        
        {/* Sidebar Nav */}
        <div className="w-64 shrink-0 hidden md:flex flex-col gap-6 overflow-y-auto pr-2 pb-24">
          {NAV_GROUPS.map(g => (
            <div key={g.group}>
              <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2 px-2 flex items-center gap-2">
                <g.icon className="w-3.5 h-3.5" /> {g.group}
              </h3>
              <div className="flex flex-col gap-1">
                {g.items.map(item => {
                  const isActive = activeTab === item.id
                  const isLocked = isRestricted && restrictedTabs.includes(item.id)
                  return (
                    <button
                      key={item.id}
                      onClick={() => !isLocked && setTab(item.id)}
                      disabled={isLocked}
                      className={`text-left px-3 py-2 rounded-lg text-sm transition-colors flex items-center justify-between ${isLocked ? 'opacity-50 cursor-not-allowed' : ''} ${isActive ? 'bg-primary/10 text-primary font-bold' : 'text-muted-foreground hover:bg-muted hover:text-foreground'}`}
                    >
                      {item.label}
                      {isActive && <ChevronRight className="w-4 h-4" />}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Mobile Horizontal Nav */}
        <div className="md:hidden flex gap-2 overflow-x-auto pb-4 shrink-0 border-b border-border mb-4 w-full">
          {NAV_GROUPS.flatMap(g => g.items).map(item => {
            const isLocked = isRestricted && restrictedTabs.includes(item.id)
            if (isLocked) return null
            return (
              <button
                key={item.id}
                onClick={() => setTab(item.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm transition-colors ${activeTab === item.id ? 'bg-primary text-primary-foreground font-bold' : 'bg-muted text-muted-foreground'}`}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pb-32 pr-2">
          {activeTab === "property" && <SectionProperty onChange={() => setHasChanges(true)} />}
          {activeTab === "rooms" && <SectionRooms onChange={() => setHasChanges(true)} />}
          {activeTab === "language" && <SectionLanguage onChange={() => setHasChanges(true)} />}
          {activeTab === "users" && <SectionUsers />}
          {activeTab === "profile" && <SectionProfile onChange={() => setHasChanges(true)} />}
          {activeTab === "operations" && <SectionOperations onChange={() => setHasChanges(true)} />}
          {activeTab === "notifications" && <SectionNotifications onChange={() => setHasChanges(true)} />}
          {activeTab === "branding" && <SectionBranding onChange={() => setHasChanges(true)} />}
          {activeTab === "integrations" && <SectionIntegrations />}
          {activeTab === "security" && <SectionSecurity onChange={() => setHasChanges(true)} />}
          {activeTab === "privacy" && <SectionPrivacy onChange={() => setHasChanges(true)} />}
          {activeTab === "billing" && <SectionBilling />}
        </div>
      </div>

      {/* Sticky Save Footer */}
      {hasChanges && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-card border border-border shadow-2xl px-6 py-4 rounded-xl flex items-center gap-8 z-50 animate-in slide-in-from-bottom-10">
          <div className="flex items-center gap-2 text-warning font-semibold text-sm">
            <AlertCircle className="w-5 h-5" /> You have unsaved changes
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setHasChanges(false)}>Discard</Button>
            <Button onClick={handleSave} disabled={isSaving}>
              {isSaving ? "Saving..." : "Save Changes (Ctrl+S)"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function SectionProperty({ onChange }: any) {
  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Property Details</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your core property identity and policies.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Property Name</label>
              <Input defaultValue="The Grand Hotel" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Legal Name</label>
              <Input defaultValue="Grand Plaza Hotels LLC" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Property Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>Hotel</option>
                <option>Boutique</option>
                <option>Serviced apartments</option>
                <option>Hostel</option>
                <option>B&B</option>
                <option>Vacation rental</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Star Rating</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Total Rooms</label>
            <Input value="120" readOnly disabled className="bg-muted text-muted-foreground w-32" />
            <p className="text-[10px] text-muted-foreground mt-1">Computed automatically from your room inventory.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Location</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Street Address</label>
            <Input defaultValue="3345 Minloke trate Bvd" onChange={onChange} className="bg-background" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">City</label>
              <Input defaultValue="Locuta" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">State / Region</label>
              <Input defaultValue="NY" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Postal Code</label>
              <Input defaultValue="77511" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Country</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>
          <div className="w-full h-32 bg-muted rounded-lg border border-border flex items-center justify-center text-muted-foreground text-xs">
            Static Map Placeholder
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Contact Information</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Primary Contact Name</label>
              <Input defaultValue="Sarah Jenkins" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Contact Role</label>
              <Input defaultValue="General Manager" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Business Email</label>
              <Input defaultValue="info@thegrandplaza.com" type="email" onChange={(e) => {
                if (e.target.value.includes('@gmail.com') || e.target.value.includes('@yahoo.com')) {
                  // just mock warning logic conceptually
                }
                onChange(e)
              }} className="bg-background" />
              <p className="text-[10px] text-muted-foreground mt-1">We recommend using a business domain.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Phone</label>
              <Input defaultValue="+1 (555) 123-4567" type="tel" onChange={onChange} className="bg-background" />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-4">Stay Rules & Policies</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Check-in Time</label>
              <Input defaultValue="15:00" type="time" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Check-out Time</label>
              <Input defaultValue="11:00" type="time" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Cancellation Policy</label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="Free cancellation up to 48 hours before check-in. Late cancellations will be charged the first night." onChange={onChange} />
            <p className="text-[10px] text-muted-foreground mt-1">Used in invoices and booking confirmations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionRooms({ onChange }: any) {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Rooms & Rates</h2>
            <p className="text-sm text-muted-foreground">Manage your physical inventory and room classes.</p>
          </div>
          <Button>Add Room Type</Button>
        </div>
        
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Room Type</th>
                <th className="px-4 py-3 font-medium text-center">Capacity</th>
                <th className="px-4 py-3 font-medium text-right">Base Rate</th>
                <th className="px-4 py-3 font-medium text-center">Count</th>
                <th className="px-4 py-3 font-medium text-right">Status</th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {[{n: "Deluxe King", c: "bg-blue-500", cp: "2A", r: "$150", ct: 45}, {n: "Standard Queen", c: "bg-emerald-500", cp: "2A, 1C", r: "$120", ct: 60}].map((rt, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="font-semibold flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${rt.c}`} title="Color code used in calendar" />
                      {rt.n}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{rt.cp}</td>
                  <td className="px-4 py-3 text-right">{rt.r}</td>
                  <td className="px-4 py-3 text-center">{rt.ct}</td>
                  <td className="px-4 py-3 text-right"><Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold mb-4">Taxes & Fees</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <div className="font-bold text-sm">Value Added Tax (VAT)</div>
              <div className="text-xs text-muted-foreground">10% • Inclusive • Applies to Room Revenue</div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <div className="font-bold text-sm">City Tax</div>
              <div className="text-xs text-muted-foreground">$2.00 per guest/night • Exclusive • Applies to Guests</div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold">Add Tax/Fee</Button>
        </div>
      </div>
    </div>
  )
}

function SectionLanguage({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Language & Currency</h2>
        <p className="text-sm text-muted-foreground mb-6">Regional settings for your property.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Default UI Language</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Time Zone</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>America/New_York (EST/EDT)</option>
                <option>Europe/London (GMT/BST)</option>
                <option>Asia/Tokyo (JST)</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">Current local time updates automatically.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Currency</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={(e) => {
                if(window.confirm("Existing invoices keep their original currency. Update for new transactions?")) onChange(e)
              }}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Number Preview</label>
              <div className="h-10 flex items-center px-3 font-bold text-foreground border border-transparent bg-muted/50 rounded-md">
                $1,234.50
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Date Format</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Time Format</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>12-hour (1:00 PM)</option>
                <option>24-hour (13:00)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionUsers() {
  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Users & Roles</h2>
            <p className="text-sm text-muted-foreground">Manage team members, departments, and permissions.</p>
          </div>
          <Button>Invite User</Button>
        </div>
        
        <div className="flex gap-4 border-b border-border mb-4">
          <button className="pb-2 border-b-2 border-primary text-primary font-bold text-sm">Users</button>
          <button className="pb-2 border-b-2 border-transparent text-muted-foreground text-sm hover:text-foreground">Roles & Permissions</button>
          <button className="pb-2 border-b-2 border-transparent text-muted-foreground text-sm hover:text-foreground">Departments</button>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Last Login</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody>
                {mockStaff.map((staff, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {staff.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{staff.name}</div>
                          <div className="text-xs text-muted-foreground">{staff.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{staff.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{staff.department}</td>
                    <td className="px-4 py-3">
                      <div className="text-foreground">Oct 1, 2024, 08:30 PM</div>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </td>
                    <td className="px-4 py-3">
                      {staff.status === "Active" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">Suspended</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2"/> Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem><Shield className="w-4 h-4 mr-2"/> Change Role</DropdownMenuItem>
                          <DropdownMenuItem><ShieldAlert className="w-4 h-4 mr-2"/> Require 2FA</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><X className="w-4 h-4 mr-2"/> Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionProfile({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">My Profile</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your personal account settings and security.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-4 border-b border-border pb-6 mb-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl shrink-0">
              JS
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
              <Input defaultValue="John Smith" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Email</label>
              <Input defaultValue="john@thegrandplaza.com" type="email" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="pt-4">
            <h4 className="text-sm font-bold mb-3">Security Settings</h4>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
              <div>
                <div className="font-bold text-sm">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account.</div>
              </div>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionOperations({ onChange }: any) {
  const ToggleRow = ({ title, desc, def = false }: any) => {
    const [on, setOn] = useState(def)
    return (
      <div className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
        <div className="pr-4">
          <div className="font-bold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{desc}</div>
        </div>
        <button 
          onClick={() => { setOn(!on); onChange(); }} 
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${on ? 'bg-primary' : 'bg-input'}`}
        >
          <span className="sr-only">Toggle</span>
          <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Operations</h2>
        <p className="text-sm text-muted-foreground mb-6">Automate routine actions and set module defaults.</p>
        
        <h3 className="font-bold mb-4">Reservations</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Auto-Confirm Online Bookings" desc="Automatically accept reservations from OTAs and website without manual review." def={true} />
          <ToggleRow title="Overbooking Allowance" desc="Allow booking beyond 100% occupancy to compensate for cancellations." def={false} />
        </div>

        <h3 className="font-bold mb-4">Front Desk</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Require ID Verification" desc="Check-in wizard will require an uploaded ID document." def={true} />
          <ToggleRow title="Block Check-out on Unpaid Balance" desc="Prevent check-out in the system if the folio balance is not zero." def={true} />
        </div>

        <h3 className="font-bold mb-4">Housekeeping</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Auto-Dirty on Check-out" desc="Automatically set room status to 'Dirty' when a guest checks out." def={true} />
          <ToggleRow title="Require Inspection" desc="Rooms must be marked 'Inspected' after cleaning before assignment." def={false} />
        </div>
      </div>
    </div>
  )
}

function SectionNotifications({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Notifications</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage system alerts and communication channels.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Notification Rules" description="Set up custom alerts for new bookings, VIP arrivals, and maintenance issues." icon={Bell} />
        </div>
      </div>
    </div>
  )
}

function SectionBranding({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Branding</h2>
        <p className="text-sm text-muted-foreground mb-6">Customize the look and feel of guest-facing documents.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Theme Engine" description="Upload your logo and choose brand colors for invoices and emails." icon={Paintbrush} />
        </div>
      </div>
    </div>
  )
}

function SectionIntegrations() {
  const router = useRouter()
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Integrations</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage third-party connections.</p>
        
        {/* Important Disclaimer as per instructions */}
        <div className="bg-warning/10 border border-warning/30 p-4 rounded-xl mb-6">
          <h4 className="font-bold text-sm text-warning mb-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> E-Signatures Legal Note
          </h4>
          <p className="text-xs text-muted-foreground">
            The legal validity of electronic signatures generated in the Documents module depends entirely on the real third-party provider (e.g., DocuSign, HelloSign) and local jurisdictions. This environment is for demonstration purposes only.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
          <LinkIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-bold text-lg mb-2">Centralized Integration Hub</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            All integrations, API keys, and connection statuses are now managed in the dedicated Integrations module.
          </p>
          <Button onClick={() => router.push('/dashboard/integrations')}>Go to Integrations Module</Button>
        </div>
      </div>
    </div>
  )
}

function SectionSecurity({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Security</h2>
        <p className="text-sm text-muted-foreground mb-6">Enforce global security policies across your tenant.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Security Policies" description="Configure global 2FA requirements, password strength, and session timeouts." icon={Shield} />
        </div>
      </div>
    </div>
  )
}

function SectionPrivacy({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Data & Privacy</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage guest data retention and GDPR compliance.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Data Retention" description="Configure auto-deletion rules for sensitive guest documents and IDs." icon={Database} />
        </div>
      </div>
    </div>
  )
}

function SectionBilling() {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Plan & Billing</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your StayManager subscription.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Current Plan</div>
              <div className="text-2xl font-heading font-bold text-brand-gold flex items-center gap-2">
                Professional <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[10px]">Active</Badge>
              </div>
            </div>
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-bold">Upgrade Plan</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Billing Period</div>
              <div className="font-semibold text-sm">Oct 1, 2024 - Oct 31, 2024</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Payment Method</div>
              <div className="font-semibold text-sm flex items-center justify-between">
                <span>•••• 1234 Visa</span>
                <Button variant="link" className="h-auto p-0 text-primary text-xs">Edit</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

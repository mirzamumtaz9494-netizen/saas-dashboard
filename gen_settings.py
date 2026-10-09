# -*- coding: utf-8 -*-
import os

content = """\"use client\"

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
"""

with open("app/dashboard/settings/page.tsx", "w", encoding="utf-8") as f:
    f.write(content)

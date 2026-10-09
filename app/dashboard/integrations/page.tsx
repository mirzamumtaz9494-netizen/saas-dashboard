"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  Globe, Map, Plane, Home, MapPin, CreditCard, Wallet, Calculator, FileText, 
  MessageSquare, Phone, Mail, Key, Thermometer, Code, Calendar, CheckCircle2, 
  AlertTriangle, XCircle, Clock, Search, RotateCw, PauseCircle, Settings, X, Plus, AlertCircle,
  Lock, MoreVertical
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog, EmptyState } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { mockIntegrations } from "@/lib/mock-data"
import { formatDate } from "@/lib/formatters"
import { formatDistanceToNow, parseISO } from "date-fns"

const iconMap: any = { Globe, Map, Plane, Home, MapPin, CreditCard, Wallet, Calculator, FileText, MessageSquare, Phone, Mail, Key, Thermometer, Code, Calendar }

export default function IntegrationsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "all"
  
  const { role } = useTenant()
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // State for forms/modals
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  
  const [connectWizardOpen, setConnectWizardOpen] = useState(false)
  const [configureDrawerOpen, setConfigureDrawerOpen] = useState(false)
  const [selectedIntegration, setSelectedIntegration] = useState<any>(null)
  
  const [isSyncing, setIsSyncing] = useState(false)
  const [disconnectConfirm, setDisconnectConfirm] = useState(false)

  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
    
    const connectId = searchParams?.get("connect")
    const configId = searchParams?.get("configure")
    if (connectId) {
      const target = mockIntegrations.find(i => i.id === connectId)
      if (target) openConnect(target)
    } else if (configId) {
      const target = mockIntegrations.find(i => i.id === configId)
      if (target) openConfigure(target)
    }
  }, [tabParam, searchParams])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  const openConnect = (int: any) => {
    setSelectedIntegration(int)
    setConnectWizardOpen(true)
    router.push(`${pathname}?tab=${activeTab}&connect=${int.id}`)
  }
  
  const openConfigure = (int: any) => {
    setSelectedIntegration(int)
    setConfigureDrawerOpen(true)
    router.push(`${pathname}?tab=${activeTab}&configure=${int.id}`)
  }

  const closeDrawers = () => {
    setConnectWizardOpen(false)
    setConfigureDrawerOpen(false)
    setSelectedIntegration(null)
    router.push(`${pathname}?tab=${activeTab}`)
  }
  
  const handleSyncAll = () => {
    setIsSyncing(true)
    setTimeout(() => setIsSyncing(false), 2000)
  }

  if (!mounted) return null

  if (role === "Housekeeping") {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState title="Access Denied" description="You do not have permission to view Integrations." icon={Lock} />
      </div>
    )
  }

  const filtered = mockIntegrations.filter((i:any) => {
    if (activeTab !== "all" && i.category.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-') !== activeTab) return false
    if (statusFilter !== "All") {
      if (statusFilter === "Needs attention" && (i.status !== "Warning" && i.status !== "Error")) return false
      if (statusFilter !== "Needs attention" && i.status !== statusFilter) return false
    }
    if (searchQuery && !i.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  // Group by category
  const grouped = filtered.reduce((acc: any, curr: any) => {
    if (!acc[curr.category]) acc[curr.category] = []
    acc[curr.category].push(curr)
    return acc
  }, {})

  // Health Stats
  const connectedCount = mockIntegrations.filter(i => i.status === "Connected").length
  const attentionCount = mockIntegrations.filter(i => i.status === "Warning" || i.status === "Error").length
  const notConnectedCount = mockIntegrations.filter(i => i.status === "Not connected").length

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Integrations
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Integrations</h1>
          <p className="text-sm text-muted-foreground mt-1">Connect with OTAs, payment gateways, accounting software, and more.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 bg-card"><Plus className="w-4 h-4 mr-2" /> Request integration</Button>
            <Button variant="outline" className="h-9 bg-card"><FileText className="w-4 h-4 mr-2" /> Sync log</Button>
            <Button variant="default" className="h-9 bg-primary text-primary-foreground font-bold" onClick={handleSyncAll} disabled={isSyncing}>
              <RotateCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} /> Sync all
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50 overflow-x-auto w-full md:w-auto scrollbar-hide">
            {[
              { id: "all", label: "All" },
              { id: "channels", label: "Channels" },
              { id: "payments", label: "Payments" },
              { id: "accounting", label: "Accounting" },
              { id: "messaging", label: "Messaging" },
              { id: "access-iot", label: "Access & IoT" },
              { id: "developer", label: "Developer" }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setTab(tab.id)} 
                className={`pb-2 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto pt-4 pb-12 relative">
        
        {/* Health Strip */}
        <div className="flex flex-wrap gap-4 mb-6 cursor-pointer">
          <div className="bg-success/10 border border-success/30 px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-success/20 transition-colors" onClick={() => setStatusFilter("Connected")}>
            <CheckCircle2 className="w-4 h-4 text-success" /> <span className="font-semibold text-success">{connectedCount} Connected</span>
          </div>
          <div className="bg-destructive/10 border border-destructive/30 px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-destructive/20 transition-colors" onClick={() => setStatusFilter("Needs attention")}>
            <AlertCircle className="w-4 h-4 text-destructive" /> <span className="font-semibold text-destructive">{attentionCount} Needs attention</span>
          </div>
          <div className="bg-muted border border-border px-3 py-2 rounded-lg text-sm flex items-center gap-2 hover:bg-muted/70 transition-colors" onClick={() => setStatusFilter("Not connected")}>
            <div className="w-2 h-2 rounded-full bg-muted-foreground" /> <span className="font-semibold text-muted-foreground">{notConnectedCount} Not connected</span>
          </div>
          <div className="text-xs text-muted-foreground ml-auto flex items-center">
            Last global sync: 5 mins ago
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search integrations..." className="pl-9 h-8 text-xs bg-card" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <select className="h-8 text-xs bg-card border border-border rounded-md px-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Connected">Connected</option>
            <option value="Needs attention">Needs attention</option>
            <option value="Not connected">Not connected</option>
            <option value="Paused">Paused</option>
            <option value="Coming soon">Coming soon</option>
          </select>
        </div>

        {/* Grid by Category */}
        <div className="space-y-8">
          {Object.keys(grouped).map(cat => (
            <div key={cat} className="space-y-4">
              <h2 className="text-lg font-bold border-b border-border pb-2">{cat} <span className="text-muted-foreground text-sm font-normal ml-2">({grouped[cat].length})</span></h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 auto-rows-fr">
                {grouped[cat].map((int: any) => {
                  const Icon = iconMap[int.icon] || Globe
                  
                  return (
                    <div key={int.id} className="bg-card border border-border rounded-xl p-4 flex flex-col hover:border-primary/40 transition-colors shadow-sm group">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                            <Icon className="w-5 h-5 text-foreground" />
                          </div>
                          <div>
                            <h3 className="font-bold">{int.name}</h3>
                            <div className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{int.description}</div>
                          </div>
                        </div>
                      </div>

                      <div className="mb-3">
                        <StatusBadge status={int.status} />
                      </div>

                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {int.capabilities.map((c: string) => (
                          <Badge key={c} variant="secondary" className="text-[9px] bg-muted/50">{c}</Badge>
                        ))}
                      </div>

                      {int.warning && (
                        <div className="mt-auto mb-3 text-[10px] font-semibold text-warning flex items-start gap-1">
                          <AlertTriangle className="w-3 h-3 shrink-0" /> {int.warning}
                        </div>
                      )}
                      {!int.warning && <div className="mt-auto mb-3" />}

                      <div className="pt-3 border-t border-border flex items-center justify-between">
                        {int.lastSync ? (
                          <div className="text-[10px] text-muted-foreground flex items-center gap-1" title={formatDate(int.lastSync)}>
                            <Clock className="w-3 h-3" /> Sync {formatDistanceToNow(parseISO(int.lastSync), {addSuffix: true})}
                          </div>
                        ) : (
                          <div className="text-[10px] text-muted-foreground">-</div>
                        )}
                        
                        <div className="flex items-center gap-1">
                          {int.status === 'Not connected' && <Button size="sm" className="h-7 text-xs font-bold" onClick={() => openConnect(int)}>Connect</Button>}
                          {(int.status === 'Connected' || int.status === 'Warning') && (
                            <>
                              <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => openConfigure(int)}>Configure</Button>
                              <ActionMenu int={int} onConfigure={() => openConfigure(int)} onDisconnect={() => { setSelectedIntegration(int); setDisconnectConfirm(true); }} />
                            </>
                          )}
                          {int.status === 'Error' && (
                            <>
                              <Button variant="outline" size="sm" className="h-7 text-xs border-destructive text-destructive hover:bg-destructive/10" onClick={() => openConfigure(int)}>Fix issue</Button>
                              <ActionMenu int={int} onConfigure={() => openConfigure(int)} onDisconnect={() => { setSelectedIntegration(int); setDisconnectConfirm(true); }} />
                            </>
                          )}
                          {int.status === 'Paused' && <Button variant="outline" size="sm" className="h-7 text-xs">Resume</Button>}
                          {int.status === 'Coming soon' && <Button variant="ghost" size="sm" className="h-7 text-xs" disabled>Notify me</Button>}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          {filtered.length === 0 && (
            <EmptyState title="No integrations found" description="Adjust your filters or search query." icon={Globe} />
          )}
        </div>
      </div>

      {/* Connect Wizard Drawer */}
      <Drawer open={connectWizardOpen} onClose={closeDrawers} title={`Connect ${selectedIntegration?.name}`}>
        <div className="space-y-6">
          <div className="bg-muted p-4 rounded-lg text-sm mb-4">
            <h3 className="font-bold mb-1">Authorization required</h3>
            <p className="text-muted-foreground">You will need your API key or OAuth credentials from {selectedIntegration?.name} to proceed.</p>
          </div>
          <div className="space-y-4">
            {/* NOTE FOR FUTURE IMPLEMENTATION:
                Real OAuth flow, token refresh handling, webhook signature verification,
                and secure secret storage must happen server-side.
                Do not store raw credentials in client state or local storage. */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">API Key</label>
              <Input type="password" placeholder="sk_test_..." className="bg-background" />
            </div>
            <div className="pt-4 border-t border-border flex justify-end gap-2">
              <Button variant="outline" onClick={closeDrawers}>Cancel</Button>
              <Button>Connect & Authorize</Button>
            </div>
          </div>
        </div>
      </Drawer>

      {/* Configure Drawer */}
      <Drawer open={configureDrawerOpen} onClose={closeDrawers} title={`${selectedIntegration?.name} Configuration`}>
        {selectedIntegration && (
          <div className="space-y-6">
            <div className="flex gap-4 border-b border-border">
              {['Overview', 'Settings', 'Mapping', 'Activity'].map(t => (
                <button key={t} className={`pb-2 text-sm font-medium border-b-2 ${t === 'Overview' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground'}`}>{t}</button>
              ))}
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Status</div>
                <div className="mt-1"><StatusBadge status={selectedIntegration.status} /></div>
              </div>
              <div className="bg-card border border-border p-3 rounded-lg">
                <div className="text-xs text-muted-foreground">Connected Account</div>
                <div className="font-bold mt-1 text-sm">The Grand Hotel (ID: 10092)</div>
              </div>
            </div>

            {selectedIntegration.category === "Payments" && (
              <div className="bg-warning/10 border border-warning/30 p-3 rounded-lg flex items-center gap-2 text-warning font-bold text-sm">
                <AlertTriangle className="w-4 h-4" /> TEST MODE ACTIVE
              </div>
            )}

            <div className="space-y-4">
              <h3 className="font-bold text-sm uppercase text-muted-foreground">Sync Settings</h3>
              {selectedIntegration.capabilities.map((c: string) => (
                <div key={c} className="flex items-center justify-between p-3 border border-border rounded-lg bg-card">
                  <div>
                    <div className="font-bold text-sm">{c} Sync</div>
                    <div className="text-xs text-muted-foreground">Enable or disable this capability.</div>
                  </div>
                  <input type="checkbox" className="accent-primary w-4 h-4" defaultChecked />
                </div>
              ))}
            </div>
          </div>
        )}
      </Drawer>

      <ConfirmDialog 
        open={disconnectConfirm} 
        onClose={() => setDisconnectConfirm(false)}
        title={`Disconnect ${selectedIntegration?.name}?`}
        description={`Rates and availability will stop syncing. Existing records are kept in the PMS. This action will be logged.`}
        confirmText="Disconnect"
        variant="destructive"
        onConfirm={() => {
          setDisconnectConfirm(false)
          closeDrawers()
        }}
      />
    </div>
  )
}

function StatusBadge({ status }: { status: string }) {
  if (status === 'Connected') return <Badge variant="outline" className="bg-success/10 text-success border-success/30 text-[10px]"><CheckCircle2 className="w-3 h-3 mr-1"/> Connected</Badge>
  if (status === 'Warning') return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30 text-[10px]"><AlertTriangle className="w-3 h-3 mr-1"/> Warning</Badge>
  if (status === 'Error') return <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/30 text-[10px]"><XCircle className="w-3 h-3 mr-1"/> Error</Badge>
  if (status === 'Paused') return <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px]"><PauseCircle className="w-3 h-3 mr-1"/> Paused</Badge>
  if (status === 'Not connected') return <Badge variant="outline" className="bg-muted text-muted-foreground border-border text-[10px]"><div className="w-1.5 h-1.5 rounded-full bg-muted-foreground mr-1.5"/> Not connected</Badge>
  if (status === 'Coming soon') return <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-transparent text-[10px]">Coming soon</Badge>
  return null
}

function ActionMenu({ int, onConfigure, onDisconnect }: { int: any, onConfigure: () => void, onDisconnect: () => void }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem><RotateCw className="w-4 h-4 mr-2" /> Sync now</DropdownMenuItem>
        <DropdownMenuItem onClick={onConfigure}><Settings className="w-4 h-4 mr-2" /> Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem><PauseCircle className="w-4 h-4 mr-2" /> Pause sync</DropdownMenuItem>
        <DropdownMenuItem className="text-destructive focus:text-destructive focus:bg-destructive/10" onClick={onDisconnect}><X className="w-4 h-4 mr-2" /> Disconnect</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

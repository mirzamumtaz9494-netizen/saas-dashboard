"use client"

import { useState, useEffect, useMemo } from "react"
import { 
  FileText, CreditCard, Receipt, Undo2, Plus, Download, 
  Search, Filter, Calendar as CalendarIcon, CheckCircle2, 
  AlertTriangle, MoreVertical, Eye, Mail, Lock, CheckSquare, 
  X, AlertCircle, ArrowUpRight, ArrowDownRight, Printer, Copy
} from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"
import { Drawer, Modal, ConfirmDialog, EmptyState } from "@/components/ui/Feedback"
import { 
  DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, 
  DropdownMenuItem, DropdownMenuSeparator 
} from "@/components/ui/DropdownMenu"
import { 
  mockInvoices, mockPayments, mockRefunds, mockFolios,
  mockGuests, mockReservations
} from "@/lib/mock-data"
import { formatDate, formatCurrency } from "@/lib/formatters"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useTenant } from "@/providers/TenantProvider"
import { 
  isBefore, isAfter, subDays, startOfDay, endOfDay, parseISO, isSameDay, format
} from "date-fns"

export default function BillingPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const tabParam = searchParams?.get("tab") || "invoices"
  const invoiceParam = searchParams?.get("invoice")
  
  const { role, tenant } = useTenant()

  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState(tabParam)
  
  // Modals & Drawers
  const [invoiceDrawerOpen, setInvoiceDrawerOpen] = useState(false)
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null)
  const [recordPaymentOpen, setRecordPaymentOpen] = useState(false)
  
  // Filters
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("All")
  
  useEffect(() => {
    setMounted(true)
    if (tabParam) setActiveTab(tabParam)
    if (invoiceParam) {
      const inv = mockInvoices.find(i => i.id === invoiceParam)
      if (inv) {
        setSelectedInvoice(inv)
        setInvoiceDrawerOpen(true)
      }
    }
  }, [tabParam, invoiceParam])

  const setTab = (tab: string) => {
    setActiveTab(tab)
    router.replace(`${pathname}?tab=${tab}`)
  }

  const openInvoice = (inv: any) => {
    setSelectedInvoice(inv)
    setInvoiceDrawerOpen(true)
    router.push(`${pathname}?tab=${activeTab}&invoice=${inv.id}`)
  }
  
  const closeInvoice = () => {
    setInvoiceDrawerOpen(false)
    setSelectedInvoice(null)
    router.push(`${pathname}?tab=${activeTab}`)
  }

  if (!mounted) return null

  if (role === "Housekeeping") {
    return (
      <div className="flex h-full items-center justify-center">
        <EmptyState title="Access Denied" description="You do not have permission to view Billing & Invoices." icon={Lock} />
      </div>
    )
  }

  return (
    <div className="flex flex-col h-full overflow-hidden">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border shrink-0">
        <div>
          <div className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
            Dashboard <span className="text-border">/</span> Billing & Invoices
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Billing & Invoices</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage invoices, payments, folios, and refunds.</p>
        </div>
        <div className="flex flex-col items-end gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <Button variant="outline" className="h-9 bg-card"><Download className="w-4 h-4 mr-2" /> Export</Button>
            <Button variant="outline" className="h-9 bg-card" disabled><CheckSquare className="w-4 h-4 mr-2" /> Bulk Payment</Button>
            <Button variant="outline" className="h-9 bg-card" onClick={() => setRecordPaymentOpen(true)}><CreditCard className="w-4 h-4 mr-2" /> Record Payment</Button>
            <Button variant="default" className="h-9 bg-primary text-primary-foreground">
              <Plus className="w-4 h-4 mr-2" /> Create Invoice
            </Button>
          </div>
          
          <div className="flex gap-4 border-b border-border/50">
            {[
              { id: "invoices", label: "Invoices" },
              { id: "payments", label: "Payments" },
              { id: "folios", label: "Folios" },
              { id: "refunds", label: "Refunds" }
            ].map(tab => (
              <button 
                key={tab.id} 
                onClick={() => setTab(tab.id)} 
                className={`pb-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden relative pt-4">
        {activeTab === "invoices" && (
          <InvoicesTab 
            openInvoice={openInvoice} 
            searchQuery={searchQuery} setSearchQuery={setSearchQuery}
            statusFilter={statusFilter} setStatusFilter={setStatusFilter}
          />
        )}
        {activeTab === "payments" && <PaymentsTab />}
        {activeTab === "folios" && <FoliosTab />}
        {activeTab === "refunds" && <RefundsTab />}
      </div>
      
      {/* Invoice Drawer */}
      <Drawer open={invoiceDrawerOpen} onClose={closeInvoice} title={`Invoice ${selectedInvoice?.id || ''}`}>
        {selectedInvoice && <InvoiceDetails inv={selectedInvoice} />}
      </Drawer>
      
      {/* Record Payment Modal */}
      <Modal open={recordPaymentOpen} onClose={() => setRecordPaymentOpen(false)} title="Record Payment">
        <form className="space-y-4" onSubmit={e => { e.preventDefault(); setRecordPaymentOpen(false) }}>
          <div className="space-y-2">
            <label className="text-sm font-bold">Invoice or Folio ID</label>
            <Input placeholder="e.g. INV-3092" className="bg-background" required />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold">Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-muted-foreground">$</span>
                <Input type="number" step="0.01" className="pl-6 bg-background" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold">Payment Method</label>
              <select className="w-full h-10 border border-border rounded-md px-3 bg-background text-sm">
                <option>Credit Card (Stripe)</option>
                <option>Cash</option>
                <option>Bank Transfer</option>
                <option>OTA Virtual Card</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-bold">Reference (Optional)</label>
            <Input placeholder="Transaction ID or notes" className="bg-background" />
          </div>
          <div className="pt-4 flex justify-end gap-2 border-t border-border mt-4">
            <Button variant="outline" type="button" onClick={() => setRecordPaymentOpen(false)}>Cancel</Button>
            <Button type="submit">Record Payment</Button>
          </div>
        </form>
      </Modal>

    </div>
  )
}

// INVOICES TAB
function InvoicesTab({ openInvoice, searchQuery, setSearchQuery, statusFilter, setStatusFilter }: any) {
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  
  // Computed Status helper
  const getComputedStatus = (inv: any) => {
    const isOverdue = inv.balance > 0 && isBefore(parseISO(inv.dueDate), startOfDay(new Date()))
    if (inv.status === "Void" || inv.status === "Refunded") return inv.status
    if (inv.balance === 0) return "Paid"
    if (isOverdue) return "Overdue"
    if (inv.paid > 0 && inv.balance > 0) return "Partially Paid"
    return inv.status
  }

  // KPIs
  const kpis = useMemo(() => {
    let rev = 0; let outBalance = 0; let overdue = 0; let refunds = 0; let paidCount = 0; let overdueCount = 0;
    
    mockPayments.forEach((p:any) => { if (p.status === "Completed") rev += p.amount })
    mockRefunds.forEach((r:any) => { if (r.status === "Processed") refunds += r.amount })
    
    mockInvoices.forEach((i:any) => {
      const compStatus = getComputedStatus(i)
      if (i.balance > 0 && compStatus !== "Void") outBalance += i.balance
      if (compStatus === "Overdue") {
        overdue += i.balance
        overdueCount++
      }
      if (compStatus === "Paid") paidCount++
    })
    
    return { rev, outBalance, overdue, overdueCount, refunds, paidCount }
  }, [])

  // Filtering
  const filtered = mockInvoices.filter((i:any) => {
    const compStatus = getComputedStatus(i)
    if (statusFilter !== "All" && compStatus !== statusFilter) return false
    
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const guest = mockGuests.find((g:any) => g.id === i.guestId)
      if (
        !i.id.toLowerCase().includes(q) &&
        !i.bookingId?.toLowerCase().includes(q) &&
        !(guest && guest.name.toLowerCase().includes(q))
      ) {
        return false
      }
    }
    return true
  })

  // Table Totals
  const tableTotals = filtered.reduce((acc:any, i:any) => {
    if (getComputedStatus(i) !== "Void") {
      acc.amount += i.amount
      acc.paid += i.paid
      acc.balance += i.balance
    }
    return acc
  }, { amount: 0, paid: 0, balance: 0 })

  const toggleRow = (id: string) => {
    const next = new Set(selectedRows)
    if (next.has(id)) next.delete(id)
    else next.add(id)
    setSelectedRows(next)
  }
  
  const toggleAll = () => {
    if (selectedRows.size === filtered.length) setSelectedRows(new Set())
    else setSelectedRows(new Set(filtered.map((i:any) => i.id)))
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center justify-between shrink-0">
        <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-lg">
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold">Today</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold bg-muted">Last 30 Days</Button>
          <Button variant="ghost" size="sm" className="h-7 text-xs font-semibold">This Month</Button>
          <div className="w-px h-4 bg-border mx-1" />
          <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground"><CalendarIcon className="w-3.5 h-3.5 mr-1.5"/> Custom</Button>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="absolute left-2.5 top-2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Inv #, Guest, Reservation ID" className="pl-9 h-8 text-xs bg-card" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <select className="h-8 text-xs bg-card border border-border rounded-md px-2" value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
            <option value="Partially Paid">Partially Paid</option>
          </select>
          <Button variant="outline" size="sm" className="h-8"><Filter className="w-3.5 h-3.5 mr-1.5"/> More Filters</Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 shrink-0">
        <KpiCard title="Total Revenue" amount={kpis.rev} subtext="Past 30 Days" trend="up" />
        <KpiCard title="Outstanding Balances" amount={kpis.outBalance} subtext="Across all open invoices" trend="down" />
        <KpiCard title="Overdue" amount={kpis.overdue} subtext={`${kpis.overdueCount} overdue invoices`} trend="up" isAlert onClick={() => setStatusFilter("Overdue")} />
        <KpiCard title="Paid Invoices" value={kpis.paidCount.toString()} subtext="Successfully processed" trend="up" />
      </div>

      {/* Table */}
      <div className="flex-1 bg-card border border-border rounded-xl shadow-sm flex flex-col overflow-hidden relative">
        <div className="overflow-auto flex-1">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0 z-10">
              <tr>
                <th className="px-4 py-3 w-10"><input type="checkbox" className="accent-primary" checked={selectedRows.size === filtered.length && filtered.length > 0} onChange={toggleAll} /></th>
                <th className="px-4 py-3 font-medium">Invoice #</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium">Guest / Folio</th>
                <th className="px-4 py-3 font-medium">Reservation</th>
                <th className="px-4 py-3 font-medium">Issue Date</th>
                <th className="px-4 py-3 font-medium text-right">Amount</th>
                <th className="px-4 py-3 font-medium text-right">Balance</th>
                <th className="px-4 py-3 font-medium text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((inv: any) => {
                const compStatus = getComputedStatus(inv)
                const guest = mockGuests.find((g:any) => g.id === inv.guestId)
                const isOverdue = compStatus === "Overdue"
                
                return (
                  <tr key={inv.id} className="border-b border-border hover:bg-muted/20 transition-colors">
                    <td className="px-4 py-3"><input type="checkbox" className="accent-primary" checked={selectedRows.has(inv.id)} onChange={() => toggleRow(inv.id)} /></td>
                    <td className="px-4 py-3">
                      <Button variant="link" className="p-0 h-auto font-bold" onClick={() => openInvoice(inv)}>{inv.id}</Button>
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="outline" className={`
                        font-bold
                        ${compStatus === 'Paid' ? 'bg-success/10 text-success border-success/30' : ''}
                        ${compStatus === 'Pending' ? 'bg-warning/10 text-warning border-warning/30' : ''}
                        ${compStatus === 'Partially Paid' ? 'bg-primary/10 text-primary border-primary/30' : ''}
                        ${isOverdue ? 'bg-destructive/10 text-destructive border-destructive/30' : ''}
                        ${compStatus === 'Refunded' || compStatus === 'Void' ? 'bg-muted text-muted-foreground' : ''}
                      `}>
                        {isOverdue && <AlertTriangle className="w-3 h-3 mr-1" />}
                        {compStatus === 'Paid' && <CheckCircle2 className="w-3 h-3 mr-1" />}
                        {compStatus}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold">{guest?.name || "Walk-in"}</div>
                      <div className="text-[10px] text-muted-foreground">{inv.roomId ? `Room ${inv.roomId.replace('R-','')}` : inv.folioId}</div>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{inv.bookingId || "-"}</td>
                    <td className="px-4 py-3">
                      <div>{formatDate(inv.issueDate)}</div>
                      {isOverdue && <div className="text-[10px] text-destructive font-bold">Due: {formatDate(inv.dueDate)}</div>}
                    </td>
                    <td className="px-4 py-3 text-right font-medium">{formatCurrency(inv.amount)}</td>
                    <td className="px-4 py-3 text-right font-bold">{inv.balance > 0 ? formatCurrency(inv.balance) : "-"}</td>
                    <td className="px-4 py-3 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary" onClick={() => openInvoice(inv)}><Eye className="w-4 h-4"/></Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-muted-foreground hover:text-primary"><Download className="w-4 h-4"/></Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4"/></Button></DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            {inv.balance > 0 && <DropdownMenuItem>Record Payment</DropdownMenuItem>}
                            {(compStatus === 'Pending' || isOverdue) && <DropdownMenuItem>Send Reminder</DropdownMenuItem>}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Open Booking</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Void Invoice</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8">
                    <EmptyState title="No invoices found" description="Adjust your filters or search query." icon={FileText} />
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Table Footer Totals */}
        <div className="bg-muted/30 border-t border-border p-3 text-xs font-semibold flex items-center justify-between shrink-0">
          <div className="text-muted-foreground">{filtered.length} invoices</div>
          <div className="flex gap-6">
            <div>Total Invoiced: <span className="text-foreground">{formatCurrency(tableTotals.amount)}</span></div>
            <div>Total Paid: <span className="text-success">{formatCurrency(tableTotals.paid)}</span></div>
            <div>Balance: <span className={tableTotals.balance > 0 ? "text-warning" : "text-foreground"}>{formatCurrency(tableTotals.balance)}</span></div>
          </div>
        </div>
      </div>

    </div>
  )
}

function KpiCard({ title, amount, value, subtext, trend, isAlert, onClick }: any) {
  return (
    <div 
      className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${onClick ? 'cursor-pointer hover:shadow-md' : ''} ${isAlert ? 'bg-destructive/5 border-destructive/20 hover:border-destructive/40' : 'bg-card border-border hover:border-primary/40'}`}
      onClick={onClick}
    >
      <div className="text-sm font-semibold text-muted-foreground mb-2">{title}</div>
      <div className={`text-2xl font-bold font-heading ${isAlert ? 'text-destructive' : 'text-foreground'}`}>
        {amount !== undefined ? formatCurrency(amount) : value}
      </div>
      <div className="flex justify-between items-end mt-2">
        <div className="text-[10px] text-muted-foreground">{subtext}</div>
        {trend && (
          <div className={`flex items-center text-[10px] font-bold ${trend === 'up' ? 'text-success' : 'text-destructive'}`}>
            {trend === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
            {Math.floor(Math.random() * 10) + 1}%
          </div>
        )}
      </div>
    </div>
  )
}

// INVOICE DRAWER CONTENT
function InvoiceDetails({ inv }: { inv: any }) {
  const guest = mockGuests.find((g:any) => g.id === inv.guestId)
  
  return (
    <div className="space-y-6">
      {/* Drawer Header Actions */}
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
        {inv.balance > 0 && <Button size="sm"><CreditCard className="w-4 h-4 mr-2"/> Record Payment</Button>}
        <Button size="sm" variant="outline"><Mail className="w-4 h-4 mr-2"/> Send</Button>
        <Button size="sm" variant="outline"><Download className="w-4 h-4 mr-2"/> PDF</Button>
        <Button size="sm" variant="outline"><Printer className="w-4 h-4 mr-2"/> Print</Button>
      </div>
      
      {/* Invoice Meta */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 bg-muted/20 p-4 rounded-lg border border-border">
        <div>
          <div className="text-xs text-muted-foreground">Status</div>
          <Badge variant="outline" className="mt-1 font-bold">{inv.status}</Badge>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Issue Date</div>
          <div className="font-semibold text-sm mt-1">{formatDate(inv.issueDate)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Due Date</div>
          <div className="font-semibold text-sm mt-1">{formatDate(inv.dueDate)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Reservation</div>
          <div className="font-semibold text-sm mt-1 text-primary cursor-pointer hover:underline">{inv.bookingId}</div>
        </div>
      </div>
      
      {/* Bill To */}
      <div>
        <h3 className="font-bold text-sm uppercase text-muted-foreground mb-2">Bill To</h3>
        <div className="font-bold">{guest?.name || "Walk-in Guest"}</div>
        <div className="text-sm text-muted-foreground">{guest?.email}</div>
        {guest?.phone && <div className="text-sm text-muted-foreground">{guest.phone}</div>}
      </div>

      {/* Line Items */}
      <div>
        <h3 className="font-bold text-sm uppercase text-muted-foreground mb-2">Line Items</h3>
        <div className="border border-border rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-muted-foreground text-xs">
              <tr>
                <th className="px-3 py-2 text-left font-medium">Description</th>
                <th className="px-3 py-2 text-right font-medium">Amount</th>
                <th className="px-3 py-2 text-right font-medium">Tax</th>
                <th className="px-3 py-2 text-right font-medium">Total</th>
              </tr>
            </thead>
            <tbody>
              {inv.lineItems.map((li: any) => (
                <tr key={li.id} className="border-t border-border">
                  <td className="px-3 py-2">{li.description}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(li.amount - li.taxes)}</td>
                  <td className="px-3 py-2 text-right">{formatCurrency(li.taxes)}</td>
                  <td className="px-3 py-2 text-right font-semibold">{formatCurrency(li.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals */}
      <div className="flex justify-end">
        <div className="w-64 space-y-2 text-sm">
          <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span> <span>{formatCurrency(inv.amount - inv.lineItems.reduce((acc:any,li:any)=>acc+li.taxes,0))}</span></div>
          <div className="flex justify-between"><span className="text-muted-foreground">Taxes</span> <span>{formatCurrency(inv.lineItems.reduce((acc:any,li:any)=>acc+li.taxes,0))}</span></div>
          <div className="flex justify-between font-bold border-t border-border pt-2 text-base"><span>Total</span> <span>{formatCurrency(inv.amount)}</span></div>
          <div className="flex justify-between text-success"><span className="text-muted-foreground">Paid</span> <span>-{formatCurrency(inv.paid)}</span></div>
          <div className="flex justify-between font-bold border-t border-border pt-2 text-lg">
            <span>Balance Due</span> 
            <span className={inv.balance > 0 ? "text-destructive" : ""}>{formatCurrency(inv.balance)}</span>
          </div>
        </div>
      </div>

      {/* Activity Log */}
      <div className="pt-6 border-t border-border">
        <h3 className="font-bold text-sm uppercase text-muted-foreground mb-4">Activity Log</h3>
        <div className="space-y-3">
          {inv.activity.map((act: any, i: number) => (
            <div key={i} className="flex gap-3 text-sm">
              <div className="w-2 h-2 rounded-full bg-border mt-1.5 shrink-0" />
              <div>
                <div className="font-semibold">{act.action} <span className="font-normal text-muted-foreground mx-1">by</span> {act.user}</div>
                <div className="text-[10px] text-muted-foreground">{formatDate(act.time)} at {format(parseISO(act.time), "h:mm a")}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function PaymentsTab() {
  return (
    <div className="h-full flex flex-col pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Payments Ledger</h2>
          <p className="text-sm text-muted-foreground">Record of all incoming payments and deposits.</p>
        </div>
        <Button variant="outline" size="sm"><Download className="w-4 h-4 mr-2"/> Export CSV</Button>
      </div>
      
      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Invoice / Ref</th>
              <th className="px-4 py-3 font-medium">Method</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
              <th className="px-4 py-3 font-medium text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {mockPayments.map((p: any) => (
              <tr key={p.id} className="border-b border-border hover:bg-muted/20">
                <td className="px-4 py-3">{formatDate(p.date)}</td>
                <td className="px-4 py-3">
                  <div className="font-bold text-primary cursor-pointer hover:underline">{p.invoiceId}</div>
                  <div className="text-[10px] text-muted-foreground">{p.reference}</div>
                </td>
                <td className="px-4 py-3">{p.method}</td>
                <td className="px-4 py-3 text-right font-bold text-success">{formatCurrency(p.amount)}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/30">{p.status}</Badge>
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">Receipt</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function FoliosTab() {
  return (
    <div className="h-full flex flex-col pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Folios</h2>
          <p className="text-sm text-muted-foreground">Manage ongoing guest room charges before invoicing.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Folio ID</th>
              <th className="px-4 py-3 font-medium">Reservation</th>
              <th className="px-4 py-3 font-medium">Guest</th>
              <th className="px-4 py-3 font-medium text-right">Charges</th>
              <th className="px-4 py-3 font-medium text-right">Payments</th>
              <th className="px-4 py-3 font-medium text-right">Balance</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockFolios.map((f: any) => {
              const guest = mockGuests.find((g:any) => g.id === f.guestId)
              return (
                <tr key={f.id} className="border-b border-border hover:bg-muted/20">
                  <td className="px-4 py-3 font-bold">{f.id}</td>
                  <td className="px-4 py-3 text-primary cursor-pointer hover:underline">{f.bookingId}</td>
                  <td className="px-4 py-3">{guest?.name}</td>
                  <td className="px-4 py-3 text-right text-muted-foreground">{formatCurrency(f.charges)}</td>
                  <td className="px-4 py-3 text-right text-success">{formatCurrency(f.payments)}</td>
                  <td className="px-4 py-3 text-right font-bold">{formatCurrency(f.balance)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant="outline" className={f.status === 'Open' ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'}>{f.status}</Badge>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RefundsTab() {
  return (
    <div className="h-full flex flex-col pt-4 space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-bold">Refunds</h2>
          <p className="text-sm text-muted-foreground">Track and approve returned payments.</p>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-card border border-border rounded-xl shadow-sm">
        <table className="w-full text-sm text-left">
          <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border sticky top-0">
            <tr>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Invoice</th>
              <th className="px-4 py-3 font-medium text-right">Amount</th>
              <th className="px-4 py-3 font-medium">Reason</th>
              <th className="px-4 py-3 font-medium text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {mockRefunds.map((r: any) => (
              <tr key={r.id} className="border-b border-border hover:bg-muted/20">
                <td className="px-4 py-3">{formatDate(r.date)}</td>
                <td className="px-4 py-3 font-bold text-primary cursor-pointer hover:underline">{r.invoiceId}</td>
                <td className="px-4 py-3 text-right font-bold text-destructive">-{formatCurrency(r.amount)}</td>
                <td className="px-4 py-3 text-muted-foreground">{r.reason}</td>
                <td className="px-4 py-3 text-center">
                  <Badge variant="outline" className="bg-muted text-muted-foreground">{r.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

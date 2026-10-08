import { Search, Filter, Download, ArrowUpRight, ArrowDownRight, CreditCard } from "lucide-react"

import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Badge } from "@/components/ui/Badge"

const transactions = [
  { id: "TXN-9081", guest: "Alice Smith", property: "Grand Plaza Hotel", type: "Room Charge", method: "Visa •••• 4242", amount: "$840.00", date: "Oct 12, 14:02", status: "Paid" },
  { id: "TXN-9082", guest: "Bob Jones", property: "Grand Plaza Hotel", type: "Room Service", method: "Room Folio", amount: "$45.50", date: "Oct 12, 19:45", status: "Pending" },
  { id: "TXN-9083", guest: "Charlie Brown", property: "V Resort & Spa", type: "Refund", method: "Mastercard •••• 1121", amount: "-$120.00", date: "Oct 11, 09:15", status: "Refunded" },
  { id: "TXN-9084", guest: "Diana Prince", property: "V Beach Resort", type: "Deposit", method: "Amex •••• 8432", amount: "$500.00", date: "Oct 10, 16:30", status: "Paid" },
  { id: "TXN-9085", guest: "Evan Wright", property: "Grand Plaza Hotel", type: "Spa Service", method: "Room Folio", amount: "$150.00", date: "Oct 10, 11:20", status: "Failed" },
]

function getTxnBadge(status: string) {
  switch(status) {
    case 'Paid': return <Badge variant="softSuccess">Paid</Badge>
    case 'Pending': return <Badge variant="softWarning">Pending</Badge>
    case 'Refunded': return <Badge variant="softDefault">Refunded</Badge>
    case 'Failed': return <Badge variant="softError">Failed</Badge>
    default: return <Badge variant="outline">{status}</Badge>
  }
}

export default function TransactionsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Transactions</h1>
          <p className="text-muted-foreground mt-1 text-sm">Manage payments, refunds, and financial ledgers.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" className="h-9 bg-background"><Filter className="h-4 w-4 mr-2" /> Filter</Button>
          <Button className="h-9"><Download className="h-4 w-4 mr-2" /> Export CSV</Button>
        </div>
      </div>

      {/* KPI Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: "$48,240.00", sub: "Today", icon: ArrowUpRight, color: "text-success" },
          { label: "Processed Payments", value: "142", sub: "Today", icon: CreditCard, color: "text-primary" },
          { label: "Refunds", value: "$420.00", sub: "Today", icon: ArrowDownRight, color: "text-muted-foreground" },
          { label: "Pending", value: "$1,840.00", sub: "Awaiting settlement", icon: CreditCard, color: "text-warning" },
        ].map((kpi, i) => (
          <div key={i} className="p-4 bg-card rounded-xl border border-border flex flex-col justify-center shadow-sm relative overflow-hidden">
            <span className="text-sm font-medium text-muted-foreground">{kpi.label}</span>
            <div className="mt-1 flex items-baseline gap-2">
              <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
              <span className="text-xs text-muted-foreground font-medium">{kpi.sub}</span>
            </div>
            <kpi.icon className="absolute top-4 right-4 h-8 w-8 text-muted-foreground opacity-10" />
          </div>
        ))}
      </div>

      {/* Main Content Workspace */}
      <div className="flex-1 flex flex-col bg-card rounded-xl border border-border shadow-sm overflow-hidden">
        {/* Workspace Toolbar */}
        <div className="flex justify-between items-center p-4 border-b border-border bg-muted/20">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              type="search" 
              placeholder="Search by ID, guest, or amount..." 
              className="pl-9 h-9 bg-background border-border w-full"
            />
          </div>
        </div>

        {/* List View */}
        <div className="overflow-x-auto flex-1">
          <table className="w-full text-sm text-left whitespace-nowrap">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/30 border-b border-border">
              <tr>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Transaction ID</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Guest & Property</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Type & Method</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Date</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider">Status</th>
                <th className="px-6 py-3.5 font-semibold tracking-wider text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/50">
              {transactions.map((txn) => (
                <tr key={txn.id} className="bg-background hover:bg-muted/30 transition-colors group cursor-pointer">
                  <td className="px-6 py-4 font-semibold text-foreground">{txn.id}</td>
                  <td className="px-6 py-4">
                    <p className="font-semibold text-foreground">{txn.guest}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{txn.property}</p>
                  </td>
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">{txn.type}</p>
                    <p className="text-xs text-muted-foreground mt-0.5 flex items-center">
                      <CreditCard className="h-3 w-3 mr-1" /> {txn.method}
                    </p>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">{txn.date}</td>
                  <td className="px-6 py-4">
                    {getTxnBadge(txn.status)}
                  </td>
                  <td className={`px-6 py-4 text-right font-semibold ${txn.amount.startsWith('-') ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {txn.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

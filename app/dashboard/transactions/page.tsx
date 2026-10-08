import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { ArrowDownRight, ArrowUpRight } from "lucide-react"

export default function TransactionsPage() {
  const transactions = [
    { id: "TRX-8921", date: "Oct 12, 2026", desc: "Room Booking - A. Smith", amount: "+$840.00", type: "income" },
    { id: "TRX-8920", date: "Oct 11, 2026", desc: "Restaurant Charge - B. Jones", amount: "+$124.50", type: "income" },
    { id: "TRX-8919", date: "Oct 10, 2026", desc: "Plumbing Repair Service", amount: "-$350.00", type: "expense" },
    { id: "TRX-8918", date: "Oct 10, 2026", desc: "Room Booking - C. Brown", amount: "+$1,200.00", type: "income" },
    { id: "TRX-8917", date: "Oct 09, 2026", desc: "Monthly Utilities", amount: "-$840.20", type: "expense" },
  ]

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Transactions</h1>
          <p className="text-muted-foreground">Financial ledger and payment history.</p>
        </div>
        <Button>Export PDF</Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-muted-foreground uppercase bg-muted/50">
              <tr>
                <th className="px-6 py-4 font-medium">Transaction ID</th>
                <th className="px-6 py-4 font-medium">Date</th>
                <th className="px-6 py-4 font-medium">Description</th>
                <th className="px-6 py-4 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((trx, i) => (
                <tr key={i} className="bg-card border-b hover:bg-muted/30">
                  <td className="px-6 py-4 font-medium text-muted-foreground">{trx.id}</td>
                  <td className="px-6 py-4">{trx.date}</td>
                  <td className="px-6 py-4">{trx.desc}</td>
                  <td className={`px-6 py-4 text-right font-bold flex items-center justify-end ${trx.type === 'income' ? 'text-success' : 'text-error'}`}>
                    {trx.type === 'income' ? <ArrowUpRight className="h-4 w-4 mr-1" /> : <ArrowDownRight className="h-4 w-4 mr-1" />}
                    {trx.amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

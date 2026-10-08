import { FileText, Download, Filter, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

const reportCategories = [
  {
    title: "Financial",
    reports: [
      { name: "Revenue Report", desc: "Detailed breakdown of daily revenue streams.", date: "Today, 08:00 AM" },
      { name: "Payment & Settlements", desc: "All processed transactions and gateway payouts.", date: "Yesterday" },
      { name: "Tax Collection", desc: "City, state, and hospitality tax aggregations.", date: "Oct 1, 2026" },
    ]
  },
  {
    title: "Operations",
    reports: [
      { name: "Occupancy Overview", desc: "Historical and forecasted occupancy rates.", date: "Today, 08:00 AM" },
      { name: "Housekeeping Efficiency", desc: "Task completion rates and turnaround times.", date: "Oct 12, 2026" },
    ]
  },
  {
    title: "Guests & Marketing",
    reports: [
      { name: "Booking Source Analysis", desc: "OTA vs Direct booking distributions.", date: "Oct 1, 2026" },
      { name: "VIP & Loyalty", desc: "Returning guests and loyalty tier upgrades.", date: "Sep 30, 2026" },
    ]
  }
]

export default function ReportsPage() {
  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">Reports</h1>
          <p className="text-muted-foreground mt-1 text-sm">Generate, schedule, and export property intelligence reports.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Button className="h-9"><FileText className="h-4 w-4 mr-2" /> Custom Report</Button>
        </div>
      </div>

      <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
        {reportCategories.map((cat, i) => (
          <div key={i} className="flex flex-col gap-4">
            <h3 className="font-semibold uppercase tracking-wider text-xs text-muted-foreground">{cat.title}</h3>
            
            <div className="space-y-3">
              {cat.reports.map((rep, j) => (
                <div key={j} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:border-primary/40 transition-colors group cursor-pointer">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center text-primary">
                        <FileText className="h-4 w-4" />
                      </div>
                      <h4 className="font-semibold text-foreground">{rep.name}</h4>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Download className="h-4 w-4 text-muted-foreground hover:text-primary" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">{rep.desc}</p>
                  
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-xs text-muted-foreground font-medium flex items-center">
                      Generated: {rep.date}
                    </span>
                    <span className="text-xs font-semibold text-primary flex items-center group-hover:underline">
                      View Report <ChevronRight className="h-3 w-3 ml-0.5" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { FileText, Download } from "lucide-react"

export default function ReportsPage() {
  const reports = [
    { title: "Monthly Revenue Report", date: "Generated Oct 1, 2026", size: "2.4 MB" },
    { title: "Occupancy Statistics Q3", date: "Generated Oct 1, 2026", size: "1.1 MB" },
    { title: "Tax & Compliance Summary", date: "Generated Sep 30, 2026", size: "840 KB" },
    { title: "Guest Demographics", date: "Generated Sep 28, 2026", size: "3.2 MB" },
  ]

  return (
    <div className="grid gap-4 md:gap-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
          <p className="text-muted-foreground">Downloadable business intelligence and exports.</p>
        </div>
        <Button>Generate New Report</Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report, i) => (
          <Card key={i} className="flex flex-row items-center justify-between p-6">
            <div className="flex items-center gap-4">
              <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center">
                <FileText className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">{report.title}</h3>
                <p className="text-sm text-muted-foreground">{report.date} • {report.size}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <Download className="h-5 w-5" />
            </Button>
          </Card>
        ))}
      </div>
    </div>
  )
}

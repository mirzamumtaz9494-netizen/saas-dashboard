"use client"

import { LineChart } from "lucide-react"
import { EmptyState } from "@/components/ui/Feedback"
import { Button } from "@/components/ui/Button"

export default function Page() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">Rates & Availability</h1>
          <p className="text-sm text-muted-foreground mt-1">Manage pricing strategies, seasonal rates, and room blocks.</p>
        </div>
      </div>
      <div className="flex-1 bg-card border border-border rounded-xl shadow-sm p-8 flex items-center justify-center">
        <EmptyState 
          icon={LineChart}
          title="Rates & Availability Module Coming Soon"
          description="This section is currently being provisioned for your tenant. Check back later."
          action={<Button>Notify Me</Button>}
        />
      </div>
    </div>
  )
}

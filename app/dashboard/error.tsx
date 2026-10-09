"use client"

import { useEffect } from "react"
import { AlertTriangle } from "lucide-react"
import { EmptyState } from "@/components/ui/Feedback"
import { Button } from "@/components/ui/Button"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex h-full w-full items-center justify-center p-8">
      <EmptyState 
        icon={AlertTriangle}
        title="Something went wrong!"
        description={error.message || "An unexpected error occurred while loading this dashboard view."}
        action={<Button onClick={() => reset()}>Try again</Button>}
        className="border-destructive/20 bg-destructive/5"
      />
    </div>
  )
}

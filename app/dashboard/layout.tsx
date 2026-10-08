import { DashboardSidebar } from "@/components/layout/DashboardSidebar"
import { DashboardHeader } from "@/components/layout/DashboardHeader"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row bg-muted/10">
      <DashboardSidebar />
      <div className="flex flex-1 flex-col sm:gap-4 sm:py-4">
        <DashboardHeader />
        <main className="flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  )
}

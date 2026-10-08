import { DashboardHeader } from "@/components/layout/DashboardHeader"
import { DashboardSidebar } from "@/components/layout/DashboardSidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen p-4 md:p-8 flex items-center justify-center relative">
      {/* Structural Match: Subtle semantic border around the app frame */}
      <div className="flex h-[calc(100vh-4rem)] w-full max-w-[1600px] overflow-hidden rounded-xl border-2 border-primary/20 shadow-[0_0_50px_rgba(0,0,0,0.5)] bg-background">
        <DashboardSidebar />
        <div className="flex flex-1 flex-col overflow-hidden">
          <DashboardHeader />
          <main className="flex-1 overflow-y-auto p-6 bg-background">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}

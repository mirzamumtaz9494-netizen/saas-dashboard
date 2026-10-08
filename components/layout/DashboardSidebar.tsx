"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  CalendarDays, 
  Users, 
  SprayCan,
  ConciergeBell,
  FileText, 
  LineChart, 
  Settings
} from "lucide-react"

import { cn } from "@/lib/utils"

const navItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Reservations Calendar", href: "/dashboard/reservations", icon: CalendarDays },
  { title: "Guest Management", href: "/dashboard/guests", icon: Users },
  { title: "Housekeeping", href: "/dashboard/housekeeping", icon: SprayCan },
  { title: "Front Desk", href: "/dashboard/front-desk", icon: ConciergeBell },
  { title: "Reports", href: "/dashboard/reports", icon: FileText },
  { title: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r border-border bg-card md:flex w-[260px] flex-col flex-shrink-0 min-h-full">
      {/* Exact Logo Match from Screenshot (Soft Gold + Green) */}
      <div className="flex h-[72px] items-center px-6 border-b border-border bg-card">
        <Link href="/" className="flex items-center gap-3 font-semibold group">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#E8D2A6] via-[#D1B583] to-[#9C8151] shadow-[0_0_10px_rgba(209,181,131,0.2)]">
            <span className="text-[#091A11] font-heading font-bold text-lg leading-none">G</span>
          </div>
          <span className="font-heading tracking-tight text-xl text-foreground">GrandStay</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 space-y-1 px-4 bg-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-2.5 text-sm transition-all group relative overflow-hidden",
                isActive 
                  ? "text-[#D1B583] font-semibold border border-[#D1B583]/40 bg-[#D1B583]/10 rounded-full" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-foreground rounded-lg"
              )}
            >
              <item.icon className={cn(
                "h-[18px] w-[18px] transition-colors relative z-10", 
                isActive ? "text-[#D1B583]" : "text-muted-foreground group-hover:text-muted-foreground/80"
              )} />
              <span className="relative z-10">{item.title}</span>
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

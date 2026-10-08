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
    <aside className="hidden border-r border-border bg-card md:flex w-[250px] flex-col flex-shrink-0 min-h-full">
      {/* Exact Logo Match from Screenshot */}
      <div className="flex h-[72px] items-center px-6 border-b border-border bg-card">
        <Link href="/" className="flex items-center gap-3 font-semibold group">
          <div className="flex h-7 w-7 items-center justify-center rounded bg-gradient-to-br from-[#D4AF37] to-[#8B6508] shadow-sm">
            <span className="text-white font-heading font-bold text-lg leading-none">G</span>
          </div>
          <span className="font-heading tracking-tight text-xl text-foreground">GrandStay</span>
        </Link>
      </div>
      
      <div className="flex-1 overflow-auto py-6 space-y-1 px-3 bg-card">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-all group relative",
                isActive 
                  ? "bg-white/5 text-white font-medium" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-6 bg-[#D4AF37] rounded-r-md shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
              )}
              <item.icon className={cn(
                "h-[18px] w-[18px] transition-colors", 
                isActive ? "text-[#D4AF37]" : "text-muted-foreground group-hover:text-muted-foreground/80"
              )} />
              {item.title}
            </Link>
          )
        })}
      </div>
    </aside>
  )
}

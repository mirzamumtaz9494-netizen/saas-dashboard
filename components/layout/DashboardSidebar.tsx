"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  Building, 
  LayoutDashboard, 
  LineChart, 
  CalendarDays, 
  BookOpen, 
  Users, 
  Building2, 
  BedDouble, 
  CreditCard, 
  FileText, 
  Bell, 
  Settings,
  Hotel
} from "lucide-react"

import { cn } from "@/lib/utils"

const navGroups = [
  {
    label: "Overview",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ]
  },
  {
    label: "Operations",
    items: [
      { title: "Reservations", href: "/dashboard/reservations", icon: CalendarDays },
      { title: "Guests", href: "/dashboard/guests", icon: Users },
      { title: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
      { title: "Properties", href: "/dashboard/properties", icon: Building2 },
    ]
  },
  {
    label: "Insights & Finance",
    items: [
      { title: "Analytics", href: "/dashboard/analytics", icon: LineChart },
      { title: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
      { title: "Reports", href: "/dashboard/reports", icon: FileText },
    ]
  },
  {
    label: "System",
    items: [
      { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
      { title: "Settings", href: "/dashboard/settings", icon: Settings },
    ]
  }
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r border-border/50 bg-background md:block w-[260px] flex-shrink-0 min-h-screen transition-all">
      <div className="flex h-full flex-col">
        <div className="flex h-16 items-center px-6 border-b border-border/50">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <Hotel className="h-4 w-4" />
            </div>
            <span className="font-heading tracking-tight text-lg">Vprofessionals</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-6 space-y-8 no-scrollbar">
          {navGroups.map((group, i) => (
            <div key={i} className="px-4">
              <h4 className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground/70">
                {group.label}
              </h4>
              <nav className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-all group relative",
                        isActive 
                          ? "bg-muted text-foreground font-semibold" 
                          : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                      )}
                    >
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-primary rounded-r-md" />
                      )}
                      <item.icon className={cn("h-4 w-4", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
                      {item.title}
                    </Link>
                  )
                })}
              </nav>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}

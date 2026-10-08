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
  UserCircle, 
  Settings 
} from "lucide-react"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"

const navItems = [
  { title: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { title: "Analytics", href: "/dashboard/analytics", icon: LineChart },
  { title: "Bookings", href: "/dashboard/bookings", icon: CalendarDays },
  { title: "Reservations", href: "/dashboard/reservations", icon: BookOpen },
  { title: "Guests", href: "/dashboard/guests", icon: Users },
  { title: "Properties", href: "/dashboard/properties", icon: Building2 },
  { title: "Rooms", href: "/dashboard/rooms", icon: BedDouble },
  { title: "Transactions", href: "/dashboard/transactions", icon: CreditCard },
  { title: "Reports", href: "/dashboard/reports", icon: FileText },
  { title: "Notifications", href: "/dashboard/notifications", icon: Bell },
]

const bottomNavItems = [
  { title: "Profile", href: "/dashboard/profile", icon: UserCircle },
  { title: "Settings", href: "/dashboard/settings", icon: Settings },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden border-r bg-muted/20 md:block w-64 flex-shrink-0 min-h-screen">
      <div className="flex h-full flex-col">
        <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Building className="h-6 w-6 text-primary" />
            <span>{siteConfig.name}</span>
          </Link>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
        
        <div className="mt-auto border-t p-4">
          <nav className="grid items-start text-sm font-medium space-y-1">
            {bottomNavItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary",
                    isActive ? "bg-primary/10 text-primary" : "text-muted-foreground"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </aside>
  )
}

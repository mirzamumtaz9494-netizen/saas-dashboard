"use client"

import { useState } from "react"
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
  Settings,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  UserCheck,
  CreditCard,
  MessageSquare,
  Wrench,
  Link as LinkIcon,
  Files
} from "lucide-react"

import { cn } from "@/lib/utils"
import { useTenant } from "@/providers/TenantProvider"
import { Role } from "@/config/tenant"

interface NavItem {
  title: string
  href: string
  icon: any
  roles: Role[]
}

const navItems: NavItem[] = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Reservations Calendar", href: "/dashboard/reservations", icon: CalendarDays, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Front Desk", href: "/dashboard/front-desk", icon: ConciergeBell, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Guest Management", href: "/dashboard/guests", icon: Users, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Housekeeping", href: "/dashboard/housekeeping", icon: SprayCan, roles: ["Owner", "Manager", "Housekeeping"] },
  { title: "Maintenance", href: "/dashboard/maintenance", icon: Wrench, roles: ["Owner", "Manager", "Housekeeping", "Front Desk"] },
  { title: "Messages", href: "/dashboard/messages", icon: MessageSquare, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Staff & Shifts", href: "/dashboard/staff", icon: UserCheck, roles: ["Owner", "Manager"] },
  { title: "Rates & Availability", href: "/dashboard/rates", icon: LineChart, roles: ["Owner", "Manager"] },
  { title: "Billing & Invoices", href: "/dashboard/billing", icon: CreditCard, roles: ["Owner", "Manager", "Front Desk"] },
  { title: "Reports", href: "/dashboard/reports", icon: FileText, roles: ["Owner", "Manager"] },
  { title: "Integrations", href: "/dashboard/integrations", icon: LinkIcon, roles: ["Owner", "Manager"] },
  { title: "Documents", href: "/dashboard/documents", icon: Files, roles: ["Owner", "Manager"] },
  { title: "Settings", href: "/dashboard/settings", icon: Settings, roles: ["Owner", "Manager"] },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { tenant, role } = useTenant()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const filteredNav = navItems.filter(item => item.roles.includes(role))

  const sidebarContent = (
    <>
      {/* Brand Header */}
      <div className={cn("flex h-[72px] items-center border-b border-border bg-card shrink-0 transition-all", collapsed ? "justify-center px-2" : "px-6 justify-between")}>
        <Link href="/" className={cn("flex items-center gap-3 font-semibold group", collapsed && "justify-center")}>
          <div className="flex h-7 w-7 items-center justify-center rounded bg-primary shadow-sm shadow-primary/20 shrink-0">
            <span className="text-primary-foreground font-heading font-bold text-lg leading-none">{tenant.logo}</span>
          </div>
          {!collapsed && <span className="font-heading tracking-tight text-xl text-foreground whitespace-nowrap overflow-hidden text-ellipsis">{tenant.propertyName}</span>}
        </Link>
        {!collapsed && (
          <button onClick={() => setCollapsed(true)} className="hidden md:flex text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-5 w-5" />
          </button>
        )}
      </div>
      
      {/* Navigation Links */}
      <div className="flex-1 overflow-auto py-6 space-y-1 px-4 bg-card scrollbar-hide flex flex-col">
        {collapsed && (
          <button onClick={() => setCollapsed(false)} className="w-full flex justify-center py-2 mb-2 text-muted-foreground hover:text-foreground">
            <ChevronRight className="h-5 w-5" />
          </button>
        )}

        {filteredNav.map((item) => {
          const isActive = pathname === item.href
          const isSettings = item.title === "Settings"
          return (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.title : undefined}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "flex items-center gap-3 py-2.5 text-sm transition-all group relative overflow-hidden",
                collapsed ? "justify-center px-2 rounded-lg" : "px-4 rounded-lg",
                isSettings && "mt-auto border-t border-border/50 pt-4 rounded-none",
                isActive 
                  ? (collapsed ? "text-primary bg-primary/10" : "text-primary font-semibold border border-primary/40 bg-primary/10")
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className={cn(
                "h-[18px] w-[18px] transition-colors relative z-10 shrink-0", 
                isActive ? "text-primary" : "text-muted-foreground group-hover:text-muted-foreground/80"
              )} />
              {!collapsed && <span className="relative z-10 whitespace-nowrap">{item.title}</span>}
            </Link>
          )
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Mobile Toggle Button (Visible only on small screens outside the sidebar) */}
      <button 
        className="md:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-2xl flex items-center justify-center z-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Desktop Sidebar */}
      <aside className={cn(
        "hidden md:flex border-r border-border bg-card flex-col flex-shrink-0 min-h-full transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[260px]"
      )}>
        {sidebarContent}
      </aside>

      {/* Mobile Off-canvas Sidebar */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-[280px] h-full bg-card shadow-2xl flex flex-col animate-in slide-in-from-left duration-300 z-10">
            {sidebarContent}
          </aside>
        </div>
      )}
    </>
  )
}

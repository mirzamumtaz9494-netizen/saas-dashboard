"use client"

import { Bell, Search, Plus, Check, ChevronDown, LogOut, Settings, User } from "lucide-react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { useTenant } from "@/providers/TenantProvider"
import { usePathname } from "next/navigation"
import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/DropdownMenu"

export function DashboardHeader() {
  const { tenant, availableTenants, setTenantId, role, setRole } = useTenant();
  const pathname = usePathname();

  // Simple Breadcrumb logic
  const getPageTitle = () => {
    if (pathname === "/dashboard") return "Overview";
    if (pathname.includes("/reservations")) return "Reservations";
    if (pathname.includes("/guests")) return "Guests";
    if (pathname.includes("/housekeeping")) return "Housekeeping";
    if (pathname.includes("/front-desk")) return "Front Desk";
    const segment = pathname.split("/").pop();
    return segment ? segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ") : "Dashboard";
  };

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-card px-6 sticky top-0 z-40">
      
      {/* Left: Breadcrumbs & Page Title */}
      <div className="flex flex-col justify-center">
        <h1 className="font-heading text-xl font-bold text-foreground leading-tight">
          {getPageTitle()}
        </h1>
        <div className="text-xs text-muted-foreground font-medium mt-0.5 flex items-center gap-1">
          <span>Dashboard</span>
          <span>/</span>
          <span className="text-primary">{tenant.propertyName}</span>
        </div>
      </div>

      {/* Center: Search & Property Switcher */}
      <div className="hidden md:flex flex-1 max-w-xl mx-8 items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-9 shrink-0 gap-2 border-border/50 text-foreground bg-background hover:bg-muted font-medium">
              <div className="h-4 w-4 bg-primary text-primary-foreground flex items-center justify-center rounded-sm text-[10px] font-bold">
                {tenant.logo}
              </div>
              {tenant.propertyName}
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuLabel>Switch Property</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {availableTenants.map(t => (
              <DropdownMenuItem 
                key={t.id} 
                onClick={() => setTenantId(t.id)}
                className="flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 bg-primary text-primary-foreground flex items-center justify-center rounded-sm text-[10px] font-bold opacity-80">
                    {t.logo}
                  </div>
                  <span>{t.propertyName}</span>
                </div>
                {tenant.id === t.id && <Check className="h-4 w-4 text-primary" />}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="relative w-full max-w-[320px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search bookings, guests... (Ctrl+K)"
            className="w-full bg-background border-border rounded-full pl-10 h-9 shadow-inner text-sm focus-visible:ring-primary placeholder:text-muted-foreground"
          />
        </div>
      </div>

      {/* Right: Actions, Notifications, Profile */}
      <div className="flex items-center gap-4 shrink-0">
        <Button className="hidden md:flex h-9 text-xs rounded-full shadow-md gap-1">
          <Plus className="h-4 w-4" /> New Booking
        </Button>

        <div className="flex items-center gap-2">
          {/* Notifications Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-muted transition-colors">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="absolute top-2 right-2 h-2.5 w-2.5 rounded-full bg-primary border-2 border-card shadow-sm flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                </span>
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="flex items-center justify-between p-2">
                <span className="font-semibold text-sm">Notifications (3)</span>
                <span className="text-xs text-primary cursor-pointer hover:underline">Mark all read</span>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <span className="font-semibold text-sm">VIP Arrival</span>
                <span className="text-xs text-muted-foreground">Eleanor Pena is arriving in 2 hours (Room 201).</span>
                <span className="text-[10px] text-muted-foreground mt-1">10 min ago</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start p-3 cursor-pointer">
                <span className="font-semibold text-sm">Maintenance Alert</span>
                <span className="text-xs text-muted-foreground">AC broken in Room 203. Ticket #402 created.</span>
                <span className="text-[10px] text-muted-foreground mt-1">1 hr ago</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <div className="hidden sm:flex -space-x-2 mr-2 group cursor-pointer" title="Online Teammates: Alex, Maria">
            <div className="h-7 w-7 rounded-full bg-card border-2 border-background flex items-center justify-center overflow-hidden hover:z-10 transition-transform hover:scale-110">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Alex" className="h-full w-full object-cover" />
            </div>
            <div className="h-7 w-7 rounded-full bg-card border-2 border-background flex items-center justify-center overflow-hidden hover:z-10 transition-transform hover:scale-110">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Maria" className="h-full w-full object-cover" />
            </div>
          </div>
        </div>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-3 pl-4 border-l border-border focus:outline-none group">
              <div className="h-9 w-9 rounded-full bg-primary p-[1px] group-hover:shadow-[0_0_15px_rgba(var(--primary),0.3)] transition-all">
                <div className="h-full w-full rounded-full bg-card overflow-hidden">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah J." className="h-full w-full object-cover opacity-90" />
                </div>
              </div>
              <div className="hidden sm:flex flex-col text-sm text-left">
                <span className="font-bold text-foreground leading-none mb-1 group-hover:text-primary transition-colors">Sarah J.</span>
                <span className="text-[10px] text-muted-foreground leading-none">{role}</span>
              </div>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer"><User className="mr-2 w-4 h-4" /> Profile</DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer"><Settings className="mr-2 w-4 h-4" /> Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuLabel className="text-xs text-muted-foreground py-1">Demo Role Switcher</DropdownMenuLabel>
            {(["Owner", "Manager", "Front Desk", "Housekeeping"] as const).map(r => (
              <DropdownMenuItem key={r} onClick={() => setRole(r)} className="cursor-pointer">
                {role === r ? <Check className="mr-2 w-4 h-4 text-primary" /> : <div className="mr-2 w-4 h-4" />}
                {r}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-500 focus:bg-red-500/10 focus:text-red-500"><LogOut className="mr-2 w-4 h-4" /> Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

      </div>
    </header>
  )
}

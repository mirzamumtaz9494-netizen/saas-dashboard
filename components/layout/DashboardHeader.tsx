"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Menu, LogOut, Settings, User, Building, MapPin, ChevronDown, Plus } from "lucide-react"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu"
import { Badge } from "@/components/ui/Badge"

export function DashboardHeader() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push("/dashboard/bookings")
  }

  return (
    <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6 sticky top-0 z-40">
      <Button variant="outline" size="icon" className="shrink-0 md:hidden h-9 w-9 border-border">
        <Menu className="h-4 w-4" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      
      {/* Signature Property Switcher */}
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex gap-3 h-10 border-border bg-background hover:bg-muted text-left font-normal pl-2 pr-3 w-[240px] justify-between shadow-sm transition-all duration-200 focus:ring-1 focus:ring-primary/20">
              <div className="flex items-center gap-3 overflow-hidden">
                <div className="h-6 w-6 rounded bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Building className="h-3.5 w-3.5 text-primary" />
                </div>
                <div className="flex flex-col truncate">
                  <span className="text-sm font-semibold text-foreground truncate">Grand Hotel Downtown</span>
                  <span className="text-[10px] text-muted-foreground truncate">All Properties</span>
                </div>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0 opacity-50" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[280px] p-2">
            <DropdownMenuLabel className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-2 py-1.5">
              Select Property
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-2 focus:bg-primary/5 rounded-md cursor-pointer mb-1">
              <div className="flex justify-between items-center w-full">
                <span className="font-semibold text-foreground text-sm">All Properties</span>
                <Badge variant="softDefault" className="text-[10px]">Portfolio</Badge>
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1 p-2 focus:bg-primary/5 rounded-md cursor-pointer bg-primary/5">
              <div className="flex justify-between items-center w-full">
                <span className="font-semibold text-primary text-sm">Grand Hotel Downtown</span>
                <Badge variant="softSuccess" className="text-[10px] px-1.5 py-0">Active</Badge>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" /> New York, NY
              </div>
            </DropdownMenuItem>

            <DropdownMenuItem className="flex flex-col items-start gap-1 p-2 focus:bg-primary/5 rounded-md cursor-pointer">
              <div className="flex justify-between items-center w-full">
                <span className="font-medium text-foreground text-sm">Oasis Resort & Spa</span>
              </div>
              <div className="flex items-center text-xs text-muted-foreground">
                <MapPin className="h-3 w-3 mr-1" /> Miami, FL
              </div>
            </DropdownMenuItem>
            
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem className="p-2 text-primary font-medium focus:bg-primary/5 rounded-md cursor-pointer">
              <Plus className="h-4 w-4 mr-2" />
              Add New Property
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="w-full flex-1 md:ml-auto md:w-auto md:flex-none md:max-w-md">
        <form onSubmit={handleSearch}>
          <div className="relative group">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground transition-colors group-focus-within:text-primary" />
            <Input
              type="search"
              placeholder="Search reservations, guests..."
              className="w-full appearance-none bg-background pl-9 border-border hover:border-primary/50 focus:bg-background focus:border-primary shadow-sm h-9 transition-all duration-200 rounded-md text-sm"
            />
            <div className="absolute right-2.5 top-2 hidden md:flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
                <span>⌘</span>K
              </kbd>
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-3">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative h-9 w-9 rounded-full border-border bg-background hover:bg-muted transition-colors">
              <Bell className="h-4 w-4 text-secondary-foreground" />
              <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error border-2 border-background" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[340px] p-0">
            <div className="flex justify-between items-center p-4 border-b border-border">
              <span className="font-semibold text-foreground">Notifications</span>
              <Badge variant="softAccent" className="bg-primary/10 text-primary hover:bg-primary/20 transition-colors cursor-pointer">Mark all read</Badge>
            </div>
            <div className="max-h-[320px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 border-b border-border cursor-pointer focus:bg-muted/50 rounded-none">
                <div className="flex justify-between w-full mb-1">
                  <span className="font-semibold text-sm text-foreground">New VIP Booking</span>
                  <span className="text-[11px] font-medium text-primary">2m ago</span>
                </div>
                <span className="text-sm text-muted-foreground leading-snug">Alice Smith booked the Penthouse Suite for Oct 12 - Oct 15.</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-4 cursor-pointer focus:bg-muted/50 rounded-none">
                <div className="flex justify-between w-full mb-1">
                  <span className="font-semibold text-sm text-error">Maintenance Alert</span>
                  <span className="text-[11px] text-muted-foreground">1h ago</span>
                </div>
                <span className="text-sm text-muted-foreground leading-snug">AC unit malfunction reported in Room 204. Immediate attention required.</span>
              </DropdownMenuItem>
            </div>
            <div className="p-2 border-t border-border bg-muted/20">
              <Button variant="ghost" className="w-full text-xs font-medium text-primary h-8" asChild>
                <Link href="/dashboard/notifications">View all notifications</Link>
              </Button>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-9 w-9 rounded-full overflow-hidden p-0 border border-border shadow-sm hover:ring-2 hover:ring-primary/20 transition-all duration-200">
              <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold tracking-wider">
                GM
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-60 p-2">
            <DropdownMenuLabel className="font-normal p-2.5">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-semibold leading-none text-foreground">General Manager</p>
                <p className="text-xs leading-none text-muted-foreground">admin@vprofessionals.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="p-2 cursor-pointer focus:bg-muted">
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-2 cursor-pointer focus:bg-muted">
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Workspace Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="my-1" />
            <DropdownMenuItem asChild className="p-2 cursor-pointer focus:bg-error/10 text-error focus:text-error">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span className="text-sm font-medium">Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Menu, LogOut, Settings, User, Building } from "lucide-react"

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
    <header className="flex h-16 items-center gap-4 border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 lg:px-6 sticky top-0 z-40">
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      
      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex gap-2 h-9 border-dashed text-muted-foreground hover:text-foreground">
              <Building className="h-4 w-4" />
              <span>Grand Hotel Downtown</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-[220px]">
            <DropdownMenuLabel>Select Property</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-between font-medium">
              Grand Hotel Downtown
              <Badge variant="softSuccess" className="text-[10px] px-1.5 py-0">Active</Badge>
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-between text-muted-foreground">
              Oasis Resort & Spa
            </DropdownMenuItem>
            <DropdownMenuItem className="justify-between text-muted-foreground">
              Luxe Villas
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-primary">
              + Add New Property
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
              placeholder="Search guests, rooms, reservations..."
              className="w-full appearance-none bg-muted/50 pl-9 border-transparent hover:bg-muted focus:bg-background focus:border-primary shadow-none h-9 transition-all"
            />
            <div className="absolute right-2.5 top-2 hidden md:flex items-center gap-1">
              <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </div>
          </div>
        </form>
      </div>

      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full hover:bg-muted">
              <Bell className="h-4 w-4 text-muted-foreground" />
              <span className="absolute top-2 right-2 h-1.5 w-1.5 rounded-full bg-error" />
              <span className="sr-only">Toggle notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[320px]">
            <DropdownMenuLabel className="flex justify-between items-center">
              <span>Notifications</span>
              <Badge variant="softAccent">3 New</Badge>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-y-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex justify-between w-full">
                  <span className="font-medium text-sm">New VIP Booking</span>
                  <span className="text-[10px] text-muted-foreground">2m ago</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">Alice Smith booked the Penthouse Suite for Oct 12 - Oct 15.</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex justify-between w-full">
                  <span className="font-medium text-sm text-error">Maintenance Alert</span>
                  <span className="text-[10px] text-muted-foreground">1h ago</span>
                </div>
                <span className="text-xs text-muted-foreground line-clamp-2">AC unit malfunction reported in Room 204. Immediate attention required.</span>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-primary text-xs font-medium cursor-pointer" asChild>
              <Link href="/dashboard/notifications">View all notifications</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative ml-2 h-9 w-9 rounded-full overflow-hidden p-0 border border-border hover:border-primary/50 transition-colors">
              <span className="flex h-full w-full items-center justify-center bg-primary text-primary-foreground text-xs font-bold">
                GM
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="font-normal p-3">
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">General Manager</p>
                <p className="text-xs leading-none text-muted-foreground">admin@vprofessionals.com</p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/profile">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>My Profile</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href="/dashboard/settings">
                <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
                <span>Workspace Settings</span>
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild className="cursor-pointer text-error focus:text-error focus:bg-error/10">
              <Link href="/login">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

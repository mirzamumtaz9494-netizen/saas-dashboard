"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { Bell, Search, Menu, LogOut, Settings, User } from "lucide-react"

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

export function DashboardHeader() {
  const router = useRouter()

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Mock search interaction
    router.push("/dashboard/bookings")
  }

  return (
    <header className="flex h-14 items-center gap-4 border-b bg-muted/20 px-4 lg:h-[60px] lg:px-6">
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
      
      <div className="w-full flex-1">
        <form onSubmit={handleSearch}>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search reservations, guests..."
              className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
            />
          </div>
        </form>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon" className="relative ml-auto h-8 w-8 rounded-full">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-error" />
            <span className="sr-only">Toggle notifications</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[300px]">
          <DropdownMenuLabel>Notifications</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <div className="max-h-[300px] overflow-y-auto">
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">New Booking - Room 402</span>
              <span className="text-xs text-muted-foreground">Alice Smith just booked for Oct 12.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">Maintenance Alert</span>
              <span className="text-xs text-muted-foreground">AC issue reported in Room 204.</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="flex flex-col items-start gap-1 p-3">
              <span className="font-medium text-sm">Late Check-in</span>
              <span className="text-xs text-muted-foreground">Guest for Room 105 arriving at 22:00.</span>
            </DropdownMenuItem>
          </div>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="justify-center text-primary cursor-pointer">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative ml-4 h-8 w-8 rounded-full overflow-hidden p-0 bg-primary">
            <span className="flex h-full w-full items-center justify-center text-primary-foreground text-sm font-medium">
              GM
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">General Manager</p>
              <p className="text-xs leading-none text-muted-foreground">admin@vprofessionals.com</p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/dashboard/profile" className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/dashboard/settings" className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/login" className="cursor-pointer text-error focus:text-error focus:bg-error/10">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}

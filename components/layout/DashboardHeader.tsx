"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bell, Search, User } from "lucide-react"

import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { Badge } from "@/components/ui/Badge"

export function DashboardHeader() {
  const pathname = usePathname()
  
  // Format pathname to Title
  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Dashboard'
    const path = pathname.split('/').pop()
    if (!path) return 'Dashboard'
    return path.charAt(0).toUpperCase() + path.slice(1).replace('-', ' ')
  }

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-card px-6 sticky top-0 z-40">
      
      {/* Left: Structural Page Title & Subtitle like in the screenshot */}
      <div className="flex flex-col justify-center">
        <h1 className="font-heading text-xl font-bold text-foreground leading-tight">
          Vprofessionals
        </h1>
        <p className="text-xs text-muted-foreground font-medium">
          {getPageTitle()} - The Grand Plaza Hotel
        </p>
      </div>

      {/* Center: Search Bar (as seen in the screenshots) */}
      <div className="hidden md:flex flex-1 max-w-md mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full bg-background border-border rounded-full pl-10 h-10 shadow-sm"
          />
        </div>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3 mr-2">
          <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full hover:bg-muted">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error border border-card" />
          </Button>
          <div className="hidden sm:flex -space-x-2 mr-2">
            <div className="h-8 w-8 rounded-full bg-primary/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-primary">A</div>
            <div className="h-8 w-8 rounded-full bg-warning/20 border-2 border-card flex items-center justify-center text-[10px] font-bold text-warning">M</div>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold shadow-sm">
            SJ
          </div>
          <div className="hidden sm:flex flex-col text-sm">
            <span className="font-bold text-foreground leading-none mb-1">Sarah J.</span>
            <span className="text-[10px] text-muted-foreground leading-none">Front Desk Manager</span>
          </div>
        </div>
      </div>
    </header>
  )
}

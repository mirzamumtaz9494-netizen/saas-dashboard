"use client"

import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/Input"

export function DashboardHeader() {
  return (
    <header className="flex h-[72px] items-center justify-between border-b border-border bg-card px-6 sticky top-0 z-40">
      
      {/* Left: Page Title & Subtitle */}
      <div className="flex flex-col justify-center">
        <h1 className="font-heading text-xl font-bold text-foreground leading-tight">
          GrandStay
        </h1>
        <p className="text-xs text-muted-foreground font-medium mt-0.5">
          Dashboard - The Grand Plaza Hotel
        </p>
      </div>

      {/* Center: Search Bar (Deep Green inset) */}
      <div className="hidden md:flex flex-1 max-w-[320px] mx-8">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search"
            className="w-full bg-[#091A11] border-border rounded-full pl-10 h-9 shadow-inner text-sm focus-visible:ring-[#D1B583] placeholder:text-[#769080]"
          />
        </div>
      </div>

      {/* Right: Notifications and Profile */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="flex items-center gap-3">
          <button className="relative h-9 w-9 flex items-center justify-center rounded-full hover:bg-white/5 transition-colors">
            <Bell className="h-4 w-4 text-muted-foreground" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-[#D1B583] border border-card shadow-[0_0_5px_rgba(209,181,131,0.6)]" />
          </button>
          
          <div className="hidden sm:flex -space-x-2 mr-2">
            <div className="h-7 w-7 rounded-full bg-[#112A1B] border-2 border-card flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Team" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" />
            </div>
            <div className="h-7 w-7 rounded-full bg-[#112A1B] border-2 border-card flex items-center justify-center overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Maria" alt="Team" className="h-full w-full object-cover opacity-80 mix-blend-luminosity" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pl-4 border-l border-border">
          <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#E8D2A6] to-[#9C8151] p-[1px]">
            <div className="h-full w-full rounded-full bg-card overflow-hidden">
              <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah" alt="Sarah J." className="h-full w-full object-cover opacity-90" />
            </div>
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

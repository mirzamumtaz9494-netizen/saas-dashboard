"use client"

import { MoreHorizontal, Plus, Search, CheckSquare } from "lucide-react"
import { Button } from "@/components/ui/Button"
import { Card, CardContent } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"

export default function HousekeepingPage() {
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      {/* Structural Match: Screenshot 2 Top Left (Housekeeping & Asset Management) */}
      
      <div className="flex items-center justify-between">
        <h1 className="font-heading text-xl font-bold text-foreground">Housekeeping & Asset Management</h1>
        <Button variant="ghost" size="icon"><MoreHorizontal className="h-5 w-5 text-muted-foreground" /></Button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)] min-h-[600px]">
        
        {/* Left Side: Dense Status Grid */}
        <Card className="flex-1 border-border shadow-sm bg-card flex flex-col">
          <div className="p-4 border-b border-border flex flex-wrap gap-3 items-center">
            <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-md bg-success/10 text-success border-success/20 cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-success mr-2"></span> Clean
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-md bg-warning/10 text-warning border-warning/20 cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-warning mr-2"></span> Dirty
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-md bg-muted text-muted-foreground border-border cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-muted-foreground mr-2"></span> OOO
            </Badge>
            <Badge variant="outline" className="px-3 py-1.5 text-xs rounded-md bg-background text-foreground border-border cursor-pointer">
              <span className="h-2 w-2 rounded-full bg-foreground mr-2"></span> Inspected
            </Badge>
          </div>
          <CardContent className="flex-1 p-6 overflow-y-auto">
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-3">
              {[
                { n: "101", s: "clean" }, { n: "102", s: "dirty" }, { n: "103", s: "ooo" }, { n: "104", s: "inspected" }, { n: "105", s: "clean" }, { n: "180", s: "dirty" },
                { n: "155", s: "clean" }, { n: "158", s: "dirty" }, { n: "157", s: "clean" }, { n: "138", s: "clean" }, { n: "120", s: "inspected" }, { n: "122", s: "dirty" },
                { n: "201", s: "clean" }, { n: "222", s: "clean" }, { n: "223", s: "dirty" }, { n: "224", s: "ooo" }, { n: "225", s: "clean" }, { n: "250", s: "dirty" },
                { n: "335", s: "clean" }, { n: "336", s: "dirty" }, { n: "337", s: "clean" }, { n: "338", s: "inspected" }, { n: "350", s: "clean" }, { n: "360", s: "clean" },
              ].map((r, i) => (
                <div 
                  key={i} 
                  className={`aspect-square rounded-lg flex items-center justify-center font-bold text-sm border-2 cursor-pointer transition-transform hover:scale-105
                  ${r.s === 'clean' ? 'border-success text-success bg-success/5' : 
                    r.s === 'dirty' ? 'border-warning text-warning bg-warning/5' : 
                    r.s === 'ooo' ? 'border-muted-foreground text-muted-foreground bg-muted/20' : 
                    'border-foreground/20 text-foreground bg-background'}`}
                >
                  {r.n}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Side: Room Detail Panel (Exact structure from screenshot) */}
        <div className="w-full lg:w-[380px] flex flex-col gap-6">
          
          {/* Top Panel: Room Detail & Tasks */}
          <Card className="flex-1 border-border shadow-sm bg-card flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex justify-between items-center bg-muted/10">
              <h2 className="font-bold text-lg text-foreground flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-success"></span> Room 204
              </h2>
              <MoreHorizontal className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="flex border-b border-border">
              <button className="flex-1 py-3 text-sm font-semibold text-primary border-b-2 border-primary bg-background">Details</button>
              <button className="flex-1 py-3 text-sm font-medium text-muted-foreground hover:bg-muted/30">Sub-tasks</button>
            </div>

            <CardContent className="flex-1 p-5 overflow-y-auto space-y-4">
              {[
                "Deep cleaning",
                "Deep cleaning carpet",
                "Deep cleaning seating",
                "Deep cleaning...",
              ].map((task, i) => (
                <label key={i} className="flex items-center gap-3 cursor-pointer group p-2 -mx-2 rounded-md hover:bg-muted/30">
                  <div className="h-5 w-5 rounded border-2 border-border group-hover:border-primary flex items-center justify-center transition-colors"></div>
                  <span className="text-sm font-medium text-foreground">{task}</span>
                  <MoreHorizontal className="h-4 w-4 text-muted-foreground ml-auto opacity-0 group-hover:opacity-100" />
                </label>
              ))}
              
              <Button variant="ghost" className="w-full mt-2 text-primary justify-start px-2 hover:bg-primary/5">
                <Plus className="h-4 w-4 mr-2" /> Add tasks...
              </Button>
            </CardContent>
          </Card>

          {/* Bottom Panel: Asset Maintenance */}
          <Card className="h-[200px] border-border shadow-sm bg-card flex flex-col">
            <div className="p-4 border-b border-border bg-muted/10">
              <h3 className="font-bold text-foreground">Asset Maintenance</h3>
            </div>
            <CardContent className="flex-1 p-5 space-y-4 overflow-y-auto">
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="h-5 w-5 rounded bg-primary flex items-center justify-center">
                  <CheckSquare className="h-4 w-4 text-primary-foreground" />
                </div>
                <span className="text-sm font-medium text-foreground line-through opacity-70">A/C check</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <div className="h-5 w-5 rounded border-2 border-border flex items-center justify-center"></div>
                <span className="text-sm font-medium text-foreground">TV remote battery status</span>
              </label>
            </CardContent>
          </Card>

        </div>

      </div>
    </div>
  )
}

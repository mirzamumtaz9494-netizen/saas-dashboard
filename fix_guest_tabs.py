import os

path = "app/dashboard/guests/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add states for guest drawer tabs
old_state = "const [guestDrawerOpen, setGuestDrawerOpen] = useState(false)"
new_state = """const [guestDrawerOpen, setGuestDrawerOpen] = useState(false)
  const [drawerTab, setDrawerTab] = useState<"Overview" | "Messages">("Overview")"""
content = content.replace(old_state, new_state)

# Replace the inner body of the drawer to support tabs
old_drawer_top = """      <Drawer open={guestDrawerOpen} onClose={() => setGuestDrawerOpen(false)} title="Guest Profile">
        {selectedGuest && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 border-b border-border pb-6">"""

new_drawer_top = """      <Drawer open={guestDrawerOpen} onClose={() => setGuestDrawerOpen(false)} title="Guest Profile">
        {selectedGuest && (
          <div className="space-y-6 flex flex-col h-full">
            <div className="flex gap-4 border-b border-border pb-2 shrink-0">
              {["Overview", "Messages"].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setDrawerTab(tab as any)} 
                  className={`pb-2 text-sm font-medium border-b-2 transition-colors ${drawerTab === tab ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {drawerTab === "Overview" && (
            <div className="space-y-6 flex-1 overflow-y-auto pr-2">
              <div className="flex items-center gap-4 border-b border-border pb-6">"""

content = content.replace(old_drawer_top, new_drawer_top)

# The end of the drawer content needs to be closed
# Looking for:
#             <div className="pt-4 border-t border-border flex flex-col gap-3">
#              <Button onClick={() => window.location.href = `/dashboard/messages?conversation=${selectedGuest.id}`}>Message Guest</Button>
#              <Button variant="outline">Create New Booking</Button>
#              <Button variant="outline">View Stay History</Button>
#            </div>
#          </div>
#        )}

old_drawer_bottom = """            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Message Guest</Button>
              <Button variant="outline">Create New Booking</Button>
              <Button variant="outline">View Stay History</Button>
            </div>
          </div>
        )}"""

new_drawer_bottom = """            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Open Message Center</Button>
              <Button variant="outline">Create New Booking</Button>
              <Button variant="outline">View Stay History</Button>
            </div>
            </div>
            )}
            
            {drawerTab === "Messages" && (
              <div className="flex-1 flex flex-col h-full border border-border rounded-lg bg-muted/10 items-center justify-center p-6 text-center">
                <div className="text-muted-foreground mb-4">View this guest's full message history in the Messages module.</div>
                <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Go to Messages</Button>
              </div>
            )}
            
          </div>
        )}"""
content = content.replace(old_drawer_bottom, new_drawer_bottom)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

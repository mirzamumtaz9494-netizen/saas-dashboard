import os

path = "app/dashboard/guests/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

old = """            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button onClick={() => window.location.href = `/dashboard/messages?conversation=${selectedGuest.id}`}>Message Guest</Button>
              <Button variant="outline">Create New Booking</Button>
              <Button variant="outline">View Stay History</Button>
            </div>
          </div>
        )}
      </Drawer>"""

new = """            <div className="pt-4 border-t border-border flex flex-col gap-3">
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Open Message Center</Button>
              <Button variant="outline">Create New Booking</Button>
              <Button variant="outline">View Stay History</Button>
            </div>
          </div>
          )}

          {drawerTab === "Messages" && (
            <div className="flex-1 flex flex-col h-full border border-border rounded-lg bg-muted/10 items-center justify-center p-6 text-center mt-4">
              <div className="text-muted-foreground mb-4">View this guest's full message history in the Messages module.</div>
              <Button onClick={() => window.location.href = `/dashboard/messages?guest=${selectedGuest.id}`}>Go to Messages</Button>
            </div>
          )}

          </div>
        )}
      </Drawer>"""

content = content.replace(old, new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

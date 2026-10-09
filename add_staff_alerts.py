import os

path = "app/dashboard/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """              <Link href="/dashboard/messages" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3 bg-primary/5">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Unanswered Guest Message</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Jane Doe (Room 302) has been waiting for &gt;30m</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">View</Badge>
              </Link>"""

replacement = """              <Link href="/dashboard/messages" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3 bg-primary/5">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Unanswered Guest Message</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Jane Doe (Room 302) has been waiting for &gt;30m</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">View</Badge>
              </Link>
              
              <Link href="/dashboard/staff?tab=schedule" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-warning" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Open Shift (Maintenance)</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Needs coverage for tomorrow</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">Assign</Badge>
              </Link>
              
              <Link href="/dashboard/staff?tab=time-off" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Pending Time-Off Request</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Rosa Diaz (Sick Leave)</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">Review</Badge>
              </Link>"""

content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

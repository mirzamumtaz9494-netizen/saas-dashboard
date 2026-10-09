import os

path = "app/dashboard/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Add a mock alert for unanswered messages at the top of Tasks & Alerts
target = """<CardContent className="pt-4 flex-1 flex flex-col gap-3 overflow-y-auto">"""

replacement = """<CardContent className="pt-4 flex-1 flex flex-col gap-3 overflow-y-auto">
              <Link href="/dashboard/messages" className="p-3 border border-border rounded-lg hover:bg-muted/50 transition flex items-start gap-3 bg-primary/5">
                <div className="w-2 h-2 mt-1.5 rounded-full shrink-0 bg-primary" />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-foreground">Unanswered Guest Message</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Jane Doe (Room 302) has been waiting for >30m</div>
                </div>
                <Badge variant="outline" className="text-[10px] whitespace-nowrap bg-background">View</Badge>
              </Link>"""

content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

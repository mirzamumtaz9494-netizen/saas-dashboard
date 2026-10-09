import os

path = "app/dashboard/messages/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """            <div className="w-[60px] md:w-[160px] shrink-0 flex flex-col gap-2 overflow-y-auto scrollbar-hide border-r border-border pr-2">
              {mockIntegrations.filter(i => i.category === 'Messaging' || (i.category === 'Channels' && i.capabilities.includes('Messages')) || i.id === 'all').map((ch:"""

replacement = """            <div className="w-[60px] md:w-[160px] shrink-0 flex flex-col gap-2 overflow-y-auto scrollbar-hide border-r border-border pr-2">
              {[{id: "all", name: "All Messages", status: "Connected", icon: "Inbox"}].concat(mockIntegrations.filter(i => i.category === 'Messaging' || (i.category === 'Channels' && i.capabilities.includes('Messages')))).map((ch:"""

content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

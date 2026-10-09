import os

path = "app/dashboard/front-desk/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """                <Button className="col-span-2 bg-primary text-primary-foreground h-12 text-base">Complete Check-Out</Button>"""
replacement = """                <Button className="col-span-2 bg-primary text-primary-foreground h-12 text-base" onClick={() => window.location.href = `/dashboard/billing?tab=folios`}>Open Folio & Check-Out</Button>"""

content = content.replace(target, replacement)
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

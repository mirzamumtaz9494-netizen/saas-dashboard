import os

path = "app/dashboard/rates/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target1 = """{isConnected && <RotateCw className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" title="Sync now"/>}"""
replacement1 = """{isConnected && <span title="Sync now"><RotateCw className="w-3.5 h-3.5 text-muted-foreground cursor-pointer hover:text-primary transition-colors" /></span>}"""
content = content.replace(target1, replacement1)

target2 = """function CalendarTab() {
  const { role } = useTenant()"""
replacement2 = """import { useRouter as useCalendarRouter } from "next/navigation"

function CalendarTab() {
  const router = useCalendarRouter()
  const { role } = useTenant()"""
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

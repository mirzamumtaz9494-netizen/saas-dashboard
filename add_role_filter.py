import os

path = "app/dashboard/messages/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import_old = 'import { useSearchParams, useRouter, usePathname } from "next/navigation"'
import_new = 'import { useSearchParams, useRouter, usePathname } from "next/navigation"\nimport { useTenant } from "@/providers/TenantProvider"'
content = content.replace(import_old, import_new)

hook_old = """  const searchParams = useSearchParams()"""
hook_new = """  const searchParams = useSearchParams()
  const { role } = useTenant()"""
content = content.replace(hook_old, hook_new)

filter_old = """  const filteredConvs = conversations.filter(c => {
    if (activeChannel !== "all" && c.channel !== activeChannel) return false
    
    if (searchQuery) {"""

filter_new = """  const filteredConvs = conversations.filter(c => {
    if (role === "Housekeeping" && !c.tags.includes("Housekeeping") && c.assigneeId !== "S-03" && c.assigneeId !== "S-02") return false;
    
    if (activeChannel !== "all" && c.channel !== activeChannel) return false
    
    if (searchQuery) {"""
content = content.replace(filter_old, filter_new)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

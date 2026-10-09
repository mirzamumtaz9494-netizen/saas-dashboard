import os

path = "app/dashboard/documents/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('formatBytes } from "@/lib/formatters"', '} from "@/lib/formatters"')
content = content.replace(', formatBytes }', ' }')

# Modal size fix
target2 = """<Drawer open={open} onClose={onClose} title="Document Details" size="lg">"""
replacement2 = """<Drawer open={open} onClose={onClose} title="Document Details">"""
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

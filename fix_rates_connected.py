import os

path = "app/dashboard/rates/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = "const isConnected = ch.connected"
replacement = "const isConnected = ch.status === 'Connected'"
content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

import os

path = "app/dashboard/messages/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("!ch.status === 'Connected'", "ch.status !== 'Connected'")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

import os

path = "app/dashboard/rates/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target1 = "mockChannels"
replacement1 = "mockIntegrations"
content = content.replace(target1, replacement1)

target2 = "mockIntegrations.map((ch: any)"
replacement2 = "mockIntegrations.filter(i => i.category === 'Channels').map((ch: any)"
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

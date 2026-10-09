import os

path = "app/dashboard/messages/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target1 = "mockChannels"
replacement1 = "mockIntegrations"
content = content.replace(target1, replacement1)

# Messages uses a custom list that mixed email, sms, whatsapp, booking, etc.
# Actually I'll let it just use `mockIntegrations` but filter it.
target2 = "mockIntegrations.map((ch:"
replacement2 = "mockIntegrations.filter(i => i.category === 'Messaging' || (i.category === 'Channels' && i.capabilities.includes('Messages')) || i.id === 'all').map((ch:"
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

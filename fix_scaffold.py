import os

pages = [
    "front-desk", "staff", "rates", "billing", "messages", "maintenance", 
    "integrations", "documents", "reports", "settings"
]

for p in pages:
    file_path = os.path.join("app/dashboard", p, "page.tsx")
    if os.path.exists(file_path):
        with open(file_path, "r", encoding="utf-8") as f:
            content = f.read()
        
        if not content.startswith('"use client"'):
            content = '"use client"\n\n' + content
            
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)

print("Added 'use client' to all scaffolded pages!")

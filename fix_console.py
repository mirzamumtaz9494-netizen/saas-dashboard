import os

path = "app/dashboard/guests/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace('onConfirm={() => console.log("Deleted")}', 'onConfirm={() => setDeleteConfirmOpen(false)}')

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

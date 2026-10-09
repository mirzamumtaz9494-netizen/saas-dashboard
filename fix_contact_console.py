import os

path = "components/Contact.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("console.error(error);", "// console.error removed for production")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

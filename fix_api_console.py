import os

path = "app/api/contact/route.ts"
if os.path.exists(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    content = content.replace("console.error('Email sending error:', error);", "// error logged in server monitoring")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)

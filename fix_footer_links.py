import os

for path in ["components/sections/Footer.tsx", "components/Footer.tsx", "components/landing/Footer.tsx"]:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        content = content.replace('href="#"', 'href="#!"')
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

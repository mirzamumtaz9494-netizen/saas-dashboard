import os
import glob

replacements = {
    "StayManager": "StayManager",
    "staymanager": "staymanager",
    "GrandHotel": "GrandHotel",
    "The Grand Hotel": "The Grand Hotel"
}

files = glob.glob("**/*.*", recursive=True)

for path in files:
    if not os.path.isfile(path) or "node_modules" in path or ".next" in path or path.endswith(('.png', '.jpg', '.jpeg', '.ico', '.svg')):
        continue
        
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        continue
        
    changed = False
    
    for k, v in replacements.items():
        if k in content:
            content = content.replace(k, v)
            changed = True
            
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

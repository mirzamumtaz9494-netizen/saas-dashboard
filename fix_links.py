import os
import glob

files = glob.glob("**/*.ts*", recursive=True)

for path in files:
    if not os.path.isfile(path) or "node_modules" in path or ".next" in path:
        continue
        
    try:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
    except Exception:
        continue
        
    changed = False
    
    if 'href="#"' in content:
        content = content.replace('href="#"', 'href="#!"')
        changed = True
        
    if changed:
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

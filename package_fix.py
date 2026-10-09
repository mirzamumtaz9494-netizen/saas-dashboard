import json
with open("package.json", "r") as f:
    pkg = json.load(f)

if "overrides" not in pkg:
    pkg["overrides"] = {}
pkg["overrides"]["braces"] = "^3.0.3"
pkg["overrides"]["micromatch"] = "^4.0.8"

with open("package.json", "w") as f:
    json.dump(pkg, f, indent=2)

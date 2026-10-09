import os

def fix_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace the broken syntax left by the previous bash command
    content = content.replace("{\\", "{`")
    content = content.replace("\\}", "`}")
    content = content.replace("\\${", "${")
    content = content.replace("\\$", "$")
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

files = [
    "app/dashboard/guests/page.tsx",
    "app/dashboard/housekeeping/page.tsx",
    "app/dashboard/page.tsx",
    "app/dashboard/reservations/page.tsx"
]

for f in files:
    fix_file(f)

print("Fixed backticks!")

import os

path = "components/layout/DashboardSidebar.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# We need to turn SidebarContent into a normal variable or render function, 
# not a component declared inside the render, or just inline it.
# Wait, it's just a chunk of JSX. I can change `const SidebarContent = () => (` to `const sidebarContent = (`
# and replace `<SidebarContent />` with `{sidebarContent}`.

content = content.replace("const SidebarContent = () => (", "const sidebarContent = (")
content = content.replace("  )\n\n  return (", "  );\n\n  return (")
content = content.replace("<SidebarContent />", "{sidebarContent}")

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

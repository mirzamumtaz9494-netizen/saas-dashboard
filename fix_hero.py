import os

path = "components/landing/Hero.tsx"
if os.path.exists(path):
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Replace signup with dashboard
    content = content.replace('href="/signup"', 'href="/dashboard"')
    content = content.replace('Start Your Free Trial', 'View Live Dashboard')
    
    # Replace demo with another link or keep it
    content = content.replace('href="/demo"', 'href="/dashboard"')
    content = content.replace('Book a Demo', 'Explore Features')

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
        
path_nav = "components/landing/Navbar.tsx"
if os.path.exists(path_nav):
    with open(path_nav, "r", encoding="utf-8") as f:
        nav = f.read()
    
    nav = nav.replace('href="/login"', 'href="/dashboard"')
    nav = nav.replace('href="/signup"', 'href="/dashboard"')
    nav = nav.replace('Start Free Trial', 'View Dashboard')
    
    with open(path_nav, "w", encoding="utf-8") as f:
        f.write(nav)

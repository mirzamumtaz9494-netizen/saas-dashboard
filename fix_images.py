import os

replacements = {
    '/images/dashboard-mockup.jpg': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80',
    '/images/footer-lock.jpg': 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&w=600&q=80',
    '/images/footer-mobile.jpg': 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80',
    '/images/footer-dashboard.jpg': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80'
}

for path in ["components/landing/DashboardPreview.tsx", "components/landing/FinalCTA.tsx"]:
    if os.path.exists(path):
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
            
        for k, v in replacements.items():
            content = content.replace(k, v)
            
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)

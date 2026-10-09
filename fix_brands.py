import os
import glob

replacements = {
    "Booking.com": "GlobalOTA",
    "Airbnb": "VacationRentals",
    "Expedia": "TravelNet",
    "Stripe": "PayGateway",
    "QuickBooks": "CloudBooks",
    "Xero": "AcctPlus",
    "Agoda": "AsiaTravel",
    "PayPal": "DigitalWallet"
}

files_to_check = glob.glob("**/*.ts*", recursive=True)

for path in files_to_check:
    if not os.path.isfile(path) or "node_modules" in path or ".next" in path:
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

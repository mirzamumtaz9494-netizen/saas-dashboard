import os

pages = [
    {"dir": "front-desk", "title": "Front Desk Operations", "desc": "Manage daily check-ins, check-outs, and guest services.", "icon": "ConciergeBell"},
    {"dir": "staff", "title": "Staff & Shifts", "desc": "Schedule employees, track hours, and manage roles.", "icon": "UserCheck"},
    {"dir": "rates", "title": "Rates & Availability", "desc": "Manage pricing strategies, seasonal rates, and room blocks.", "icon": "LineChart"},
    {"dir": "billing", "title": "Billing & Invoices", "desc": "Handle folios, process payments, and track outstanding balances.", "icon": "CreditCard"},
    {"dir": "messages", "title": "Guest Messages", "desc": "Communicate directly with guests across multiple channels.", "icon": "MessageSquare"},
    {"dir": "maintenance", "title": "Asset Maintenance", "desc": "Track work orders, manage repairs, and monitor asset health.", "icon": "Wrench"},
    {"dir": "integrations", "title": "Integrations", "desc": "Connect with OTAs, payment gateways, and accounting software.", "icon": "LinkIcon"},
    {"dir": "documents", "title": "Documents", "desc": "Store standard operating procedures, contracts, and guides.", "icon": "Files"},
    {"dir": "reports", "title": "Reports", "desc": "Generate financial, occupancy, and operational reports.", "icon": "FileText"},
    {"dir": "settings", "title": "Settings", "desc": "Configure property details, users, and system preferences.", "icon": "Settings"},
]

template = """import {{ {icon} }} from "lucide-react"
import {{ EmptyState }} from "@/components/ui/Feedback"
import {{ Button }} from "@/components/ui/Button"

export default function Page() {{
  return (
    <div className="flex flex-col gap-6 h-full pb-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-foreground">{title}</h1>
          <p className="text-sm text-muted-foreground mt-1">{desc}</p>
        </div>
      </div>
      <div className="flex-1 bg-card border border-border rounded-xl shadow-sm p-8 flex items-center justify-center">
        <EmptyState 
          icon={{{icon}}}
          title="{title} Module Coming Soon"
          description="This section is currently being provisioned for your tenant. Check back later."
          action={{<Button>Notify Me</Button>}}
        />
      </div>
    </div>
  )
}}
"""

for page in pages:
    dir_path = os.path.join("app/dashboard", page["dir"])
    os.makedirs(dir_path, exist_ok=True)
    
    file_path = os.path.join(dir_path, "page.tsx")
    content = template.format(
        icon=page["icon"],
        title=page["title"],
        desc=page["desc"]
    ).replace("LinkIcon", "Link") # Handle LinkIcon alias in import vs usage
    
    # Fix the Link import for lucide
    if page["icon"] == "LinkIcon":
        content = content.replace('import { LinkIcon } from "lucide-react"', 'import { Link as LinkIcon } from "lucide-react"')
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)

print("Scaffolded missing pages!")

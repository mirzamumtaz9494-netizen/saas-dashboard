import os

path = "app/dashboard/integrations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target1 = """  MessageSquare, Phone, Mail, Key, Thermometer, Code, Calendar, CheckCircle2, 
  AlertTriangle, XCircle, Clock, Search, RotateCw, PauseCircle, Settings, X, Plus, AlertCircle
} from "lucide-react\""""

replacement1 = """  MessageSquare, Phone, Mail, Key, Thermometer, Code, Calendar, CheckCircle2, 
  AlertTriangle, XCircle, Clock, Search, RotateCw, PauseCircle, Settings, X, Plus, AlertCircle,
  Lock, MoreVertical
} from "lucide-react\""""

content = content.replace(target1, replacement1)

target2 = """<Drawer open={configureDrawerOpen} onClose={closeDrawers} title={`${selectedIntegration?.name} Configuration`} size="lg">"""
replacement2 = """<Drawer open={configureDrawerOpen} onClose={closeDrawers} title={`${selectedIntegration?.name} Configuration`}>"""
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

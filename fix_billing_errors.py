import os

path = "app/dashboard/billing/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# Fix size prop on Drawer
target1 = """<Drawer open={invoiceDrawerOpen} onClose={closeInvoice} title={`Invoice ${selectedInvoice?.id || ''}`} size="lg">"""
replacement1 = """<Drawer open={invoiceDrawerOpen} onClose={closeInvoice} title={`Invoice ${selectedInvoice?.id || ''}`}>"""
content = content.replace(target1, replacement1)

# Fix format import
target2 = """import { 
  isBefore, isAfter, subDays, startOfDay, endOfDay, parseISO, isSameDay
} from "date-fns\""""
replacement2 = """import { 
  isBefore, isAfter, subDays, startOfDay, endOfDay, parseISO, isSameDay, format
} from "date-fns\""""
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

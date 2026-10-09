import os

path = "app/dashboard/reservations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Balance</div>
                <div className="font-semibold text-destructive">{formatCurrency(selectedBooking.balance)}</div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">"""
replacement = """              <div className="bg-muted/30 p-3 rounded-lg border border-border">
                <div className="text-xs text-muted-foreground mb-1">Balance</div>
                <div className="font-semibold text-destructive">{formatCurrency(selectedBooking.balance)}</div>
                <Button variant="link" className="p-0 h-auto text-xs mt-1" onClick={() => window.location.href = `/dashboard/billing?tab=invoices`}>View Invoice &rarr;</Button>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-border">"""

content = content.replace(target, replacement)
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

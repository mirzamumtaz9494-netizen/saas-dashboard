import os

path = "app/dashboard/reservations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """                <div className="flex gap-2">
                  <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">{selectedBooking.paymentState}</Badge>
                </div>
              </div>
              
            </div>"""
replacement = """                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">{selectedBooking.paymentState}</Badge>
                  </div>
                  <Button variant="link" size="sm" className="h-6 p-0 justify-start" onClick={() => window.location.href = `/dashboard/billing?tab=invoices`}>View Invoice &rarr;</Button>
                </div>
              </div>
              
            </div>"""

if target in content:
    content = content.replace(target, replacement)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
else:
    print("Target not found.")

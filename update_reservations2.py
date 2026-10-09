import os

path = "app/dashboard/reservations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import_str = 'import { mockReservations, mockRooms } from "@/lib/mock-data"'
import_str_new = 'import { mockReservations, mockRooms, mockWorkOrders } from "@/lib/mock-data"'
content = content.replace(import_str, import_str_new)

target = "</div>\n                    )}\n                  </div>"
replacement = """</div>
                    )}
                    {mockWorkOrders.some(w => w.location === `Room ${room.number}` && w.ooo && w.status !== "Resolved") && (
                      <div 
                        className="absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm z-10 bg-muted/90 border-border text-muted-foreground flex items-center justify-center font-bold"
                        style={{ left: `0%`, width: `21.42%` }}
                      >
                        BLOCKED / OOO
                      </div>
                    )}
                  </div>"""

content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

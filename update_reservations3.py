import os

path = "app/dashboard/reservations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    lines = f.readlines()

new_import = 'import { mockReservations, mockRooms, mockWorkOrders } from "@/lib/mock-data"\n'
for i, line in enumerate(lines):
    if 'import { mockReservations, mockRooms } from "@/lib/mock-data"' in line:
        lines[i] = new_import
        break

new_lines = []
for line in lines:
    new_lines.append(line)
    if "</div>" in line and ")}<!-- OOO END -->" in line: # Just in case it's already there
        pass
    elif '<div className="text-[10px] opacity-80">{booking.status}</div>' in line:
        # Wait, the end of the block is a few lines down
        pass
        
with open(path, "w", encoding="utf-8") as f:
    f.writelines(new_lines)

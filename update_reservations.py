import os

path = "app/dashboard/reservations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

import_str = 'import { mockReservations, mockRooms } from "@/lib/mock-data"'
import_str_new = 'import { mockReservations, mockRooms, mockWorkOrders } from "@/lib/mock-data"'
content = content.replace(import_str, import_str_new)

old_block = """                  <div key={room.id} className="flex h-14 border-b border-border group relative">
                    {/* Empty Cells */}
                    {days.map((d, i) => (
                      <div key={i} className="flex-1 border-r border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setAddModalOpen(true)} />
                    ))}
                    
                    {/* Mock Booking Block if exists */}
                    {booking && (
                      <div 
                        onClick={() => handleBookingClick(booking)}
                        className={`absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[1.02] z-10
                          ${booking.status === 'Checked In' ? 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300' : 
                            booking.status === 'Expected' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-300' : 
                            'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'}`}
                        style={{ left: `${(parseInt(room.id.replace(/\D/g, '')) % 3) * 7.14}%`, width: `${(2 + (parseInt(room.id.replace(/\D/g, '')) % 3)) * 7.14}%` }}
                      >
                        <div className="font-semibold whitespace-nowrap">{booking.guestId}</div>
                        <div className="text-[10px] opacity-80">{booking.status}</div>
                      </div>
                    )}
                  </div>"""

new_block = """                  <div key={room.id} className="flex h-14 border-b border-border group relative">
                    {/* Empty Cells */}
                    {days.map((d, i) => (
                      <div key={i} className="flex-1 border-r border-border hover:bg-muted/30 cursor-pointer transition-colors" onClick={() => setAddModalOpen(true)} />
                    ))}
                    
                    {/* Mock Booking Block if exists */}
                    {booking && (
                      <div 
                        onClick={() => handleBookingClick(booking)}
                        className={`absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm cursor-pointer transition-transform hover:scale-[1.02] z-10
                          ${booking.status === 'Checked In' ? 'bg-green-500/20 border-green-500/50 text-green-700 dark:text-green-300' : 
                            booking.status === 'Expected' ? 'bg-yellow-500/20 border-yellow-500/50 text-yellow-700 dark:text-yellow-300' : 
                            'bg-blue-500/20 border-blue-500/50 text-blue-700 dark:text-blue-300'}`}
                        style={{ left: `${(parseInt(room.id.replace(/\\D/g, '')) % 3) * 7.14}%`, width: `${(2 + (parseInt(room.id.replace(/\\D/g, '')) % 3)) * 7.14}%` }}
                      >
                        <div className="font-semibold whitespace-nowrap">{booking.guestId}</div>
                        <div className="text-[10px] opacity-80">{booking.status}</div>
                      </div>
                    )}

                    {/* Mock OOO Block from work orders */}
                    {mockWorkOrders.some(w => w.location === `Room ${room.number}` && w.ooo && w.status !== "Resolved") && (
                      <div 
                        className="absolute top-1.5 h-11 rounded-md border text-xs p-2 overflow-hidden shadow-sm z-10 bg-muted/90 border-border text-muted-foreground flex items-center justify-center font-bold"
                        style={{ left: `0%`, width: `21.42%` }}
                      >
                        BLOCKED / OOO
                      </div>
                    )}
                  </div>"""

content = content.replace(old_block, new_block)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

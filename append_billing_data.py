import os

path = "lib/mock-data/index.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_data = """
export const mockInvoices = [
  { 
    id: "INV-3091", status: "Paid", guestId: "G-102", bookingId: "RES-1001", roomId: "R-101", folioId: null,
    issueDate: subDays(today, 5).toISOString(), dueDate: subDays(today, 2).toISOString(), 
    amount: 850, paid: 850, balance: 0, paymentMethod: "Credit Card", source: "Direct", syncStatus: "Synced",
    lineItems: [
      { id: "li-1", description: "Room Night (Standard Queen) x2", amount: 750, taxes: 50 },
      { id: "li-2", description: "Minibar", amount: 45, taxes: 5 }
    ],
    activity: [
      { time: subDays(today, 5).toISOString(), action: "Created", user: "System" },
      { time: subDays(today, 5).toISOString(), action: "Sent", user: "Sarah Jenkins" },
      { time: subDays(today, 2).toISOString(), action: "Paid", user: "Guest (Stripe)" }
    ]
  },
  { 
    id: "INV-3092", status: "Pending", guestId: "G-103", bookingId: "RES-1002", roomId: null, folioId: "FOL-223",
    issueDate: today.toISOString(), dueDate: addDays(today, 7).toISOString(), 
    amount: 1200, paid: 0, balance: 1200, paymentMethod: "Pending", source: "Booking.com", syncStatus: "Pending",
    lineItems: [
      { id: "li-3", description: "Room Night (Deluxe King) x3", amount: 1100, taxes: 100 }
    ],
    activity: [
      { time: today.toISOString(), action: "Created", user: "David Davidson" }
    ]
  },
  { 
    id: "INV-3093", status: "Partially Paid", guestId: "G-104", bookingId: "RES-1003", roomId: "R-201", folioId: null,
    issueDate: subDays(today, 2).toISOString(), dueDate: addDays(today, 5).toISOString(), 
    amount: 2400, paid: 1200, balance: 1200, paymentMethod: "Bank Transfer", source: "Expedia", syncStatus: "Synced",
    lineItems: [
      { id: "li-4", description: "Room Night (Executive Suite) x4", amount: 2200, taxes: 200 }
    ],
    activity: [
      { time: subDays(today, 2).toISOString(), action: "Created", user: "System" },
      { time: subDays(today, 1).toISOString(), action: "Paid (Partial)", user: "Maria Garcia" }
    ]
  },
  { 
    id: "INV-3094", status: "Pending", guestId: "G-105", bookingId: "RES-1004", roomId: "R-402", folioId: null,
    issueDate: subDays(today, 30).toISOString(), dueDate: subDays(today, 15).toISOString(), 
    amount: 450, paid: 0, balance: 450, paymentMethod: "Pending", source: "Direct", syncStatus: "Error",
    lineItems: [
      { id: "li-5", description: "Room Night (Standard Queen) x2", amount: 400, taxes: 50 }
    ],
    activity: [
      { time: subDays(today, 30).toISOString(), action: "Created", user: "System" },
      { time: subDays(today, 10).toISOString(), action: "Reminder sent", user: "System" }
    ]
  },
  { 
    id: "INV-3095", status: "Refunded", guestId: "G-102", bookingId: "RES-1001", roomId: null, folioId: "FOL-224",
    issueDate: subDays(today, 40).toISOString(), dueDate: subDays(today, 30).toISOString(), 
    amount: 150, paid: 150, balance: 0, paymentMethod: "Credit Card", source: "Direct", syncStatus: "Synced",
    lineItems: [
      { id: "li-6", description: "Spa Services", amount: 135, taxes: 15 }
    ],
    activity: [
      { time: subDays(today, 40).toISOString(), action: "Created", user: "Sarah Jenkins" },
      { time: subDays(today, 39).toISOString(), action: "Paid", user: "Guest (Stripe)" },
      { time: subDays(today, 35).toISOString(), action: "Refunded", user: "Sarah Jenkins" }
    ]
  }
];

export const mockPayments = [
  { id: "PAY-9001", date: subDays(today, 2).toISOString(), method: "Credit Card", amount: 850, reference: "ch_1Nxxxxx", collectedBy: "Stripe", source: "Online", status: "Completed", invoiceId: "INV-3091" },
  { id: "PAY-9002", date: subDays(today, 1).toISOString(), method: "Bank Transfer", amount: 1200, reference: "TXN-88219", collectedBy: "Maria Garcia", source: "Manual", status: "Completed", invoiceId: "INV-3093" },
  { id: "PAY-9003", date: subDays(today, 39).toISOString(), method: "Credit Card", amount: 150, reference: "ch_2Nxxxxx", collectedBy: "Stripe", source: "Online", status: "Completed", invoiceId: "INV-3095" }
];

export const mockRefunds = [
  { id: "REF-101", status: "Processed", amount: 150, reason: "Guest complaint regarding spa service", invoiceId: "INV-3095", date: subDays(today, 35).toISOString() }
];

export const mockFolios = [
  { id: "FOL-223", bookingId: "RES-1002", status: "Open", balance: 1200, guestId: "G-103", charges: 1200, payments: 0 },
  { id: "FOL-224", bookingId: "RES-1001", status: "Closed", balance: 0, guestId: "G-102", charges: 150, payments: 150 }
];
"""

if "mockInvoices" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(new_data)

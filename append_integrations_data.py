import os

path = "lib/mock-data/index.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_data = """
export const mockIntegrations = [
  // Channels
  { id: "int-direct", category: "Channels", name: "Direct Website", description: "Built-in booking engine.", status: "Connected", capabilities: ["Inventory", "Rates", "Reservations"], lastSync: subHours(today, 1).toISOString(), icon: "Globe", warning: null },
  { id: "int-booking", category: "Channels", name: "Booking.com", description: "World's largest OTA.", status: "Warning", capabilities: ["Inventory", "Rates", "Reservations", "Messages"], lastSync: subMinutes(today, 15).toISOString(), icon: "Map", warning: "2 room types not mapped" },
  { id: "int-expedia", category: "Channels", name: "Expedia", description: "Global travel platform.", status: "Connected", capabilities: ["Inventory", "Rates", "Reservations"], lastSync: subHours(today, 2).toISOString(), icon: "Plane", warning: null },
  { id: "int-airbnb", category: "Channels", name: "Airbnb", description: "Vacation rental platform.", status: "Paused", capabilities: ["Inventory", "Rates", "Reservations", "Messages"], lastSync: subDays(today, 1).toISOString(), icon: "Home", warning: null },
  { id: "int-agoda", category: "Channels", name: "Agoda", description: "Asia-focused travel platform.", status: "Not connected", capabilities: ["Inventory", "Rates", "Reservations"], lastSync: null, icon: "MapPin", warning: null },
  
  // Payments
  { id: "int-stripe", category: "Payments", name: "Stripe", description: "Global payment processing.", status: "Connected", capabilities: ["Deposits", "Refunds", "Payment Links"], lastSync: subMinutes(today, 5).toISOString(), icon: "CreditCard", warning: null },
  { id: "int-paypal", category: "Payments", name: "PayPal", description: "Online payments system.", status: "Not connected", capabilities: ["Deposits", "Refunds"], lastSync: null, icon: "Wallet", warning: null },
  
  // Accounting
  { id: "int-qbo", category: "Accounting", name: "QuickBooks", description: "Accounting software for SMBs.", status: "Error", capabilities: ["Invoices", "Payments", "Taxes"], lastSync: subHours(today, 24).toISOString(), icon: "Calculator", warning: "Auth token expired" },
  { id: "int-xero", category: "Accounting", name: "Xero", description: "Cloud-based accounting.", status: "Not connected", capabilities: ["Invoices", "Payments"], lastSync: null, icon: "FileText", warning: null },
  
  // Messaging
  { id: "int-twilio", category: "Messaging", name: "Twilio SMS", description: "Programmable SMS.", status: "Connected", capabilities: ["SMS", "Automations"], lastSync: subMinutes(today, 2).toISOString(), icon: "MessageSquare", warning: null },
  { id: "int-whatsapp", category: "Messaging", name: "WhatsApp Business", description: "Direct guest messaging.", status: "Connected", capabilities: ["Messages", "Templates"], lastSync: subMinutes(today, 1).toISOString(), icon: "Phone", warning: null },
  { id: "int-smtp", category: "Messaging", name: "SMTP Email", description: "Custom email server.", status: "Connected", capabilities: ["Email", "Marketing"], lastSync: subHours(today, 1).toISOString(), icon: "Mail", warning: null },
  
  // Access & IoT
  { id: "int-salto", category: "Access & IoT", name: "Salto KS", description: "Cloud-based access control.", status: "Coming soon", capabilities: ["Key Cards", "Mobile Keys"], lastSync: null, icon: "Key", warning: null },
  { id: "int-nest", category: "Access & IoT", name: "Nest Thermostats", description: "Smart climate control.", status: "Not connected", capabilities: ["HVAC Telemetry", "Energy Savings"], lastSync: null, icon: "Thermometer", warning: null },
  
  // Developer
  { id: "int-webhooks", category: "Developer", name: "Webhooks", description: "Event-driven callbacks.", status: "Connected", capabilities: ["Real-time events"], lastSync: subMinutes(today, 10).toISOString(), icon: "Code", warning: null },
  { id: "int-ical", category: "Developer", name: "iCal Feeds", description: "Calendar exports.", status: "Connected", capabilities: ["Availability export"], lastSync: subHours(today, 4).toISOString(), icon: "Calendar", warning: null }
];
"""

if "mockIntegrations" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(new_data)

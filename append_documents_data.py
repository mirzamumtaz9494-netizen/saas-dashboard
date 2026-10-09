import os

path = "lib/mock-data/index.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_data = """
export const mockDocuments = [
  { id: "doc-1", name: "Front Desk Check-in SOP", category: "Standard Operating Procedures", version: "v2.1", owner: "stf-1", lastModified: subDays(today, 5).toISOString(), type: "PDF", size: 2450000, status: "Current", effectiveDate: subDays(today, 100).toISOString(), expiryDate: addDays(today, 265).toISOString(), tags: ["Front Desk", "SOP"] },
  { id: "doc-2", name: "Housekeeping Room Inspection Checklist", category: "Standard Operating Procedures", version: "v1.0", owner: "stf-2", lastModified: subDays(today, 15).toISOString(), type: "PDF", size: 1200000, status: "Current", effectiveDate: subDays(today, 15).toISOString(), expiryDate: addDays(today, 350).toISOString(), tags: ["Housekeeping"] },
  { id: "doc-3", name: "Cancellation and No-show Policy", category: "Policies", version: "v3.4", owner: "stf-1", lastModified: subDays(today, 45).toISOString(), type: "DOCX", size: 850000, status: "Current", effectiveDate: subDays(today, 45).toISOString(), expiryDate: addDays(today, 320).toISOString(), tags: ["Policy", "Guest"] },
  { id: "doc-4", name: "Fire Safety Certificate", category: "Compliance & Licenses", version: "v1.0", owner: "stf-1", lastModified: subDays(today, 300).toISOString(), type: "PDF", size: 4500000, status: "Expiring soon", effectiveDate: subDays(today, 300).toISOString(), expiryDate: addDays(today, 15).toISOString(), tags: ["Safety", "Compliance"] },
  { id: "doc-5", name: "Elevator Maintenance Contract", category: "Vendor & Asset Manuals", version: "v1.2", owner: "stf-3", lastModified: subDays(today, 400).toISOString(), type: "PDF", size: 3100000, status: "Expired", effectiveDate: subDays(today, 400).toISOString(), expiryDate: subDays(today, 5).toISOString(), tags: ["Vendor", "Maintenance"] },
  { id: "doc-6", name: "Booking.com Partner Agreement", category: "Contracts", version: "v5.0", owner: "stf-1", lastModified: subDays(today, 20).toISOString(), type: "PDF", size: 6800000, status: "Current", effectiveDate: subDays(today, 20).toISOString(), expiryDate: addDays(today, 700).toISOString(), tags: ["OTA", "Contract"] },
  { id: "doc-7", name: "Employee Handbook 2024", category: "HR", version: "v2.0", owner: "stf-1", lastModified: subDays(today, 10).toISOString(), type: "PDF", size: 15400000, status: "Current", effectiveDate: subDays(today, 10).toISOString(), expiryDate: addDays(today, 355).toISOString(), tags: ["HR", "Policy"] },
  { id: "doc-8", name: "Guest Registration Card", category: "Guest Forms & Terms", version: "v1.1", owner: "stf-1", lastModified: subDays(today, 60).toISOString(), type: "PDF", size: 450000, status: "Current", effectiveDate: subDays(today, 60).toISOString(), expiryDate: addDays(today, 305).toISOString(), tags: ["Form", "Guest"] },
  { id: "doc-9", name: "GDPR Privacy Notice", category: "Policies", version: "v1.5", owner: "stf-1", lastModified: subDays(today, 200).toISOString(), type: "PDF", size: 900000, status: "Current", effectiveDate: subDays(today, 200).toISOString(), expiryDate: addDays(today, 165).toISOString(), tags: ["Legal", "Privacy"] },
  { id: "doc-10", name: "Pool Maintenance Guide", category: "Property Guides", version: "v1.0", owner: "stf-3", lastModified: subDays(today, 2).toISOString(), type: "PDF", size: 2100000, status: "Draft", effectiveDate: null, expiryDate: null, tags: ["Maintenance", "Guide"] }
];

export const mockTemplates = [
  { id: "tpl-1", name: "Guest Registration Card", category: "Guest Forms & Terms", description: "Standard check-in form with terms and conditions." },
  { id: "tpl-2", name: "Damage Waiver", category: "Guest Forms & Terms", description: "Liability and damage waiver for specific bookings." },
  { id: "tpl-3", name: "Late Checkout Request", category: "Guest Forms & Terms", description: "Form for approving and charging late checkouts." },
  { id: "tpl-4", name: "Incident Report", category: "Standard Operating Procedures", description: "Standard form for reporting workplace incidents or guest issues." }
];

export const mockSignatures = [
  { id: "sig-1", docId: "doc-8", signer: "John Doe", status: "Signed", sentAt: subDays(today, 2).toISOString(), signedAt: subDays(today, 2).toISOString() },
  { id: "sig-2", docId: "doc-6", signer: "Booking.com Rep", status: "Awaiting signature", sentAt: subDays(today, 1).toISOString(), signedAt: null }
];

export const mockAcknowledgments = [
  { id: "ack-1", docId: "doc-7", user: "stf-2", status: "Acknowledged", date: subDays(today, 5).toISOString() },
  { id: "ack-2", docId: "doc-7", user: "stf-3", status: "Pending", date: null }
];
"""

if "mockDocuments" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(new_data)

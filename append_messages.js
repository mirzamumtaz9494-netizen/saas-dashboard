const fs = require("fs");
const path = "./lib/mock-data/index.ts";
let content = fs.readFileSync(path, "utf8");

const mockMessagesData = `

export const mockChannels = [
  { id: "all", name: "All Messages", icon: "inbox", connected: true },
  { id: "sms", name: "SMS", icon: "message-square", connected: true },
  { id: "email", name: "Email", icon: "mail", connected: true },
  { id: "whatsapp", name: "WhatsApp", icon: "phone", connected: true },
  { id: "booking", name: "Booking.com", icon: "b-logo", connected: true },
  { id: "airbnb", name: "Airbnb", icon: "a-logo", connected: false },
  { id: "expedia", name: "Expedia", icon: "e-logo", connected: true },
  { id: "direct", name: "Direct/Web", icon: "globe", connected: true },
];

export const mockTemplates = [
  { id: "T1", title: "Welcome", content: "Hi {guest_name}, welcome to {hotel_name}! We are thrilled to have you. Your check-in date is {checkin_date}." },
  { id: "T2", title: "Wi-Fi Info", content: "Hello {guest_name}, the Wi-Fi network is '{wifi_name}' and the password is '{wifi_password}'." },
  { id: "T3", title: "Check-in Instructions", content: "Hi {guest_name}, your room {room} is ready! Please stop by the front desk for your physical key." },
  { id: "T4", title: "Checkout Instructions", content: "We hope you enjoyed your stay! Check-out is at 11 AM on {checkout_date}. Safe travels!" },
  { id: "T5", title: "Late Checkout", content: "Hi {guest_name}, we have approved your late checkout request for 1 PM." },
  { id: "T6", title: "Review Request", content: "Thanks for staying with us! If you have a moment, we'd love your feedback: [link]" },
  { id: "T7", title: "Directions", content: "We are located at 123 Main St. When you arrive, you can pull into the loading zone." },
  { id: "T8", title: "Parking", content: "Parking is available in the garage next door for $25/night. Validate your ticket at the front desk." },
];

export const mockConversations = [
  { 
    id: "CONV-1", guestId: "G-102", channel: "sms", status: "Open", assigneeId: null, priority: "High", tags: ["VIP", "Request"],
    messages: [
      { id: "M1-1", senderType: "guest", text: "Hi, is there any way I could get an extra set of feather-free pillows?", time: subHours(today, 1).toISOString(), read: false },
    ]
  },
  { 
    id: "CONV-2", guestId: "G-103", channel: "booking", status: "Pending", assigneeId: "S-04", priority: "Normal", tags: ["Check-in"],
    messages: [
      { id: "M2-1", senderType: "guest", text: "Hello! My flight was delayed, I will be arriving around 10 PM tonight.", time: subHours(today, 5).toISOString(), read: true },
      { id: "M2-2", senderType: "staff", text: "Hi Jacob, thanks for letting us know! We have noted your late arrival. Safe travels!", time: subHours(today, 4).toISOString(), read: true, delivery: "Read", staffId: "S-04" },
      { id: "M2-3", senderType: "system", text: "Internal note: Alerted night auditor about 10 PM arrival.", time: subHours(today, 3.9).toISOString(), isInternal: true, staffId: "S-04" },
    ]
  },
  { 
    id: "CONV-3", guestId: "G-104", channel: "email", status: "Resolved", assigneeId: "S-01", priority: "Normal", tags: [],
    messages: [
      { id: "M3-1", senderType: "guest", text: "Could I please get a copy of my final folio?", time: subDays(today, 2).toISOString(), read: true },
      { id: "M3-2", senderType: "staff", text: "Hi Leslie, attached is your folio. Thank you for staying with us!", time: subDays(today, 1).toISOString(), read: true, delivery: "Delivered", staffId: "S-01", hasAttachment: true },
    ]
  },
  { 
    id: "CONV-4", guestId: "G-102", channel: "whatsapp", status: "Open", assigneeId: null, priority: "Normal", tags: [],
    messages: [
      { id: "M4-1", senderType: "staff", text: "Hi Eleanor, how is your stay going so far? Let us know if you need anything.", time: subHours(today, 2).toISOString(), read: true, delivery: "Read", staffId: "S-04" },
      { id: "M4-2", senderType: "guest", text: "Everything is wonderful, thank you!", time: subMinutes(today, 5).toISOString(), read: false },
    ]
  },
];

export const mockAutomations = [
  { id: "AUTO-1", name: "Pre-arrival Welcome", trigger: "24h before check-in", channel: "email", templateId: "T1", enabled: true },
  { id: "AUTO-2", name: "Checkout Instructions", trigger: "8 AM on checkout day", channel: "sms", templateId: "T4", enabled: true },
  { id: "AUTO-3", name: "Review Request", trigger: "1 day after checkout", channel: "email", templateId: "T6", enabled: false },
];
`;

if (!content.includes("mockConversations")) {
  fs.writeFileSync(path, content + mockMessagesData);
}

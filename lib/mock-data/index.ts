import { addDays, subDays, setHours, setMinutes, subHours, subMinutes } from "date-fns";

const today = new Date();
const todayAt = (hours: number, mins: number = 0) => setMinutes(setHours(today, hours), mins).toISOString();

export const mockGuests = [
  { id: "G-102", name: "Eleanor Pena", email: "eleanor.pena@example.com", phone: "+1 (555) 0192", country: "US", lastStay: subDays(today, 15).toISOString(), totalStays: 4, totalSpend: 4200, vip: true, avatar: "EP", tags: ["VIP", "Repeat"], status: "VIP", specialRequest: "Feather-free pillows" },
  { id: "G-103", name: "Jacob Jones", email: "jacob.jones@example.com", phone: "+44 7700 900077", country: "GB", lastStay: subDays(today, 30).toISOString(), totalStays: 1, totalSpend: 850, vip: false, avatar: "JJ", tags: ["Corporate"], status: "Standard", specialRequest: "Late check-in (10 PM)" },
  { id: "G-104", name: "Leslie Alexander", email: "leslie.a@example.com", phone: "+1 (555) 0124", country: "CA", lastStay: subDays(today, 45).toISOString(), totalStays: 12, totalSpend: 14500, vip: true, avatar: "LA", tags: ["VIP", "Corporate"], status: "VIP", specialRequest: "High floor" },
];

export const mockRooms = [
  { id: "R-101", number: "101", type: "rt-1", floor: 1, status: "Clean", condition: "Good" },
  { id: "R-102", number: "102", type: "rt-1", floor: 1, status: "Dirty", condition: "Good" },
  { id: "R-103", number: "103", type: "rt-2", floor: 1, status: "Clean", condition: "Maintenance" },
  { id: "R-201", number: "201", type: "rt-3", floor: 2, status: "Clean", condition: "Good" },
  { id: "R-202", number: "202", type: "rt-2", floor: 2, status: "Inspected", condition: "Good" },
  { id: "R-203", number: "203", type: "rt-2", floor: 2, status: "OOO", condition: "Broken AC" },
  { id: "R-402", number: "402", type: "rt-3", floor: 4, status: "OOO", condition: "AC Failure" },
];

export const mockReservations = [
  { id: "RES-1001", guestId: "G-102", roomId: "R-101", checkIn: subDays(today, 2).toISOString(), checkOut: today.toISOString(), status: "Expected Departure", source: "Direct", totalAmount: 850, balance: 45, paymentState: "Balance due" },
  { id: "RES-1002", guestId: "G-103", roomId: "R-102", checkIn: today.toISOString(), checkOut: addDays(today, 3).toISOString(), status: "Expected Arrival", source: "Booking.com", totalAmount: 1200, balance: 1200, paymentState: "Deposit held" },
  { id: "RES-1003", guestId: "G-104", roomId: "R-201", checkIn: subDays(today, 1).toISOString(), checkOut: addDays(today, 5).toISOString(), status: "Checked In", source: "Expedia", totalAmount: 2400, balance: 0, paymentState: "Paid" },
];

export const mockStaff = [
  { id: "S-01", name: "Sarah Jenkins", role: "General Manager", department: "Management", avatar: "SJ", phone: "+1 (555) 123-4567", email: "sarah.j@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 35, skills: ["First Aid", "Fire Safety"] },
  { id: "S-02", name: "Maria Garcia", role: "Housekeeping Lead", department: "Housekeeping", avatar: "MG", phone: "+1 (555) 234-5678", email: "maria.g@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 20, skills: ["Biohazard"] },
  { id: "S-03", name: "John Smith", role: "Maintenance Tech", department: "Maintenance", avatar: "JS", phone: "+1 (555) 345-6789", email: "john.s@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 25, skills: ["Elevator Tech", "HVAC Certified"] },
  { id: "S-04", name: "David Davidson", role: "Front Desk Agent", department: "Front Desk", avatar: "DD", phone: "+1 (555) 456-7890", email: "david.d@vpro.com", type: "Part-Time", status: "Active", contractedHours: 24, hourlyRate: 18, skills: ["Conflict Resolution"] },
  { id: "S-05", name: "Nathan Roberts", role: "Front Desk Agent", department: "Front Desk", avatar: "NR", phone: "+1 (555) 567-8901", email: "nathan.r@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 18, skills: [] },
  { id: "S-06", name: "Dennis Miller", role: "Maintenance Tech", department: "Maintenance", avatar: "DM", phone: "+1 (555) 678-9012", email: "dennis.m@vpro.com", type: "Part-Time", status: "On Leave", contractedHours: 20, hourlyRate: 22, skills: ["Plumbing"] },
  { id: "S-07", name: "Anil Mehta", role: "Front Desk Agent", department: "Front Desk", avatar: "AM", phone: "+1 (555) 789-0123", email: "anil.m@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 18, skills: ["First Aid"] },
  { id: "S-08", name: "Rosa Diaz", role: "Housekeeper", department: "Housekeeping", avatar: "RD", phone: "+1 (555) 890-1234", email: "rosa.d@vpro.com", type: "Part-Time", status: "Active", contractedHours: 32, hourlyRate: 17, skills: [] }
];


const d = today;
const startOfWeek = addDays(d, -d.getDay() + 1); // Monday
const getDay = (offset: number) => addDays(startOfWeek, offset);

export const mockShifts = [
  // Front Desk Mon (Offset 0)
  { id: "SH-1", staffId: "S-04", department: "Front Desk", start: setMinutes(setHours(getDay(0), 7), 0).toISOString(), end: setMinutes(setHours(getDay(0), 15), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-2", staffId: "S-05", department: "Front Desk", start: setMinutes(setHours(getDay(0), 14), 0).toISOString(), end: setMinutes(setHours(getDay(0), 22), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-3", staffId: "S-07", department: "Front Desk", start: setMinutes(setHours(getDay(0), 22), 0).toISOString(), end: setMinutes(setHours(getDay(1), 6), 0).toISOString(), status: "Published", breakMins: 30 },
  
  // Front Desk Tue (Offset 1)
  { id: "SH-4", staffId: "S-04", department: "Front Desk", start: setMinutes(setHours(getDay(1), 7), 0).toISOString(), end: setMinutes(setHours(getDay(1), 15), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-5", staffId: "S-07", department: "Front Desk", start: setMinutes(setHours(getDay(1), 10), 0).toISOString(), end: setMinutes(setHours(getDay(1), 18), 0).toISOString(), status: "Published", breakMins: 30 },
  
  // CONFLICT: Nathan is assigned 2 shifts at the same time on Wed (Offset 2)
  { id: "SH-6", staffId: "S-05", department: "Front Desk", start: setMinutes(setHours(getDay(2), 7), 0).toISOString(), end: setMinutes(setHours(getDay(2), 15), 0).toISOString(), status: "Draft", breakMins: 30, conflict: true },
  { id: "SH-7", staffId: "S-05", department: "Front Desk", start: setMinutes(setHours(getDay(2), 12), 0).toISOString(), end: setMinutes(setHours(getDay(2), 20), 0).toISOString(), status: "Draft", breakMins: 30, conflict: true },
  
  // OVERTIME: Maria works too much
  { id: "SH-8", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(getDay(0), 8), 0).toISOString(), end: setMinutes(setHours(getDay(0), 18), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-9", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(getDay(1), 8), 0).toISOString(), end: setMinutes(setHours(getDay(1), 18), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-10", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(getDay(2), 8), 0).toISOString(), end: setMinutes(setHours(getDay(2), 18), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-11", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(getDay(3), 8), 0).toISOString(), end: setMinutes(setHours(getDay(3), 18), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-12", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(getDay(4), 8), 0).toISOString(), end: setMinutes(setHours(getDay(4), 18), 0).toISOString(), status: "Published", breakMins: 30 }, // 50 hours total
  
  // Open Shift
  { id: "SH-13", staffId: null, department: "Maintenance", start: setMinutes(setHours(getDay(3), 9), 0).toISOString(), end: setMinutes(setHours(getDay(3), 17), 0).toISOString(), status: "Open", breakMins: 30 },

  // Housekeeping
  { id: "SH-14", staffId: "S-08", department: "Housekeeping", start: setMinutes(setHours(getDay(0), 9), 0).toISOString(), end: setMinutes(setHours(getDay(0), 17), 0).toISOString(), status: "Published", breakMins: 30 },
  
  // Maintenance
  { id: "SH-15", staffId: "S-03", department: "Maintenance", start: setMinutes(setHours(getDay(0), 8), 0).toISOString(), end: setMinutes(setHours(getDay(0), 16), 0).toISOString(), status: "Published", breakMins: 30 },
  
  // Management
  { id: "SH-16", staffId: "S-01", department: "Management", start: setMinutes(setHours(getDay(0), 9), 0).toISOString(), end: setMinutes(setHours(getDay(0), 17), 0).toISOString(), status: "Published", breakMins: 60 },
  
  // Today's shifts for widgets
  { id: "SH-17", staffId: "S-04", department: "Front Desk", start: setMinutes(setHours(today, 7), 0).toISOString(), end: setMinutes(setHours(today, 15), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-18", staffId: "S-03", department: "Maintenance", start: setMinutes(setHours(today, 8), 0).toISOString(), end: setMinutes(setHours(today, 16), 0).toISOString(), status: "Published", breakMins: 30 },
  { id: "SH-19", staffId: "S-02", department: "Housekeeping", start: setMinutes(setHours(today, 8), 0).toISOString(), end: setMinutes(setHours(today, 16), 0).toISOString(), status: "Published", breakMins: 30 },
];

export const mockNotes = [
  { id: "N-1", text: "VIP in Room 201 complained about noise, offered free breakfast.", author: "David D.", time: todayAt(8, 30) },
  { id: "N-2", text: "Elevator 2 scheduled for maintenance at 2 PM.", author: "Sarah J.", time: todayAt(9, 0) },
];

export const mockAssets = [
  { id: "AST-001", name: "AC Unit 402", category: "HVAC", location: "Room 402", installDate: "2021-05-10", status: "Needs attention" },
  { id: "AST-002", name: "Pool Pump Main", category: "Pool", location: "Pool Area", installDate: "2020-03-15", status: "Operational" },
  { id: "AST-003", name: "Elevator B", category: "Elevator", location: "North Wing", installDate: "2019-11-20", status: "Operational" },
  { id: "AST-004", name: "Smart Lock C", category: "Lock/Access", location: "Room 402", installDate: "2023-01-10", status: "Operational" },
  { id: "AST-005", name: "Light Fixture 210", category: "Electrical", location: "Room 210", installDate: "2022-08-05", status: "Operational" },
];

export const mockWorkOrders = [
  { id: "WO-00300000", title: "AC Failure - Room 402", assetId: "AST-001", category: "HVAC", location: "Room 402", description: "AC blowing warm air, guest reported at night.", priority: "Urgent", assigneeId: null, status: "Reported", dateLogged: subDays(today, 1).toISOString(), dueDate: today.toISOString(), lastUpdated: subHours(today, 2).toISOString(), photos: 1, ooo: true },
  { id: "WO-00300001", title: "Smart Lock Offline", assetId: "AST-004", category: "Lock/Access", location: "Room 402", description: "Lock not connecting to gateway.", priority: "High", assigneeId: null, status: "Reported", dateLogged: todayAt(8, 0), dueDate: todayAt(18, 0), lastUpdated: todayAt(9, 0), photos: 0, ooo: false },
  { id: "WO-00300002", title: "Pool Pump Noise", assetId: "AST-002", category: "Pool", location: "Pool Area", description: "Loud grinding noise from primary pump.", priority: "High", assigneeId: "S-06", status: "Assigned & Dispatched", dateLogged: subDays(today, 2).toISOString(), dueDate: addDays(today, 1).toISOString(), lastUpdated: todayAt(10, 0), photos: 2, ooo: false },
  { id: "WO-00300003", title: "Elevator B Inspection", assetId: "AST-003", category: "Elevator", location: "North Wing", description: "Quarterly safety inspection and load test.", priority: "Medium", assigneeId: "S-05", status: "In Verification", dateLogged: subDays(today, 5).toISOString(), dueDate: today.toISOString(), lastUpdated: subHours(today, 5).toISOString(), photos: 3, ooo: false },
  { id: "WO-00300004", title: "Flickering Light", assetId: "AST-005", category: "Electrical", location: "Room 210", description: "Bathroom vanity light flickering.", priority: "Low", assigneeId: "S-03", status: "Resolved", dateLogged: subDays(today, 10).toISOString(), dueDate: subDays(today, 7).toISOString(), lastUpdated: subDays(today, 8).toISOString(), photos: 1, ooo: false },
];

export const mockTasks = mockWorkOrders.map(wo => ({
  id: wo.id,
  title: wo.title,
  type: wo.category,
  priority: wo.priority,
  status: wo.status === "Reported" || wo.status === "Assigned & Dispatched" ? "Open" : wo.status === "In Verification" ? "In Progress" : "Resolved",
  assignee: mockStaff.find(s => s.id === wo.assigneeId)?.name || "Unassigned",
  due: wo.dueDate,
  roomId: wo.location.replace("Room ", "R-")
}));


export const mockPreventiveSchedules = [
  { id: "PM-1", title: "HVAC Quarterly Inspection", category: "HVAC", asset: "All HVAC Units", frequency: "Quarterly", nextDue: addDays(today, 15).toISOString(), assignedTeam: "Engineering" },
  { id: "PM-2", title: "Elevator Safety Check", category: "Elevator", asset: "Elevator B", frequency: "Monthly", nextDue: addDays(today, 5).toISOString(), assignedTeam: "External Vendor" },
  { id: "PM-3", title: "Pool Chemical Balance", category: "Pool", asset: "Main Pool", frequency: "Weekly", nextDue: addDays(today, 2).toISOString(), assignedTeam: "Maintenance" }
];


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

export const mockConversations: any[] = [
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

export const mockShiftTemplates = [
  { id: "ST-1", name: "Morning", department: "Front Desk", startTime: "07:00", endTime: "15:00", breakMins: 30 },
  { id: "ST-2", name: "Day", department: "Housekeeping", startTime: "08:00", endTime: "16:00", breakMins: 30 },
  { id: "ST-3", name: "Evening", department: "Front Desk", startTime: "15:00", endTime: "23:00", breakMins: 30 },
  { id: "ST-4", name: "Night", department: "Front Desk", startTime: "23:00", endTime: "07:00", breakMins: 30 },
];

export const mockTimeOff = [
  { id: "TO-1", staffId: "S-04", type: "Vacation", startDate: getDay(3).toISOString(), endDate: getDay(4).toISOString(), days: 2, reason: "Family trip", status: "Approved" },
  { id: "TO-2", staffId: "S-08", type: "Sick", startDate: getDay(1).toISOString(), endDate: getDay(1).toISOString(), days: 1, reason: "Not feeling well", status: "Pending" },
  { id: "TO-3", staffId: "S-06", type: "Personal", startDate: getDay(-5).toISOString(), endDate: getDay(10).toISOString(), days: 16, reason: "Extended leave", status: "Approved" },
];

export const mockTimesheets = [
  { id: "TS-1", staffId: "S-04", date: getDay(0).toISOString(), schedStart: "07:00", schedEnd: "15:00", actualStart: "06:55", actualEnd: "15:05", breakMins: 30, totalHrs: 7.67, status: "Approved" },
  { id: "TS-2", staffId: "S-02", date: getDay(0).toISOString(), schedStart: "08:00", schedEnd: "18:00", actualStart: "08:05", actualEnd: "18:30", breakMins: 30, totalHrs: 9.92, status: "Pending Approval" },
  { id: "TS-3", staffId: "S-03", date: getDay(0).toISOString(), schedStart: "08:00", schedEnd: "16:00", actualStart: "07:58", actualEnd: "", breakMins: 0, totalHrs: 0, status: "Clocked In" }
];

export const mockRoomTypes = [
  { id: "rt-1", name: "Standard Queen", totalRooms: 12, baseRate: 189, extraAdult: 30, extraChild: 15, defaultMinStay: 1, maxOccupancy: 4 },
  { id: "rt-2", name: "Deluxe King", totalRooms: 5, baseRate: 249, extraAdult: 40, extraChild: 20, defaultMinStay: 1, maxOccupancy: 3 },
  { id: "rt-3", name: "Executive Suite", totalRooms: 2, baseRate: 310, extraAdult: 50, extraChild: 25, defaultMinStay: 2, maxOccupancy: 4 },
];

export const mockRatePlans = [
  { id: "rp-1", name: "Standard Rate", type: "Base", derivation: null, cancelPolicy: "24h prior", mealPlan: "Room Only", minStay: 1, channels: ["Direct", "Booking.com", "Expedia", "Airbnb"] },
  { id: "rp-2", name: "Non-Refundable", type: "Derived", derivation: "-10%", cancelPolicy: "No cancellation", mealPlan: "Room Only", minStay: 1, channels: ["Direct", "Booking.com", "Expedia"] },
  { id: "rp-3", name: "Corporate", type: "Fixed", derivation: null, cancelPolicy: "6h prior", mealPlan: "Breakfast included", minStay: 1, channels: ["Direct"] },
  { id: "rp-4", name: "Long Stay (7+ nights)", type: "Derived", derivation: "-15%", cancelPolicy: "72h prior", mealPlan: "Room Only", minStay: 7, channels: ["Direct", "Booking.com"] }
];

export const mockPricingRules = [
  { id: "pr-1", name: "Weekend Premium", active: true, conditions: ["Day of week: Fri, Sat"], action: "+15%", priority: 1, minRate: null, maxRate: null, roomTypes: ["All"], channels: ["All"] },
  { id: "pr-2", name: "High Occupancy Push", active: true, conditions: ["Occupancy > 80%"], action: "+20%", priority: 2, minRate: null, maxRate: null, roomTypes: ["All"], channels: ["All"] },
  { id: "pr-3", name: "Last Minute Discount", active: false, conditions: ["Days before arrival < 7", "Occupancy < 50%"], action: "-10%", priority: 3, minRate: 120, maxRate: null, roomTypes: ["rt-1", "rt-2"], channels: ["Direct", "Booking.com"] }
];

export const mockSeasons = [
  { id: "s-1", name: "Low Season", startDate: "2026-01-05", endDate: "2026-03-31", color: "blue" },
  { id: "s-2", name: "Shoulder Season", startDate: "2026-04-01", endDate: "2026-05-31", color: "green" },
  { id: "s-3", name: "High Season", startDate: "2026-06-01", endDate: "2026-09-15", color: "orange" },
  { id: "s-4", name: "Peak Holidays", startDate: "2026-12-20", endDate: "2026-12-31", color: "red" }
];

export const mockRatesHistory = [
  { id: "rh-1", timestamp: subHours(today, 2).toISOString(), user: "Sarah Jenkins", action: "Bulk Update", details: "Increased Base Rate by 10% for rt-1 on Oct 10-15", source: "Manual" },
  { id: "rh-2", timestamp: subHours(today, 5).toISOString(), user: "System", action: "Rule Trigger", details: "High Occupancy Push applied to rt-2 (+20%) for Today", source: "Rule Engine" },
  { id: "rh-3", timestamp: subDays(today, 1).toISOString(), user: "David Davidson", action: "Cell Edit", details: "Changed Stop Sell from Off to On for rt-3 on Today", source: "Manual" }
];

import { addDays, subDays, setHours, setMinutes, subHours } from "date-fns";

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
  { id: "S-01", name: "Sarah J.", role: "Manager", department: "Management", avatar: "SJ" },
  { id: "S-02", name: "Maria", role: "Housekeeping", department: "Housekeeping", avatar: "M" },
  { id: "S-03", name: "John", role: "Maintenance", department: "Engineering", avatar: "J" },
  { id: "S-04", name: "David D.", role: "Front Desk", department: "Front Desk", avatar: "DD" },
  { id: "S-05", name: "Neon Amirent", role: "Maintenance", department: "Engineering", avatar: "NA" },
  { id: "S-06", name: "Dense Menored", role: "Maintenance", department: "Engineering", avatar: "DM" },
];

export const mockShifts = [
  { id: "SH-1", staffId: "S-04", role: "Front Desk", start: todayAt(7, 0), end: todayAt(15, 0) },
  { id: "SH-2", staffId: "S-05", role: "Front Desk", start: todayAt(14, 0), end: todayAt(22, 0) },
  { id: "SH-3", staffId: "S-01", role: "Manager", start: todayAt(9, 0), end: todayAt(17, 0) },
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

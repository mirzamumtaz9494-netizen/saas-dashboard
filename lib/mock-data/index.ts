import { addDays, subDays, setHours, setMinutes } from "date-fns";

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
];

export const mockReservations = [
  { id: "RES-1001", guestId: "G-102", roomId: "R-101", checkIn: subDays(today, 2).toISOString(), checkOut: today.toISOString(), status: "Expected Departure", source: "Direct", totalAmount: 850, balance: 45, paymentState: "Balance due" },
  { id: "RES-1002", guestId: "G-103", roomId: "R-102", checkIn: today.toISOString(), checkOut: addDays(today, 3).toISOString(), status: "Expected Arrival", source: "Booking.com", totalAmount: 1200, balance: 1200, paymentState: "Deposit held" },
  { id: "RES-1003", guestId: "G-104", roomId: "R-201", checkIn: subDays(today, 1).toISOString(), checkOut: addDays(today, 5).toISOString(), status: "Checked In", source: "Expedia", totalAmount: 2400, balance: 0, paymentState: "Paid" },
];

export const mockTasks = [
  { id: "T-01", title: "Clean 102", type: "Housekeeping", priority: "High", status: "Open", assignee: "Maria", due: today.toISOString(), roomId: "R-102" },
  { id: "T-02", title: "Fix AC", type: "Maintenance", priority: "Urgent", status: "In Progress", assignee: "John", due: today.toISOString(), roomId: "R-203" },
];

export const mockStaff = [
  { id: "S-01", name: "Sarah J.", role: "Manager", department: "Management", avatar: "SJ" },
  { id: "S-02", name: "Maria", role: "Housekeeping", department: "Housekeeping", avatar: "M" },
  { id: "S-03", name: "John", role: "Maintenance", department: "Engineering", avatar: "J" },
  { id: "S-04", name: "David D.", role: "Front Desk", department: "Front Desk", avatar: "DD" },
  { id: "S-05", name: "Sarah Planter", role: "Front Desk", department: "Front Desk", avatar: "SP" },
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

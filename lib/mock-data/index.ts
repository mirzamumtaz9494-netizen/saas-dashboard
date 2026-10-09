import { addDays, subDays } from "date-fns";

const today = new Date();

export const mockGuests = [
  { id: "G-102", name: "Eleanor Pena", email: "eleanor.pena@example.com", phone: "+1 (555) 0192", country: "US", lastStay: subDays(today, 15).toISOString(), totalStays: 4, totalSpend: 4200, vip: true, avatar: "EP", tags: ["VIP", "Repeat"], status: "VIP" },
  { id: "G-103", name: "Jacob Jones", email: "jacob.jones@example.com", phone: "+44 7700 900077", country: "GB", lastStay: subDays(today, 30).toISOString(), totalStays: 1, totalSpend: 850, vip: false, avatar: "JJ", tags: ["Corporate"], status: "Standard" },
  { id: "G-104", name: "Leslie Alexander", email: "leslie.a@example.com", phone: "+1 (555) 0124", country: "CA", lastStay: subDays(today, 45).toISOString(), totalStays: 12, totalSpend: 14500, vip: true, avatar: "LA", tags: ["VIP", "Corporate"], status: "VIP" },
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
  { id: "RES-1001", guestId: "G-102", roomId: "R-101", checkIn: subDays(today, 2).toISOString(), checkOut: addDays(today, 2).toISOString(), status: "Checked In", source: "Direct", totalAmount: 850, balance: 0 },
  { id: "RES-1002", guestId: "G-103", roomId: "R-102", checkIn: today.toISOString(), checkOut: addDays(today, 3).toISOString(), status: "Expected", source: "Booking.com", totalAmount: 1200, balance: 1200 },
  { id: "RES-1003", guestId: "G-104", roomId: "R-201", checkIn: addDays(today, 1).toISOString(), checkOut: addDays(today, 5).toISOString(), status: "Confirmed", source: "Expedia", totalAmount: 2400, balance: 400 },
];

export const mockTasks = [
  { id: "T-01", title: "Clean 102", type: "Housekeeping", priority: "High", status: "Open", assignee: "Maria", due: today.toISOString(), roomId: "R-102" },
  { id: "T-02", title: "Fix AC", type: "Maintenance", priority: "Urgent", status: "In Progress", assignee: "John", due: today.toISOString(), roomId: "R-203" },
];

export const mockStaff = [
  { id: "S-01", name: "Sarah J.", role: "Manager", department: "Management", avatar: "SJ" },
  { id: "S-02", name: "Maria", role: "Housekeeping", department: "Housekeeping", avatar: "M" },
  { id: "S-03", name: "John", role: "Maintenance", department: "Engineering", avatar: "J" },
];

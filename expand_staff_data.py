import os

path = "lib/mock-data/index.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Replace mockStaff
old_staff = """export const mockStaff = [
  { id: "S-01", name: "Sarah J.", role: "Manager", department: "Management", avatar: "SJ" },
  { id: "S-02", name: "Maria", role: "Housekeeping", department: "Housekeeping", avatar: "M" },
  { id: "S-03", name: "John", role: "Maintenance", department: "Engineering", avatar: "J" },
  { id: "S-04", name: "David D.", role: "Front Desk", department: "Front Desk", avatar: "DD" },
  { id: "S-05", name: "Nathan Roberts", role: "Maintenance", department: "Engineering", avatar: "NR" },
  { id: "S-06", name: "Dennis Miller", role: "Maintenance", department: "Engineering", avatar: "DM" },
];"""

new_staff = """export const mockStaff = [
  { id: "S-01", name: "Sarah Jenkins", role: "General Manager", department: "Management", avatar: "SJ", phone: "+1 (555) 123-4567", email: "sarah.j@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 35, skills: ["First Aid", "Fire Safety"] },
  { id: "S-02", name: "Maria Garcia", role: "Housekeeping Lead", department: "Housekeeping", avatar: "MG", phone: "+1 (555) 234-5678", email: "maria.g@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 20, skills: ["Biohazard"] },
  { id: "S-03", name: "John Smith", role: "Maintenance Tech", department: "Maintenance", avatar: "JS", phone: "+1 (555) 345-6789", email: "john.s@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 25, skills: ["Elevator Tech", "HVAC Certified"] },
  { id: "S-04", name: "David Davidson", role: "Front Desk Agent", department: "Front Desk", avatar: "DD", phone: "+1 (555) 456-7890", email: "david.d@vpro.com", type: "Part-Time", status: "Active", contractedHours: 24, hourlyRate: 18, skills: ["Conflict Resolution"] },
  { id: "S-05", name: "Nathan Roberts", role: "Front Desk Agent", department: "Front Desk", avatar: "NR", phone: "+1 (555) 567-8901", email: "nathan.r@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 18, skills: [] },
  { id: "S-06", name: "Dennis Miller", role: "Maintenance Tech", department: "Maintenance", avatar: "DM", phone: "+1 (555) 678-9012", email: "dennis.m@vpro.com", type: "Part-Time", status: "On Leave", contractedHours: 20, hourlyRate: 22, skills: ["Plumbing"] },
  { id: "S-07", name: "Anil Mehta", role: "Front Desk Agent", department: "Front Desk", avatar: "AM", phone: "+1 (555) 789-0123", email: "anil.m@vpro.com", type: "Full-Time", status: "Active", contractedHours: 40, hourlyRate: 18, skills: ["First Aid"] },
  { id: "S-08", name: "Rosa Diaz", role: "Housekeeper", department: "Housekeeping", avatar: "RD", phone: "+1 (555) 890-1234", email: "rosa.d@vpro.com", type: "Part-Time", status: "Active", contractedHours: 32, hourlyRate: 17, skills: [] }
];"""

content = content.replace(old_staff, new_staff)

# 2. Replace mockShifts
old_shifts = """export const mockShifts = [
  { id: "SH-1", staffId: "S-04", role: "Front Desk", start: todayAt(7, 0), end: todayAt(15, 0) },
  { id: "SH-2", staffId: "S-05", role: "Front Desk", start: todayAt(14, 0), end: todayAt(22, 0) },
  { id: "SH-3", staffId: "S-01", role: "Manager", start: todayAt(9, 0), end: todayAt(17, 0) },
];"""

new_shifts = """
const d = today;
const startOfWeek = addDays(d, -d.getDay() + 1); // Monday
const getDay = (offset) => addDays(startOfWeek, offset);

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
];"""

content = content.replace(old_shifts, new_shifts)

# 3. Add other data structures at the end
new_data = """
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
"""
content += new_data

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

import os

path = "lib/mock-data/index.ts"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

new_data = """
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
"""

if "mockRoomTypes" not in content:
    with open(path, "a", encoding="utf-8") as f:
        f.write(new_data)

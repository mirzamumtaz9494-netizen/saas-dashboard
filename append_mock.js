const fs = require("fs");
const path = "./lib/mock-data/index.ts";
let content = fs.readFileSync(path, "utf8");

const pmData = `

export const mockPreventiveSchedules = [
  { id: "PM-1", title: "HVAC Quarterly Inspection", category: "HVAC", asset: "All HVAC Units", frequency: "Quarterly", nextDue: addDays(today, 15).toISOString(), assignedTeam: "Engineering" },
  { id: "PM-2", title: "Elevator Safety Check", category: "Elevator", asset: "Elevator B", frequency: "Monthly", nextDue: addDays(today, 5).toISOString(), assignedTeam: "External Vendor" },
  { id: "PM-3", title: "Pool Chemical Balance", category: "Pool", asset: "Main Pool", frequency: "Weekly", nextDue: addDays(today, 2).toISOString(), assignedTeam: "Maintenance" }
];
`;

if (!content.includes("mockPreventiveSchedules")) {
  fs.writeFileSync(path, content + pmData);
}

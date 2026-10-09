import os

path = "app/dashboard/staff/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """function ScheduleTab({ weekStart, weekEnd, currentDate, setCurrentDate, isManagement, selectedShift, setSelectedShift }: any) {
  const [filterDept, setFilterDept] = useState("All")"""

replacement = """function ScheduleTab({ weekStart, weekEnd, currentDate, setCurrentDate, isManagement, selectedShift, setSelectedShift }: any) {
  const { role } = useTenant()
  const [filterDept, setFilterDept] = useState("All")"""
content = content.replace(target, replacement)

target2 = """          <div className="min-w-max">
            {mockStaff.filter((st: any) => filterDept === "All" || st.department === filterDept).map((staff: any) => {"""

replacement2 = """          <div className="min-w-max">
            {mockStaff.filter((st: any) => (filterDept === "All" || st.department === filterDept) && (role !== "Housekeeping" || st.department === "Housekeeping")).map((staff: any) => {"""
content = content.replace(target2, replacement2)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)

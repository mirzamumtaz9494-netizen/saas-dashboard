# -*- coding: utf-8 -*-
import os

content = """
function SectionUsers() {
  return (
    <div className="max-w-5xl space-y-8 animate-in fade-in">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Users & Roles</h2>
            <p className="text-sm text-muted-foreground">Manage team members, departments, and permissions.</p>
          </div>
          <Button>Invite User</Button>
        </div>
        
        <div className="flex gap-4 border-b border-border mb-4">
          <button className="pb-2 border-b-2 border-primary text-primary font-bold text-sm">Users</button>
          <button className="pb-2 border-b-2 border-transparent text-muted-foreground text-sm hover:text-foreground">Roles & Permissions</button>
          <button className="pb-2 border-b-2 border-transparent text-muted-foreground text-sm hover:text-foreground">Departments</button>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
                <tr>
                  <th className="px-4 py-3 font-medium">User</th>
                  <th className="px-4 py-3 font-medium">Role</th>
                  <th className="px-4 py-3 font-medium">Department</th>
                  <th className="px-4 py-3 font-medium">Last Login</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium w-10"></th>
                </tr>
              </thead>
              <tbody>
                {mockStaff.map((staff, i) => (
                  <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xs shrink-0">
                          {staff.avatar}
                        </div>
                        <div>
                          <div className="font-semibold">{staff.name}</div>
                          <div className="text-xs text-muted-foreground">{staff.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">{staff.role}</td>
                    <td className="px-4 py-3 text-muted-foreground">{staff.department}</td>
                    <td className="px-4 py-3">
                      <div className="text-foreground">Oct 1, 2024, 08:30 PM</div>
                      <div className="text-xs text-muted-foreground">3 days ago</div>
                    </td>
                    <td className="px-4 py-3">
                      {staff.status === "Active" ? (
                        <Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge>
                      ) : (
                        <Badge variant="outline" className="bg-muted text-muted-foreground">Suspended</Badge>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild><Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button></DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem><Edit2 className="w-4 h-4 mr-2"/> Edit Profile</DropdownMenuItem>
                          <DropdownMenuItem><Shield className="w-4 h-4 mr-2"/> Change Role</DropdownMenuItem>
                          <DropdownMenuItem><ShieldAlert className="w-4 h-4 mr-2"/> Require 2FA</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-destructive"><X className="w-4 h-4 mr-2"/> Deactivate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionProfile({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">My Profile</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your personal account settings and security.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center gap-4 border-b border-border pb-6 mb-2">
            <div className="w-16 h-16 rounded-full bg-primary/20 text-primary flex items-center justify-center font-bold text-xl shrink-0">
              JS
            </div>
            <div>
              <Button variant="outline" size="sm">Change Avatar</Button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Full Name</label>
              <Input defaultValue="John Smith" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Email</label>
              <Input defaultValue="john@thegrandplaza.com" type="email" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="pt-4">
            <h4 className="text-sm font-bold mb-3">Security Settings</h4>
            <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-background">
              <div>
                <div className="font-bold text-sm">Two-Factor Authentication</div>
                <div className="text-xs text-muted-foreground mt-1">Add an extra layer of security to your account.</div>
              </div>
              <Button variant="outline" size="sm">Enable 2FA</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function SectionOperations({ onChange }: any) {
  const ToggleRow = ({ title, desc, def = false }: any) => {
    const [on, setOn] = useState(def)
    return (
      <div className="flex items-center justify-between p-4 border-b border-border last:border-0 hover:bg-muted/10 transition-colors">
        <div className="pr-4">
          <div className="font-bold text-sm">{title}</div>
          <div className="text-xs text-muted-foreground mt-1">{desc}</div>
        </div>
        <button 
          onClick={() => { setOn(!on); onChange(); }} 
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background ${on ? 'bg-primary' : 'bg-input'}`}
        >
          <span className="sr-only">Toggle</span>
          <span className={`pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform ${on ? 'translate-x-5' : 'translate-x-0'}`} />
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Operations</h2>
        <p className="text-sm text-muted-foreground mb-6">Automate routine actions and set module defaults.</p>
        
        <h3 className="font-bold mb-4">Reservations</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Auto-Confirm Online Bookings" desc="Automatically accept reservations from OTAs and website without manual review." def={true} />
          <ToggleRow title="Overbooking Allowance" desc="Allow booking beyond 100% occupancy to compensate for cancellations." def={false} />
        </div>

        <h3 className="font-bold mb-4">Front Desk</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Require ID Verification" desc="Check-in wizard will require an uploaded ID document." def={true} />
          <ToggleRow title="Block Check-out on Unpaid Balance" desc="Prevent check-out in the system if the folio balance is not zero." def={true} />
        </div>

        <h3 className="font-bold mb-4">Housekeeping</h3>
        <div className="bg-card border border-border rounded-xl shadow-sm mb-8">
          <ToggleRow title="Auto-Dirty on Check-out" desc="Automatically set room status to 'Dirty' when a guest checks out." def={true} />
          <ToggleRow title="Require Inspection" desc="Rooms must be marked 'Inspected' after cleaning before assignment." def={false} />
        </div>
      </div>
    </div>
  )
}
"""

with open("app/dashboard/settings/page.tsx", "a", encoding="utf-8") as f:
    f.write(content)

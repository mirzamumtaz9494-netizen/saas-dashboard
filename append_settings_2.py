# -*- coding: utf-8 -*-
import os

content = """
function SectionRooms({ onChange }: any) {
  return (
    <div className="max-w-4xl space-y-8 animate-in fade-in">
      <div>
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold mb-1">Rooms & Rates</h2>
            <p className="text-sm text-muted-foreground">Manage your physical inventory and room classes.</p>
          </div>
          <Button>Add Room Type</Button>
        </div>
        
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden mb-8">
          <table className="w-full text-sm text-left">
            <thead className="bg-muted/30 text-xs uppercase text-muted-foreground border-b border-border">
              <tr>
                <th className="px-4 py-3 font-medium">Room Type</th>
                <th className="px-4 py-3 font-medium text-center">Capacity</th>
                <th className="px-4 py-3 font-medium text-right">Base Rate</th>
                <th className="px-4 py-3 font-medium text-center">Count</th>
                <th className="px-4 py-3 font-medium text-right">Status</th>
                <th className="px-4 py-3 font-medium w-10"></th>
              </tr>
            </thead>
            <tbody>
              {[{n: "Deluxe King", c: "bg-blue-500", cp: "2A", r: "$150", ct: 45}, {n: "Standard Queen", c: "bg-emerald-500", cp: "2A, 1C", r: "$120", ct: 60}].map((rt, i) => (
                <tr key={i} className="border-b border-border last:border-0 hover:bg-muted/20">
                  <td className="px-4 py-3">
                    <div className="font-semibold flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${rt.c}`} title="Color code used in calendar" />
                      {rt.n}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-center text-muted-foreground">{rt.cp}</td>
                  <td className="px-4 py-3 text-right">{rt.r}</td>
                  <td className="px-4 py-3 text-center">{rt.ct}</td>
                  <td className="px-4 py-3 text-right"><Badge variant="outline" className="bg-success/10 text-success border-success/20">Active</Badge></td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="icon" className="h-7 w-7"><MoreVertical className="w-4 h-4" /></Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h3 className="font-bold mb-4">Taxes & Fees</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <div className="font-bold text-sm">Value Added Tax (VAT)</div>
              <div className="text-xs text-muted-foreground">10% • Inclusive • Applies to Room Revenue</div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <div className="flex items-center justify-between border-b border-border pb-4 mb-4">
            <div>
              <div className="font-bold text-sm">City Tax</div>
              <div className="text-xs text-muted-foreground">$2.00 per guest/night • Exclusive • Applies to Guests</div>
            </div>
            <Button variant="outline" size="sm">Edit</Button>
          </div>
          <Button variant="ghost" size="sm" className="text-primary font-bold">Add Tax/Fee</Button>
        </div>
      </div>
    </div>
  )
}

function SectionLanguage({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Language & Currency</h2>
        <p className="text-sm text-muted-foreground mb-6">Regional settings for your property.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Default UI Language</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Time Zone</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>America/New_York (EST/EDT)</option>
                <option>Europe/London (GMT/BST)</option>
                <option>Asia/Tokyo (JST)</option>
              </select>
              <p className="text-[10px] text-muted-foreground mt-1">Current local time updates automatically.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Currency</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={(e) => {
                if(window.confirm("Existing invoices keep their original currency. Update for new transactions?")) onChange(e)
              }}>
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Number Preview</label>
              <div className="h-10 flex items-center px-3 font-bold text-foreground border border-transparent bg-muted/50 rounded-md">
                $1,234.50
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Date Format</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>MM/DD/YYYY</option>
                <option>DD/MM/YYYY</option>
                <option>YYYY-MM-DD</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Time Format</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>12-hour (1:00 PM)</option>
                <option>24-hour (13:00)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"""

with open("app/dashboard/settings/page.tsx", "a", encoding="utf-8") as f:
    f.write(content)

# -*- coding: utf-8 -*-
import os

content = """
function SectionProperty({ onChange }: any) {
  return (
    <div className="max-w-3xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Property Details</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your core property identity and policies.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Property Name</label>
              <Input defaultValue="The Grand Plaza" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Legal Name</label>
              <Input defaultValue="Grand Plaza Hotels LLC" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Property Type</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>Hotel</option>
                <option>Boutique</option>
                <option>Serviced apartments</option>
                <option>Hostel</option>
                <option>B&B</option>
                <option>Vacation rental</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Star Rating</label>
              <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
                <option>5 Stars</option>
                <option>4 Stars</option>
                <option>3 Stars</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Total Rooms</label>
            <Input value="120" readOnly disabled className="bg-muted text-muted-foreground w-32" />
            <p className="text-[10px] text-muted-foreground mt-1">Computed automatically from your room inventory.</p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Location</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Street Address</label>
            <Input defaultValue="3345 Minloke trate Bvd" onChange={onChange} className="bg-background" />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">City</label>
              <Input defaultValue="Locuta" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">State / Region</label>
              <Input defaultValue="NY" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Postal Code</label>
              <Input defaultValue="77511" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Country</label>
            <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm" onChange={onChange}>
              <option>United States</option>
              <option>United Kingdom</option>
              <option>Canada</option>
            </select>
          </div>
          <div className="w-full h-32 bg-muted rounded-lg border border-border flex items-center justify-center text-muted-foreground text-xs">
            Static Map Placeholder
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-4">Contact Information</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Primary Contact Name</label>
              <Input defaultValue="Sarah Jenkins" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Contact Role</label>
              <Input defaultValue="General Manager" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Business Email</label>
              <Input defaultValue="info@thegrandplaza.com" type="email" onChange={(e) => {
                if (e.target.value.includes('@gmail.com') || e.target.value.includes('@yahoo.com')) {
                  // just mock warning logic conceptually
                }
                onChange(e)
              }} className="bg-background" />
              <p className="text-[10px] text-muted-foreground mt-1">We recommend using a business domain.</p>
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Phone</label>
              <Input defaultValue="+1 (555) 123-4567" type="tel" onChange={onChange} className="bg-background" />
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <h3 className="font-bold mb-4">Stay Rules & Policies</h3>
        <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Check-in Time</label>
              <Input defaultValue="15:00" type="time" onChange={onChange} className="bg-background" />
            </div>
            <div>
              <label className="text-xs font-bold text-muted-foreground block mb-1">Check-out Time</label>
              <Input defaultValue="11:00" type="time" onChange={onChange} className="bg-background" />
            </div>
          </div>
          <div>
            <label className="text-xs font-bold text-muted-foreground block mb-1">Cancellation Policy</label>
            <textarea className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm" defaultValue="Free cancellation up to 48 hours before check-in. Late cancellations will be charged the first night." onChange={onChange} />
            <p className="text-[10px] text-muted-foreground mt-1">Used in invoices and booking confirmations.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
"""

with open("app/dashboard/settings/page.tsx", "a", encoding="utf-8") as f:
    f.write(content)

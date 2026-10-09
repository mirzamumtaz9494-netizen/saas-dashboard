# -*- coding: utf-8 -*-
import os

content = """
function SectionNotifications({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Notifications</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage system alerts and communication channels.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Notification Rules" description="Set up custom alerts for new bookings, VIP arrivals, and maintenance issues." icon={Bell} />
        </div>
      </div>
    </div>
  )
}

function SectionBranding({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Branding</h2>
        <p className="text-sm text-muted-foreground mb-6">Customize the look and feel of guest-facing documents.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Theme Engine" description="Upload your logo and choose brand colors for invoices and emails." icon={Paintbrush} />
        </div>
      </div>
    </div>
  )
}

function SectionIntegrations() {
  const router = useRouter()
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Integrations</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage third-party connections.</p>
        
        {/* Important Disclaimer as per instructions */}
        <div className="bg-warning/10 border border-warning/30 p-4 rounded-xl mb-6">
          <h4 className="font-bold text-sm text-warning mb-1 flex items-center gap-2">
            <AlertCircle className="w-4 h-4" /> E-Signatures Legal Note
          </h4>
          <p className="text-xs text-muted-foreground">
            The legal validity of electronic signatures generated in the Documents module depends entirely on the real third-party provider (e.g., DocuSign, HelloSign) and local jurisdictions. This environment is for demonstration purposes only.
          </p>
        </div>

        <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center shadow-sm">
          <LinkIcon className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="font-bold text-lg mb-2">Centralized Integration Hub</h3>
          <p className="text-sm text-muted-foreground max-w-sm mb-6">
            All integrations, API keys, and connection statuses are now managed in the dedicated Integrations module.
          </p>
          <Button onClick={() => router.push('/dashboard/integrations')}>Go to Integrations Module</Button>
        </div>
      </div>
    </div>
  )
}

function SectionSecurity({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Security</h2>
        <p className="text-sm text-muted-foreground mb-6">Enforce global security policies across your tenant.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Security Policies" description="Configure global 2FA requirements, password strength, and session timeouts." icon={Shield} />
        </div>
      </div>
    </div>
  )
}

function SectionPrivacy({ onChange }: any) {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Data & Privacy</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage guest data retention and GDPR compliance.</p>
        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden p-6">
          <EmptyState title="Data Retention" description="Configure auto-deletion rules for sensitive guest documents and IDs." icon={Database} />
        </div>
      </div>
    </div>
  )
}

function SectionBilling() {
  return (
    <div className="max-w-2xl space-y-8 animate-in fade-in">
      <div>
        <h2 className="text-xl font-bold mb-1">Plan & Billing</h2>
        <p className="text-sm text-muted-foreground mb-6">Manage your vProfessional subscription.</p>
        
        <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex flex-col gap-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-1">Current Plan</div>
              <div className="text-2xl font-heading font-bold text-brand-gold flex items-center gap-2">
                Professional <Badge className="bg-brand-gold/10 text-brand-gold border-brand-gold/20 text-[10px]">Active</Badge>
              </div>
            </div>
            <Button className="bg-brand-gold hover:bg-brand-gold/90 text-brand-black font-bold">Upgrade Plan</Button>
          </div>
          
          <div className="grid grid-cols-2 gap-4 border-t border-border pt-6">
            <div>
              <div className="text-xs text-muted-foreground mb-1">Billing Period</div>
              <div className="font-semibold text-sm">Oct 1, 2024 - Oct 31, 2024</div>
            </div>
            <div>
              <div className="text-xs text-muted-foreground mb-1">Payment Method</div>
              <div className="font-semibold text-sm flex items-center justify-between">
                <span>•••• 1234 Visa</span>
                <Button variant="link" className="h-auto p-0 text-primary text-xs">Edit</Button>
              </div>
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

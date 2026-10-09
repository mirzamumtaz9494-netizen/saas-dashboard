import os

path = "app/dashboard/settings/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """            {activeTab === "integrations" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Integrations</h3>
                  <p className="text-sm text-muted-foreground">Manage your third-party connections.</p>
                </div>"""
replacement = """            {activeTab === "integrations" && (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold">Integrations</h3>
                  <p className="text-sm text-muted-foreground">Manage your third-party connections.</p>
                </div>

                {/* E-Signature disclaimer as per requirements */}
                <div className="bg-warning/10 border border-warning/30 p-4 rounded-xl">
                  <h4 className="font-bold text-sm text-warning mb-1">E-Signatures Note</h4>
                  <p className="text-xs text-muted-foreground">
                    The legal validity of electronic signatures generated in the mock flow depends on the real provider (e.g., DocuSign, HelloSign) and local jurisdictions.
                    This environment is for demo purposes only.
                  </p>
                </div>"""
content = content.replace(target, replacement)
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

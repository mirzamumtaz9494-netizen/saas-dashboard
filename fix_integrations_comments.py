import os

path = "app/dashboard/integrations/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-bold block">API Key</label>
              <Input type="password" placeholder="sk_test_..." className="bg-background" />
            </div>"""

replacement = """          <div className="space-y-4">
            {/* NOTE FOR FUTURE IMPLEMENTATION:
                Real OAuth flow, token refresh handling, webhook signature verification,
                and secure secret storage must happen server-side.
                Do not store raw credentials in client state or local storage. */}
            <div className="space-y-2">
              <label className="text-sm font-bold block">API Key</label>
              <Input type="password" placeholder="sk_test_..." className="bg-background" />
            </div>"""

content = content.replace(target, replacement)
with open(path, "w", encoding="utf-8") as f:
    f.write(content)

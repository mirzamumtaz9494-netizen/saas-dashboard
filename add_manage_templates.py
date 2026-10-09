import os

path = "app/dashboard/messages/page.tsx"
with open(path, "r", encoding="utf-8") as f:
    content = f.read()

target = """                            {mockTemplates.map(t => (
                              <DropdownMenuItem key={t.id} onClick={() => handleTemplateInsert(t.content)} className="flex flex-col items-start p-2 cursor-pointer">
                                <span className="font-bold text-sm">{t.title}</span>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">{t.content}</span>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>"""

replacement = """                            {mockTemplates.map(t => (
                              <DropdownMenuItem key={t.id} onClick={() => handleTemplateInsert(t.content)} className="flex flex-col items-start p-2 cursor-pointer">
                                <span className="font-bold text-sm">{t.title}</span>
                                <span className="text-[10px] text-muted-foreground line-clamp-1">{t.content}</span>
                              </DropdownMenuItem>
                            ))}
                            {(role === "Owner" || role === "Manager") && (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="text-primary justify-center font-semibold cursor-pointer">
                                  Manage Templates
                                </DropdownMenuItem>
                              </>
                            )}
                          </DropdownMenuContent>"""

content = content.replace(target, replacement)

with open(path, "w", encoding="utf-8") as f:
    f.write(content)
